"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InEggGroupEdgeType = exports.EggGroupEntity = void 0;
exports.createEggGroupNode = createEggGroupNode;
const dynamoNodes_1 = require("../../service/dynamoNodes");
exports.EggGroupEntity = "EggGroup";
exports.InEggGroupEdgeType = "InEggGroup";
const version = 1;
function createEggGroupNode(name, lastEdited = Date.now()) {
    return new dynamoNodes_1.DynamoNode(exports.EggGroupEntity, name, version, lastEdited);
}
