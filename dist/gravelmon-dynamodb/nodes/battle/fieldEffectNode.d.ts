import { DynamoEdge, DynamoNode } from '../../service/dynamoNodes';
import { MoveRange } from "../../models/battle/moveRange";
export declare const FieldEffectEntity = "FieldEffect";
export declare const FieldEffectLabelEntity = "FieldEffectLabel";
export declare const enum FieldEffectEdgeType {
    IsType = "IsType",
    WithLabel = "WithLabel"
}
export interface FieldEffectType {
    type: string;
    isRebalanced: boolean;
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
export declare function createFieldEffectLabelNode(name: string): DynamoNode;
export declare function createFieldEffectIsTypeEdge(fieldEffectName: FieldEffectIdentifier, typeName: string): DynamoEdge;
export declare function createFieldEffectWithLabelEdge(fieldEffectName: FieldEffectIdentifier, labelName: string): DynamoEdge;
export interface FieldEffectData {
    identifier: FieldEffectIdentifier;
    durationInTurns: number;
    fieldEffectRange: MoveRange.AllAllies | MoveRange.AllOpponents | MoveRange.AllPokemon;
    description?: string;
}
export declare class FieldEffectNode extends DynamoNode {
    fieldEffectData: FieldEffectData;
    rebalancedFieldEffectData?: FieldEffectData;
    fieldEffectLabels: string[];
    constructor(fieldEffectData: FieldEffectData, rebalancedFieldEffectData?: FieldEffectData, fieldEffectLabels?: string[]);
    static deserialize(data: Record<string, any>): FieldEffectNode;
    static deserializeFieldEffectData(data: any): FieldEffectData;
    private serializeFieldEffectData;
    serialize(): Record<string, any>;
}
