import { DynamoEdge, DynamoNode } from '../../service/dynamoNodes';
import { MoveRange } from "../../models/battle/moveRange";
import { FieldEffectIdentifier } from "./fieldEffectNode";
export declare const MoveEntity = "Move";
export declare const MoveFlagEntity = "MoveFlag";
export declare const enum MoveEdgeType {
    IsType = "IsType",
    WithFlag = "WithFlag",
    AssociatedWithFieldEffect = "AssociatedWithFieldEffect"
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
export declare function createMoveFlagNode(name: string): DynamoNode;
export declare function createMoveIsTypeEdge(moveName: MoveIdentifier, typeName: string): DynamoEdge;
export declare function createMoveWithFlagEdge(moveName: MoveIdentifier, flagName: string): DynamoEdge;
export declare function createMoveAssociatedWithFieldEffectEdge(moveName: MoveIdentifier, fieldEffect: FieldEffectIdentifier): DynamoEdge;
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
    associatedWeathers?: FieldEffectIdentifier[];
    associatedTerrain?: FieldEffectIdentifier[];
    associatedFieldEffects?: FieldEffectIdentifier[];
}
export declare class MoveNode extends DynamoNode {
    moveIdentifier: MoveIdentifier;
    displayName: string;
    moveData: MoveData;
    rebalancedMoveData?: MoveData;
    moveFlags: string[];
    constructor(displayName: string, name: MoveIdentifier, moveData: MoveData, rebalancedMoveData?: MoveData, moveFlags?: string[]);
    static deserialize(data: Record<string, any>): MoveNode;
    static deserializeMoveData(data: any): MoveData;
    private serializeMoveData;
    serialize(): Record<string, any>;
}
