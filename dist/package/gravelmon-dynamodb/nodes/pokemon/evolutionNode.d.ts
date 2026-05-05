import { DynamoEdge, DynamoNode } from '../../service/dynamoNodes';
import { MoveIdentifier } from '../battle/moveNode';
import { ResourceLocation } from '../../models/minecraft/resourceLocation';
import { PokemonIdentifier } from './pokemonNode';
import { EvolutionCondition } from '../../models/properties/evolutionCondition';
export declare const EvolutionEntity = "Evolution";
export declare function createEvolutionNode(evolutionOptions: EvolutionOptions, lastEdited?: number): EvolutionNode;
export declare function createEvolutionNeedsToHoldItemEdge(evolutionName: string, itemResourceLocation: ResourceLocation): DynamoEdge;
export declare function createEvolutionUseItemOnEdge(evolutionName: string, itemResourceLocation: ResourceLocation): DynamoEdge;
export declare function createEvolutionLearnsMoveUponEvolvingEdge(evolutionName: string, moveName: MoveIdentifier): DynamoEdge;
export declare enum EvolutionType {
    LevelUp = "level_up",
    ItemInteract = "item_interact",
    Trade = "trade"
}
export declare class EvolutionIdentifier {
    source: PokemonIdentifier;
    result: PokemonIdentifier;
    constructor(source: PokemonIdentifier, result: PokemonIdentifier);
    toString(): string;
    static fromString(identifier: string): EvolutionIdentifier;
    serialize(): any;
    static deserialize(data: any): EvolutionIdentifier;
}
export interface EvolutionOptions {
    identifier: EvolutionIdentifier;
    evolutionType: EvolutionType;
    consumesHeldItem?: boolean;
    isOptional?: boolean;
    evolutionConditions: EvolutionCondition[];
    needsToHoldItem?: ResourceLocation;
    requiresItemUsedOn?: ResourceLocation;
    evolvesFromForm: PokemonIdentifier;
    evolvesIntoForm: PokemonIdentifier;
    shedsIntoForm?: PokemonIdentifier;
    learnsMovesUponEvolving?: MoveIdentifier[];
}
export declare class EvolutionNode extends DynamoNode {
    evolutionOptions: EvolutionOptions;
    static version: number;
    constructor(evolutionOptions: EvolutionOptions, lastEdited?: number);
    serialize(): any;
    static deserialize(data: any): EvolutionNode;
}
