import {ResourceLocation} from "../minecraft";

export enum CommonLayerNames {
    Emissive = "emissive",
    TransparentEmissive = "transparentEmissive",
    Tail = "tail",
    Transparent_Emissive = "transparent_emissive",
    Emissive2 = "emissive2",
    Flame = "flame",
    Glow = "glow",
}

export interface AnimatedTexture {
    texture: ResourceLocation;
    framerate?: number;
    loops: boolean;
    numberOfFrames?: number;
}

//texturename, model name and poser name will all be solved programmatically
export interface ResolverLayer {
    name: string | CommonLayerNames;
    texture: ResourceLocation | AnimatedTexture;
    isEmissive?: boolean;
    isTranslucent?: boolean;
}

export interface ResolverData {
    layers: ResolverLayer[];
    variationForSpeciesFeatureChoice?: {
        speciesFeature: string;
        choice: string;
    };
}

function serializeResolverLayer(layer: ResolverLayer) {
    return {
        name: layer.name,
        texture: layer.texture instanceof ResourceLocation
            ? layer.texture.serialize()
            : {
                texture: layer.texture.texture.serialize(),
                framerate: layer.texture.framerate,
                loops: layer.texture.loops,
                numberOfFrames: layer.texture.numberOfFrames
            },
        isEmissive: layer.isEmissive,
        isTranslucent: layer.isTranslucent
    };
}

function deserializeResolverLayer(data: any): ResolverLayer {
    return {
        name: data.name,
        texture: data.texture.texture
            ? {
                texture: ResourceLocation.deserialize(data.texture.texture),
                framerate: data.texture.framerate,
                loops: data.texture.loops,
                numberOfFrames: data.texture.numberOfFrames
            }
            : ResourceLocation.deserialize(data.texture),
        isEmissive: data.isEmissive,
        isTranslucent: data.isTranslucent
    }
}

export function serializeResolverData(resolverData: ResolverData) {
    return {
        layers: resolverData.layers.map(layer => serializeResolverLayer(layer)),
        variationForSpeciesFeatureChoice: resolverData.variationForSpeciesFeatureChoice ? {
            speciesFeature: resolverData.variationForSpeciesFeatureChoice.speciesFeature,
            choice: resolverData.variationForSpeciesFeatureChoice.choice
        } : undefined
    }
}

export function deserializeResolverData(data: any) : ResolverData {
    return {
        layers: data.layers.map((layer: any) => deserializeResolverLayer(layer)),
        variationForSpeciesFeatureChoice: data.variationForSpeciesFeatureChoice ? {
            speciesFeature: data.variationForSpeciesFeatureChoice.speciesFeature,
            choice: data.variationForSpeciesFeatureChoice.choice
        } : undefined
    }
}