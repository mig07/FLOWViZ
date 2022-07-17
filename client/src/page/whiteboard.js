import SendIcon from "@mui/icons-material/Send";
import { Box, Button } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  updateEdge,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import Loading from "../component/common/loading";
import ToolNode from "../component/whiteboard/step/toolNode";
import NoResourceFoundException from "../exception/NoResourceFoundException";
import Request from "../service/request";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import InfoBar from "../component/common/infoBar";
import Submission from "../component/common/submission";
import WorkflowSubmitDialog from "../component/whiteboard/workflowSubmitDialog";

let id = -1;
const getId = () => `node${++id}`;

const nodeTypes = { tool: ToolNode };

const edgeOptions = {
  animated: true,
  style: {
    stroke: "black",
  },
};

export default function Whiteboard({ config, setDrawerList }) {
  const url = `${config.appProtocol}://${config.address}:${config.port}/tool`;

  const reactFlowWrapper = useRef(null);

  // Whiteboard GUI state
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // States if the workflow can be commited
  const [canAdvance, setCanAdvance] = useState(false);

  // Workflow name for workflow identification
  const [dialogOpen, setDialogOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState("");

  const onWorkflowNameUpdate = (event) => {
    const value = event.target.value;
    setWorkflowName(value);
  };

  useEffect(() => {
    if (!isWorkflowValid(nodes, edges)) {
      setCanAdvance(false);
      return;
    }
    setCanAdvance(true);
  });

  Request(url, {}, NoResourceFoundException, setDrawerList, <Loading />);

  const onNodeSetupUpdate = useCallback((nodeId, setup) => {
    setNodes((nds) => {
      return nds.map((node) => {
        if (node.id === nodeId) {
          node.data.setup = setup;
        }
        return node;
      });
    });
  });

  // Set edges
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  // Update edges
  const onEdgeUpdate = (oldEdge, newConnection) =>
    setEdges((els) => updateEdge(oldEdge, newConnection, els));

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    async (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const toolName = event.dataTransfer.getData("application/reactflow");

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // TODO - change for a requester class
      const uri = `${config.appProtocol}://${config.address}:${config.port}/tool/${toolName}`;
      const request = await fetch(uri);
      const tool = await request.json();

      // Creating new node
      const node = {
        id: getId(),
        type: "tool",
        position: position,
        data: {
          tool: tool,
          setup: { stepName: "", config: {} },
          onNodeUpdate: onNodeSetupUpdate,
        },
      };

      setNodes((nds) => nds.concat(node));
    },
    [reactFlowInstance]
  );

  return (
    <>
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          ref={reactFlowWrapper}
          style={{ height: "90vh", width: "100vw" }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            defaultEdgeOptions={edgeOptions}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onEdgeUpdate={onEdgeUpdate}
            deleteKeyCode={"Delete"}
            nodeTypes={nodeTypes}
          >
            <MiniMap />
            <Controls />
            <Background variant="lines" color="#bbb" gap={20} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <Box
        width="100vw"
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        padding={2}
      >
        <Button
          variant="outlined"
          endIcon={<SendIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Submit
        </Button>
      </Box>
      <WorkflowSubmitDialog
        workflowName={workflowName}
        onWorkflowNameUpdate={onWorkflowNameUpdate}
        setCanAdvance={setCanAdvance}
        open={dialogOpen}
        onApply={() => {
          requestWorkflow(nodes, edges, config, workflowName);
          setDialogOpen(false);
        }}
        onCancel={() => setDialogOpen(false)}
      />
    </>
  );
}

function requestWorkflow(nodes, edges, config, workflowName) {
  const workflowRequest = getWorkflowRequest(workflowName, nodes, edges);

  const url = `${config.appProtocol}://${config.address}:${config.port}/workflow`;

  const onError = (error) => <InfoBar type="error" text={error} />;

  const onSuccess = (data) => (
    <React.Fragment>
      <Submission
        text={`Successfully added ${workflowName}`}
        Icon={HowToRegIcon}
      />
    </React.Fragment>
  );

  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(workflowRequest),
  };

  Request(url, options, onError, onSuccess, <Loading />);
}

function getWorkflowRequest(name, nodes, edges) {
  const workflow = [];

  nodes.forEach((node) => {
    const nodeId = node.id;

    const children = edges.map((edge) => {
      if (edge.source.includes(nodeId)) {
        const name = nodes.find((node) => node.id === edge.target).data.setup
          .stepName;
        return name;
      }
    });

    const parents = edges.map((edge) => {
      if (edge.target.includes(nodeId)) {
        const name = nodes.find((node) => node.id === edge.source).data.setup
          .stepName;

        return name;
      }
    });

    const step = {
      id: node.data.setup.stepName,
      action: node.data.setup.config,
      children: children,
      parents: parents,
    };
    workflow.push(step);
  });
  return {
    name: name,
    tasks: workflow,
  };
}

function isWorkflowValid(nodes, edges) {
  if (nodes.length === 0 || edges.length === 0) return false;

  // Checking if all nodes have assigned names
  const areStepNamesValid = nodes.every(
    (step) => step.data.setup.stepName && step.data.setup.stepName !== ""
  );

  // Checking if there are no isolated nodes
  const nodeIds = nodes.map((node) => node.id);
  const edgeSources = edges.map((edge) => edge.source);
  const edgeTargets = edges.map((edge) => edge.target);
  const eds = [...new Set([...edgeSources, ...edgeTargets])];

  const areAllStepsConnected = arrayEquals(nodeIds, eds);

  return areStepNamesValid && areAllStepsConnected;
}

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}
