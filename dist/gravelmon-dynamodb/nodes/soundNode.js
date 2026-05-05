"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundUsedByEdgeType = exports.SoundEntity = void 0;
exports.createSoundNode = createSoundNode;
exports.createSoundUsedByPokemonEdge = createSoundUsedByPokemonEdge;
exports.createSoundUsedByFormEdge = createSoundUsedByFormEdge;
const deserializerRegistry_1 = require("../service/deserializerRegistry");
const dynamoNodes_1 = require("../service/dynamoNodes");
const formNode_1 = require("./pokemon/formNode");
const pokemonNode_1 = require("./pokemon/pokemonNode");
exports.SoundEntity = "Sound";
exports.SoundUsedByEdgeType = "UsedBy";
class SoundNode extends dynamoNodes_1.DynamoNode {
    constructor(soundData, lastEdited = Date.now()) {
        super(exports.SoundEntity, soundData.name, SoundNode.version, lastEdited);
        this.soundData = soundData;
    }
    static deserialize(data) {
        const soundData = {
            name: data.soundData.name,
            s3Location: data.soundData.s3Location,
            madeBy: data.soundData.madeBy
        };
        return new SoundNode(soundData, data.lastEdited);
    }
    serialize() {
        return {
            ...super.serialize(),
            soundData: {
                name: this.soundData.name,
                s3Location: this.soundData.s3Location,
                madeBy: this.soundData.madeBy
            }
        };
    }
}
SoundNode.version = 1;
function createSoundNode(soundData) {
    return new SoundNode(soundData);
}
function createSoundUsedByPokemonEdge(soundName, pokemonIdentifier) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(exports.SoundEntity, soundName), exports.SoundUsedByEdgeType, pokemonNode_1.PokemonEntity, pokemonIdentifier.toString());
}
function createSoundUsedByFormEdge(soundName, formIdentifier) {
    return new dynamoNodes_1.DynamoEdge((0, dynamoNodes_1.getNodePK)(exports.SoundEntity, soundName), exports.SoundUsedByEdgeType, formNode_1.FormEntity, formIdentifier.toString());
}
deserializerRegistry_1.deserializerRegistry.register(exports.SoundEntity, SoundNode.deserialize);
