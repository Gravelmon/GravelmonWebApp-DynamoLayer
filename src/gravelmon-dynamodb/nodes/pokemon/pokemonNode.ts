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

export const PokemonEntity = "Pokemon";

export const HasAbilityEdgeType = "HasAbility";

export class PokemonIdentifier {
    game: string;
    pokemon: string;
    formName?: string;

    constructor(game: string, pokemon: string, formName?: string | string[]) {
        this.game = game;
        this.pokemon = pokemon;
        if (Array.isArray(formName)) {
            this.formName = formName.join("-");
        } else {
            this.formName = formName;
        }
    }

    toString(): string {
        const formSuffix = this.formName ? `#${this.formName}` : "";
        return `${this.game}#${this.pokemon}${formSuffix}`;
    }

    static fromString(identifier: string): PokemonIdentifier {
        const [game, pokemonWithForm] = identifier.split("#");
        const [pokemon, formName] = pokemonWithForm.split("#");
        return new PokemonIdentifier(game, pokemon, formName);
    }

    isForm(): boolean {
        return !!this.formName;
    }

    serialize(): any {
        return {
            game: this.game,
            pokemon: this.pokemon,
            ...(this.formName && {formName: this.formName})
        }
    }

    static deserialize(data: any): PokemonIdentifier {
        return new PokemonIdentifier(data.game, data.pokemon, data.formName);
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
    heightInMeters: number;
    weightInKg: number;
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
    behaviourOptions?: BehaviourOptions;

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
        heightInMeters: rawData.heightInMeters,
        weightInKg: rawData.weightInKg,
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
        behaviourOptions: rawData.behaviourOptions ? deserializeBehaviourOptions(rawData.behaviourOptions) : undefined,
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
            heightInMeters: this.pokemonData.heightInMeters,
            weightInKg: this.pokemonData.weightInKg,
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
            behaviourOptions: this.pokemonData.behaviourOptions ? serializeBehaviourOptions(this.pokemonData.behaviourOptions) : undefined,
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