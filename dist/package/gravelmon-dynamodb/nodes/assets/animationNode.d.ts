import { PoseType } from "../../models";
import { DynamoNode } from "../../service";
import { PokemonIdentifier } from "../pokemon/pokemonNode";
import { NamedAnimationTypes } from "../../models";
export declare const AnimationEntity = "Animation";
export type PrimaryPoseType = PoseType | NamedAnimationTypes;
export declare class AnimationNode extends DynamoNode {
    primaryPoseType?: PrimaryPoseType;
    users: PokemonIdentifier[];
    constructor(name: string, users: PokemonIdentifier[], primaryPoseType?: PrimaryPoseType);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): AnimationNode;
}
