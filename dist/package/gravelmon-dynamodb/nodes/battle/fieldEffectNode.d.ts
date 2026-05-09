import { DynamoEdge, DynamoNode } from '../../service/dynamoNodes';
import { MoveRange } from "../../models/battle/moveRange";
export declare const FieldEffectEntity = "FieldEffect";
export declare const FieldEffectFlagEntity = "FieldEffectFlag";
export declare const enum FieldEffectEdgeType {
    IsType = "IsType",
    WithFlag = "WithFlag"
}
export declare class FieldEffectIdentifier {
    game: string;
    fieldEffect: string;
    constructor(game: string, pokemon: string);
    toString(): string;
    static fromString(identifier: string): FieldEffectIdentifier;
    getFieldEffect(): string;
    serialize(): any;
    static deserialize(data: any): FieldEffectIdentifier;
}
export declare function createFieldEffectFlagNode(name: string): DynamoNode;
export declare function createFieldEffectIsTypeEdge(fieldEffectName: FieldEffectIdentifier, typeName: string): DynamoEdge;
export declare function createFieldEffectWithFlagEdge(fieldEffectName: FieldEffectIdentifier, flagName: string): DynamoEdge;
export interface FieldEffectData {
    associatedTypes?: string[];
    identifier: FieldEffectIdentifier;
    durationInTurns: number;
    fieldEffectRange: MoveRange.AllAllies | MoveRange.AllOpponents | MoveRange.AllPokemon;
    description?: string;
}
export declare class FieldEffectNode extends DynamoNode {
    fieldEffectData: FieldEffectData;
    rebalancedFieldEffectData?: FieldEffectData;
    fieldEffectFlags: string[];
    constructor(fieldEffectData: FieldEffectData, rebalancedFieldEffectData?: FieldEffectData, fieldEffectFlags?: string[]);
    static deserialize(data: Record<string, any>): FieldEffectNode;
    static deserializeFieldEffectData(data: any): FieldEffectData;
    private serializeFieldEffectData;
    serialize(): Record<string, any>;
}
