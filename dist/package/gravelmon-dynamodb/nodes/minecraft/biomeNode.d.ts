import { DynamoNode } from '../../service';
import { ResourceLocation } from '../../models';
import { PokemonIdentifier } from "../pokemon/pokemonNode";
export declare const BiomeEntity = "Biome";
export declare const BiomeTagEntity = "BiomeTag";
export declare class BiomeNode extends DynamoNode {
    resourceLocation: ResourceLocation;
    containedBy: ResourceLocation[];
    usedInSpawnPresets: ResourceLocation[];
    canSpawnPokemon: PokemonIdentifier[];
    static version: number;
    constructor(resourceLocation: ResourceLocation, containedBy?: ResourceLocation[], usedInSpawnPresets?: ResourceLocation[], canSpawnPokemon?: PokemonIdentifier[]);
    static deserialize(data: Record<string, any>): DynamoNode;
    serialize(): Record<string, any>;
}
export declare class BiomeTagNode extends DynamoNode {
    resourceLocation: ResourceLocation;
    containsBiomes: ResourceLocation[];
    containedBy: ResourceLocation[];
    usedInSpawnPresets: ResourceLocation[];
    canSpawnPokemon: PokemonIdentifier[];
    static version: number;
    constructor(resourceLocation: ResourceLocation, containsBiomes?: ResourceLocation[], containedBy?: ResourceLocation[], usedInSpawnPresets?: ResourceLocation[], canSpawnPokemon?: PokemonIdentifier[]);
    static deserialize(data: Record<string, any>): BiomeTagNode;
    serialize(): Record<string, any>;
}
