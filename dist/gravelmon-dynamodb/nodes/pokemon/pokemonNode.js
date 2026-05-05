"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonHasAbilityEdge = exports.PokemonSecondaryTypeEdge = exports.PokemonPrimaryTypeEdge = exports.PokemonNode = exports.Hitbox = exports.PokemonIdentifier = exports.PokemonTypeRelationship = exports.HasAbilityEdgeType = exports.PokemonEntity = void 0;
exports.createPokemonNode = createPokemonNode;
exports.createPokemonPrimaryTypeEdge = createPokemonPrimaryTypeEdge;
exports.createPokemonSecondaryTypeEdge = createPokemonSecondaryTypeEdge;
exports.createPokemonHasLabelEdge = createPokemonHasLabelEdge;
exports.createPokemonInEggGroupEdge = createPokemonInEggGroupEdge;
exports.createPokemonInExperienceGroupEdge = createPokemonInExperienceGroupEdge;
exports.createPokemonHasAbilityEdge = createPokemonHasAbilityEdge;
exports.deserializePokemonData = deserializePokemonData;
exports.getPokemonIdentifier = getPokemonIdentifier;
const dynamoNodes_1 = require("../../service/dynamoNodes");
const abilityNode_1 = require("../battle/abilityNode");
const behaviour_1 = require("../../models/behaviour/behaviour");
const labelNode_1 = require("../properties/labelNode");
const eggGroupNode_1 = require("../properties/eggGroupNode");
const experienceGroupNode_1 = require("../properties/experienceGroupNode");
const stats_1 = require("../../models/properties/stats");
const typeNode_1 = require("../battle/typeNode");
const moveset_1 = require("../../models/battle/moveset");
const deserializerRegistry_1 = require("../../service/deserializerRegistry");
exports.PokemonEntity = "Pokemon";
exports.HasAbilityEdgeType = "HasAbility";
var PokemonTypeRelationship;
(function (PokemonTypeRelationship) {
    PokemonTypeRelationship["PrimaryType"] = "PrimaryType";
    PokemonTypeRelationship["SecondaryType"] = "SecondaryType";
})(PokemonTypeRelationship || (exports.PokemonTypeRelationship = PokemonTypeRelationship = {}));
function createPokemonNode(pokemonData, lastEdited = Date.now()) {
    return new PokemonNode(pokemonData, lastEdited);
}
function createPokemonPrimaryTypeEdge(pokemonName, typeName, isRebalanced = false, lastEdited = Date.now()) {
    return new PokemonPrimaryTypeEdge(pokemonName, typeName, isRebalanced, lastEdited);
}
function createPokemonSecondaryTypeEdge(pokemonName, typeName, isRebalanced = false, lastEdited = Date.now()) {
    return new PokemonSecondaryTypeEdge(pokemonName, typeName, isRebalanced, lastEdited);
}
//edges pointing towards pokemon from other nodes, used to easily query all related nodes of a pokemon
function createPokemonHasLabelEdge(pokemonName, labelName, lastEdited = Date.now()) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(labelNode_1.LabelEntity, labelName), labelNode_1.HasLabelEdgeType, exports.PokemonEntity, pokemonName.toString(), lastEdited);
}
function createPokemonInEggGroupEdge(pokemonName, eggGroupName, lastEdited = Date.now()) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(eggGroupNode_1.EggGroupEntity, eggGroupName), eggGroupNode_1.InEggGroupEdgeType, exports.PokemonEntity, pokemonName.toString(), lastEdited);
}
function createPokemonInExperienceGroupEdge(pokemonName, experienceGroupName, lastEdited = Date.now()) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(experienceGroupNode_1.ExperienceGroupEntity, experienceGroupName), experienceGroupNode_1.InExperienceGroupEdgeType, exports.PokemonEntity, pokemonName.toString(), lastEdited);
}
function createPokemonHasAbilityEdge(pokemonName, abilityName, isHidden = false, isPlaceholder = false, isRebalanced = false, lastEdited = Date.now()) {
    return new PokemonHasAbilityEdge(pokemonName, abilityName, isHidden, isPlaceholder, isRebalanced, lastEdited);
}
class PokemonIdentifier {
    constructor(game, pokemon, formName) {
        this.game = game;
        this.pokemon = pokemon;
        if (Array.isArray(formName)) {
            this.formName = formName.join("-");
        }
        else {
            this.formName = formName;
        }
    }
    toString() {
        const formSuffix = this.formName ? `#${this.formName}` : "";
        return `${this.game}#${this.pokemon}${formSuffix}`;
    }
    static fromString(identifier) {
        const [game, pokemonWithForm] = identifier.split("#");
        const [pokemon, formName] = pokemonWithForm.split("#");
        return new PokemonIdentifier(game, pokemon, formName);
    }
    isForm() {
        return !!this.formName;
    }
    serialize() {
        return {
            game: this.game,
            pokemon: this.pokemon,
            ...(this.formName && { formName: this.formName })
        };
    }
    static deserialize(data) {
        return new PokemonIdentifier(data.game, data.pokemon, data.formName);
    }
}
exports.PokemonIdentifier = PokemonIdentifier;
class Hitbox {
    constructor(width, height, fixed = false) {
        this.width = width;
        this.height = height;
        this.fixed = fixed;
    }
}
exports.Hitbox = Hitbox;
function deserializePokemonData(rawData) {
    return {
        pokemonIdentifier: PokemonIdentifier.deserialize(rawData.pokemonIdentifier),
        baseStats: stats_1.Stats.deserialize(rawData.baseStats),
        rebalancedStats: rawData.rebalancedStats ? stats_1.Stats.deserialize(rawData.rebalancedStats) : undefined,
        evYield: stats_1.Stats.deserialize(rawData.evYield),
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
        behaviourOptions: rawData.behaviourOptions ? (0, behaviour_1.deserializeBehaviourOptions)(rawData.behaviourOptions) : undefined,
        typing: {
            primaryType: rawData.typing.primaryType,
            secondaryType: rawData.typing.secondaryType
        },
        rebalancedTyping: {
            primaryType: rawData.rebalancedTyping.primaryType,
            secondaryType: rawData.rebalancedTyping.secondaryType
        },
        aspects: rawData.aspects,
        labels: rawData.labels,
        eggGroups: rawData.eggGroups,
        experienceGroup: rawData.experienceGroup,
        gameIntroducedIn: rawData.gameIntroducedIn,
        abilities: rawData.abilities,
        forms: rawData.forms.map((f) => PokemonIdentifier.deserialize(f)),
        moveSet: (0, moveset_1.deserializeMoveSet)(rawData.moveSet),
        placeholderMoveSet: rawData.placeholderMoveSet ? (0, moveset_1.deserializeMoveSet)(rawData.placeholderMoveSet) : undefined,
        rebalancedMoveSet: rawData.rebalancedMoveSet ? (0, moveset_1.deserializeMoveSet)(rawData.rebalancedMoveSet) : undefined
    };
}
class PokemonNode extends dynamoNodes_1.DynamoNode {
    constructor(pokemonData, lastEdited = Date.now()) {
        super(exports.PokemonEntity, pokemonData.pokemonIdentifier.toString(), PokemonNode.version, lastEdited);
        this.pokemonData = pokemonData;
    }
    serializePokemonData() {
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
            behaviourOptions: this.pokemonData.behaviourOptions ? (0, behaviour_1.serializeBehaviourOptions)(this.pokemonData.behaviourOptions) : undefined,
            typing: { ...this.pokemonData.typing },
            rebalancedTyping: { ...this.pokemonData.rebalancedTyping },
            aspects: this.pokemonData.aspects,
            labels: this.pokemonData.labels,
            eggGroups: this.pokemonData.eggGroups,
            experienceGroup: this.pokemonData.experienceGroup,
            gameIntroducedIn: this.pokemonData.gameIntroducedIn,
            abilities: this.pokemonData.abilities,
            forms: this.pokemonData.forms.map(f => f.serialize()),
            moveSet: (0, moveset_1.serializeMoveSet)(this.pokemonData.moveSet),
            placeholderMoveSet: this.pokemonData.placeholderMoveSet ? (0, moveset_1.serializeMoveSet)(this.pokemonData.placeholderMoveSet) : undefined,
            rebalancedMoveSet: this.pokemonData.rebalancedMoveSet ? (0, moveset_1.serializeMoveSet)(this.pokemonData.rebalancedMoveSet) : undefined
        };
    }
    serialize() {
        return {
            ...super.serialize(),
            pokemonData: this.serializePokemonData()
        };
    }
    static deserialize(data) {
        const rawData = data.pokemonData;
        const pokemonData = deserializePokemonData(rawData);
        return new PokemonNode(pokemonData, data.lastEdited);
    }
}
exports.PokemonNode = PokemonNode;
PokemonNode.version = 1;
//points towards pokemon from type, used to easily query all pokemon of a type
class PokemonTypeEdge extends dynamoNodes_1.DynamoEdge {
    constructor(pokemonName, typeName, relationship, isRebalanced = false, lastEdited = Date.now()) {
        super((0, dynamoNodes_1.getNodePK)(typeNode_1.TypeEntity, typeName), relationship, exports.PokemonEntity, pokemonName.toString(), PokemonTypeEdge.version, lastEdited);
        this.isRebalanced = isRebalanced;
    }
    serialize() {
        return {
            ...super.serialize(),
            isRebalanced: this.isRebalanced
        };
    }
    static deserialize(data) {
        const relationship = data.entityType;
        const pokemonName = PokemonIdentifier.deserialize(data.target);
        const typeName = (0, dynamoNodes_1.getPkName)(data.PK);
        const isRebalanced = data.isRebalanced || false;
        if (relationship === PokemonTypeRelationship.PrimaryType) {
            return new PokemonPrimaryTypeEdge(pokemonName, typeName, isRebalanced, data.lastEdited);
        }
        else if (relationship === PokemonTypeRelationship.SecondaryType) {
            return new PokemonSecondaryTypeEdge(pokemonName, typeName, isRebalanced, data.lastEdited);
        }
        else {
            throw new Error(`Unknown PokemonTypeRelationship: ${relationship}`);
        }
    }
}
PokemonTypeEdge.version = 1;
class PokemonPrimaryTypeEdge extends PokemonTypeEdge {
    constructor(pokemonName, typeName, isRebalanced = false, lastEdited = Date.now()) {
        super(pokemonName, typeName, PokemonTypeRelationship.PrimaryType, isRebalanced, lastEdited);
    }
}
exports.PokemonPrimaryTypeEdge = PokemonPrimaryTypeEdge;
class PokemonSecondaryTypeEdge extends PokemonTypeEdge {
    constructor(pokemonName, typeName, isRebalanced = false, lastEdited = Date.now()) {
        super(pokemonName, typeName, PokemonTypeRelationship.SecondaryType, isRebalanced, lastEdited);
    }
}
exports.PokemonSecondaryTypeEdge = PokemonSecondaryTypeEdge;
class PokemonHasAbilityEdge extends dynamoNodes_1.DynamoEdge {
    constructor(pokemonName, abilityIdentifier, isHidden = false, isPlaceholder = false, isRebalanced = false, lastEdited = Date.now()) {
        super((0, dynamoNodes_1.getNodePK)(abilityNode_1.AbilityEntity, abilityIdentifier.toString()), exports.HasAbilityEdgeType, exports.PokemonEntity, pokemonName.toString(), PokemonHasAbilityEdge.version, lastEdited);
        this.isHidden = isHidden;
        this.isPlaceholder = isPlaceholder;
        this.isRebalanced = isRebalanced;
        this.recipient = pokemonName;
        this.abilityIdentifier = abilityIdentifier;
    }
    serialize() {
        return {
            ...super.serialize(),
            isHidden: this.isHidden,
            isPlaceholder: this.isPlaceholder,
            isRebalanced: this.isRebalanced,
            recipient: this.recipient.serialize(),
            abilityIdentifier: this.abilityIdentifier.serialize()
        };
    }
    static deserialize(data) {
        const edge = new PokemonHasAbilityEdge(PokemonIdentifier.deserialize(data.recipient), abilityNode_1.AbilityIdentifier.deserialize(data.abilityIdentifier), data.isHidden, data.isPlaceholder, data.isRebalanced, data.lastEdited);
        return edge;
    }
}
exports.PokemonHasAbilityEdge = PokemonHasAbilityEdge;
PokemonHasAbilityEdge.version = 1;
function getPokemonIdentifier(game, pokemon, formName) {
    return new PokemonIdentifier(game, pokemon, formName);
}
deserializerRegistry_1.deserializerRegistry.register(exports.HasAbilityEdgeType, PokemonHasAbilityEdge.deserialize);
deserializerRegistry_1.deserializerRegistry.register(PokemonTypeRelationship.PrimaryType, PokemonTypeEdge.deserialize);
deserializerRegistry_1.deserializerRegistry.register(PokemonTypeRelationship.SecondaryType, PokemonTypeEdge.deserialize);
deserializerRegistry_1.deserializerRegistry.register(exports.PokemonEntity, PokemonNode.deserialize);
