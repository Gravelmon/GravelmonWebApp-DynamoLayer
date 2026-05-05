"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlocksTraveledCondition = exports.ThunderCondition = exports.RainingCondition = exports.BiomeCondition = exports.PartyMemberTypeCondition = exports.PartyMemberPokemonCondition = exports.PartyMemberCondition = exports.FriendshipCondition = exports.GenderCondition = exports.PropertyCondition = exports.HeldItemCondition = exports.HasMoveCondition = exports.RatioCondition = exports.TimeCondition = exports.LevelCondition = exports.EvolutionCondition = exports.Gender = exports.StatRatio = exports.EvolutionConditionType = void 0;
const resourceLocation_1 = require("../minecraft/resourceLocation");
const pokemonNode_1 = require("../../nodes/pokemon/pokemonNode");
const time_1 = require("./time");
const nodes_1 = require("../../nodes");
var EvolutionConditionType;
(function (EvolutionConditionType) {
    EvolutionConditionType[EvolutionConditionType["LEVEL"] = 0] = "LEVEL";
    EvolutionConditionType[EvolutionConditionType["TIME"] = 1] = "TIME";
    EvolutionConditionType[EvolutionConditionType["RATIO"] = 2] = "RATIO";
    EvolutionConditionType[EvolutionConditionType["HAS_MOVE"] = 3] = "HAS_MOVE";
    EvolutionConditionType[EvolutionConditionType["HELD_ITEM"] = 4] = "HELD_ITEM";
    EvolutionConditionType[EvolutionConditionType["PROPERTY"] = 5] = "PROPERTY";
    EvolutionConditionType[EvolutionConditionType["GENDER"] = 6] = "GENDER";
    EvolutionConditionType[EvolutionConditionType["FRIENDSHIP"] = 7] = "FRIENDSHIP";
    EvolutionConditionType[EvolutionConditionType["PARTY_MEMBER"] = 8] = "PARTY_MEMBER";
    EvolutionConditionType[EvolutionConditionType["PARTY_MEMBER_OF_TYPE"] = 9] = "PARTY_MEMBER_OF_TYPE";
    EvolutionConditionType[EvolutionConditionType["BIOME"] = 10] = "BIOME";
    EvolutionConditionType[EvolutionConditionType["WEATHER"] = 11] = "WEATHER";
    EvolutionConditionType[EvolutionConditionType["BLOCKS_TRAVELED"] = 12] = "BLOCKS_TRAVELED";
})(EvolutionConditionType || (exports.EvolutionConditionType = EvolutionConditionType = {}));
var StatRatio;
(function (StatRatio) {
    StatRatio[StatRatio["DEFENCE_HIGHER"] = 0] = "DEFENCE_HIGHER";
    StatRatio[StatRatio["ATTACK_HIGHER"] = 1] = "ATTACK_HIGHER";
    StatRatio[StatRatio["EQUAL"] = 2] = "EQUAL";
})(StatRatio || (exports.StatRatio = StatRatio = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
})(Gender || (exports.Gender = Gender = {}));
class EvolutionCondition {
    constructor(name, type, condition, value) {
        this.name = name;
        this.type = type;
        this.condition = condition;
        this.value = value;
    }
    serialize() {
        return {
            name: this.name,
            type: this.type,
            condition: this.condition,
            value: this.serializeValue()
        };
    }
    serializeValue() {
        if (this.value instanceof resourceLocation_1.ResourceLocation) {
            return this.value.serialize();
        }
        if (this.value instanceof pokemonNode_1.PokemonIdentifier) {
            return this.value.serialize();
        }
        if (this.value instanceof nodes_1.MoveIdentifier) {
            return this.value.serialize();
        }
        if ((0, time_1.isTimeRange)(this.value)) {
            return (0, time_1.serializeTimeRange)(this.value);
        }
        return this.value;
    }
    static deserializeValue(type, value) {
        if (type === EvolutionConditionType.HELD_ITEM) {
            return resourceLocation_1.ResourceLocation.deserialize(value);
        }
        else if (type === EvolutionConditionType.PARTY_MEMBER) {
            return pokemonNode_1.PokemonIdentifier.deserialize(value);
        }
        else if (type === EvolutionConditionType.TIME) {
            return (0, time_1.deserializeTimeRange)(value);
        }
        return value;
    }
    static deserialize(data) {
        const evolutionConditionData = {
            name: data.name,
            type: data.type,
            condition: data.condition,
            value: this.deserializeValue(data.type, data.value)
        };
        switch (evolutionConditionData.type) {
            case EvolutionConditionType.LEVEL:
                return new LevelCondition(evolutionConditionData.value);
            case EvolutionConditionType.TIME:
                return new TimeCondition(evolutionConditionData.value);
            case EvolutionConditionType.RATIO:
                return new RatioCondition(evolutionConditionData.value);
            case EvolutionConditionType.HAS_MOVE:
                return new HasMoveCondition(nodes_1.MoveIdentifier.deserialize(evolutionConditionData.value));
            case EvolutionConditionType.HELD_ITEM:
                return new HeldItemCondition(resourceLocation_1.ResourceLocation.deserialize(evolutionConditionData.value));
            case EvolutionConditionType.FRIENDSHIP:
                return new FriendshipCondition(evolutionConditionData.value);
            case EvolutionConditionType.GENDER:
                return new GenderCondition(evolutionConditionData.value);
            case EvolutionConditionType.PARTY_MEMBER:
                return new PartyMemberPokemonCondition(pokemonNode_1.PokemonIdentifier.deserialize(evolutionConditionData.value));
            case EvolutionConditionType.PARTY_MEMBER_OF_TYPE:
                return new PartyMemberTypeCondition(evolutionConditionData.value);
            case EvolutionConditionType.BIOME:
                return new BiomeCondition(evolutionConditionData.value);
            case EvolutionConditionType.WEATHER:
                const { isRaining, isThundering } = evolutionConditionData.value;
                return isRaining ? new RainingCondition(true) : new ThunderCondition(isThundering);
            case EvolutionConditionType.BLOCKS_TRAVELED:
                return new BlocksTraveledCondition(evolutionConditionData.value);
            default:
                throw new Error(`Unsupported EvolutionConditionType: ${evolutionConditionData.type}`);
        }
    }
}
exports.EvolutionCondition = EvolutionCondition;
class LevelCondition extends EvolutionCondition {
    constructor(value) {
        super("level", EvolutionConditionType.LEVEL, "minLevel", value);
    }
}
exports.LevelCondition = LevelCondition;
class TimeCondition extends EvolutionCondition {
    constructor(value) {
        super("time_range", EvolutionConditionType.TIME, "range", value);
    }
    serialize() {
        return {
            name: this.name,
            type: this.type,
            condition: this.condition,
            value: (0, time_1.serializeTimeRange)(this.value)
        };
    }
}
exports.TimeCondition = TimeCondition;
class RatioCondition extends EvolutionCondition {
    constructor(value) {
        super("attack_defence_ratio", EvolutionConditionType.RATIO, "ratio", value);
    }
}
exports.RatioCondition = RatioCondition;
class HasMoveCondition extends EvolutionCondition {
    constructor(value) {
        super("has_move", EvolutionConditionType.HAS_MOVE, "move", value);
    }
}
exports.HasMoveCondition = HasMoveCondition;
class HeldItemCondition extends EvolutionCondition {
    constructor(value) {
        super("held_item", EvolutionConditionType.HELD_ITEM, "itemCondition", value);
    }
    serialize() {
        return {
            name: this.name,
            type: this.type,
            condition: this.condition,
            value: this.value instanceof resourceLocation_1.ResourceLocation ? this.value.serialize() : this.value
        };
    }
}
exports.HeldItemCondition = HeldItemCondition;
class PropertyCondition extends EvolutionCondition {
    constructor(evolutionConditionType, property, value) {
        super("properties", evolutionConditionType, "target", value);
        this.property = property;
    }
    serialize() {
        return {
            name: this.name,
            type: this.type,
            property: this.property,
            condition: this.condition,
            value: this.value instanceof resourceLocation_1.ResourceLocation ? this.value.serialize() : this.value
        };
    }
}
exports.PropertyCondition = PropertyCondition;
class GenderCondition extends PropertyCondition {
    constructor(value) {
        super(EvolutionConditionType.GENDER, "gender=", value);
    }
}
exports.GenderCondition = GenderCondition;
class FriendshipCondition extends EvolutionCondition {
    constructor(value) {
        super("friendship", EvolutionConditionType.FRIENDSHIP, "amount", value);
    }
}
exports.FriendshipCondition = FriendshipCondition;
class PartyMemberCondition extends EvolutionCondition {
    constructor(evolutionConditionType, property, value) {
        super("party_member", evolutionConditionType, "target", value);
        this.property = property;
    }
}
exports.PartyMemberCondition = PartyMemberCondition;
class PartyMemberPokemonCondition extends PartyMemberCondition {
    constructor(value) {
        super(EvolutionConditionType.PARTY_MEMBER, "", value);
    }
}
exports.PartyMemberPokemonCondition = PartyMemberPokemonCondition;
class PartyMemberTypeCondition extends PartyMemberCondition {
    constructor(value) {
        super(EvolutionConditionType.PARTY_MEMBER_OF_TYPE, "type=", value);
    }
}
exports.PartyMemberTypeCondition = PartyMemberTypeCondition;
class BiomeCondition extends EvolutionCondition {
    constructor(value) {
        super("biome", EvolutionConditionType.BIOME, "biomeCondition", value);
    }
}
exports.BiomeCondition = BiomeCondition;
class RainingCondition extends EvolutionCondition {
    constructor(value) {
        super("weather", EvolutionConditionType.WEATHER, "isRaining", value);
    }
}
exports.RainingCondition = RainingCondition;
class ThunderCondition extends EvolutionCondition {
    constructor(value) {
        super("weather", EvolutionConditionType.WEATHER, "isThundering", value);
    }
}
exports.ThunderCondition = ThunderCondition;
class BlocksTraveledCondition extends EvolutionCondition {
    constructor(value) {
        super("blocks_traveled", EvolutionConditionType.BLOCKS_TRAVELED, "amount", value);
    }
}
exports.BlocksTraveledCondition = BlocksTraveledCondition;
