"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpawnCondition = exports.LabelMode = void 0;
const resourceLocation_1 = require("../minecraft/resourceLocation");
const numberRange_1 = require("../properties/numberRange");
const time_1 = require("../properties/time");
var LabelMode;
(function (LabelMode) {
    LabelMode[LabelMode["ANY"] = 0] = "ANY";
    LabelMode[LabelMode["ALL"] = 1] = "ALL";
})(LabelMode || (exports.LabelMode = LabelMode = {}));
class SpawnCondition {
    constructor(options) {
        this.spawnConditionOptions = options;
    }
    serialize() {
        return {
            spawnConditionOptions: {
                dimension: this.spawnConditionOptions.dimensions,
                moonPhase: this.spawnConditionOptions.moonPhase ? this.spawnConditionOptions.moonPhase.serialize() : undefined,
                canSeeSky: this.spawnConditionOptions.canSeeSky,
                minY: this.spawnConditionOptions.minY,
                minX: this.spawnConditionOptions.minX,
                minZ: this.spawnConditionOptions.minZ,
                maxY: this.spawnConditionOptions.maxY,
                maxX: this.spawnConditionOptions.maxX,
                maxZ: this.spawnConditionOptions.maxZ,
                minLight: this.spawnConditionOptions.minLight,
                maxLight: this.spawnConditionOptions.maxLight,
                minSkyLight: this.spawnConditionOptions.minSkyLight,
                maxSkyLight: this.spawnConditionOptions.maxSkyLight,
                timeRange: this.spawnConditionOptions.timeRange ? (0, time_1.serializeTimeRange)(this.spawnConditionOptions.timeRange) : undefined,
                isRaining: this.spawnConditionOptions.isRaining,
                isThundering: this.spawnConditionOptions.isThundering,
                isSlimeChunk: this.spawnConditionOptions.isSlimeChunk,
                labels: this.spawnConditionOptions.labels,
                labelMode: this.spawnConditionOptions.labelMode,
                minWidth: this.spawnConditionOptions.minWidth,
                maxWidth: this.spawnConditionOptions.maxWidth,
                minLength: this.spawnConditionOptions.minLength,
                maxLength: this.spawnConditionOptions.maxLength,
                neededNearbyBlocks: this.spawnConditionOptions.neededNearbyBlocks ? this.spawnConditionOptions.neededNearbyBlocks.map(item => item.serialize()) : undefined,
                neededBaseBlocks: this.spawnConditionOptions.neededBaseBlocks ? this.spawnConditionOptions.neededBaseBlocks.map(item => item.serialize()) : undefined,
                doesNotSpawnInBiomes: this.spawnConditionOptions.doesNotSpawnInBiomes ? this.spawnConditionOptions.doesNotSpawnInBiomes.map(item => item.serialize()) : undefined,
                spawnsInBiomes: this.spawnConditionOptions.spawnsInBiomes ? this.spawnConditionOptions.spawnsInBiomes.map(item => item.serialize()) : undefined,
                doesNotSpawnInStructures: this.spawnConditionOptions.doesNotSpawnInStructures ? this.spawnConditionOptions.doesNotSpawnInStructures.map(item => item.serialize()) : undefined,
                spawnsInStructures: this.spawnConditionOptions.spawnsInStructures ? this.spawnConditionOptions.spawnsInStructures.map(item => item.serialize()) : undefined,
                minDepth: this.spawnConditionOptions.minDepth,
                maxDepth: this.spawnConditionOptions.maxDepth,
                fluidIsSource: this.spawnConditionOptions.fluidIsSource,
                fluid: this.spawnConditionOptions.fluid ? this.spawnConditionOptions.fluid.serialize() : undefined,
                minLureLevel: this.spawnConditionOptions.minLureLevel,
                maxLureLevel: this.spawnConditionOptions.maxLureLevel,
                bobber: this.spawnConditionOptions.bobber ? this.spawnConditionOptions.bobber.serialize() : undefined,
                bait: this.spawnConditionOptions.bait ? this.spawnConditionOptions.bait.serialize() : undefined
            }
        };
    }
    static deserialize(data) {
        const options = {
            dimensions: data.spawnConditionOptions.dimension,
            moonPhase: data.spawnConditionOptions.moonPhase ? numberRange_1.NumberRange.deserialize(data.spawnConditionOptions.moonPhase) : undefined,
            canSeeSky: data.spawnConditionOptions.canSeeSky,
            minY: data.spawnConditionOptions.minY,
            minX: data.spawnConditionOptions.minX,
            minZ: data.spawnConditionOptions.minZ,
            maxY: data.spawnConditionOptions.maxY,
            maxX: data.spawnConditionOptions.maxX,
            maxZ: data.spawnConditionOptions.maxZ,
            minLight: data.spawnConditionOptions.minLight,
            maxLight: data.spawnConditionOptions.maxLight,
            minSkyLight: data.spawnConditionOptions.minSkyLight,
            maxSkyLight: data.spawnConditionOptions.maxSkyLight,
            timeRange: data.spawnConditionOptions.timeRange ? (0, time_1.deserializeTimeRange)(data.spawnConditionOptions.timeRange) : undefined,
            isRaining: data.spawnConditionOptions.isRaining,
            isThundering: data.spawnConditionOptions.isThundering,
            isSlimeChunk: data.spawnConditionOptions.isSlimeChunk,
            labels: data.spawnConditionOptions.labels,
            labelMode: data.spawnConditionOptions.labelMode,
            minWidth: data.spawnConditionOptions.minWidth,
            maxWidth: data.spawnConditionOptions.maxWidth,
            minLength: data.spawnConditionOptions.minLength,
            maxLength: data.spawnConditionOptions.maxLength,
            neededNearbyBlocks: data.spawnConditionOptions.neededNearbyBlocks ? data.spawnConditionOptions.neededNearbyBlocks.map((item) => resourceLocation_1.ResourceLocation.deserialize(item)) : undefined,
            neededBaseBlocks: data.spawnConditionOptions.neededBaseBlocks ? data.spawnConditionOptions.neededBaseBlocks.map((item) => resourceLocation_1.ResourceLocation.deserialize(item)) : undefined,
            doesNotSpawnInBiomes: data.spawnConditionOptions.doesNotSpawnInBiomes ? data.spawnConditionOptions.doesNotSpawnInBiomes.map((item) => resourceLocation_1.ResourceLocation.deserialize(item)) : undefined,
            spawnsInBiomes: data.spawnConditionOptions.spawnsInBiomes ? data.spawnConditionOptions.spawnsInBiomes.map((item) => resourceLocation_1.ResourceLocation.deserialize(item)) : undefined,
            doesNotSpawnInStructures: data.spawnConditionOptions.doesNotSpawnInStructures ? data.spawnConditionOptions.doesNotSpawnInStructures.map((item) => resourceLocation_1.ResourceLocation.deserialize(item)) : undefined,
            spawnsInStructures: data.spawnConditionOptions.spawnsInStructures ? data.spawnConditionOptions.spawnsInStructures.map((item) => resourceLocation_1.ResourceLocation.deserialize(item)) : undefined,
            minDepth: data.spawnConditionOptions.minDepth,
            maxDepth: data.spawnConditionOptions.maxDepth,
            fluidIsSource: data.spawnConditionOptions.fluidIsSource,
            fluid: data.spawnConditionOptions.fluid ? resourceLocation_1.ResourceLocation.deserialize(data.spawnConditionOptions.fluid) : undefined,
            minLureLevel: data.spawnConditionOptions.minLureLevel,
            maxLureLevel: data.spawnConditionOptions.maxLureLevel,
            bobber: data.spawnConditionOptions.bobber ? resourceLocation_1.ResourceLocation.deserialize(data.spawnConditionOptions.bobber) : undefined,
            bait: data.spawnConditionOptions.bait ? resourceLocation_1.ResourceLocation.deserialize(data.spawnConditionOptions.bait) : undefined
        };
        return new SpawnCondition(options);
    }
}
exports.SpawnCondition = SpawnCondition;
