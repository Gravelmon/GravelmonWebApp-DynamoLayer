"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMoveSetLevelUpMoveEdge = createMoveSetLevelUpMoveEdge;
exports.createMoveSetTeachMoveEdge = createMoveSetTeachMoveEdge;
exports.createMoveSetEggMoveEdge = createMoveSetEggMoveEdge;
exports.createMoveSetLegacyMoveEdge = createMoveSetLegacyMoveEdge;
exports.serializeMoveSet = serializeMoveSet;
exports.deserializeMoveSet = deserializeMoveSet;
const dynamoNodes_1 = require("../../service/dynamoNodes");
const pokemonNode_1 = require("../../nodes/pokemon/pokemonNode");
const moveNode_1 = require("../../nodes/battle/moveNode");
const deserializerRegistry_1 = require("../../service/deserializerRegistry");
var MoveSetLearnType;
(function (MoveSetLearnType) {
    MoveSetLearnType["LevelUp"] = "LevelUp";
    MoveSetLearnType["Teach"] = "Teach";
    MoveSetLearnType["Egg"] = "Egg";
    MoveSetLearnType["Legacy"] = "Legacy";
})(MoveSetLearnType || (MoveSetLearnType = {}));
//edges pointing towards pokemon from other nodes, used to easily query all related nodes of a moveset
function createMoveSetLevelUpMoveEdge(pokemonName, moveName, level) {
    return new MoveSetLevelUpEdge(moveName, pokemonName, level);
}
function createMoveSetTeachMoveEdge(pokemonName, moveName) {
    return new MoveSetEdge(moveName, pokemonName, MoveSetLearnType.Teach);
}
function createMoveSetEggMoveEdge(pokemonName, moveName) {
    return new MoveSetEdge(moveName, pokemonName, MoveSetLearnType.Egg);
}
function createMoveSetLegacyMoveEdge(pokemonName, moveName) {
    return new MoveSetEdge(moveName, pokemonName, MoveSetLearnType.Legacy);
}
function serializeMoveSetEntry(entry) {
    return {
        moveName: entry.moveName.serialize(),
        category: entry.category,
        basePower: entry.basePower,
        accuracy: entry.accuracy,
        type: entry.type,
        rebalancedBasePower: entry.rebalancedBasePower,
        rebalancedAccuracy: entry.rebalancedAccuracy,
        rebalancedType: entry.rebalancedType
    };
}
function deserializeMoveSetEntry(data) {
    return {
        moveName: moveNode_1.MoveIdentifier.deserialize(data.moveName),
        category: data.category,
        basePower: data.basePower,
        accuracy: data.accuracy,
        type: data.type,
        rebalancedBasePower: data.rebalancedBasePower,
        rebalancedAccuracy: data.rebalancedAccuracy,
        rebalancedType: data.rebalancedType
    };
}
function serializeMoveSet(moveSet) {
    return {
        levelUpMoves: moveSet.levelUpMoves.map(m => ({ moveName: serializeMoveSetEntry(m.moveName), level: m.level })),
        teachMoves: moveSet.teachMoves.map(serializeMoveSetEntry),
        eggMoves: moveSet.eggMoves.map(serializeMoveSetEntry),
        legacyMoves: moveSet.legacyMoves.map(serializeMoveSetEntry)
    };
}
function deserializeMoveSet(data) {
    return {
        levelUpMoves: data.levelUpMoves.map((m) => ({ moveName: deserializeMoveSetEntry(m.moveName), level: m.level })),
        teachMoves: data.teachMoves.map(deserializeMoveSetEntry),
        eggMoves: data.eggMoves.map(deserializeMoveSetEntry),
        legacyMoves: data.legacyMoves.map(deserializeMoveSetEntry)
    };
}
class MoveSetEdge extends dynamoNodes_1.DynamoEdge {
    constructor(moveName, pokemonName, relationship) {
        super((0, dynamoNodes_1.getNodePK)(moveNode_1.MoveEntity, moveName.toString()), relationship, pokemonNode_1.PokemonEntity, pokemonName.toString());
    }
    serialize() {
        return {
            ...super.serialize(),
        };
    }
    static deserialize(data) {
        return new MoveSetEdge(moveNode_1.MoveIdentifier.deserialize(data.PK.split("#").slice(1).join("#")), pokemonNode_1.PokemonIdentifier.deserialize(data.SK), data.relationship);
    }
}
class MoveSetLevelUpEdge extends MoveSetEdge {
    constructor(moveName, pokemonName, level) {
        super(moveName, pokemonName, MoveSetLearnType.LevelUp);
        this.level = level;
    }
    serialize() {
        return {
            ...super.serialize(),
            level: this.level
        };
    }
    static deserialize(data) {
        return new MoveSetLevelUpEdge(moveNode_1.MoveIdentifier.deserialize(data.PK.split("#").slice(1).join("#")), pokemonNode_1.PokemonIdentifier.deserialize(data.SK), data.level);
    }
}
deserializerRegistry_1.deserializerRegistry.register(MoveSetLearnType.LevelUp, MoveSetLevelUpEdge.deserialize);
deserializerRegistry_1.deserializerRegistry.register(MoveSetLearnType.Teach, MoveSetEdge.deserialize);
deserializerRegistry_1.deserializerRegistry.register(MoveSetLearnType.Egg, MoveSetEdge.deserialize);
deserializerRegistry_1.deserializerRegistry.register(MoveSetLearnType.Legacy, MoveSetEdge.deserialize);
