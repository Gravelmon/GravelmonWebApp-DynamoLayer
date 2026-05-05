import { ResourceLocation } from "../minecraft/resourceLocation";
import { NumberRange } from "../properties/numberRange";
import { TimeRange } from "../properties/time";
export declare enum LabelMode {
    ANY = 0,
    ALL = 1
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
    timeRange?: TimeRange;
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
    doesNotSpawnInBiomes?: ResourceLocation[];
    spawnsInBiomes?: ResourceLocation[];
    doesNotSpawnInStructures?: ResourceLocation[];
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
export declare class SpawnCondition {
    spawnConditionOptions: SpawnConditionOptions;
    constructor(options: SpawnConditionOptions);
    serialize(): any;
    static deserialize(data: any): SpawnCondition;
}
