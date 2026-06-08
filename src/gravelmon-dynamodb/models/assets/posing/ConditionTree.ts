export type ExpressionNode =
    | LogicalNode
    | ComparisonNode
    | QueryNode
    | LiteralNode
    | TernaryNode
    | NotNode
    | BooleanNode;

export interface QueryNode {
    type: 'query';

    query: string;
    args: ExpressionNode[];
}

export interface TernaryNode {
    type: 'ternary';

    condition: ExpressionNode;
    ifTrue: ExpressionNode;
    ifFalse: ExpressionNode;
}

export interface LiteralNode {
    type: 'literal';

    value: string | number;
}

export interface NotNode {
    type: 'not';
    value: ExpressionNode;
}

export interface BooleanNode {
    type: 'boolean';

    value: boolean;
}

export interface ComparisonNode {
    type: 'comparison';
    operator:
        | '=='
        | '!='
        | '>'
        | '>='
        | '<'
        | '<=';

    left: ExpressionNode;
    right: ExpressionNode;
}

export interface LogicalNode {
    type: 'logical';
    operator: '&&' | '||';
    left: ExpressionNode;
    right: ExpressionNode;
}

export function serializeExpression(node: ExpressionNode): any {
    switch (node.type) {
        case 'logical':
            return {
                type: 'logical',
                operator: node.operator,
                left: serializeExpression(node.left),
                right: serializeExpression(node.right),
            };

        case 'comparison':
            return {
                type: 'comparison',
                operator: node.operator,
                left: serializeExpression(node.left),
                right: serializeExpression(node.right),
            };

        case 'ternary':
            return {
                type: 'ternary',
                condition: serializeExpression(node.condition),
                ifTrue: serializeExpression(node.ifTrue),
                ifFalse: serializeExpression(node.ifFalse),
            };

        case 'query':
            return {
                type: 'query',
                query: node.query,
                args: node.args.map(serializeExpression),
            };

        case 'not':
            return {
                type: 'not',
                value: serializeExpression(node.value)
            };

        case 'literal':
            return {
                type: 'literal',
                value: node.value,
            };

        case 'boolean':
            return {
                type: 'boolean',
                value: node.value,
            };
    }
}

export function deserializeExpression(data: any): ExpressionNode {
    console.log(data);
    switch (data.type) {
        case 'logical':
            return {
                type: 'logical',
                operator: data.operator,
                left: deserializeExpression(data.left),
                right: deserializeExpression(data.right),
            };

        case 'comparison':
            return {
                type: 'comparison',
                operator: data.operator,
                left: deserializeExpression(data.left),
                right: deserializeExpression(data.right),
            };

        case 'ternary':
            return {
                type: 'ternary',
                condition: deserializeExpression(data.condition),
                ifTrue: deserializeExpression(data.ifTrue),
                ifFalse: deserializeExpression(data.ifFalse),
            };

        case 'not':
            return {
                type: 'not',
                value: deserializeExpression(data.value),
            };

        case 'query':
            return {
                type: 'query',
                query: data.query,
                args: (data.args ?? []).map(deserializeExpression),
            };

        case 'literal':
            return {
                type: 'literal',
                value: data.value,
            };

        case 'boolean':
            return {
                type: 'boolean',
                value: data.value,
            };

        default:
            throw new Error(`Unknown ExpressionNode type: ${data.type}`);
    }
}