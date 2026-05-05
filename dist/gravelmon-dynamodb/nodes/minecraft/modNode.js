"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddedByModEdgeType = exports.ModEntity = void 0;
exports.createModNode = createModNode;
exports.createModAddsBiomeEdge = createModAddsBiomeEdge;
exports.createModAddsBiomeTagEdge = createModAddsBiomeTagEdge;
exports.createModAddsStructureEdge = createModAddsStructureEdge;
exports.createModAddsStructureTagEdge = createModAddsStructureTagEdge;
exports.createModAddsItemEdge = createModAddsItemEdge;
const dynamoNodes_1 = require("../../service/dynamoNodes");
const biomeNode_1 = require("./biomeNode");
const structureNode_1 = require("./structureNode");
const itemNode_1 = require("./itemNode");
exports.ModEntity = "Mod";
exports.AddedByModEdgeType = "AddedByMod";
function createModNode(name) {
    return new dynamoNodes_1.DynamoNode(exports.ModEntity, name);
}
function createModAddsBiomeEdge(modName, entityResourceLocation) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(exports.ModEntity, modName), exports.AddedByModEdgeType, biomeNode_1.BiomeEntity, entityResourceLocation.toString());
}
function createModAddsBiomeTagEdge(modName, entityResourceLocation) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(exports.ModEntity, modName), exports.AddedByModEdgeType, biomeNode_1.BiomeTagEntity, entityResourceLocation.toString());
}
function createModAddsStructureEdge(modName, entityResourceLocation) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(exports.ModEntity, modName), exports.AddedByModEdgeType, structureNode_1.StructureEntity, entityResourceLocation.toString());
}
function createModAddsStructureTagEdge(modName, entityResourceLocation) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(exports.ModEntity, modName), exports.AddedByModEdgeType, structureNode_1.StructureTagEntity, entityResourceLocation.toString());
}
function createModAddsItemEdge(modName, entityResourceLocation) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(exports.ModEntity, modName), exports.AddedByModEdgeType, itemNode_1.ItemEntity, entityResourceLocation.toString());
}
