import { ResourceLocation } from "../minecraft/resourceLocation";
import { PokemonIdentifier } from "../../nodes/pokemon/pokemonNode";
import { MoveIdentifier } from "../../nodes";
import { Time } from "./time";
export declare enum EvolutionConditionType {
    LEVEL = 0,
    TIME = 1,
    RATIO = 2,
    HAS_MOVE = 3,
    HELD_ITEM = 4,
    PROPERTY = 5,
    GENDER = 6,
    FRIENDSHIP = 7,
    PARTY_MEMBER = 8,
    PARTY_MEMBER_OF_TYPE = 9,
    BIOME = 10,
    WEATHER = 11,
    BLOCKS_TRAVELED = 12
}
export declare enum StatRatio {
    DEFENCE_HIGHER = 0,
    ATTACK_HIGHER = 1,
    EQUAL = 2
}
export declare enum Gender {
    MALE = "male",
    FEMALE = "female"
}
export declare abstract class EvolutionCondition {
    name: string;
    condition: string;
    value: string | number | boolean | ResourceLocation | Time | StatRatio | Gender | PokemonIdentifier | MoveIdentifier;
    type: EvolutionConditionType;
    constructor(name: string, type: EvolutionConditionType, condition: string, value: any);
    serialize(): Record<string, any>;
    private serializeValue;
    private static deserializeValue;
    static deserialize(data: any): EvolutionCondition;
}
export declare class LevelCondition extends EvolutionCondition {
    constructor(value: number);
}
export declare class TimeCondition extends EvolutionCondition {
    constructor(value: Time);
}
export declare class RatioCondition extends EvolutionCondition {
    constructor(value: StatRatio);
}
export declare class HasMoveCondition extends EvolutionCondition {
    constructor(value: MoveIdentifier);
}
export declare class HeldItemCondition extends EvolutionCondition {
    constructor(value: ResourceLocation);
    serialize(): Record<string, any>;
}
export declare abstract class PropertyCondition extends EvolutionCondition {
    property: string;
    constructor(evolutionConditionType: EvolutionConditionType, property: string, value: any);
    serialize(): Record<string, any>;
}
export declare class GenderCondition extends PropertyCondition {
    constructor(value: Gender);
}
export declare class FriendshipCondition extends EvolutionCondition {
    constructor(value: number);
}
export declare abstract class PartyMemberCondition extends EvolutionCondition {
    property: string;
    constructor(evolutionConditionType: EvolutionConditionType, property: string, value: any);
}
export declare class PartyMemberPokemonCondition extends PartyMemberCondition {
    constructor(value: PokemonIdentifier);
}
export declare class PartyMemberTypeCondition extends PartyMemberCondition {
    constructor(value: string);
}
export declare class BiomeCondition extends EvolutionCondition {
    constructor(value: ResourceLocation);
}
export declare class RainingCondition extends EvolutionCondition {
    constructor(value: boolean);
}
export declare class ThunderCondition extends EvolutionCondition {
    constructor(value: boolean);
}
export declare class BlocksTraveledCondition extends EvolutionCondition {
    constructor(value: number);
}
