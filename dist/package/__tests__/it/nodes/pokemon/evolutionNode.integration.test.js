"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gravelmon_dynamodb_1 = require("../../../../gravelmon-dynamodb");
const testEnv_1 = require("../../../testEnv");
const gravelmon_dynamodb_2 = require("../../../../gravelmon-dynamodb");
const gravelmon_dynamodb_3 = require("../../../../gravelmon-dynamodb");
const gravelmon_dynamodb_4 = require("../../../../gravelmon-dynamodb");
const gravelmon_dynamodb_5 = require("../../../../gravelmon-dynamodb");
const gravelmon_dynamodb_6 = require("../../../../gravelmon-dynamodb");
const gravelmon_dynamodb_7 = require("../../../../gravelmon-dynamodb");
const gravelmon_dynamodb_8 = require("../../../../gravelmon-dynamodb");
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
describe("EvolutionNode Integration Tests", () => {
    const testEvolutionConditions = [
        // LEVEL
        new gravelmon_dynamodb_6.LevelCondition(36),
        // TIME
        new gravelmon_dynamodb_8.TimeCondition(gravelmon_dynamodb_1.Time.Night),
        // RATIO
        new gravelmon_dynamodb_6.StatCompareCondition(gravelmon_dynamodb_1.Stat.attack, gravelmon_dynamodb_1.Stat.defence),
        // HAS_MOVE
        new gravelmon_dynamodb_6.HasMoveCondition(new gravelmon_dynamodb_7.MoveIdentifier("pokemon_red", "tackle")),
        // HELD_ITEM
        new gravelmon_dynamodb_6.HeldItemCondition(new gravelmon_dynamodb_4.ResourceLocation("minecraft", "water_stone")),
        // GENDER
        new gravelmon_dynamodb_1.PropertyCondition(`gender=${gravelmon_dynamodb_6.Gender.MALE}`),
        // FRIENDSHIP
        new gravelmon_dynamodb_6.FriendshipCondition(220),
        // PARTY_MEMBER (pokemon)
        new gravelmon_dynamodb_1.PartyMemberCondition("pikachu"),
        // PARTY_MEMBER_OF_TYPE
        new gravelmon_dynamodb_1.PartyMemberCondition("type=fire"),
        // BIOME
        new gravelmon_dynamodb_6.BiomeCondition(new gravelmon_dynamodb_4.ResourceLocation("minecraft", "plains")),
        // WEATHER - rain
        new gravelmon_dynamodb_6.RainingCondition(true),
        // WEATHER - thunder
        new gravelmon_dynamodb_6.ThunderCondition(true),
        // BLOCKS_TRAVELED
        new gravelmon_dynamodb_6.BlocksTraveledCondition(5000)
    ];
    it("should serialize and deserialize an EvolutionNode correctly", async () => {
        // -------------------------
        // Arrange
        // -------------------------
        const result = new gravelmon_dynamodb_3.PokemonIdentifier("pokemon", "raichu");
        const evolutionNode = new gravelmon_dynamodb_5.EvolutionNode(result, [{
                evolutionType: gravelmon_dynamodb_5.EvolutionType.ItemInteract,
                consumesHeldItem: true,
                isOptional: false,
                evolutionConditions: testEvolutionConditions,
                needsToHoldItem: new gravelmon_dynamodb_4.ResourceLocation("minecraft", "thunder_stone"),
                requiresItemUsedOn: new gravelmon_dynamodb_4.ResourceLocation("minecraft", "player"),
                learnsMovesUponEvolving: [new gravelmon_dynamodb_7.MoveIdentifier("pokemon_red", "tackle")],
            }], []);
        const pk = (0, gravelmon_dynamodb_2.getNodePK)(gravelmon_dynamodb_5.EvolutionEntity, result.toString());
        // -------------------------
        // Act
        // -------------------------
        await service.putItem(evolutionNode);
        const readNode = await service.getNode(pk);
        // -------------------------
        // Assert (node-level)
        // -------------------------
        expect(readNode).not.toBeNull();
        expect(readNode.entityType).toBe(gravelmon_dynamodb_5.EvolutionEntity);
        // -------------------------
        // Assert identifier
        // -------------------------
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZvbHV0aW9uTm9kZS5pbnRlZ3JhdGlvbi50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL19fdGVzdHNfXy9pdC9ub2Rlcy9wb2tlbW9uL2V2b2x1dGlvbk5vZGUuaW50ZWdyYXRpb24udGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVFQU13QztBQUN4Qyw4Q0FBK0M7QUFDL0MsdUVBQXlEO0FBRXpELHVFQUFpRTtBQUNqRSx1RUFBZ0U7QUFDaEUsdUVBSXdDO0FBQ3hDLHVFQVd3QztBQUV4Qyx1RUFBOEQ7QUFDOUQsdUVBQTZEO0FBRTdELElBQUksT0FBaUMsQ0FBQztBQUN0QyxJQUFJLEdBQXFDLENBQUM7QUFFMUMsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ2pCLEdBQUcsR0FBRyxJQUFBLHVCQUFhLEVBQUMsV0FBVyxDQUFDLENBQUM7SUFDakMsTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEIsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDaEIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLGlDQUFpQyxFQUFFLEdBQUcsRUFBRTtJQUU3QyxNQUFNLHVCQUF1QixHQUFHO1FBQzVCLFFBQVE7UUFDUixJQUFJLG1DQUFjLENBQUMsRUFBRSxDQUFDO1FBRXRCLE9BQU87UUFDUCxJQUFJLGtDQUFhLENBQUMseUJBQUksQ0FBQyxLQUFLLENBQUM7UUFFN0IsUUFBUTtRQUNSLElBQUkseUNBQW9CLENBQUMseUJBQUksQ0FBQyxNQUFNLEVBQUUseUJBQUksQ0FBQyxPQUFPLENBQUM7UUFFbkQsV0FBVztRQUNYLElBQUkscUNBQWdCLENBQ2hCLElBQUksbUNBQWMsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQzlDO1FBRUQsWUFBWTtRQUNaLElBQUksc0NBQWlCLENBQ2pCLElBQUkscUNBQWdCLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUNuRDtRQUVELFNBQVM7UUFDVCxJQUFJLHNDQUFpQixDQUFDLFVBQVUsMkJBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU5QyxhQUFhO1FBQ2IsSUFBSSx3Q0FBbUIsQ0FBQyxHQUFHLENBQUM7UUFFNUIseUJBQXlCO1FBQ3pCLElBQUkseUNBQW9CLENBQUMsU0FBUyxDQUFDO1FBRW5DLHVCQUF1QjtRQUN2QixJQUFJLHlDQUFvQixDQUFDLFdBQVcsQ0FBQztRQUVyQyxRQUFRO1FBQ1IsSUFBSSxtQ0FBYyxDQUNkLElBQUkscUNBQWdCLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUM5QztRQUVELGlCQUFpQjtRQUNqQixJQUFJLHFDQUFnQixDQUFDLElBQUksQ0FBQztRQUUxQixvQkFBb0I7UUFDcEIsSUFBSSxxQ0FBZ0IsQ0FBQyxJQUFJLENBQUM7UUFFMUIsa0JBQWtCO1FBQ2xCLElBQUksNENBQXVCLENBQUMsSUFBSSxDQUFDO0tBQ3BDLENBQUM7SUFDRixFQUFFLENBQUMsNkRBQTZELEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFFekUsNEJBQTRCO1FBQzVCLFVBQVU7UUFDViw0QkFBNEI7UUFDNUIsTUFBTSxNQUFNLEdBQUcsSUFBSSxzQ0FBaUIsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFMUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxrQ0FBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUM3QyxhQUFhLEVBQUUsa0NBQWEsQ0FBQyxZQUFZO2dCQUN6QyxnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixVQUFVLEVBQUUsS0FBSztnQkFFakIsbUJBQW1CLEVBQUUsdUJBQXVCO2dCQUU1QyxlQUFlLEVBQUUsSUFBSSxxQ0FBZ0IsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDO2dCQUNuRSxrQkFBa0IsRUFBRSxJQUFJLHFDQUFnQixDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUM7Z0JBRS9ELHVCQUF1QixFQUFFLENBQUMsSUFBSSxtQ0FBYyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN6RSxDQUFDLEVBQUUsRUFBRSxDQUNMLENBQUM7UUFFRixNQUFNLEVBQUUsR0FBRyxJQUFBLDhCQUFTLEVBQUMsb0NBQWUsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUV6RCw0QkFBNEI7UUFDNUIsTUFBTTtRQUNOLDRCQUE0QjtRQUM1QixNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsTUFBTSxRQUFRLEdBQUcsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBa0IsQ0FBQztRQUU1RCw0QkFBNEI7UUFDNUIsc0JBQXNCO1FBQ3RCLDRCQUE0QjtRQUM1QixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLG9DQUFlLENBQUMsQ0FBQztRQUVsRCw0QkFBNEI7UUFDNUIsb0JBQW9CO1FBQ3BCLDRCQUE0QjtJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIEdyYXZlbG1vbkR5bmFtb0RCU2VydmljZSxcclxuICAgIFBhcnR5TWVtYmVyQ29uZGl0aW9uLFxyXG4gICAgUHJvcGVydHlDb25kaXRpb24sXHJcbiAgICBTdGF0LFxyXG4gICAgVGltZVxyXG59IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGJcIjtcclxuaW1wb3J0IHtjcmVhdGVUZXN0RW52fSBmcm9tIFwiLi4vLi4vLi4vdGVzdEVudlwiO1xyXG5pbXBvcnQge2dldE5vZGVQS30gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYlwiO1xyXG5cclxuaW1wb3J0IHtQb2tlbW9uSWRlbnRpZmllcn0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYlwiO1xyXG5pbXBvcnQge1Jlc291cmNlTG9jYXRpb259IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGJcIjtcclxuaW1wb3J0IHtcclxuICAgIEV2b2x1dGlvbkVudGl0eSxcclxuICAgIEV2b2x1dGlvbk5vZGUsXHJcbiAgICBFdm9sdXRpb25UeXBlXHJcbn0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYlwiO1xyXG5pbXBvcnQge1xyXG4gICAgTGV2ZWxDb25kaXRpb24sXHJcbiAgICBTdGF0Q29tcGFyZUNvbmRpdGlvbixcclxuICAgIEhhc01vdmVDb25kaXRpb24sXHJcbiAgICBIZWxkSXRlbUNvbmRpdGlvbixcclxuICAgIEZyaWVuZHNoaXBDb25kaXRpb24sXHJcbiAgICBCaW9tZUNvbmRpdGlvbixcclxuICAgIFJhaW5pbmdDb25kaXRpb24sXHJcbiAgICBUaHVuZGVyQ29uZGl0aW9uLFxyXG4gICAgQmxvY2tzVHJhdmVsZWRDb25kaXRpb24sXHJcbiAgICBHZW5kZXJcclxufSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiXCI7XHJcblxyXG5pbXBvcnQge01vdmVJZGVudGlmaWVyfSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiXCI7XHJcbmltcG9ydCB7VGltZUNvbmRpdGlvbn0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYlwiO1xyXG5cclxubGV0IHNlcnZpY2U6IEdyYXZlbG1vbkR5bmFtb0RCU2VydmljZTtcclxubGV0IGVudjogUmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlVGVzdEVudj47XHJcblxyXG5iZWZvcmVBbGwoYXN5bmMgKCkgPT4ge1xyXG4gICAgZW52ID0gY3JlYXRlVGVzdEVudihcImdhbWUtbm9kZVwiKTtcclxuICAgIGF3YWl0IGVudi5jcmVhdGVUYWJsZSgpO1xyXG4gICAgc2VydmljZSA9IGVudi5zZXJ2aWNlO1xyXG59KTtcclxuXHJcbmFmdGVyQWxsKGFzeW5jICgpID0+IHtcclxuICAgIGVudi5kZXN0cm95KCk7XHJcbn0pO1xyXG5cclxuZGVzY3JpYmUoXCJFdm9sdXRpb25Ob2RlIEludGVncmF0aW9uIFRlc3RzXCIsICgpID0+IHtcclxuXHJcbiAgICBjb25zdCB0ZXN0RXZvbHV0aW9uQ29uZGl0aW9ucyA9IFtcclxuICAgICAgICAvLyBMRVZFTFxyXG4gICAgICAgIG5ldyBMZXZlbENvbmRpdGlvbigzNiksXHJcblxyXG4gICAgICAgIC8vIFRJTUVcclxuICAgICAgICBuZXcgVGltZUNvbmRpdGlvbihUaW1lLk5pZ2h0KSxcclxuXHJcbiAgICAgICAgLy8gUkFUSU9cclxuICAgICAgICBuZXcgU3RhdENvbXBhcmVDb25kaXRpb24oU3RhdC5hdHRhY2ssIFN0YXQuZGVmZW5jZSksXHJcblxyXG4gICAgICAgIC8vIEhBU19NT1ZFXHJcbiAgICAgICAgbmV3IEhhc01vdmVDb25kaXRpb24oXHJcbiAgICAgICAgICAgIG5ldyBNb3ZlSWRlbnRpZmllcihcInBva2Vtb25fcmVkXCIsIFwidGFja2xlXCIpXHJcbiAgICAgICAgKSxcclxuXHJcbiAgICAgICAgLy8gSEVMRF9JVEVNXHJcbiAgICAgICAgbmV3IEhlbGRJdGVtQ29uZGl0aW9uKFxyXG4gICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcIndhdGVyX3N0b25lXCIpXHJcbiAgICAgICAgKSxcclxuXHJcbiAgICAgICAgLy8gR0VOREVSXHJcbiAgICAgICAgbmV3IFByb3BlcnR5Q29uZGl0aW9uKGBnZW5kZXI9JHtHZW5kZXIuTUFMRX1gKSxcclxuXHJcbiAgICAgICAgLy8gRlJJRU5EU0hJUFxyXG4gICAgICAgIG5ldyBGcmllbmRzaGlwQ29uZGl0aW9uKDIyMCksXHJcblxyXG4gICAgICAgIC8vIFBBUlRZX01FTUJFUiAocG9rZW1vbilcclxuICAgICAgICBuZXcgUGFydHlNZW1iZXJDb25kaXRpb24oXCJwaWthY2h1XCIpLFxyXG5cclxuICAgICAgICAvLyBQQVJUWV9NRU1CRVJfT0ZfVFlQRVxyXG4gICAgICAgIG5ldyBQYXJ0eU1lbWJlckNvbmRpdGlvbihcInR5cGU9ZmlyZVwiKSxcclxuXHJcbiAgICAgICAgLy8gQklPTUVcclxuICAgICAgICBuZXcgQmlvbWVDb25kaXRpb24oXHJcbiAgICAgICAgICAgIG5ldyBSZXNvdXJjZUxvY2F0aW9uKFwibWluZWNyYWZ0XCIsIFwicGxhaW5zXCIpXHJcbiAgICAgICAgKSxcclxuXHJcbiAgICAgICAgLy8gV0VBVEhFUiAtIHJhaW5cclxuICAgICAgICBuZXcgUmFpbmluZ0NvbmRpdGlvbih0cnVlKSxcclxuXHJcbiAgICAgICAgLy8gV0VBVEhFUiAtIHRodW5kZXJcclxuICAgICAgICBuZXcgVGh1bmRlckNvbmRpdGlvbih0cnVlKSxcclxuXHJcbiAgICAgICAgLy8gQkxPQ0tTX1RSQVZFTEVEXHJcbiAgICAgICAgbmV3IEJsb2Nrc1RyYXZlbGVkQ29uZGl0aW9uKDUwMDApXHJcbiAgICBdO1xyXG4gICAgaXQoXCJzaG91bGQgc2VyaWFsaXplIGFuZCBkZXNlcmlhbGl6ZSBhbiBFdm9sdXRpb25Ob2RlIGNvcnJlY3RseVwiLCBhc3luYyAoKSA9PiB7XHJcblxyXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyBBcnJhbmdlXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBQb2tlbW9uSWRlbnRpZmllcihcInBva2Vtb25cIiwgXCJyYWljaHVcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IGV2b2x1dGlvbk5vZGUgPSBuZXcgRXZvbHV0aW9uTm9kZShyZXN1bHQsIFt7XHJcbiAgICAgICAgICAgIGV2b2x1dGlvblR5cGU6IEV2b2x1dGlvblR5cGUuSXRlbUludGVyYWN0LFxyXG4gICAgICAgICAgICBjb25zdW1lc0hlbGRJdGVtOiB0cnVlLFxyXG4gICAgICAgICAgICBpc09wdGlvbmFsOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIGV2b2x1dGlvbkNvbmRpdGlvbnM6IHRlc3RFdm9sdXRpb25Db25kaXRpb25zLFxyXG5cclxuICAgICAgICAgICAgbmVlZHNUb0hvbGRJdGVtOiBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcInRodW5kZXJfc3RvbmVcIiksXHJcbiAgICAgICAgICAgIHJlcXVpcmVzSXRlbVVzZWRPbjogbmV3IFJlc291cmNlTG9jYXRpb24oXCJtaW5lY3JhZnRcIiwgXCJwbGF5ZXJcIiksXHJcblxyXG4gICAgICAgICAgICBsZWFybnNNb3Zlc1Vwb25Fdm9sdmluZzogW25ldyBNb3ZlSWRlbnRpZmllcihcInBva2Vtb25fcmVkXCIsIFwidGFja2xlXCIpXSxcclxuICAgICAgICB9XSwgW11cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjb25zdCBwayA9IGdldE5vZGVQSyhFdm9sdXRpb25FbnRpdHksIHJlc3VsdC50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIEFjdFxyXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICBhd2FpdCBzZXJ2aWNlLnB1dEl0ZW0oZXZvbHV0aW9uTm9kZSk7XHJcbiAgICAgICAgY29uc3QgcmVhZE5vZGUgPSBhd2FpdCBzZXJ2aWNlLmdldE5vZGUocGspIGFzIEV2b2x1dGlvbk5vZGU7XHJcblxyXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyBBc3NlcnQgKG5vZGUtbGV2ZWwpXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZSkubm90LnRvQmVOdWxsKCk7XHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLmVudGl0eVR5cGUpLnRvQmUoRXZvbHV0aW9uRW50aXR5KTtcclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIEFzc2VydCBpZGVudGlmaWVyXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgfSk7XHJcbn0pOyJdfQ==