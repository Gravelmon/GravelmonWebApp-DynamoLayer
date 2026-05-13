import { DynamoNode } from '../../service/dynamoNodes';
import { AbilityIdentifier } from '../battle/abilityNode';
import { BehaviourOptions } from '../../models/behaviour/behaviour';
import { Stats } from '../../models/properties/stats';
import { MoveSet } from '../../models/battle/moveset';
import { RidingBehaviourOptions as RidingOptions } from "../../models";
export declare const PokemonEntity = "Pokemon";
export declare const HasAbilityEdgeType = "HasAbility";
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
    heightInDecimeters: number;
    weightInDeciGrams: number;
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
    standingEyeHeight?: number;
    behaviourOptions?: BehaviourOptions;
    riding?: RidingOptions;
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
        identifier: AbilityIdentifier;
        isHidden: boolean;
        isRebalanced: boolean;
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
export declare function getPokemonIdentifier(game: string, pokemon: string, formName?: string | string[]): PokemonIdentifier;
