import { ResourceLocation } from "../minecraft";

/**
 * Matches Java CommonLayerNames enum
 */
export enum CommonLayerNames {
    Emissive = "emissive",
    TransparentEmissive = "transparentEmissive",
    Tail = "tail",
    Transparent_Emissive = "transparent_emissive",
    Emissive2 = "emissive2",
    Flame = "flame",
    Glow = "glow",
}

/**
 * Matches Java AbstractTexture
 */
export interface AnimatedTexture {
    texture: ResourceLocation;
    framerate?: number;
    loops?: boolean;
    numberOfFrames?: number;
}

export type Texture = ResourceLocation | AnimatedTexture;

/**
 * Matches Java ResolverLayer
 */
export interface ResolverLayer {
    name?: string;
    texture: Texture;
    isEmissive?: boolean;
    isTranslucent?: boolean;
}

/**
 * Matches Java VariationDTO
 */
export interface VariationDTO {
    aspects: string[];
    condition?: string;
    poser?: ResourceLocation;
    model?: ResourceLocation;
    texture?: Texture;
    layers: ResolverLayer[];
    sprites?: Record<string, ResourceLocation>;
}

/**
 * Matches Java ResolverDataDTO
 */
export interface ResolverData {
    variations: VariationDTO[];
}

/* -------------------------
   Serialization helpers
-------------------------- */

function serializeTexture(texture: Texture): any {
    if (texture instanceof ResourceLocation) {
        return texture.serialize();
    }

    return {
        texture: texture.texture.serialize(),
        framerate: texture.framerate,
        loops: texture.loops,
        numberOfFrames: texture.numberOfFrames
    };
}

function deserializeTexture(data: any): Texture {
    if (data.texture) {
        // AnimatedTexture form (Java object style)
        return {
            texture: ResourceLocation.deserialize(data.texture),
            framerate: data.framerate,
            loops: data.loops,
            numberOfFrames: data.numberOfFrames
        };
    }

    // Single texture form
    return ResourceLocation.deserialize(data);
}

/* -------------------------
   ResolverLayer
-------------------------- */

function serializeResolverLayer(layer: ResolverLayer) {
    return {
        name: layer.name,
        texture: serializeTexture(layer.texture),
        isEmissive: layer.isEmissive,
        isTranslucent: layer.isTranslucent
    };
}

function deserializeResolverLayer(data: any): ResolverLayer {
    return {
        name: data.name,
        texture: deserializeTexture(data.texture),
        isEmissive: data.isEmissive,
        isTranslucent: data.isTranslucent
    };
}

/* -------------------------
   VariationDTO
-------------------------- */

function serializeVariation(variation: VariationDTO) {
    return {
        aspects: variation.aspects,
        condition: variation.condition,
        poser: variation.poser?.serialize(),
        model: variation.model?.serialize(),
        texture: variation.texture ? serializeTexture(variation.texture) : undefined,
        layers: variation.layers?.map(serializeResolverLayer) ?? [],
        sprites: variation.sprites
            ? Object.fromEntries(
                Object.entries(variation.sprites).map(([k, v]) => [k, v.serialize()])
            )
            : undefined
    };
}

function deserializeVariation(data: any): VariationDTO {
    return {
        aspects: data.aspects ?? [],
        condition: data.condition,
        poser: data.poser ? ResourceLocation.deserialize(data.poser) : undefined,
        model: data.model ? ResourceLocation.deserialize(data.model) : undefined,
        texture: data.texture ? deserializeTexture(data.texture) : undefined,
        layers: (data.layers ?? []).map(deserializeResolverLayer),
        sprites: data.sprites
            ? Object.fromEntries(
                Object.entries(data.sprites).map(([k, v]: any) => [
                    k,
                    ResourceLocation.deserialize(v)
                ])
            )
            : undefined
    };
}

/* -------------------------
   ResolverData root
-------------------------- */

export function serializeResolverData(data: ResolverData) {
    return {
        variations: data.variations.map(serializeVariation)
    };
}

export function deserializeResolverData(data: any): ResolverData {
    return {
        variations: (data.variations ?? []).map(deserializeVariation)
    };
}