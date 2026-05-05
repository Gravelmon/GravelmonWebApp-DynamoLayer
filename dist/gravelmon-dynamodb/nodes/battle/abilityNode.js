"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbilityNode = exports.AbilityIdentifier = exports.AbilityEntity = void 0;
exports.createAbilityNode = createAbilityNode;
const deserializerRegistry_1 = require("../../service/deserializerRegistry");
const dynamoNodes_1 = require("../../service/dynamoNodes");
exports.AbilityEntity = "Ability";
class AbilityIdentifier {
    constructor(game, ability) {
        this.game = game;
        this.ability = ability;
    }
    toString() {
        return `${this.game}#${this.ability}`;
    }
    static fromString(identifier) {
        const [game, ability] = identifier.split("#");
        return new AbilityIdentifier(game, ability);
    }
    getAbility() {
        return this.ability;
    }
    serialize() {
        return {
            game: this.game,
            ability: this.ability
        };
    }
    static deserialize(data) {
        return new AbilityIdentifier(data.game, data.ability);
    }
}
exports.AbilityIdentifier = AbilityIdentifier;
class AbilityNode extends dynamoNodes_1.DynamoNode {
    constructor(name, description, rebalancedDescription) {
        super(exports.AbilityEntity, name.toString());
        this.description = description;
        this.identifier = name;
        this.rebalancedDescription = rebalancedDescription;
    }
    serialize() {
        return {
            ...super.serialize(),
            description: this.description,
            rebalancedDescription: this.rebalancedDescription,
            identifier: this.identifier.serialize()
        };
    }
    static deserialize(data) {
        return new AbilityNode(AbilityIdentifier.deserialize(data.identifier), data.description, data.rebalancedDescription);
    }
}
exports.AbilityNode = AbilityNode;
function createAbilityNode(name, description, rebalancedDescription) {
    return new AbilityNode(name, description, rebalancedDescription);
}
deserializerRegistry_1.deserializerRegistry.register(exports.AbilityEntity, AbilityNode.deserialize);
