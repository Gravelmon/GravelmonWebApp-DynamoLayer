"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructureTagNode = exports.StructureNode = exports.DoesNotSpawnInStructureEdgeType = exports.SpawnsInStructureEdgeType = exports.ContainedInStructureTagEdgeType = exports.StructureTagEntity = exports.StructureEntity = void 0;
exports.createStructureNode = createStructureNode;
exports.createStructureTagNode = createStructureTagNode;
exports.createStructureTagContainsStructureEdge = createStructureTagContainsStructureEdge;
exports.createStructureTagContainsStructureTagEdge = createStructureTagContainsStructureTagEdge;
const dynamoNodes_1 = require("../../service/dynamoNodes");
const resourceLocation_1 = require("../../models/minecraft/resourceLocation");
const deserializerRegistry_1 = require("../../service/deserializerRegistry");
exports.StructureEntity = "Structure";
exports.StructureTagEntity = "StructureTag";
exports.ContainedInStructureTagEdgeType = "ContainedInStructureTag";
exports.SpawnsInStructureEdgeType = "SpawnsInStructure";
exports.DoesNotSpawnInStructureEdgeType = "DoesNotSpawnInStructure";
class StructureNode extends dynamoNodes_1.DynamoNode {
    constructor(resourceLocation) {
        super(exports.StructureTagEntity, resourceLocation.toString());
        this.resourceLocation = resourceLocation;
    }
    static deserialize(data) {
        if (!data.resourceLocation) {
            throw new Error("Invalid data for deserializing StructureNode: missing resourceLocation");
        }
        return new StructureNode(resourceLocation_1.ResourceLocation.deserialize(data.resourceLocation));
    }
    serialize() {
        return {
            ...super.serialize(),
            resourceLocation: this.resourceLocation.serialize()
        };
    }
}
exports.StructureNode = StructureNode;
class StructureTagNode extends dynamoNodes_1.DynamoNode {
    constructor(resourceLocation, containsStructures = []) {
        super(exports.StructureTagEntity, resourceLocation.toString());
        this.resourceLocation = resourceLocation;
        this.containsStructures = containsStructures;
    }
    static deserialize(data) {
        if (!data.resourceLocation) {
            throw new Error("Invalid data for deserializing StructureTagNode: missing resourceLocation");
        }
        const containsStructures = Array.isArray(data.containsStructures) ? data.containsStructures.map((structureData) => resourceLocation_1.ResourceLocation.deserialize(structureData)) : [];
        return new StructureTagNode(resourceLocation_1.ResourceLocation.deserialize(data.resourceLocation), containsStructures);
    }
    serialize() {
        return {
            ...super.serialize(),
            resourceLocation: this.resourceLocation.serialize(),
            containsStructures: this.containsStructures.map(Structure => Structure.serialize())
        };
    }
}
exports.StructureTagNode = StructureTagNode;
function createStructureNode(resourceLocation) {
    return new StructureNode(resourceLocation);
}
function createStructureTagNode(resourceLocation, containsStructures = []) {
    return new StructureTagNode(resourceLocation, containsStructures);
}
// Note: The edges between structures and structure tags are stored in the opposite direction of the edges between Structures and Structure tags,
// since the "contains" relationship is more intuitive to traverse from structure tags to structures than the other way around.
function createStructureTagContainsStructureEdge(StructureTagName, StructureName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(exports.StructureEntity, StructureName.toString()), exports.ContainedInStructureTagEdgeType, exports.StructureTagEntity, StructureTagName.toString());
}
function createStructureTagContainsStructureTagEdge(containingStructureTagName, subjectStructureTagName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(exports.StructureTagEntity, subjectStructureTagName.toString()), exports.ContainedInStructureTagEdgeType, exports.StructureTagEntity, containingStructureTagName.toString());
}
deserializerRegistry_1.deserializerRegistry.register(exports.StructureEntity, StructureNode.deserialize);
deserializerRegistry_1.deserializerRegistry.register(exports.StructureTagEntity, StructureTagNode.deserialize);
