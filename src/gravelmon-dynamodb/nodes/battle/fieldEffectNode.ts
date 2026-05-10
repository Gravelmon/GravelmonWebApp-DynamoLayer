import { DynamoNode } from '../../service/dynamoNodes';
import { deserializerRegistry } from '../../service/deserializerRegistry';
import {MoveRange} from "../../models/battle/moveRange";
import {MoveIdentifier} from "./moveNode";
import {AbilityIdentifier} from "./abilityNode";

export const FieldEffectEntity = "FieldEffect";
export const FieldEffectFlagEntity = "FieldEffectFlag";

export class FieldEffectIdentifier {
    game: string;
    fieldEffect: string;
    constructor(game: string, pokemon: string) {
        this.game = game;
        this.fieldEffect = pokemon;
    }

    toString(): string {
        return `${this.game}#${this.fieldEffect}`;
    }

    static fromString(identifier: string): FieldEffectIdentifier {
        const [game, fieldEffect] = identifier.split("#");
        return new FieldEffectIdentifier(game, fieldEffect);
    }

    getFieldEffect(): string {
        return this.fieldEffect;
    }

    serialize(): any {
        return {
            game: this.game,
            fieldEffect: this.fieldEffect
        };
    }

    static deserialize(data: any): FieldEffectIdentifier {
        return new FieldEffectIdentifier(data.game, data.fieldEffect);
    }
}

export class FieldEffectFlagNode extends DynamoNode {
    fieldEffects: FieldEffectIdentifier[]

    constructor(name: string, fieldEffects: FieldEffectIdentifier[]) {
        super(FieldEffectFlagEntity, name);
        this.fieldEffects = fieldEffects;
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            flags: this.fieldEffects.map(m => m.serialize())
        }
    }

    public static deserialize(data: Record<string, any>): FieldEffectFlagNode {
        return new FieldEffectFlagNode(data.name, data.flags.map((m : any) => FieldEffectIdentifier.deserialize(m)));
    }
}

export interface FieldEffectData {
    associatedTypes?: string[];
    durationInTurns: number;
    fieldEffectRange: MoveRange.AllAllies | MoveRange.AllOpponents | MoveRange.AllPokemon;
    description?: string;
}

export class FieldEffectNode extends DynamoNode {
    displayName: string;
    identifier: FieldEffectIdentifier;
    fieldEffectData: FieldEffectData;
    rebalancedFieldEffectData?: FieldEffectData;
    fieldEffectFlags: string[];
    associatedMoves: MoveIdentifier[];
    associatedAbilities: AbilityIdentifier[];
    introducedByGames: string[];
    implemented: boolean
    constructor(displayName: string,
                identifier: FieldEffectIdentifier,
                fieldEffectData: FieldEffectData,
                associationMoves: MoveIdentifier[],
                associatedAbilities: AbilityIdentifier[],
                rebalancedFieldEffectData?: FieldEffectData,
                introducedByGames?: string[],
                fieldEffectFlags: string[] = [],
                implemented: boolean = false) {
        super(FieldEffectEntity, identifier.toString());
        this.displayName = displayName;
        this.identifier = identifier;
        this.fieldEffectData = fieldEffectData;
        this.rebalancedFieldEffectData = rebalancedFieldEffectData;
        this.introducedByGames = introducedByGames ?? [];
        this.fieldEffectFlags = fieldEffectFlags;
        this.implemented = implemented;
        this.associatedMoves = associationMoves;
        this.associatedAbilities = associatedAbilities;
    }

    static deserialize(data: Record<string, any>): FieldEffectNode {
        const fieldEffectData = FieldEffectNode.deserializeFieldEffectData(data.fieldEffectData);
        return new FieldEffectNode(
            data.displayName,
            FieldEffectIdentifier.deserialize(data.identifier),
            fieldEffectData,
            data.associatedMoves.map((move: any)=>MoveIdentifier.deserialize(move)),
            data.associatedAbilities.map((move: any)=>AbilityIdentifier.deserialize(move)),
            data.rebalancedFieldEffectData ? FieldEffectNode.deserializeFieldEffectData(data.rebalancedFieldEffectData) : undefined,
            data.fieldEffectFlags || [],
            data.implemented
        );
    }

    static deserializeFieldEffectData(data: any): FieldEffectData {
        return {
            associatedTypes: data.associatedTypes,
            durationInTurns: data.durationInTurns,
            fieldEffectRange: data.fieldEffectRange,
            description: data.description,
        }
    }

    private serializeFieldEffectData(data: FieldEffectData): any {
        return {
            associatedTypes: data.associatedTypes,
            durationInTurns: data.durationInTurns,
            fieldEffectRange: data.fieldEffectRange,
            description: data.description,
        }
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            displayName: this.displayName,
            identifier: this.identifier.serialize(),
            fieldEffectData: this.serializeFieldEffectData(this.fieldEffectData),
            associatedMoves: this.associatedMoves.map((move)=>move.serialize()),
            associatedAbilities: this.associatedAbilities.map((ability)=>ability.serialize()),
            rebalancedFieldEffectData: this.rebalancedFieldEffectData ? this.serializeFieldEffectData(this.rebalancedFieldEffectData) : undefined,
            introducedByGames: this.introducedByGames,
            fieldEffectFlags: this.fieldEffectFlags,
            implemented: this.implemented
        }
    }
}

deserializerRegistry.register(FieldEffectEntity, FieldEffectNode.deserialize);
deserializerRegistry.register(FieldEffectFlagEntity, FieldEffectFlagNode.deserialize);