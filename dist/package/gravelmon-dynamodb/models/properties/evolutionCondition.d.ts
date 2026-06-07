import { ResourceLocation } from "../minecraft/resourceLocation";
import { MoveIdentifier } from "../../nodes";
import { Time } from "./time";
import { NumberRange } from "./numberRange";
export declare enum EvolutionConditionType {
    LEVEL = 0,
    TIME_RANGE = 1,
    STAT_COMPARE = 2,
    STAT_EQUAL = 3,
    HAS_MOVE = 4,
    HELD_ITEM = 5,
    PROPERTIES = 6,
    FRIENDSHIP = 7,
    FRIENDSHIP_BELOW = 8,
    PARTY_MEMBER = 9,
    BIOME = 10,
    STRUCTURE = 11,
    ADVANCEMENT = 12,
    WEATHER = 13,
    BLOCKS_TRAVELED = 14,
    HAS_MOVE_TYPE = 15,
    BATTLE_CRITICAL_HITS = 16,
    CHANCE = 17,
    RECOIL = 18,
    USE_MOVE = 19,
    PROPERTY_RANGE = 20,
    DEFEAT = 21,
    DAMAGE_TAKEN = 22,
    MOON_PHASE = 23
}
declare enum MoonPhase {
    FULL_MOON = 0,
    WANING_GIBBOUS = 1,
    THIRD_QUARTER = 2,
    WANING_CRESCENT = 3,
    NEW_MOON = 4,
    WAXING_CRESCENT = 5,
    FIRST_QUARTER = 6,
    WAXING_GIBBOUS = 7
}
export declare enum Stat {
    attack = 0,
    defence = 1,
    special_attack = 2,
    special_defence = 3,
    hp = 4,
    speed = 5
}
export declare enum Gender {
    MALE = "male",
    FEMALE = "female"
}
export declare abstract class EvolutionCondition<T> {
    conditions: Record<string, T>;
    type: EvolutionConditionType;
    protected constructor(type: EvolutionConditionType, condition: Record<string, T>);
    serialize(): Record<string, any>;
    serializeValue(value: T): any;
    private static deserializeValue;
    static deserialize(data: any): EvolutionCondition<any>;
}
export declare class LevelCondition extends EvolutionCondition<number> {
    constructor(value: number);
}
export declare class TimeCondition extends EvolutionCondition<Time> {
    constructor(value: Time);
}
export declare class MoonPhaseCondition extends EvolutionCondition<MoonPhase> {
    constructor(value: MoonPhase);
}
export declare class StatCompareCondition extends EvolutionCondition<Stat> {
    constructor(highStat: Stat, lowStat: Stat);
}
export declare class StatEqualCondition extends EvolutionCondition<Stat> {
    constructor(statOne: Stat, statTwo: Stat);
}
export declare class HasMoveCondition extends EvolutionCondition<MoveIdentifier> {
    constructor(value: MoveIdentifier);
    serializeValue(value: MoveIdentifier): any;
}
export declare class HasMoveTypeCondition extends EvolutionCondition<string> {
    constructor(type: string);
}
export declare class HeldItemCondition extends EvolutionCondition<ResourceLocation> {
    constructor(value: ResourceLocation);
    serializeValue(value: ResourceLocation): any;
}
export declare class PropertyCondition extends EvolutionCondition<string> {
    constructor(value: string);
}
export declare class FriendshipCondition extends EvolutionCondition<number> {
    constructor(value: number);
}
export declare class FriendshipBelowCondition extends EvolutionCondition<number> {
    constructor(value: number);
}
export declare class PartyMemberCondition extends EvolutionCondition<any> {
    constructor(condition: string, contains?: boolean);
}
export declare class BiomeCondition extends EvolutionCondition<ResourceLocation | undefined> {
    constructor(biomeCondition?: ResourceLocation, biomeAnticondition?: ResourceLocation);
    serializeValue(value: ResourceLocation): any;
}
export declare class StructureCondition extends EvolutionCondition<ResourceLocation | undefined> {
    constructor(structureCondition?: ResourceLocation, structureAnticondition?: ResourceLocation);
    serializeValue(value: ResourceLocation): any;
}
export declare class AdvancementCondition extends EvolutionCondition<ResourceLocation | undefined> {
    constructor(requiredAdvancement: ResourceLocation);
    serializeValue(value: ResourceLocation): any;
}
export declare class RainingCondition extends EvolutionCondition<boolean> {
    constructor(value: boolean);
}
export declare class ThunderCondition extends EvolutionCondition<boolean> {
    constructor(value: boolean);
}
export declare class BlocksTraveledCondition extends EvolutionCondition<number> {
    constructor(value: number);
}
export declare class BattleCriticalHitsCondition extends EvolutionCondition<number> {
    constructor(value: number);
}
export declare class ChanceCondition extends EvolutionCondition<number> {
    constructor(value: number);
}
export declare class DefeatCondition extends EvolutionCondition<any> {
    constructor(target: string, value: number);
}
export declare class PropertyRangeCondition extends EvolutionCondition<any> {
    constructor(feature: string, value: NumberRange);
    serializeValue(value: any): any;
}
export declare class RecoilCondition extends EvolutionCondition<number> {
    constructor(value: number);
}
export declare class DamageTakenCondition extends EvolutionCondition<number> {
    constructor(value: number);
}
export declare class UseMoveCondition extends EvolutionCondition<any> {
    constructor(move: string, value: number);
}
export {};
