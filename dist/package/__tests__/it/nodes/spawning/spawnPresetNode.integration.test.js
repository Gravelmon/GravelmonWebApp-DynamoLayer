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
        timeRange: {
            type: "time", // night
            value: time_1.Time.Day
        },
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
        doesNotSpawnInBiomes: [
            new resourceLocation_1.ResourceLocation("minecraft", "desert"),
            new resourceLocation_1.ResourceLocation("minecraft", "ocean")
        ],
        spawnsInBiomes: [
            new resourceLocation_1.ResourceLocation("minecraft", "plains"),
            new resourceLocation_1.ResourceLocation("minecraft", "forest")
        ],
        doesNotSpawnInStructures: [
            new resourceLocation_1.ResourceLocation("minecraft", "village")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhd25QcmVzZXROb2RlLmludGVncmF0aW9uLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvX190ZXN0c19fL2l0L25vZGVzL3NwYXduaW5nL3NwYXduUHJlc2V0Tm9kZS5pbnRlZ3JhdGlvbi50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esb0ZBQTZFO0FBQzdFLDhDQUErQztBQUMvQyxtR0FJdUU7QUFDdkUsdUdBQWtHO0FBQ2xHLGtHQUF3RztBQUN4Ryw4RkFBeUY7QUFDekYsZ0ZBQTJFO0FBQzNFLElBQUksT0FBNkIsQ0FBQztBQUNsQyxJQUFJLEdBQXFDLENBQUM7QUFFMUMsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ2pCLEdBQUcsR0FBRyxJQUFBLHVCQUFhLEVBQUMsV0FBVyxDQUFDLENBQUE7SUFDaEMsTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEIsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDaEIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsRUFBRTtJQUMvQyxNQUFNLGtCQUFrQixHQUFHLElBQUksK0JBQWMsQ0FBQztRQUMxQyxVQUFVLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxrQkFBa0IsQ0FBQztRQUV2RCxTQUFTLEVBQUUsSUFBSSx5QkFBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsU0FBUyxFQUFFLElBQUk7UUFFZixJQUFJLEVBQUUsRUFBRTtRQUNSLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxJQUFJO1FBRVYsUUFBUSxFQUFFLENBQUM7UUFDWCxRQUFRLEVBQUUsQ0FBQztRQUNYLFdBQVcsRUFBRSxDQUFDO1FBQ2QsV0FBVyxFQUFFLEVBQUU7UUFFZixTQUFTLEVBQUU7WUFDUCxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVE7WUFDdEIsS0FBSyxFQUFFLFdBQUksQ0FBQyxHQUFHO1NBQ2xCO1FBRUQsU0FBUyxFQUFFLEtBQUs7UUFDaEIsWUFBWSxFQUFFLEtBQUs7UUFDbkIsWUFBWSxFQUFFLEtBQUs7UUFFbkIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQztRQUNqQyxTQUFTLEVBQUUsMEJBQVMsQ0FBQyxHQUFHO1FBRXhCLFFBQVEsRUFBRSxDQUFDO1FBQ1gsUUFBUSxFQUFFLENBQUM7UUFDWCxTQUFTLEVBQUUsQ0FBQztRQUNaLFNBQVMsRUFBRSxDQUFDO1FBRVosa0JBQWtCLEVBQUU7WUFDaEIsSUFBSSxtQ0FBZ0IsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDO1lBQ2hELElBQUksbUNBQWdCLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQztTQUM3QztRQUVELGdCQUFnQixFQUFFO1lBQ2QsSUFBSSxtQ0FBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDO1NBQzVDO1FBRUQsb0JBQW9CLEVBQUU7WUFDbEIsSUFBSSxtQ0FBZ0IsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDO1lBQzNDLElBQUksbUNBQWdCLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQztTQUM3QztRQUVELGNBQWMsRUFBRTtZQUNaLElBQUksbUNBQWdCLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQztZQUMzQyxJQUFJLG1DQUFnQixDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUM7U0FDOUM7UUFFRCx3QkFBd0IsRUFBRTtZQUN0QixJQUFJLG1DQUFnQixDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUM7U0FDL0M7UUFFRCxrQkFBa0IsRUFBRTtZQUNoQixJQUFJLG1DQUFnQixDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUM7U0FDckQ7UUFFRCxRQUFRLEVBQUUsRUFBRTtRQUNaLFFBQVEsRUFBRSxFQUFFO1FBRVosYUFBYSxFQUFFLEtBQUs7UUFDcEIsS0FBSyxFQUFFLElBQUksbUNBQWdCLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQztRQUVqRCxZQUFZLEVBQUUsQ0FBQztRQUNmLFlBQVksRUFBRSxDQUFDO1FBQ2YsTUFBTSxFQUFFLElBQUksbUNBQWdCLENBQUMsV0FBVyxFQUFFLGdCQUFnQixDQUFDO1FBQzNELElBQUksRUFBRSxJQUFJLG1DQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7S0FDbEQsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLHVEQUF1RCxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3JFLG1DQUFtQztRQUNuQyxNQUFNLFNBQVMsR0FBb0Isa0JBQWtCLENBQUM7UUFDdEQsTUFBTSxhQUFhLEdBQW9CLGtCQUFrQixDQUFDO1FBRTFELE1BQU0sZUFBZSxHQUF3QjtZQUN6QyxJQUFJLEVBQUUsSUFBSSxtQ0FBZ0IsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDO1lBQ3JELFNBQVMsRUFBRSxTQUFTO1lBQ3BCLGFBQWEsRUFBRSxhQUFhO1NBQy9CLENBQUM7UUFFRixNQUFNLGVBQWUsR0FBRyxJQUFBLHVDQUFxQixFQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sRUFBRSxHQUFHLElBQUEsdUJBQVMsRUFBQyxtQ0FBaUIsRUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFFekUsa0NBQWtDO1FBQ2xDLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN2QyxNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFM0MsU0FBUztRQUNULE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsbUNBQWlCLENBQUMsQ0FBQztRQUNyRCxpREFBaUQ7UUFDakQsSUFBSSxRQUFRLElBQUksb0JBQW9CLElBQUksUUFBUSxFQUFFLENBQUM7WUFDL0MsTUFBTSxDQUFFLFFBQWdCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRixNQUFNLENBQUUsUUFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFGLE1BQU0sQ0FBRSxRQUFnQixDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEcsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0R5bmFtb0RCR3JhcGhTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL3NlcnZpY2UvZHluYW1vREJHcmFwaFNlcnZpY2VcIjtcclxuaW1wb3J0IHtnZXROb2RlUEt9IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvc2VydmljZS9keW5hbW9Ob2Rlc1wiO1xyXG5pbXBvcnQge2NyZWF0ZVRlc3RFbnZ9IGZyb20gXCIuLi8uLi8uLi90ZXN0RW52XCI7XHJcbmltcG9ydCB7XHJcbiAgICBjcmVhdGVTcGF3blByZXNldE5vZGUsXHJcbiAgICBTcGF3blByZXNldEVudGl0eSxcclxuICAgIFNwYXduUHJlc2V0T3B0aW9uc1xyXG59IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGIvbm9kZXMvc3Bhd25pbmcvc3Bhd25QcmVzZXROb2RlXCI7XHJcbmltcG9ydCB7UmVzb3VyY2VMb2NhdGlvbn0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYi9tb2RlbHMvbWluZWNyYWZ0L3Jlc291cmNlTG9jYXRpb25cIjtcclxuaW1wb3J0IHtMYWJlbE1vZGUsIFNwYXduQ29uZGl0aW9ufSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL21vZGVscy9zcGF3bmluZy9zcGF3bkNvbmRpdGlvblwiO1xyXG5pbXBvcnQge051bWJlclJhbmdlfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiL21vZGVscy9wcm9wZXJ0aWVzL251bWJlclJhbmdlXCI7XHJcbmltcG9ydCB7VGltZX0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYi9tb2RlbHMvcHJvcGVydGllcy90aW1lXCI7XHJcbmxldCBzZXJ2aWNlOiBEeW5hbW9EQkdyYXBoU2VydmljZTtcclxubGV0IGVudjogUmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlVGVzdEVudj47XHJcblxyXG5iZWZvcmVBbGwoYXN5bmMgKCkgPT4ge1xyXG4gICAgZW52ID0gY3JlYXRlVGVzdEVudihcImdhbWUtbm9kZVwiKVxyXG4gICAgYXdhaXQgZW52LmNyZWF0ZVRhYmxlKCk7XHJcbiAgICBzZXJ2aWNlID0gZW52LnNlcnZpY2U7XHJcbn0pO1xyXG5cclxuYWZ0ZXJBbGwoYXN5bmMgKCkgPT4ge1xyXG4gICAgZW52LmRlc3Ryb3koKTtcclxufSk7XHJcblxyXG5kZXNjcmliZShcIlNwYXduUHJlc2V0Tm9kZSBJbnRlZ3JhdGlvbiBUZXN0c1wiLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0ZXN0U3Bhd25Db25kaXRpb24gPSBuZXcgU3Bhd25Db25kaXRpb24oe1xyXG4gICAgICAgIGRpbWVuc2lvbnM6IFtcIm1pbmVjcmFmdDpvdmVyd29ybGRcIiwgXCJtaW5lY3JhZnQ6bmV0aGVyXCJdLFxyXG5cclxuICAgICAgICBtb29uUGhhc2U6IG5ldyBOdW1iZXJSYW5nZSgwLCA0KSxcclxuICAgICAgICBjYW5TZWVTa3k6IHRydWUsXHJcblxyXG4gICAgICAgIG1pblk6IDYwLFxyXG4gICAgICAgIG1heFk6IDEyMCxcclxuICAgICAgICBtaW5YOiAtMTAwMCxcclxuICAgICAgICBtYXhYOiAxMDAwLFxyXG4gICAgICAgIG1pblo6IC0xMDAwLFxyXG4gICAgICAgIG1heFo6IDEwMDAsXHJcblxyXG4gICAgICAgIG1pbkxpZ2h0OiAwLFxyXG4gICAgICAgIG1heExpZ2h0OiA3LFxyXG4gICAgICAgIG1pblNreUxpZ2h0OiAwLFxyXG4gICAgICAgIG1heFNreUxpZ2h0OiAxMCxcclxuXHJcbiAgICAgICAgdGltZVJhbmdlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFwidGltZVwiLCAvLyBuaWdodFxyXG4gICAgICAgICAgICB2YWx1ZTogVGltZS5EYXlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpc1JhaW5pbmc6IGZhbHNlLFxyXG4gICAgICAgIGlzVGh1bmRlcmluZzogZmFsc2UsXHJcbiAgICAgICAgaXNTbGltZUNodW5rOiBmYWxzZSxcclxuXHJcbiAgICAgICAgbGFiZWxzOiBbXCJyYXJlXCIsIFwic3VyZmFjZV9zcGF3blwiXSxcclxuICAgICAgICBsYWJlbE1vZGU6IExhYmVsTW9kZS5BTEwsXHJcblxyXG4gICAgICAgIG1pbldpZHRoOiAxLFxyXG4gICAgICAgIG1heFdpZHRoOiAzLFxyXG4gICAgICAgIG1pbkxlbmd0aDogMSxcclxuICAgICAgICBtYXhMZW5ndGg6IDMsXHJcblxyXG4gICAgICAgIG5lZWRlZE5lYXJieUJsb2NrczogW1xyXG4gICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcImdyYXNzX2Jsb2NrXCIpLFxyXG4gICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcInN0b25lXCIpXHJcbiAgICAgICAgXSxcclxuXHJcbiAgICAgICAgbmVlZGVkQmFzZUJsb2NrczogW1xyXG4gICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcImRpcnRcIilcclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBkb2VzTm90U3Bhd25JbkJpb21lczogW1xyXG4gICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcImRlc2VydFwiKSxcclxuICAgICAgICAgICAgbmV3IFJlc291cmNlTG9jYXRpb24oXCJtaW5lY3JhZnRcIiwgXCJvY2VhblwiKVxyXG4gICAgICAgIF0sXHJcblxyXG4gICAgICAgIHNwYXduc0luQmlvbWVzOiBbXHJcbiAgICAgICAgICAgIG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwicGxhaW5zXCIpLFxyXG4gICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcImZvcmVzdFwiKVxyXG4gICAgICAgIF0sXHJcblxyXG4gICAgICAgIGRvZXNOb3RTcGF3bkluU3RydWN0dXJlczogW1xyXG4gICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcInZpbGxhZ2VcIilcclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBzcGF3bnNJblN0cnVjdHVyZXM6IFtcclxuICAgICAgICAgICAgbmV3IFJlc291cmNlTG9jYXRpb24oXCJtaW5lY3JhZnRcIiwgXCJydWluZWRfcG9ydGFsXCIpXHJcbiAgICAgICAgXSxcclxuXHJcbiAgICAgICAgbWluRGVwdGg6IDEwLFxyXG4gICAgICAgIG1heERlcHRoOiA2NCxcclxuXHJcbiAgICAgICAgZmx1aWRJc1NvdXJjZTogZmFsc2UsXHJcbiAgICAgICAgZmx1aWQ6IG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwid2F0ZXJcIiksXHJcblxyXG4gICAgICAgIG1pbkx1cmVMZXZlbDogMSxcclxuICAgICAgICBtYXhMdXJlTGV2ZWw6IDMsXHJcbiAgICAgICAgYm9iYmVyOiBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcImZpc2hpbmdfYm9iYmVyXCIpLFxyXG4gICAgICAgIGJhaXQ6IG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwid29ybVwiKVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGVzdChcInNob3VsZCB3cml0ZSBhbmQgcmVhZCBhIFNwYXduUHJlc2V0Tm9kZSBmcm9tIER5bmFtb0RCXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAvLyBBcnJhbmdlOiBDcmVhdGUgc2FtcGxlIGdhbWUgZGF0YVxyXG4gICAgICAgIGNvbnN0IGNvbmRpdGlvbiA6IFNwYXduQ29uZGl0aW9uID0gdGVzdFNwYXduQ29uZGl0aW9uO1xyXG4gICAgICAgIGNvbnN0IGFudGlDb25kaXRpb24gOiBTcGF3bkNvbmRpdGlvbiA9IHRlc3RTcGF3bkNvbmRpdGlvbjtcclxuXHJcbiAgICAgICAgY29uc3Qgc3Bhd25QcmVzZXREYXRhIDogU3Bhd25QcmVzZXRPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBuYW1lOiBuZXcgUmVzb3VyY2VMb2NhdGlvbihcInBva2Vtb25cIiwgXCJpdGVtL3Bva2VkZXhcIiksXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbjogY29uZGl0aW9uLFxyXG4gICAgICAgICAgICBhbnRpQ29uZGl0aW9uOiBhbnRpQ29uZGl0aW9uXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3Bhd25QcmVzZXROb2RlID0gY3JlYXRlU3Bhd25QcmVzZXROb2RlKHNwYXduUHJlc2V0RGF0YSk7XHJcbiAgICAgICAgY29uc3QgcGsgPSBnZXROb2RlUEsoU3Bhd25QcmVzZXRFbnRpdHksIHNwYXduUHJlc2V0RGF0YS5uYW1lLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAvLyBBY3Q6IFdyaXRlIHRoZSBub2RlIHRvIER5bmFtb0RCXHJcbiAgICAgICAgYXdhaXQgc2VydmljZS5wdXRJdGVtKHNwYXduUHJlc2V0Tm9kZSk7XHJcbiAgICAgICAgY29uc3QgcmVhZE5vZGUgPSBhd2FpdCBzZXJ2aWNlLmdldE5vZGUocGspO1xyXG5cclxuICAgICAgICAvLyBBc3NlcnRcclxuICAgICAgICBleHBlY3QocmVhZE5vZGUpLm5vdC50b0JlTnVsbCgpO1xyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZT8uZW50aXR5VHlwZSkudG9CZShTcGF3blByZXNldEVudGl0eSk7XHJcbiAgICAgICAgLy8gVmVyaWZ5IGl0J3MgYSBTcGF3blByZXNldE5vZGUgd2l0aCBwcm9wZXIgZGF0YVxyXG4gICAgICAgIGlmIChyZWFkTm9kZSAmJiAnc3Bhd25QcmVzZXRPcHRpb25zJyBpbiByZWFkTm9kZSkge1xyXG4gICAgICAgICAgICBleHBlY3QoKHJlYWROb2RlIGFzIGFueSkuc3Bhd25QcmVzZXRPcHRpb25zLm5hbWUpLnRvRXF1YWwoc3Bhd25QcmVzZXREYXRhLm5hbWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoKHJlYWROb2RlIGFzIGFueSkuc3Bhd25QcmVzZXRPcHRpb25zLmNvbmRpdGlvbikudG9FcXVhbChzcGF3blByZXNldERhdGEuY29uZGl0aW9uKTtcclxuICAgICAgICAgICAgZXhwZWN0KChyZWFkTm9kZSBhcyBhbnkpLnNwYXduUHJlc2V0T3B0aW9ucy5hbnRpQ29uZGl0aW9uKS50b0VxdWFsKHNwYXduUHJlc2V0RGF0YS5hbnRpQ29uZGl0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcbiJdfQ==