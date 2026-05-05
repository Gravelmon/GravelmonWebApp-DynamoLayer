"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamedAnimationTypes = exports.OverridesPosingDataEdgeType = exports.PosingForFormEdgeType = exports.PosingForAspectEdgeType = exports.PosingDataEntity = void 0;
exports.serializePosingData = serializePosingData;
exports.deserializePosingData = deserializePosingData;
const pokemonNode_1 = require("../../../nodes/pokemon/pokemonNode");
const vector_1 = require("../../properties/vector");
const numberRange_1 = require("../../properties/numberRange");
const animationNode_1 = require("../../../nodes/assets/animationNode");
exports.PosingDataEntity = "PosingData";
exports.PosingForAspectEdgeType = "PosingForAspect";
exports.PosingForFormEdgeType = "PosingForForm";
exports.OverridesPosingDataEdgeType = "Overrides";
var NamedAnimationTypes;
(function (NamedAnimationTypes) {
    NamedAnimationTypes["Cry"] = "cry";
    NamedAnimationTypes["Recoil"] = "recoil";
    NamedAnimationTypes["Status"] = "status";
    NamedAnimationTypes["Special"] = "special";
    NamedAnimationTypes["Physical"] = "Physical";
    NamedAnimationTypes["Faint"] = "faint";
    NamedAnimationTypes["AirSpecial"] = "air_special";
    NamedAnimationTypes["AirPhysical"] = "air_physical";
    NamedAnimationTypes["AirStatus"] = "air_status";
})(NamedAnimationTypes || (exports.NamedAnimationTypes = NamedAnimationTypes = {}));
function serializePoseAnimation(poseAnimation) {
    return {
        name: poseAnimation.name,
        isBattle: poseAnimation.isBattle,
        isTouchingWater: poseAnimation.isTouchingWater,
        isUnderWater: poseAnimation.isUnderWater,
        conditionExpression: poseAnimation.conditionExpression,
        allPoseTypes: poseAnimation.allPoseTypes,
        pose: poseAnimation.pose,
        transformedParts: poseAnimation.transformedParts ?
            poseAnimation.transformedParts.map(transformedPart => ({
                isVisible: transformedPart.isVisible,
                rotation: transformedPart.rotation ? (0, vector_1.serializeVector)(transformedPart.rotation) : undefined,
                position: transformedPart.position ? (0, vector_1.serializeVector)(transformedPart.position) : undefined,
                part: transformedPart.part,
            })) : undefined,
        quirks: poseAnimation.quirks ? poseAnimation.quirks.map(quirk => ({
            loopTimes: quirk.loopTimes,
            occurrenceRange: quirk.occurrenceRange.serialize(),
            curveExpression: quirk.curveExpression,
            animation: quirk.animation,
            isPrimary: quirk.isPrimary,
        })) : undefined,
        namedAnimations: poseAnimation.namedAnimations ?
            poseAnimation.namedAnimations.map(namedAnimation => ({
                animationExpression: namedAnimation.animationExpression,
                name: namedAnimation.name,
                animation: namedAnimation.animation,
            })) : undefined,
        animations: poseAnimation.animations ?
            poseAnimation.animations.map(animation => (0, animationNode_1.serializeAnimation)(animation))
            : undefined,
        transformTicks: poseAnimation.transformTicks,
        transformToTicks: poseAnimation.transformToTicks,
    };
}
function deserializePoseAnimation(data) {
    return {
        name: data.name,
        isBattle: data.isBattle,
        isTouchingWater: data.isTouchingWater,
        isUnderWater: data.isUnderWater,
        conditionExpression: data.conditionExpression,
        allPoseTypes: data.allPoseTypes,
        pose: data.pose,
        transformedParts: data.transformedParts
            ? data.transformedParts.map((tp) => ({
                isVisible: tp.isVisible,
                rotation: tp.rotation ? (0, vector_1.deserializeVector)(tp.rotation) : undefined,
                position: tp.position ? (0, vector_1.deserializeVector)(tp.position) : undefined,
                part: tp.part,
            }))
            : undefined,
        quirks: data.quirks
            ? data.quirks.map((q) => ({
                loopTimes: q.loopTimes,
                occurrenceRange: numberRange_1.NumberRange.deserialize(q.occurrenceRange),
                curveExpression: q.curveExpression,
                animation: q.animation, // assuming already correct type (string / PK)
                isPrimary: q.isPrimary,
            }))
            : undefined,
        namedAnimations: data.namedAnimations
            ? data.namedAnimations.map((na) => ({
                animationExpression: na.animationExpression,
                name: na.name,
                animation: na.animation,
            }))
            : undefined,
        animations: data.animations
            ? data.animations.map((a) => (0, animationNode_1.deserializeAnimation)(a))
            : undefined,
        transformTicks: data.transformTicks,
        transformToTicks: data.transformToTicks,
    };
}
function serializePosingData(data) {
    return {
        posingFileOptions: {
            profileScale: data.posingFileOptions.profileScale,
            profileCoords: (0, vector_1.serializeVector)(data.posingFileOptions.profileCoords),
            portraitScale: data.posingFileOptions.portraitScale,
            portraitCoords: (0, vector_1.serializeVector)(data.posingFileOptions.portraitCoords),
            headBone: data.posingFileOptions.headBone,
            rootBone: data.posingFileOptions.rootBone,
            cameraOffsets: data.posingFileOptions.cameraOffsets ? data.posingFileOptions.cameraOffsets.map(cameraOffset => ({
                firstPersonCameraOffset: (0, vector_1.serializeVector)(cameraOffset.firstPersonCameraOffset),
                thirdPersonCameraOffset: (0, vector_1.serializeVector)(cameraOffset.thirdPersonCameraOffset),
                thirdPersonCameraOffsetNoViewBobbing: (0, vector_1.serializeVector)(cameraOffset.thirdPersonCameraOffsetNoViewBobbing),
                seatName: cameraOffset.seatName,
            })) : undefined,
            poseAnimations: data.posingFileOptions.poseAnimations ?
                data.posingFileOptions.poseAnimations.map(poseAnimation => serializePoseAnimation(poseAnimation))
                : undefined,
            globalAnimations: data.posingFileOptions.globalAnimations ? data.posingFileOptions.globalAnimations.map(globalAnimation => ({
                animationExpression: globalAnimation.animationExpression,
                name: globalAnimation.name,
                animation: globalAnimation.animation,
            })) : undefined,
            overridesPosingData: data.posingFileOptions.overridesPosingData?.serialize(),
        }
    };
}
function deserializePosingData(data) {
    const opts = data.posingFileOptions;
    if (!opts || typeof opts !== "object") {
        throw new Error("Invalid PosingData: missing posingFileOptions");
    }
    return {
        posingFileOptions: {
            profileScale: opts.profileScale,
            profileCoords: (0, vector_1.deserializeVector)(opts.profileCoords),
            portraitScale: opts.portraitScale,
            portraitCoords: (0, vector_1.deserializeVector)(opts.portraitCoords),
            headBone: opts.headBone,
            rootBone: opts.rootBone,
            cameraOffsets: opts.cameraOffsets
                ? opts.cameraOffsets.map((co) => ({
                    firstPersonCameraOffset: (0, vector_1.deserializeVector)(co.firstPersonCameraOffset),
                    thirdPersonCameraOffset: (0, vector_1.deserializeVector)(co.thirdPersonCameraOffset),
                    thirdPersonCameraOffsetNoViewBobbing: (0, vector_1.deserializeVector)(co.thirdPersonCameraOffsetNoViewBobbing),
                    seatName: co.seatName,
                }))
                : undefined,
            poseAnimations: opts.poseAnimations
                ? opts.poseAnimations.map((pa) => deserializePoseAnimation(pa))
                : undefined,
            globalAnimations: opts.globalAnimations
                ? opts.globalAnimations.map((ga) => ({
                    animationExpression: ga.animationExpression,
                    name: ga.name,
                    animation: (0, animationNode_1.deserializeAnimation)(ga.animation),
                }))
                : undefined,
            overridesPosingData: opts.overridesPosingData
                ? pokemonNode_1.PokemonIdentifier.deserialize(opts.overridesPosingData)
                : undefined,
        },
    };
}
