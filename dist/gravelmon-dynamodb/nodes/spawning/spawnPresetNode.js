"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpawnPresetEntity = void 0;
exports.createSpawnPresetNode = createSpawnPresetNode;
exports.createSpawnPresetDoesNotSpawnInBiomeEdge = createSpawnPresetDoesNotSpawnInBiomeEdge;
exports.createSpawnPresetDoesNotSpawnInBiomeTagEdge = createSpawnPresetDoesNotSpawnInBiomeTagEdge;
exports.createSpawnPresetSpawnsInBiomeEdge = createSpawnPresetSpawnsInBiomeEdge;
exports.createSpawnPresetSpawnsInBiomeTagEdge = createSpawnPresetSpawnsInBiomeTagEdge;
exports.createSpawnPresetSpawnsInStructureEdge = createSpawnPresetSpawnsInStructureEdge;
exports.createSpawnPresetSpawnsInStructureTagEdge = createSpawnPresetSpawnsInStructureTagEdge;
exports.createSpawnPresetDoesNotSpawnInStructureEdge = createSpawnPresetDoesNotSpawnInStructureEdge;
exports.createSpawnPresetDoesNotSpawnInStructureTagEdge = createSpawnPresetDoesNotSpawnInStructureTagEdge;
const dynamoNodes_1 = require("../../service/dynamoNodes");
const biomeNode_1 = require("../minecraft/biomeNode");
const structureNode_1 = require("../minecraft/structureNode");
const spawnCondition_1 = require("../../models/spawning/spawnCondition");
const resourceLocation_1 = require("../../models/minecraft/resourceLocation");
const deserializerRegistry_1 = require("../../service/deserializerRegistry");
exports.SpawnPresetEntity = "SpawnPreset";
class SpawnPresetNode extends dynamoNodes_1.DynamoNode {
    constructor(spawnPresetOptions, lastEdited = Date.now()) {
        super(exports.SpawnPresetEntity, spawnPresetOptions.name.toString(), SpawnPresetNode.version, lastEdited);
        this.spawnPresetOptions = spawnPresetOptions;
    }
    static deserialize(data) {
        if (!data.spawnPresetOptions || !data.spawnPresetOptions.name) {
            throw new Error("Invalid data for deserializing SpawnPresetNode: missing spawnPresetOptions or name");
        }
        const options = {
            name: resourceLocation_1.ResourceLocation.deserialize(data.spawnPresetOptions.name),
            condition: data.spawnPresetOptions.condition ? spawnCondition_1.SpawnCondition.deserialize(data.spawnPresetOptions.condition) : undefined,
            antiCondition: data.spawnPresetOptions.antiCondition ? spawnCondition_1.SpawnCondition.deserialize(data.spawnPresetOptions.antiCondition) : undefined
        };
        return new SpawnPresetNode(options);
    }
    serialize() {
        return {
            ...super.serialize(),
            spawnPresetOptions: {
                name: this.spawnPresetOptions.name.serialize(),
                condition: this.spawnPresetOptions.condition ? this.spawnPresetOptions.condition.serialize() : undefined,
                antiCondition: this.spawnPresetOptions.antiCondition ? this.spawnPresetOptions.antiCondition.serialize() : undefined
            }
        };
    }
}
SpawnPresetNode.version = 1;
// Note: The edges between spawn presets and biomes/structures are stored in the opposite direction of the edges between spawn data and biomes/structures,
// since it is more intuitive to traverse from biomes/structures to spawn presets than the other way around.
function createSpawnPresetNode(spawnPresetOptions) {
    return new SpawnPresetNode(spawnPresetOptions);
}
function createSpawnPresetDoesNotSpawnInBiomeEdge(spawnPresetName, biomeName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(biomeNode_1.BiomeEntity, biomeName), biomeNode_1.DoesNotSpawnInBiomeEdgeType, exports.SpawnPresetEntity, spawnPresetName);
}
function createSpawnPresetDoesNotSpawnInBiomeTagEdge(spawnPresetName, biomeTagName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(biomeNode_1.BiomeTagEntity, biomeTagName), biomeNode_1.DoesNotSpawnInBiomeEdgeType, exports.SpawnPresetEntity, spawnPresetName);
}
function createSpawnPresetSpawnsInBiomeEdge(spawnPresetName, biomeName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(biomeNode_1.BiomeEntity, biomeName), biomeNode_1.SpawnsInBiomeEdgeType, exports.SpawnPresetEntity, spawnPresetName);
}
function createSpawnPresetSpawnsInBiomeTagEdge(spawnPresetName, biomeTagName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(biomeNode_1.BiomeTagEntity, biomeTagName), biomeNode_1.SpawnsInBiomeEdgeType, exports.SpawnPresetEntity, spawnPresetName);
}
function createSpawnPresetSpawnsInStructureEdge(spawnPresetName, StructureName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(structureNode_1.StructureEntity, StructureName), structureNode_1.SpawnsInStructureEdgeType, exports.SpawnPresetEntity, spawnPresetName);
}
function createSpawnPresetSpawnsInStructureTagEdge(spawnPresetName, StructureTagName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(structureNode_1.StructureTagEntity, StructureTagName), structureNode_1.SpawnsInStructureEdgeType, exports.SpawnPresetEntity, spawnPresetName);
}
function createSpawnPresetDoesNotSpawnInStructureEdge(spawnPresetName, StructureName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(structureNode_1.StructureEntity, StructureName), structureNode_1.DoesNotSpawnInStructureEdgeType, exports.SpawnPresetEntity, spawnPresetName);
}
function createSpawnPresetDoesNotSpawnInStructureTagEdge(spawnPresetName, StructureTagName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(structureNode_1.StructureTagEntity, StructureTagName), structureNode_1.DoesNotSpawnInStructureEdgeType, exports.SpawnPresetEntity, spawnPresetName);
}
deserializerRegistry_1.deserializerRegistry.register(exports.SpawnPresetEntity, SpawnPresetNode.deserialize);
