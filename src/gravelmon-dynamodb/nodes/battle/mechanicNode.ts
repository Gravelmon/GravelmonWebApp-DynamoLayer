import { DynamoNode } from '../../service';
import {ResourceLocation} from "../../models";
import {PokemonIdentifier} from "../pokemon/pokemonNode";
import {deserializerRegistry} from "../../service";

export const MechanicEntity = "Mechanic";

export class MechanicNode extends DynamoNode {
    description?: string;
    usesItems?: ResourceLocation[];
//This is not supposed to point towards the mega evolution in case of the mega evolution mechanic, but the base form
    affectsForms?: PokemonIdentifier[];

    constructor(name: string, description?: string, usesItems?: ResourceLocation[], affectsForms?: PokemonIdentifier[]) {
        super(MechanicEntity, name);
        this.description = description;
        this.usesItems = usesItems;
        this.affectsForms = affectsForms;
    }

    static deserialize(data: Record<string, any>): DynamoNode {
        return new MechanicNode(data.name, data.description,
            data.usesItems ? data.usesItems.map((item: any)=>ResourceLocation.deserialize(item)) : undefined,
            data.affectsForms ? data.affectsForms.map((item: any)=>PokemonIdentifier.deserialize(item)) : undefined);
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            description: this.description ? this.description : undefined,
            usesItems: this.usesItems ? this.usesItems.map((item)=> item.serialize()) : undefined,
            affectsForms: this.affectsForms ? this.affectsForms.map((item)=> item.serialize()) : undefined
        }
    }
}

deserializerRegistry.register(MechanicEntity, MechanicNode.deserialize);