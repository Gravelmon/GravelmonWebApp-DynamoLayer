import {PokemonIdentifier} from "../../../nodes";
import {deserializeVector, serializeVector, Vector} from "../../properties";
import {MoveIdentifier} from "../../../nodes";
import {
    Animation, deserializeAnimation,
    NamedAnimation,
    QuirkAnimation,
    RidingStyle, serializeAnimation
} from "./Animation";
import {ExpressionNode} from "./ConditionTree";
import {PoseType} from "./poseType";

export interface TransformedPart {
    isVisible?: boolean
    rotation?: Vector;
    position?: Vector;
    part: string;
}

function serializePoseAnimation(poseAnimation: Pose) {
    return {
        name: poseAnimation.name,

        isBattle: poseAnimation.isBattle,
        isTouchingWater: poseAnimation.isTouchingWater,
        isUnderWater: poseAnimation.isUnderWater,
        isInWaterOrRain: poseAnimation.isInWaterOrRain,
        isStandingOnRedSand: poseAnimation.isStandingOnRedSand,
        isStandingOnSand: poseAnimation.isStandingOnSand,
        isStandingOnSandOrRedSand: poseAnimation.isStandingOnSandOrRedSand,
        isDusk: poseAnimation.isDusk,
        isWild: poseAnimation.isWild,
        isRideStyle: poseAnimation.isRideStyle,

        conditionExpression: poseAnimation.conditionExpression,
        allPoseTypes: poseAnimation.allPoseTypes,
        pose: poseAnimation.pose,
        transformedParts: poseAnimation.transformedParts ?
            poseAnimation.transformedParts.map(transformedPart => ({
                isVisible: transformedPart.isVisible,
                rotation: transformedPart.rotation ? serializeVector(transformedPart.rotation) : undefined,
                position: transformedPart.position ? serializeVector(transformedPart.position) : undefined,
                part: transformedPart.part,
            })) : undefined,
        quirks: poseAnimation.quirks ? poseAnimation.quirks.map(serializeAnimation) : undefined,
        namedAnimations: poseAnimation.namedAnimations ? poseAnimation.namedAnimations.map(serializeAnimation) : undefined,
        animations: poseAnimation.animations ? poseAnimation.animations.map(serializeAnimation) : undefined,
        transformTicks: poseAnimation.transformTicks,
        transformToTicks: poseAnimation.transformToTicks,
        transitions: poseAnimation.transitions ? poseAnimation.transitions.map(serializeAnimation) : undefined,
    }
}

function deserializePose(data: any): Pose {
    return {
        name: data.name,
        isBattle: data.isBattle,
        isTouchingWater: data.isTouchingWater,
        isUnderWater: data.isUnderWater,
        isInWaterOrRain: data.isInWaterOrRain,
        isStandingOnRedSand: data.isStandingOnRedSand,
        isStandingOnSand: data.isStandingOnSand,
        isStandingOnSandOrRedSand: data.isStandingOnSandOrRedSand,
        isDusk: data.isDusk,
        isWild: data.isWild,
        isRideStyle: data.isRideStyle,

        conditionExpression: data.conditionExpression,
        allPoseTypes: data.allPoseTypes,
        pose: data.pose,
        transformedParts: data.transformedParts
            ? data.transformedParts.map((tp: any) => ({
                isVisible: tp.isVisible,
                rotation: tp.rotation ? deserializeVector(tp.rotation) : undefined,
                position: tp.position ? deserializeVector(tp.position) : undefined,
                part: tp.part,
            }))
            : undefined,
        quirks: data.quirks ? data.quirks.map(deserializeAnimation) : undefined,
        namedAnimations: data.namedAnimations
            ? data.namedAnimations.map((na: any) => ({
                animationExpression: na.animationExpression,
                name: na.name instanceof MoveIdentifier ? MoveIdentifier.deserialize(na.name) : na.name,
                animation: na.animation,
            }))
            : undefined,
        animations: data.animations
            ? data.animations.map((a: any) => deserializeAnimation(a))
            : undefined,
        transformTicks: data.transformTicks,
        transformToTicks: data.transformToTicks,
        transitions: data.transitions ? data.transitions.map(deserializeAnimation) : undefined,
    };
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
    pose: PoseType
    transformedParts?: TransformedPart[];
    quirks?: QuirkAnimation[];
    namedAnimations?: NamedAnimation[];
    animations: Animation[]
    transformTicks?: number;
    transformToTicks?: number;
    transitions?: NamedAnimation[];
}

export function serializePosingData(data: PosingData): Record<string, any> {
    return {
        posingFileOptions: {
            profileScale: data.posingFileOptions.profileScale,
            profileCoords: serializeVector(data.posingFileOptions.profileCoords),
            portraitScale: data.posingFileOptions.portraitScale,
            portraitCoords: serializeVector(data.posingFileOptions.portraitCoords),
            headBone: data.posingFileOptions.headBone,
            rootBone: data.posingFileOptions.rootBone,
            cameraOffsets: data.posingFileOptions.cameraOffsets ? data.posingFileOptions.cameraOffsets.map(cameraOffset => ({
                firstPersonCameraOffset: serializeVector(cameraOffset.firstPersonCameraOffset),
                thirdPersonCameraOffset: serializeVector(cameraOffset.thirdPersonCameraOffset),
                thirdPersonCameraOffsetNoViewBobbing: serializeVector(cameraOffset.thirdPersonCameraOffsetNoViewBobbing),
                seatName: cameraOffset.seatName,
            })) : undefined,
            poseAnimations: data.posingFileOptions.poseAnimations ?
                data.posingFileOptions.poseAnimations.map(poseAnimation => serializePoseAnimation(poseAnimation))
                : undefined,
            globalAnimations: data.posingFileOptions.globalAnimations ? data.posingFileOptions.globalAnimations.map(serializeAnimation) : undefined,
            overridesPosingData: data.posingFileOptions.overridesPosingData?.serialize(),
        }
    }
}

export function deserializePosingData(data: any): PosingData {
    const opts = data.posingFileOptions;

    if (!opts || typeof opts !== "object") {
        throw new Error("Invalid PosingData: missing posingFileOptions");
    }

    return {
        posingFileOptions: {
            profileScale: opts.profileScale,
            profileCoords: deserializeVector(opts.profileCoords),
            portraitScale: opts.portraitScale,
            portraitCoords: deserializeVector(opts.portraitCoords),
            headBone: opts.headBone,
            rootBone: opts.rootBone,

            cameraOffsets: opts.cameraOffsets
                ? opts.cameraOffsets.map((co: any) => ({
                    firstPersonCameraOffset: deserializeVector(co.firstPersonCameraOffset),
                    thirdPersonCameraOffset: deserializeVector(co.thirdPersonCameraOffset),
                    thirdPersonCameraOffsetNoViewBobbing: deserializeVector(
                        co.thirdPersonCameraOffsetNoViewBobbing
                    ),
                    seatName: co.seatName,
                }))
                : undefined,

            poseAnimations: opts.poseAnimations
                ? opts.poseAnimations.map((pa: any) =>
                    deserializePose(pa)
                )
                : undefined,

            globalAnimations: opts.globalAnimations
                ? opts.globalAnimations.map(deserializeAnimation)
                : undefined,

            overridesPosingData: opts.overridesPosingData
                ? PokemonIdentifier.deserialize(opts.overridesPosingData)
                : undefined,
        },
    };
}