import { GenderDifferenceNode as GenderDifference } from '../../models/assets/genderDifference';
import { PokemonData, PokemonIdentifier, PokemonNode } from './pokemonNode';
import { NumberRange } from "../../models";
import { ResourceLocation } from "../../models";
import { ResolverData } from '../../models';
import { PosingData } from '../../models';
import { SpawnData as SpawnData } from '../../models/spawning/spawnData';
export declare const FormEntity = "Form";
export declare const enum ItemDropMethod {
    ON_ENTITY = 0,
    ON_PLAYER = 1,
    TO_INVENTORY = 2
}
export interface ItemDrop {
    percentage: number;
    quantity?: number;
    quantityRange?: NumberRange;
    maxSelectableItems?: number;
    dropMethod: ItemDropMethod;
    item: ResourceLocation;
}
export declare enum LiquidGlowMode {
    LAND = 0,
    UNDERWATER = 1,
    BOTH = 2
}
export interface LightingData {
    lightLevel: number;
    liquidGlowMode?: LiquidGlowMode;
}
export interface MechanicInteraction {
    mechanic: string;
    resultingForms: PokemonIdentifier[];
}
export interface DropData {
    dropAmount?: number;
    drops?: ItemDrop[];
}
export interface FormData {
    genderDifference?: GenderDifference;
    lightingData?: LightingData;
    isFormOf: PokemonIdentifier;
    affectedByMechanics?: string[];
    resolverData?: ResolverData;
    posingData?: PosingData;
    speciesFeatures: string[];
    spawnData?: SpawnData[];
    revivesFromFossils?: string[];
    dropData?: DropData;
    mechanicInteractions?: MechanicInteraction[];
    addedByGame?: string;
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
