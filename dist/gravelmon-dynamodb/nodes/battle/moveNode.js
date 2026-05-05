"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveNode = exports.MoveIdentifier = exports.MoveCategory = exports.MoveEdgeType = exports.MoveLabelEntity = exports.MoveEntity = void 0;
exports.createMoveLabelNode = createMoveLabelNode;
exports.createMoveIsTypeEdge = createMoveIsTypeEdge;
exports.createMoveWithLabelEdge = createMoveWithLabelEdge;
const dynamoNodes_1 = require("../../service/dynamoNodes");
const typeNode_1 = require("./typeNode");
const deserializerRegistry_1 = require("../../service/deserializerRegistry");
exports.MoveEntity = "Move";
exports.MoveLabelEntity = "MoveLabel";
var MoveEdgeType;
(function (MoveEdgeType) {
    MoveEdgeType["IsType"] = "IsType";
    MoveEdgeType["WithLabel"] = "WithLabel";
})(MoveEdgeType || (exports.MoveEdgeType = MoveEdgeType = {}));
var MoveCategory;
(function (MoveCategory) {
    MoveCategory["Physical"] = "Physical";
    MoveCategory["Special"] = "Special";
    MoveCategory["Status"] = "Status";
})(MoveCategory || (exports.MoveCategory = MoveCategory = {}));
class MoveIdentifier {
    constructor(game, pokemon) {
        this.game = game;
        this.move = pokemon;
    }
    toString() {
        return `${this.game}#${this.move}`;
    }
    static fromString(identifier) {
        const [game, move] = identifier.split("#");
        return new MoveIdentifier(game, move);
    }
    getMove() {
        return this.move;
    }
    serialize() {
        return {
            game: this.game,
            move: this.move
        };
    }
    static deserialize(data) {
        return new MoveIdentifier(data.game, data.move);
    }
}
exports.MoveIdentifier = MoveIdentifier;
function createMoveLabelNode(name) {
    return new dynamoNodes_1.DynamoNode(exports.MoveLabelEntity, name);
}
function createMoveIsTypeEdge(moveName, typeName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(exports.MoveEntity, moveName.toString()), MoveEdgeType.IsType, typeNode_1.TypeEntity, typeName);
}
function createMoveWithLabelEdge(moveName, labelName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(exports.MoveEntity, moveName.toString()), MoveEdgeType.WithLabel, exports.MoveLabelEntity, labelName);
}
class MoveNode extends dynamoNodes_1.DynamoNode {
    constructor(name, moveData, rebalancedMoveData, moveLabels = []) {
        super(exports.MoveEntity, name.toString());
        this.moveIdentifier = name;
        this.moveData = moveData;
        this.rebalancedMoveData = rebalancedMoveData;
        this.moveLabels = moveLabels;
    }
    static deserialize(data) {
        return new MoveNode(MoveIdentifier.deserialize(data.moveIdentifier), MoveNode.deserializeMoveData(data.moveData), data.rebalancedMoveData ? MoveNode.deserializeMoveData(data.rebalancedMoveData) : undefined, data.moveLabels || []);
    }
    static deserializeMoveData(data) {
        return {
            moveTypes: data.moveTypes.map((moveType) => ({ type: moveType.type, isRebalanced: moveType.isRebalanced })),
            powerPoints: data.powerPoints,
            basePower: data.basePower,
            priority: data.priority,
            accuracy: data.accuracy,
            moveRange: data.moveRange,
            moveCategory: data.moveCategory,
            description: data.description,
            zMoveEffect: data.zMoveEffect,
            typeGemCost: data.typeGemCost,
            associatedWeathers: data.associatedWeathers,
            associatedTerrain: data.associatedTerrain,
            associatedFieldEffects: data.associatedFieldEffects
        };
    }
    serializeMoveData(moveData) {
        return {
            moveTypes: moveData.moveTypes,
            powerPoints: moveData.powerPoints,
            basePower: moveData.basePower,
            priority: moveData.priority,
            accuracy: moveData.accuracy,
            moveRange: moveData.moveRange,
            moveCategory: moveData.moveCategory,
            description: moveData.description,
            zMoveEffect: moveData.zMoveEffect,
            typeGemCost: moveData.typeGemCost,
            associatedWeathers: moveData.associatedWeathers,
            associatedTerrain: moveData.associatedTerrain,
            associatedFieldEffects: moveData.associatedFieldEffects
        };
    }
    serialize() {
        return {
            ...super.serialize(),
            moveIdentifier: this.moveIdentifier.serialize(),
            moveData: this.serializeMoveData(this.moveData),
            rebalancedMoveData: this.rebalancedMoveData ? this.serializeMoveData(this.rebalancedMoveData) : undefined,
            moveLabels: this.moveLabels
        };
    }
}
exports.MoveNode = MoveNode;
deserializerRegistry_1.deserializerRegistry.register(exports.MoveEntity, MoveNode.deserialize);
