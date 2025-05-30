import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');
  const [customCode, setCustomCode] = useState(data?.customCode || '');

  // Input and output handles
  const inputHandles = [
    { name: 'input' }
  ];
  
  const outputHandles = [
    { name: 'output' }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{ ...data, label: 'Transform' }} 
      nodeType="transform"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    >
      <div className="node-form">
        <select 
          value={transformType} 
          onChange={(e) => setTransformType(e.target.value)}
          className="node-select"
        >
          <option value="uppercase">To Uppercase</option>
          <option value="lowercase">To Lowercase</option>
          <option value="trim">Trim</option>
          <option value="custom">Custom</option>
        </select>
        {transformType === 'custom' && (
          <textarea 
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            placeholder="Custom transformation code"
            className="node-textarea"
          />
        )}
      </div>
    </BaseNode>
  );
};