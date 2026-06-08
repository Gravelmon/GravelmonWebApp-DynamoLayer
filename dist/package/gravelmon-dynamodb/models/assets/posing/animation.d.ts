import { ExpressionNode } from "./ConditionTree";
import { PoseType } from "./poseType";
import { MoveIdentifier } from "../../../nodes";
import { NumberRange } from "../../properties";
export declare function serializeAnimation(anim: Animation): any;
export type AnyAnimation = Animation | LookAnimation | NamedAnimation | QuirkAnimation;
export declare function deserializeAnimation(data: any): AnyAnimation;
export declare enum NamedAnimationTypes {
    Cry = "cry",
    Recoil = "recoil",
    Status = "status",
    Special = "special",
    Physical = "Physical",
    Faint = "faint",
    AirSpecial = "air_special",
    AirPhysical = "air_physical",
    AirStatus = "air_status"
}
export declare enum RidingStyle {
    LAND = 0,
    LIQUID = 1,
    AIR = 2
}
export interface PrimarySettings {
    curve: "one" | "symmetric" | "symmetrical_wide";
    excludedLabels?: string[];
}
export declare enum AnimationTypes {
    Look = 0,
    Named = 1,
    Quirk = 2,
    Animation = 3
}
export interface Animation {
    type: AnimationTypes;
    animationSource: string;
    animationOverwriteString?: string;
    animation: string[];
    conditionExpression?: ExpressionNode;
}
export interface LookAnimation extends Animation {
    pitchMultiplier?: number;
    yawMultiplier?: number;
    pitchRange?: NumberRange;
    yawRange?: NumberRange;
}
export interface NamedAnimation extends Animation {
    name: NamedAnimationTypes | MoveIdentifier | PoseType | string;
    primarySettings?: PrimarySettings;
}
export interface QuirkAnimation extends Animation {
    loopTimes?: number;
    occurrenceRange?: NumberRange;
    primarySettings?: PrimarySettings;
}
