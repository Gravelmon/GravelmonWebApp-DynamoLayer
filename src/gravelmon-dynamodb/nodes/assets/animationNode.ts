import { PoseType } from "../../models";
import { deserializerRegistry } from "../../service";
import { DynamoNode } from "../../service";
// import { PokemonIdentifier } from "../pokemon/pokemonNode";
import {NamedAnimationTypes} from "../../models";

export const AnimationEntity = "Animation";

//animations can be coupled with states or poses for generating a generic poser for the user
export type PrimaryPoseType = PoseType | NamedAnimationTypes

//this is a node representation of the "ground_walk", "sleep" ect that is used in selecting the animation from
//the animation file
export class AnimationNode extends DynamoNode {
    // primaryPoseType?: PrimaryPoseType;//the pose type its associated with. Some animations won't have this
    // users: PokemonIdentifier[] = [];
    constructor(name: string/*, users: PokemonIdentifier[], primaryPoseType?: PrimaryPoseType*/) {
        super(AnimationEntity, "animations");
        // this.primaryPoseType = primaryPoseType;
        this.SK = "Animation#" + name + "";
        this.name = name;
        // this.users = users;
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            // primaryPoseType: this.primaryPoseType,
            // users: this.users.map(m => m.serialize())
        }
    }

    static deserialize(data: Record<string, any>): AnimationNode {
        // let users = data.users ? data.users.map((m : any) => PokemonIdentifier.deserialize(m)) : [];
        return new AnimationNode(data.name/*, users, data.primaryPoseType*/);
    }
}

deserializerRegistry.register(AnimationEntity, AnimationNode.deserialize);