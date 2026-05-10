"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoNodes_1 = require("../../../../gravelmon-dynamodb/service/dynamoNodes");
const testEnv_1 = require("../../../testEnv");
const spawnPresetNode_1 = require("../../../../gravelmon-dynamodb/nodes/spawning/spawnPresetNode");
const resourceLocation_1 = require("../../../../gravelmon-dynamodb/models/minecraft/resourceLocation");
const spawnCondition_1 = require("../../../../gravelmon-dynamodb/models/spawning/spawnCondition");
const numberRange_1 = require("../../../../gravelmon-dynamodb/models/properties/numberRange");
const time_1 = require("../../../../gravelmon-dynamodb/models/properties/time");
let service;
let env;
beforeAll(async () => {
    env = (0, testEnv_1.createTestEnv)("game-node");
    await env.createTable();
    service = env.service;
});
afterAll(async () => {
    env.destroy();
});
describe("SpawnPresetNode Integration Tests", () => {
    const testSpawnCondition = new spawnCondition_1.SpawnCondition({
        dimensions: ["minecraft:overworld", "minecraft:nether"],
        moonPhase: new numberRange_1.NumberRange(0, 4),
        canSeeSky: true,
        minY: 60,
        maxY: 120,
        minX: -1000,
        maxX: 1000,
        minZ: -1000,
        maxZ: 1000,
        minLight: 0,
        maxLight: 7,
        minSkyLight: 0,
        maxSkyLight: 10,
        timeRange: time_1.Time.Twilight,
        isRaining: false,
        isThundering: false,
        isSlimeChunk: false,
        labels: ["rare", "surface_spawn"],
        labelMode: spawnCondition_1.LabelMode.ALL,
        minWidth: 1,
        maxWidth: 3,
        minLength: 1,
        maxLength: 3,
        neededNearbyBlocks: [
            new resourceLocation_1.ResourceLocation("minecraft", "grass_block"),
            new resourceLocation_1.ResourceLocation("minecraft", "stone")
        ],
        neededBaseBlocks: [
            new resourceLocation_1.ResourceLocation("minecraft", "dirt")
        ],
        spawnsInBiomes: [
            new resourceLocation_1.ResourceLocation("minecraft", "plains"),
            new resourceLocation_1.ResourceLocation("minecraft", "forest")
        ],
        spawnsInStructures: [
            new resourceLocation_1.ResourceLocation("minecraft", "ruined_portal")
        ],
        minDepth: 10,
        maxDepth: 64,
        fluidIsSource: false,
        fluid: new resourceLocation_1.ResourceLocation("minecraft", "water"),
        minLureLevel: 1,
        maxLureLevel: 3,
        bobber: new resourceLocation_1.ResourceLocation("minecraft", "fishing_bobber"),
        bait: new resourceLocation_1.ResourceLocation("minecraft", "worm")
    });
    test("should write and read a SpawnPresetNode from DynamoDB", async () => {
        // Arrange: Create sample game data
        const condition = testSpawnCondition;
        const antiCondition = testSpawnCondition;
        const spawnPresetData = {
            name: new resourceLocation_1.ResourceLocation("pokemon", "item/pokedex"),
            condition: condition,
            antiCondition: antiCondition
        };
        const spawnPresetNode = new spawnPresetNode_1.SpawnPresetNode(spawnPresetData);
        const pk = (0, dynamoNodes_1.getNodePK)(spawnPresetNode_1.SpawnPresetEntity, spawnPresetData.name.toString());
        // Act: Write the node to DynamoDB
        await service.putItem(spawnPresetNode);
        const readNode = await service.getNode(pk);
        // Assert
        expect(readNode).not.toBeNull();
        expect(readNode?.entityType).toBe(spawnPresetNode_1.SpawnPresetEntity);
        // Verify it's a SpawnPresetNode with proper data
        if (readNode && 'spawnPresetOptions' in readNode) {
            expect(readNode.spawnPresetOptions.name).toEqual(spawnPresetData.name);
            expect(readNode.spawnPresetOptions.condition).toEqual(spawnPresetData.condition);
            expect(readNode.spawnPresetOptions.antiCondition).toEqual(spawnPresetData.antiCondition);
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhd25QcmVzZXROb2RlLmludGVncmF0aW9uLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvX190ZXN0c19fL2l0L25vZGVzL3NwYXduaW5nL3NwYXduUHJlc2V0Tm9kZS5pbnRlZ3JhdGlvbi50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esb0ZBQTZFO0FBQzdFLDhDQUErQztBQUMvQyxtR0FHdUU7QUFDdkUsdUdBQWtHO0FBQ2xHLGtHQUF3RztBQUN4Ryw4RkFBeUY7QUFDekYsZ0ZBQTJFO0FBQzNFLElBQUksT0FBaUMsQ0FBQztBQUN0QyxJQUFJLEdBQXFDLENBQUM7QUFFMUMsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ2pCLEdBQUcsR0FBRyxJQUFBLHVCQUFhLEVBQUMsV0FBVyxDQUFDLENBQUE7SUFDaEMsTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEIsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDaEIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsRUFBRTtJQUMvQyxNQUFNLGtCQUFrQixHQUFHLElBQUksK0JBQWMsQ0FBQztRQUMxQyxVQUFVLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxrQkFBa0IsQ0FBQztRQUV2RCxTQUFTLEVBQUUsSUFBSSx5QkFBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsU0FBUyxFQUFFLElBQUk7UUFFZixJQUFJLEVBQUUsRUFBRTtRQUNSLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUks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QUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxRixNQUFNLENBQUUsUUFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RHLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHcmF2ZWxtb25EeW5hbW9EQlNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvc2VydmljZS9ncmF2ZWxtb25EeW5hbW9EQlNlcnZpY2VcIjtcclxuaW1wb3J0IHtnZXROb2RlUEt9IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvc2VydmljZS9keW5hbW9Ob2Rlc1wiO1xyXG5pbXBvcnQge2NyZWF0ZVRlc3RFbnZ9IGZyb20gXCIuLi8uLi8uLi90ZXN0RW52XCI7XHJcbmltcG9ydCB7XHJcbiAgICBTcGF3blByZXNldEVudGl0eSwgU3Bhd25QcmVzZXROb2RlLFxyXG4gICAgU3Bhd25QcmVzZXRPcHRpb25zXHJcbn0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYi9ub2Rlcy9zcGF3bmluZy9zcGF3blByZXNldE5vZGVcIjtcclxuaW1wb3J0IHtSZXNvdXJjZUxvY2F0aW9ufSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL21vZGVscy9taW5lY3JhZnQvcmVzb3VyY2VMb2NhdGlvblwiO1xyXG5pbXBvcnQge0xhYmVsTW9kZSwgU3Bhd25Db25kaXRpb259IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvbW9kZWxzL3NwYXduaW5nL3NwYXduQ29uZGl0aW9uXCI7XHJcbmltcG9ydCB7TnVtYmVyUmFuZ2V9IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvbW9kZWxzL3Byb3BlcnRpZXMvbnVtYmVyUmFuZ2VcIjtcclxuaW1wb3J0IHtUaW1lfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL21vZGVscy9wcm9wZXJ0aWVzL3RpbWVcIjtcclxubGV0IHNlcnZpY2U6IEdyYXZlbG1vbkR5bmFtb0RCU2VydmljZTtcclxubGV0IGVudjogUmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlVGVzdEVudj47XHJcblxyXG5iZWZvcmVBbGwoYXN5bmMgKCkgPT4ge1xyXG4gICAgZW52ID0gY3JlYXRlVGVzdEVudihcImdhbWUtbm9kZVwiKVxyXG4gICAgYXdhaXQgZW52LmNyZWF0ZVRhYmxlKCk7XHJcbiAgICBzZXJ2aWNlID0gZW52LnNlcnZpY2U7XHJcbn0pO1xyXG5cclxuYWZ0ZXJBbGwoYXN5bmMgKCkgPT4ge1xyXG4gICAgZW52LmRlc3Ryb3koKTtcclxufSk7XHJcblxyXG5kZXNjcmliZShcIlNwYXduUHJlc2V0Tm9kZSBJbnRlZ3JhdGlvbiBUZXN0c1wiLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0ZXN0U3Bhd25Db25kaXRpb24gPSBuZXcgU3Bhd25Db25kaXRpb24oe1xyXG4gICAgICAgIGRpbWVuc2lvbnM6IFtcIm1pbmVjcmFmdDpvdmVyd29ybGRcIiwgXCJtaW5lY3JhZnQ6bmV0aGVyXCJdLFxyXG5cclxuICAgICAgICBtb29uUGhhc2U6IG5ldyBOdW1iZXJSYW5nZSgwLCA0KSxcclxuICAgICAgICBjYW5TZWVTa3k6IHRydWUsXHJcblxyXG4gICAgICAgIG1pblk6IDYwLFxyXG4gICAgICAgIG1heFk6IDEyMCxcclxuICAgICAgICBtaW5YOiAtMTAwMCxcclxuICAgICAgICBtYXhYOiAxMDAwLFxyXG4gICAgICAgIG1pblo6IC0xMDAwLFxyXG4gICAgICAgIG1heFo6IDEwMDAsXHJcblxyXG4gICAgICAgIG1pbkxpZ2h0OiAwLFxyXG4gICAgICAgIG1heExpZ2h0OiA3LFxyXG4gICAgICAgIG1pblNreUxpZ2h0OiAwLFxyXG4gICAgICAgIG1heFNreUxpZ2h0OiAxMCxcclxuXHJcbiAgICAgICAgdGltZVJhbmdlOiBUaW1lLlR3aWxpZ2h0LFxyXG5cclxuICAgICAgICBpc1JhaW5pbmc6IGZhbHNlLFxyXG4gICAgICAgIGlzVGh1bmRlcmluZzogZmFsc2UsXHJcbiAgICAgICAgaXNTbGltZUNodW5rOiBmYWxzZSxcclxuXHJcbiAgICAgICAgbGFiZWxzOiBbXCJyYXJlXCIsIFwic3VyZmFjZV9zcGF3blwiXSxcclxuICAgICAgICBsYWJlbE1vZGU6IExhYmVsTW9kZS5BTEwsXHJcblxyXG4gICAgICAgIG1pbldpZHRoOiAxLFxyXG4gICAgICAgIG1heFdpZHRoOiAzLFxyXG4gICAgICAgIG1pbkxlbmd0aDogMSxcclxuICAgICAgICBtYXhMZW5ndGg6IDMsXHJcblxyXG4gICAgICAgIG5lZWRlZE5lYXJieUJsb2NrczogW1xyXG4gICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcImdyYXNzX2Jsb2NrXCIpLFxyXG4gICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcInN0b25lXCIpXHJcbiAgICAgICAgXSxcclxuXHJcbiAgICAgICAgbmVlZGVkQmFzZUJsb2NrczogW1xyXG4gICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcImRpcnRcIilcclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBzcGF3bnNJbkJpb21lczogW1xyXG4gICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcInBsYWluc1wiKSxcclxuICAgICAgICAgICAgbmV3IFJlc291cmNlTG9jYXRpb24oXCJtaW5lY3JhZnRcIiwgXCJmb3Jlc3RcIilcclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBzcGF3bnNJblN0cnVjdHVyZXM6IFtcclxuICAgICAgICAgICAgbmV3IFJlc291cmNlTG9jYXRpb24oXCJtaW5lY3JhZnRcIiwgXCJydWluZWRfcG9ydGFsXCIpXHJcbiAgICAgICAgXSxcclxuXHJcbiAgICAgICAgbWluRGVwdGg6IDEwLFxyXG4gICAgICAgIG1heERlcHRoOiA2NCxcclxuXHJcbiAgICAgICAgZmx1aWRJc1NvdXJjZTogZmFsc2UsXHJcbiAgICAgICAgZmx1aWQ6IG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwid2F0ZXJcIiksXHJcblxyXG4gICAgICAgIG1pbkx1cmVMZXZlbDogMSxcclxuICAgICAgICBtYXhMdXJlTGV2ZWw6IDMsXHJcbiAgICAgICAgYm9iYmVyOiBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcImZpc2hpbmdfYm9iYmVyXCIpLFxyXG4gICAgICAgIGJhaXQ6IG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwid29ybVwiKVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGVzdChcInNob3VsZCB3cml0ZSBhbmQgcmVhZCBhIFNwYXduUHJlc2V0Tm9kZSBmcm9tIER5bmFtb0RCXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAvLyBBcnJhbmdlOiBDcmVhdGUgc2FtcGxlIGdhbWUgZGF0YVxyXG4gICAgICAgIGNvbnN0IGNvbmRpdGlvbiA6IFNwYXduQ29uZGl0aW9uID0gdGVzdFNwYXduQ29uZGl0aW9uO1xyXG4gICAgICAgIGNvbnN0IGFudGlDb25kaXRpb24gOiBTcGF3bkNvbmRpdGlvbiA9IHRlc3RTcGF3bkNvbmRpdGlvbjtcclxuXHJcbiAgICAgICAgY29uc3Qgc3Bhd25QcmVzZXREYXRhIDogU3Bhd25QcmVzZXRPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBuYW1lOiBuZXcgUmVzb3VyY2VMb2NhdGlvbihcInBva2Vtb25cIiwgXCJpdGVtL3Bva2VkZXhcIiksXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbjogY29uZGl0aW9uLFxyXG4gICAgICAgICAgICBhbnRpQ29uZGl0aW9uOiBhbnRpQ29uZGl0aW9uXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3Bhd25QcmVzZXROb2RlID0gbmV3IFNwYXduUHJlc2V0Tm9kZShzcGF3blByZXNldERhdGEpO1xyXG4gICAgICAgIGNvbnN0IHBrID0gZ2V0Tm9kZVBLKFNwYXduUHJlc2V0RW50aXR5LCBzcGF3blByZXNldERhdGEubmFtZS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgLy8gQWN0OiBXcml0ZSB0aGUgbm9kZSB0byBEeW5hbW9EQlxyXG4gICAgICAgIGF3YWl0IHNlcnZpY2UucHV0SXRlbShzcGF3blByZXNldE5vZGUpO1xyXG4gICAgICAgIGNvbnN0IHJlYWROb2RlID0gYXdhaXQgc2VydmljZS5nZXROb2RlKHBrKTtcclxuXHJcbiAgICAgICAgLy8gQXNzZXJ0XHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlKS5ub3QudG9CZU51bGwoKTtcclxuICAgICAgICBleHBlY3QocmVhZE5vZGU/LmVudGl0eVR5cGUpLnRvQmUoU3Bhd25QcmVzZXRFbnRpdHkpO1xyXG4gICAgICAgIC8vIFZlcmlmeSBpdCdzIGEgU3Bhd25QcmVzZXROb2RlIHdpdGggcHJvcGVyIGRhdGFcclxuICAgICAgICBpZiAocmVhZE5vZGUgJiYgJ3NwYXduUHJlc2V0T3B0aW9ucycgaW4gcmVhZE5vZGUpIHtcclxuICAgICAgICAgICAgZXhwZWN0KChyZWFkTm9kZSBhcyBhbnkpLnNwYXduUHJlc2V0T3B0aW9ucy5uYW1lKS50b0VxdWFsKHNwYXduUHJlc2V0RGF0YS5uYW1lKTtcclxuICAgICAgICAgICAgZXhwZWN0KChyZWFkTm9kZSBhcyBhbnkpLnNwYXduUHJlc2V0T3B0aW9ucy5jb25kaXRpb24pLnRvRXF1YWwoc3Bhd25QcmVzZXREYXRhLmNvbmRpdGlvbik7XHJcbiAgICAgICAgICAgIGV4cGVjdCgocmVhZE5vZGUgYXMgYW55KS5zcGF3blByZXNldE9wdGlvbnMuYW50aUNvbmRpdGlvbikudG9FcXVhbChzcGF3blByZXNldERhdGEuYW50aUNvbmRpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG4iXX0=