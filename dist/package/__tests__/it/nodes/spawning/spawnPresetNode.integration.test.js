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
    const testSpawnCondition = {
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
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhd25QcmVzZXROb2RlLmludGVncmF0aW9uLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvX190ZXN0c19fL2l0L25vZGVzL3NwYXduaW5nL3NwYXduUHJlc2V0Tm9kZS5pbnRlZ3JhdGlvbi50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esb0ZBQTZFO0FBQzdFLDhDQUErQztBQUMvQyxtR0FHdUU7QUFDdkUsdUdBQWtHO0FBQ2xHLGtHQUF3RztBQUN4Ryw4RkFBeUY7QUFDekYsZ0ZBQTJFO0FBQzNFLElBQUksT0FBaUMsQ0FBQztBQUN0QyxJQUFJLEdBQXFDLENBQUM7QUFFMUMsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ2pCLEdBQUcsR0FBRyxJQUFBLHVCQUFhLEVBQUMsV0FBVyxDQUFDLENBQUE7SUFDaEMsTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEIsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDaEIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsRUFBRTtJQUMvQyxNQUFNLGtCQUFrQixHQUFHO1FBQ3ZCLFVBQVUsRUFBRSxDQUFDLHFCQUFxQixFQUFFLGtCQUFrQixDQUFDO1FBRXZELFNBQVMsRUFBRSxJQUFJLHlCQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxTQUFTLEVBQUUsSUFBSTtRQUVmLElBQUksRUFBRSxFQUFFO1FBQ1IsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxFQUFFLElBQUk7UUFFVixR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QWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxRixNQUFNLENBQUUsUUFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RHLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHcmF2ZWxtb25EeW5hbW9EQlNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvc2VydmljZS9ncmF2ZWxtb25EeW5hbW9EQlNlcnZpY2VcIjtcclxuaW1wb3J0IHtnZXROb2RlUEt9IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvc2VydmljZS9keW5hbW9Ob2Rlc1wiO1xyXG5pbXBvcnQge2NyZWF0ZVRlc3RFbnZ9IGZyb20gXCIuLi8uLi8uLi90ZXN0RW52XCI7XHJcbmltcG9ydCB7XHJcbiAgICBTcGF3blByZXNldEVudGl0eSwgU3Bhd25QcmVzZXROb2RlLFxyXG4gICAgU3Bhd25QcmVzZXRPcHRpb25zXHJcbn0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYi9ub2Rlcy9zcGF3bmluZy9zcGF3blByZXNldE5vZGVcIjtcclxuaW1wb3J0IHtSZXNvdXJjZUxvY2F0aW9ufSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL21vZGVscy9taW5lY3JhZnQvcmVzb3VyY2VMb2NhdGlvblwiO1xyXG5pbXBvcnQge0xhYmVsTW9kZSwgU3Bhd25Db25kaXRpb259IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvbW9kZWxzL3NwYXduaW5nL3NwYXduQ29uZGl0aW9uXCI7XHJcbmltcG9ydCB7TnVtYmVyUmFuZ2V9IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvbW9kZWxzL3Byb3BlcnRpZXMvbnVtYmVyUmFuZ2VcIjtcclxuaW1wb3J0IHtUaW1lfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL21vZGVscy9wcm9wZXJ0aWVzL3RpbWVcIjtcclxubGV0IHNlcnZpY2U6IEdyYXZlbG1vbkR5bmFtb0RCU2VydmljZTtcclxubGV0IGVudjogUmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlVGVzdEVudj47XHJcblxyXG5iZWZvcmVBbGwoYXN5bmMgKCkgPT4ge1xyXG4gICAgZW52ID0gY3JlYXRlVGVzdEVudihcImdhbWUtbm9kZVwiKVxyXG4gICAgYXdhaXQgZW52LmNyZWF0ZVRhYmxlKCk7XHJcbiAgICBzZXJ2aWNlID0gZW52LnNlcnZpY2U7XHJcbn0pO1xyXG5cclxuYWZ0ZXJBbGwoYXN5bmMgKCkgPT4ge1xyXG4gICAgZW52LmRlc3Ryb3koKTtcclxufSk7XHJcblxyXG5kZXNjcmliZShcIlNwYXduUHJlc2V0Tm9kZSBJbnRlZ3JhdGlvbiBUZXN0c1wiLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0ZXN0U3Bhd25Db25kaXRpb24gPSB7XHJcbiAgICAgICAgZGltZW5zaW9uczogW1wibWluZWNyYWZ0Om92ZXJ3b3JsZFwiLCBcIm1pbmVjcmFmdDpuZXRoZXJcIl0sXHJcblxyXG4gICAgICAgIG1vb25QaGFzZTogbmV3IE51bWJlclJhbmdlKDAsIDQpLFxyXG4gICAgICAgIGNhblNlZVNreTogdHJ1ZSxcclxuXHJcbiAgICAgICAgbWluWTogNjAsXHJcbiAgICAgICAgbWF4WTogMTIwLFxyXG4gICAgICAgIG1pblg6IC0xMDAwLFxyXG4gICAgICAgIG1heFg6IDEwMDAsXHJcbiAgICAgICAgbWluWjogLTEwMDAsXHJcbiAgICAgICAgbWF4WjogMTAwMCxcclxuXHJcbiAgICAgICAgbWluTGlnaHQ6IDAsXHJcbiAgICAgICAgbWF4TGlnaHQ6IDcsXHJcbiAgICAgICAgbWluU2t5TGlnaHQ6IDAsXHJcbiAgICAgICAgbWF4U2t5TGlnaHQ6IDEwLFxyXG5cclxuICAgICAgICB0aW1lUmFuZ2U6IFRpbWUuVHdpbGlnaHQsXHJcblxyXG4gICAgICAgIGlzUmFpbmluZzogZmFsc2UsXHJcbiAgICAgICAgaXNUaHVuZGVyaW5nOiBmYWxzZSxcclxuICAgICAgICBpc1NsaW1lQ2h1bms6IGZhbHNlLFxyXG5cclxuICAgICAgICBsYWJlbHM6IFtcInJhcmVcIiwgXCJzdXJmYWNlX3NwYXduXCJdLFxyXG4gICAgICAgIGxhYmVsTW9kZTogTGFiZWxNb2RlLkFMTCxcclxuXHJcbiAgICAgICAgbWluV2lkdGg6IDEsXHJcbiAgICAgICAgbWF4V2lkdGg6IDMsXHJcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxyXG4gICAgICAgIG1heExlbmd0aDogMyxcclxuXHJcbiAgICAgICAgbmVlZGVkTmVhcmJ5QmxvY2tzOiBbXHJcbiAgICAgICAgICAgIG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwiZ3Jhc3NfYmxvY2tcIiksXHJcbiAgICAgICAgICAgIG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwic3RvbmVcIilcclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBuZWVkZWRCYXNlQmxvY2tzOiBbXHJcbiAgICAgICAgICAgIG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwiZGlydFwiKVxyXG4gICAgICAgIF0sXHJcblxyXG4gICAgICAgIHNwYXduc0luQmlvbWVzOiBbXHJcbiAgICAgICAgICAgIG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwicGxhaW5zXCIpLFxyXG4gICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcImZvcmVzdFwiKVxyXG4gICAgICAgIF0sXHJcblxyXG4gICAgICAgIHNwYXduc0luU3RydWN0dXJlczogW1xyXG4gICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcInJ1aW5lZF9wb3J0YWxcIilcclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBtaW5EZXB0aDogMTAsXHJcbiAgICAgICAgbWF4RGVwdGg6IDY0LFxyXG5cclxuICAgICAgICBmbHVpZElzU291cmNlOiBmYWxzZSxcclxuICAgICAgICBmbHVpZDogbmV3IFJlc291cmNlTG9jYXRpb24oXCJtaW5lY3JhZnRcIiwgXCJ3YXRlclwiKSxcclxuXHJcbiAgICAgICAgbWluTHVyZUxldmVsOiAxLFxyXG4gICAgICAgIG1heEx1cmVMZXZlbDogMyxcclxuICAgICAgICBib2JiZXI6IG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwiZmlzaGluZ19ib2JiZXJcIiksXHJcbiAgICAgICAgYmFpdDogbmV3IFJlc291cmNlTG9jYXRpb24oXCJtaW5lY3JhZnRcIiwgXCJ3b3JtXCIpXHJcbiAgICB9O1xyXG5cclxuICAgIHRlc3QoXCJzaG91bGQgd3JpdGUgYW5kIHJlYWQgYSBTcGF3blByZXNldE5vZGUgZnJvbSBEeW5hbW9EQlwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgLy8gQXJyYW5nZTogQ3JlYXRlIHNhbXBsZSBnYW1lIGRhdGFcclxuICAgICAgICBjb25zdCBjb25kaXRpb24gOiBTcGF3bkNvbmRpdGlvbiA9IHRlc3RTcGF3bkNvbmRpdGlvbjtcclxuICAgICAgICBjb25zdCBhbnRpQ29uZGl0aW9uIDogU3Bhd25Db25kaXRpb24gPSB0ZXN0U3Bhd25Db25kaXRpb247XHJcblxyXG4gICAgICAgIGNvbnN0IHNwYXduUHJlc2V0RGF0YSA6IFNwYXduUHJlc2V0T3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgbmFtZTogbmV3IFJlc291cmNlTG9jYXRpb24oXCJwb2tlbW9uXCIsIFwiaXRlbS9wb2tlZGV4XCIpLFxyXG4gICAgICAgICAgICBjb25kaXRpb246IGNvbmRpdGlvbixcclxuICAgICAgICAgICAgYW50aUNvbmRpdGlvbjogYW50aUNvbmRpdGlvblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHNwYXduUHJlc2V0Tm9kZSA9IG5ldyBTcGF3blByZXNldE5vZGUoc3Bhd25QcmVzZXREYXRhKTtcclxuICAgICAgICBjb25zdCBwayA9IGdldE5vZGVQSyhTcGF3blByZXNldEVudGl0eSwgc3Bhd25QcmVzZXREYXRhLm5hbWUudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgIC8vIEFjdDogV3JpdGUgdGhlIG5vZGUgdG8gRHluYW1vREJcclxuICAgICAgICBhd2FpdCBzZXJ2aWNlLnB1dEl0ZW0oc3Bhd25QcmVzZXROb2RlKTtcclxuICAgICAgICBjb25zdCByZWFkTm9kZSA9IGF3YWl0IHNlcnZpY2UuZ2V0Tm9kZShwayk7XHJcblxyXG4gICAgICAgIC8vIEFzc2VydFxyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZSkubm90LnRvQmVOdWxsKCk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlPy5lbnRpdHlUeXBlKS50b0JlKFNwYXduUHJlc2V0RW50aXR5KTtcclxuICAgICAgICAvLyBWZXJpZnkgaXQncyBhIFNwYXduUHJlc2V0Tm9kZSB3aXRoIHByb3BlciBkYXRhXHJcbiAgICAgICAgaWYgKHJlYWROb2RlICYmICdzcGF3blByZXNldE9wdGlvbnMnIGluIHJlYWROb2RlKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgocmVhZE5vZGUgYXMgYW55KS5zcGF3blByZXNldE9wdGlvbnMubmFtZSkudG9FcXVhbChzcGF3blByZXNldERhdGEubmFtZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCgocmVhZE5vZGUgYXMgYW55KS5zcGF3blByZXNldE9wdGlvbnMuY29uZGl0aW9uKS50b0VxdWFsKHNwYXduUHJlc2V0RGF0YS5jb25kaXRpb24pO1xyXG4gICAgICAgICAgICBleHBlY3QoKHJlYWROb2RlIGFzIGFueSkuc3Bhd25QcmVzZXRPcHRpb25zLmFudGlDb25kaXRpb24pLnRvRXF1YWwoc3Bhd25QcmVzZXREYXRhLmFudGlDb25kaXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuIl19