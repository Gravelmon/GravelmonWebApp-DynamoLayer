"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationNode = exports.AnimationEntity = void 0;
exports.serializeAnimation = serializeAnimation;
exports.deserializeAnimation = deserializeAnimation;
exports.createAnimationNode = createAnimationNode;
const deserializerRegistry_1 = require("../../service/deserializerRegistry");
const dynamoNodes_1 = require("../../service/dynamoNodes");
exports.AnimationEntity = "Animation";
function serializeAnimation(animation) {
    if (isConditionalAnimation(animation)) {
        return {
            conditionExpression: animation.conditionExpression,
            name: animation.name,
            animation: animation.animation
        };
    }
    else
        return animation;
}
function deserializeAnimation(data) {
    if (typeof data === "string") {
        return data;
    }
    if (isConditionalAnimation(data)) {
        return {
            conditionExpression: data.conditionExpression,
            name: data.name,
            animation: data.animation
        };
    }
    throw new Error(`Invalid Animation data: ${JSON.stringify(data)}`);
}
function isConditionalAnimation(value) {
    return (value &&
        typeof value === "object" &&
        typeof value.conditionExpression === "string" &&
        typeof value.name === "string" &&
        typeof value.animation === "string");
}
class AnimationNode extends dynamoNodes_1.DynamoNode {
    constructor(name, primaryPoseType) {
        super(exports.AnimationEntity, "animations");
        this.primaryPoseType = primaryPoseType;
        this.SK = "Animation#" + name + "";
        this.name = name;
    }
    serialize() {
        return {
            ...super.serialize(),
            primaryPoseType: this.primaryPoseType
        };
    }
    static deserialize(data) {
        return new AnimationNode(data.SK.replace("Animation#", ""), data.primaryPoseType);
    }
}
exports.AnimationNode = AnimationNode;
function createAnimationNode(name, primaryPoseType = "Other") {
    return new AnimationNode(name, primaryPoseType);
}
deserializerRegistry_1.deserializerRegistry.register(exports.AnimationEntity, AnimationNode.deserialize);
