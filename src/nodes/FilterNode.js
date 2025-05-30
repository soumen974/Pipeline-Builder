import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'equals');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');

  // Input and output handles
  const inputHandles = [
    { name: 'data' }
  ];
  
  const outputHandles = [
    { name: 'filtered' },
    { name: 'rejected' }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{ ...data, label: 'Filter' }} 
      nodeType="filter"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    >
      <div className="node-form">
        <select 
          value={operation} 
          onChange={(e) => setOperation(e.target.value)}
          className="node-select"
        >
          <option value="equals">Equals</option>
          <option value="contains">Contains</option>
          <option value="greater">Greater Than</option>
          <option value="less">Less Than</option>
        </select>
        <input 
          type="text" 
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Filter value"
          className="node-input"
        />
      </div>
    </BaseNode>
  );
};