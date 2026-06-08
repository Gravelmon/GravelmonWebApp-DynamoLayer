export type ExpressionNode = LogicalNode | ComparisonNode | QueryNode | LiteralNode | BooleanNode;
export interface QueryNode {
    type: 'query';
    query: string;
    inverted: boolean;
    args: ExpressionNode[];
}
export interface LiteralNode {
    type: 'literal';
    value: string | number;
}
export interface BooleanNode {
    type: 'boolean';
    value: boolean;
}
export interface ComparisonNode {
    type: 'comparison';
    operator: '==' | '!=' | '>' | '>=' | '<' | '<=';
    left: ExpressionNode;
    right: ExpressionNode;
}
export interface LogicalNode {
    type: 'logical';
    operator: '&&' | '||';
    left: ExpressionNode;
    right: ExpressionNode;
}
export declare function serializeExpression(node: ExpressionNode): any;
export declare function deserializeExpression(data: any): ExpressionNode;
