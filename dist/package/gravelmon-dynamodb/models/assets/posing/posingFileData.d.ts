import { SK } from '../../../service/dynamoNodes';
import { PokemonIdentifier } from "../../../nodes/pokemon/pokemonNode";
import { Vector } from "../../properties/vector";
import { PoseType } from "./poseType";
import { NumberRange } from "../../properties/numberRange";
import { Animation } from '../../../nodes/assets/animationNode';
export declare const PosingDataEntity = "PosingData";
export declare const PosingForSpeciesFeatureEdgeType = "PosingForSpeciesFeature";
export declare const PosingForFormEdgeType = "PosingForForm";
export declare const OverridesPosingDataEdgeType = "Overrides";
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
export interface NamedAnimation {
    animationExpression: string;
    name: NamedAnimationTypes;
    animation: SK;
}
export interface ConditionalAnimation {
    conditionExpression: string;
    name: NamedAnimationTypes;
    animation: SK;
}
export interface TransformedPart {
    isVisible?: boolean;
    rotation?: Vector;
    position?: Vector;
    part: string;
}
export interface Quirk {
    loopTimes?: number;
    occurrenceRange: NumberRange;
    curveExpression: string;
    animation: SK;
    isPrimary?: boolean;
}
export interface PoseAnimation {
    name: string;
    isBattle?: boolean;
    isTouchingWater?: boolean;
    isUnderWater?: boolean;
    conditionExpression?: string;
    allPoseTypes?: boolean;
    pose: PoseType;
    transformedParts?: TransformedPart[];
    quirks?: Quirk[];
    namedAnimations?: NamedAnimation[];
    animations: Animation[];
    transformTicks?: number;
    transformToTicks?: number;
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
    poseAnimations: PoseAnimation[];
    globalAnimations?: NamedAnimation[];
    overridesPosingData?: PokemonIdentifier;
}
export interface PosingData {
    posingFileOptions: PosingFileOptions;
}
export declare function serializePosingData(data: PosingData): Record<string, any>;
export declare function deserializePosingData(data: any): PosingData;
