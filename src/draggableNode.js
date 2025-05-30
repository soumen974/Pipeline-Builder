import React from 'react';

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const ChooseColor= ({label})=>{
    const colors = ['Input', 'LLM',"Output","Text"];
    if(label.includes(colors[0])){
      return 'bg-green-500';
    }
    if(label.includes(colors[1])){
      return 'bg-purple-500';
    }
    if(label.includes(colors[2])){
      return 'bg-red-500';
    }
    if(label.includes(colors[3])){
      return 'bg-blue-500';
    }
    return 'bg-gray-500';
  

    
  }

  return (
    <div
      className={`
           px-4 py-2  text-white bg-black rounded-md shadow-sm
          hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-blue-300
          transition-colors duration-200 ease-in-out
        cursor-grab select-none
        ${type}
      `}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
      aria-label={`Drag ${label} node to canvas`}
    >
      <span>{label}</span>
    </div>
  );
};