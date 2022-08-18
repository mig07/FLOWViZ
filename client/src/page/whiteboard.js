import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Grid } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
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
import ToolNode from "../component/whiteboard/task/toolNode";
import GenericError from "../component/common/genericError";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Submission from "../component/common/submission";
import WorkflowSubmitDialog from "../component/whiteboard/workflowSubmitDialog";
import ToolService from "../service/toolService";
import WorkflowService from "../service/workflowService";

let id = -1;
const getId = () => `node${++id}`;

const nodeTypes = { tool: ToolNode };

const edgeOptions = {
  animated: true,
  style: {
    stroke: "black",
  },
  markerEnd: {
    type: "arrowclosed",
    color: "black",
  },
};

export default function Whiteboard({ config, setDrawerList }) {
  const toolService = new ToolService(config);
  const workflowService = new WorkflowService(config);

  // Get NavBar height from theme
  const theme = useTheme();
  const appBarHeight = theme.mixins.toolbar.minHeight;

  const reactFlowWrapper = useRef(null);

  // Whiteboard GUI state
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // States if the workflow can be commited
  const [canAdvance, setCanAdvance] = useState(false);

  // Is the user dropping a tool into the whiteboard
  const [isToolDrop, setIsToolDrop] = useState(false);
  const [droppingToolName, setDroppingToolName] = useState("");
  const [droppingToolPos, setDroppingToolPos] = useState(null);

  // Workflow name and datetimes for workflow submission
  const [dialogOpen, setDialogOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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

  toolService.getTools(GenericError, setDrawerList, <Loading />);

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

  const OnToolDrop = () => {
    const onSuccess = (tool) => {
      const node = {
        id: getId(),
        type: "tool",
        position: droppingToolPos,
        data: {
          tool: tool,
          setup: { stepName: "", config: {} },
          onNodeUpdate: onNodeSetupUpdate,
        },
      };

      setNodes((nds) => nds.concat(node));
      setDroppingToolName("");
      setDroppingToolPos(null);
      setIsToolDrop(false);
    };

    toolService.getTool(droppingToolName, GenericError, onSuccess, <Loading />);
    return <></>;
  };

  const onDrop = useCallback(
    async (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const toolName = event.dataTransfer.getData("application/reactflow");

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      setDroppingToolName(toolName);
      setDroppingToolPos(position);
      setIsToolDrop(true);
    },
    [reactFlowInstance]
  );

  return (
    <Grid container>
      <Grid item>
        <ReactFlowProvider>
          <div
            ref={reactFlowWrapper}
            style={{
              height: `calc(100vh - ${appBarHeight * 2}px)`,
              width: "100vw",
            }}
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
      </Grid>
      <Grid item>
        <Box
          width="100vw"
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            variant="outlined"
            endIcon={<SendIcon />}
            onClick={() => setDialogOpen(true)}
            sx={{ mr: 2 }}
          >
            Submit
          </Button>
        </Box>
        <WorkflowSubmitDialog
          workflowName={workflowName}
          onWorkflowNameUpdate={onWorkflowNameUpdate}
          workflowStartDateTime={startDate}
          setWorkflowStartDateTime={setStartDate}
          workflowEndDateTime={endDate}
          setWorkflowEndDateTime={setEndDate}
          setCanAdvance={setCanAdvance}
          open={dialogOpen}
          onApply={() => {
            requestWorkflow(nodes, edges, config, workflowName);
            setDialogOpen(false);
          }}
          onCancel={() => setDialogOpen(false)}
        />
        {isToolDrop ? <OnToolDrop /> : <></>}
      </Grid>
    </Grid>
  );
}

function requestWorkflow(nodes, edges, config, workflowName) {
  const workflowRequest = getWorkflowRequest(workflowName, nodes, edges);
  const workflowService = new WorkflowService(config);

  const onSuccess = (data) => (
    <React.Fragment>
      <Submission
        text={`Successfully added ${workflowName}`}
        Icon={HowToRegIcon}
      />
    </React.Fragment>
  );

  workflowService.postWorkflow(
    JSON.stringify(workflowRequest),
    GenericError,
    onSuccess,
    <Loading />
  );
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
