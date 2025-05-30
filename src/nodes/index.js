import { InputNode } from './inputNode';
import { OutputNode } from './outputNode';
import { LLMNode } from './llmNode';
import { TextNode } from './textNode';
import { DataNode } from './DataNode';
import { FilterNode } from './FilterNode';
import { TransformNode } from './TransformNode';
import { ConditionNode } from './ConditionNode';
import { APINode } from './APINode';

// Node registry for easily accessing all node types
export const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  llm: LLMNode,
  text: TextNode,
  data: DataNode,
  filter: FilterNode,
  transform: TransformNode,
  condition: ConditionNode,
  api: APINode,
};