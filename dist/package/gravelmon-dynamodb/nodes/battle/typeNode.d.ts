import { DynamoNode } from '../../service/dynamoNodes';
export declare const TypeEntity = "Type";
export declare function createTypeNode(name: string, typeInteractions: TypeInteractions, rebalancedTypeInteractions?: TypeInteractions, introducedByGames?: string[]): TypeNode;
export interface TypeInteractions {
    resists: string[];
    immunities: string[];
    weaknesses: string[];
    secondaryEffect?: string;
}
export declare class TypeNode extends DynamoNode {
    private introducedByGames?;
    private typeInteractions;
    private rebalancedTypeInteractions;
    constructor(name: string, typeInteractions: TypeInteractions, rebalancedTypeInteractions?: TypeInteractions, introducedByGames?: string[]);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): DynamoNode;
}
