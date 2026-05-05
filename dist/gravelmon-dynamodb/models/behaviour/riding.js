"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RidingKey = void 0;
exports.serializeRidingBehaviourOptions = serializeRidingBehaviourOptions;
exports.deserializeRidingBehaviourOptions = deserializeRidingBehaviourOptions;
const numberRange_1 = require("../properties/numberRange");
const seat_1 = require("./seat");
var RidingKey;
(function (RidingKey) {
    RidingKey[RidingKey["Standard"] = 0] = "Standard";
    RidingKey[RidingKey["Vehicle"] = 1] = "Vehicle";
    RidingKey[RidingKey["Boat"] = 2] = "Boat";
    RidingKey[RidingKey["Submarine"] = 3] = "Submarine";
    RidingKey[RidingKey["Dolphin"] = 4] = "Dolphin";
    RidingKey[RidingKey["Bird"] = 5] = "Bird";
    RidingKey[RidingKey["Jet"] = 6] = "Jet";
    RidingKey[RidingKey["UFO"] = 7] = "UFO";
    RidingKey[RidingKey["Rocket"] = 8] = "Rocket";
})(RidingKey || (exports.RidingKey = RidingKey = {}));
function serializeRidingBehaviour(behaviour) {
    return {
        key: behaviour.key,
        stats: serializeRidingStats(behaviour.stats),
        rideSounds: {
            muffleEnabled: behaviour.rideSounds.muffleEnabled,
            pitchExpression: behaviour.rideSounds.pitchExpression,
            playForNonPassengers: behaviour.rideSounds.playForNonPassengers,
            playForPassengers: behaviour.rideSounds.playForPassengers,
            SoundPK: behaviour.rideSounds.SoundPK,
            volumeExpression: behaviour.rideSounds.volumeExpression,
            submerged: behaviour.rideSounds.submerged
        }
    };
}
function deserializeRidingBehaviour(data) {
    return {
        key: data.key,
        stats: deserializeRidingStats(data.stats),
        rideSounds: {
            muffleEnabled: data.rideSounds.muffleEnabled,
            pitchExpression: data.rideSounds.pitchExpression,
            playForNonPassengers: data.rideSounds.playForNonPassengers,
            playForPassengers: data.rideSounds.playForPassengers,
            SoundPK: data.rideSounds.SoundPK,
            volumeExpression: data.rideSounds.volumeExpression,
            submerged: data.rideSounds.submerged
        }
    };
}
function serializeRidingBehaviourOptions(options) {
    return {
        airRidingBehaviour: options.airRidingBehaviour ? serializeRidingBehaviour(options.airRidingBehaviour) : undefined,
        landRidingBehaviour: options.landRidingBehaviour ? serializeRidingBehaviour(options.landRidingBehaviour) : undefined,
        liquidRidingBehaviour: options.liquidRidingBehaviour ? serializeRidingBehaviour(options.liquidRidingBehaviour) : undefined,
        seats: options.seats.map(seat => (0, seat_1.serializeSeat)(seat))
    };
}
function serializeRidingStats(stats) {
    return {
        ACCELERATION: stats.ACCELERATION.serialize(),
        JUMP: stats.JUMP.serialize(),
        SKILL: stats.SKILL.serialize(),
        SPEED: stats.SPEED.serialize(),
        STAMINA: stats.STAMINA.serialize()
    };
}
function deserializeRidingStats(data) {
    return {
        ACCELERATION: new numberRange_1.NumberRange(data.ACCELERATION.min, data.ACCELERATION.max),
        JUMP: new numberRange_1.NumberRange(data.JUMP.min, data.JUMP.max),
        SKILL: new numberRange_1.NumberRange(data.SKILL.min, data.SKILL.max),
        SPEED: new numberRange_1.NumberRange(data.SPEED.min, data.SPEED.max),
        STAMINA: new numberRange_1.NumberRange(data.STAMINA.min, data.STAMINA.max)
    };
}
function deserializeRidingBehaviourOptions(data) {
    return {
        airRidingBehaviour: data.airRidingBehaviour ? deserializeRidingBehaviour(data.airRidingBehaviour) : undefined,
        landRidingBehaviour: data.landRidingBehaviour ? deserializeRidingBehaviour(data.landRidingBehaviour) : undefined,
        liquidRidingBehaviour: data.liquidRidingBehaviour ? deserializeRidingBehaviour(data.liquidRidingBehaviour) : undefined,
        seats: data.seats.map((seatData) => (0, seat_1.deserializeSeat)(seatData))
    };
}
