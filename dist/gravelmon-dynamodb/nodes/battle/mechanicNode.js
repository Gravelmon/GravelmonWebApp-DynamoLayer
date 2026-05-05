"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MechanicNode = exports.AffectsFormEdgeType = exports.UsesItemEdgeType = exports.MechanicEntity = void 0;
exports.createMechanicNode = createMechanicNode;
exports.createMechanicAffectsFormEdge = createMechanicAffectsFormEdge;
exports.createMechanicUsesItemEdge = createMechanicUsesItemEdge;
const dynamoNodes_1 = require("../../service/dynamoNodes");
const resourceLocation_1 = require("../../models/minecraft/resourceLocation");
const itemNode_1 = require("../minecraft/itemNode");
const pokemonNode_1 = require("../pokemon/pokemonNode");
const formNode_1 = require("../pokemon/formNode");
const deserializerRegistry_1 = require("../../service/deserializerRegistry");
exports.MechanicEntity = "Mechanic";
exports.UsesItemEdgeType = "UsesItem";
exports.AffectsFormEdgeType = "AffectsForm";
class MechanicNode extends dynamoNodes_1.DynamoNode {
    constructor(name, description, usesItems, affectsForms) {
        super(exports.MechanicEntity, name);
        this.description = description;
        this.usesItems = usesItems;
        this.affectsForms = affectsForms;
    }
    static deserialize(data) {
        return new MechanicNode(data.name, data.description, data.usesItems ? data.usesItems.map((item) => resourceLocation_1.ResourceLocation.deserialize(item)) : undefined, data.affectsForms ? data.affectsForms.map((item) => pokemonNode_1.PokemonIdentifier.deserialize(item)) : undefined);
    }
    serialize() {
        return {
            ...super.serialize(),
            description: this.description ? this.description : undefined,
            usesItems: this.usesItems ? this.usesItems.map((item) => item.serialize()) : undefined,
            affectsForms: this.affectsForms ? this.affectsForms.map((item) => item.serialize()) : undefined
        };
    }
}
exports.MechanicNode = MechanicNode;
function createMechanicNode(name, description, usesItems, affectsForms) {
    return new MechanicNode(name, description, usesItems, affectsForms);
}
//This is not supposed to point towards the mega evolution in case of the mega evolution mechanic, but the base form
function createMechanicAffectsFormEdge(mechanicName, pokemonIdentifier) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(formNode_1.FormEntity, pokemonIdentifier.toString()), exports.AffectsFormEdgeType, exports.MechanicEntity, mechanicName);
}
function createMechanicUsesItemEdge(mechanicName, item) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(itemNode_1.ItemEntity, item.toString()), exports.AffectsFormEdgeType, exports.MechanicEntity, mechanicName);
}
deserializerRegistry_1.deserializerRegistry.register(exports.MechanicEntity, MechanicNode.deserialize);
