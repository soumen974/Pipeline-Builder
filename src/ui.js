

import { useState, useRef, useCallback, useEffect, memo } from 'react';
import ReactFlow, { 
  Controls, 
  Background, 
  MiniMap,
  useReactFlow,
  Panel
} from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = memo(({ nodesFromApp, setNodesFromApp, edgesFromApp, setEdgesFromApp }) => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    // Logger for development
    // if (process.env.NODE_ENV === 'development') {
    //   console.log('PipelineUI rendered with nodes:', nodes, 'and edges:', edges);
    // }

    const getInitNodeData = useCallback((nodeID, type) => {
      return { 
        id: nodeID, 
        nodeType: `${type}`,
        createdAt: new Date().toISOString(),
        createdBy: 'soumen974'
      };
    }, []);

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
          
          try {
            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const dataTransfer = event.dataTransfer.getData('application/reactflow');
            
            if (!dataTransfer) {
              return;
            }
            
            const appData = JSON.parse(dataTransfer);
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            // Snap to grid
            const snappedPosition = {
              x: Math.round(position.x / gridSize) * gridSize,
              y: Math.round(position.y / gridSize) * gridSize,
            };

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position: snappedPosition,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          } catch (error) {
            console.error('Error handling drop event:', error);
          }
        },
        [reactFlowInstance, getNodeID, addNode, getInitNodeData]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    // Sync state with parent component
    useEffect(() => {
      if (setNodesFromApp && setEdgesFromApp) {
        setNodesFromApp(nodes);
        setEdgesFromApp(edges);
      }
    }, [nodes, edges, setNodesFromApp, setEdgesFromApp]);

    // Function to fit view to all nodes
    const fitView = useCallback(() => {
      if (reactFlowInstance) {
        reactFlowInstance.fitView({ padding: 0.2 });
      }
    }, [reactFlowInstance]);

    return (
        <div 
          ref={reactFlowWrapper} 
          style={{ width: '100%', height: '100vh' }}
          aria-label="Pipeline Flow Editor"
          role="application"
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                snapToGrid={true}
                connectionLineType='smoothstep'
                deleteKeyCode={['Backspace', 'Delete']}
                multiSelectionKeyCode={['Control', 'Meta']}
                selectionOnDrag={true}
                fitView
            >
                <Background color="#aaa" gap={gridSize} size={1.1} />
                 <MiniMap 
                  nodeStrokeColor={(n) => {
                    if (n.type === 'text') return '#';
                    if (n.type === 'llm') return '#7b69ec';
                    if (n.type === 'customOutput') return '#b8b6b6';
                    return '#4caf50';
                  }}
                  nodeColor={(n) => {
                    if (n.type === 'text') return '#d0e7ff';
                    if (n.type === 'llm') return '#7b69ec';
                    if (n.type === 'customOutput') return '#c8c5d9';
                    return '#4caf50';
                  }}
                />
                <Controls showInteractive={true} />
               
               
            </ReactFlow>
        </div>
    );
});

// Add display name for better debugging
PipelineUI.displayName = 'PipelineUI';