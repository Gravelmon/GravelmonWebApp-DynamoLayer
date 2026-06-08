export type ExpressionNode =
    | LogicalNode
    | ComparisonNode
    | QueryNode
    | LiteralNode
    | BooleanNode;

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

        case 'query':
            return {
                type: 'query',
                query: node.query,
                inverted: node.inverted,
                args: node.args.map(serializeExpression),
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

        case 'query':
            return {
                type: 'query',
                query: data.query,
                inverted: data.inverted ?? false,
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