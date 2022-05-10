import React, { useState, useCallback, useRef } from "react";
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
import ToolNode from "../whiteboard/toolNode";

let id = -1;
const getId = () => `node${++id}`;

const nodeWidth = 150;
const nodeHeight = 40;

const nodeTypes = { tool: ToolNode };

export default function Workflow(props) {
  const serverConf = props.config;
  const onToolSetupButtonOpen = props.onToolSetupButtonOpen;

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

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

  const onPaneClick = useCallback(
    (event) => {
      event.preventDefault();

      // If the event wasn't triggered by a left mouse button click, then return.
      if (event.button !== 0) {
        return;
      }

      // Register the click position
      const position = reactFlowInstance.project({
        x: event.clientX,
        y: event.clientY,
      });

      // Create the new node
      const newNode = {
        id: getId(),
        type: "default",
        position,
        style: { width: nodeWidth, height: nodeHeight },
        data: { label: `Node ${id}` },
      };

      // Concat new node
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

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
      const uri = `${serverConf.appProtocol}://${serverConf.address}:${serverConf.port}/library/${toolName}`;
      const request = await fetch(uri);
      const response = await request.json();

      const newNode = {
        id: getId(),
        type: "tool",
        position: position,
        data: {
          label: toolName,
          tool: response,
          onToolSetupButtonOpen: onToolSetupButtonOpen,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div>
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
            /* onPaneClick={onPaneClick} */
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
    </div>
  );
}
