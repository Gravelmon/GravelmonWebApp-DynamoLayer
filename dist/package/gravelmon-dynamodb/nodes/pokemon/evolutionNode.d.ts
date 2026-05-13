import { MoveIdentifier } from '../battle/moveNode';
import { ResourceLocation } from '../../models/minecraft/resourceLocation';
import { PokemonIdentifier } from './pokemonNode';
import { EvolutionCondition } from '../../models/properties/evolutionCondition';
import { DynamoNode } from "../../service";
export declare const EvolutionEntity = "Evolution";
export declare enum EvolutionType {
    LevelUp = "level_up",
    ItemInteract = "item_interact",
    Trade = "trade"
}
export interface EvolutionOptions {
    evolutionType: EvolutionType;
    consumesHeldItem?: boolean;
    isOptional?: boolean;
    evolutionConditions: EvolutionCondition<any>[];
    needsToHoldItem?: ResourceLocation;
    requiresItemUsedOn?: ResourceLocation;
    shedsIntoForm?: PokemonIdentifier;
    learnsMovesUponEvolving?: MoveIdentifier[];
}
export declare class EvolutionNode extends DynamoNode {
    currentPokemon: PokemonIdentifier;
    evolutions: PokemonIdentifier[];
    preEvolutions: PokemonIdentifier[];
    evolutionOptions: EvolutionOptions;
    static version: number;
    constructor(currentPokemon: PokemonIdentifier, evolutionOptions: EvolutionOptions, evolutions: PokemonIdentifier[], preEvolutions: PokemonIdentifier[], lastEdited?: number);
    serialize(): any;
    static deserialize(data: any): EvolutionNode;
}
