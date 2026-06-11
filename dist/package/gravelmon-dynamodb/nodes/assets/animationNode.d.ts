import { PoseType } from "../../models";
import { DynamoNode } from "../../service";
import { NamedAnimationTypes } from "../../models";
export declare const AnimationEntity = "Animation";
export type PrimaryPoseType = PoseType | NamedAnimationTypes;
export declare class AnimationNode extends DynamoNode {
    constructor(name: string);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): AnimationNode;
}
