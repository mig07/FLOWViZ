import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useCallback, useRef, useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import GenericErrorBar from "../component/common/genericErrorBar";
import Loading from "../component/common/loading";
import ToolNode from "../component/whiteboard/task/toolNode";
import WorkflowSubmitDialog from "../component/whiteboard/workflowSubmitDialog";

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

export default function Whiteboard({
  toolService,
  workflowService,
  setDrawerList,
}) {
  // Get NavBar height from theme
  const theme = useTheme();
  const navigate = useNavigate();
  const appBarHeight = theme.mixins.toolbar.minHeight;

  const reactFlowWrapper = useRef(null);

  // Whiteboard GUI state
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [nodeChanged, setNodeChanged] = useState(null);

  // States if the workflow can be commited
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Is the user dropping a tool into the whiteboard
  const [isToolDrop, setIsToolDrop] = useState(false);
  const [droppingToolName, setDroppingToolName] = useState("");
  const [droppingToolPos, setDroppingToolPos] = useState(null);

  // State for fetched tools to avoid unnecessarry HTTP requests
  const [fetchedTools, setFetchedTools] = useState(new Map());

  // Workflow name and datetimes for workflow submission
  const [dialogOpen, setDialogOpen] = useState(false);
  const [workflowSubmission, setWorkflowSubmission] = useState({
    workflowName: "",
    workflowDescription: "",
    startDateTime: new Date(),
  });

  // Updates relayed data if a node changed
  useEffect(() => {
    const eds = [...edges];
    const targets = [];

    eds.forEach((e) => {
      if (e.source === nodeChanged) {
        targets.push(e.target);
      }
    });

    targets.forEach((t) => updateNodeInputs(nodeChanged, t));
  }, [nodeChanged]);

  const onWorkflowSubmission = (
    workflowName,
    workflowDescription,
    startDateTime,
    endDateTime
  ) => {
    setWorkflowSubmission({
      workflowName: workflowName,
      workflowDescription: workflowDescription,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
    });
    setIsSubmitting(true);
  };

  toolService.getTools(GenericErrorBar, setDrawerList, <Loading />);

  const onNodeSetupUpdate = useCallback((nodeId, data) => {
    setNodes((nds) => {
      return nds.map((node) => {
        if (node.id === nodeId) {
          node.data = data;
          setNodeChanged(node.id);
        }
        return node;
      });
    });
  });

  // Detects and avoids loops inside the drawn workflow
  const hasLoop = useCallback((currEdges, currTarget) => {
    if (currEdges.length <= 0) return false;

    const targetEdgeNode = currEdges.find((e) => e.source === currTarget);
    if (!targetEdgeNode) return false;

    return targetEdgeNode.target !== null;
  });

  const updateNodeInputs = useCallback((sourceNodeId, targetNodeId) => {
    setNodes((nds) => {
      const sourceNode = nds.find((n) => n.id === sourceNodeId);

      return nds.map((n) => {
        if (n.id === targetNodeId) {
          n.data.config.inputs.push(sourceNode.data.config.outputs);
        }
        return n;
      });
    });
  });

  // Set edges
  const onConnect = useCallback((params) => {
    const source = params.source;
    const target = params.target;

    setEdges((eds) => {
      if (hasLoop(eds, target)) return eds;
      return addEdge(params, eds);
    });
    updateNodeInputs(source, target);
  }, []);

  // Update edges
  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    const source = oldEdge.source;
    const target = newConnection.target;

    setEdges((els) => {
      if (hasLoop(els, target)) return els;
      return updateEdge(oldEdge, newConnection, els);
    });
    updateNodeInputs(source, target);
  });

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const OnToolDrop = () => {
    const onSuccess = (tool) => {
      setFetchedTools((fetchedToolsMap) =>
        fetchedToolsMap.set(droppingToolName, tool)
      );

      const node = {
        id: getId(),
        type: "tool",
        position: droppingToolPos,
        data: {
          tool: tool,
          name: "",
          config: {
            inputs: [],
            outputs: [],
            setup: {},
          },
          onNodeUpdate: onNodeSetupUpdate,
        },
      };

      setNodes((nds) => nds.concat(node));
      setDroppingToolName("");
      setDroppingToolPos(null);
      setIsToolDrop(false);
    };

    // Checks if tool was already fetched
    const tool = fetchedTools.get(droppingToolName);

    if (!tool) {
      // Fetches tool if not found inside state
      toolService.getTool(
        droppingToolName,
        GenericErrorBar,
        onSuccess,
        <Loading />
      );
    } else {
      // Creates node if tool was found inside state
      onSuccess(tool);
    }

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

  function WorkflowRequest() {
    const workflowRequest = getWorkflowRequest(
      workflowSubmission,
      nodes,
      edges
    );

    const OnSuccess = () => {
      navigate("/submission", {
        state: {
          text: `Workflow ${workflowSubmission.workflowName} was successfully submitted!`,
          resourcePageLabel: workflowSubmission.workflowName,
          resourcePageUrl: `/workflow/${workflowSubmission.workflowName}`,
        },
      });
    };

    return workflowService.postWorkflow(
      JSON.stringify(workflowRequest),
      (error) => <GenericErrorBar error={error} />,
      OnSuccess,
      <Loading />
    );
  }

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
          open={dialogOpen}
          onApply={(workflowName, description, startDateTime) => {
            onWorkflowSubmission(workflowName, description, startDateTime);
            setDialogOpen(false);
          }}
          onCancel={() => setDialogOpen(false)}
        />
        {isToolDrop ? <OnToolDrop /> : <></>}
        {isSubmitting ? <WorkflowRequest /> : <></>}
      </Grid>
    </Grid>
  );
}

function getWorkflowRequest(workflowSubmission, nodes, edges) {
  const workflow = [];

  const name = workflowSubmission.workflowName;
  const description = workflowSubmission.workflowDescription;
  const startDateTime = workflowSubmission.startDateTime;

  nodes.forEach((node) => {
    const nodeId = node.id;
    const toolName = node.data.tool.general.name;
    const type = node.data.tool.access._type;

    const children = edges.map((edge) => {
      if (edge.source.includes(nodeId)) {
        return nodes.find((node) => node.id === edge.target).data.name;
      }
    });

    const step = {
      id: node.data.name,
      tool: toolName,
      action: node.data.config,
      children: children,
    };
    workflow.push(step);
  });
  return {
    name: name,
    description: description,
    startDateTime: startDateTime,
    tasks: workflow,
  };
}

/* function isWorkflowValid(nodes, edges) {
  if (nodes.length === 0 || edges.length === 0) return false;

  // Checking if all nodes have assigned names
  const areStepNamesValid = nodes.every(
    (step) => step.data.stepName && step.data.stepName !== ""
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
} */
