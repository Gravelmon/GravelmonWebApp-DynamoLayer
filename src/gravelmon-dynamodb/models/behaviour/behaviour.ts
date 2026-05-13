import {PokemonIdentifier} from '../../nodes/pokemon/pokemonNode';
import {NumberRange} from '../properties/numberRange';
import {deserializeTimeRange, serializeTimeRange, TimeRange} from "../properties";

export enum SleepDepth {
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

export function serializeBehaviourOptions(options: BehaviourOptions): any {
    return {
        movement: options.movement
            ? {
                walk: options.movement.walk
                    ? {
                        canWalk: options.movement.walk.canWalk,
                        avoidsLand: options.movement.walk.avoidsLand,
                        walkSpeed: options.movement.walk.walkSpeed
                    }
                    : undefined,

                aquatic: options.movement.aquatic
                    ? {
                        avoidsWater: options.movement.aquatic.avoidsWater,

                        canSwimInWater: options.movement.aquatic.canSwimInWater,
                        swimSpeed: options.movement.aquatic.swimSpeed,
                        canBreatheUnderwater: options.movement.aquatic.canBreatheUnderwater,
                        canWalkOnWater: options.movement.aquatic.canWalkOnWater,

                        canSwimInLava: options.movement.aquatic.canSwimInLava,
                        canBreatheUnderlava: options.movement.aquatic
                            .canBreatheUnderlava,
                        canWalkOnLava: options.movement.aquatic.canWalkOnLava
                    }
                    : undefined,

                fly: options.movement.fly
                    ? {
                        canFly: options.movement.fly.canFly,
                        flySpeedHorizontal: options.movement.fly.flySpeedHorizontal
                    }
                    : undefined,

                stepHeight: options.movement.stepHeight,
                wanderChance: options.movement.wanderChance,
                wanderSpeed: options.movement.wanderSpeed,
                canLook: options.movement.canLook
            }
            : undefined,

        resting: options.resting
            ? {
                canSleep: options.resting.canSleep,
                times: options.resting.times
                    ? options.resting.times.map((t) =>
                        serializeTimeRange(t)
                    )
                    : undefined,
                biomes: options.resting.biomes,
                blocks: options.resting.blocks,
                fluids: options.resting.fluids,
                light: options.resting.light
                    ? options.resting.light.serialize()
                    : undefined,
                depth: options.resting.depth,
                canSeeSky: options.resting.canSeeSky,
                skyLight: options.resting.skyLight
                    ? options.resting.skyLight.serialize()
                    : undefined,
                drowsyChance: options.resting.drowsyChance,
                rouseChance: options.resting.rouseChance,
                willSleepOnBed: options.resting.willSleepOnBed
            }
            : undefined,

        fireImmune: options.fireImmune,
        dampensVibrations: options.dampensVibrations,

        entityInteract: options.entityInteract
            ? {
                avoidedByCreeper: options.entityInteract.avoidedByCreeper,
                avoidedByPhantom: options.entityInteract.avoidedByPhantom,
                avoidedByFox: options.entityInteract.avoidedByFox,
                avoidedBySkeleton: options.entityInteract.avoidedBySkeleton
            }
            : undefined,

        blockInteract: options.blockInteract
            ? {
                immuneToSweetBerryBushBlock: options.blockInteract.immuneToSweetBerryBushBlock,
                canStandOnPowderSnow: options.blockInteract.canStandOnPowderSnow,
                canPathThroughSaccLeaves: options.blockInteract.canPathThroughSaccLeaves,
                immuneToCobwebBlock: options.blockInteract.immuneToCobwebBlock
            }
            : undefined,

        herd: options.herd
            ? {
                maxHerdSize: options.herd.maxHerdSize,
                herdData: options.herd.herdData.map((h) => ({
                    tier: h.tier,
                    pokemon: h.pokemon.serialize(),
                    ignoresLevel: h.ignoresLevel,
                    followDistance: h.followDistance
                        ? h.followDistance.serialize()
                        : undefined
                })),
                followDistance: options.herd.followDistance
                    ? options.herd.followDistance.serialize()
                    : undefined
            }
            : undefined,

        combat: options.combat
            ? {
                willDefendOwner: options.combat.willDefendOwner,
                willDefendSelf: options.combat.willDefendSelf,
                willFlee: options.combat.willFlee,
                fightsMelee: options.combat.fightsMelee
            }
            : undefined,

        characteristicRainbow:
        options.characteristicRainbow,

        item: options.item
            ? {
                desiredItems: options.item.desiredItems.map(
                    (i) => ({
                        item: i.item,
                        pickupPriority: i.pickupPriority,
                        fullnessValue: i.fullnessValue,
                        returnItem: i.returnItem,
                        expressionLike: i.expressionLike
                    })
                )
            }
            : undefined
    };
}

export function deserializeBehaviourOptions(data: any): BehaviourOptions {
    return {
        movement: data.movement
            ? {
                walk: data.movement.walk
                    ? {
                        canWalk: data.movement.walk.canWalk,
                        avoidsLand: data.movement.walk.avoidsLand,
                        walkSpeed: data.movement.walk.walkSpeed
                    }
                    : undefined,

                aquatic: data.movement.aquatic
                    ? {
                        avoidsWater: data.movement.aquatic.avoidsWater,

                        canSwimInWater: data.movement.aquatic.canSwimInWater,
                        swimSpeed: data.movement.aquatic.swimSpeed,
                        canBreatheUnderwater: data.movement.aquatic.canBreatheUnderwater,
                        canWalkOnWater: data.movement.aquatic.canWalkOnWater,

                        canSwimInLava: data.movement.aquatic.canSwimInLava,
                        canBreatheUnderlava: data.movement.aquatic.canBreatheUnderlava,
                        canWalkOnLava: data.movement.aquatic.canWalkOnLava
                    }
                    : undefined,

                fly: data.movement.fly
                    ? {
                        canFly: data.movement.fly.canFly,
                        flySpeedHorizontal: data.movement.fly.flySpeedHorizontal
                    }
                    : undefined,

                stepHeight: data.movement.stepHeight,
                wanderChance: data.movement.wanderChance,
                wanderSpeed: data.movement.wanderSpeed,
                canLook: data.movement.canLook
            }
            : undefined,

        resting: data.resting
            ? {
                canSleep: data.resting.canSleep,
                times: data.resting.times
                    ? data.resting.times.map((t: any) =>
                        deserializeTimeRange(t)
                    )
                    : undefined,
                biomes: data.resting.biomes,
                blocks: data.resting.blocks,
                fluids: data.resting.fluids,
                light: data.resting.light
                    ? NumberRange.deserialize(
                        data.resting.light
                    )
                    : undefined,
                depth: data.resting.depth,
                canSeeSky: data.resting.canSeeSky,
                skyLight: data.resting.skyLight
                    ? NumberRange.deserialize(
                        data.resting.skyLight
                    )
                    : undefined,
                drowsyChance: data.resting.drowsyChance,
                rouseChance: data.resting.rouseChance,
                willSleepOnBed: data.resting.willSleepOnBed
            }
            : undefined,

        fireImmune: data.fireImmune,
        dampensVibrations: data.dampensVibrations,

        entityInteract: data.entityInteract
            ? {
                avoidedByCreeper: data.entityInteract.avoidedByCreeper,
                avoidedByPhantom: data.entityInteract.avoidedByPhantom,
                avoidedByFox: data.entityInteract.avoidedByFox,
                avoidedBySkeleton: data.entityInteract.avoidedBySkeleton
            }
            : undefined,

        blockInteract: data.blockInteract
            ? {
                immuneToSweetBerryBushBlock: data.blockInteract.immuneToSweetBerryBushBlock,
                canStandOnPowderSnow: data.blockInteract.canStandOnPowderSnow,
                canPathThroughSaccLeaves: data.blockInteract.canPathThroughSaccLeaves,
                immuneToCobwebBlock: data.blockInteract.immuneToCobwebBlock
            }
            : undefined,

        herd: data.herd
            ? {
                maxHerdSize: data.herd.maxHerdSize,

                herdData: data.herd.herdData.map(
                    (h: any) => ({
                        tier: h.tier,
                        pokemon:
                            PokemonIdentifier.deserialize(
                                h.pokemon
                            ),
                        ignoresLevel:
                        h.ignoresLevel,
                        followDistance:
                            h.followDistance
                                ? NumberRange.deserialize(
                                    h.followDistance
                                )
                                : undefined
                    })
                ),

                followDistance:
                    data.herd.followDistance
                        ? NumberRange.deserialize(
                            data.herd.followDistance
                        )
                        : undefined
            }
            : undefined,

        combat: data.combat
            ? {
                willDefendOwner: data.combat.willDefendOwner,
                willDefendSelf: data.combat.willDefendSelf,
                willFlee: data.combat.willFlee,
                fightsMelee: data.combat.fightsMelee
            }
            : undefined,

        characteristicRainbow:
        data.characteristicRainbow,

        item: data.item
            ? {
                desiredItems:
                    data.item.desiredItems.map(
                        (i: any) => ({
                            item: i.item,
                            pickupPriority:
                            i.pickupPriority,
                            fullnessValue:
                            i.fullnessValue,
                            returnItem:
                            i.returnItem,
                            expressionLike:
                            i.expressionLike
                        })
                    )
            }
            : undefined
    };
}