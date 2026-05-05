"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpawnType = exports.UsesPresetEdgeType = exports.RequiredBlockEdgeType = exports.PreferredBlockEdgeType = exports.SpawnsEdgeType = exports.PartOfHerdEdgeType = exports.SpawnDataEntity = void 0;
exports.serializeSpawnData = serializeSpawnData;
exports.deserializeSpawnData = deserializeSpawnData;
exports.createSpawnDataUsesSpawnPresetEdge = createSpawnDataUsesSpawnPresetEdge;
exports.createSpawnDataPrefersBlockEdge = createSpawnDataPrefersBlockEdge;
exports.createSpawnDataRequiresBlockEdge = createSpawnDataRequiresBlockEdge;
exports.createSpawnDataDoesNotSpawnInBiomeEdge = createSpawnDataDoesNotSpawnInBiomeEdge;
exports.createSpawnDataDoesNotSpawnInBiomeTagEdge = createSpawnDataDoesNotSpawnInBiomeTagEdge;
exports.createSpawnDataSpawnsInBiomeEdge = createSpawnDataSpawnsInBiomeEdge;
exports.createSpawnDataSpawnsInBiomeTagEdge = createSpawnDataSpawnsInBiomeTagEdge;
exports.createSpawnDataSpawnsInStructureEdge = createSpawnDataSpawnsInStructureEdge;
exports.createSpawnDataSpawnsInStructureTagEdge = createSpawnDataSpawnsInStructureTagEdge;
exports.createSpawnDataDoesNotSpawnInStructureEdge = createSpawnDataDoesNotSpawnInStructureEdge;
exports.createSpawnDataDoesNotSpawnInStructureTagEdge = createSpawnDataDoesNotSpawnInStructureTagEdge;
const dynamoNodes_1 = require("../../service/dynamoNodes");
const itemNode_1 = require("../../nodes/minecraft/itemNode");
const resourceLocation_1 = require("../minecraft/resourceLocation");
const pokemonNode_1 = require("../../nodes/pokemon/pokemonNode");
const numberRange_1 = require("../properties/numberRange");
const spawnPresetNode_1 = require("../../nodes/spawning/spawnPresetNode");
const spawnCondition_1 = require("./spawnCondition");
const biomeNode_1 = require("../../nodes/minecraft/biomeNode");
const structureNode_1 = require("../../nodes/minecraft/structureNode");
exports.SpawnDataEntity = "SpawnData";
exports.PartOfHerdEdgeType = "PartOfHerd";
exports.SpawnsEdgeType = "Spawns";
exports.PreferredBlockEdgeType = "PreferredBlock";
exports.RequiredBlockEdgeType = "RequiredBlock";
exports.UsesPresetEdgeType = "UsesPreset";
var SpawnType;
(function (SpawnType) {
    SpawnType["Pokemon"] = "pokemon";
    SpawnType["Pokemon_Herd"] = "pokemon-herd";
})(SpawnType || (exports.SpawnType = SpawnType = {}));
function serializeHerdSpawnEntry(herdSpawnEntry) {
    return {
        pokemonIdentifier: herdSpawnEntry.pokemonIdentifier.serialize(),
        levelRange: herdSpawnEntry.levelRange.serialize(),
        weight: herdSpawnEntry.weight,
        maxTimes: herdSpawnEntry.maxTimes,
        isLeader: herdSpawnEntry.isLeader,
        levelRangeOffset: herdSpawnEntry.levelRangeOffset.serialize()
    };
}
function deserializeHerdSpawnEntry(data) {
    return {
        pokemonIdentifier: pokemonNode_1.PokemonIdentifier.deserialize(data.pokemonIdentifier),
        levelRange: numberRange_1.NumberRange.deserialize(data.levelRange),
        weight: data.weight,
        maxTimes: data.maxTimes,
        isLeader: data.isLeader,
        levelRangeOffset: numberRange_1.NumberRange.deserialize(data.levelRangeOffset)
    };
}
function serializeSpawnData(spawnDataNode) {
    return {
        levelRange: spawnDataNode.levelRange.serialize(),
        spawnType: spawnDataNode.spawnType,
        spawnWeight: spawnDataNode.spawnWeight,
        spawnablePositionTypes: spawnDataNode.spawnablePositionTypes,
        spawnBucket: spawnDataNode.spawnBucket,
        moonPhaseMultiplier: spawnDataNode.moonPhaseMultiplier,
        weightMultiplier: spawnDataNode.weightMultiplier,
        maxHerdSize: spawnDataNode.maxHerdSize,
        minDistanceBetweenSpawns: spawnDataNode.minDistanceBetweenSpawns,
        condition: spawnDataNode.condition?.serialize(),
        antiCondition: spawnDataNode.antiCondition?.serialize(),
        herdSpawnEntries: spawnDataNode.herdSpawnEntries?.map(serializeHerdSpawnEntry),
        preferredBlocks: spawnDataNode.preferredBlocks?.map(block => block.serialize()),
        requiredBlocks: spawnDataNode.requiredBlocks?.map(block => block.serialize())
    };
}
function deserializeSpawnData(data) {
    return {
        levelRange: numberRange_1.NumberRange.deserialize(data.levelRange),
        spawnType: data.spawnType,
        spawnWeight: data.spawnWeight,
        spawnablePositionTypes: data.spawnablePositionTypes,
        spawnBucket: data.spawnBucket,
        moonPhaseMultiplier: data.moonPhaseMultiplier,
        weightMultiplier: data.weightMultiplier,
        maxHerdSize: data.maxHerdSize,
        minDistanceBetweenSpawns: data.minDistanceBetweenSpawns,
        condition: data.condition ? spawnCondition_1.SpawnCondition.deserialize(data.condition) : undefined,
        antiCondition: data.antiCondition ? spawnCondition_1.SpawnCondition.deserialize(data.antiCondition) : undefined,
        herdSpawnEntries: data.herdSpawnEntries?.map(deserializeHerdSpawnEntry),
        preferredBlocks: data.preferredBlocks?.map((block) => resourceLocation_1.ResourceLocation.deserialize(block)),
        requiredBlocks: data.requiredBlocks?.map((block) => resourceLocation_1.ResourceLocation.deserialize(block))
    };
}
// Note: The edges between spawn data and biomes/structures are stored in the same direction as the edges between spawn presets and biomes/structures,
// since it is more intuitive to traverse from biomes/structures to spawn data than the other way around.
function createSpawnDataUsesSpawnPresetEdge(spawnDataName, spawnPresetName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(spawnPresetNode_1.SpawnPresetEntity, spawnPresetName), exports.UsesPresetEdgeType, spawnDataName.toString(), exports.SpawnDataEntity);
}
function createSpawnDataPrefersBlockEdge(spawnDataName, blockName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(itemNode_1.ItemEntity, blockName.toString()), exports.PreferredBlockEdgeType, exports.SpawnDataEntity, spawnDataName.toString());
}
function createSpawnDataRequiresBlockEdge(spawnDataName, blockName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(itemNode_1.ItemEntity, blockName.toString()), exports.RequiredBlockEdgeType, exports.SpawnDataEntity, spawnDataName.toString());
}
function createSpawnDataDoesNotSpawnInBiomeEdge(spawnDataName, biomeName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(biomeNode_1.BiomeEntity, biomeName.toString()), biomeNode_1.DoesNotSpawnInBiomeEdgeType, exports.SpawnDataEntity, spawnDataName.toString());
}
function createSpawnDataDoesNotSpawnInBiomeTagEdge(spawnDataName, biomeTagName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(biomeNode_1.BiomeTagEntity, biomeTagName.toString()), biomeNode_1.DoesNotSpawnInBiomeEdgeType, exports.SpawnDataEntity, spawnDataName.toString());
}
function createSpawnDataSpawnsInBiomeEdge(spawnDataName, biomeName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(biomeNode_1.BiomeEntity, biomeName.toString()), biomeNode_1.SpawnsInBiomeEdgeType, exports.SpawnDataEntity, spawnDataName.toString());
}
function createSpawnDataSpawnsInBiomeTagEdge(spawnDataName, biomeTagName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(biomeNode_1.BiomeTagEntity, biomeTagName.toString()), biomeNode_1.SpawnsInBiomeEdgeType, exports.SpawnDataEntity, spawnDataName.toString());
}
function createSpawnDataSpawnsInStructureEdge(spawnDataName, StructureName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(structureNode_1.StructureEntity, StructureName.toString()), structureNode_1.SpawnsInStructureEdgeType, exports.SpawnDataEntity, spawnDataName.toString());
}
function createSpawnDataSpawnsInStructureTagEdge(spawnDataName, StructureTagName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(structureNode_1.StructureTagEntity, StructureTagName.toString()), structureNode_1.SpawnsInStructureEdgeType, exports.SpawnDataEntity, spawnDataName.toString());
}
function createSpawnDataDoesNotSpawnInStructureEdge(spawnDataName, StructureName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(structureNode_1.StructureEntity, StructureName.toString()), structureNode_1.DoesNotSpawnInStructureEdgeType, exports.SpawnDataEntity, spawnDataName.toString());
}
function createSpawnDataDoesNotSpawnInStructureTagEdge(spawnDataName, StructureTagName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(structureNode_1.StructureTagEntity, StructureTagName.toString()), structureNode_1.DoesNotSpawnInStructureEdgeType, exports.SpawnDataEntity, spawnDataName.toString());
}
