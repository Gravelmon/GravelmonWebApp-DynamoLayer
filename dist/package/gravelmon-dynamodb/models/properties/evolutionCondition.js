"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseMoveCondition = exports.DamageTakenCondition = exports.RecoilCondition = exports.PropertyRangeCondition = exports.DefeatCondition = exports.ChanceCondition = exports.BattleCriticalHitsCondition = exports.BlocksTraveledCondition = exports.ThunderCondition = exports.RainingCondition = exports.AdvancementCondition = exports.StructureCondition = exports.BiomeCondition = exports.PartyMemberCondition = exports.FriendshipBelowCondition = exports.FriendshipCondition = exports.PropertyCondition = exports.HeldItemCondition = exports.HasMoveTypeCondition = exports.HasMoveCondition = exports.StatEqualCondition = exports.StatCompareCondition = exports.MoonPhaseCondition = exports.TimeCondition = exports.LevelCondition = exports.EvolutionCondition = exports.Gender = exports.Stat = exports.EvolutionConditionType = void 0;
const resourceLocation_1 = require("../minecraft/resourceLocation");
const pokemonNode_1 = require("../../nodes/pokemon/pokemonNode");
const nodes_1 = require("../../nodes");
const numberRange_1 = require("./numberRange");
var EvolutionConditionType;
(function (EvolutionConditionType) {
    EvolutionConditionType[EvolutionConditionType["LEVEL"] = 0] = "LEVEL";
    EvolutionConditionType[EvolutionConditionType["TIME_RANGE"] = 1] = "TIME_RANGE";
    EvolutionConditionType[EvolutionConditionType["STAT_COMPARE"] = 2] = "STAT_COMPARE";
    EvolutionConditionType[EvolutionConditionType["STAT_EQUAL"] = 3] = "STAT_EQUAL";
    EvolutionConditionType[EvolutionConditionType["HAS_MOVE"] = 4] = "HAS_MOVE";
    EvolutionConditionType[EvolutionConditionType["HELD_ITEM"] = 5] = "HELD_ITEM";
    EvolutionConditionType[EvolutionConditionType["PROPERTIES"] = 6] = "PROPERTIES";
    EvolutionConditionType[EvolutionConditionType["FRIENDSHIP"] = 7] = "FRIENDSHIP";
    EvolutionConditionType[EvolutionConditionType["FRIENDSHIP_BELOW"] = 8] = "FRIENDSHIP_BELOW";
    EvolutionConditionType[EvolutionConditionType["PARTY_MEMBER"] = 9] = "PARTY_MEMBER";
    EvolutionConditionType[EvolutionConditionType["BIOME"] = 10] = "BIOME";
    EvolutionConditionType[EvolutionConditionType["STRUCTURE"] = 11] = "STRUCTURE";
    EvolutionConditionType[EvolutionConditionType["ADVANCEMENT"] = 12] = "ADVANCEMENT";
    EvolutionConditionType[EvolutionConditionType["WEATHER"] = 13] = "WEATHER";
    EvolutionConditionType[EvolutionConditionType["BLOCKS_TRAVELED"] = 14] = "BLOCKS_TRAVELED";
    EvolutionConditionType[EvolutionConditionType["HAS_MOVE_TYPE"] = 15] = "HAS_MOVE_TYPE";
    EvolutionConditionType[EvolutionConditionType["BATTLE_CRITICAL_HITS"] = 16] = "BATTLE_CRITICAL_HITS";
    EvolutionConditionType[EvolutionConditionType["CHANCE"] = 17] = "CHANCE";
    EvolutionConditionType[EvolutionConditionType["RECOIL"] = 18] = "RECOIL";
    EvolutionConditionType[EvolutionConditionType["USE_MOVE"] = 19] = "USE_MOVE";
    EvolutionConditionType[EvolutionConditionType["PROPERTY_RANGE"] = 20] = "PROPERTY_RANGE";
    EvolutionConditionType[EvolutionConditionType["DEFEAT"] = 21] = "DEFEAT";
    EvolutionConditionType[EvolutionConditionType["DAMAGE_TAKEN"] = 22] = "DAMAGE_TAKEN";
    EvolutionConditionType[EvolutionConditionType["MOON_PHASE"] = 23] = "MOON_PHASE";
})(EvolutionConditionType || (exports.EvolutionConditionType = EvolutionConditionType = {}));
var MoonPhase;
(function (MoonPhase) {
    MoonPhase[MoonPhase["FULL_MOON"] = 0] = "FULL_MOON";
    MoonPhase[MoonPhase["WANING_GIBBOUS"] = 1] = "WANING_GIBBOUS";
    MoonPhase[MoonPhase["THIRD_QUARTER"] = 2] = "THIRD_QUARTER";
    MoonPhase[MoonPhase["WANING_CRESCENT"] = 3] = "WANING_CRESCENT";
    MoonPhase[MoonPhase["NEW_MOON"] = 4] = "NEW_MOON";
    MoonPhase[MoonPhase["WAXING_CRESCENT"] = 5] = "WAXING_CRESCENT";
    MoonPhase[MoonPhase["FIRST_QUARTER"] = 6] = "FIRST_QUARTER";
    MoonPhase[MoonPhase["WAXING_GIBBOUS"] = 7] = "WAXING_GIBBOUS";
})(MoonPhase || (MoonPhase = {}));
var Stat;
(function (Stat) {
    Stat[Stat["attack"] = 0] = "attack";
    Stat[Stat["defence"] = 1] = "defence";
    Stat[Stat["special_attack"] = 2] = "special_attack";
    Stat[Stat["special_defence"] = 3] = "special_defence";
    Stat[Stat["hp"] = 4] = "hp";
    Stat[Stat["speed"] = 5] = "speed";
})(Stat || (exports.Stat = Stat = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
})(Gender || (exports.Gender = Gender = {}));
class EvolutionCondition {
    constructor(type, condition) {
        this.type = type;
        this.conditions = condition;
    }
    serialize() {
        return {
            type: this.type,
            values: Object.entries(this.conditions).map(([, value]) => this.serializeValue(value))
        };
    }
    serializeValue(value) {
        return value;
    }
    static deserializeValue(type, value) {
        if (type === EvolutionConditionType.HELD_ITEM) {
            return resourceLocation_1.ResourceLocation.deserialize(value);
        }
        else if (type === EvolutionConditionType.PARTY_MEMBER) {
            return pokemonNode_1.PokemonIdentifier.deserialize(value);
        }
        return value;
    }
    static deserialize(data) {
        const evolutionConditionData = {
            type: data.type,
            values: data.values.map((value) => EvolutionCondition.deserializeValue(data.type, value))
        };
        switch (evolutionConditionData.type) {
            case EvolutionConditionType.LEVEL:
                return new LevelCondition(evolutionConditionData.values[0]);
            case EvolutionConditionType.TIME_RANGE:
                return new TimeCondition(evolutionConditionData.values[0]);
            case EvolutionConditionType.MOON_PHASE:
                return new MoonPhaseCondition(evolutionConditionData.values[0]);
            case EvolutionConditionType.STAT_COMPARE:
                return new StatCompareCondition(evolutionConditionData.values[0], evolutionConditionData.values[1]);
            case EvolutionConditionType.STAT_EQUAL:
                return new StatEqualCondition(evolutionConditionData.values[0], evolutionConditionData.values[1]);
            case EvolutionConditionType.HAS_MOVE:
                return new HasMoveCondition(nodes_1.MoveIdentifier.deserialize(evolutionConditionData.values[0]));
            case EvolutionConditionType.HAS_MOVE_TYPE:
                return new HasMoveTypeCondition(evolutionConditionData.values[0]);
            case EvolutionConditionType.HELD_ITEM:
                return new HeldItemCondition(resourceLocation_1.ResourceLocation.deserialize(evolutionConditionData.values[0]));
            case EvolutionConditionType.FRIENDSHIP:
                return new FriendshipCondition(evolutionConditionData.values[0]);
            case EvolutionConditionType.FRIENDSHIP_BELOW:
                return new FriendshipBelowCondition(evolutionConditionData.values[0]);
            case EvolutionConditionType.PROPERTIES:
                return new PropertyCondition(evolutionConditionData.values[0]);
            case EvolutionConditionType.PARTY_MEMBER:
                return new PartyMemberCondition(evolutionConditionData.values[0], evolutionConditionData.values[1]);
            case EvolutionConditionType.BIOME:
                return new BiomeCondition(evolutionConditionData.values[0] ? evolutionConditionData.values[0] : undefined, evolutionConditionData.values[1] ? evolutionConditionData.values[1] : undefined);
            case EvolutionConditionType.STRUCTURE:
                return new StructureCondition(evolutionConditionData.values[0] ? evolutionConditionData.values[0] : undefined, evolutionConditionData.values[1] ? evolutionConditionData.values[1] : undefined);
            case EvolutionConditionType.ADVANCEMENT:
                return new AdvancementCondition(evolutionConditionData.values[0]);
            case EvolutionConditionType.WEATHER:
                const { isRaining, isThundering } = evolutionConditionData.values[0];
                return isRaining ? new RainingCondition(true) : new ThunderCondition(isThundering);
            case EvolutionConditionType.BLOCKS_TRAVELED:
                return new BlocksTraveledCondition(evolutionConditionData.values[0]);
            case EvolutionConditionType.BATTLE_CRITICAL_HITS:
                return new BattleCriticalHitsCondition(evolutionConditionData.values[0]);
            case EvolutionConditionType.CHANCE:
                return new ChanceCondition(evolutionConditionData.values[0]);
            case EvolutionConditionType.RECOIL:
                return new RecoilCondition(evolutionConditionData.values[0]);
            case EvolutionConditionType.USE_MOVE:
                return new UseMoveCondition(evolutionConditionData.values[0], evolutionConditionData.values[1]);
            case EvolutionConditionType.PROPERTY_RANGE:
                return new PropertyRangeCondition(evolutionConditionData.values[0], numberRange_1.NumberRange.deserialize(evolutionConditionData.values[1]));
            case EvolutionConditionType.DEFEAT:
                return new DefeatCondition(evolutionConditionData.values[0], evolutionConditionData.values[1]);
            case EvolutionConditionType.DAMAGE_TAKEN:
                return new DamageTakenCondition(evolutionConditionData.values[0]);
            default:
                throw new Error(`Unsupported EvolutionConditionType: ${evolutionConditionData.type}`);
        }
    }
}
exports.EvolutionCondition = EvolutionCondition;
class LevelCondition extends EvolutionCondition {
    constructor(value) {
        super(EvolutionConditionType.LEVEL, { minLevel: value });
    }
}
exports.LevelCondition = LevelCondition;
class TimeCondition extends EvolutionCondition {
    constructor(value) {
        super(EvolutionConditionType.TIME_RANGE, { range: value });
    }
}
exports.TimeCondition = TimeCondition;
class MoonPhaseCondition extends EvolutionCondition {
    constructor(value) {
        super(EvolutionConditionType.MOON_PHASE, { moonPhase: value });
    }
}
exports.MoonPhaseCondition = MoonPhaseCondition;
class StatCompareCondition extends EvolutionCondition {
    constructor(highStat, lowStat) {
        super(EvolutionConditionType.STAT_COMPARE, {
            highStat: highStat,
            lowStat: lowStat,
        });
    }
}
exports.StatCompareCondition = StatCompareCondition;
class StatEqualCondition extends EvolutionCondition {
    constructor(statOne, statTwo) {
        super(EvolutionConditionType.STAT_EQUAL, {
            statOne: statOne,
            statTwo: statTwo,
        });
    }
}
exports.StatEqualCondition = StatEqualCondition;
class HasMoveCondition extends EvolutionCondition {
    constructor(value) {
        super(EvolutionConditionType.HAS_MOVE, { move: value });
    }
    serializeValue(value) {
        return value.serialize();
    }
}
exports.HasMoveCondition = HasMoveCondition;
class HasMoveTypeCondition extends EvolutionCondition {
    constructor(type) {
        super(EvolutionConditionType.HAS_MOVE_TYPE, { type: type });
    }
}
exports.HasMoveTypeCondition = HasMoveTypeCondition;
class HeldItemCondition extends EvolutionCondition {
    constructor(value) {
        super(EvolutionConditionType.HELD_ITEM, { itemCondition: value });
    }
    serializeValue(value) {
        return value.serialize();
    }
}
exports.HeldItemCondition = HeldItemCondition;
class PropertyCondition extends EvolutionCondition {
    constructor(value) {
        super(EvolutionConditionType.PROPERTIES, { target: value });
    }
}
exports.PropertyCondition = PropertyCondition;
class FriendshipCondition extends EvolutionCondition {
    constructor(value) {
        super(EvolutionConditionType.FRIENDSHIP, { amount: value });
    }
}
exports.FriendshipCondition = FriendshipCondition;
class FriendshipBelowCondition extends EvolutionCondition {
    constructor(value) {
        super(EvolutionConditionType.FRIENDSHIP_BELOW, { amount: value });
    }
}
exports.FriendshipBelowCondition = FriendshipBelowCondition;
class PartyMemberCondition extends EvolutionCondition {
    constructor(condition, contains = true) {
        super(EvolutionConditionType.PARTY_MEMBER, {
            target: condition,
            contains: contains
        });
    }
}
exports.PartyMemberCondition = PartyMemberCondition;
class BiomeCondition extends EvolutionCondition {
    constructor(biomeCondition, biomeAnticondition) {
        super(EvolutionConditionType.BIOME, { biomeCondition: biomeCondition, biomeAnticondition: biomeAnticondition });
    }
    serializeValue(value) {
        return value.serialize();
    }
}
exports.BiomeCondition = BiomeCondition;
class StructureCondition extends EvolutionCondition {
    constructor(structureCondition, structureAnticondition) {
        super(EvolutionConditionType.STRUCTURE, { structureCondition: structureCondition, structureAnticondition: structureAnticondition });
    }
    serializeValue(value) {
        return value.serialize();
    }
}
exports.StructureCondition = StructureCondition;
class AdvancementCondition extends EvolutionCondition {
    constructor(requiredAdvancement) {
        super(EvolutionConditionType.ADVANCEMENT, { requiredAdvancement: requiredAdvancement });
    }
    serializeValue(value) {
        return value.serialize();
    }
}
exports.AdvancementCondition = AdvancementCondition;
class RainingCondition extends EvolutionCondition {
    constructor(value) {
        super(EvolutionConditionType.WEATHER, { isRaining: value });
    }
}
exports.RainingCondition = RainingCondition;
class ThunderCondition extends EvolutionCondition {
    constructor(value) {
        super(EvolutionConditionType.WEATHER, { isThundering: value });
    }
}
exports.ThunderCondition = ThunderCondition;
class BlocksTraveledCondition extends EvolutionCondition {
    constructor(value) {
        super(EvolutionConditionType.BLOCKS_TRAVELED, { amount: value });
    }
}
exports.BlocksTraveledCondition = BlocksTraveledCondition;
class BattleCriticalHitsCondition extends EvolutionCondition {
    constructor(value) {
        super(EvolutionConditionType.BATTLE_CRITICAL_HITS, { amount: value });
    }
}
exports.BattleCriticalHitsCondition = BattleCriticalHitsCondition;
class ChanceCondition extends EvolutionCondition {
    constructor(value) {
        super(EvolutionConditionType.CHANCE, { chance: value });
    }
}
exports.ChanceCondition = ChanceCondition;
class DefeatCondition extends EvolutionCondition {
    constructor(target, value) {
        super(EvolutionConditionType.DEFEAT, { target: target, amount: value });
    }
}
exports.DefeatCondition = DefeatCondition;
class PropertyRangeCondition extends EvolutionCondition {
    constructor(feature, value) {
        super(EvolutionConditionType.PROPERTY_RANGE, { feature: feature, amount: value });
    }
    serializeValue(value) {
        if (value instanceof numberRange_1.NumberRange)
            return value.serialize();
        return value;
    }
}
exports.PropertyRangeCondition = PropertyRangeCondition;
class RecoilCondition extends EvolutionCondition {
    constructor(value) {
        super(EvolutionConditionType.RECOIL, { amount: value });
    }
}
exports.RecoilCondition = RecoilCondition;
class DamageTakenCondition extends EvolutionCondition {
    constructor(value) {
        super(EvolutionConditionType.DAMAGE_TAKEN, { amount: value });
    }
}
exports.DamageTakenCondition = DamageTakenCondition;
class UseMoveCondition extends EvolutionCondition {
    constructor(move, value) {
        super(EvolutionConditionType.USE_MOVE, { move: move, amount: value });
    }
}
exports.UseMoveCondition = UseMoveCondition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZvbHV0aW9uQ29uZGl0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2dyYXZlbG1vbi1keW5hbW9kYi9tb2RlbHMvcHJvcGVydGllcy9ldm9sdXRpb25Db25kaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0VBQStEO0FBQy9ELGlFQUFrRTtBQUNsRSx1Q0FBMkM7QUFFM0MsK0NBQTBDO0FBRTFDLElBQVksc0JBeUJYO0FBekJELFdBQVksc0JBQXNCO0lBQzlCLHFFQUFLLENBQUE7SUFDTCwrRUFBVSxDQUFBO0lBQ1YsbUZBQVksQ0FBQTtJQUNaLCtFQUFVLENBQUE7SUFDViwyRUFBUSxDQUFBO0lBQ1IsNkVBQVMsQ0FBQTtJQUNULCtFQUFVLENBQUE7SUFDViwrRUFBVSxDQUFBO0lBQ1YsMkZBQWdCLENBQUE7SUFDaEIsbUZBQVksQ0FBQTtJQUNaLHNFQUFLLENBQUE7SUFDTCw4RUFBUyxDQUFBO0lBQ1Qsa0ZBQVcsQ0FBQTtJQUNYLDBFQUFPLENBQUE7SUFDUCwwRkFBZSxDQUFBO0lBQ2Ysc0ZBQWEsQ0FBQTtJQUNiLG9HQUFvQixDQUFBO0lBQ3BCLHdFQUFNLENBQUE7SUFDTix3RUFBTSxDQUFBO0lBQ04sNEVBQVEsQ0FBQTtJQUNSLHdGQUFjLENBQUE7SUFDZCx3RUFBTSxDQUFBO0lBQ04sb0ZBQVksQ0FBQTtJQUNaLGdGQUFVLENBQUE7QUFDZCxDQUFDLEVBekJXLHNCQUFzQixzQ0FBdEIsc0JBQXNCLFFBeUJqQztBQUVELElBQUssU0FTSjtBQVRELFdBQUssU0FBUztJQUNWLG1EQUFTLENBQUE7SUFDVCw2REFBYyxDQUFBO0lBQ2QsMkRBQWEsQ0FBQTtJQUNiLCtEQUFlLENBQUE7SUFDZixpREFBUSxDQUFBO0lBQ1IsK0RBQWUsQ0FBQTtJQUNmLDJEQUFhLENBQUE7SUFDYiw2REFBYyxDQUFBO0FBQ2xCLENBQUMsRUFUSSxTQUFTLEtBQVQsU0FBUyxRQVNiO0FBRUQsSUFB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O1FBQzNDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLEVBQUUsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFTSxjQUFjLENBQUMsS0FBVTtRQUM1QixJQUFHLEtBQUssWUFBWSx5QkFBVztZQUFFLE9BQU8sS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSjtBQVRELHdEQVNDO0FBRUQsTUFBYSxlQUFnQixTQUFRLGtCQUEwQjtJQUMzRCxZQUFZLEtBQWE7UUFDckIsS0FBSyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7Q0FDSjtBQUpELDBDQUlDO0FBRUQsTUFBYSxvQkFBcUIsU0FBUSxrQkFBMEI7SUFDaEUsWUFBWSxLQUFhO1FBQ3JCLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0NBQ0o7QUFKRCxvREFJQztBQUVELE1BQWEsZ0JBQWlCLFNBQVEsa0JBQXVCO0lBQ3pELFlBQVksSUFBWSxFQUFFLEtBQWE7UUFDbkMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLFFBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztDQUNKO0FBSkQsNENBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Jlc291cmNlTG9jYXRpb259IGZyb20gXCIuLi9taW5lY3JhZnQvcmVzb3VyY2VMb2NhdGlvblwiO1xyXG5pbXBvcnQge1Bva2Vtb25JZGVudGlmaWVyfSBmcm9tIFwiLi4vLi4vbm9kZXMvcG9rZW1vbi9wb2tlbW9uTm9kZVwiO1xyXG5pbXBvcnQge01vdmVJZGVudGlmaWVyfSBmcm9tIFwiLi4vLi4vbm9kZXNcIjtcclxuaW1wb3J0IHtUaW1lfSBmcm9tIFwiLi90aW1lXCI7XHJcbmltcG9ydCB7TnVtYmVyUmFuZ2V9IGZyb20gXCIuL251bWJlclJhbmdlXCI7XHJcblxyXG5leHBvcnQgZW51bSBFdm9sdXRpb25Db25kaXRpb25UeXBlIHtcclxuICAgIExFVkVMLFxyXG4gICAgVElNRV9SQU5HRSxcclxuICAgIFNUQVRfQ09NUEFSRSxcclxuICAgIFNUQVRfRVFVQUwsXHJcbiAgICBIQVNfTU9WRSxcclxuICAgIEhFTERfSVRFTSxcclxuICAgIFBST1BFUlRJRVMsXHJcbiAgICBGUklFTkRTSElQLFxyXG4gICAgRlJJRU5EU0hJUF9CRUxPVyxcclxuICAgIFBBUlRZX01FTUJFUixcclxuICAgIEJJT01FLFxyXG4gICAgU1RSVUNUVVJFLFxyXG4gICAgQURWQU5DRU1FTlQsXHJcbiAgICBXRUFUSEVSLFxyXG4gICAgQkxPQ0tTX1RSQVZFTEVELFxyXG4gICAgSEFTX01PVkVfVFlQRSxcclxuICAgIEJBVFRMRV9DUklUSUNBTF9ISVRTLFxyXG4gICAgQ0hBTkNFLFxyXG4gICAgUkVDT0lMLFxyXG4gICAgVVNFX01PVkUsXHJcbiAgICBQUk9QRVJUWV9SQU5HRSxcclxuICAgIERFRkVBVCxcclxuICAgIERBTUFHRV9UQUtFTixcclxuICAgIE1PT05fUEhBU0UsXHJcbn1cclxuXHJcbmVudW0gTW9vblBoYXNlIHtcclxuICAgIEZVTExfTU9PTixcclxuICAgIFdBTklOR19HSUJCT1VTLFxyXG4gICAgVEhJUkRfUVVBUlRFUixcclxuICAgIFdBTklOR19DUkVTQ0VOVCxcclxuICAgIE5FV19NT09OLFxyXG4gICAgV0FYSU5HX0NSRVNDRU5ULFxyXG4gICAgRklSU1RfUVVBUlRFUixcclxuICAgIFdBWElOR19HSUJCT1VTXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFN0YXQge1xyXG4gICAgYXR0YWNrLFxyXG4gICAgZGVmZW5jZSxcclxuICAgIHNwZWNpYWxfYXR0YWNrLFxyXG4gICAgc3BlY2lhbF9kZWZlbmNlLFxyXG4gICAgaHAsXHJcbiAgICBzcGVlZFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBHZW5kZXIge1xyXG4gICAgTUFMRSA9IFwibWFsZVwiLFxyXG4gICAgRkVNQUxFID0gXCJmZW1hbGVcIlxyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRXZvbHV0aW9uQ29uZGl0aW9uPFQ+IHtcclxuICAgIGNvbmRpdGlvbnM6IFJlY29yZDxzdHJpbmcsIFQ+O1xyXG4gICAgdHlwZTogRXZvbHV0aW9uQ29uZGl0aW9uVHlwZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IodHlwZTogRXZvbHV0aW9uQ29uZGl0aW9uVHlwZSwgY29uZGl0aW9uOiBSZWNvcmQ8c3RyaW5nLCBUPikge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25zID0gY29uZGl0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHNlcmlhbGl6ZSgpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXHJcbiAgICAgICAgICAgIHZhbHVlczogT2JqZWN0LmVudHJpZXModGhpcy5jb25kaXRpb25zKS5tYXAoKFssIHZhbHVlXSkgPT4gdGhpcy5zZXJpYWxpemVWYWx1ZSh2YWx1ZSkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNlcmlhbGl6ZVZhbHVlKHZhbHVlOiBUKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZGVzZXJpYWxpemVWYWx1ZSh0eXBlOiBFdm9sdXRpb25Db25kaXRpb25UeXBlLCB2YWx1ZTogYW55KTogYW55IHtcclxuICAgICAgICBpZiAodHlwZSA9PT0gRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5IRUxEX0lURU0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlc291cmNlTG9jYXRpb24uZGVzZXJpYWxpemUodmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5QQVJUWV9NRU1CRVIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFBva2Vtb25JZGVudGlmaWVyLmRlc2VyaWFsaXplKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkZXNlcmlhbGl6ZShkYXRhOiBhbnkpOiBFdm9sdXRpb25Db25kaXRpb248YW55PiB7XHJcbiAgICAgICAgY29uc3QgZXZvbHV0aW9uQ29uZGl0aW9uRGF0YSA9IHtcclxuICAgICAgICAgICAgdHlwZTogZGF0YS50eXBlLFxyXG4gICAgICAgICAgICB2YWx1ZXM6IGRhdGEudmFsdWVzLm1hcCgodmFsdWU6IGFueSkgPT4gRXZvbHV0aW9uQ29uZGl0aW9uLmRlc2VyaWFsaXplVmFsdWUoZGF0YS50eXBlLCB2YWx1ZSkpIGFzIGFueVtdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChldm9sdXRpb25Db25kaXRpb25EYXRhLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBFdm9sdXRpb25Db25kaXRpb25UeXBlLkxFVkVMOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBMZXZlbENvbmRpdGlvbihldm9sdXRpb25Db25kaXRpb25EYXRhLnZhbHVlc1swXSk7XHJcbiAgICAgICAgICAgIGNhc2UgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5USU1FX1JBTkdFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lQ29uZGl0aW9uKGV2b2x1dGlvbkNvbmRpdGlvbkRhdGEudmFsdWVzWzBdKTtcclxuICAgICAgICAgICAgY2FzZSBFdm9sdXRpb25Db25kaXRpb25UeXBlLk1PT05fUEhBU0U6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE1vb25QaGFzZUNvbmRpdGlvbihldm9sdXRpb25Db25kaXRpb25EYXRhLnZhbHVlc1swXSk7XHJcbiAgICAgICAgICAgIGNhc2UgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5TVEFUX0NPTVBBUkU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFN0YXRDb21wYXJlQ29uZGl0aW9uKGV2b2x1dGlvbkNvbmRpdGlvbkRhdGEudmFsdWVzWzBdLCBldm9sdXRpb25Db25kaXRpb25EYXRhLnZhbHVlc1sxXSk7XHJcbiAgICAgICAgICAgIGNhc2UgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5TVEFUX0VRVUFMOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTdGF0RXF1YWxDb25kaXRpb24oZXZvbHV0aW9uQ29uZGl0aW9uRGF0YS52YWx1ZXNbMF0sIGV2b2x1dGlvbkNvbmRpdGlvbkRhdGEudmFsdWVzWzFdKTtcclxuICAgICAgICAgICAgY2FzZSBFdm9sdXRpb25Db25kaXRpb25UeXBlLkhBU19NT1ZFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIYXNNb3ZlQ29uZGl0aW9uKE1vdmVJZGVudGlmaWVyLmRlc2VyaWFsaXplKGV2b2x1dGlvbkNvbmRpdGlvbkRhdGEudmFsdWVzWzBdKSk7XHJcbiAgICAgICAgICAgIGNhc2UgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5IQVNfTU9WRV9UWVBFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIYXNNb3ZlVHlwZUNvbmRpdGlvbihldm9sdXRpb25Db25kaXRpb25EYXRhLnZhbHVlc1swXSk7XHJcbiAgICAgICAgICAgIGNhc2UgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5IRUxEX0lURU06XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEhlbGRJdGVtQ29uZGl0aW9uKFJlc291cmNlTG9jYXRpb24uZGVzZXJpYWxpemUoZXZvbHV0aW9uQ29uZGl0aW9uRGF0YS52YWx1ZXNbMF0pKTtcclxuICAgICAgICAgICAgY2FzZSBFdm9sdXRpb25Db25kaXRpb25UeXBlLkZSSUVORFNISVA6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZyaWVuZHNoaXBDb25kaXRpb24oZXZvbHV0aW9uQ29uZGl0aW9uRGF0YS52YWx1ZXNbMF0gYXMgbnVtYmVyKTtcclxuICAgICAgICAgICAgY2FzZSBFdm9sdXRpb25Db25kaXRpb25UeXBlLkZSSUVORFNISVBfQkVMT1c6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZyaWVuZHNoaXBCZWxvd0NvbmRpdGlvbihldm9sdXRpb25Db25kaXRpb25EYXRhLnZhbHVlc1swXSBhcyBudW1iZXIpO1xyXG4gICAgICAgICAgICBjYXNlIEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuUFJPUEVSVElFUzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcGVydHlDb25kaXRpb24oZXZvbHV0aW9uQ29uZGl0aW9uRGF0YS52YWx1ZXNbMF0pO1xyXG4gICAgICAgICAgICBjYXNlIEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuUEFSVFlfTUVNQkVSOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQYXJ0eU1lbWJlckNvbmRpdGlvbihldm9sdXRpb25Db25kaXRpb25EYXRhLnZhbHVlc1swXSBhcyBzdHJpbmcsIGV2b2x1dGlvbkNvbmRpdGlvbkRhdGEudmFsdWVzWzFdIGFzIGJvb2xlYW4pO1xyXG4gICAgICAgICAgICBjYXNlIEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuQklPTUU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJpb21lQ29uZGl0aW9uKGV2b2x1dGlvbkNvbmRpdGlvbkRhdGEudmFsdWVzWzBdID8gZXZvbHV0aW9uQ29uZGl0aW9uRGF0YS52YWx1ZXNbMF0gYXMgUmVzb3VyY2VMb2NhdGlvbiA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBldm9sdXRpb25Db25kaXRpb25EYXRhLnZhbHVlc1sxXSA/IGV2b2x1dGlvbkNvbmRpdGlvbkRhdGEudmFsdWVzWzFdIGFzIFJlc291cmNlTG9jYXRpb246IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIGNhc2UgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5TVFJVQ1RVUkU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFN0cnVjdHVyZUNvbmRpdGlvbihldm9sdXRpb25Db25kaXRpb25EYXRhLnZhbHVlc1swXSA/IGV2b2x1dGlvbkNvbmRpdGlvbkRhdGEudmFsdWVzWzBdIGFzIFJlc291cmNlTG9jYXRpb24gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZXZvbHV0aW9uQ29uZGl0aW9uRGF0YS52YWx1ZXNbMV0gPyBldm9sdXRpb25Db25kaXRpb25EYXRhLnZhbHVlc1sxXSBhcyBSZXNvdXJjZUxvY2F0aW9uOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBjYXNlIEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuQURWQU5DRU1FTlQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFkdmFuY2VtZW50Q29uZGl0aW9uKGV2b2x1dGlvbkNvbmRpdGlvbkRhdGEudmFsdWVzWzBdIGFzIFJlc291cmNlTG9jYXRpb24pO1xyXG4gICAgICAgICAgICBjYXNlIEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuV0VBVEhFUjpcclxuICAgICAgICAgICAgICAgIGNvbnN0IHtpc1JhaW5pbmcsIGlzVGh1bmRlcmluZ30gPSBldm9sdXRpb25Db25kaXRpb25EYXRhLnZhbHVlc1swXSBhcyB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNSYWluaW5nOiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzVGh1bmRlcmluZzogYm9vbGVhblxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpc1JhaW5pbmcgPyBuZXcgUmFpbmluZ0NvbmRpdGlvbih0cnVlKSA6IG5ldyBUaHVuZGVyQ29uZGl0aW9uKGlzVGh1bmRlcmluZyk7XHJcbiAgICAgICAgICAgIGNhc2UgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5CTE9DS1NfVFJBVkVMRUQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJsb2Nrc1RyYXZlbGVkQ29uZGl0aW9uKGV2b2x1dGlvbkNvbmRpdGlvbkRhdGEudmFsdWVzWzBdIGFzIG51bWJlcik7XHJcbiAgICAgICAgICAgIGNhc2UgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5CQVRUTEVfQ1JJVElDQUxfSElUUzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQmF0dGxlQ3JpdGljYWxIaXRzQ29uZGl0aW9uKGV2b2x1dGlvbkNvbmRpdGlvbkRhdGEudmFsdWVzWzBdIGFzIG51bWJlcik7XHJcbiAgICAgICAgICAgIGNhc2UgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5DSEFOQ0U6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENoYW5jZUNvbmRpdGlvbihldm9sdXRpb25Db25kaXRpb25EYXRhLnZhbHVlc1swXSBhcyBudW1iZXIpO1xyXG4gICAgICAgICAgICBjYXNlIEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuUkVDT0lMOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWNvaWxDb25kaXRpb24oZXZvbHV0aW9uQ29uZGl0aW9uRGF0YS52YWx1ZXNbMF0gYXMgbnVtYmVyKTtcclxuICAgICAgICAgICAgY2FzZSBFdm9sdXRpb25Db25kaXRpb25UeXBlLlVTRV9NT1ZFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVc2VNb3ZlQ29uZGl0aW9uKGV2b2x1dGlvbkNvbmRpdGlvbkRhdGEudmFsdWVzWzBdIGFzIHN0cmluZywgZXZvbHV0aW9uQ29uZGl0aW9uRGF0YS52YWx1ZXNbMV0gYXMgbnVtYmVyKTtcclxuICAgICAgICAgICAgY2FzZSBFdm9sdXRpb25Db25kaXRpb25UeXBlLlBST1BFUlRZX1JBTkdFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eVJhbmdlQ29uZGl0aW9uKGV2b2x1dGlvbkNvbmRpdGlvbkRhdGEudmFsdWVzWzBdLCBOdW1iZXJSYW5nZS5kZXNlcmlhbGl6ZShldm9sdXRpb25Db25kaXRpb25EYXRhLnZhbHVlc1sxXSkpO1xyXG4gICAgICAgICAgICBjYXNlIEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuREVGRUFUOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEZWZlYXRDb25kaXRpb24oZXZvbHV0aW9uQ29uZGl0aW9uRGF0YS52YWx1ZXNbMF0gYXMgc3RyaW5nLCBldm9sdXRpb25Db25kaXRpb25EYXRhLnZhbHVlc1sxXSBhcyBudW1iZXIpO1xyXG4gICAgICAgICAgICBjYXNlIEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuREFNQUdFX1RBS0VOOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYW1hZ2VUYWtlbkNvbmRpdGlvbihldm9sdXRpb25Db25kaXRpb25EYXRhLnZhbHVlc1swXSBhcyBudW1iZXIpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBFdm9sdXRpb25Db25kaXRpb25UeXBlOiAke2V2b2x1dGlvbkNvbmRpdGlvbkRhdGEudHlwZX1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMZXZlbENvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxudW1iZXI+IHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihFdm9sdXRpb25Db25kaXRpb25UeXBlLkxFVkVMLCB7bWluTGV2ZWw6IHZhbHVlfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1lQ29uZGl0aW9uIGV4dGVuZHMgRXZvbHV0aW9uQ29uZGl0aW9uPFRpbWU+IHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBUaW1lKSB7XHJcbiAgICAgICAgc3VwZXIoRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5USU1FX1JBTkdFLCB7cmFuZ2U6IHZhbHVlfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb29uUGhhc2VDb25kaXRpb24gZXh0ZW5kcyBFdm9sdXRpb25Db25kaXRpb248TW9vblBoYXNlPiB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogTW9vblBoYXNlKSB7XHJcbiAgICAgICAgc3VwZXIoRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5NT09OX1BIQVNFLCB7bW9vblBoYXNlOiB2YWx1ZX0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdENvbXBhcmVDb25kaXRpb24gZXh0ZW5kcyBFdm9sdXRpb25Db25kaXRpb248U3RhdD4ge1xyXG4gICAgY29uc3RydWN0b3IoaGlnaFN0YXQ6IFN0YXQsIGxvd1N0YXQ6IFN0YXQpIHtcclxuICAgICAgICBzdXBlcihFdm9sdXRpb25Db25kaXRpb25UeXBlLlNUQVRfQ09NUEFSRSwge1xyXG4gICAgICAgICAgICBoaWdoU3RhdDogaGlnaFN0YXQsXHJcbiAgICAgICAgICAgIGxvd1N0YXQ6IGxvd1N0YXQsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGF0RXF1YWxDb25kaXRpb24gZXh0ZW5kcyBFdm9sdXRpb25Db25kaXRpb248U3RhdD4ge1xyXG4gICAgY29uc3RydWN0b3Ioc3RhdE9uZTogU3RhdCwgc3RhdFR3bzogU3RhdCkge1xyXG4gICAgICAgIHN1cGVyKEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuU1RBVF9FUVVBTCwge1xyXG4gICAgICAgICAgICBzdGF0T25lOiBzdGF0T25lLFxyXG4gICAgICAgICAgICBzdGF0VHdvOiBzdGF0VHdvLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGFzTW92ZUNvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxNb3ZlSWRlbnRpZmllcj4ge1xyXG4gICAgY29uc3RydWN0b3IodmFsdWU6IE1vdmVJZGVudGlmaWVyKSB7XHJcbiAgICAgICAgc3VwZXIoRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5IQVNfTU9WRSwge21vdmU6IHZhbHVlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VyaWFsaXplVmFsdWUodmFsdWU6IE1vdmVJZGVudGlmaWVyKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdmFsdWUuc2VyaWFsaXplKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIYXNNb3ZlVHlwZUNvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxzdHJpbmc+IHtcclxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuSEFTX01PVkVfVFlQRSwge3R5cGU6IHR5cGV9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhlbGRJdGVtQ29uZGl0aW9uIGV4dGVuZHMgRXZvbHV0aW9uQ29uZGl0aW9uPFJlc291cmNlTG9jYXRpb24+IHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBSZXNvdXJjZUxvY2F0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5IRUxEX0lURU0sIHtpdGVtQ29uZGl0aW9uOiB2YWx1ZX0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNlcmlhbGl6ZVZhbHVlKHZhbHVlOiBSZXNvdXJjZUxvY2F0aW9uKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdmFsdWUuc2VyaWFsaXplKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eUNvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxzdHJpbmc+IHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihFdm9sdXRpb25Db25kaXRpb25UeXBlLlBST1BFUlRJRVMsIHt0YXJnZXQ6IHZhbHVlfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGcmllbmRzaGlwQ29uZGl0aW9uIGV4dGVuZHMgRXZvbHV0aW9uQ29uZGl0aW9uPG51bWJlcj4ge1xyXG4gICAgY29uc3RydWN0b3IodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuRlJJRU5EU0hJUCwge2Ftb3VudDogdmFsdWV9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZyaWVuZHNoaXBCZWxvd0NvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxudW1iZXI+IHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihFdm9sdXRpb25Db25kaXRpb25UeXBlLkZSSUVORFNISVBfQkVMT1csIHthbW91bnQ6IHZhbHVlfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYXJ0eU1lbWJlckNvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxhbnk+IHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbmRpdGlvbjogc3RyaW5nLCBjb250YWluczogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICBzdXBlcihFdm9sdXRpb25Db25kaXRpb25UeXBlLlBBUlRZX01FTUJFUiwge1xyXG4gICAgICAgICAgICB0YXJnZXQ6IGNvbmRpdGlvbixcclxuICAgICAgICAgICAgY29udGFpbnM6IGNvbnRhaW5zXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCaW9tZUNvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxSZXNvdXJjZUxvY2F0aW9uIHwgdW5kZWZpbmVkPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihiaW9tZUNvbmRpdGlvbj86IFJlc291cmNlTG9jYXRpb24sIGJpb21lQW50aWNvbmRpdGlvbj86IFJlc291cmNlTG9jYXRpb24pIHtcclxuICAgICAgICBzdXBlcihFdm9sdXRpb25Db25kaXRpb25UeXBlLkJJT01FLCB7YmlvbWVDb25kaXRpb246IGJpb21lQ29uZGl0aW9uLCBiaW9tZUFudGljb25kaXRpb246IGJpb21lQW50aWNvbmRpdGlvbn0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXJpYWxpemVWYWx1ZSh2YWx1ZTogUmVzb3VyY2VMb2NhdGlvbik6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnNlcmlhbGl6ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RydWN0dXJlQ29uZGl0aW9uIGV4dGVuZHMgRXZvbHV0aW9uQ29uZGl0aW9uPFJlc291cmNlTG9jYXRpb24gfCB1bmRlZmluZWQ+IHtcclxuICAgIGNvbnN0cnVjdG9yKHN0cnVjdHVyZUNvbmRpdGlvbj86IFJlc291cmNlTG9jYXRpb24sIHN0cnVjdHVyZUFudGljb25kaXRpb24/OiBSZXNvdXJjZUxvY2F0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5TVFJVQ1RVUkUsIHtzdHJ1Y3R1cmVDb25kaXRpb246IHN0cnVjdHVyZUNvbmRpdGlvbiwgc3RydWN0dXJlQW50aWNvbmRpdGlvbjogc3RydWN0dXJlQW50aWNvbmRpdGlvbn0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXJpYWxpemVWYWx1ZSh2YWx1ZTogUmVzb3VyY2VMb2NhdGlvbik6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnNlcmlhbGl6ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWR2YW5jZW1lbnRDb25kaXRpb24gZXh0ZW5kcyBFdm9sdXRpb25Db25kaXRpb248UmVzb3VyY2VMb2NhdGlvbiB8IHVuZGVmaW5lZD4ge1xyXG4gICAgY29uc3RydWN0b3IocmVxdWlyZWRBZHZhbmNlbWVudDogUmVzb3VyY2VMb2NhdGlvbikge1xyXG4gICAgICAgIHN1cGVyKEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuQURWQU5DRU1FTlQsIHtyZXF1aXJlZEFkdmFuY2VtZW50OiByZXF1aXJlZEFkdmFuY2VtZW50fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlcmlhbGl6ZVZhbHVlKHZhbHVlOiBSZXNvdXJjZUxvY2F0aW9uKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdmFsdWUuc2VyaWFsaXplKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSYWluaW5nQ29uZGl0aW9uIGV4dGVuZHMgRXZvbHV0aW9uQ29uZGl0aW9uPGJvb2xlYW4+IHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgc3VwZXIoRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5XRUFUSEVSLCB7aXNSYWluaW5nOiB2YWx1ZX0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGh1bmRlckNvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxib29sZWFuPiB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHN1cGVyKEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuV0VBVEhFUiwge2lzVGh1bmRlcmluZzogdmFsdWV9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJsb2Nrc1RyYXZlbGVkQ29uZGl0aW9uIGV4dGVuZHMgRXZvbHV0aW9uQ29uZGl0aW9uPG51bWJlcj4ge1xyXG4gICAgY29uc3RydWN0b3IodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuQkxPQ0tTX1RSQVZFTEVELCB7YW1vdW50OiB2YWx1ZX0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmF0dGxlQ3JpdGljYWxIaXRzQ29uZGl0aW9uIGV4dGVuZHMgRXZvbHV0aW9uQ29uZGl0aW9uPG51bWJlcj4ge1xyXG4gICAgY29uc3RydWN0b3IodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuQkFUVExFX0NSSVRJQ0FMX0hJVFMsIHthbW91bnQ6IHZhbHVlfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFuY2VDb25kaXRpb24gZXh0ZW5kcyBFdm9sdXRpb25Db25kaXRpb248bnVtYmVyPiB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5DSEFOQ0UsIHtjaGFuY2U6IHZhbHVlfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZlYXRDb25kaXRpb24gZXh0ZW5kcyBFdm9sdXRpb25Db25kaXRpb248YW55PiB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXQ6IHN0cmluZywgdmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuREVGRUFULCB7dGFyZ2V0OiB0YXJnZXQsIGFtb3VudDogdmFsdWV9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFByb3BlcnR5UmFuZ2VDb25kaXRpb24gZXh0ZW5kcyBFdm9sdXRpb25Db25kaXRpb248YW55PiB7XHJcbiAgICBjb25zdHJ1Y3RvcihmZWF0dXJlOiBzdHJpbmcsIHZhbHVlOiBOdW1iZXJSYW5nZSkge1xyXG4gICAgICAgIHN1cGVyKEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuUFJPUEVSVFlfUkFOR0UsIHtmZWF0dXJlOiBmZWF0dXJlLCBhbW91bnQ6IHZhbHVlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlcmlhbGl6ZVZhbHVlKHZhbHVlOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgTnVtYmVyUmFuZ2UpIHJldHVybiB2YWx1ZS5zZXJpYWxpemUoKTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZWNvaWxDb25kaXRpb24gZXh0ZW5kcyBFdm9sdXRpb25Db25kaXRpb248bnVtYmVyPiB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5SRUNPSUwsIHthbW91bnQ6IHZhbHVlfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEYW1hZ2VUYWtlbkNvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxudW1iZXI+IHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihFdm9sdXRpb25Db25kaXRpb25UeXBlLkRBTUFHRV9UQUtFTiwge2Ftb3VudDogdmFsdWV9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVzZU1vdmVDb25kaXRpb24gZXh0ZW5kcyBFdm9sdXRpb25Db25kaXRpb248YW55PiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihtb3ZlOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihFdm9sdXRpb25Db25kaXRpb25UeXBlLlVTRV9NT1ZFLCB7bW92ZTogbW92ZSwgYW1vdW50OiB2YWx1ZX0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl19