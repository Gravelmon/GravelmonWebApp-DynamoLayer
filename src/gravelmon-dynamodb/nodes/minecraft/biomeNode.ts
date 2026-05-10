import { DynamoNode } from '../../service';
import { ResourceLocation } from '../../models';
import { deserializerRegistry } from '../../service';
import {PokemonIdentifier} from "../pokemon/pokemonNode";

export const BiomeEntity = "Biome";
export const BiomeTagEntity = "BiomeTag";

export class BiomeNode extends DynamoNode {
    resourceLocation: ResourceLocation;
    containedBy: ResourceLocation[];
    usedInSpawnPresets: ResourceLocation[];
    canSpawnPokemon: PokemonIdentifier[];
    static version = 1;

    constructor(resourceLocation: ResourceLocation, containedBy: ResourceLocation[] = [], usedInSpawnPresets: ResourceLocation[] = [], canSpawnPokemon: PokemonIdentifier[] = []) {
        super(BiomeTagEntity, resourceLocation.toString());
        this.resourceLocation = resourceLocation;
        this.containedBy = containedBy;
        this.usedInSpawnPresets = usedInSpawnPresets;
        this.canSpawnPokemon = canSpawnPokemon;
        this.version = BiomeNode.version;
    }

    static deserialize(data: Record<string, any>): DynamoNode {
        if(!data.resourceLocation) {
            throw new Error("Invalid data for deserializing BiomeNode: missing resourceLocation");
        }

        return new BiomeNode(ResourceLocation.deserialize(data.resourceLocation),
            data.containedBy?.map((biomeData: any) => ResourceLocation.deserialize(biomeData)) ?? [],
            data.usedInSpawnPresets?.map((biomeData: any) => ResourceLocation.deserialize(biomeData)) ?? [],
            data.canSpawnPokemon?.map((pokemonData: any) => PokemonIdentifier.deserialize(pokemonData)) ?? []);
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            resourceLocation: this.resourceLocation.serialize(),
            containedBy: this.containedBy.map(Biome => Biome.serialize()),
            usedInSpawnPresets: this.usedInSpawnPresets.map(Biome => Biome.serialize()),
            canSpawnPokemon: this.canSpawnPokemon.map(pokemon => pokemon.serialize())
        }
    }
}

export class BiomeTagNode extends DynamoNode {
    resourceLocation: ResourceLocation;
    containsBiomes: ResourceLocation[];
    containedBy: ResourceLocation[];
    usedInSpawnPresets: ResourceLocation[];
    canSpawnPokemon: PokemonIdentifier[];
    static version = 1;
    constructor(resourceLocation: ResourceLocation, containsBiomes: ResourceLocation[] = [], containedBy: ResourceLocation[] = [],
                usedInSpawnPresets: ResourceLocation[] = [], canSpawnPokemon: PokemonIdentifier[] = []) {
        super(BiomeTagEntity, resourceLocation.toString());
        this.resourceLocation = resourceLocation;
        this.containsBiomes = containsBiomes;
        this.containedBy = containedBy;
        this.usedInSpawnPresets = usedInSpawnPresets;
        this.canSpawnPokemon = canSpawnPokemon;
        this.version = BiomeTagNode.version;
    }

    static deserialize(data: Record<string, any>): BiomeTagNode {
        if(!data.resourceLocation) {
            throw new Error("Invalid data for deserializing BiomeTagNode: missing resourceLocation");
        }
        return new BiomeTagNode(ResourceLocation.deserialize(data.resourceLocation),
            Array.isArray(data.containsBiomes) ? data.containsBiomes.map((biomeData: any) => ResourceLocation.deserialize(biomeData)) : [],
            data.containedBy?.map((biomeData: any) => ResourceLocation.deserialize(biomeData)) ?? [],
            data.usedInSpawnPresets?.map((biomeData: any) => ResourceLocation.deserialize(biomeData)) ?? [],
            data.canSpawnPokemon?.map((pokemonData: any) => PokemonIdentifier.deserialize(pokemonData)) ?? []);
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            resourceLocation: this.resourceLocation.serialize(),
            containsBiomes: this.containsBiomes.map(Biome => Biome.serialize()),
            containedBy: this.containedBy.map(Biome => Biome.serialize()),
            usedInSpawnPresets: this.usedInSpawnPresets.map(Biome => Biome.serialize()),
            canSpawnPokemon: this.canSpawnPokemon.map(pokemon => pokemon.serialize())
        }
    }
}

deserializerRegistry.register(BiomeEntity, BiomeNode.deserialize);
deserializerRegistry.register(BiomeTagEntity, BiomeTagNode.deserialize);