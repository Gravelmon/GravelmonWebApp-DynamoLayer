import { DynamoNode } from '../../service';
import { ResourceLocation } from '../../models';
import { deserializerRegistry } from '../../service';
import {PokemonIdentifier} from "../pokemon/pokemonNode";

export const StructureEntity = "Structure";
export const StructureTagEntity = "StructureTag";

export class StructureNode extends DynamoNode {
    resourceLocation: ResourceLocation;
    containedBy: ResourceLocation[];
    usedInSpawnPresets: ResourceLocation[];
    canSpawnPokemon: PokemonIdentifier[];

    constructor(resourceLocation: ResourceLocation, containedBy: ResourceLocation[] = [], usedInSpawnPresets: ResourceLocation[] = [], canSpawnPokemon: PokemonIdentifier[] = []) {
        super(StructureTagEntity, resourceLocation.toString());
        this.resourceLocation = resourceLocation;
        this.containedBy = containedBy;
        this.usedInSpawnPresets = usedInSpawnPresets;
        this.canSpawnPokemon = canSpawnPokemon;
    }
    
    static deserialize(data: Record<string, any>): DynamoNode {
        if(!data.resourceLocation) {
            throw new Error("Invalid data for deserializing StructureNode: missing resourceLocation");
        }

        return new StructureNode(ResourceLocation.deserialize(data.resourceLocation),
            data.containedBy?.map((structureData: any) => ResourceLocation.deserialize(structureData)) ?? [],
            data.usedInSpawnPresets?.map((structureData: any) => ResourceLocation.deserialize(structureData)) ?? [],
            data.canSpawnPokemon?.map((pokemonData: any) => PokemonIdentifier.deserialize(pokemonData)) ?? []);
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            resourceLocation: this.resourceLocation.serialize(),
            containedBy: this.containedBy.map(Structure => Structure.serialize()),
            usedInSpawnPresets: this.usedInSpawnPresets.map(Structure => Structure.serialize()),
            canSpawnPokemon: this.canSpawnPokemon.map(pokemon => pokemon.serialize())
        }
    }
}

export class StructureTagNode extends DynamoNode {
    resourceLocation: ResourceLocation;
    containsStructures: ResourceLocation[];
    containedBy: ResourceLocation[];
    usedInSpawnPresets: ResourceLocation[];
    canSpawnPokemon: PokemonIdentifier[];
    constructor(resourceLocation: ResourceLocation, containsStructures: ResourceLocation[] = [], containedBy: ResourceLocation[] = [],
                usedInSpawnPresets: ResourceLocation[] = [], canSpawnPokemon: PokemonIdentifier[] = []) {
        super(StructureTagEntity, resourceLocation.toString());
        this.resourceLocation = resourceLocation;
        this.containsStructures = containsStructures;
        this.containedBy = containedBy;
        this.usedInSpawnPresets = usedInSpawnPresets;
        this.canSpawnPokemon = canSpawnPokemon;
    }

    static deserialize(data: Record<string, any>): StructureTagNode {
        if(!data.resourceLocation) {
            throw new Error("Invalid data for deserializing StructureTagNode: missing resourceLocation");
        }
        return new StructureTagNode(ResourceLocation.deserialize(data.resourceLocation),
            Array.isArray(data.containsStructures) ? data.containsStructures.map((structureData: any) => ResourceLocation.deserialize(structureData)) : [],
            data.containedBy?.map((structureData: any) => ResourceLocation.deserialize(structureData)) ?? [],
            data.usedInSpawnPresets?.map((structureData: any) => ResourceLocation.deserialize(structureData)) ?? [],
            data.canSpawnPokemon?.map((pokemonData: any) => PokemonIdentifier.deserialize(pokemonData)) ?? []);
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            resourceLocation: this.resourceLocation.serialize(),
            containsStructures: this.containsStructures.map(Structure => Structure.serialize()),
            containedBy: this.containedBy.map(Structure => Structure.serialize()),
            usedInSpawnPresets: this.usedInSpawnPresets.map(Structure => Structure.serialize()),
            canSpawnPokemon: this.canSpawnPokemon.map(pokemon => pokemon.serialize())
        }
    }
}

deserializerRegistry.register(StructureEntity, StructureNode.deserialize);
deserializerRegistry.register(StructureTagEntity, StructureTagNode.deserialize);