import { DynamoEdge, DynamoNode } from '../../service/dynamoNodes';
import { MoveRange } from "../../models/battle/moveRange";
export declare const MoveEntity = "Move";
export declare const MoveLabelEntity = "MoveLabel";
export declare const enum MoveEdgeType {
    IsType = "IsType",
    WithLabel = "WithLabel"
}
export declare enum MoveCategory {
    Physical = "Physical",
    Special = "Special",
    Status = "Status"
}
export declare class MoveIdentifier {
    game: string;
    move: string;
    constructor(game: string, pokemon: string);
    toString(): string;
    static fromString(identifier: string): MoveIdentifier;
    getMove(): string;
    serialize(): any;
    static deserialize(data: any): MoveIdentifier;
}
export declare function createMoveLabelNode(name: string): DynamoNode;
export declare function createMoveIsTypeEdge(moveName: MoveIdentifier, typeName: string): DynamoEdge;
export declare function createMoveWithLabelEdge(moveName: MoveIdentifier, labelName: string): DynamoEdge;
export interface MoveData {
    moveTypes: string[];
    powerPoints: number;
    basePower: number;
    priority: number;
    accuracy: number;
    moveRange: MoveRange;
    moveCategory: MoveCategory;
    description?: string;
    zMoveEffect?: string;
    itemRecipeCost: Record<string, number>;
    associatedWeathers?: string[];
    associatedTerrain?: string[];
    associatedFieldEffects?: string[];
}
export declare class MoveNode extends DynamoNode {
    moveIdentifier: MoveIdentifier;
    displayName: string;
    moveData: MoveData;
    rebalancedMoveData?: MoveData;
    moveLabels: string[];
    constructor(displayName: string, name: MoveIdentifier, moveData: MoveData, rebalancedMoveData?: MoveData, moveLabels?: string[]);
    static deserialize(data: Record<string, any>): MoveNode;
    static deserializeMoveData(data: any): MoveData;
    private serializeMoveData;
    serialize(): Record<string, any>;
}
