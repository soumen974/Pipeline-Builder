import React from 'react';
import { Handle, Position } from 'reactflow';
import './nodes.css'; // We'll create this CSS file for styling

export const BaseNode = ({ 
  id, 
  data, 
  children, 
  nodeType,
  inputHandles = [], 
  outputHandles = [] 
}) => {
  // Determine width based on data or default to 200px
  const width = data?.width || 200;
  
  // Determine height based on data, content, or default to 80px
  const height = data?.height || 80;

  return (
    <div 
      className={`node ${nodeType}-node`}
      style={{ 
        width, 
        minHeight: height
      }}
    >
      {/* Input Handles */}
      {inputHandles.map((handle, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={handle.id || `${id}-${handle.name}`}
          style={{ top: `${((index + 1) * 100) / (inputHandles.length + 1)}%`, ...(handle.style || {}) }}
        />
      ))}
      
      <div className="node-header">
        <span>{data?.label || nodeType}</span>
      </div>
      
      <div className="node-content">
        {children}
      </div>
      
      {/* Output Handles */}
      {outputHandles.map((handle, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={handle.id || `${id}-${handle.name}`}
          style={{ top: `${((index + 1) * 100) / (outputHandles.length + 1)}%`, ...(handle.style || {}) }}
        />
      ))}
    </div>
  );
};