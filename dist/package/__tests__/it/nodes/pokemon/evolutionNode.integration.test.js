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
        const evolutionNode = new gravelmon_dynamodb_5.EvolutionNode(result, {
            evolutionType: gravelmon_dynamodb_5.EvolutionType.ItemInteract,
            consumesHeldItem: true,
            isOptional: false,
            evolutionConditions: testEvolutionConditions,
            needsToHoldItem: new gravelmon_dynamodb_4.ResourceLocation("minecraft", "thunder_stone"),
            requiresItemUsedOn: new gravelmon_dynamodb_4.ResourceLocation("minecraft", "player"),
            learnsMovesUponEvolving: [new gravelmon_dynamodb_7.MoveIdentifier("pokemon_red", "tackle")],
        }, [], []);
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
        expect(readNode.evolutionOptions.evolutionType)
            .toBe(gravelmon_dynamodb_5.EvolutionType.ItemInteract);
        expect(readNode.evolutionOptions.consumesHeldItem)
            .toBe(true);
        expect(readNode.evolutionOptions.isOptional)
            .toBe(false);
        // -------------------------
        // Assert item interactions
        // -------------------------
        expect(readNode.evolutionOptions.needsToHoldItem?.toString())
            .toBe("minecraft:thunder_stone");
        expect(readNode.evolutionOptions.requiresItemUsedOn?.toString())
            .toBe("minecraft:player");
        // -------------------------
        // Assert move learning
        // -------------------------
        expect(readNode.evolutionOptions.learnsMovesUponEvolving)
            .toEqual([new gravelmon_dynamodb_7.MoveIdentifier("pokemon_red", "tackle")]);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZvbHV0aW9uTm9kZS5pbnRlZ3JhdGlvbi50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL19fdGVzdHNfXy9pdC9ub2Rlcy9wb2tlbW9uL2V2b2x1dGlvbk5vZGUuaW50ZWdyYXRpb24udGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVFQU13QztBQUN4Qyw4Q0FBK0M7QUFDL0MsdUVBQXlEO0FBRXpELHVFQUFpRTtBQUNqRSx1RUFBZ0U7QUFDaEUsdUVBSXdDO0FBQ3hDLHVFQVd3QztBQUV4Qyx1RUFBOEQ7QUFDOUQsdUVBQTZEO0FBRTdELElBQUksT0FBaUMsQ0FBQztBQUN0QyxJQUFJLEdBQXFDLENBQUM7QUFFMUMsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ2pCLEdBQUcsR0FBRyxJQUFBLHVCQUFhLEVBQUMsV0FBVyxDQUFDLENBQUM7SUFDakMsTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEIsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDaEIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLGlDQUFpQyxFQUFFLEdBQUcsRUFBRTtJQUU3QyxNQUFNLHVCQUF1QixHQUFHO1FBQzVCLFFBQVE7UUFDUixJQUFJLG1DQUFjLENBQUMsRUFBRSxDQUFDO1FBRXRCLE9BQU87UUFDUCxJQUFJLGtDQUFhLENBQUMseUJBQUksQ0FBQyxLQUFLLENBQUM7UUFFN0IsUUFBUTtRQUNSLElBQUkseUNBQW9CLENBQUMseUJBQUksQ0FBQyxNQUFNLEVBQUUseUJBQUksQ0FBQyxPQUFPLENBQUM7UUFFbkQsV0FBVztRQUNYLElBQUkscUNBQWdCLENBQ2hCLElBQUksbUNBQWMsQ0FBQyxhQUFhLEVBQUUsUUFB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QXlCLENBQUMsQ0FBQztRQUVyQyxNQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxDQUFDO2FBQzNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlCLDRCQUE0QjtRQUM1Qix1QkFBdUI7UUFDdkIsNEJBQTRCO1FBQzVCLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUM7YUFDcEQsT0FBTyxDQUFDLENBQUMsSUFBSSxtQ0FBYyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBHcmF2ZWxtb25EeW5hbW9EQlNlcnZpY2UsXHJcbiAgICBQYXJ0eU1lbWJlckNvbmRpdGlvbixcclxuICAgIFByb3BlcnR5Q29uZGl0aW9uLFxyXG4gICAgU3RhdCxcclxuICAgIFRpbWVcclxufSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiXCI7XHJcbmltcG9ydCB7Y3JlYXRlVGVzdEVudn0gZnJvbSBcIi4uLy4uLy4uL3Rlc3RFbnZcIjtcclxuaW1wb3J0IHtnZXROb2RlUEt9IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGJcIjtcclxuXHJcbmltcG9ydCB7UG9rZW1vbklkZW50aWZpZXJ9IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGJcIjtcclxuaW1wb3J0IHtSZXNvdXJjZUxvY2F0aW9ufSBmcm9tIFwiLi4vLi4vLi4vLi4vZ3JhdmVsbW9uLWR5bmFtb2RiXCI7XHJcbmltcG9ydCB7XHJcbiAgICBFdm9sdXRpb25FbnRpdHksXHJcbiAgICBFdm9sdXRpb25Ob2RlLFxyXG4gICAgRXZvbHV0aW9uVHlwZVxyXG59IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGJcIjtcclxuaW1wb3J0IHtcclxuICAgIExldmVsQ29uZGl0aW9uLFxyXG4gICAgU3RhdENvbXBhcmVDb25kaXRpb24sXHJcbiAgICBIYXNNb3ZlQ29uZGl0aW9uLFxyXG4gICAgSGVsZEl0ZW1Db25kaXRpb24sXHJcbiAgICBGcmllbmRzaGlwQ29uZGl0aW9uLFxyXG4gICAgQmlvbWVDb25kaXRpb24sXHJcbiAgICBSYWluaW5nQ29uZGl0aW9uLFxyXG4gICAgVGh1bmRlckNvbmRpdGlvbixcclxuICAgIEJsb2Nrc1RyYXZlbGVkQ29uZGl0aW9uLFxyXG4gICAgR2VuZGVyXHJcbn0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYlwiO1xyXG5cclxuaW1wb3J0IHtNb3ZlSWRlbnRpZmllcn0gZnJvbSBcIi4uLy4uLy4uLy4uL2dyYXZlbG1vbi1keW5hbW9kYlwiO1xyXG5pbXBvcnQge1RpbWVDb25kaXRpb259IGZyb20gXCIuLi8uLi8uLi8uLi9ncmF2ZWxtb24tZHluYW1vZGJcIjtcclxuXHJcbmxldCBzZXJ2aWNlOiBHcmF2ZWxtb25EeW5hbW9EQlNlcnZpY2U7XHJcbmxldCBlbnY6IFJldHVyblR5cGU8dHlwZW9mIGNyZWF0ZVRlc3RFbnY+O1xyXG5cclxuYmVmb3JlQWxsKGFzeW5jICgpID0+IHtcclxuICAgIGVudiA9IGNyZWF0ZVRlc3RFbnYoXCJnYW1lLW5vZGVcIik7XHJcbiAgICBhd2FpdCBlbnYuY3JlYXRlVGFibGUoKTtcclxuICAgIHNlcnZpY2UgPSBlbnYuc2VydmljZTtcclxufSk7XHJcblxyXG5hZnRlckFsbChhc3luYyAoKSA9PiB7XHJcbiAgICBlbnYuZGVzdHJveSgpO1xyXG59KTtcclxuXHJcbmRlc2NyaWJlKFwiRXZvbHV0aW9uTm9kZSBJbnRlZ3JhdGlvbiBUZXN0c1wiLCAoKSA9PiB7XHJcblxyXG4gICAgY29uc3QgdGVzdEV2b2x1dGlvbkNvbmRpdGlvbnMgPSBbXHJcbiAgICAgICAgLy8gTEVWRUxcclxuICAgICAgICBuZXcgTGV2ZWxDb25kaXRpb24oMzYpLFxyXG5cclxuICAgICAgICAvLyBUSU1FXHJcbiAgICAgICAgbmV3IFRpbWVDb25kaXRpb24oVGltZS5OaWdodCksXHJcblxyXG4gICAgICAgIC8vIFJBVElPXHJcbiAgICAgICAgbmV3IFN0YXRDb21wYXJlQ29uZGl0aW9uKFN0YXQuYXR0YWNrLCBTdGF0LmRlZmVuY2UpLFxyXG5cclxuICAgICAgICAvLyBIQVNfTU9WRVxyXG4gICAgICAgIG5ldyBIYXNNb3ZlQ29uZGl0aW9uKFxyXG4gICAgICAgICAgICBuZXcgTW92ZUlkZW50aWZpZXIoXCJwb2tlbW9uX3JlZFwiLCBcInRhY2tsZVwiKVxyXG4gICAgICAgICksXHJcblxyXG4gICAgICAgIC8vIEhFTERfSVRFTVxyXG4gICAgICAgIG5ldyBIZWxkSXRlbUNvbmRpdGlvbihcclxuICAgICAgICAgICAgbmV3IFJlc291cmNlTG9jYXRpb24oXCJtaW5lY3JhZnRcIiwgXCJ3YXRlcl9zdG9uZVwiKVxyXG4gICAgICAgICksXHJcblxyXG4gICAgICAgIC8vIEdFTkRFUlxyXG4gICAgICAgIG5ldyBQcm9wZXJ0eUNvbmRpdGlvbihgZ2VuZGVyPSR7R2VuZGVyLk1BTEV9YCksXHJcblxyXG4gICAgICAgIC8vIEZSSUVORFNISVBcclxuICAgICAgICBuZXcgRnJpZW5kc2hpcENvbmRpdGlvbigyMjApLFxyXG5cclxuICAgICAgICAvLyBQQVJUWV9NRU1CRVIgKHBva2Vtb24pXHJcbiAgICAgICAgbmV3IFBhcnR5TWVtYmVyQ29uZGl0aW9uKFwicGlrYWNodVwiKSxcclxuXHJcbiAgICAgICAgLy8gUEFSVFlfTUVNQkVSX09GX1RZUEVcclxuICAgICAgICBuZXcgUGFydHlNZW1iZXJDb25kaXRpb24oXCJ0eXBlPWZpcmVcIiksXHJcblxyXG4gICAgICAgIC8vIEJJT01FXHJcbiAgICAgICAgbmV3IEJpb21lQ29uZGl0aW9uKFxyXG4gICAgICAgICAgICBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcInBsYWluc1wiKVxyXG4gICAgICAgICksXHJcblxyXG4gICAgICAgIC8vIFdFQVRIRVIgLSByYWluXHJcbiAgICAgICAgbmV3IFJhaW5pbmdDb25kaXRpb24odHJ1ZSksXHJcblxyXG4gICAgICAgIC8vIFdFQVRIRVIgLSB0aHVuZGVyXHJcbiAgICAgICAgbmV3IFRodW5kZXJDb25kaXRpb24odHJ1ZSksXHJcblxyXG4gICAgICAgIC8vIEJMT0NLU19UUkFWRUxFRFxyXG4gICAgICAgIG5ldyBCbG9ja3NUcmF2ZWxlZENvbmRpdGlvbig1MDAwKVxyXG4gICAgXTtcclxuICAgIGl0KFwic2hvdWxkIHNlcmlhbGl6ZSBhbmQgZGVzZXJpYWxpemUgYW4gRXZvbHV0aW9uTm9kZSBjb3JyZWN0bHlcIiwgYXN5bmMgKCkgPT4ge1xyXG5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gQXJyYW5nZVxyXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgUG9rZW1vbklkZW50aWZpZXIoXCJwb2tlbW9uXCIsIFwicmFpY2h1XCIpO1xyXG5cclxuICAgICAgICBjb25zdCBldm9sdXRpb25Ob2RlID0gbmV3IEV2b2x1dGlvbk5vZGUocmVzdWx0LCB7XHJcbiAgICAgICAgICAgIGV2b2x1dGlvblR5cGU6IEV2b2x1dGlvblR5cGUuSXRlbUludGVyYWN0LFxyXG4gICAgICAgICAgICBjb25zdW1lc0hlbGRJdGVtOiB0cnVlLFxyXG4gICAgICAgICAgICBpc09wdGlvbmFsOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIGV2b2x1dGlvbkNvbmRpdGlvbnM6IHRlc3RFdm9sdXRpb25Db25kaXRpb25zLFxyXG5cclxuICAgICAgICAgICAgbmVlZHNUb0hvbGRJdGVtOiBuZXcgUmVzb3VyY2VMb2NhdGlvbihcIm1pbmVjcmFmdFwiLCBcInRodW5kZXJfc3RvbmVcIiksXHJcbiAgICAgICAgICAgIHJlcXVpcmVzSXRlbVVzZWRPbjogbmV3IFJlc291cmNlTG9jYXRpb24oXCJtaW5lY3JhZnRcIiwgXCJwbGF5ZXJcIiksXHJcblxyXG4gICAgICAgICAgICBsZWFybnNNb3Zlc1Vwb25Fdm9sdmluZzogW25ldyBNb3ZlSWRlbnRpZmllcihcInBva2Vtb25fcmVkXCIsIFwidGFja2xlXCIpXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFtdLCBbXVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBrID0gZ2V0Tm9kZVBLKEV2b2x1dGlvbkVudGl0eSwgcmVzdWx0LnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gQWN0XHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIGF3YWl0IHNlcnZpY2UucHV0SXRlbShldm9sdXRpb25Ob2RlKTtcclxuICAgICAgICBjb25zdCByZWFkTm9kZSA9IGF3YWl0IHNlcnZpY2UuZ2V0Tm9kZShwaykgYXMgRXZvbHV0aW9uTm9kZTtcclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIEFzc2VydCAobm9kZS1sZXZlbClcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlKS5ub3QudG9CZU51bGwoKTtcclxuICAgICAgICBleHBlY3QocmVhZE5vZGUuZW50aXR5VHlwZSkudG9CZShFdm9sdXRpb25FbnRpdHkpO1xyXG5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gQXNzZXJ0IGlkZW50aWZpZXJcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLmV2b2x1dGlvbk9wdGlvbnMuZXZvbHV0aW9uVHlwZSlcclxuICAgICAgICAgICAgLnRvQmUoRXZvbHV0aW9uVHlwZS5JdGVtSW50ZXJhY3QpO1xyXG5cclxuICAgICAgICBleHBlY3QocmVhZE5vZGUuZXZvbHV0aW9uT3B0aW9ucy5jb25zdW1lc0hlbGRJdGVtKVxyXG4gICAgICAgICAgICAudG9CZSh0cnVlKTtcclxuXHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLmV2b2x1dGlvbk9wdGlvbnMuaXNPcHRpb25hbClcclxuICAgICAgICAgICAgLnRvQmUoZmFsc2UpO1xyXG5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gQXNzZXJ0IGl0ZW0gaW50ZXJhY3Rpb25zXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5ldm9sdXRpb25PcHRpb25zLm5lZWRzVG9Ib2xkSXRlbT8udG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgLnRvQmUoXCJtaW5lY3JhZnQ6dGh1bmRlcl9zdG9uZVwiKTtcclxuXHJcbiAgICAgICAgZXhwZWN0KHJlYWROb2RlLmV2b2x1dGlvbk9wdGlvbnMucmVxdWlyZXNJdGVtVXNlZE9uPy50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAudG9CZShcIm1pbmVjcmFmdDpwbGF5ZXJcIik7XHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIEFzc2VydCBtb3ZlIGxlYXJuaW5nXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIGV4cGVjdChyZWFkTm9kZS5ldm9sdXRpb25PcHRpb25zLmxlYXJuc01vdmVzVXBvbkV2b2x2aW5nKVxyXG4gICAgICAgICAgICAudG9FcXVhbChbbmV3IE1vdmVJZGVudGlmaWVyKFwicG9rZW1vbl9yZWRcIiwgXCJ0YWNrbGVcIildKTtcclxuICAgIH0pO1xyXG59KTsiXX0=