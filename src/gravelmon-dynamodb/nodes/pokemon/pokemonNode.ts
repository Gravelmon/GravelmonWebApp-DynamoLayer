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
    baseStats: Stats;
    rebalancedStats?: Stats;
    evYield: Stats;
    heightInDecimeters: number;
    weightInDeciGrams: number;
    catchRate: number;
    maleRatio: number;
    baseExperience: number;
    baseFriendship: number;
    eggCycles: number;
    pokedexEntry: string;
    hitbox: Hitbox;
    baseScale: number;
    cannotDynamax: boolean;
    dropAmount: number;
    standingEyeHeight?: number;
    behaviourOptions?: BehaviourOptions;
    riding?: RidingOptions;

    //references to related nodes
    typing: {
        primaryType: string;
        secondaryType?: string;
    }
    rebalancedTyping?: {
        primaryType: string;
        secondaryType?: string;
    }
    speciesFeatures: string[];
    labels: string[];
    eggGroups: string[];
    experienceGroup: string;
    gameIntroducedIn: string;
    abilities: {
        identifier: AbilityIdentifier;
        isHidden: boolean;
        isRebalanced: boolean;
        isPlaceholder: boolean;
    }[]
    forms: PokemonIdentifier[];

    moveSet: MoveSet;
    placeholderMoveSet?: MoveSet;
    rebalancedMoveSet?: MoveSet;
}

export function deserializePokemonData(rawData: any): PokemonData {
    return {
        pokemonIdentifier: PokemonIdentifier.deserialize(rawData.pokemonIdentifier),
        baseStats: Stats.deserialize(rawData.baseStats),
        rebalancedStats: rawData.rebalancedStats ? Stats.deserialize(rawData.rebalancedStats) : undefined,
        evYield: Stats.deserialize(rawData.evYield),
        heightInDecimeters: rawData.heightInDecimeters,
        weightInDeciGrams: rawData.weightInDeciGrams,
        catchRate: rawData.catchRate,

        maleRatio: rawData.maleRatio,
        baseExperience: rawData.baseExperience,
        baseFriendship: rawData.baseFriendship,
        eggCycles: rawData.eggCycles,
        pokedexEntry: rawData.pokedexEntry,
        hitbox: new Hitbox(rawData.hitbox.width, rawData.hitbox.height, rawData.hitbox.fixed),
        baseScale: rawData.baseScale,
        cannotDynamax: rawData.cannotDynamax,
        dropAmount: rawData.dropAmount,
        standingEyeHeight: rawData.standingEyeHeight,
        behaviourOptions: rawData.behaviourOptions ? deserializeBehaviourOptions(rawData.behaviourOptions) : undefined,
        riding: rawData.riding ? deserializeRidingOptions(rawData.riding) : undefined,
        typing: {
            primaryType: rawData.typing.primaryType,
            secondaryType: rawData.typing.secondaryType
        },
        rebalancedTyping: {
            primaryType: rawData.rebalancedTyping.primaryType,
            secondaryType: rawData.rebalancedTyping.secondaryType
        },
        speciesFeatures: rawData.speciesFeatures,
        labels: rawData.labels,
        eggGroups: rawData.eggGroups,
        experienceGroup: rawData.experienceGroup,
        gameIntroducedIn: rawData.gameIntroducedIn,
        abilities: rawData.abilities,
        forms: rawData.forms.map((f: any) => PokemonIdentifier.deserialize(f)),
        moveSet: deserializeMoveSet(rawData.moveSet),
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
            baseStats: this.pokemonData.baseStats.serialize(),
            rebalancedStats: this.pokemonData.rebalancedStats?.serialize(),
            evYield: this.pokemonData.evYield.serialize(),
            heightInDecimeters: this.pokemonData.heightInDecimeters,
            weightInDeciGrams: this.pokemonData.weightInDeciGrams,
            catchRate: this.pokemonData.catchRate,
            maleRatio: this.pokemonData.maleRatio,
            baseExperience: this.pokemonData.baseExperience,
            baseFriendship: this.pokemonData.baseFriendship,
            eggCycles: this.pokemonData.eggCycles,
            pokedexEntry: this.pokemonData.pokedexEntry,
            hitbox: {
                width: this.pokemonData.hitbox.width,
                height: this.pokemonData.hitbox.height,
                fixed: this.pokemonData.hitbox.fixed
            },
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
            forms: this.pokemonData.forms.map(f => f.serialize()),
            moveSet: serializeMoveSet(this.pokemonData.moveSet),
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