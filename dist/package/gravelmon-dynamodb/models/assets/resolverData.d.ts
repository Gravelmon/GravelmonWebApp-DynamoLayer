import { ResourceLocation } from "../minecraft";
/**
 * Matches Java CommonLayerNames enum
 */
export declare enum CommonLayerNames {
    Emissive = "emissive",
    TransparentEmissive = "transparentEmissive",
    Tail = "tail",
    Transparent_Emissive = "transparent_emissive",
    Emissive2 = "emissive2",
    Flame = "flame",
    Glow = "glow"
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
export declare function serializeResolverData(data: ResolverData): {
    variations: {
        aspects: string[];
        condition: string | undefined;
        poser: any;
        model: any;
        texture: any;
        layers: {
            name: string | undefined;
            texture: any;
            isEmissive: boolean | undefined;
            isTranslucent: boolean | undefined;
        }[];
        sprites: {
            [k: string]: any;
        } | undefined;
    }[];
};
export declare function deserializeResolverData(data: any): ResolverData;
