"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasLabelEdgeType = exports.LabelEntity = void 0;
exports.createLabelNode = createLabelNode;
const dynamoNodes_1 = require("../../service/dynamoNodes");
exports.LabelEntity = "Label";
exports.HasLabelEdgeType = "HasLabel";
const version = 1;
function createLabelNode(name, lastEdited = Date.now()) {
    return new dynamoNodes_1.DynamoNode(exports.LabelEntity, name, version, lastEdited);
}
