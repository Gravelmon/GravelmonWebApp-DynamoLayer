import { ResourceLocation } from "../minecraft";
export declare enum CommonLayerNames {
    Emissive = "emissive",
    TransparentEmissive = "transparentEmissive",
    Tail = "tail",
    Transparent_Emissive = "transparent_emissive",
    Emissive2 = "emissive2",
    Flame = "flame",
    Glow = "glow"
}
export interface AnimatedTexture {
    texture: ResourceLocation;
    framerate?: number;
    loops: boolean;
    numberOfFrames?: number;
}
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
export declare function serializeResolverData(resolverData: ResolverData): {
    layers: {
        name: string;
        texture: any;
        isEmissive: boolean | undefined;
        isTranslucent: boolean | undefined;
    }[];
    variationForSpeciesFeatureChoice: {
        speciesFeature: string;
        choice: string;
    } | undefined;
};
export declare function deserializeResolverData(data: any): ResolverData;
