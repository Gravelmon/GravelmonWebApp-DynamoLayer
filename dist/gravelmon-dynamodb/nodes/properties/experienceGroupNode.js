"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InExperienceGroupEdgeType = exports.ExperienceGroupEntity = void 0;
exports.createExperienceGroupNode = createExperienceGroupNode;
const dynamoNodes_1 = require("../../service/dynamoNodes");
exports.ExperienceGroupEntity = "ExperienceGroup";
exports.InExperienceGroupEdgeType = "InExperienceGroup";
const version = 1;
function createExperienceGroupNode(name, lastEdited = Date.now()) {
    return new dynamoNodes_1.DynamoNode(exports.ExperienceGroupEntity, name, version, lastEdited);
}
