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
    evolutionConditions?: EvolutionCondition<any>[];
    needsToHoldItem?: ResourceLocation;
    requiresItemUsedOn?: ResourceLocation;
    shedsIntoForm?: PokemonIdentifier;
    learnsMovesUponEvolving?: MoveIdentifier[];
}
export declare function deserializeEvolutionOptions(options: any): EvolutionOptions;
export declare function serializeEvolutionOptions(evolutionOptions: EvolutionOptions): {
    evolutionType: EvolutionType;
    consumesHeldItem: boolean | undefined;
    isOptional: boolean | undefined;
    evolutionConditions: Record<string, any>[] | undefined;
    needsToHoldItem: any;
    useItemOn: any;
    shedsIntoForm: any;
    learnsMoveUponEvolving: any[] | undefined;
};
export declare class EvolutionNode extends DynamoNode {
    currentPokemon: PokemonIdentifier;
    evolutions: EvolutionOptions[];
    preEvolutions: PokemonIdentifier[];
    static version: number;
    constructor(currentPokemon: PokemonIdentifier, evolutions: EvolutionOptions[], preEvolutions: PokemonIdentifier[], lastEdited?: number);
    serialize(): any;
    static deserialize(data: any): EvolutionNode;
}
