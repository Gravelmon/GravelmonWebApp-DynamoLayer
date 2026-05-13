import { PokemonIdentifier } from '../../nodes/pokemon/pokemonNode';
import { NumberRange } from '../properties/numberRange';
import { TimeRange } from "../properties";
export declare enum SleepDepth {
    Normal = "normal",
    Comatose = "comatose"
}
export interface BehaviourMovementOptions {
    walk?: WalkMovementOptions;
    aquatic?: AquaticMovementOptions;
    fly?: FlyMovementOptions;
    stepHeight?: number;
    wanderChance?: number;
    wanderSpeed?: number;
    canLook?: boolean;
}
export interface WalkMovementOptions {
    canWalk?: boolean;
    avoidsLand?: boolean;
    walkSpeed?: number;
}
export interface FlyMovementOptions {
    canFly?: boolean;
    flySpeedHorizontal?: number;
}
export interface AquaticMovementOptions {
    avoidsWater?: boolean;
    canSwimInWater?: boolean;
    swimSpeed?: number;
    canBreatheUnderwater?: boolean;
    canWalkOnWater?: boolean;
    canSwimInLava?: boolean;
    canBreatheUnderlava?: boolean;
    canWalkOnLava?: boolean;
}
export interface BehaviourSleepOptions {
    canSleep?: boolean;
    times?: TimeRange[];
    biomes?: string[];
    blocks?: string[];
    fluids?: string[];
    light?: NumberRange;
    depth?: SleepDepth;
    canSeeSky?: boolean;
    skyLight?: NumberRange;
    drowsyChance?: number;
    rouseChance?: number;
    willSleepOnBed?: boolean;
}
export interface HerdData {
    tier: number;
    pokemon: PokemonIdentifier;
    ignoresLevel?: boolean;
    followDistance?: NumberRange;
}
export interface BehaviorHerdingOptions {
    maxHerdSize: number;
    herdData: HerdData[];
    followDistance?: NumberRange;
}
export interface CombatBehaviourOptions {
    willDefendOwner?: boolean;
    willDefendSelf?: boolean;
    willFlee?: boolean;
    fightsMelee?: boolean;
}
export interface EntityBehaviourOptions {
    avoidedByCreeper?: boolean;
    avoidedByPhantom?: boolean;
    avoidedByFox?: boolean;
    avoidedBySkeleton?: boolean;
}
export interface ItemBehaviourOptions {
    desiredItems: ObtainableItemDTO[];
}
export interface ObtainableItemDTO {
    item: string;
    pickupPriority?: number;
    fullnessValue?: number;
    returnItem?: string;
    expressionLike?: string;
}
export interface BlockBehaviourOptions {
    immuneToSweetBerryBushBlock?: boolean;
    canStandOnPowderSnow?: boolean;
    canPathThroughSaccLeaves?: boolean;
    immuneToCobwebBlock?: boolean;
}
export interface BehaviourOptions {
    resting?: BehaviourSleepOptions;
    movement?: BehaviourMovementOptions;
    fireImmune?: boolean;
    dampensVibrations?: boolean;
    entityInteract?: EntityBehaviourOptions;
    blockInteract?: BlockBehaviourOptions;
    combat?: CombatBehaviourOptions;
    herd?: BehaviorHerdingOptions;
    characteristicRainbow?: boolean;
    item?: ItemBehaviourOptions;
}
export declare function serializeBehaviourOptions(options: BehaviourOptions): any;
export declare function deserializeBehaviourOptions(data: any): BehaviourOptions;
