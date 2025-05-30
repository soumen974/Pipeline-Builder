import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const DataNode = ({ id, data }) => {
  const [sourceType, setSourceType] = useState(data?.sourceType || 'csv');
  const [sourcePath, setSourcePath] = useState(data?.sourcePath || '');

  // Input and output handles
  const inputHandles = [
    { name: 'query' }
  ];
  
  const outputHandles = [
    { name: 'result' }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{ ...data, label: 'Data Source' }} 
      nodeType="data"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    >
      <div className="node-form">
        <select 
          value={sourceType} 
          onChange={(e) => setSourceType(e.target.value)}
          className="node-select"
        >
          <option value="csv">CSV File</option>
          <option value="database">Database</option>
          <option value="api">API</option>
        </select>
        <input 
          type="text" 
          value={sourcePath}
          onChange={(e) => setSourcePath(e.target.value)}
          placeholder="Data source path/URL"
          className="node-input"
        />
      </div>
    </BaseNode>
  );
};