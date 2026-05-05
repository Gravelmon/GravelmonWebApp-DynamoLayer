"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormTypeRelationship = exports.FormHasAbilityEdgeType = exports.FormHasAbilityEdge = exports.FormSecondaryTypeEdge = exports.FormPrimaryTypeEdge = exports.FormDropsItemEdge = exports.FormNode = exports.DropsItemEdgeType = exports.IsFormOfEdgeType = exports.FormEntity = void 0;
exports.createFormNode = createFormNode;
exports.createFormPrimaryTypeEdge = createFormPrimaryTypeEdge;
exports.createFormSecondaryTypeEdge = createFormSecondaryTypeEdge;
exports.createFormHasAspectEdge = createFormHasAspectEdge;
exports.createFormHasLabelEdge = createFormHasLabelEdge;
exports.createFormHasAbilityEdge = createFormHasAbilityEdge;
exports.createFormDropsItemEdge = createFormDropsItemEdge;
exports.serializeFormData = serializeFormData;
exports.deserializeFormData = deserializeFormData;
const dynamoNodes_1 = require("../../service/dynamoNodes");
const pokemonNode_1 = require("./pokemonNode");
const aspectNode_1 = require("../properties/aspectNode");
const labelNode_1 = require("../properties/labelNode");
const typeNode_1 = require("../battle/typeNode");
const abilityNode_1 = require("../battle/abilityNode");
const numberRange_1 = require("../../models/properties/numberRange");
const itemNode_1 = require("../minecraft/itemNode");
const resourceLocation_1 = require("../../models/minecraft/resourceLocation");
const evolutionNode_1 = require("./evolutionNode");
const resolverData_1 = require("../../models/assets/resolverData");
const posingFileData_1 = require("../../models/assets/posing/posingFileData");
const spawnData_1 = require("../../models/spawning/spawnData");
const deserializerRegistry_1 = require("../../service/deserializerRegistry");
exports.FormEntity = "Form";
exports.IsFormOfEdgeType = "IsFormOf";
exports.DropsItemEdgeType = "DropsItem";
function createFormNode(pokemonData, formData, lastEdited = Date.now()) {
    return new FormNode(pokemonData, formData, lastEdited);
}
function createFormPrimaryTypeEdge(formName, typeName, isRebalanced = false, lastEdited = Date.now()) {
    return new FormPrimaryTypeEdge(formName, typeName, isRebalanced, lastEdited);
}
function createFormSecondaryTypeEdge(formName, typeName, isRebalanced = false, lastEdited = Date.now()) {
    return new FormSecondaryTypeEdge(formName, typeName, isRebalanced, lastEdited);
}
function createFormHasAspectEdge(formName, aspectName, lastEdited = Date.now()) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(aspectNode_1.AspectEntity, aspectName), aspectNode_1.HasAspectEdgeType, exports.FormEntity, formName.toString(), lastEdited);
}
function createFormHasLabelEdge(formName, labelName, lastEdited = Date.now()) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(labelNode_1.LabelEntity, labelName), labelNode_1.HasLabelEdgeType, exports.FormEntity, formName.toString(), lastEdited);
}
function createFormHasAbilityEdge(formName, abilityName, isHidden = false, isPlaceholder = false, isRebalanced = false, lastEdited = Date.now()) {
    return new FormHasAbilityEdge(formName, abilityName, isHidden, isPlaceholder, isRebalanced, lastEdited);
}
function createFormDropsItemEdge(formName, itemName, dropChance, quantityRange, lastEdited = Date.now()) {
    return new FormDropsItemEdge(formName, itemName, dropChance, quantityRange, lastEdited);
}
class FormNode extends pokemonNode_1.PokemonNode {
    constructor(pokemonData, formData, lastEdited = Date.now()) {
        super(pokemonData, lastEdited);
        this.PK = (0, dynamoNodes_1.getNodePK)(exports.FormEntity, this.name);
        this.entityType = exports.FormEntity;
        this.formData = formData;
        this.version = FormNode.version;
    }
    static deserialize(data) {
        const pokemonData = (0, pokemonNode_1.deserializePokemonData)(data.pokemonData);
        const formData = deserializeFormData(data.formData);
        return new FormNode(pokemonData, formData, data.lastEdited);
    }
    serialize() {
        return {
            ...super.serialize(),
            formData: serializeFormData(this.formData)
        };
    }
}
exports.FormNode = FormNode;
FormNode.version = 1;
function serializeFormData(formData) {
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
        resolverData: formData.resolverData ? (0, resolverData_1.serializeResolverData)(formData.resolverData) : undefined,
        posingData: formData.posingData ? (0, posingFileData_1.serializePosingData)(formData.posingData) : undefined,
        aspects: formData.aspects,
        spawnData: formData.spawnData ? formData.spawnData.map(spawnData_1.serializeSpawnData) : undefined
    };
}
function deserializeFormData(data) {
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
        evolutions: data.evolutions?.map((evolution) => evolutionNode_1.EvolutionIdentifier.deserialize(evolution)),
        isFormOf: pokemonNode_1.PokemonIdentifier.deserialize(data.isFormOf),
        affectedByMechanics: data.affectedByMechanics,
        resolverData: (0, resolverData_1.deserializeResolverData)(data.resolverData),
        posingData: (0, posingFileData_1.deserializePosingData)(data.posingData),
        aspects: data.aspects,
        spawnData: data.spawnData ? data.spawnData.map(spawnData_1.deserializeSpawnData) : undefined
    };
}
class FormDropsItemEdge extends dynamoNodes_1.DynamoEdge {
    constructor(formName, itemName, dropChance, quantityRange, lastEdited = Date.now()) {
        super((0, dynamoNodes_1.getNodePK)(itemNode_1.ItemEntity, itemName.toString()), exports.DropsItemEdgeType, exports.FormEntity, formName.toString(), FormDropsItemEdge.version, lastEdited);
        this.dropChance = dropChance;
        this.quantityRange = quantityRange;
        this.droppingPokemon = formName;
        this.droppedItem = itemName;
    }
    serialize() {
        return {
            ...super.serialize(),
            dropChance: this.dropChance,
            quantityRange: this.quantityRange.serialize(),
            droppingPokemon: this.droppingPokemon.serialize(),
            droppedItem: this.droppedItem.serialize()
        };
    }
    static deserialize(data) {
        return new FormDropsItemEdge(pokemonNode_1.PokemonIdentifier.deserialize(data.droppingPokemon), resourceLocation_1.ResourceLocation.deserialize(data.droppedItem), data.dropChance, numberRange_1.NumberRange.deserialize(data.quantityRange), data.lastEdited);
    }
}
exports.FormDropsItemEdge = FormDropsItemEdge;
FormDropsItemEdge.version = 1;
class FormTypeEdge extends dynamoNodes_1.DynamoEdge {
    constructor(pokemonName, typeName, relationship, isRebalanced = false, lastEdited = Date.now()) {
        super((0, dynamoNodes_1.getNodePK)(typeNode_1.TypeEntity, typeName), relationship, exports.FormEntity, pokemonName.toString(), FormTypeEdge.version, lastEdited);
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
        const pokemonName = pokemonNode_1.PokemonIdentifier.deserialize(data.target);
        const typeName = (0, dynamoNodes_1.getPkName)(data.PK);
        const isRebalanced = data.isRebalanced || false;
        if (relationship === FormTypeRelationship.PrimaryType) {
            return new FormPrimaryTypeEdge(pokemonName, typeName, isRebalanced, data.lastEdited);
        }
        else if (relationship === FormTypeRelationship.SecondaryType) {
            return new FormSecondaryTypeEdge(pokemonName, typeName, isRebalanced, data.lastEdited);
        }
        else {
            throw new Error(`Unknown PokemonTypeRelationship: ${relationship}`);
        }
    }
}
FormTypeEdge.version = 1;
class FormPrimaryTypeEdge extends FormTypeEdge {
    constructor(pokemonName, typeName, isRebalanced = false, lastEdited = Date.now()) {
        super(pokemonName, typeName, FormTypeRelationship.PrimaryType, isRebalanced, lastEdited);
    }
}
exports.FormPrimaryTypeEdge = FormPrimaryTypeEdge;
class FormSecondaryTypeEdge extends FormTypeEdge {
    constructor(pokemonName, typeName, isRebalanced = false, lastEdited = Date.now()) {
        super(pokemonName, typeName, FormTypeRelationship.SecondaryType, isRebalanced, lastEdited);
    }
}
exports.FormSecondaryTypeEdge = FormSecondaryTypeEdge;
class FormHasAbilityEdge extends dynamoNodes_1.DynamoEdge {
    constructor(pokemonName, abilityIdentifier, isHidden = false, isPlaceholder = false, isRebalanced = false, lastEdited = Date.now()) {
        super((0, dynamoNodes_1.getNodePK)(abilityNode_1.AbilityEntity, abilityIdentifier.toString()), exports.FormHasAbilityEdgeType, exports.FormEntity, pokemonName.toString(), FormHasAbilityEdge.version, lastEdited);
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
        const edge = new FormHasAbilityEdge(pokemonNode_1.PokemonIdentifier.deserialize(data.recipient), abilityNode_1.AbilityIdentifier.deserialize(data.abilityIdentifier), data.isHidden, data.isPlaceholder, data.isRebalanced, data.lastEdited);
        return edge;
    }
}
exports.FormHasAbilityEdge = FormHasAbilityEdge;
FormHasAbilityEdge.version = 1;
exports.FormHasAbilityEdgeType = "FormHasAbility";
var FormTypeRelationship;
(function (FormTypeRelationship) {
    FormTypeRelationship["PrimaryType"] = "FormPrimaryType";
    FormTypeRelationship["SecondaryType"] = "FormSecondaryType";
})(FormTypeRelationship || (exports.FormTypeRelationship = FormTypeRelationship = {}));
deserializerRegistry_1.deserializerRegistry.register(exports.FormHasAbilityEdgeType, FormHasAbilityEdge.deserialize);
deserializerRegistry_1.deserializerRegistry.register(FormTypeRelationship.PrimaryType, FormTypeEdge.deserialize);
deserializerRegistry_1.deserializerRegistry.register(FormTypeRelationship.SecondaryType, FormTypeEdge.deserialize);
deserializerRegistry_1.deserializerRegistry.register(exports.FormEntity, FormNode.deserialize);
deserializerRegistry_1.deserializerRegistry.register(exports.DropsItemEdgeType, FormDropsItemEdge.deserialize);
