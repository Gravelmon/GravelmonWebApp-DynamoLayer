import { DynamoNode } from '../../service';
import { ResourceLocation } from '../../models';
import { PokemonIdentifier } from "../pokemon/pokemonNode";
export declare const StructureEntity = "Structure";
export declare const StructureTagEntity = "StructureTag";
export declare class StructureNode extends DynamoNode {
    resourceLocation: ResourceLocation;
    containedBy: ResourceLocation[];
    usedInSpawnPresets: ResourceLocation[];
    canSpawnPokemon: PokemonIdentifier[];
    constructor(resourceLocation: ResourceLocation, containedBy?: ResourceLocation[], usedInSpawnPresets?: ResourceLocation[], canSpawnPokemon?: PokemonIdentifier[]);
    static deserialize(data: Record<string, any>): DynamoNode;
    serialize(): Record<string, any>;
}
export declare class StructureTagNode extends DynamoNode {
    resourceLocation: ResourceLocation;
    containsStructures: ResourceLocation[];
    containedBy: ResourceLocation[];
    usedInSpawnPresets: ResourceLocation[];
    canSpawnPokemon: PokemonIdentifier[];
    constructor(resourceLocation: ResourceLocation, containsStructures?: ResourceLocation[], containedBy?: ResourceLocation[], usedInSpawnPresets?: ResourceLocation[], canSpawnPokemon?: PokemonIdentifier[]);
    static deserialize(data: Record<string, any>): StructureTagNode;
    serialize(): Record<string, any>;
}
