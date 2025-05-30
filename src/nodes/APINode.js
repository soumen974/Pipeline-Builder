import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  // Input and output handles
  const inputHandles = [
    { name: 'request' },
    { name: 'headers' }
  ];
  
  const outputHandles = [
    { name: 'response' },
    { name: 'error' }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{ ...data, label: 'API Request' }} 
      nodeType="api"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    >
      <div className="node-form">
        <select 
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
          className="node-select"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="API Endpoint URL"
          className="node-input"
        />
      </div>
    </BaseNode>
  );
};