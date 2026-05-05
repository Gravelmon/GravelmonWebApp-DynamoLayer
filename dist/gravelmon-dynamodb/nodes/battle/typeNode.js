"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeNode = exports.TypeEntity = void 0;
exports.createTypeNode = createTypeNode;
const deserializerRegistry_1 = require("../../service/deserializerRegistry");
const dynamoNodes_1 = require("../../service/dynamoNodes");
exports.TypeEntity = "Type";
function createTypeNode(name, resists, immunities, weaknesses, introducedByGames) {
    return new TypeNode(name, resists, immunities, weaknesses, introducedByGames);
}
class TypeNode extends dynamoNodes_1.DynamoNode {
    constructor(name, resists, immunities, weaknesses, introducedByGames) {
        super(exports.TypeEntity, name);
        this.resists = resists;
        this.immunities = immunities;
        this.weaknesses = weaknesses;
        this.introducedByGames = introducedByGames;
    }
    serialize() {
        return {
            ...super.serialize(),
            resists: this.resists,
            immunities: this.immunities,
            weaknesses: this.weaknesses,
            introducedByGames: this.introducedByGames
        };
    }
    static deserialize(data) {
        const typeNode = new TypeNode(data.name);
        typeNode.resists = data.resists;
        typeNode.immunities = data.immunities;
        typeNode.weaknesses = data.weaknesses;
        typeNode.introducedByGames = data.introducedByGames;
        return typeNode;
    }
}
exports.TypeNode = TypeNode;
deserializerRegistry_1.deserializerRegistry.register(exports.TypeEntity, TypeNode.deserialize);
