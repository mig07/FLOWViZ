import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
    Background,
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    updateEdge,
    Controls,
    MiniMap,
} from 'react-flow-renderer';

let id = -1;
const getId = () => `node${++id}`;

const nodeWidth = 150;
const nodeHeight = 40;

const initialNodes = [
  {
    id: getId(),
    type: 'default',
    data: { label: `Node ${id}` },
    style: { width: nodeWidth, height: nodeHeight },
    position: { x: 250, y: 5 },
  },
];

export default function Workflow() {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    // Set edges
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
    // Update edges
    const onEdgeUpdate = (oldEdge, newConnection) => setEdges((els) => updateEdge(oldEdge, newConnection, els));

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
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
            y: event.clientY
        });

        // Create the new node
        const newNode = {
            id: getId(),
            type: 'default',    
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
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          const type = event.dataTransfer.getData('application/reactflow');
    
          // check if the dropped element is valid
          if (typeof type === 'undefined' || !type) {
            return;
          }
    
          const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          });
          const newNode = {
            id: getId(),
            type,
            position,
            data: { label: `${type} node` },
          };
    
          setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
      );

    return (
        <div className="workflow">
        <ReactFlowProvider>
            <div 
                className="reactflow-wrapper"
                ref={reactFlowWrapper}
                style={{ height: '100vh', width: '100vw' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onPaneClick={onPaneClick}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onEdgeUpdate={onEdgeUpdate}
                deleteKeyCode={'Delete'}
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
};