import { DynamoNode } from '../../service/dynamoNodes';
import { MoveRange } from "../../models/battle/moveRange";
import { MoveIdentifier } from "./moveNode";
import { AbilityIdentifier } from "./abilityNode";
export declare const FieldEffectEntity = "FieldEffect";
export declare const FieldEffectFlagEntity = "FieldEffectFlag";
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
export declare class FieldEffectFlagNode extends DynamoNode {
    fieldEffects: FieldEffectIdentifier[];
    constructor(name: string, fieldEffects: FieldEffectIdentifier[]);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): FieldEffectFlagNode;
}
export interface FieldEffectData {
    associatedTypes?: string[];
    durationInTurns: number;
    fieldEffectRange: MoveRange.AllAllies | MoveRange.AllOpponents | MoveRange.AllPokemon;
    description?: string;
}
export declare class FieldEffectNode extends DynamoNode {
    displayName: string;
    identifier: FieldEffectIdentifier;
    fieldEffectData: FieldEffectData;
    rebalancedFieldEffectData?: FieldEffectData;
    fieldEffectFlags: string[];
    associatedMoves: MoveIdentifier[];
    associatedAbilities: AbilityIdentifier[];
    introducedByGames: string[];
    implemented: boolean;
    constructor(displayName: string, identifier: FieldEffectIdentifier, fieldEffectData: FieldEffectData, associationMoves: MoveIdentifier[], associatedAbilities: AbilityIdentifier[], rebalancedFieldEffectData?: FieldEffectData, introducedByGames?: string[], fieldEffectFlags?: string[], implemented?: boolean);
    static deserialize(data: Record<string, any>): FieldEffectNode;
    static deserializeFieldEffectData(data: any): FieldEffectData;
    private serializeFieldEffectData;
    serialize(): Record<string, any>;
}
