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
        const spawnPresetNode = (0, spawnPresetNode_1.createSpawnPresetNode)(spawnPresetData);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhd25QcmVzZXROb2RlLmludGVncmF0aW9uLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvX190ZXN0c19fL2l0L25vZGVzL3NwYXduaW5nL3NwYXduUHJlc2V0Tm9kZS5pbnRlZ3JhdGlvbi50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esb0ZBQTZFO0FBQzdFLDhDQUErQztBQUMvQyxtR0FJdUU7QUFDdkUsdUdBQWtHO0FBQ2xHLGtHQUF3RztBQUN4Ryw4RkFBeUY7QUFDekYsZ0ZBQTJFO0FBQzNFLElBQUksT0FBaUMsQ0FBQztBQUN0QyxJQUFJLEdBQXFDLENBQUM7QUFFMUMsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ2pCLEdBQUcsR0FBRyxJQUFBLHVCQUFhLEVBQUMsV0FBVyxDQUFDLENBQUE7SUFDaEMsTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEIsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDaEIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsRUFBRTtJQUMvQyxNQUFNLGtCQUFrQixHQUFHLElBQUksK0JBQWMsQ0FBQztRQUMxQyxVQUFVLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxrQkFBa0IsQ0FBQztRQUV2RCxTQUFTLEVBQUUsSUFBSSx5QkFBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsU0FBUyxFQUFFLElBQUk7UUFFZixJQUFJLEVBQUUsRUFBRTtRQUNSLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUks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Q0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUYsTUFBTSxDQUFFLFFBQWdCLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0RyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7R3JhdmVsbW9uRHluYW1vREJTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL3NlcnZpY2UvZ3JhdmVsbW9uRHluYW1vREJTZXJ2aWNlXCI7XHJcbmltcG9ydCB7Z2V0Tm9kZVBLfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL3NlcnZpY2UvZHluYW1vTm9kZXNcIjtcclxuaW1wb3J0IHtjcmVhdGVUZXN0RW52fSBmcm9tIFwiLi4vLi4vLi4vdGVzdEVudlwiO1xyXG5pbXBvcnQge1xyXG4gICAgY3JlYXRlU3Bhd25QcmVzZXROb2RlLFxyXG4gICAgU3Bhd25QcmVzZXRFbnRpdHksXHJcbiAgICBTcGF3blByZXNldE9wdGlvbnNcclxufSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL25vZGVzL3NwYXduaW5nL3NwYXduUHJlc2V0Tm9kZVwiO1xyXG5pbXBvcnQge1Jlc291cmNlTG9jYXRpb259IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvbW9kZWxzL21pbmVjcmFmdC9yZXNvdXJjZUxvY2F0aW9uXCI7XHJcbmltcG9ydCB7TGFiZWxNb2RlLCBTcGF3bkNvbmRpdGlvbn0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYi9tb2RlbHMvc3Bhd25pbmcvc3Bhd25Db25kaXRpb25cIjtcclxuaW1wb3J0IHtOdW1iZXJSYW5nZX0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYi9tb2RlbHMvcHJvcGVydGllcy9udW1iZXJSYW5nZVwiO1xyXG5pbXBvcnQge1RpbWV9IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvbW9kZWxzL3Byb3BlcnRpZXMvdGltZVwiO1xyXG5sZXQgc2VydmljZTogR3JhdmVsbW9uRHluYW1vREJTZXJ2aWNlO1xyXG5sZXQgZW52OiBSZXR1cm5UeXBlPHR5cGVvZiBjcmVhdGVUZXN0RW52PjtcclxuXHJcbmJlZm9yZUFsbChhc3luYyAoKSA9PiB7XHJcbiAgICBlbnYgPSBjcmVhdGVUZXN0RW52KFwiZ2FtZS1ub2RlXCIpXHJcbiAgICBhd2FpdCBlbnYuY3JlYXRlVGFibGUoKTtcclxuICAgIHNlcnZpY2UgPSBlbnYuc2VydmljZTtcclxufSk7XHJcblxyXG5hZnRlckFsbChhc3luYyAoKSA9PiB7XHJcbiAgICBlbnYuZGVzdHJveSgpO1xyXG59KTtcclxuXHJcbmRlc2NyaWJlKFwiU3Bhd25QcmVzZXROb2RlIEludGVncmF0aW9uIFRlc3RzXCIsICgpID0+IHtcclxuICAgIGNvbnN0IHRlc3RTcGF3bkNvbmRpdGlvbiA9IG5ldyBTcGF3bkNvbmRpdGlvbih7XHJcbiAgICAgICAgZGltZW5zaW9uczogW1wibWluZWNyYWZ0Om92ZXJ3b3JsZFwiLCBcIm1pbmVjcmFmdDpuZXRoZXJcIl0sXHJcblxyXG4gICAgICAgIG1vb25QaGFzZTogbmV3IE51bWJlclJhbmdlKDAsIDQpLFxyXG4gICAgICAgIGNhblNlZVNreTogdHJ1ZSxcclxuXHJcbiAgICAgICAgbWluWTogNjAsXHJcbiAgICAgICAgbWF4WTogMTIwLFxyXG4gICAgICAgIG1pblg6IC0xMDAwLFxyXG4gICAgICAgIG1heFg6IDEwMDAsXHJcbiAgICAgICAgbWluWjogLTEwMDAsXHJcbiAgICAgICAgbWF4WjogMTAwMCxcclxuXHJcbiAgICAgICAgbWluTGlnaHQ6IDAsXHJcbiAgICAgICAgbWF4TGlnaHQ6IDcsXHJcbiAgICAgICAgbWluU2t5TGlnaHQ6IDAsXHJcbiAgICAgICAgbWF4U2t5TGlnaHQ6IDEwLFxyXG5cclxuICAgICAgICB0aW1lUmFuZ2U6IFRpbWUuVHdpbGlnaHQsXHJcblxyXG4gICAgICAgIGlzUmFpbmluZzogZmFsc2UsXHJcbiAgICAgICAgaXNUaHVuZGVyaW5nOiBmYWxzZSxcclxuICAgICAgICBpc1NsaW1lQ2h1bms6IGZhbHNlLFxyXG5cclxuICAgICAgICBsYWJlbHM6IFtcInJhcmVcIiwgXCJzdXJmYWNlX3NwYXduXCJdLFxyXG4gICAgICAgIGxhYmVsTW9kZTogTGFiZWxNb2RlLkFMTCxcclxuXHJcbiAgICAgICAgbWluV2lkdGg6IDEsXHJcbiAgICAgICAgbWF4V2lkdGg6IDMsXHJcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxyXG4gICAgICAgIG1heExlbmd0aDogMyxcclxuXHJcbiAgICAgICAgbmVlZGVkTmVhcmJ5QmxvY2tzOiBbXHJcbiAgICAgICAgICAgIG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwiZ3Jhc3NfYmxvY2tcIiksXHJcbiAgICAgICAgICAgIG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwic3RvbmVcIilcclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBuZWVkZWRCYXNlQmxvY2tzOiBbXHJcbiAgICAgICAgICAgIG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwiZGlydFwiKVxyXG4gICAgICAgIF0sXHJcblxyXG4gICAgICAgIHNwYXduc0luQmlvbWVzOiBbXHJcbiAgICAgICAgICAgIG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwicGxhaW5zXCIpLFxyXG4gICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcImZvcmVzdFwiKVxyXG4gICAgICAgIF0sXHJcblxyXG4gICAgICAgIHNwYXduc0luU3RydWN0dXJlczogW1xyXG4gICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcInJ1aW5lZF9wb3J0YWxcIilcclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBtaW5EZXB0aDogMTAsXHJcbiAgICAgICAgbWF4RGVwdGg6IDY0LFxyXG5cclxuICAgICAgICBmbHVpZElzU291cmNlOiBmYWxzZSxcclxuICAgICAgICBmbHVpZDogbmV3IFJlc291cmNlTG9jYXRpb24oXCJtaW5lY3JhZnRcIiwgXCJ3YXRlclwiKSxcclxuXHJcbiAgICAgICAgbWluTHVyZUxldmVsOiAxLFxyXG4gICAgICAgIG1heEx1cmVMZXZlbDogMyxcclxuICAgICAgICBib2JiZXI6IG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwiZmlzaGluZ19ib2JiZXJcIiksXHJcbiAgICAgICAgYmFpdDogbmV3IFJlc291cmNlTG9jYXRpb24oXCJtaW5lY3JhZnRcIiwgXCJ3b3JtXCIpXHJcbiAgICB9KTtcclxuXHJcbiAgICB0ZXN0KFwic2hvdWxkIHdyaXRlIGFuZCByZWFkIGEgU3Bhd25QcmVzZXROb2RlIGZyb20gRHluYW1vREJcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIC8vIEFycmFuZ2U6IENyZWF0ZSBzYW1wbGUgZ2FtZSBkYXRhXHJcbiAgICAgICAgY29uc3QgY29uZGl0aW9uIDogU3Bhd25Db25kaXRpb24gPSB0ZXN0U3Bhd25Db25kaXRpb247XHJcbiAgICAgICAgY29uc3QgYW50aUNvbmRpdGlvbiA6IFNwYXduQ29uZGl0aW9uID0gdGVzdFNwYXduQ29uZGl0aW9uO1xyXG5cclxuICAgICAgICBjb25zdCBzcGF3blByZXNldERhdGEgOiBTcGF3blByZXNldE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwicG9rZW1vblwiLCBcIml0ZW0vcG9rZWRleFwiKSxcclxuICAgICAgICAgICAgY29uZGl0aW9uOiBjb25kaXRpb24sXHJcbiAgICAgICAgICAgIGFudGlDb25kaXRpb246IGFudGlDb25kaXRpb25cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBzcGF3blByZXNldE5vZGUgPSBjcmVhdGVTcGF3blByZXNldE5vZGUoc3Bhd25QcmVzZXREYXRhKTtcclxuICAgICAgICBjb25zdCBwayA9IGdldE5vZGVQSyhTcGF3blByZXNldEVudGl0eSwgc3Bhd25QcmVzZXREYXRhLm5hbWUudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgIC8vIEFjdDogV3JpdGUgdGhlIG5vZGUgdG8gRHluYW1vREJcclxuICAgICAgICBhd2FpdCBzZXJ2aWNlLnB1dEl0ZW0oc3Bhd25QcmVzZXROb2RlKTtcclxuICAgICAgICBjb25zdCByZWFkTm9kZSA9IGF3YWl0IHNlcnZpY2UuZ2V0Tm9kZShwayk7XHJcblxyXG4gICAgICAgIC8vIEFzc2VydFxyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZSkubm90LnRvQmVOdWxsKCk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlPy5lbnRpdHlUeXBlKS50b0JlKFNwYXduUHJlc2V0RW50aXR5KTtcclxuICAgICAgICAvLyBWZXJpZnkgaXQncyBhIFNwYXduUHJlc2V0Tm9kZSB3aXRoIHByb3BlciBkYXRhXHJcbiAgICAgICAgaWYgKHJlYWROb2RlICYmICdzcGF3blByZXNldE9wdGlvbnMnIGluIHJlYWROb2RlKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgocmVhZE5vZGUgYXMgYW55KS5zcGF3blByZXNldE9wdGlvbnMubmFtZSkudG9FcXVhbChzcGF3blByZXNldERhdGEubmFtZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCgocmVhZE5vZGUgYXMgYW55KS5zcGF3blByZXNldE9wdGlvbnMuY29uZGl0aW9uKS50b0VxdWFsKHNwYXduUHJlc2V0RGF0YS5jb25kaXRpb24pO1xyXG4gICAgICAgICAgICBleHBlY3QoKHJlYWROb2RlIGFzIGFueSkuc3Bhd25QcmVzZXRPcHRpb25zLmFudGlDb25kaXRpb24pLnRvRXF1YWwoc3Bhd25QcmVzZXREYXRhLmFudGlDb25kaXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuIl19