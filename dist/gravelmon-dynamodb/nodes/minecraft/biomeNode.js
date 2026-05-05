"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiomeTagNode = exports.BiomeNode = exports.DoesNotSpawnInBiomeEdgeType = exports.SpawnsInBiomeEdgeType = exports.BiomeTagContainsBiomeEdgeType = exports.BiomeTagEntity = exports.BiomeEntity = void 0;
exports.createBiomeNode = createBiomeNode;
exports.createBiomeTagNode = createBiomeTagNode;
exports.createBiomeTagContainsBiomeEdge = createBiomeTagContainsBiomeEdge;
exports.createBiomeTagContainsBiomeTagEdge = createBiomeTagContainsBiomeTagEdge;
const dynamoNodes_1 = require("../../service/dynamoNodes");
const resourceLocation_1 = require("../../models/minecraft/resourceLocation");
const deserializerRegistry_1 = require("../../service/deserializerRegistry");
exports.BiomeEntity = "Biome";
exports.BiomeTagEntity = "BiomeTag";
exports.BiomeTagContainsBiomeEdgeType = "ContainedInBiomeTag";
exports.SpawnsInBiomeEdgeType = "SpawnsInBiome";
exports.DoesNotSpawnInBiomeEdgeType = "DoesNotSpawnInBiome";
class BiomeNode extends dynamoNodes_1.DynamoNode {
    constructor(resourceLocation) {
        super(exports.BiomeEntity, resourceLocation.toString());
        this.resourceLocation = resourceLocation;
    }
    static deserialize(data) {
        if (!data.resourceLocation) {
            throw new Error("Invalid data for deserializing BiomeNode: missing resourceLocation");
        }
        return new BiomeNode(resourceLocation_1.ResourceLocation.deserialize(data.resourceLocation));
    }
    serialize() {
        return {
            ...super.serialize(),
            resourceLocation: this.resourceLocation.serialize()
        };
    }
}
exports.BiomeNode = BiomeNode;
class BiomeTagNode extends dynamoNodes_1.DynamoNode {
    constructor(resourceLocation, containsBiomes) {
        super(exports.BiomeTagEntity, resourceLocation.toString());
        this.containsBiomes = containsBiomes ?? [];
        this.resourceLocation = resourceLocation;
    }
    static deserialize(data) {
        if (!data.resourceLocation) {
            throw new Error("Invalid data for deserializing BiomeTagNode: missing resourceLocation");
        }
        const containsBiomes = (data.containsBiomes ?? []).map((b) => resourceLocation_1.ResourceLocation.deserialize(b));
        return new BiomeTagNode(resourceLocation_1.ResourceLocation.deserialize(data.resourceLocation), containsBiomes);
    }
    serialize() {
        return {
            ...super.serialize(),
            resourceLocation: this.resourceLocation.serialize(),
            containsBiomes: this.containsBiomes?.map(biome => biome.serialize()) ?? []
        };
    }
}
exports.BiomeTagNode = BiomeTagNode;
function createBiomeNode(resourceLocation) {
    return new BiomeNode(resourceLocation);
}
function createBiomeTagNode(resourceLocation, containsBiomes = []) {
    return new BiomeTagNode(resourceLocation, containsBiomes);
}
// Note: The edges between biomes and biome tags are stored in the opposite direction of the edges between structures and structure tags,
// since the "contains" relationship is more intuitive to traverse from biome tags to biomes than the other way around.
function createBiomeTagContainsBiomeEdge(biomeTagName, biomeName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(exports.BiomeEntity, biomeName.toString()), exports.BiomeTagContainsBiomeEdgeType, exports.BiomeTagEntity, biomeTagName.toString());
}
function createBiomeTagContainsBiomeTagEdge(containingBiomeTag, subjectBiomeTag) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(exports.BiomeTagEntity, subjectBiomeTag.toString()), exports.BiomeTagContainsBiomeEdgeType, exports.BiomeTagEntity, containingBiomeTag.toString());
}
deserializerRegistry_1.deserializerRegistry.register(exports.BiomeEntity, BiomeNode.deserialize);
deserializerRegistry_1.deserializerRegistry.register(exports.BiomeTagEntity, BiomeTagNode.deserialize);
