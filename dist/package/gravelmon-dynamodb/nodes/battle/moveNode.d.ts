import { DynamoNode } from '../../service';
import { MoveRange } from "../../models";
import { FieldEffectIdentifier } from "./fieldEffectNode";
import { PokemonIdentifier } from "../pokemon/pokemonNode";
export declare const MoveEntity = "Move";
export declare const MoveFlagEntity = "MoveFlag";
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
export declare class MoveFlagNode extends DynamoNode {
    moves: MoveIdentifier[];
    constructor(name: string, moves: MoveIdentifier[]);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): MoveFlagNode;
}
export interface LearnedByData {
    levelUp: PokemonIdentifier[];
    teach: PokemonIdentifier[];
    egg: PokemonIdentifier[];
    legacy: PokemonIdentifier[];
    evolution: PokemonIdentifier[];
}
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
    associatedWeathers?: FieldEffectIdentifier[];
    associatedTerrain?: FieldEffectIdentifier[];
    associatedFieldEffects?: FieldEffectIdentifier[];
}
export declare function deserializeLearnedBy(data: any): {
    levelUp: any;
    teach: any;
    egg: any;
    legacy: any;
    evolution: any;
};
export declare function serializeLearnedBy(data: LearnedByData): {
    levelUp: any[];
    teach: any[];
    egg: any[];
    legacy: any[];
    evolution: any[];
};
export declare class MoveNode extends DynamoNode {
    moveIdentifier: MoveIdentifier;
    displayName: string;
    moveData: MoveData;
    rebalancedMoveData?: MoveData;
    moveFlags: string[];
    implemented: boolean;
    itemRecipeCost: Record<string, number>;
    learnedBy: LearnedByData;
    rebalancedLearnedBy: LearnedByData;
    constructor(displayName: string, name: MoveIdentifier, moveData: MoveData, learnedBy: LearnedByData, rebalancedMoveData?: MoveData, rebalancedLearnedBy?: LearnedByData, moveFlags?: string[], implemented?: boolean, itemRecipeCost?: Record<string, number>);
    static deserialize(data: Record<string, any>): MoveNode;
    static deserializeMoveData(data: any): MoveData;
    private serializeMoveData;
    serialize(): Record<string, any>;
}
