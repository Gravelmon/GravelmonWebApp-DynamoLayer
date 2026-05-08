import { DynamoNode, DynamoEdge } from '../../service/dynamoNodes';
import { AbilityIdentifier } from '../battle/abilityNode';
import { BehaviourOptions } from '../../models/behaviour/behaviour';
import { Stats } from '../../models/properties/stats';
import { MoveSet } from '../../models/battle/moveset';
export declare const PokemonEntity = "Pokemon";
export declare const HasAbilityEdgeType = "HasAbility";
export declare enum PokemonTypeRelationship {
    PrimaryType = "PrimaryType",
    SecondaryType = "SecondaryType"
}
export declare function createPokemonNode(pokemonData: PokemonData, lastEdited?: number): PokemonNode;
export declare function createPokemonPrimaryTypeEdge(pokemonName: PokemonIdentifier, typeName: string, isRebalanced?: boolean, lastEdited?: number): PokemonTypeEdge;
export declare function createPokemonSecondaryTypeEdge(pokemonName: PokemonIdentifier, typeName: string, isRebalanced?: boolean, lastEdited?: number): PokemonTypeEdge;
export declare function createPokemonHasLabelEdge(pokemonName: PokemonIdentifier, labelName: string, lastEdited?: number): DynamoEdge;
export declare function createPokemonInEggGroupEdge(pokemonName: PokemonIdentifier, eggGroupName: string, lastEdited?: number): DynamoEdge;
export declare function createPokemonInExperienceGroupEdge(pokemonName: PokemonIdentifier, experienceGroupName: string, lastEdited?: number): DynamoEdge;
export declare function createPokemonHasAbilityEdge(pokemonName: PokemonIdentifier, abilityName: AbilityIdentifier, isHidden?: boolean, isPlaceholder?: boolean, isRebalanced?: boolean, lastEdited?: number): DynamoEdge;
export declare class PokemonIdentifier {
    game: string;
    pokemon: string;
    formName?: string;
    constructor(game: string, pokemon: string, formName?: string | string[]);
    toString(): string;
    static fromString(identifier: string): PokemonIdentifier;
    isForm(): boolean;
    serialize(): any;
    static deserialize(data: any): PokemonIdentifier;
}
export declare class Hitbox {
    width: number;
    height: number;
    fixed?: boolean;
    constructor(width: number, height: number, fixed?: boolean);
}
export interface PokemonData {
    pokemonIdentifier: PokemonIdentifier;
    baseStats: Stats;
    rebalancedStats?: Stats;
    evYield: Stats;
    heightInMeters: number;
    weightInKg: number;
    catchRate: number;
    maleRatio: number;
    baseExperience: number;
    baseFriendship: number;
    eggCycles: number;
    pokedexEntry: string;
    hitbox: Hitbox;
    baseScale: number;
    cannotDynamax: boolean;
    dropAmount: number;
    behaviourOptions?: BehaviourOptions;
    typing: {
        primaryType: string;
        secondaryType?: string;
    };
    rebalancedTyping?: {
        primaryType: string;
        secondaryType?: string;
    };
    speciesFeatures: string[];
    labels: string[];
    eggGroups: string[];
    experienceGroup: string;
    gameIntroducedIn: string;
    abilities: {
        name: string;
        isHidden: boolean;
        isRebalance: boolean;
        isPlaceholder: boolean;
    }[];
    forms: PokemonIdentifier[];
    moveSet: MoveSet;
    placeholderMoveSet?: MoveSet;
    rebalancedMoveSet?: MoveSet;
}
export declare function deserializePokemonData(rawData: any): PokemonData;
export declare class PokemonNode extends DynamoNode {
    pokemonData: PokemonData;
    static version: number;
    constructor(pokemonData: PokemonData, lastEdited?: number);
    serializePokemonData(): Record<string, any>;
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): PokemonNode;
}
declare abstract class PokemonTypeEdge extends DynamoEdge {
    isRebalanced: boolean;
    static version: number;
    constructor(pokemonName: PokemonIdentifier, typeName: string, relationship: PokemonTypeRelationship, isRebalanced?: boolean, lastEdited?: number);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): PokemonTypeEdge;
}
export declare class PokemonPrimaryTypeEdge extends PokemonTypeEdge {
    constructor(pokemonName: PokemonIdentifier, typeName: string, isRebalanced?: boolean, lastEdited?: number);
}
export declare class PokemonSecondaryTypeEdge extends PokemonTypeEdge {
    constructor(pokemonName: PokemonIdentifier, typeName: string, isRebalanced?: boolean, lastEdited?: number);
}
export declare class PokemonHasAbilityEdge extends DynamoEdge {
    isHidden: boolean;
    isPlaceholder: boolean;
    isRebalanced: boolean;
    static version: number;
    recipient: PokemonIdentifier;
    abilityIdentifier: AbilityIdentifier;
    constructor(pokemonName: PokemonIdentifier, abilityIdentifier: AbilityIdentifier, isHidden?: boolean, isPlaceholder?: boolean, isRebalanced?: boolean, lastEdited?: number);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): PokemonHasAbilityEdge;
}
export declare function getPokemonIdentifier(game: string, pokemon: string, formName?: string | string[]): PokemonIdentifier;
export {};
