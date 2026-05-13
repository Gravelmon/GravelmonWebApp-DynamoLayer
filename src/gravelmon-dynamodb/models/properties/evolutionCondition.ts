import {ResourceLocation} from "../minecraft/resourceLocation";
import {PokemonIdentifier} from "../../nodes/pokemon/pokemonNode";
import {MoveIdentifier} from "../../nodes";
import {Time} from "./time";
import {NumberRange} from "./numberRange";

export enum EvolutionConditionType {
    LEVEL,
    TIME_RANGE,
    STAT_COMPARE,
    STAT_EQUAL,
    HAS_MOVE,
    HELD_ITEM,
    PROPERTIES,
    FRIENDSHIP,
    FRIENDSHIP_BELOW,
    PARTY_MEMBER,
    BIOME,
    WEATHER,
    BLOCKS_TRAVELED,
    HAS_MOVE_TYPE,
    BATTLE_CRITICAL_HITS,
    CHANCE,
    RECOIL,
    USE_MOVE,
    PROPERTY_RANGE,
    DEFEAT,
    DAMAGE_TAKEN,
}

export enum Stat {
    attack,
    defence,
    special_attack,
    special_defence,
    hp,
    speed
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

    private static deserializeValue(type: EvolutionConditionType, value: any): any {
        if (type === EvolutionConditionType.HELD_ITEM) {
            return ResourceLocation.deserialize(value);
        } else if (type === EvolutionConditionType.PARTY_MEMBER) {
            return PokemonIdentifier.deserialize(value);
        }
        return value;
    }

    static deserialize(data: any): EvolutionCondition<any> {
        const evolutionConditionData = {
            type: data.type,
            values: data.values.map((value: any) => EvolutionCondition.deserializeValue(data.type, value)) as any[]
        };

        switch (evolutionConditionData.type) {
            case EvolutionConditionType.LEVEL:
                return new LevelCondition(evolutionConditionData.values[0]);
            case EvolutionConditionType.TIME_RANGE:
                return new TimeCondition(evolutionConditionData.values[0]);
            case EvolutionConditionType.STAT_COMPARE:
                return new StatCompareCondition(evolutionConditionData.values[0], evolutionConditionData.values[1]);
            case EvolutionConditionType.STAT_EQUAL:
                return new StatEqualCondition(evolutionConditionData.values[0], evolutionConditionData.values[1]);
            case EvolutionConditionType.HAS_MOVE:
                return new HasMoveCondition(MoveIdentifier.deserialize(evolutionConditionData.values[0]));
            case EvolutionConditionType.HAS_MOVE_TYPE:
                return new HasMoveTypeCondition(evolutionConditionData.values[0]);
            case EvolutionConditionType.HELD_ITEM:
                return new HeldItemCondition(ResourceLocation.deserialize(evolutionConditionData.values[0]));
            case EvolutionConditionType.FRIENDSHIP:
                return new FriendshipCondition(evolutionConditionData.values[0] as number);
            case EvolutionConditionType.FRIENDSHIP_BELOW:
                return new FriendshipBelowCondition(evolutionConditionData.values[0] as number);
            case EvolutionConditionType.PROPERTIES:
                return new PropertyCondition(evolutionConditionData.values[0]);
            case EvolutionConditionType.PARTY_MEMBER:
                return new PartyMemberCondition(evolutionConditionData.values[0] as string, evolutionConditionData.values[1] as boolean);
            case EvolutionConditionType.BIOME:
                return new BiomeCondition(evolutionConditionData.values[0] as ResourceLocation);
            case EvolutionConditionType.WEATHER:
                const {isRaining, isThundering} = evolutionConditionData.values[0] as {
                    isRaining: boolean,
                    isThundering: boolean
                };
                return isRaining ? new RainingCondition(true) : new ThunderCondition(isThundering);
            case EvolutionConditionType.BLOCKS_TRAVELED:
                return new BlocksTraveledCondition(evolutionConditionData.values[0] as number);
            case EvolutionConditionType.BATTLE_CRITICAL_HITS:
                return new BattleCriticalHitsCondition(evolutionConditionData.values[0] as number);
            case EvolutionConditionType.CHANCE:
                return new ChanceCondition(evolutionConditionData.values[0] as number);
            case EvolutionConditionType.RECOIL:
                return new RecoilCondition(evolutionConditionData.values[0] as number);
            case EvolutionConditionType.USE_MOVE:
                return new UseMoveCondition(evolutionConditionData.values[0] as string, evolutionConditionData.values[1] as number);
            case EvolutionConditionType.PROPERTY_RANGE:
                return new PropertyRangeCondition(evolutionConditionData.values[0], NumberRange.deserialize(evolutionConditionData.values[1]));
            case EvolutionConditionType.DEFEAT:
                return new DefeatCondition(evolutionConditionData.values[0] as string, evolutionConditionData.values[1] as number);
            case EvolutionConditionType.DAMAGE_TAKEN:
                return new DamageTakenCondition(evolutionConditionData.values[0] as number);
            default:
                throw new Error(`Unsupported EvolutionConditionType: ${evolutionConditionData.type}`);
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

export class BiomeCondition extends EvolutionCondition<ResourceLocation> {
    constructor(value: ResourceLocation) {
        super(EvolutionConditionType.BIOME, {biomeCondition: value});
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


