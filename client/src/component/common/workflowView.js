import React, { useCallback } from "react";
import ReactFlow, { Background } from "react-flow-renderer";

export default function WorkflowView({ nodes, edges }) {
  return (
    <div
      style={{
        height: `500px`,
        width: "100%",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        attributionPosition="top-right"
      >
        <Background variant="lines" color="#bbb" gap={20} />
      </ReactFlow>
    </div>
  );
}
