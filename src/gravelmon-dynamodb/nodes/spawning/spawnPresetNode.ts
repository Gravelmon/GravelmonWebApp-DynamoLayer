import { DynamoEdge, DynamoNode, getNodePK } from '../../service/dynamoNodes';
import { BiomeEntity, BiomeTagEntity, DoesNotSpawnInBiomeEdgeType, SpawnsInBiomeEdgeType } from '../minecraft/biomeNode';
import { DoesNotSpawnInStructureEdgeType, SpawnsInStructureEdgeType, StructureEntity, StructureTagEntity } from '../minecraft/structureNode';
import { SpawnCondition } from '../../models/spawning/spawnCondition';
import { ResourceLocation } from '../../models/minecraft/resourceLocation';
import { deserializerRegistry } from '../../service/deserializerRegistry';

export const SpawnPresetEntity = "SpawnPreset";

export interface SpawnPresetOptions {
    name: ResourceLocation;
    condition?: SpawnCondition;
    antiCondition?: SpawnCondition;
}

export class SpawnPresetNode extends DynamoNode {
    spawnPresetOptions: SpawnPresetOptions;
    static version = 1;

    constructor(spawnPresetOptions: SpawnPresetOptions, lastEdited: number = Date.now()) {
        super(SpawnPresetEntity, spawnPresetOptions.name.toString(), SpawnPresetNode.version, lastEdited);
        this.spawnPresetOptions = spawnPresetOptions;
    }

    static deserialize(data: Record<string, any>): SpawnPresetNode {
        if(!data.spawnPresetOptions || !data.spawnPresetOptions.name) {
            throw new Error("Invalid data for deserializing SpawnPresetNode: missing spawnPresetOptions or name");
        }
        const options: SpawnPresetOptions = {
            name: ResourceLocation.deserialize(data.spawnPresetOptions.name),
            condition: data.spawnPresetOptions.condition ? SpawnCondition.deserialize(data.spawnPresetOptions.condition) : undefined,
            antiCondition: data.spawnPresetOptions.antiCondition ? SpawnCondition.deserialize(data.spawnPresetOptions.antiCondition) : undefined
        };

        return new SpawnPresetNode(options);
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            spawnPresetOptions: {
                name: this.spawnPresetOptions.name.serialize(),
                condition: this.spawnPresetOptions.condition ? this.spawnPresetOptions.condition.serialize() : undefined,
                antiCondition: this.spawnPresetOptions.antiCondition ? this.spawnPresetOptions.antiCondition.serialize() : undefined
            }
        }
    }
}

// Note: The edges between spawn presets and biomes/structures are stored in the opposite direction of the edges between spawn data and biomes/structures,
// since it is more intuitive to traverse from biomes/structures to spawn presets than the other way around.
export function createSpawnPresetNode(spawnPresetOptions: SpawnPresetOptions): SpawnPresetNode {
    return new SpawnPresetNode(spawnPresetOptions);
}

export function createSpawnPresetDoesNotSpawnInBiomeEdge(spawnPresetName: ResourceLocation, biomeName: ResourceLocation): DynamoEdge {
    return new DynamoEdge(getNodePK(BiomeEntity, biomeName.toString()), DoesNotSpawnInBiomeEdgeType, SpawnPresetEntity, spawnPresetName.toString());
}

export function createSpawnPresetDoesNotSpawnInBiomeTagEdge(spawnPresetName: ResourceLocation, biomeTagName: ResourceLocation): DynamoEdge {
    return new DynamoEdge(getNodePK(BiomeTagEntity, biomeTagName.toString()), DoesNotSpawnInBiomeEdgeType, SpawnPresetEntity, spawnPresetName.toString());
}

export function createSpawnPresetSpawnsInBiomeEdge(spawnPresetName: ResourceLocation, biomeName: ResourceLocation): DynamoEdge {
    return new DynamoEdge(getNodePK(BiomeEntity, biomeName.toString()), SpawnsInBiomeEdgeType, SpawnPresetEntity, spawnPresetName.toString());
}

export function createSpawnPresetSpawnsInBiomeTagEdge(spawnPresetName: ResourceLocation, biomeTagName: ResourceLocation): DynamoEdge {
    return new DynamoEdge(getNodePK(BiomeTagEntity, biomeTagName.toString()), SpawnsInBiomeEdgeType, SpawnPresetEntity, spawnPresetName.toString());
}

export function createSpawnPresetSpawnsInStructureEdge(spawnPresetName: ResourceLocation, StructureName: ResourceLocation): DynamoEdge {
    return new DynamoEdge(getNodePK(StructureEntity, StructureName.toString()), SpawnsInStructureEdgeType, SpawnPresetEntity, spawnPresetName.toString());
}

export function createSpawnPresetSpawnsInStructureTagEdge(spawnPresetName: ResourceLocation, StructureTagName: ResourceLocation): DynamoEdge {
    return new DynamoEdge(getNodePK(StructureTagEntity, StructureTagName.toString()), SpawnsInStructureEdgeType, SpawnPresetEntity, spawnPresetName.toString());
}

export function createSpawnPresetDoesNotSpawnInStructureEdge(spawnPresetName: ResourceLocation, StructureName: ResourceLocation): DynamoEdge {
    return new DynamoEdge(getNodePK(StructureEntity, StructureName.toString()), DoesNotSpawnInStructureEdgeType, SpawnPresetEntity, spawnPresetName.toString());
}

export function createSpawnPresetDoesNotSpawnInStructureTagEdge(spawnPresetName: ResourceLocation, StructureTagName: ResourceLocation): DynamoEdge {
    return new DynamoEdge(getNodePK(StructureTagEntity, StructureTagName.toString()), DoesNotSpawnInStructureEdgeType, SpawnPresetEntity, spawnPresetName.toString());
}

deserializerRegistry.register(SpawnPresetEntity, SpawnPresetNode.deserialize);