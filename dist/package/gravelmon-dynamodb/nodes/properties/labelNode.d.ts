import { DynamoNode } from '../../service/dynamoNodes';
export declare const LabelEntity = "Label";
export declare const HasLabelEdgeType = "HasLabel";
export declare function createLabelNode(name: string, lastEdited?: number): DynamoNode;
