import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  // Define input and output handles
  const inputHandles = [
    { name: 'system' },
    { name: 'prompt' }
  ];
  
  const outputHandles = [
    { name: 'response' }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{ ...data, label: 'LLM' }} 
      nodeType="llm"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    >
      <div className="llm-content">
        <span>This is a LLM.</span>
        <select className="node-select">
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
        </select>
        <div className="param-row">
          <label>Temperature:</label>
          <input 
            type="number" 
            min="0" 
            max="1" 
            step="0.1" 
            defaultValue="0.7" 
            className="node-input"
          />
        </div>
      </div>
    </BaseNode>
  );
};