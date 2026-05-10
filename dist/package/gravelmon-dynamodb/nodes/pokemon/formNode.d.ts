import { GenderDifferenceNode as GenderDifference } from '../../models/assets/genderDifference';
import { PokemonData, PokemonIdentifier, PokemonNode } from './pokemonNode';
import { NumberRange } from "../../models/properties/numberRange";
import { ResourceLocation } from "../../models/minecraft/resourceLocation";
import { EvolutionIdentifier } from './evolutionNode';
import { ResolverData } from '../../models/assets/resolverData';
import { PosingData } from '../../models/assets/posing/posingFileData';
import { SpawnData as SpawnData } from '../../models/spawning/spawnData';
export declare const FormEntity = "Form";
export interface ItemDrop {
    dropChance: number;
    quantityRange: NumberRange;
    droppedItem: ResourceLocation;
}
export interface LightingData {
    lightLevel: number;
    liquidGlowMode: undefined | "LAND";
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
export declare class FormNode extends PokemonNode {
    formData: FormData;
    static version: number;
    constructor(pokemonData: PokemonData, formData: FormData, lastEdited?: number);
    static deserialize(data: Record<string, any>): PokemonNode;
    serialize(): Record<string, any>;
}
export declare function serializeFormData(formData: FormData): any;
export declare function deserializeFormData(data: any): FormData;
