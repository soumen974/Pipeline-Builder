import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const inputHandles = [
    { name: 'value' }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{ ...data, label: 'Output' }} 
      nodeType="output"
      inputHandles={inputHandles}
    >
      <div className="node-form">
        <label className="node-field">
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange} 
            className="node-input"
          />
        </label>
        <label className="node-field">
          Type:
          <select 
            value={outputType} 
            onChange={handleTypeChange}
            className="node-select"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};