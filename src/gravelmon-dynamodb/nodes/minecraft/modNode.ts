import { DynamoNode } from '../../service/dynamoNodes';
import {ResourceLocation} from "../../models/minecraft/resourceLocation";

export const ModEntity = "Mod";

export class ModNode extends DynamoNode {
    displayName: string
    addsBiomes: ResourceLocation[]
    addsStructures: ResourceLocation[]
    addsItems: ResourceLocation[]

    static version = 1;
    constructor(displayName: string, nameSpace: string, addsBiomes: ResourceLocation[], addsStructures: ResourceLocation[], addsItems: ResourceLocation[]) {
        super(ModEntity, nameSpace);
        this.displayName = displayName;
        this.version = ModNode.version;
        this.addsBiomes = addsBiomes;
        this.addsStructures = addsStructures;
        this.addsItems = addsItems;
    }

    public serialize(): Record<string, any> {
        return {
            ...super.serialize(),
            displayName: this.displayName,
            addsBiomes: this.addsBiomes.map(m => m.serialize()),
            addsStructures: this.addsStructures.map(m => m.serialize()),
            addsItems: this.addsItems.map(m => m.serialize()),
        }
    }

    public static deserialize(data: Record<string, any>): ModNode {
        return new ModNode(data.displayName, data.name,
            data.addsBiomes.map((m : any) => ResourceLocation.deserialize(m)),
            data.addsStructures.map((m : any) => ResourceLocation.deserialize(m)),
            data.addsItems.map((m : any) => ResourceLocation.deserialize(m)));
    }
}