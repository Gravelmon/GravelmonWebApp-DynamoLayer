"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvolutionNode = exports.EvolutionIdentifier = exports.EvolutionType = exports.EvolutionEntity = void 0;
exports.createEvolutionNode = createEvolutionNode;
exports.createEvolutionNeedsToHoldItemEdge = createEvolutionNeedsToHoldItemEdge;
exports.createEvolutionUseItemOnEdge = createEvolutionUseItemOnEdge;
exports.createEvolutionLearnsMoveUponEvolvingEdge = createEvolutionLearnsMoveUponEvolvingEdge;
const dynamoNodes_1 = require("../../service/dynamoNodes");
const moveNode_1 = require("../battle/moveNode");
const itemNode_1 = require("../minecraft/itemNode");
const resourceLocation_1 = require("../../models/minecraft/resourceLocation");
const pokemonNode_1 = require("./pokemonNode");
const evolutionCondition_1 = require("../../models/properties/evolutionCondition");
const deserializerRegistry_1 = require("../../service/deserializerRegistry");
exports.EvolutionEntity = "Evolution";
const NeedsToHoldEdgeType = "NeedsToHold";
const UseOnEdgeType = "UseOn";
const LearnsUponEvolvingEdgeType = "LearnsUponEvolving";
function createEvolutionNode(evolutionOptions, lastEdited = Date.now()) {
    return new EvolutionNode(evolutionOptions, lastEdited);
}
//edges pointing towards evolution from other nodes, used to easily query all related nodes of an evolution
function createEvolutionNeedsToHoldItemEdge(evolutionName, itemResourceLocation) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(itemNode_1.ItemEntity, itemResourceLocation.toString()), NeedsToHoldEdgeType, evolutionName, exports.EvolutionEntity);
}
function createEvolutionUseItemOnEdge(evolutionName, itemResourceLocation) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(itemNode_1.ItemEntity, itemResourceLocation.toString()), UseOnEdgeType, evolutionName, exports.EvolutionEntity);
}
function createEvolutionLearnsMoveUponEvolvingEdge(evolutionName, moveName) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(moveNode_1.MoveEntity, moveName.toString()), LearnsUponEvolvingEdgeType, evolutionName, exports.EvolutionEntity);
}
var EvolutionType;
(function (EvolutionType) {
    EvolutionType["LevelUp"] = "level_up";
    EvolutionType["ItemInteract"] = "item_interact";
    EvolutionType["Trade"] = "trade";
})(EvolutionType || (exports.EvolutionType = EvolutionType = {}));
class EvolutionIdentifier {
    constructor(source, result) {
        this.source = source;
        this.result = result;
    }
    toString() {
        return `${this.source.toString()}_${this.result.toString()}`;
    }
    static fromString(identifier) {
        const [sourceStr, resultStr] = identifier.split("_");
        return new EvolutionIdentifier(pokemonNode_1.PokemonIdentifier.fromString(sourceStr), pokemonNode_1.PokemonIdentifier.fromString(resultStr));
    }
    serialize() {
        return {
            source: this.source.serialize(),
            result: this.result.serialize()
        };
    }
    static deserialize(data) {
        return new EvolutionIdentifier(pokemonNode_1.PokemonIdentifier.deserialize(data.source), pokemonNode_1.PokemonIdentifier.deserialize(data.result));
    }
}
exports.EvolutionIdentifier = EvolutionIdentifier;
class EvolutionNode extends dynamoNodes_1.DynamoNode {
    constructor(evolutionOptions, lastEdited = Date.now()) {
        super(exports.EvolutionEntity, evolutionOptions.identifier.toString(), EvolutionNode.version, lastEdited);
        this.evolutionOptions = evolutionOptions;
    }
    serialize() {
        return {
            ...super.serialize(),
            evolutionOptions: {
                identifier: this.evolutionOptions.identifier.serialize(),
                evolutionType: this.evolutionOptions.evolutionType,
                consumesHeldItem: this.evolutionOptions.consumesHeldItem,
                isOptional: this.evolutionOptions.isOptional,
                evolutionConditions: this.evolutionOptions.evolutionConditions.map(condition => condition.serialize()),
                needsToHoldItem: this.evolutionOptions.needsToHoldItem?.serialize(),
                useItemOn: this.evolutionOptions.requiresItemUsedOn?.serialize(),
                evolvesFromForm: this.evolutionOptions.evolvesFromForm.serialize(),
                evolvesIntoForm: this.evolutionOptions.evolvesIntoForm.serialize(),
                shedsIntoForm: this.evolutionOptions.shedsIntoForm?.serialize(),
                learnsMoveUponEvolving: this.evolutionOptions.learnsMovesUponEvolving ?
                    this.evolutionOptions.learnsMovesUponEvolving?.map(move => move.serialize())
                    : undefined
            }
        };
    }
    static deserialize(data) {
        const options = data.evolutionOptions;
        if (!options?.identifier?.source || !options?.identifier?.result) {
            throw new Error("Invalid data for deserializing EvolutionNode: missing evolutionIdentifier or source or result");
        }
        const evolutionIdentifier = EvolutionIdentifier.deserialize(options.identifier);
        const evolutionOptions = {
            identifier: evolutionIdentifier,
            evolutionType: options.evolutionType,
            consumesHeldItem: options.consumesHeldItem,
            isOptional: options.isOptional,
            evolutionConditions: Array.isArray(options.evolutionConditions) ?
                options.evolutionConditions.map((condition) => evolutionCondition_1.EvolutionCondition.deserialize(condition))
                : [],
            needsToHoldItem: options.needsToHoldItem ? resourceLocation_1.ResourceLocation.deserialize(options.needsToHoldItem) : undefined,
            requiresItemUsedOn: options.useItemOn ? resourceLocation_1.ResourceLocation.deserialize(options.useItemOn) : undefined,
            evolvesFromForm: pokemonNode_1.PokemonIdentifier.deserialize(options.evolvesFromForm),
            evolvesIntoForm: pokemonNode_1.PokemonIdentifier.deserialize(options.evolvesIntoForm),
            shedsIntoForm: options.shedsIntoForm ? pokemonNode_1.PokemonIdentifier.deserialize(options.shedsIntoForm) : undefined,
            learnsMovesUponEvolving: options.learnsMoveUponEvolving ? options.learnsMoveUponEvolving.map((move) => moveNode_1.MoveIdentifier.deserialize(move)) : undefined
        };
        return new EvolutionNode(evolutionOptions);
    }
}
exports.EvolutionNode = EvolutionNode;
EvolutionNode.version = 1;
deserializerRegistry_1.deserializerRegistry.register(exports.EvolutionEntity, EvolutionNode.deserialize);
