"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SleepDepth = void 0;
exports.serializeBehaviourOptions = serializeBehaviourOptions;
exports.deserializeBehaviourOptions = deserializeBehaviourOptions;
const pokemonNode_1 = require("../../nodes/pokemon/pokemonNode");
const numberRange_1 = require("../properties/numberRange");
const riding_1 = require("./riding");
const time_1 = require("../properties/time");
var SleepDepth;
(function (SleepDepth) {
    SleepDepth["Normal"] = "normal";
    SleepDepth["Comatose"] = "comatose";
})(SleepDepth || (exports.SleepDepth = SleepDepth = {}));
function serializeBehaviourOptions(options) {
    return {
        movement: options.movement ? {
            ...options.movement
        } : undefined,
        aquatic: options.aquatic ? {
            ...options.aquatic
        } : undefined,
        sleep: options.sleep ? {
            canSleep: options.sleep?.canSleep,
            willSleepOnBed: options.sleep?.willSleepOnBed,
            sleepLightLevel: options.sleep?.sleepLightLevel ? options.sleep.sleepLightLevel.serialize() : undefined,
            drowsyChance: options.sleep?.drowsyChance,
            depth: options.sleep?.depth,
            times: options.sleep?.times ? options.sleep.times.map((t) => (0, time_1.serializeTimeRange)(t)) : undefined,
            biomes: options.sleep?.biomes
        } : undefined,
        herd: options.herd ? {
            maxHerdSize: options.herd?.maxHerdSize,
            herdData: options.herd?.herdData.map(h => ({
                tier: h.tier,
                leaderEntityType: h.leaderEntityType.serialize()
            }))
        } : undefined,
        riding: options.riding ? (0, riding_1.serializeRidingBehaviourOptions)(options.riding) : undefined
    };
}
function deserializeBehaviourOptions(data) {
    return {
        movement: data.movement ? {
            ...data.movement
        } : undefined,
        aquatic: data.aquatic ? {
            ...data.aquatic
        } : undefined,
        sleep: data.sleep ? {
            canSleep: data.sleep.canSleep,
            willSleepOnBed: data.sleep.willSleepOnBed,
            sleepLightLevel: data.sleep.sleepLightLevel ? numberRange_1.NumberRange.deserialize(data.sleep.sleepLightLevel) : undefined,
            drowsyChance: data.sleep.drowsyChance,
            depth: data.sleep.depth,
            times: data.sleep.times ? data.sleep.times.map((t) => (0, time_1.deserializeTimeRange)(t)) : undefined,
            biomes: data.sleep.biomes
        } : undefined,
        herd: data.herd ? {
            maxHerdSize: data.herd.maxHerdSize,
            herdData: data.herd.herdData.map((h) => ({
                tier: h.tier,
                leaderEntityType: pokemonNode_1.PokemonIdentifier.deserialize(h.leaderEntityType)
            }))
        } : undefined,
        riding: data.riding ? (0, riding_1.deserializeRidingBehaviourOptions)(data.riding) : undefined
    };
}
