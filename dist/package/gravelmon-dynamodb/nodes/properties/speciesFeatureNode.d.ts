import { DynamoNode } from '../../service/dynamoNodes';
import { NumberRange, ResourceLocation, Vector } from "../../models";
export declare const SpeciesFeatureEntity = "SpeciesFeature";
export declare const HasSpeciesFeatureEdgeType = "HasSpeciesFeature";
export declare enum SpeciesFeatureType {
    Flag = 0,
    Choice = 1,
    Integer = 2
}
export declare function createFlagSpeciesFeatureNode(id: string, speciesFeatureName: string, defaultValue: boolean | undefined, isPrimarySpeciesFeature: boolean | undefined, introducedByGame: string, lastEdited?: number): SpeciesFeatureNode;
export declare function createChoiceSpeciesFeatureNode(id: string, speciesFeatureName: string, choices: string[], defaultValue: string | "random" | undefined, isPrimarySpeciesFeature: boolean | undefined, introducedByGame: string, lastEdited?: number): SpeciesFeatureNode;
declare abstract class SpeciesFeatureNode extends DynamoNode {
    speciesFeatureName: string;
    speciesFeatureType: SpeciesFeatureType;
    isAspect: boolean;
    defaultOption?: boolean | "random" | string | number;
    /** Indicates that this speciesFeature governs the form of the pokemon (e.g. Galarian vs Hisuian)
    non primary speciesFeatures include female form, gigantamax form, mega form etc. It is possible for a pokemon to have multiple primary speciesFeatures*/
    isPrimarySpeciesFeature: boolean;
    introducedByGame: string;
    static version: number;
    protected constructor(id: string, speciesFeatureName: string, speciesFeatureType: SpeciesFeatureType, defaultValue: boolean | "random" | string | number, isPrimarySpeciesFeature: boolean, introducedByGame: string, lastEdited?: number);
    static deserialize(data: Record<string, any>): SpeciesFeatureNode;
    serialize(): Record<string, any>;
}
export declare class FlagSpeciesFeatureNode extends SpeciesFeatureNode {
    constructor(id: string, speciesFeatureName: string, defaultValue: boolean | undefined, isPrimarySpeciesFeature: boolean | undefined, introducedByGame: string, lastEdited?: number);
}
export declare class ChoiceSpeciesFeatureNode extends SpeciesFeatureNode {
    choices: string[];
    constructor(id: string, speciesFeatureName: string, choices: string[], defaultValue: string | "random" | undefined, isPrimarySpeciesFeature: boolean | undefined, introducedByGame: string, lastEdited?: number);
    serialize(): Record<string, any>;
}
export interface IntegerSpeciesFeatureDisplay {
    uiName: string;
    color: Vector;
    underlay: ResourceLocation;
    overlay: ResourceLocation;
}
export declare class IntegerSpeciesFeatureNode extends SpeciesFeatureNode {
    numberRange: NumberRange;
    visible: boolean;
    itemPoints: {
        resourceLocation: ResourceLocation;
        amount: number;
    }[];
    display?: IntegerSpeciesFeatureDisplay;
    constructor(id: string, speciesFeatureName: string, numberRange: NumberRange, defaultValue: number, isVisible: boolean, itemPoints: {
        resourceLocation: ResourceLocation;
        amount: number;
    }[], introducedByGame: string, display?: IntegerSpeciesFeatureDisplay, lastEdited?: number);
    serialize(): Record<string, any>;
}
export {};
