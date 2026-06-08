import { PokemonIdentifier } from "../../../nodes";
import { Vector } from "../../properties";
import { Animation, NamedAnimation, QuirkAnimation, RidingStyle } from "./Animation";
import { ExpressionNode } from "./ConditionTree";
import { PoseType } from "./poseType";
export interface TransformedPart {
    isVisible?: boolean;
    rotation?: Vector;
    position?: Vector;
    part: string;
}
export interface CameraOffset {
    firstPersonCameraOffset: Vector;
    thirdPersonCameraOffset: Vector;
    thirdPersonCameraOffsetNoViewBobbing: Vector;
    seatName: string;
}
export interface PosingFileOptions {
    profileScale: number;
    profileCoords: Vector;
    portraitScale: number;
    portraitCoords: Vector;
    headBone?: string;
    rootBone: string;
    cameraOffsets?: CameraOffset[];
    poseAnimations: Pose[];
    globalAnimations?: NamedAnimation[];
    overridesPosingData?: PokemonIdentifier;
}
export interface PosingData {
    posingFileOptions: PosingFileOptions;
}
export interface Pose {
    name: string;
    isBattle?: boolean;
    isTouchingWater?: boolean;
    isUnderWater?: boolean;
    isInWaterOrRain?: boolean;
    isStandingOnRedSand?: boolean;
    isStandingOnSand?: boolean;
    isStandingOnSandOrRedSand?: boolean;
    isDusk?: boolean;
    isWild?: boolean;
    isRideStyle?: RidingStyle[];
    conditionExpression?: ExpressionNode;
    allPoseTypes?: boolean;
    pose: PoseType;
    transformedParts?: TransformedPart[];
    quirks?: QuirkAnimation[];
    namedAnimations?: NamedAnimation[];
    animations: Animation[];
    transformTicks?: number;
    transformToTicks?: number;
    transitions?: NamedAnimation[];
}
export declare function serializePosingData(data: PosingData): Record<string, any>;
export declare function deserializePosingData(data: any): PosingData;
