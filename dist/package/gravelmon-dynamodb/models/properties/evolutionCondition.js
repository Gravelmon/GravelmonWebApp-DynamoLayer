"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseMoveCondition = exports.DamageTakenCondition = exports.RecoilCondition = exports.PropertyRangeCondition = exports.DefeatCondition = exports.ChanceCondition = exports.BattleCriticalHitsCondition = exports.BlocksTraveledCondition = exports.ThunderCondition = exports.RainingCondition = exports.AdvancementCondition = exports.StructureCondition = exports.BiomeCondition = exports.PartyMemberCondition = exports.FriendshipBelowCondition = exports.FriendshipCondition = exports.PropertyCondition = exports.HeldItemCondition = exports.HasMoveTypeCondition = exports.HasMoveCondition = exports.StatEqualCondition = exports.StatCompareCondition = exports.MoonPhaseCondition = exports.TimeCondition = exports.LevelCondition = exports.EvolutionCondition = exports.Gender = exports.Stat = exports.EvolutionConditionType = void 0;
const resourceLocation_1 = require("../minecraft/resourceLocation");
const nodes_1 = require("../../nodes");
const numberRange_1 = require("./numberRange");
var EvolutionConditionType;
(function (EvolutionConditionType) {
    EvolutionConditionType["LEVEL"] = "LEVEL";
    EvolutionConditionType["TIME_RANGE"] = "TIME_RANGE";
    EvolutionConditionType["STAT_COMPARE"] = "STAT_COMPARE";
    EvolutionConditionType["STAT_EQUAL"] = "STAT_EQUAL";
    EvolutionConditionType["HAS_MOVE"] = "HAS_MOVE";
    EvolutionConditionType["HELD_ITEM"] = "HELD_ITEM";
    EvolutionConditionType["PROPERTIES"] = "PROPERTIES";
    EvolutionConditionType["FRIENDSHIP"] = "FRIENDSHIP";
    EvolutionConditionType["FRIENDSHIP_BELOW"] = "FRIENDSHIP_BELOW";
    EvolutionConditionType["PARTY_MEMBER"] = "PARTY_MEMBER";
    EvolutionConditionType["BIOME"] = "BIOME";
    EvolutionConditionType["STRUCTURE"] = "STRUCTURE";
    EvolutionConditionType["ADVANCEMENT"] = "ADVANCEMENT";
    EvolutionConditionType["WEATHER"] = "WEATHER";
    EvolutionConditionType["BLOCKS_TRAVELED"] = "BLOCKS_TRAVELED";
    EvolutionConditionType["HAS_MOVE_TYPE"] = "HAS_MOVE_TYPE";
    EvolutionConditionType["BATTLE_CRITICAL_HITS"] = "BATTLE_CRITICAL_HITS";
    EvolutionConditionType["CHANCE"] = "CHANCE";
    EvolutionConditionType["RECOIL"] = "RECOIL";
    EvolutionConditionType["USE_MOVE"] = "USE_MOVE";
    EvolutionConditionType["PROPERTY_RANGE"] = "PROPERTY_RANGE";
    EvolutionConditionType["DEFEAT"] = "DEFEAT";
    EvolutionConditionType["DAMAGE_TAKEN"] = "DAMAGE_TAKEN";
    EvolutionConditionType["MOON_PHASE"] = "MOON_PHASE";
})(EvolutionConditionType || (exports.EvolutionConditionType = EvolutionConditionType = {}));
var MoonPhase;
(function (MoonPhase) {
    MoonPhase["FULL_MOON"] = "FULL_MOON";
    MoonPhase["WANING_GIBBOUS"] = "WANING_GIBBOUS";
    MoonPhase["THIRD_QUARTER"] = "THIRD_QUARTER";
    MoonPhase["WANING_CRESCENT"] = "WANING_CRESCENT";
    MoonPhase["NEW_MOON"] = "NEW_MOON";
    MoonPhase["WAXING_CRESCENT"] = "WAXING_CRESCENT";
    MoonPhase["FIRST_QUARTER"] = "FIRST_QUARTER";
    MoonPhase["WAXING_GIBBOUS"] = "WAXING_GIBBOUS";
})(MoonPhase || (MoonPhase = {}));
var Stat;
(function (Stat) {
    Stat["attack"] = "attack";
    Stat["defence"] = "defence";
    Stat["special_attack"] = "special_attack";
    Stat["special_defence"] = "special_defence";
    Stat["hp"] = "hp";
    Stat["speed"] = "speed";
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
    static deserialize(data) {
        if (!data || typeof data !== "object") {
            throw new Error(`Invalid EvolutionCondition: ${JSON.stringify(data)}`);
        }
        const type = data.type;
        // convert [{key, value}] -> { key: value }
        const values = {};
        if (Array.isArray(data.values)) {
            for (const entry of data.values) {
                if (!entry || typeof entry !== "object")
                    continue;
                values[entry.key] = entry.value;
            }
        }
        // normalize common nested types
        const get = (k) => values[k];
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
                return new HasMoveCondition(nodes_1.MoveIdentifier.deserialize(get("move")));
            case EvolutionConditionType.HAS_MOVE_TYPE:
                return new HasMoveTypeCondition(get("type"));
            case EvolutionConditionType.HELD_ITEM:
                return new HeldItemCondition(resourceLocation_1.ResourceLocation.deserialize(get("itemCondition")));
            case EvolutionConditionType.FRIENDSHIP:
                return new FriendshipCondition(get("amount"));
            case EvolutionConditionType.FRIENDSHIP_BELOW:
                return new FriendshipBelowCondition(get("amount"));
            case EvolutionConditionType.PROPERTIES:
                return new PropertyCondition(get("target"));
            case EvolutionConditionType.PARTY_MEMBER:
                return new PartyMemberCondition(get("target"), get("contains"));
            case EvolutionConditionType.BIOME:
                return new BiomeCondition(get("biomeCondition")
                    ? resourceLocation_1.ResourceLocation.deserialize(get("biomeCondition"))
                    : undefined, get("biomeAnticondition")
                    ? resourceLocation_1.ResourceLocation.deserialize(get("biomeAnticondition"))
                    : undefined);
            case EvolutionConditionType.STRUCTURE:
                return new StructureCondition(get("structureCondition")
                    ? resourceLocation_1.ResourceLocation.deserialize(get("structureCondition"))
                    : undefined, get("structureAnticondition")
                    ? resourceLocation_1.ResourceLocation.deserialize(get("structureAnticondition"))
                    : undefined);
            case EvolutionConditionType.ADVANCEMENT:
                return new AdvancementCondition(resourceLocation_1.ResourceLocation.deserialize(get("requiredAdvancement")));
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
                return new PropertyRangeCondition(get("feature"), numberRange_1.NumberRange.deserialize(get("amount")));
            case EvolutionConditionType.DEFEAT:
                return new DefeatCondition(get("target"), get("amount"));
            case EvolutionConditionType.DAMAGE_TAKEN:
                return new DamageTakenCondition(get("amount"));
            default:
                throw new Error(`Unsupported EvolutionConditionType: ${type}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZvbHV0aW9uQ29uZGl0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2dyYXZlbG1vbi1keW5hbW9kYi9tb2RlbHMvcHJvcGVydGllcy9ldm9sdXRpb25Db25kaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0VBQStEO0FBQy9ELHVDQUEyQztBQUUzQywrQ0FBMEM7QUFFMUMsSUFBWSxzQkF5Qlg7QUF6QkQsV0FBWSxzQkFBc0I7SUFDOUIseUNBQWUsQ0FBQTtJQUNmLG1EQUF5QixDQUFBO0lBQ3pCLHVEQUE2QixDQUFBO0lBQzdCLG1EQUF5QixDQUFBO0lBQ3pCLCtDQUFxQixDQUFBO0lBQ3JCLGlEQUF1QixDQUFBO0lBQ3ZCLG1EQUF5QixDQUFBO0lBQ3pCLG1EQUF5QixDQUFBO0lBQ3pCLCtEQUFxQyxDQUFBO0lBQ3JDLHVEQUE2QixDQUFBO0lBQzdCLHlDQUFlLENBQUE7SUFDZixpREFBdUIsQ0FBQTtJQUN2QixxREFBMkIsQ0FBQTtJQUMzQiw2Q0FBbUIsQ0FBQTtJQUNuQiw2REFBbUMsQ0FBQTtJQUNuQyx5REFBK0IsQ0FBQTtJQUMvQix1RUFBNkMsQ0FBQTtJQUM3QywyQ0FBaUIsQ0FBQTtJQUNqQiwyQ0FBaUIsQ0FBQTtJQUNqQiwrQ0FBcUIsQ0FBQTtJQUNyQiwyREFBaUMsQ0FBQTtJQUNqQywyQ0FBaUIsQ0FBQTtJQUNqQix1REFBNkIsQ0FBQTtJQUM3QixtREFBeUIsQ0FBQTtBQUM3QixDQUFDLEVBekJXLHNCQUFzQixzQ0FBdEIsc0JBQXNCLFFBeUJqQztBQUVELElBQUssU0FTSjtBQVRELFdBQUssU0FBUztJQUNWLG9DQUF1QixDQUFBO0lBQ3ZCLDhDQUFpQyxDQUFBO0lBQ2pDLDRDQUErQixDQUFBO0lBQy9CLGdEQUFtQyxDQUFBO0lBQ25DLGtDQUFxQixDQUFBO0lBQ3JCLGdEQUFtQyxDQUFBO0lBQ25DLDRDQUErQixDQUFBO0lBQy9CLDhDQUFpQyxDQUFBO0FB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LFlBQVkseUJBQVc7WUFBRSxPQUFPLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0o7QUFURCx3REFTQztBQUVELE1BQWEsZUFBZ0IsU0FBUSxrQkFBMEI7SUFDM0QsWUFBWSxLQUFhO1FBQ3JCLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0NBQ0o7QUFKRCwwQ0FJQztBQUVELE1BQWEsb0JBQXFCLFNBQVEsa0JBQTBCO0lBQ2hFLFlBQVksS0FBYTtRQUNyQixLQUFLLENBQUMsc0JBQXNCLENBQUMsWUFBWSxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztDQUNKO0FBSkQsb0RBSUM7QUFFRCxNQUFhLGdCQUFpQixTQUFRLGtCQUF1QjtJQUN6RCxZQUFZLElBQVksRUFBRSxLQUFhO1FBQ25DLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Q0FDSjtBQUpELDRDQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZXNvdXJjZUxvY2F0aW9ufSBmcm9tIFwiLi4vbWluZWNyYWZ0L3Jlc291cmNlTG9jYXRpb25cIjtcclxuaW1wb3J0IHtNb3ZlSWRlbnRpZmllcn0gZnJvbSBcIi4uLy4uL25vZGVzXCI7XHJcbmltcG9ydCB7VGltZX0gZnJvbSBcIi4vdGltZVwiO1xyXG5pbXBvcnQge051bWJlclJhbmdlfSBmcm9tIFwiLi9udW1iZXJSYW5nZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gRXZvbHV0aW9uQ29uZGl0aW9uVHlwZSB7XHJcbiAgICBMRVZFTCA9IFwiTEVWRUxcIixcclxuICAgIFRJTUVfUkFOR0UgPSBcIlRJTUVfUkFOR0VcIixcclxuICAgIFNUQVRfQ09NUEFSRSA9IFwiU1RBVF9DT01QQVJFXCIsXHJcbiAgICBTVEFUX0VRVUFMID0gXCJTVEFUX0VRVUFMXCIsXHJcbiAgICBIQVNfTU9WRSA9IFwiSEFTX01PVkVcIixcclxuICAgIEhFTERfSVRFTSA9IFwiSEVMRF9JVEVNXCIsXHJcbiAgICBQUk9QRVJUSUVTID0gXCJQUk9QRVJUSUVTXCIsXHJcbiAgICBGUklFTkRTSElQID0gXCJGUklFTkRTSElQXCIsXHJcbiAgICBGUklFTkRTSElQX0JFTE9XID0gXCJGUklFTkRTSElQX0JFTE9XXCIsXHJcbiAgICBQQVJUWV9NRU1CRVIgPSBcIlBBUlRZX01FTUJFUlwiLFxyXG4gICAgQklPTUUgPSBcIkJJT01FXCIsXHJcbiAgICBTVFJVQ1RVUkUgPSBcIlNUUlVDVFVSRVwiLFxyXG4gICAgQURWQU5DRU1FTlQgPSBcIkFEVkFOQ0VNRU5UXCIsXHJcbiAgICBXRUFUSEVSID0gXCJXRUFUSEVSXCIsXHJcbiAgICBCTE9DS1NfVFJBVkVMRUQgPSBcIkJMT0NLU19UUkFWRUxFRFwiLFxyXG4gICAgSEFTX01PVkVfVFlQRSA9IFwiSEFTX01PVkVfVFlQRVwiLFxyXG4gICAgQkFUVExFX0NSSVRJQ0FMX0hJVFMgPSBcIkJBVFRMRV9DUklUSUNBTF9ISVRTXCIsXHJcbiAgICBDSEFOQ0UgPSBcIkNIQU5DRVwiLFxyXG4gICAgUkVDT0lMID0gXCJSRUNPSUxcIixcclxuICAgIFVTRV9NT1ZFID0gXCJVU0VfTU9WRVwiLFxyXG4gICAgUFJPUEVSVFlfUkFOR0UgPSBcIlBST1BFUlRZX1JBTkdFXCIsXHJcbiAgICBERUZFQVQgPSBcIkRFRkVBVFwiLFxyXG4gICAgREFNQUdFX1RBS0VOID0gXCJEQU1BR0VfVEFLRU5cIixcclxuICAgIE1PT05fUEhBU0UgPSBcIk1PT05fUEhBU0VcIixcclxufVxyXG5cclxuZW51bSBNb29uUGhhc2Uge1xyXG4gICAgRlVMTF9NT09OID0gXCJGVUxMX01PT05cIixcclxuICAgIFdBTklOR19HSUJCT1VTID0gXCJXQU5JTkdfR0lCQk9VU1wiLFxyXG4gICAgVEhJUkRfUVVBUlRFUiA9IFwiVEhJUkRfUVVBUlRFUlwiLFxyXG4gICAgV0FOSU5HX0NSRVNDRU5UID0gXCJXQU5JTkdfQ1JFU0NFTlRcIixcclxuICAgIE5FV19NT09OID0gXCJORVdfTU9PTlwiLFxyXG4gICAgV0FYSU5HX0NSRVNDRU5UID0gXCJXQVhJTkdfQ1JFU0NFTlRcIixcclxuICAgIEZJUlNUX1FVQVJURVIgPSBcIkZJUlNUX1FVQVJURVJcIixcclxuICAgIFdBWElOR19HSUJCT1VTID0gXCJXQVhJTkdfR0lCQk9VU1wiXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFN0YXQge1xyXG4gICAgYXR0YWNrID0gXCJhdHRhY2tcIixcclxuICAgIGRlZmVuY2UgPSBcImRlZmVuY2VcIixcclxuICAgIHNwZWNpYWxfYXR0YWNrID0gXCJzcGVjaWFsX2F0dGFja1wiLFxyXG4gICAgc3BlY2lhbF9kZWZlbmNlID0gXCJzcGVjaWFsX2RlZmVuY2VcIixcclxuICAgIGhwID0gXCJocFwiLFxyXG4gICAgc3BlZWQgPSBcInNwZWVkXCJcclxufVxyXG5cclxuZXhwb3J0IGVudW0gR2VuZGVyIHtcclxuICAgIE1BTEUgPSBcIm1hbGVcIixcclxuICAgIEZFTUFMRSA9IFwiZmVtYWxlXCJcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV2b2x1dGlvbkNvbmRpdGlvbjxUPiB7XHJcbiAgICBjb25kaXRpb25zOiBSZWNvcmQ8c3RyaW5nLCBUPjtcclxuICAgIHR5cGU6IEV2b2x1dGlvbkNvbmRpdGlvblR5cGU7XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHR5cGU6IEV2b2x1dGlvbkNvbmRpdGlvblR5cGUsIGNvbmRpdGlvbjogUmVjb3JkPHN0cmluZywgVD4pIHtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMuY29uZGl0aW9ucyA9IGNvbmRpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXJpYWxpemUoKTogUmVjb3JkPHN0cmluZywgYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogdGhpcy50eXBlLFxyXG4gICAgICAgICAgICB2YWx1ZXM6IE9iamVjdC5lbnRyaWVzKHRoaXMuY29uZGl0aW9ucykubWFwKChbLCB2YWx1ZV0pID0+IHRoaXMuc2VyaWFsaXplVmFsdWUodmFsdWUpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXJpYWxpemVWYWx1ZSh2YWx1ZTogVCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkZXNlcmlhbGl6ZShkYXRhOiBhbnkpOiBFdm9sdXRpb25Db25kaXRpb248YW55PiB7XHJcbiAgICAgICAgaWYgKCFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBFdm9sdXRpb25Db25kaXRpb246ICR7SlNPTi5zdHJpbmdpZnkoZGF0YSl9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0eXBlOiBFdm9sdXRpb25Db25kaXRpb25UeXBlID0gZGF0YS50eXBlO1xyXG5cclxuICAgICAgICAvLyBjb252ZXJ0IFt7a2V5LCB2YWx1ZX1dIC0+IHsga2V5OiB2YWx1ZSB9XHJcbiAgICAgICAgY29uc3QgdmFsdWVzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEudmFsdWVzKSkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGRhdGEudmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVudHJ5IHx8IHR5cGVvZiBlbnRyeSAhPT0gXCJvYmplY3RcIikgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZXNbZW50cnkua2V5XSA9IGVudHJ5LnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBub3JtYWxpemUgY29tbW9uIG5lc3RlZCB0eXBlc1xyXG4gICAgICAgIGNvbnN0IGdldCA9IChrOiBzdHJpbmcpID0+IHZhbHVlc1trXTtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5MRVZFTDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTGV2ZWxDb25kaXRpb24oZ2V0KFwibWluTGV2ZWxcIikpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBFdm9sdXRpb25Db25kaXRpb25UeXBlLlRJTUVfUkFOR0U6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVDb25kaXRpb24oZ2V0KFwicmFuZ2VcIikpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBFdm9sdXRpb25Db25kaXRpb25UeXBlLk1PT05fUEhBU0U6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE1vb25QaGFzZUNvbmRpdGlvbihnZXQoXCJtb29uUGhhc2VcIikpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBFdm9sdXRpb25Db25kaXRpb25UeXBlLlNUQVRfQ09NUEFSRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU3RhdENvbXBhcmVDb25kaXRpb24oZ2V0KFwiaGlnaFN0YXRcIiksIGdldChcImxvd1N0YXRcIikpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBFdm9sdXRpb25Db25kaXRpb25UeXBlLlNUQVRfRVFVQUw6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFN0YXRFcXVhbENvbmRpdGlvbihnZXQoXCJzdGF0T25lXCIpLCBnZXQoXCJzdGF0VHdvXCIpKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5IQVNfTU9WRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSGFzTW92ZUNvbmRpdGlvbihNb3ZlSWRlbnRpZmllci5kZXNlcmlhbGl6ZShnZXQoXCJtb3ZlXCIpKSk7XHJcblxyXG4gICAgICAgICAgICBjYXNlIEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuSEFTX01PVkVfVFlQRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSGFzTW92ZVR5cGVDb25kaXRpb24oZ2V0KFwidHlwZVwiKSk7XHJcblxyXG4gICAgICAgICAgICBjYXNlIEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuSEVMRF9JVEVNOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIZWxkSXRlbUNvbmRpdGlvbihSZXNvdXJjZUxvY2F0aW9uLmRlc2VyaWFsaXplKGdldChcIml0ZW1Db25kaXRpb25cIikpKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5GUklFTkRTSElQOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGcmllbmRzaGlwQ29uZGl0aW9uKGdldChcImFtb3VudFwiKSk7XHJcblxyXG4gICAgICAgICAgICBjYXNlIEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuRlJJRU5EU0hJUF9CRUxPVzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRnJpZW5kc2hpcEJlbG93Q29uZGl0aW9uKGdldChcImFtb3VudFwiKSk7XHJcblxyXG4gICAgICAgICAgICBjYXNlIEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuUFJPUEVSVElFUzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcGVydHlDb25kaXRpb24oZ2V0KFwidGFyZ2V0XCIpKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5QQVJUWV9NRU1CRVI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFBhcnR5TWVtYmVyQ29uZGl0aW9uKGdldChcInRhcmdldFwiKSwgZ2V0KFwiY29udGFpbnNcIikpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBFdm9sdXRpb25Db25kaXRpb25UeXBlLkJJT01FOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCaW9tZUNvbmRpdGlvbihcclxuICAgICAgICAgICAgICAgICAgICBnZXQoXCJiaW9tZUNvbmRpdGlvblwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFJlc291cmNlTG9jYXRpb24uZGVzZXJpYWxpemUoZ2V0KFwiYmlvbWVDb25kaXRpb25cIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGdldChcImJpb21lQW50aWNvbmRpdGlvblwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFJlc291cmNlTG9jYXRpb24uZGVzZXJpYWxpemUoZ2V0KFwiYmlvbWVBbnRpY29uZGl0aW9uXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5TVFJVQ1RVUkU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFN0cnVjdHVyZUNvbmRpdGlvbihcclxuICAgICAgICAgICAgICAgICAgICBnZXQoXCJzdHJ1Y3R1cmVDb25kaXRpb25cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBSZXNvdXJjZUxvY2F0aW9uLmRlc2VyaWFsaXplKGdldChcInN0cnVjdHVyZUNvbmRpdGlvblwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0KFwic3RydWN0dXJlQW50aWNvbmRpdGlvblwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFJlc291cmNlTG9jYXRpb24uZGVzZXJpYWxpemUoZ2V0KFwic3RydWN0dXJlQW50aWNvbmRpdGlvblwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjYXNlIEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuQURWQU5DRU1FTlQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFkdmFuY2VtZW50Q29uZGl0aW9uKFJlc291cmNlTG9jYXRpb24uZGVzZXJpYWxpemUoZ2V0KFwicmVxdWlyZWRBZHZhbmNlbWVudFwiKSkpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBFdm9sdXRpb25Db25kaXRpb25UeXBlLldFQVRIRVI6IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdlYXRoZXIgPSB2YWx1ZXM7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gd2VhdGhlci5pc1JhaW5pbmdcclxuICAgICAgICAgICAgICAgICAgICA/IG5ldyBSYWluaW5nQ29uZGl0aW9uKHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBuZXcgVGh1bmRlckNvbmRpdGlvbih3ZWF0aGVyLmlzVGh1bmRlcmluZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhc2UgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5CTE9DS1NfVFJBVkVMRUQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJsb2Nrc1RyYXZlbGVkQ29uZGl0aW9uKGdldChcImFtb3VudFwiKSk7XHJcblxyXG4gICAgICAgICAgICBjYXNlIEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuQkFUVExFX0NSSVRJQ0FMX0hJVFM6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJhdHRsZUNyaXRpY2FsSGl0c0NvbmRpdGlvbihnZXQoXCJhbW91bnRcIikpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBFdm9sdXRpb25Db25kaXRpb25UeXBlLkNIQU5DRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ2hhbmNlQ29uZGl0aW9uKGdldChcImNoYW5jZVwiKSk7XHJcblxyXG4gICAgICAgICAgICBjYXNlIEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuUkVDT0lMOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWNvaWxDb25kaXRpb24oZ2V0KFwiYW1vdW50XCIpKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5VU0VfTU9WRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVXNlTW92ZUNvbmRpdGlvbihnZXQoXCJtb3ZlXCIpLCBnZXQoXCJhbW91bnRcIikpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBFdm9sdXRpb25Db25kaXRpb25UeXBlLlBST1BFUlRZX1JBTkdFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eVJhbmdlQ29uZGl0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgIGdldChcImZlYXR1cmVcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgTnVtYmVyUmFuZ2UuZGVzZXJpYWxpemUoZ2V0KFwiYW1vdW50XCIpKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5ERUZFQVQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERlZmVhdENvbmRpdGlvbihnZXQoXCJ0YXJnZXRcIiksIGdldChcImFtb3VudFwiKSk7XHJcblxyXG4gICAgICAgICAgICBjYXNlIEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuREFNQUdFX1RBS0VOOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYW1hZ2VUYWtlbkNvbmRpdGlvbihnZXQoXCJhbW91bnRcIikpO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgRXZvbHV0aW9uQ29uZGl0aW9uVHlwZTogJHt0eXBlfWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExldmVsQ29uZGl0aW9uIGV4dGVuZHMgRXZvbHV0aW9uQ29uZGl0aW9uPG51bWJlcj4ge1xyXG4gICAgY29uc3RydWN0b3IodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuTEVWRUwsIHttaW5MZXZlbDogdmFsdWV9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRpbWVDb25kaXRpb24gZXh0ZW5kcyBFdm9sdXRpb25Db25kaXRpb248VGltZT4ge1xyXG4gICAgY29uc3RydWN0b3IodmFsdWU6IFRpbWUpIHtcclxuICAgICAgICBzdXBlcihFdm9sdXRpb25Db25kaXRpb25UeXBlLlRJTUVfUkFOR0UsIHtyYW5nZTogdmFsdWV9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vb25QaGFzZUNvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxNb29uUGhhc2U+IHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBNb29uUGhhc2UpIHtcclxuICAgICAgICBzdXBlcihFdm9sdXRpb25Db25kaXRpb25UeXBlLk1PT05fUEhBU0UsIHttb29uUGhhc2U6IHZhbHVlfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGF0Q29tcGFyZUNvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxTdGF0PiB7XHJcbiAgICBjb25zdHJ1Y3RvcihoaWdoU3RhdDogU3RhdCwgbG93U3RhdDogU3RhdCkge1xyXG4gICAgICAgIHN1cGVyKEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuU1RBVF9DT01QQVJFLCB7XHJcbiAgICAgICAgICAgIGhpZ2hTdGF0OiBoaWdoU3RhdCxcclxuICAgICAgICAgICAgbG93U3RhdDogbG93U3RhdCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXRFcXVhbENvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxTdGF0PiB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdGF0T25lOiBTdGF0LCBzdGF0VHdvOiBTdGF0KSB7XHJcbiAgICAgICAgc3VwZXIoRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5TVEFUX0VRVUFMLCB7XHJcbiAgICAgICAgICAgIHN0YXRPbmU6IHN0YXRPbmUsXHJcbiAgICAgICAgICAgIHN0YXRUd286IHN0YXRUd28sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIYXNNb3ZlQ29uZGl0aW9uIGV4dGVuZHMgRXZvbHV0aW9uQ29uZGl0aW9uPE1vdmVJZGVudGlmaWVyPiB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogTW92ZUlkZW50aWZpZXIpIHtcclxuICAgICAgICBzdXBlcihFdm9sdXRpb25Db25kaXRpb25UeXBlLkhBU19NT1ZFLCB7bW92ZTogdmFsdWV9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXJpYWxpemVWYWx1ZSh2YWx1ZTogTW92ZUlkZW50aWZpZXIpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS5zZXJpYWxpemUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhhc01vdmVUeXBlQ29uZGl0aW9uIGV4dGVuZHMgRXZvbHV0aW9uQ29uZGl0aW9uPHN0cmluZz4ge1xyXG4gICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5IQVNfTU9WRV9UWVBFLCB7dHlwZTogdHlwZX0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGVsZEl0ZW1Db25kaXRpb24gZXh0ZW5kcyBFdm9sdXRpb25Db25kaXRpb248UmVzb3VyY2VMb2NhdGlvbj4ge1xyXG4gICAgY29uc3RydWN0b3IodmFsdWU6IFJlc291cmNlTG9jYXRpb24pIHtcclxuICAgICAgICBzdXBlcihFdm9sdXRpb25Db25kaXRpb25UeXBlLkhFTERfSVRFTSwge2l0ZW1Db25kaXRpb246IHZhbHVlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VyaWFsaXplVmFsdWUodmFsdWU6IFJlc291cmNlTG9jYXRpb24pOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS5zZXJpYWxpemUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFByb3BlcnR5Q29uZGl0aW9uIGV4dGVuZHMgRXZvbHV0aW9uQ29uZGl0aW9uPHN0cmluZz4ge1xyXG4gICAgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuUFJPUEVSVElFUywge3RhcmdldDogdmFsdWV9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZyaWVuZHNoaXBDb25kaXRpb24gZXh0ZW5kcyBFdm9sdXRpb25Db25kaXRpb248bnVtYmVyPiB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5GUklFTkRTSElQLCB7YW1vdW50OiB2YWx1ZX0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRnJpZW5kc2hpcEJlbG93Q29uZGl0aW9uIGV4dGVuZHMgRXZvbHV0aW9uQ29uZGl0aW9uPG51bWJlcj4ge1xyXG4gICAgY29uc3RydWN0b3IodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuRlJJRU5EU0hJUF9CRUxPVywge2Ftb3VudDogdmFsdWV9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhcnR5TWVtYmVyQ29uZGl0aW9uIGV4dGVuZHMgRXZvbHV0aW9uQ29uZGl0aW9uPGFueT4ge1xyXG4gICAgY29uc3RydWN0b3IoY29uZGl0aW9uOiBzdHJpbmcsIGNvbnRhaW5zOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIHN1cGVyKEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuUEFSVFlfTUVNQkVSLCB7XHJcbiAgICAgICAgICAgIHRhcmdldDogY29uZGl0aW9uLFxyXG4gICAgICAgICAgICBjb250YWluczogY29udGFpbnNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJpb21lQ29uZGl0aW9uIGV4dGVuZHMgRXZvbHV0aW9uQ29uZGl0aW9uPFJlc291cmNlTG9jYXRpb24gfCB1bmRlZmluZWQ+IHtcclxuICAgIGNvbnN0cnVjdG9yKGJpb21lQ29uZGl0aW9uPzogUmVzb3VyY2VMb2NhdGlvbiwgYmlvbWVBbnRpY29uZGl0aW9uPzogUmVzb3VyY2VMb2NhdGlvbikge1xyXG4gICAgICAgIHN1cGVyKEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuQklPTUUsIHtiaW9tZUNvbmRpdGlvbjogYmlvbWVDb25kaXRpb24sIGJpb21lQW50aWNvbmRpdGlvbjogYmlvbWVBbnRpY29uZGl0aW9ufSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlcmlhbGl6ZVZhbHVlKHZhbHVlOiBSZXNvdXJjZUxvY2F0aW9uKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdmFsdWUuc2VyaWFsaXplKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdHJ1Y3R1cmVDb25kaXRpb24gZXh0ZW5kcyBFdm9sdXRpb25Db25kaXRpb248UmVzb3VyY2VMb2NhdGlvbiB8IHVuZGVmaW5lZD4ge1xyXG4gICAgY29uc3RydWN0b3Ioc3RydWN0dXJlQ29uZGl0aW9uPzogUmVzb3VyY2VMb2NhdGlvbiwgc3RydWN0dXJlQW50aWNvbmRpdGlvbj86IFJlc291cmNlTG9jYXRpb24pIHtcclxuICAgICAgICBzdXBlcihFdm9sdXRpb25Db25kaXRpb25UeXBlLlNUUlVDVFVSRSwge3N0cnVjdHVyZUNvbmRpdGlvbjogc3RydWN0dXJlQ29uZGl0aW9uLCBzdHJ1Y3R1cmVBbnRpY29uZGl0aW9uOiBzdHJ1Y3R1cmVBbnRpY29uZGl0aW9ufSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlcmlhbGl6ZVZhbHVlKHZhbHVlOiBSZXNvdXJjZUxvY2F0aW9uKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdmFsdWUuc2VyaWFsaXplKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBZHZhbmNlbWVudENvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxSZXNvdXJjZUxvY2F0aW9uIHwgdW5kZWZpbmVkPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZXF1aXJlZEFkdmFuY2VtZW50OiBSZXNvdXJjZUxvY2F0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5BRFZBTkNFTUVOVCwge3JlcXVpcmVkQWR2YW5jZW1lbnQ6IHJlcXVpcmVkQWR2YW5jZW1lbnR9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VyaWFsaXplVmFsdWUodmFsdWU6IFJlc291cmNlTG9jYXRpb24pOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS5zZXJpYWxpemUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJhaW5pbmdDb25kaXRpb24gZXh0ZW5kcyBFdm9sdXRpb25Db25kaXRpb248Ym9vbGVhbj4ge1xyXG4gICAgY29uc3RydWN0b3IodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlcihFdm9sdXRpb25Db25kaXRpb25UeXBlLldFQVRIRVIsIHtpc1JhaW5pbmc6IHZhbHVlfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUaHVuZGVyQ29uZGl0aW9uIGV4dGVuZHMgRXZvbHV0aW9uQ29uZGl0aW9uPGJvb2xlYW4+IHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgc3VwZXIoRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5XRUFUSEVSLCB7aXNUaHVuZGVyaW5nOiB2YWx1ZX0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmxvY2tzVHJhdmVsZWRDb25kaXRpb24gZXh0ZW5kcyBFdm9sdXRpb25Db25kaXRpb248bnVtYmVyPiB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5CTE9DS1NfVFJBVkVMRUQsIHthbW91bnQ6IHZhbHVlfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXR0bGVDcml0aWNhbEhpdHNDb25kaXRpb24gZXh0ZW5kcyBFdm9sdXRpb25Db25kaXRpb248bnVtYmVyPiB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5CQVRUTEVfQ1JJVElDQUxfSElUUywge2Ftb3VudDogdmFsdWV9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENoYW5jZUNvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxudW1iZXI+IHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihFdm9sdXRpb25Db25kaXRpb25UeXBlLkNIQU5DRSwge2NoYW5jZTogdmFsdWV9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERlZmVhdENvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxhbnk+IHtcclxuICAgIGNvbnN0cnVjdG9yKHRhcmdldDogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5ERUZFQVQsIHt0YXJnZXQ6IHRhcmdldCwgYW1vdW50OiB2YWx1ZX0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJvcGVydHlSYW5nZUNvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxhbnk+IHtcclxuICAgIGNvbnN0cnVjdG9yKGZlYXR1cmU6IHN0cmluZywgdmFsdWU6IE51bWJlclJhbmdlKSB7XHJcbiAgICAgICAgc3VwZXIoRXZvbHV0aW9uQ29uZGl0aW9uVHlwZS5QUk9QRVJUWV9SQU5HRSwge2ZlYXR1cmU6IGZlYXR1cmUsIGFtb3VudDogdmFsdWV9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VyaWFsaXplVmFsdWUodmFsdWU6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYodmFsdWUgaW5zdGFuY2VvZiBOdW1iZXJSYW5nZSkgcmV0dXJuIHZhbHVlLnNlcmlhbGl6ZSgpO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlY29pbENvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxudW1iZXI+IHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihFdm9sdXRpb25Db25kaXRpb25UeXBlLlJFQ09JTCwge2Ftb3VudDogdmFsdWV9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhbWFnZVRha2VuQ29uZGl0aW9uIGV4dGVuZHMgRXZvbHV0aW9uQ29uZGl0aW9uPG51bWJlcj4ge1xyXG4gICAgY29uc3RydWN0b3IodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuREFNQUdFX1RBS0VOLCB7YW1vdW50OiB2YWx1ZX0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVXNlTW92ZUNvbmRpdGlvbiBleHRlbmRzIEV2b2x1dGlvbkNvbmRpdGlvbjxhbnk+IHtcclxuICAgIGNvbnN0cnVjdG9yKG1vdmU6IHN0cmluZywgdmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKEV2b2x1dGlvbkNvbmRpdGlvblR5cGUuVVNFX01PVkUsIHttb3ZlOiBtb3ZlLCBhbW91bnQ6IHZhbHVlfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXX0=