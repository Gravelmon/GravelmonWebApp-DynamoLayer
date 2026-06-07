import {DynamoNode} from '../../service/dynamoNodes';
import {AbilityIdentifier} from '../battle/abilityNode';
import {
    BehaviourOptions,
    deserializeBehaviourOptions,
    serializeBehaviourOptions
} from '../../models/behaviour/behaviour';
import {Stats} from '../../models/properties/stats';
import {deserializeMoveSet, MoveSet, serializeMoveSet} from '../../models/battle/moveset';
import {deserializerRegistry} from '../../service/deserializerRegistry';
import {
    deserializeRidingOptions,
    RidingBehaviourOptions as RidingOptions,
    serializeRidingOptions
} from "../../models";

export const PokemonEntity = "Pokemon";

export class PokemonIdentifier {
    game: string;
    pokemon: string;
    formAspects?: string[];

    constructor(game: string, pokemon: string, formAspects?: string | string[]) {
        this.game = game;
        this.pokemon = pokemon;
        if (Array.isArray(formAspects)) {
            this.formAspects = formAspects;
        } else if (formAspects !== undefined) {
            this.formAspects = [formAspects];
        } else {
            this.formAspects = [];
        }
    }

    toString(): string {
        const formSuffix = this.formAspects && this.formAspects.length > 0 ? `#${this.formAspects.join(",")}` : "";
        return `${this.game}#${this.pokemon}${formSuffix}`;
    }

    isForm(): boolean {
        return this.formAspects !== undefined && this.formAspects.length > 0 && !(this.formAspects.length === 1 && ["normal", "Normal"].includes(this.formAspects[0]));
    }

    serialize(): any {
        return {
            game: this.game,
            pokemon: this.pokemon,
            ...(this.formAspects && this.formAspects.length > 0 && {formAspects: this.formAspects})
        }
    }

    static deserialize(data: any): PokemonIdentifier {
        if(!data) {
            throw new Error("data was undefined for PokemonIdentifier.deserialize");
        }
        if(!data.game) {
            throw new Error("game was undefined for PokemonIdentifier.deserialize: " + JSON.stringify(data));
        }
        if(!data.pokemon) {
            throw new Error("pokemon was undefined for PokemonIdentifier.deserialize: " + JSON.stringify(data));
        }
        if(data.formAspects && !Array.isArray(data.formAspects)) {
            throw new Error("formAspects was not an array for PokemonIdentifier.deserialize: " + JSON.stringify(data));
        }
        return new PokemonIdentifier(data.game, data.pokemon, data.formAspects);
    }
}

export class Hitbox {
    width: number;
    height: number;
    fixed?: boolean;

    constructor(width: number, height: number, fixed: boolean = false) {
        this.width = width;
        this.height = height;
        this.fixed = fixed;
    }
}

export interface PokemonData {
    pokemonIdentifier: PokemonIdentifier;
    baseStats?: Stats;
    rebalancedStats?: Stats;
    evYield?: Stats;
    heightInDecimeters?: number;
    weightInDeciGrams?: number;
    catchRate?: number;
    maleRatio?: number;
    baseExperience?: number;
    baseFriendship?: number;
    eggCycles?: number;
    pokedexEntry?: string;
    hitbox?: Hitbox;
    baseScale?: number;
    cannotDynamax?: boolean;
    dropAmount?: number;
    standingEyeHeight?: number;
    behaviourOptions?: BehaviourOptions;
    riding?: RidingOptions;

    //references to related nodes
    typing?: {
        primaryType: string;
        secondaryType?: string;
    }
    rebalancedTyping?: {
        primaryType: string;
        secondaryType?: string;
    }
    speciesFeatures?: string[];
    labels?: string[];
    eggGroups?: string[];
    experienceGroup?: string;
    gameIntroducedIn?: string;
    abilities?: {
        identifier: AbilityIdentifier;
        isHidden: boolean;
        isRebalanced: boolean;
        isPlaceholder: boolean;
    }[]
    forms?: PokemonIdentifier[];

    moveSet?: MoveSet;
    placeholderMoveSet?: MoveSet;
    rebalancedMoveSet?: MoveSet;
}

export function deserializePokemonData(rawData: any): PokemonData {
        console.log(rawData);
    if (rawData.pokemonIdentifier === undefined) {
        throw new Error("pokemonIdentifier was undefined")
    }
    if (rawData.pokemonIdentifier.game === undefined) throw new Error("game was undefined")
    let pokemonIdentifier: PokemonIdentifier = PokemonIdentifier.deserialize(rawData.pokemonIdentifier);
    return {
        pokemonIdentifier: pokemonIdentifier,
        baseStats: rawData.baseStats ? Stats.deserialize(rawData.baseStats) : undefined,
        rebalancedStats: rawData.rebalancedStats ? Stats.deserialize(rawData.rebalancedStats) : undefined,
        evYield: rawData.evYield ? Stats.deserialize(rawData.evYield) : undefined,
        heightInDecimeters: rawData.heightInDecimeters !== undefined ? rawData.heightInDecimeters : undefined,
        weightInDeciGrams: rawData.weightInDeciGrams !== undefined ? rawData.weightInDeciGrams : undefined,
        catchRate: rawData.catchRate !== undefined ? rawData.catchRate : undefined,

        maleRatio: rawData.maleRatio !== undefined ? rawData.maleRatio : undefined,
        baseExperience: rawData.baseExperience !== undefined ? rawData.baseExperience : undefined,
        baseFriendship: rawData.baseFriendship !== undefined ? rawData.baseFriendship : undefined,
        eggCycles: rawData.eggCycles !== undefined ? rawData.eggCycles : undefined,
        pokedexEntry: rawData.pokedexEntry !== undefined ? rawData.pokedexEntry : undefined,
        hitbox: rawData.hitbox ? new Hitbox(rawData.hitbox.width, rawData.hitbox.height, rawData.hitbox.fixed) : undefined,
        baseScale: rawData.baseScale !== undefined ? rawData.baseScale : undefined,
        cannotDynamax: rawData.cannotDynamax !== undefined ? rawData.cannotDynamax : undefined,
        dropAmount: rawData.dropAmount !== undefined ? rawData.dropAmount : undefined,
        standingEyeHeight: rawData.standingEyeHeight !== undefined ? rawData.standingEyeHeight : undefined,
        behaviourOptions: rawData.behaviourOptions ? deserializeBehaviourOptions(rawData.behaviourOptions) : undefined,
        riding: rawData.riding ? deserializeRidingOptions(rawData.riding) : undefined,
        typing: rawData.typing ? {
            primaryType: rawData.typing.primaryType,
            secondaryType: rawData.typing.secondaryType
        } : undefined,
        rebalancedTyping: rawData.rebalancedTyping ? {
            primaryType: rawData.rebalancedTyping.primaryType,
            secondaryType: rawData.rebalancedTyping.secondaryType
        } : undefined,
        speciesFeatures: rawData.speciesFeatures !== undefined ? rawData.speciesFeatures : undefined,
        labels: rawData.labels !== undefined ? rawData.labels : undefined,
        eggGroups: rawData.eggGroups !== undefined ? rawData.eggGroups : undefined,
        experienceGroup: rawData.experienceGroup !== undefined ? rawData.experienceGroup : undefined,
        gameIntroducedIn: rawData.gameIntroducedIn !== undefined ? rawData.gameIntroducedIn : undefined,
        abilities: rawData.abilities !== undefined ? rawData.abilities : undefined,
        forms: rawData.forms ? rawData.forms.map((f: any) => PokemonIdentifier.deserialize(f)) : undefined,
        moveSet: rawData.moveSet ? deserializeMoveSet(rawData.moveSet) : undefined,
        placeholderMoveSet: rawData.placeholderMoveSet ? deserializeMoveSet(rawData.placeholderMoveSet) : undefined,
        rebalancedMoveSet: rawData.rebalancedMoveSet ? deserializeMoveSet(rawData.rebalancedMoveSet) : undefined
    };
}

export class PokemonNode extends DynamoNode {
    pokemonData: PokemonData;
    static version = 1;

    constructor(pokemonData: PokemonData, lastEdited: number = Date.now()) {
        super(PokemonEntity, pokemonData.pokemonIdentifier.toString(), PokemonNode.version, lastEdited);
        this.pokemonData = pokemonData;
    }

    public serializePokemonData(): Record<string, any> {
        return {
            pokemonIdentifier: this.pokemonData.pokemonIdentifier.serialize(),
            baseStats: this.pokemonData.baseStats ? this.pokemonData.baseStats.serialize() : undefined,
            rebalancedStats: this.pokemonData.rebalancedStats?.serialize(),
            evYield: this.pokemonData.evYield ? this.pokemonData.evYield.serialize() : undefined,
            heightInDecimeters: this.pokemonData.heightInDecimeters,
            weightInDeciGrams: this.pokemonData.weightInDeciGrams,
            catchRate: this.pokemonData.catchRate,
            maleRatio: this.pokemonData.maleRatio,
            baseExperience: this.pokemonData.baseExperience,
            baseFriendship: this.pokemonData.baseFriendship,
            eggCycles: this.pokemonData.eggCycles,
            pokedexEntry: this.pokemonData.pokedexEntry,
            hitbox: this.pokemonData.hitbox ? {
                width: this.pokemonData.hitbox.width,
                height: this.pokemonData.hitbox.height,
                fixed: this.pokemonData.hitbox.fixed
            } : undefined,
            baseScale: this.pokemonData.baseScale,
            cannotDynamax: this.pokemonData.cannotDynamax,
            dropAmount: this.pokemonData.dropAmount,
            standingEyeHeight: this.pokemonData.standingEyeHeight,
            behaviourOptions: this.pokemonData.behaviourOptions ? serializeBehaviourOptions(this.pokemonData.behaviourOptions) : undefined,
            riding: this.pokemonData.riding ? serializeRidingOptions(this.pokemonData.riding) : undefined,
            typing: {...this.pokemonData.typing},
            rebalancedTyping: {...this.pokemonData.rebalancedTyping},
            speciesFeatures: this.pokemonData.speciesFeatures,
            labels: this.pokemonData.labels,
            eggGroups: this.pokemonData.eggGroups,
            experienceGroup: this.pokemonData.experienceGroup,
            gameIntroducedIn: this.pokemonData.gameIntroducedIn,
            abilities: this.pokemonData.abilities,
            forms: this.pokemonData.forms ? this.pokemonData.forms.map(f => f.serialize()) : undefined,
            moveSet: this.pokemonData.moveSet ? serializeMoveSet(this.pokemonData.moveSet) : undefined,
            placeholderMoveSet: this.pokemonData.placeholderMoveSet ? serializeMoveSet(this.pokemonData.placeholderMoveSet) : undefined,
            rebalancedMoveSet: this.pokemonData.rebalancedMoveSet ? serializeMoveSet(this.pokemonData.rebalancedMoveSet) : undefined
        };
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            pokemonData: this.serializePokemonData()
        }
    }

    static deserialize(data: Record<string, any>): PokemonNode {
        const rawData = data.pokemonData;
        const pokemonData: PokemonData = deserializePokemonData(rawData)
        return new PokemonNode(pokemonData, data.lastEdited);
    }
}

export function getPokemonIdentifier(game: string, pokemon: string, formName?: string | string[]): PokemonIdentifier {
    return new PokemonIdentifier(game, pokemon, formName);
}

deserializerRegistry.register(PokemonEntity, PokemonNode.deserialize);