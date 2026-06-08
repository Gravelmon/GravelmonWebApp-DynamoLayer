import { ResourceLocation } from "../minecraft/resourceLocation";
import { MoveIdentifier } from "../../nodes";
import { Time } from "./time";
import { NumberRange } from "./numberRange";
export declare enum EvolutionConditionType {
    LEVEL = "LEVEL",
    TIME_RANGE = "TIME_RANGE",
    STAT_COMPARE = "STAT_COMPARE",
    STAT_EQUAL = "STAT_EQUAL",
    HAS_MOVE = "HAS_MOVE",
    HELD_ITEM = "HELD_ITEM",
    PROPERTIES = "PROPERTIES",
    FRIENDSHIP = "FRIENDSHIP",
    FRIENDSHIP_BELOW = "FRIENDSHIP_BELOW",
    PARTY_MEMBER = "PARTY_MEMBER",
    BIOME = "BIOME",
    STRUCTURE = "STRUCTURE",
    ADVANCEMENT = "ADVANCEMENT",
    WEATHER = "WEATHER",
    BLOCKS_TRAVELED = "BLOCKS_TRAVELED",
    HAS_MOVE_TYPE = "HAS_MOVE_TYPE",
    BATTLE_CRITICAL_HITS = "BATTLE_CRITICAL_HITS",
    CHANCE = "CHANCE",
    RECOIL = "RECOIL",
    USE_MOVE = "USE_MOVE",
    PROPERTY_RANGE = "PROPERTY_RANGE",
    DEFEAT = "DEFEAT",
    DAMAGE_TAKEN = "DAMAGE_TAKEN",
    MOON_PHASE = "MOON_PHASE"
}
declare enum MoonPhase {
    FULL_MOON = "FULL_MOON",
    WANING_GIBBOUS = "WANING_GIBBOUS",
    THIRD_QUARTER = "THIRD_QUARTER",
    WANING_CRESCENT = "WANING_CRESCENT",
    NEW_MOON = "NEW_MOON",
    WAXING_CRESCENT = "WAXING_CRESCENT",
    FIRST_QUARTER = "FIRST_QUARTER",
    WAXING_GIBBOUS = "WAXING_GIBBOUS"
}
export declare enum Stat {
    attack = "attack",
    defence = "defence",
    special_attack = "special_attack",
    special_defence = "special_defence",
    hp = "hp",
    speed = "speed"
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
