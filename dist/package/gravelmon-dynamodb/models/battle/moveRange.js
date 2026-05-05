"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveRange = void 0;
var MoveRange;
(function (MoveRange) {
    MoveRange[MoveRange["SingleTarget"] = 0] = "SingleTarget";
    MoveRange[MoveRange["Self"] = 1] = "Self";
    MoveRange[MoveRange["SingleAlly"] = 2] = "SingleAlly";
    MoveRange[MoveRange["AllPokemon"] = 3] = "AllPokemon";
    MoveRange[MoveRange["AllAllies"] = 4] = "AllAllies";
    MoveRange[MoveRange["AllOpponents"] = 5] = "AllOpponents";
    MoveRange[MoveRange["RandomOpponent"] = 6] = "RandomOpponent";
    MoveRange[MoveRange["EntireField"] = 7] = "EntireField";
    MoveRange[MoveRange["OpponentSide"] = 8] = "OpponentSide";
    MoveRange[MoveRange["UserSide"] = 9] = "UserSide";
    MoveRange[MoveRange["Varies"] = 10] = "Varies";
})(MoveRange || (exports.MoveRange = MoveRange = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92ZVJhbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2dyYXZlbG1vbi1keW5hbW9kYi9tb2RlbHMvYmF0dGxlL21vdmVSYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFZLFNBWVg7QUFaRCxXQUFZLFNBQVM7SUFDakIseURBQVksQ0FBQTtJQUNaLHlDQUFJLENBQUE7SUFDSixxREFBVSxDQUFBO0lBQ1YscURBQVUsQ0FBQTtJQUNWLG1EQUFTLENBQUE7SUFDVCx5REFBWSxDQUFBO0lBQ1osNkRBQWMsQ0FBQTtJQUNkLHVEQUFXLENBQUE7SUFDWCx5REFBWSxDQUFBO0lBQ1osaURBQVEsQ0FBQTtJQUNSLDhDQUFNLENBQUE7QUFDVixDQUFDLEVBWlcsU0FBUyx5QkFBVCxTQUFTLFFBWXBCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gTW92ZVJhbmdlIHtcclxuICAgIFNpbmdsZVRhcmdldCxcclxuICAgIFNlbGYsXHJcbiAgICBTaW5nbGVBbGx5LFxyXG4gICAgQWxsUG9rZW1vbixcclxuICAgIEFsbEFsbGllcyxcclxuICAgIEFsbE9wcG9uZW50cyxcclxuICAgIFJhbmRvbU9wcG9uZW50LFxyXG4gICAgRW50aXJlRmllbGQsXHJcbiAgICBPcHBvbmVudFNpZGUsXHJcbiAgICBVc2VyU2lkZSxcclxuICAgIFZhcmllc1xyXG59Il19