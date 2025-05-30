import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [expression, setExpression] = useState(data?.expression || '');

  // Input and output handles
  const inputHandles = [
    { name: 'condition' },
    { name: 'value' }
  ];
  
  const outputHandles = [
    { name: 'true' },
    { name: 'false' }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{ ...data, label: 'Condition' }} 
      nodeType="condition"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    >
      <div className="node-form">
        <input 
          type="text" 
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Enter condition expression"
          className="node-input"
        />
      </div>
    </BaseNode>
  );
};