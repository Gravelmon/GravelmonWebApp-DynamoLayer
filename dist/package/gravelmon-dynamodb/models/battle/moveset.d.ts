import { DynamoEdge } from '../../service/dynamoNodes';
import { PokemonIdentifier } from '../../nodes/pokemon/pokemonNode';
import { MoveIdentifier, MoveCategory } from '../../nodes/battle/moveNode';
declare const enum MoveSetLearnType {
    LevelUp = "LevelUp",
    Teach = "Teach",
    Egg = "Egg",
    Legacy = "Legacy"
}
export declare function createMoveSetLevelUpMoveEdge(pokemonName: PokemonIdentifier, moveName: MoveIdentifier, level: number): DynamoEdge;
export declare function createMoveSetTeachMoveEdge(pokemonName: PokemonIdentifier, moveName: MoveIdentifier): DynamoEdge;
export declare function createMoveSetEggMoveEdge(pokemonName: PokemonIdentifier, moveName: MoveIdentifier): DynamoEdge;
export declare function createMoveSetLegacyMoveEdge(pokemonName: PokemonIdentifier, moveName: MoveIdentifier): DynamoEdge;
export interface MoveSetEntry {
    moveName: MoveIdentifier;
    category: MoveCategory;
    basePower: number;
    accuracy: number;
    type: string;
    rebalancedBasePower?: number;
    rebalancedAccuracy?: number;
    rebalancedType?: string;
}
export interface MoveSet {
    levelUpMoves: {
        moveName: MoveSetEntry;
        level: number;
    }[];
    teachMoves: MoveSetEntry[];
    eggMoves: MoveSetEntry[];
    legacyMoves: MoveSetEntry[];
}
export declare function serializeMoveSet(moveSet: MoveSet): any;
export declare function deserializeMoveSet(data: any): MoveSet;
export declare class MoveSetEdge extends DynamoEdge {
    constructor(moveName: MoveIdentifier, pokemonName: PokemonIdentifier, relationship: MoveSetLearnType);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): MoveSetEdge;
}
export declare class MoveSetLevelUpEdge extends MoveSetEdge {
    level: number;
    constructor(moveName: MoveIdentifier, pokemonName: PokemonIdentifier, level: number);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): MoveSetLevelUpEdge;
}
export {};
