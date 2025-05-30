import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 200, height: 80 });
  const textareaRef = useRef(null);

  // Parse variables from text and update handles
  useEffect(() => {
    // Regular expression to find {{variableName}} patterns
    const regex = /\{\{([^}]+)\}\}/g;
    let match;
    const foundVariables = [];
    
    while ((match = regex.exec(currText)) !== null) {
      // Trim whitespace from variable name
      const varName = match[1].trim();
      if (!foundVariables.includes(varName)) {
        foundVariables.push(varName);
      }
    }
    
    setVariables(foundVariables);
  }, [currText]);

  // Auto-resize based on content
  useEffect(() => {
    if (textareaRef.current) {
      // Calculate approximate width based on text length
      const newWidth = Math.min(
        Math.max(currText.length * 8, 200), // Min 200px, scales with text length
        400 // Max 400px
      );
      
      // Calculate height based on text content
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.max(
        textareaRef.current.scrollHeight + 40, // Add padding
        80 // Minimum height
      );
      
      setDimensions({ width: newWidth, height: newHeight });
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Create input handles for each variable
  const inputHandles = variables.map(varName => ({ 
    name: varName,
    id: `${id}-${varName}`
  }));
  
  // Create single output handle
  const outputHandles = [
    { name: 'output' }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{ 
        ...data, 
        label: 'Text',
        width: dimensions.width,
        height: dimensions.height
      }} 
      nodeType="text"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    >
      <div className="text-content">
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text here... Use {{variable}} to create input handles"
          className="text-node-textarea"
          style={{ 
            width: '100%',
            height: `${dimensions.height - 40}px` // Account for header
          }}
        />
      </div>
    </BaseNode>
  );
};