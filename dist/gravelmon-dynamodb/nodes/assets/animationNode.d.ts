import { PoseType } from "../../models/assets/posing/poseType";
import { ConditionalAnimation } from "../../models/assets/posing/posingFileData";
import { PK, DynamoNode } from "../../service/dynamoNodes";
export declare const AnimationEntity = "Animation";
export type Animation = PK | ConditionalAnimation | string;
export declare function serializeAnimation(animation: Animation): any;
export declare function deserializeAnimation(data: any): Animation;
export type PrimaryPoseType = PoseType | "BattleAnimation" | "Other";
export declare class AnimationNode extends DynamoNode {
    primaryPoseType?: PrimaryPoseType;
    constructor(name: string, primaryPoseType: PrimaryPoseType);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): AnimationNode;
}
export declare function createAnimationNode(name: string, primaryPoseType?: PrimaryPoseType): AnimationNode;
