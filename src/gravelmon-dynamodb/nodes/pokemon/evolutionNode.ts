import { MoveIdentifier } from '../battle/moveNode';
import { ResourceLocation } from '../../models/minecraft/resourceLocation';
import { PokemonIdentifier } from './pokemonNode';
import { EvolutionCondition } from '../../models/properties/evolutionCondition';
import {deserializerRegistry} from "../../service/deserializerRegistry";
import {DynamoNode} from "../../service";

export const EvolutionEntity = "Evolution";

export enum EvolutionType {
    LevelUp = "level_up",
    ItemInteract = "item_interact",
    Trade = "trade"
}

export interface EvolutionOptions {
    evolutionType: EvolutionType;
    
    consumesHeldItem?: boolean;
    isOptional?: boolean;
    evolutionConditions: EvolutionCondition<any>[]
    needsToHoldItem?: ResourceLocation;
    requiresItemUsedOn?: ResourceLocation;
    shedsIntoForm?: PokemonIdentifier;
    learnsMovesUponEvolving?: MoveIdentifier[];
}

export function deserializeEvolutionOptions(options : any) {
     return {
        evolutionType: options.evolutionType,
        consumesHeldItem: options.consumesHeldItem,
        isOptional: options.isOptional,
        evolutionConditions: Array.isArray(options.evolutionConditions) ?
            options.evolutionConditions.map((condition: any) => EvolutionCondition.deserialize(condition))
            : [],
        needsToHoldItem: options.needsToHoldItem ? ResourceLocation.deserialize(options.needsToHoldItem) : undefined,
        requiresItemUsedOn: options.useItemOn ? ResourceLocation.deserialize(options.useItemOn) : undefined,
        shedsIntoForm: options.shedsIntoForm ? PokemonIdentifier.deserialize(options.shedsIntoForm) : undefined,
        learnsMovesUponEvolving: options.learnsMoveUponEvolving ? options.learnsMoveUponEvolving.map((move:any)  => MoveIdentifier.deserialize(move)) : undefined
    }
}

export function serializeEvolutionOptions(evolutionOptions: EvolutionOptions) {
    return {
        evolutionType: evolutionOptions.evolutionType,
        consumesHeldItem: evolutionOptions.consumesHeldItem,
        isOptional: evolutionOptions.isOptional,
        evolutionConditions: evolutionOptions.evolutionConditions.map(condition => condition.serialize()),
        needsToHoldItem: evolutionOptions.needsToHoldItem?.serialize(),
        useItemOn: evolutionOptions.requiresItemUsedOn?.serialize(),
        shedsIntoForm: evolutionOptions.shedsIntoForm?.serialize(),
        learnsMoveUponEvolving: evolutionOptions.learnsMovesUponEvolving ?
            evolutionOptions.learnsMovesUponEvolving?.map(move => move.serialize())
            : undefined
    }
}

export class EvolutionNode extends DynamoNode {
    currentPokemon: PokemonIdentifier;

    // identifiers of resulting evolutions
    evolutions: PokemonIdentifier[];

    // identifiers of pre-evolutions
    preEvolutions: PokemonIdentifier[];
    evolutionOptions: EvolutionOptions;
    static version = 1;

    constructor(
        currentPokemon: PokemonIdentifier,
        evolutionOptions: EvolutionOptions,
        evolutions: PokemonIdentifier[],
        preEvolutions: PokemonIdentifier[],
        lastEdited: number = Date.now()
    ) {
        super(EvolutionEntity, currentPokemon.toString(), EvolutionNode.version, lastEdited);
        this.evolutionOptions = evolutionOptions;
        this.currentPokemon = currentPokemon;
        this.evolutions = evolutions;
        this.preEvolutions = preEvolutions;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            currentPokemon: this.currentPokemon.serialize(),
            evolutions: this.evolutions.map(p => p.serialize()),
            preEvolutions: this.preEvolutions.map(p => p.serialize()),
            evolutionOptions: serializeEvolutionOptions(this.evolutionOptions)
        }
    }

    static deserialize(data: any): EvolutionNode {
        const currentPokemon = PokemonIdentifier.deserialize(data.currentPokemon);
        const evolutions: PokemonIdentifier[] = [];
        const preEvolutions: PokemonIdentifier[] = [];
        if (data.evolutions) {
            data.evolutions.forEach((evolution: any) => {
                evolutions.push(evolution);
            });
        }
        if (data.preEvolutions) {
            data.preEvolutions.forEach((preEvolution: any) => {
                preEvolutions.push(preEvolution);
            });
        }


        return new EvolutionNode(currentPokemon, deserializeEvolutionOptions(data.evolutionOptions), evolutions, preEvolutions, data.lastEdited);
    }
}

deserializerRegistry.register(EvolutionEntity, EvolutionNode.deserialize);