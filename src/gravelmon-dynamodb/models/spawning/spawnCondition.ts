import { ResourceLocation } from "../minecraft/resourceLocation";
import { NumberRange } from "../properties/numberRange";
import {Time} from "../properties";

export enum LabelMode {
    ANY, ALL
}

export interface SpawnConditionOptions {
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

export class SpawnCondition {
    spawnConditionOptions: SpawnConditionOptions;

    constructor(options: SpawnConditionOptions) {
        this.spawnConditionOptions = options;
    }

    serialize(): any {
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
                timeRange: this.spawnConditionOptions.timeRange,
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
                spawnsInBiomes: this.spawnConditionOptions.spawnsInBiomes ? this.spawnConditionOptions.spawnsInBiomes.map(item => item.serialize()) : undefined,
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
        }
    }

    static deserialize(data: any): SpawnCondition {
        if(!data.spawnConditionOptions) throw new Error("SpawnConditionOptions not found: " + data);
        const options: SpawnConditionOptions = {
            dimensions: data.spawnConditionOptions.dimension ?? undefined,
            moonPhase: data.spawnConditionOptions.moonPhase ? NumberRange.deserialize(data.spawnConditionOptions.moonPhase) : undefined,
            canSeeSky: data.spawnConditionOptions.canSeeSky ?? undefined,
            minY: data.spawnConditionOptions.minY ?? undefined,
            minX: data.spawnConditionOptions.minX ?? undefined,
            minZ: data.spawnConditionOptions.minZ ?? undefined,
            maxY: data.spawnConditionOptions.maxY ?? undefined,
            maxX: data.spawnConditionOptions.maxX ?? undefined,
            maxZ: data.spawnConditionOptions.maxZ ?? undefined,
            minLight: data.spawnConditionOptions.minLight ?? undefined,
            maxLight: data.spawnConditionOptions.maxLight ?? undefined,
            minSkyLight: data.spawnConditionOptions.minSkyLight ?? undefined,
            maxSkyLight: data.spawnConditionOptions.maxSkyLight ?? undefined,
            timeRange: data.spawnConditionOptions.timeRange ?? undefined,
            isRaining: data.spawnConditionOptions.isRaining ?? undefined,
            isThundering: data.spawnConditionOptions.isThundering ?? undefined,
            isSlimeChunk: data.spawnConditionOptions.isSlimeChunk ?? undefined,
            labels: data.spawnConditionOptions.labels ?? undefined,
            labelMode: data.spawnConditionOptions.labelMode ?? undefined,

            minWidth: data.spawnConditionOptions.minWidth ?? undefined,
            maxWidth: data.spawnConditionOptions.maxWidth ?? undefined,
            minLength: data.spawnConditionOptions.minLength ?? undefined,
            maxLength: data.spawnConditionOptions.maxLength ?? undefined,

            neededNearbyBlocks: data.spawnConditionOptions.neededNearbyBlocks ? data.spawnConditionOptions.neededNearbyBlocks.map((item: any) => ResourceLocation.deserialize(item)) : undefined,
            neededBaseBlocks: data.spawnConditionOptions.neededBaseBlocks ? data.spawnConditionOptions.neededBaseBlocks.map((item: any) => ResourceLocation.deserialize(item)) : undefined,
            spawnsInBiomes: data.spawnConditionOptions.spawnsInBiomes ? data.spawnConditionOptions.spawnsInBiomes.map((item: any) => ResourceLocation.deserialize(item)) : undefined,
            spawnsInStructures: data.spawnConditionOptions.spawnsInStructures ? data.spawnConditionOptions.spawnsInStructures.map((item: any) => ResourceLocation.deserialize(item)) : undefined,
            minDepth: data.spawnConditionOptions.minDepth ?? undefined,
            maxDepth: data.spawnConditionOptions.maxDepth ?? undefined,
            fluidIsSource: data.spawnConditionOptions.fluidIsSource ?? undefined,
            fluid: data.spawnConditionOptions.fluid ? ResourceLocation.deserialize(data.spawnConditionOptions.fluid) : undefined,
            minLureLevel: data.spawnConditionOptions.minLureLevel ?? undefined,
            maxLureLevel: data.spawnConditionOptions.maxLureLevel ?? undefined,
            bobber: data.spawnConditionOptions.bobber ? ResourceLocation.deserialize(data.spawnConditionOptions.bobber) : undefined,
            bait: data.spawnConditionOptions.bait ? ResourceLocation.deserialize(data.spawnConditionOptions.bait) : undefined
        };

        return new SpawnCondition(options);
    }
}