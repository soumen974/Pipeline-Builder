import { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  // Lift the state for nodes and edges to the App component
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  return (
    <div className="">
      <div className="max">
        <header className="p-6 hidden absolute flex gap-5 z-50  justify-center items-center border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Pipeline Builder</h1>
          <p className="text-gray-600 mt-2">Create and visualize your data processing pipelines</p>
        </header>
        
        <PipelineToolbar />
        
        <div className="p-">
          <PipelineUI 
            nodes={nodes} 
            setNodes={setNodes} 
            edges={edges} 
            setEdges={setEdges} 
          />
        </div>
        
        <SubmitButton nodes={nodes} edges={edges} />
      </div>
    </div>
  );
}

export default App;