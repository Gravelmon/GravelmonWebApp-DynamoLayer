import { getNodePK} from '../../service';
import { GenderDifferenceNode as GenderDifference } from '../../models/assets/genderDifference';
import {
    deserializePokemonData,
    PokemonData,
    PokemonIdentifier,
    PokemonNode
} from './pokemonNode';
import {NumberRange} from "../../models";
import {ResourceLocation} from "../../models";
import {deserializeResolverData, ResolverData, serializeResolverData} from '../../models';
import {deserializePosingData, PosingData, serializePosingData} from '../../models';
import {deserializeSpawnData, serializeSpawnData, SpawnData as SpawnData} from '../../models/spawning/spawnData';
import { deserializerRegistry } from '../../service';

export const FormEntity = "Form";

export const enum ItemDropMethod {
    ON_ENTITY,
    ON_PLAYER,
    TO_INVENTORY
}

export interface ItemDrop {
    percentage: number;
    quantity?: number;
    quantityRange?: NumberRange;
    maxSelectableItems?: number;
    dropMethod: ItemDropMethod
    item: ResourceLocation;
}

export enum LiquidGlowMode {
    LAND = "LAND",
    UNDERWATER = "UNDERWATER",
    BOTH = "BOTH"
}

export interface LightingData {
    lightLevel: number;
    liquidGlowMode?: LiquidGlowMode
}

export interface MechanicInteraction {
    mechanic: string;
    resultingForms: PokemonIdentifier[];
}

export interface DropData {
    dropAmount?: number;
    drops?: ItemDrop[]
}

export interface FormData {
    genderDifference?: GenderDifference;
    lightingData?: LightingData;
    // evolutions?: PokemonIdentifier[];
    isFormOf?: PokemonIdentifier; //undefined if it is the base form
    affectedByMechanics?: string[];
    resolverData?: ResolverData;
    posingData?: PosingData;
    speciesFeatures: string[];
    spawnData?: SpawnData[];
    revivesFromFossils?: string[];
    dropData?: DropData;
    mechanicInteractions?: MechanicInteraction[];
    addedByGame: string;
}

export class FormNode extends PokemonNode {
    formData: FormData;
    static version = 1;

    constructor(
        pokemonData: PokemonData,
        formData: FormData,
        lastEdited: number = Date.now(),
    ) 
    {
        super(pokemonData, lastEdited);
        this.PK = getNodePK(FormEntity, this.name);
        this.entityType = FormEntity;
        this.formData = formData;
        this.version = FormNode.version;
    }

    static deserialize(data: Record<string, any>): PokemonNode {
        const pokemonData = deserializePokemonData(data.pokemonData);
        const formData = deserializeFormData(data.formData);
        return new FormNode(pokemonData, formData, data.lastEdited);
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            formData: serializeFormData(this.formData)
        }
    }
}

export function serializeFormData(formData: FormData): any {
    return {
        genderDifference: formData.genderDifference ? {
            hasGenderedTexture: formData.genderDifference.hasGenderedTexture,
            hasGenderedModel: formData.genderDifference.hasGenderedModel,
            hasGenderedAnimation: formData.genderDifference.hasGenderedAnimation
        } : undefined,
        lightingData: formData.lightingData ? {
            lightLevel: formData.lightingData.lightLevel,
            liquidGlowMode: formData.lightingData.liquidGlowMode
        } : undefined,
        // evolutions: formData.evolutions?.map(evolution => evolution.serialize()),
        isFormOf: formData.isFormOf ? formData.isFormOf.serialize() : undefined,
        affectedByMechanics: formData.affectedByMechanics,
        resolverData: formData.resolverData ? serializeResolverData(formData.resolverData) : undefined,
        posingData: formData.posingData ? serializePosingData(formData.posingData) : undefined,
        speciesFeatures: formData.speciesFeatures,
        spawnData: formData.spawnData ? formData.spawnData.map(serializeSpawnData) : undefined,
        revivesFromFossils: formData.revivesFromFossils,
        dropData: formData.dropData ? {
            dropAmount: formData.dropData.dropAmount,
            drops: formData.dropData.drops?.map(drop => {
                percentage: drop.percentage;
                quantity: drop.quantity;
                quantityRange: drop.quantityRange ? drop.quantityRange.serialize() : undefined;
                maxSelectableItems: drop.maxSelectableItems;
                dropMethod: drop.dropMethod
                item: drop.item.serialize();
            })
        } : undefined,
        mechanicInteractions: formData.mechanicInteractions?.map(mechanicInteraction => {
            return {
                mechanic: mechanicInteraction.mechanic,
                resultingForm: mechanicInteraction.resultingForms.map(form=>form.serialize())
            }
        }),
        addedByGame: formData.addedByGame
    };
}

export function deserializeFormData(data: any): FormData {
    return {
        genderDifference: data.genderDifference ? {
            hasGenderedTexture: data.genderDifference.hasGenderedTexture,
            hasGenderedModel: data.genderDifference.hasGenderedModel,
            hasGenderedAnimation: data.genderDifference.hasGenderedAnimation
        } : undefined,
        lightingData: data.lightingData ? {
            lightLevel: data.lightingData.lightLevel,
            liquidGlowMode: data.lightingData.liquidGlowMode
        } : undefined,
        // evolutions: data.evolutions?.map((evolution: any) => PokemonIdentifier.deserialize(evolution)),
        isFormOf: data.isFormOf ? PokemonIdentifier.deserialize(data.isFormOf ) : undefined,
        affectedByMechanics: data.affectedByMechanics ? data.affectedByMechanics : undefined,
        resolverData: data.resolverData ? deserializeResolverData(data.resolverData) : undefined,
        posingData: data.posingData ? deserializePosingData(data.posingData) : undefined,
        speciesFeatures: data.speciesFeatures,
        spawnData: data.spawnData ? data.spawnData.map(deserializeSpawnData) : undefined,
        revivesFromFossils: data.revivesFromFossils ?? [],
        dropData: data.dropData ? {
            dropAmount: data.dropData.dropAmount,
            drops: data.dropData.drops.map((drop: any) => {
                percentage: drop.percentage;
                quantity: drop.quantity;
                quantityRange: drop.quantityRange ? NumberRange.deserialize(drop.quantityRange) : undefined;
                maxSelectableItems: drop.maxSelectableItems;
                dropMethod: drop.dropMethod
                item: ResourceLocation.deserialize(drop.item);
            })
        } : undefined,
        mechanicInteractions: data.mechanicInteractions ? data.mechanicInteractions.map((mechanicInteraction: any) => {
            return {
                mechanic: mechanicInteraction.mechanic,
                resultingForm: mechanicInteraction.resultingForms.map((form:any)=> PokemonIdentifier.deserialize(form))
            }
        }) : undefined,
        addedByGame: data.addedByGame
    };
}


deserializerRegistry.register(FormEntity, FormNode.deserialize);