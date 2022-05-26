import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  Background,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  updateEdge,
  Controls,
  MiniMap,
} from "react-flow-renderer";
import ToolNode from "../component/whiteboard/step/toolNode";

let id = -1;
const getId = () => `node${++id}`;

const nodeWidth = 150;
const nodeHeight = 40;

const nodeTypes = { tool: ToolNode };

export default function Whiteboard(props) {
  const config = props.config;
  const uri = `${config.appProtocol}://${config.address}:${config.port}/library`;
  
  const reactFlowWrapper = useRef(null);

  // Whiteboard GUI state
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Libraries and APIs state hook
  const [list, setList] = useState([]);

  // The workflow composition
  const [workflowSteps, setWorkflowSteps] = useState([]);

  const workflowStep = (name, setup) => {
    return {
      name: name,
      action: setup,
      nextActions: [],
      previousActions: [],
    };
  };

  const onAddStep = (step) => {
    const updatedStep = workflowStep(step.name, step.setup);
    setWorkflowSteps([...workflowSteps, updatedStep]);
  };

  const onRemoveStep = (stepName) => {
    setWorkflowSteps((workflowSteps) =>
      workflowSteps.filter((step) => step.name !== stepName)
    );
  };

  useEffect(() => {
    fetch(uri)
      .then((response) => response.json())
      .then(setList);
  }, []);

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
      const uri = `${config.appProtocol}://${config.address}:${config.port}/library/${toolName}`;
      const request = await fetch(uri);
      const response = await request.json();

      const newNode = {
        id: getId(),
        type: "tool",
        position: position,
        data: {
          label: toolName,
          tool: response,
          onAddStep: onAddStep,
          onRemoveStep: onRemoveStep,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <>
      {/* <DrawerNavBar/> */}
      {/* <ToolDrawer tools={list} /> */}

      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          ref={reactFlowWrapper}
          style={{ height: "100vh", width: "100vw" }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onEdgeUpdate={onEdgeUpdate}
            deleteKeyCode={"Delete"}
            nodeTypes={nodeTypes}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background variant="lines" color="#aaa" gap={12} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </>
  );
}
