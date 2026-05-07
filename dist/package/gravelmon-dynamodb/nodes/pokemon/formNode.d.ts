import { DynamoEdge } from '../../service/dynamoNodes';
import { GenderDifferenceNode as GenderDifference } from '../../models/assets/genderDifference';
import { PokemonData, PokemonIdentifier, PokemonNode } from './pokemonNode';
import { AbilityIdentifier } from "../battle/abilityNode";
import { NumberRange } from "../../models/properties/numberRange";
import { ResourceLocation } from "../../models/minecraft/resourceLocation";
import { EvolutionIdentifier } from './evolutionNode';
import { ResolverData } from '../../models/assets/resolverData';
import { PosingData } from '../../models/assets/posing/posingFileData';
import { SpawnData as SpawnData } from '../../models/spawning/spawnData';
export declare const FormEntity = "Form";
export declare const IsFormOfEdgeType = "IsFormOf";
export declare const DropsItemEdgeType = "DropsItem";
export declare function createFormNode(pokemonData: PokemonData, formData: FormData, lastEdited?: number): FormNode;
export declare function createFormPrimaryTypeEdge(formName: PokemonIdentifier, typeName: string, isRebalanced?: boolean, lastEdited?: number): FormTypeEdge;
export declare function createFormSecondaryTypeEdge(formName: PokemonIdentifier, typeName: string, isRebalanced?: boolean, lastEdited?: number): FormTypeEdge;
export declare function createFormHasAspectEdge(formName: PokemonIdentifier, aspectName: string, lastEdited?: number): DynamoEdge;
export declare function createFormHasLabelEdge(formName: PokemonIdentifier, labelName: string, lastEdited?: number): DynamoEdge;
export declare function createFormHasAbilityEdge(formName: PokemonIdentifier, abilityName: AbilityIdentifier, isHidden?: boolean, isPlaceholder?: boolean, isRebalanced?: boolean, lastEdited?: number): DynamoEdge;
export declare function createFormDropsItemEdge(formName: PokemonIdentifier, itemName: ResourceLocation, dropChance: number, quantityRange: NumberRange, lastEdited?: number): FormDropsItemEdge;
export interface LightingData {
    lightLevel: number;
    liquidGlowMode: undefined | "LAND";
}
export interface FormData {
    genderDifference?: GenderDifference;
    lightingData?: LightingData;
    evolutions?: EvolutionIdentifier[];
    isFormOf: PokemonIdentifier;
    affectedByMechanics?: string[];
    resolverData?: ResolverData;
    posingData?: PosingData;
    aspects: string[];
    spawnData?: SpawnData[];
    revivesFromFossil?: string;
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
export declare class FormDropsItemEdge extends DynamoEdge {
    dropChance: number;
    quantityRange: NumberRange;
    droppingPokemon: PokemonIdentifier;
    droppedItem: ResourceLocation;
    static version: number;
    constructor(formName: PokemonIdentifier, itemName: ResourceLocation, dropChance: number, quantityRange: NumberRange, lastEdited?: number);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): FormDropsItemEdge;
}
declare abstract class FormTypeEdge extends DynamoEdge {
    isRebalanced: boolean;
    static version: number;
    constructor(pokemonName: PokemonIdentifier, typeName: string, relationship: FormTypeRelationship, isRebalanced?: boolean, lastEdited?: number);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): FormTypeEdge;
}
export declare class FormPrimaryTypeEdge extends FormTypeEdge {
    constructor(pokemonName: PokemonIdentifier, typeName: string, isRebalanced?: boolean, lastEdited?: number);
}
export declare class FormSecondaryTypeEdge extends FormTypeEdge {
    constructor(pokemonName: PokemonIdentifier, typeName: string, isRebalanced?: boolean, lastEdited?: number);
}
export declare class FormHasAbilityEdge extends DynamoEdge {
    isHidden: boolean;
    isPlaceholder: boolean;
    isRebalanced: boolean;
    static version: number;
    recipient: PokemonIdentifier;
    abilityIdentifier: AbilityIdentifier;
    constructor(pokemonName: PokemonIdentifier, abilityIdentifier: AbilityIdentifier, isHidden?: boolean, isPlaceholder?: boolean, isRebalanced?: boolean, lastEdited?: number);
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): FormHasAbilityEdge;
}
export declare const FormHasAbilityEdgeType = "FormHasAbility";
export declare enum FormTypeRelationship {
    PrimaryType = "FormPrimaryType",
    SecondaryType = "FormSecondaryType"
}
export {};
