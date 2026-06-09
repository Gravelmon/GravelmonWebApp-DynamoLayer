import {ResourceLocation} from "../minecraft/resourceLocation";
import {MoveIdentifier} from "../../nodes";
import {Time} from "./time";
import {NumberRange} from "./numberRange";

export enum EvolutionConditionType {
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
    MOON_PHASE = "MOON_PHASE",
}

enum MoonPhase {
    FULL_MOON = "FULL_MOON",
    WANING_GIBBOUS = "WANING_GIBBOUS",
    THIRD_QUARTER = "THIRD_QUARTER",
    WANING_CRESCENT = "WANING_CRESCENT",
    NEW_MOON = "NEW_MOON",
    WAXING_CRESCENT = "WAXING_CRESCENT",
    FIRST_QUARTER = "FIRST_QUARTER",
    WAXING_GIBBOUS = "WAXING_GIBBOUS"
}

export enum Stat {
    attack = "attack",
    defence = "defence",
    special_attack = "special_attack",
    special_defence = "special_defence",
    hp = "hp",
    speed = "speed"
}

export enum Gender {
    MALE = "male",
    FEMALE = "female"
}

export abstract class EvolutionCondition<T> {
    conditions: Record<string, T>;
    type: EvolutionConditionType;

    protected constructor(type: EvolutionConditionType, condition: Record<string, T>) {
        this.type = type;
        this.conditions = condition;
    }

    serialize(): Record<string, any> {
        return {
            type: this.type,
            values: Object.entries(this.conditions).map(([, value]) => this.serializeValue(value))
        }
    }

    serializeValue(value: T): any {
        return value;
    }

    static deserialize(data: any): EvolutionCondition<any> {
        if (!data || typeof data !== "object") {
            throw new Error(`Invalid EvolutionCondition: ${JSON.stringify(data)}`);
        }

        const type: EvolutionConditionType = data.type;

        // convert [{key, value}] -> { key: value }
        const values: Record<string, any> = {};

        if (Array.isArray(data.values)) {
            for (const entry of data.values) {
                if (!entry || typeof entry !== "object") continue;
                values[entry.key] = entry.value;
            }
        }

        // normalize common nested types
        const get = (k: string) => values[k];

        switch (type) {
            case EvolutionConditionType.LEVEL:
                return new LevelCondition(get("minLevel"));

            case EvolutionConditionType.TIME_RANGE:
                return new TimeCondition(get("range"));

            case EvolutionConditionType.MOON_PHASE:
                return new MoonPhaseCondition(get("moonPhase"));

            case EvolutionConditionType.STAT_COMPARE:
                return new StatCompareCondition(get("highStat"), get("lowStat"));

            case EvolutionConditionType.STAT_EQUAL:
                return new StatEqualCondition(get("statOne"), get("statTwo"));

            case EvolutionConditionType.HAS_MOVE:
                return new HasMoveCondition(MoveIdentifier.deserialize(get("move")));

            case EvolutionConditionType.HAS_MOVE_TYPE:
                return new HasMoveTypeCondition(get("type"));

            case EvolutionConditionType.HELD_ITEM:
                return new HeldItemCondition(ResourceLocation.deserialize(get("itemCondition")));

            case EvolutionConditionType.FRIENDSHIP:
                return new FriendshipCondition(get("amount"));

            case EvolutionConditionType.FRIENDSHIP_BELOW:
                return new FriendshipBelowCondition(get("amount"));

            case EvolutionConditionType.PROPERTIES:
                return new PropertyCondition(get("target"));

            case EvolutionConditionType.PARTY_MEMBER:
                return new PartyMemberCondition(get("target"), get("contains"));

            case EvolutionConditionType.BIOME:
                return new BiomeCondition(
                    get("biomeCondition")
                        ? ResourceLocation.deserialize(get("biomeCondition"))
                        : undefined,
                    get("biomeAnticondition")
                        ? ResourceLocation.deserialize(get("biomeAnticondition"))
                        : undefined
                );

            case EvolutionConditionType.STRUCTURE:
                return new StructureCondition(
                    get("structureCondition")
                        ? ResourceLocation.deserialize(get("structureCondition"))
                        : undefined,
                    get("structureAnticondition")
                        ? ResourceLocation.deserialize(get("structureAnticondition"))
                        : undefined
                );

            case EvolutionConditionType.ADVANCEMENT:
                return new AdvancementCondition(ResourceLocation.deserialize(get("requiredAdvancement")));

            case EvolutionConditionType.WEATHER: {
                const weather = values;
                return weather.isRaining
                    ? new RainingCondition(true)
                    : new ThunderCondition(weather.isThundering);
            }

            case EvolutionConditionType.BLOCKS_TRAVELED:
                return new BlocksTraveledCondition(get("amount"));

            case EvolutionConditionType.BATTLE_CRITICAL_HITS:
                return new BattleCriticalHitsCondition(get("amount"));

            case EvolutionConditionType.CHANCE:
                return new ChanceCondition(get("chance"));

            case EvolutionConditionType.RECOIL:
                return new RecoilCondition(get("amount"));

            case EvolutionConditionType.USE_MOVE:
                return new UseMoveCondition(get("move"), get("amount"));

            case EvolutionConditionType.PROPERTY_RANGE:
                return new PropertyRangeCondition(
                    get("feature"),
                    NumberRange.deserialize(get("amount"))
                );

            case EvolutionConditionType.DEFEAT:
                return new DefeatCondition(get("target"), get("amount"));

            case EvolutionConditionType.DAMAGE_TAKEN:
                return new DamageTakenCondition(get("amount"));

            default:
                throw new Error(`Unsupported EvolutionConditionType: ${type}`);
        }
    }
}

export class LevelCondition extends EvolutionCondition<number> {
    constructor(value: number) {
        super(EvolutionConditionType.LEVEL, {minLevel: value});
    }
}

export class TimeCondition extends EvolutionCondition<Time> {
    constructor(value: Time) {
        super(EvolutionConditionType.TIME_RANGE, {range: value});
    }
}

export class MoonPhaseCondition extends EvolutionCondition<MoonPhase> {
    constructor(value: MoonPhase) {
        super(EvolutionConditionType.MOON_PHASE, {moonPhase: value});
    }
}

export class StatCompareCondition extends EvolutionCondition<Stat> {
    constructor(highStat: Stat, lowStat: Stat) {
        super(EvolutionConditionType.STAT_COMPARE, {
            highStat: highStat,
            lowStat: lowStat,
        });
    }
}

export class StatEqualCondition extends EvolutionCondition<Stat> {
    constructor(statOne: Stat, statTwo: Stat) {
        super(EvolutionConditionType.STAT_EQUAL, {
            statOne: statOne,
            statTwo: statTwo,
        });
    }
}

export class HasMoveCondition extends EvolutionCondition<MoveIdentifier> {
    constructor(value: MoveIdentifier) {
        super(EvolutionConditionType.HAS_MOVE, {move: value});
    }

    serializeValue(value: MoveIdentifier): any {
        return value.serialize();
    }
}

export class HasMoveTypeCondition extends EvolutionCondition<string> {
    constructor(type: string) {
        super(EvolutionConditionType.HAS_MOVE_TYPE, {type: type});
    }
}

export class HeldItemCondition extends EvolutionCondition<ResourceLocation> {
    constructor(value: ResourceLocation) {
        super(EvolutionConditionType.HELD_ITEM, {itemCondition: value});
    }

    serializeValue(value: ResourceLocation): any {
        return value.serialize();
    }
}

export class PropertyCondition extends EvolutionCondition<string> {
    constructor(value: string) {
        super(EvolutionConditionType.PROPERTIES, {target: value});
    }
}

export class FriendshipCondition extends EvolutionCondition<number> {
    constructor(value: number) {
        super(EvolutionConditionType.FRIENDSHIP, {amount: value});
    }
}

export class FriendshipBelowCondition extends EvolutionCondition<number> {
    constructor(value: number) {
        super(EvolutionConditionType.FRIENDSHIP_BELOW, {amount: value});
    }
}

export class PartyMemberCondition extends EvolutionCondition<any> {
    constructor(condition: string, contains: boolean = true) {
        super(EvolutionConditionType.PARTY_MEMBER, {
            target: condition,
            contains: contains
        });
    }
}

export class BiomeCondition extends EvolutionCondition<ResourceLocation | undefined> {
    constructor(biomeCondition?: ResourceLocation, biomeAnticondition?: ResourceLocation) {
        super(EvolutionConditionType.BIOME, {biomeCondition: biomeCondition, biomeAnticondition: biomeAnticondition});
    }

    public serializeValue(value: ResourceLocation): any {
        return value.serialize();
    }
}

export class StructureCondition extends EvolutionCondition<ResourceLocation | undefined> {
    constructor(structureCondition?: ResourceLocation, structureAnticondition?: ResourceLocation) {
        super(EvolutionConditionType.STRUCTURE, {structureCondition: structureCondition, structureAnticondition: structureAnticondition});
    }

    public serializeValue(value: ResourceLocation): any {
        return value.serialize();
    }
}

export class AdvancementCondition extends EvolutionCondition<ResourceLocation | undefined> {
    constructor(requiredAdvancement: ResourceLocation) {
        super(EvolutionConditionType.ADVANCEMENT, {requiredAdvancement: requiredAdvancement});
    }

    public serializeValue(value: ResourceLocation): any {
        return value.serialize();
    }
}

export class RainingCondition extends EvolutionCondition<boolean> {
    constructor(value: boolean) {
        super(EvolutionConditionType.WEATHER, {isRaining: value});
    }
}

export class ThunderCondition extends EvolutionCondition<boolean> {
    constructor(value: boolean) {
        super(EvolutionConditionType.WEATHER, {isThundering: value});
    }
}

export class BlocksTraveledCondition extends EvolutionCondition<number> {
    constructor(value: number) {
        super(EvolutionConditionType.BLOCKS_TRAVELED, {amount: value});
    }
}

export class BattleCriticalHitsCondition extends EvolutionCondition<number> {
    constructor(value: number) {
        super(EvolutionConditionType.BATTLE_CRITICAL_HITS, {amount: value});
    }
}

export class ChanceCondition extends EvolutionCondition<number> {
    constructor(value: number) {
        super(EvolutionConditionType.CHANCE, {chance: value});
    }
}

export class DefeatCondition extends EvolutionCondition<any> {
    constructor(target: string, value: number) {
        super(EvolutionConditionType.DEFEAT, {target: target, amount: value});
    }
}

export class PropertyRangeCondition extends EvolutionCondition<any> {
    constructor(feature: string, value: NumberRange) {
        super(EvolutionConditionType.PROPERTY_RANGE, {feature: feature, amount: value});
    }

    public serializeValue(value: any): any {
        if(value instanceof NumberRange) return value.serialize();
        return value;
    }
}

export class RecoilCondition extends EvolutionCondition<number> {
    constructor(value: number) {
        super(EvolutionConditionType.RECOIL, {amount: value});
    }
}

export class DamageTakenCondition extends EvolutionCondition<number> {
    constructor(value: number) {
        super(EvolutionConditionType.DAMAGE_TAKEN, {amount: value});
    }
}

export class UseMoveCondition extends EvolutionCondition<any> {
    constructor(move: string, value: number) {
        super(EvolutionConditionType.USE_MOVE, {move: move, amount: value});
    }
}


