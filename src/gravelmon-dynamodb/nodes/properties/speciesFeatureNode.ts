import { deserializerRegistry } from '../../service/deserializerRegistry';
import { DynamoNode } from '../../service/dynamoNodes';
import {deserializeVector, NumberRange, ResourceLocation, serializeVector, Vector} from "../../models";

export const SpeciesFeatureEntity = "SpeciesFeature";
export const HasSpeciesFeatureEdgeType = "HasSpeciesFeature";

export enum SpeciesFeatureType {
    Flag,
    Choice,
    Integer
}

export function createFlagSpeciesFeatureNode(id: string, speciesFeatureName: string, defaultValue: boolean = false, isPrimarySpeciesFeature: boolean = true, introducedByGame: string, lastEdited: number = Date.now()): SpeciesFeatureNode {
    return new FlagSpeciesFeatureNode(id, speciesFeatureName, defaultValue, isPrimarySpeciesFeature, introducedByGame, lastEdited);
}

export function createChoiceSpeciesFeatureNode(id: string, speciesFeatureName: string, choices: string[], defaultValue: string | "random" = "random", isPrimarySpeciesFeature: boolean = false, introducedByGame: string, lastEdited: number = Date.now()): SpeciesFeatureNode {
    return new ChoiceSpeciesFeatureNode(id, speciesFeatureName, choices, defaultValue, isPrimarySpeciesFeature, introducedByGame, lastEdited);
}

abstract class SpeciesFeatureNode extends DynamoNode {
    speciesFeatureName: string;
    speciesFeatureType: SpeciesFeatureType;
    isAspect: boolean = true;
    defaultOption?: boolean | "random" | string | number;
    /** Indicates that this speciesFeature governs the form of the pokemon (e.g. Galarian vs Hisuian)
    non primary speciesFeatures include female form, gigantamax form, mega form etc. It is possible for a pokemon to have multiple primary speciesFeatures*/
    isPrimarySpeciesFeature: boolean;
    introducedByGame: string;
    static version = 1;
    
    protected constructor(id: string, speciesFeatureName: string, speciesFeatureType: SpeciesFeatureType, defaultValue: boolean | "random" | string | number,
                          isPrimarySpeciesFeature: boolean, introducedByGame: string, lastEdited: number = Date.now()) {
        super(SpeciesFeatureEntity+speciesFeatureType, id, SpeciesFeatureNode.version, lastEdited);
        this.speciesFeatureName = speciesFeatureName;
        this.speciesFeatureType = speciesFeatureType;
        this.defaultOption = defaultValue;
        this.isPrimarySpeciesFeature = isPrimarySpeciesFeature;
        this.introducedByGame = introducedByGame;
    }

    static deserialize(data: Record<string, any>): SpeciesFeatureNode {
        if (
            data.speciesFeatureType === undefined ||
            data.defaultOption === undefined ||
            data.isPrimarySpeciesFeature === undefined ||
            data.introducedByGame === undefined
        ) {
            throw new Error("Invalid data for deserializing SpeciesFeatureNode: missing required properties");
        }
        const speciesFeatureType: SpeciesFeatureType = data.speciesFeatureType;
        const speciesFeatureName: string = data.speciesFeatureName;
        const defaultOption: boolean | "random" | string | number = data.defaultOption;
        const isPrimarySpeciesFeature: boolean = data.isPrimarySpeciesFeature;
        const introducedByGame: string = data.introducedByGame;
        const name: string = data.name;
        if(speciesFeatureType === SpeciesFeatureType.Flag) {
            return new FlagSpeciesFeatureNode(name, speciesFeatureName, defaultOption as boolean, isPrimarySpeciesFeature, introducedByGame, data.lastEdited);
        } else if(speciesFeatureType === SpeciesFeatureType.Choice) {
            if(!data.choices) {
                throw new Error("Invalid data for deserializing ChoiceSpeciesFeatureNode: missing choices property");
            }
            const choices: string[] = data.choices;
            return new ChoiceSpeciesFeatureNode(name, speciesFeatureName, choices, defaultOption as string, isPrimarySpeciesFeature, introducedByGame, data.lastEdited);
        } else if(speciesFeatureType === SpeciesFeatureType.Integer) {
            const range = NumberRange.deserialize(data.numberRange);
            return new IntegerSpeciesFeatureNode(
                name,
                speciesFeatureName,
                range,
                defaultOption as number,
                data.isVisible,
                data.itemPoints.map((itemPoint : any) => {
                    return {
                            resourceLocation: ResourceLocation.deserialize(itemPoint.resourceLocation),
                            amount: itemPoint.amount
                    }
                }),
                introducedByGame,
                data.display ? {
                    uiName: data.display.uiName,
                    color: deserializeVector(data.display.color),
                    underlay: data.display.underlay.serialize(),
                    overlay: data.display.overlay.serialize(),
                } : undefined, data.lastEdited);
        } else {
            throw new Error("Invalid speciesFeature type for deserializing SpeciesFeatureNode");
        }
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            speciesFeatureName: this.speciesFeatureName,
            speciesFeatureType: this.speciesFeatureType,
            isAspect: this.isAspect,
            defaultOption: this.defaultOption,
            isPrimarySpeciesFeature: this.isPrimarySpeciesFeature,
            introducedByGame: this.introducedByGame
        }
    }
}

export class FlagSpeciesFeatureNode extends SpeciesFeatureNode {
    constructor(id: string, speciesFeatureName: string, defaultValue: boolean = false, isPrimarySpeciesFeature: boolean = true, introducedByGame: string, lastEdited: number = Date.now()) {
        super(id, speciesFeatureName, SpeciesFeatureType.Flag, defaultValue, isPrimarySpeciesFeature, introducedByGame, lastEdited);
    }
}

export class ChoiceSpeciesFeatureNode extends SpeciesFeatureNode {
    choices: string[];
    constructor(id: string, speciesFeatureName: string, choices: string[], defaultValue: string | "random" = "random", isPrimarySpeciesFeature: boolean = false, introducedByGame: string, lastEdited: number = Date.now()) {
        super(id, speciesFeatureName, SpeciesFeatureType.Choice, defaultValue, isPrimarySpeciesFeature, introducedByGame, lastEdited);
        this.choices = choices;
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            choices: this.choices
        }
    }
}

export interface IntegerSpeciesFeatureDisplay {
    uiName: string,
    color: Vector,
    underlay: ResourceLocation,
    overlay: ResourceLocation,
}

export class IntegerSpeciesFeatureNode extends SpeciesFeatureNode {
    numberRange: NumberRange;
    visible: boolean;
    itemPoints: {
        resourceLocation: ResourceLocation,
        amount: number
    }[]
    display?: IntegerSpeciesFeatureDisplay;

    constructor(id: string,
                speciesFeatureName: string,
                numberRange: NumberRange,
                defaultValue: number,
                isVisible: boolean,
                itemPoints: {
                    resourceLocation: ResourceLocation,
                    amount: number
                }[],
                introducedByGame: string,
                display?: IntegerSpeciesFeatureDisplay, lastEdited: number = Date.now()) {
        super(id, speciesFeatureName, SpeciesFeatureType.Choice, defaultValue, false, introducedByGame, lastEdited);
        this.numberRange = numberRange;
        this.visible = isVisible;
        this.itemPoints = itemPoints;
        this.display = display;
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            numberRange: this.numberRange.serialize(),
            visible: this.visible,
            itemPoints: this.itemPoints.map(itemPoint=> {
                return {
                    resourceLocation: itemPoint.resourceLocation.serialize(),
                    amount: itemPoint.amount
                }}),
            display: this.display && {
                uiName: this.display.uiName,
                color: serializeVector(this.display.color),
                underlay: this.display.underlay.serialize(),
                overlay: this.display.overlay.serialize(),
            }
        }
    }
}

deserializerRegistry.register(SpeciesFeatureEntity + SpeciesFeatureType.Flag, SpeciesFeatureNode.deserialize);
deserializerRegistry.register(SpeciesFeatureEntity + SpeciesFeatureType.Choice, SpeciesFeatureNode.deserialize);