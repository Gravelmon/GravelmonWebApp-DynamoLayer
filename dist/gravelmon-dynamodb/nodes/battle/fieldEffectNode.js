"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldEffectNode = exports.FieldEffectIdentifier = exports.FieldEffectEdgeType = exports.FieldEffectLabelEntity = exports.FieldEffectEntity = void 0;
exports.createFieldEffectLabelNode = createFieldEffectLabelNode;
exports.createFieldEffectIsTypeEdge = createFieldEffectIsTypeEdge;
exports.createFieldEffectWithLabelEdge = createFieldEffectWithLabelEdge;
const dynamoNodes_1 = require("../../service/dynamoNodes");
const typeNode_1 = require("./typeNode");
const deserializerRegistry_1 = require("../../service/deserializerRegistry");
exports.FieldEffectEntity = "FieldEffect";
exports.FieldEffectLabelEntity = "FieldEffectLabel";
var FieldEffectEdgeType;
(function (FieldEffectEdgeType) {
    FieldEffectEdgeType["IsType"] = "IsType";
    FieldEffectEdgeType["WithLabel"] = "WithLabel";
})(FieldEffectEdgeType || (exports.FieldEffectEdgeType = FieldEffectEdgeType = {}));
class FieldEffectIdentifier {
    constructor(game, pokemon) {
        this.game = game;
        this.fieldEffect = pokemon;
    }
    toString() {
        return `${this.game}#${this.fieldEffect}`;
    }
    static fromString(identifier) {
        const [game, fieldEffect] = identifier.split("#");
        return new FieldEffectIdentifier(game, fieldEffect);
    }
    getFieldEffect() {
        return this.fieldEffect;
    }
    serialize() {
        return {
            game: this.game,
            fieldEffect: this.fieldEffect
        };
    }
    static deserialize(data) {
        return new FieldEffectIdentifier(data.game, data.fieldEffect);
    }
}
exports.FieldEffectIdentifier = FieldEffectIdentifier;
function createFieldEffectLabelNode(name) {
    return new dynamoNodes_1.DynamoNode(exports.FieldEffectLabelEntity, name);
}
function createFieldEffectIsTypeEdge(fieldEffectName, typeName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(exports.FieldEffectEntity, fieldEffectName.toString()), FieldEffectEdgeType.IsType, typeNode_1.TypeEntity, typeName);
}
function createFieldEffectWithLabelEdge(fieldEffectName, labelName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(exports.FieldEffectEntity, fieldEffectName.toString()), FieldEffectEdgeType.WithLabel, exports.FieldEffectLabelEntity, labelName);
}
class FieldEffectNode extends dynamoNodes_1.DynamoNode {
    constructor(fieldEffectData, rebalancedFieldEffectData, fieldEffectLabels = []) {
        super(exports.FieldEffectEntity, fieldEffectData.identifier.toString());
        this.fieldEffectData = fieldEffectData;
        this.rebalancedFieldEffectData = rebalancedFieldEffectData;
        this.fieldEffectLabels = fieldEffectLabels;
    }
    static deserialize(data) {
        const fieldEffectData = FieldEffectNode.deserializeFieldEffectData(data.fieldEffectData);
        return new FieldEffectNode(fieldEffectData, data.rebalancedFieldEffectData ? FieldEffectNode.deserializeFieldEffectData(data.rebalancedFieldEffectData) : undefined, data.fieldEffectLabels || []);
    }
    static deserializeFieldEffectData(data) {
        return {
            identifier: FieldEffectIdentifier.deserialize(data.identifier),
            durationInTurns: data.durationInTurns,
            fieldEffectRange: data.fieldEffectRange,
            description: data.description,
        };
    }
    serializeFieldEffectData(data) {
        return {
            identifier: data.identifier.serialize(),
            durationInTurns: data.durationInTurns,
            fieldEffectRange: data.fieldEffectRange,
            description: data.description,
        };
    }
    serialize() {
        return {
            ...super.serialize(),
            fieldEffectData: this.serializeFieldEffectData(this.fieldEffectData),
            rebalancedFieldEffectData: this.rebalancedFieldEffectData ? this.serializeFieldEffectData(this.rebalancedFieldEffectData) : undefined,
            fieldEffectLabels: this.fieldEffectLabels
        };
    }
}
exports.FieldEffectNode = FieldEffectNode;
deserializerRegistry_1.deserializerRegistry.register(exports.FieldEffectEntity, FieldEffectNode.deserialize);
