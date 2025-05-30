import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const outputHandles = [
    { name: 'value' }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{ ...data, label: 'Input' }} 
      nodeType="input"
      outputHandles={outputHandles}
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
            value={inputType} 
            onChange={handleTypeChange}
            className="node-select"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};