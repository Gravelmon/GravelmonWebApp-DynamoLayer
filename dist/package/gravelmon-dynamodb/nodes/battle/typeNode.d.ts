import { DynamoNode } from '../../service/dynamoNodes';
export declare const TypeEntity = "Type";
export declare function createTypeNode(name: string, resists?: string[], immunities?: string[], weaknesses?: string[], introducedByGames?: string[]): TypeNode;
export declare class TypeNode extends DynamoNode {
    private resists?;
    private immunities?;
    private weaknesses?;
    private introducedByGames?;
    constructor(name: string, resists?: string[], immunities?: string[], weaknesses?: string[], introducedByGames?: string[]);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): DynamoNode;
}
