"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonLayerNames = void 0;
exports.serializeResolverData = serializeResolverData;
exports.deserializeResolverData = deserializeResolverData;
var CommonLayerNames;
(function (CommonLayerNames) {
    CommonLayerNames["Emissive"] = "emissive";
    CommonLayerNames["TransparentEmissive"] = "transparentEmissive";
    CommonLayerNames["Tail"] = "tail";
    CommonLayerNames["Transparent_Emissive"] = "transparent_emissive";
    CommonLayerNames["Emissive2"] = "emissive2";
    CommonLayerNames["Flame"] = "flame";
    CommonLayerNames["Glow"] = "glow";
})(CommonLayerNames || (exports.CommonLayerNames = CommonLayerNames = {}));
function serializeResolverLayer(layer) {
    return {
        name: layer.name,
        textureName: layer.textureName,
        isEmissive: layer.isEmissive,
        isTranslucent: layer.isTranslucent,
        framerate: layer.framerate,
        loops: layer.loops,
        numberOfFrames: layer.numberOfFrames
    };
}
function deserializeResolverLayer(data) {
    return {
        name: data.name,
        textureName: data.textureName,
        isEmissive: data.isEmissive,
        isTranslucent: data.isTranslucent,
        framerate: data.framerate,
        loops: data.loops,
        numberOfFrames: data.numberOfFrames
    };
}
function serializeResolverData(resolverData) {
    return {
        layers: resolverData.layers.map(layer => serializeResolverLayer(layer)),
        variationForAspectChoice: resolverData.variationForAspectChoice ? {
            aspect: resolverData.variationForAspectChoice.aspect,
            choice: resolverData.variationForAspectChoice.choice
        } : undefined
    };
}
function deserializeResolverData(data) {
    return {
        layers: data.layers.map((layer) => deserializeResolverLayer(layer)),
        variationForAspectChoice: data.variationForAspectChoice ? {
            aspect: data.variationForAspectChoice.aspect,
            choice: data.variationForAspectChoice.choice
        } : undefined
    };
}
