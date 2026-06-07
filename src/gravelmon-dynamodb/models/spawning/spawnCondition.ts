import { ResourceLocation } from "../minecraft/resourceLocation";
import { NumberRange } from "../properties/numberRange";
import {Time} from "../properties";

export enum LabelMode {
    ANY, ALL
}

export interface SpawnCondition {
    dimensions?: string[];
    moonPhase?: NumberRange;
    canSeeSky?: boolean;

    minY?: number;
    minX?: number;
    minZ?: number;
    maxY?: number;
    maxX?: number;
    maxZ?: number;
    
    minLight?: number;
    maxLight?: number;
    minSkyLight?: number;
    maxSkyLight?: number;

    timeRange?: Time;
    isRaining?: boolean;
    isThundering?: boolean;
    isSlimeChunk?: boolean;
    labels?: string[];
    labelMode?: LabelMode;

    minWidth?: number;
    maxWidth?: number;
    minLength?: number;
    maxLength?: number;

    neededNearbyBlocks?: ResourceLocation[];
    neededBaseBlocks?: ResourceLocation[];
    spawnsInBiomes?: ResourceLocation[];
    spawnsInStructures?: ResourceLocation[];

    minDepth?: number;
    maxDepth?: number;
    fluidIsSource?: boolean;
    fluid?: ResourceLocation;

    minLureLevel?: number;
    maxLureLevel?: number;
    bobber?: ResourceLocation;
    bait?: ResourceLocation;
}

export function serializeSpawnCondition(spawnCondition: SpawnCondition): any {
    return {
        spawnConditionOptions: {
            dimension: spawnCondition.dimensions,
            moonPhase: spawnCondition.moonPhase ? spawnCondition.moonPhase.serialize() : undefined,
            canSeeSky: spawnCondition.canSeeSky,
            minY: spawnCondition.minY,
            minX: spawnCondition.minX,
            minZ: spawnCondition.minZ,
            maxY: spawnCondition.maxY,
            maxX: spawnCondition.maxX,
            maxZ: spawnCondition.maxZ,
            minLight: spawnCondition.minLight,
            maxLight: spawnCondition.maxLight,
            minSkyLight: spawnCondition.minSkyLight,
            maxSkyLight: spawnCondition.maxSkyLight,
            timeRange: spawnCondition.timeRange,
            isRaining: spawnCondition.isRaining,
            isThundering: spawnCondition.isThundering,
            isSlimeChunk: spawnCondition.isSlimeChunk,
            labels: spawnCondition.labels,
            labelMode: spawnCondition.labelMode,

            minWidth: spawnCondition.minWidth,
            maxWidth: spawnCondition.maxWidth,
            minLength: spawnCondition.minLength,
            maxLength: spawnCondition.maxLength,

            neededNearbyBlocks: spawnCondition.neededNearbyBlocks ? spawnCondition.neededNearbyBlocks.map(item => item.serialize()) : undefined,
            neededBaseBlocks: spawnCondition.neededBaseBlocks ? spawnCondition.neededBaseBlocks.map(item => item.serialize()) : undefined,
            spawnsInBiomes: spawnCondition.spawnsInBiomes ? spawnCondition.spawnsInBiomes.map(item => item.serialize()) : undefined,
            spawnsInStructures: spawnCondition.spawnsInStructures ? spawnCondition.spawnsInStructures.map(item => item.serialize()) : undefined,
            minDepth: spawnCondition.minDepth,
            maxDepth: spawnCondition.maxDepth,
            fluidIsSource: spawnCondition.fluidIsSource,
            fluid: spawnCondition.fluid ? spawnCondition.fluid.serialize() : undefined,
            minLureLevel: spawnCondition.minLureLevel,
            maxLureLevel: spawnCondition.maxLureLevel,
            bobber: spawnCondition.bobber ? spawnCondition.bobber.serialize() : undefined,
            bait: spawnCondition.bait ? spawnCondition.bait.serialize() : undefined
        }
    }
}

export function deserializeSpawnCondition(data: any): SpawnCondition {
    if(!data) throw new Error("SpawnConditionOptions not found: " + JSON.stringify(data));
    return {
        dimensions: data.dimension ?? undefined,
        moonPhase: data.moonPhase ? NumberRange.deserialize(data.moonPhase) : undefined,
        canSeeSky: data.canSeeSky ?? undefined,
        minY: data.minY ?? undefined,
        minX: data.minX ?? undefined,
        minZ: data.minZ ?? undefined,
        maxY: data.maxY ?? undefined,
        maxX: data.maxX ?? undefined,
        maxZ: data.maxZ ?? undefined,
        minLight: data.minLight ?? undefined,
        maxLight: data.maxLight ?? undefined,
        minSkyLight: data.minSkyLight ?? undefined,
        maxSkyLight: data.maxSkyLight ?? undefined,
        timeRange: data.timeRange ?? undefined,
        isRaining: data.isRaining ?? undefined,
        isThundering: data.isThundering ?? undefined,
        isSlimeChunk: data.isSlimeChunk ?? undefined,
        labels: data.labels ?? undefined,
        labelMode: data.labelMode ?? undefined,

        minWidth: data.minWidth ?? undefined,
        maxWidth: data.maxWidth ?? undefined,
        minLength: data.minLength ?? undefined,
        maxLength: data.maxLength ?? undefined,

        neededNearbyBlocks: data.neededNearbyBlocks ? data.neededNearbyBlocks.map((item: any) => ResourceLocation.deserialize(item)) : undefined,
        neededBaseBlocks: data.neededBaseBlocks ? data.neededBaseBlocks.map((item: any) => ResourceLocation.deserialize(item)) : undefined,
        spawnsInBiomes: data.spawnsInBiomes ? data.spawnsInBiomes.map((item: any) => ResourceLocation.deserialize(item)) : undefined,
        spawnsInStructures: data.spawnsInStructures ? data.spawnsInStructures.map((item: any) => ResourceLocation.deserialize(item)) : undefined,
        minDepth: data.minDepth ?? undefined,
        maxDepth: data.maxDepth ?? undefined,
        fluidIsSource: data.fluidIsSource ?? undefined,
        fluid: data.fluid ? ResourceLocation.deserialize(data.fluid) : undefined,
        minLureLevel: data.minLureLevel ?? undefined,
        maxLureLevel: data.maxLureLevel ?? undefined,
        bobber: data.bobber ? ResourceLocation.deserialize(data.bobber) : undefined,
        bait: data.bait ? ResourceLocation.deserialize(data.bait) : undefined
    };
}