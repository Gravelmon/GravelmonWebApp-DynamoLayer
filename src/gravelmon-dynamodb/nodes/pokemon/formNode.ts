import { getNodePK} from '../../service/dynamoNodes';
import { GenderDifferenceNode as GenderDifference } from '../../models/assets/genderDifference';
import {
    deserializePokemonData,
    PokemonData,
    PokemonIdentifier,
    PokemonNode
} from './pokemonNode';
import {NumberRange} from "../../models/properties/numberRange";
import {ResourceLocation} from "../../models/minecraft/resourceLocation";
import { EvolutionIdentifier } from './evolutionNode';
import {deserializeResolverData, ResolverData, serializeResolverData} from '../../models/assets/resolverData';
import {deserializePosingData, PosingData, serializePosingData} from '../../models/assets/posing/posingFileData';
import {deserializeSpawnData, serializeSpawnData, SpawnData as SpawnData} from '../../models/spawning/spawnData';
import { deserializerRegistry } from '../../service/deserializerRegistry';

export const FormEntity = "Form";

export interface ItemDrop {
    dropChance: number;
    quantityRange: NumberRange;
    droppedItem: ResourceLocation;
}

export interface LightingData {
    lightLevel: number;
    liquidGlowMode: undefined | "LAND"
}

export interface MechanicInteraction {
    mechanic: string;
    resultingForm: PokemonIdentifier;
}

export interface FormData {
    genderDifference?: GenderDifference;
    lightingData?: LightingData;
    evolutions?: EvolutionIdentifier[];
    isFormOf: PokemonIdentifier;
    affectedByMechanics?: string[];
    resolverData?: ResolverData;
    posingData?: PosingData;
    speciesFeatures: string[];
    spawnData?: SpawnData[];
    revivesFromFossil?: string;
    drops?: ItemDrop[];
    mechanicInteractions?: MechanicInteraction[];
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
        evolutions: formData.evolutions?.map(evolution => evolution.serialize()),
        isFormOf: formData.isFormOf.serialize(),
        affectedByMechanics: formData.affectedByMechanics,
        resolverData: formData.resolverData ? serializeResolverData(formData.resolverData) : undefined,
        posingData: formData.posingData ? serializePosingData(formData.posingData) : undefined,
        speciesFeatures: formData.speciesFeatures,
        spawnData: formData.spawnData ? formData.spawnData.map(serializeSpawnData) : undefined,
        revivesFromFossil: formData.revivesFromFossil,
        drops: formData.drops?.map(drop => {
            dropChance: drop.dropChance;
            quantityRange: drop.quantityRange.serialize();
            droppedItem: drop.droppedItem.serialize();
        }),
        mechanicInteractions: formData.mechanicInteractions?.map(mechanicInteraction => {
            return {
                mechanic: mechanicInteraction.mechanic,
                resultingForm: mechanicInteraction.resultingForm.serialize()
            }
        })
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
        evolutions: data.evolutions?.map((evolution: any) => EvolutionIdentifier.deserialize(evolution)),
        isFormOf: PokemonIdentifier.deserialize(data.isFormOf ),
        affectedByMechanics: data.affectedByMechanics,
        resolverData: deserializeResolverData(data.resolverData),
        posingData: deserializePosingData(data.posingData),
        speciesFeatures: data.speciesFeatures,
        spawnData: data.spawnData ? data.spawnData.map(deserializeSpawnData) : undefined,
        revivesFromFossil: data.revivesFromFossil,
        drops: data.drops?.map((drop: any) => {
            dropChance: drop.dropChance;
            quantityRange: NumberRange.deserialize(drop.quantityRange);
            droppedItem: ResourceLocation.deserialize(drop.droppedItem);
        }),
        mechanicInteractions: data.mechanicInteractions?.map((mechanicInteraction: any) => {
            return {
                mechanic: mechanicInteraction.mechanic,
                resultingForm: PokemonIdentifier.deserialize(mechanicInteraction.resultingForm)
            }
        })
    };
}


deserializerRegistry.register(FormEntity, FormNode.deserialize);