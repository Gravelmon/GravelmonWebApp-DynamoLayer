"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationTypes = exports.RidingStyle = exports.NamedAnimationTypes = void 0;
exports.serializeAnimation = serializeAnimation;
exports.deserializeAnimation = deserializeAnimation;
const ConditionTree_1 = require("./ConditionTree");
function serializeAnimation(anim) {
    const base = {
        type: anim.type,
        animationSource: anim.animationSource,
        animationOverwriteString: anim.animationOverwriteString,
        animation: anim.animation,
        conditionExpression: anim.conditionExpression
            ? (0, ConditionTree_1.serializeExpression)(anim.conditionExpression)
            : undefined,
    };
    if (isLookAnimation(anim)) {
        return {
            ...base,
            pitchMultiplier: anim.pitchMultiplier,
            yawMultiplier: anim.yawMultiplier,
            maxPitch: anim.maxPitch,
            minPitch: anim.minPitch,
            maxYaw: anim.maxYaw,
            minYaw: anim.minYaw,
        };
    }
    if (isNamedAnimation(anim)) {
        return {
            ...base,
            name: anim.name,
            primarySettings: anim.primarySettings,
        };
    }
    if (isQuirkAnimation(anim)) {
        return {
            ...base,
            loopTimes: anim.loopTimes,
            occurrenceRange: anim.occurrenceRange,
            primarySettings: anim.primarySettings,
        };
    }
    throw new Error(`Unknown animation type: ${anim.type}`);
}
function deserializeAnimation(data) {
    if (!data?.type) {
        throw new Error("Invalid animation: missing type");
    }
    const base = {
        type: data.type,
        animationSource: data.animationSource,
        animationOverwriteString: data.animationOverwriteString,
        animation: data.animation ?? [],
        conditionExpression: data.conditionExpression
            ? (0, ConditionTree_1.deserializeExpression)(data.conditionExpression)
            : undefined,
    };
    switch (data.type) {
        case AnimationTypes.Look:
            return {
                ...base,
                pitchMultiplier: data.pitchMultiplier,
                yawMultiplier: data.yawMultiplier,
                maxPitch: data.maxPitch,
                minPitch: data.minPitch,
                maxYaw: data.maxYaw,
                minYaw: data.minYaw,
            };
        case AnimationTypes.Named:
            return {
                ...base,
                name: data.name,
                primarySettings: data.primarySettings,
            };
        case AnimationTypes.Quirk:
            return {
                ...base,
                loopTimes: data.loopTimes,
                occurrenceRange: data.occurrenceRange,
                primarySettings: data.primarySettings,
            };
        default:
            throw new Error(`Unknown AnimationTypes: ${data.type}`);
    }
}
function isLookAnimation(a) {
    return a.type === AnimationTypes.Look;
}
function isNamedAnimation(a) {
    return a.type === AnimationTypes.Named;
}
function isQuirkAnimation(a) {
    return a.type === AnimationTypes.Quirk;
}
var NamedAnimationTypes;
(function (NamedAnimationTypes) {
    NamedAnimationTypes["Cry"] = "cry";
    NamedAnimationTypes["Recoil"] = "recoil";
    NamedAnimationTypes["Status"] = "status";
    NamedAnimationTypes["Special"] = "special";
    NamedAnimationTypes["Physical"] = "Physical";
    NamedAnimationTypes["Faint"] = "faint";
    NamedAnimationTypes["AirSpecial"] = "air_special";
    NamedAnimationTypes["AirPhysical"] = "air_physical";
    NamedAnimationTypes["AirStatus"] = "air_status";
})(NamedAnimationTypes || (exports.NamedAnimationTypes = NamedAnimationTypes = {}));
var RidingStyle;
(function (RidingStyle) {
    RidingStyle[RidingStyle["LAND"] = 0] = "LAND";
    RidingStyle[RidingStyle["LIQUID"] = 1] = "LIQUID";
    RidingStyle[RidingStyle["AIR"] = 2] = "AIR";
})(RidingStyle || (exports.RidingStyle = RidingStyle = {}));
var AnimationTypes;
(function (AnimationTypes) {
    AnimationTypes[AnimationTypes["Look"] = 0] = "Look";
    AnimationTypes[AnimationTypes["Named"] = 1] = "Named";
    AnimationTypes[AnimationTypes["Quirk"] = 2] = "Quirk";
    AnimationTypes[AnimationTypes["Animation"] = 3] = "Animation";
})(AnimationTypes || (exports.AnimationTypes = AnimationTypes = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2dyYXZlbG1vbi1keW5hbW9kYi9tb2RlbHMvYXNzZXRzL3Bvc2luZy9hbmltYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EsZ0RBeUNDO0FBUUQsb0RBNkNDO0FBbkdELG1EQUEyRjtBQUszRixTQUFnQixrQkFBa0IsQ0FBQyxJQUFlO0lBQzlDLE1BQU0sSUFBSSxHQUFHO1FBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1FBQ2YsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1FBQ3JDLHdCQUF3QixFQUFFLElBQUksQ0FBQyx3QkFBd0I7UUFDdkQsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1FBQ3pCLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUI7WUFDekMsQ0FBQyxDQUFDLElBQUEsbUNBQW1CLEVBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1lBQy9DLENBQUMsQ0FBQyxTQUFTO0tBQ2xCLENBQUM7SUFFRixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3hCLE9BQU87WUFDSCxHQUFHLElBQUk7WUFDUCxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ2pDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUN0QixDQUFDO0lBQ04sQ0FBQztJQUVELElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUN6QixPQUFPO1lBQ0gsR0FBRyxJQUFJO1lBQ1AsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFl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QUFDLEVBVlcsbUJBQW1CLG1DQUFuQixtQkFBbUIsUUFVOUI7QUFFRCxJQUFZLFdBSVg7QUFKRCxXQUFZLFdBQVc7SUFDbkIsNkNBQUksQ0FBQTtJQUNKLGlEQUFNLENBQUE7SUFDTiwyQ0FBRyxDQUFBO0FBQ1AsQ0FBQyxFQUpXLFdBQVcsMkJBQVgsV0FBVyxRQUl0QjtBQVVELElBQVksY0FLWDtBQUxELFdBQVksY0FBYztJQUN0QixtREFBSSxDQUFBO0lBQ0oscURBQUssQ0FBQTtJQUNMLHFEQUFLLENBQUE7SUFDTCw2REFBUyxDQUFBO0FBQ2IsQ0FBQyxFQUxXLGNBQWMsOEJBQWQsY0FBYyxRQUt6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZGVzZXJpYWxpemVFeHByZXNzaW9uLCBFeHByZXNzaW9uTm9kZSwgc2VyaWFsaXplRXhwcmVzc2lvbn0gZnJvbSBcIi4vQ29uZGl0aW9uVHJlZVwiO1xyXG5pbXBvcnQge1Bvc2VUeXBlfSBmcm9tIFwiLi9wb3NlVHlwZVwiO1xyXG5pbXBvcnQge01vdmVJZGVudGlmaWVyfSBmcm9tIFwiLi4vLi4vLi4vbm9kZXNcIjtcclxuaW1wb3J0IHtOdW1iZXJSYW5nZX0gZnJvbSBcIi4uLy4uL3Byb3BlcnRpZXNcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVBbmltYXRpb24oYW5pbTogQW5pbWF0aW9uKTogYW55IHtcclxuICAgIGNvbnN0IGJhc2UgPSB7XHJcbiAgICAgICAgdHlwZTogYW5pbS50eXBlLFxyXG4gICAgICAgIGFuaW1hdGlvblNvdXJjZTogYW5pbS5hbmltYXRpb25Tb3VyY2UsXHJcbiAgICAgICAgYW5pbWF0aW9uT3ZlcndyaXRlU3RyaW5nOiBhbmltLmFuaW1hdGlvbk92ZXJ3cml0ZVN0cmluZyxcclxuICAgICAgICBhbmltYXRpb246IGFuaW0uYW5pbWF0aW9uLFxyXG4gICAgICAgIGNvbmRpdGlvbkV4cHJlc3Npb246IGFuaW0uY29uZGl0aW9uRXhwcmVzc2lvblxyXG4gICAgICAgICAgICA/IHNlcmlhbGl6ZUV4cHJlc3Npb24oYW5pbS5jb25kaXRpb25FeHByZXNzaW9uKVxyXG4gICAgICAgICAgICA6IHVuZGVmaW5lZCxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGlzTG9va0FuaW1hdGlvbihhbmltKSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC4uLmJhc2UsXHJcbiAgICAgICAgICAgIHBpdGNoTXVsdGlwbGllcjogYW5pbS5waXRjaE11bHRpcGxpZXIsXHJcbiAgICAgICAgICAgIHlhd011bHRpcGxpZXI6IGFuaW0ueWF3TXVsdGlwbGllcixcclxuICAgICAgICAgICAgbWF4UGl0Y2g6IGFuaW0ubWF4UGl0Y2gsXHJcbiAgICAgICAgICAgIG1pblBpdGNoOiBhbmltLm1pblBpdGNoLFxyXG4gICAgICAgICAgICBtYXhZYXc6IGFuaW0ubWF4WWF3LFxyXG4gICAgICAgICAgICBtaW5ZYXc6IGFuaW0ubWluWWF3LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzTmFtZWRBbmltYXRpb24oYW5pbSkpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi5iYXNlLFxyXG4gICAgICAgICAgICBuYW1lOiBhbmltLm5hbWUsXHJcbiAgICAgICAgICAgIHByaW1hcnlTZXR0aW5nczogYW5pbS5wcmltYXJ5U2V0dGluZ3MsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNRdWlya0FuaW1hdGlvbihhbmltKSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC4uLmJhc2UsXHJcbiAgICAgICAgICAgIGxvb3BUaW1lczogYW5pbS5sb29wVGltZXMsXHJcbiAgICAgICAgICAgIG9jY3VycmVuY2VSYW5nZTogYW5pbS5vY2N1cnJlbmNlUmFuZ2UsXHJcbiAgICAgICAgICAgIHByaW1hcnlTZXR0aW5nczogYW5pbS5wcmltYXJ5U2V0dGluZ3MsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gYW5pbWF0aW9uIHR5cGU6ICR7KGFuaW0gYXMgYW55KS50eXBlfWApO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBBbnlBbmltYXRpb24gPVxyXG4gICAgfCBBbmltYXRpb25cclxuICAgIHwgTG9va0FuaW1hdGlvblxyXG4gICAgfCBOYW1lZEFuaW1hdGlvblxyXG4gICAgfCBRdWlya0FuaW1hdGlvbjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZXNlcmlhbGl6ZUFuaW1hdGlvbihkYXRhOiBhbnkpOiBBbnlBbmltYXRpb24ge1xyXG4gICAgaWYgKCFkYXRhPy50eXBlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBhbmltYXRpb246IG1pc3NpbmcgdHlwZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBiYXNlID0ge1xyXG4gICAgICAgIHR5cGU6IGRhdGEudHlwZSxcclxuICAgICAgICBhbmltYXRpb25Tb3VyY2U6IGRhdGEuYW5pbWF0aW9uU291cmNlLFxyXG4gICAgICAgIGFuaW1hdGlvbk92ZXJ3cml0ZVN0cmluZzogZGF0YS5hbmltYXRpb25PdmVyd3JpdGVTdHJpbmcsXHJcbiAgICAgICAgYW5pbWF0aW9uOiBkYXRhLmFuaW1hdGlvbiA/PyBbXSxcclxuICAgICAgICBjb25kaXRpb25FeHByZXNzaW9uOiBkYXRhLmNvbmRpdGlvbkV4cHJlc3Npb25cclxuICAgICAgICAgICAgPyBkZXNlcmlhbGl6ZUV4cHJlc3Npb24oZGF0YS5jb25kaXRpb25FeHByZXNzaW9uKVxyXG4gICAgICAgICAgICA6IHVuZGVmaW5lZCxcclxuICAgIH07XHJcblxyXG4gICAgc3dpdGNoIChkYXRhLnR5cGUpIHtcclxuICAgICAgICBjYXNlIEFuaW1hdGlvblR5cGVzLkxvb2s6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAuLi5iYXNlLFxyXG4gICAgICAgICAgICAgICAgcGl0Y2hNdWx0aXBsaWVyOiBkYXRhLnBpdGNoTXVsdGlwbGllcixcclxuICAgICAgICAgICAgICAgIHlhd011bHRpcGxpZXI6IGRhdGEueWF3TXVsdGlwbGllcixcclxuICAgICAgICAgICAgICAgIG1heFBpdGNoOiBkYXRhLm1heFBpdGNoLFxyXG4gICAgICAgICAgICAgICAgbWluUGl0Y2g6IGRhdGEubWluUGl0Y2gsXHJcbiAgICAgICAgICAgICAgICBtYXhZYXc6IGRhdGEubWF4WWF3LFxyXG4gICAgICAgICAgICAgICAgbWluWWF3OiBkYXRhLm1pbllhdyxcclxuICAgICAgICAgICAgfSBzYXRpc2ZpZXMgTG9va0FuaW1hdGlvbjtcclxuXHJcbiAgICAgICAgY2FzZSBBbmltYXRpb25UeXBlcy5OYW1lZDpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLmJhc2UsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBwcmltYXJ5U2V0dGluZ3M6IGRhdGEucHJpbWFyeVNldHRpbmdzLFxyXG4gICAgICAgICAgICB9IHNhdGlzZmllcyBOYW1lZEFuaW1hdGlvbjtcclxuXHJcbiAgICAgICAgY2FzZSBBbmltYXRpb25UeXBlcy5RdWlyazpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLmJhc2UsXHJcbiAgICAgICAgICAgICAgICBsb29wVGltZXM6IGRhdGEubG9vcFRpbWVzLFxyXG4gICAgICAgICAgICAgICAgb2NjdXJyZW5jZVJhbmdlOiBkYXRhLm9jY3VycmVuY2VSYW5nZSxcclxuICAgICAgICAgICAgICAgIHByaW1hcnlTZXR0aW5nczogZGF0YS5wcmltYXJ5U2V0dGluZ3MsXHJcbiAgICAgICAgICAgIH0gc2F0aXNmaWVzIFF1aXJrQW5pbWF0aW9uO1xyXG5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gQW5pbWF0aW9uVHlwZXM6ICR7ZGF0YS50eXBlfWApO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0xvb2tBbmltYXRpb24oYTogQW5pbWF0aW9uKTogYSBpcyBMb29rQW5pbWF0aW9uIHtcclxuICAgIHJldHVybiBhLnR5cGUgPT09IEFuaW1hdGlvblR5cGVzLkxvb2s7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzTmFtZWRBbmltYXRpb24oYTogQW5pbWF0aW9uKTogYSBpcyBOYW1lZEFuaW1hdGlvbiB7XHJcbiAgICByZXR1cm4gYS50eXBlID09PSBBbmltYXRpb25UeXBlcy5OYW1lZDtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNRdWlya0FuaW1hdGlvbihhOiBBbmltYXRpb24pOiBhIGlzIFF1aXJrQW5pbWF0aW9uIHtcclxuICAgIHJldHVybiBhLnR5cGUgPT09IEFuaW1hdGlvblR5cGVzLlF1aXJrO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBOYW1lZEFuaW1hdGlvblR5cGVzIHtcclxuICAgIENyeSA9IFwiY3J5XCIsXHJcbiAgICBSZWNvaWwgPSBcInJlY29pbFwiLFxyXG4gICAgU3RhdHVzID0gXCJzdGF0dXNcIixcclxuICAgIFNwZWNpYWwgPSBcInNwZWNpYWxcIixcclxuICAgIFBoeXNpY2FsID0gXCJQaHlzaWNhbFwiLFxyXG4gICAgRmFpbnQgPSBcImZhaW50XCIsXHJcbiAgICBBaXJTcGVjaWFsID0gXCJhaXJfc3BlY2lhbFwiLFxyXG4gICAgQWlyUGh5c2ljYWwgPSBcImFpcl9waHlzaWNhbFwiLFxyXG4gICAgQWlyU3RhdHVzID0gXCJhaXJfc3RhdHVzXCIsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFJpZGluZ1N0eWxlIHtcclxuICAgIExBTkQsXHJcbiAgICBMSVFVSUQsXHJcbiAgICBBSVJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQcmltYXJ5U2V0dGluZ3Mge1xyXG4gICAgY3VydmU6IFwib25lXCIgfCBcInN5bW1ldHJpY1wiIHwgXCJzeW1tZXRyaWNhbF93aWRlXCI7XHJcbiAgICAvL1wiRXhjbHVzaXZlIGxhYmVsZWQgYW5pbWF0aW9ucyB0aGF0IHdvbnQgZ2V0IG92ZXJ3cml0dGVuIGJ5IHRoaXMgcHJpbWFyeSBhbmltYXRpb24uXHJcbiAgICAvLyBUaGUgb25seSByZWFzb25hYmxlIHVzZSBvZiBleGNsdWRlZCBsYWJlbHMgaXMgdG8gZXhjbHVkZSB0aGUgbG9vayBhbmltYXRpb24gZnJvbSBiZWluZyBvdmVyd3JpdHRlbi5cclxuICAgIC8vIFRoaXMgaXMgc28gdGhleSBjYW4ga2VlcCBsb29raW5nIGF0IGEgdGFyZ2V0IHdoZW4gdXNpbmcgYW4gYW5pbWF0aW9uLlwiXHJcbiAgICBleGNsdWRlZExhYmVscz86IHN0cmluZ1tdO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBBbmltYXRpb25UeXBlcyB7XHJcbiAgICBMb29rLFxyXG4gICAgTmFtZWQsXHJcbiAgICBRdWlyayxcclxuICAgIEFuaW1hdGlvbixcclxufVxyXG5cclxuLy93aWxsIGdlbmVyYWxseSB1c2UgcS5iZWRyb2NrKClcclxuZXhwb3J0IGludGVyZmFjZSBBbmltYXRpb24ge1xyXG4gICAgdHlwZTogQW5pbWF0aW9uVHlwZXM7XHJcbiAgICAvLydibGFzdG9pc2UnIGZvciBcInEuYmVkcm9jaygnYmxhc3RvaXNlJywgJ2dyb3VuZF93YWxrJylcIiwgb3IgdGhlIGJvbmUgZm9yIGEgbG9vayBhbmltYXRpb25cclxuICAgIGFuaW1hdGlvblNvdXJjZTogc3RyaW5nO1xyXG4gICAgLy9zdHJpbmcgYXJyYXkgdG8gc3VwcG9ydCB0aGUgdXNlIG9mIHEuYXJyYXkoKVxyXG4gICAgYW5pbWF0aW9uT3ZlcndyaXRlU3RyaW5nPzogc3RyaW5nIC8vZm9yIGN1c3RvbSBhbmltYXRpb24gc3RyaW5ncywgZWcgdGhlIG1hdGgucmFuZG9tIGNoYWlucyBzb21ldGltZXMgZm91bmQgaW4gYW5pbWF0aW9uc1xyXG4gICAgYW5pbWF0aW9uOiBzdHJpbmdbXTsgLy8nZ3JvdW5kX3dhbGsnIGZvciBcInEuYmVkcm9jaygnYmxhc3RvaXNlJywgJ2dyb3VuZF93YWxrJylcIlxyXG4gICAgY29uZGl0aW9uRXhwcmVzc2lvbj86IEV4cHJlc3Npb25Ob2RlOyAvL2VnIFwicS5pc19zdGFuZGluZ19vbl9ibG9ja3MoMiwgJ21pbmVjcmFmdDpzYW5kJywgJ21pbmVjcmFmdDpyZWRfc2FuZCcpXCJcclxufVxyXG5cclxuLy9cInEubG9vaygnaGVhZF9haScsIDEsIDEsIDcwLCAtNDUsIDQ1LCAtNDUpXCJcclxuZXhwb3J0IGludGVyZmFjZSBMb29rQW5pbWF0aW9uIGV4dGVuZHMgQW5pbWF0aW9uIHtcclxuICAgIHBpdGNoTXVsdGlwbGllcjogbnVtYmVyO1xyXG4gICAgeWF3TXVsdGlwbGllcjogbnVtYmVyO1xyXG4gICAgbWF4UGl0Y2g6IG51bWJlcjtcclxuICAgIG1pblBpdGNoOiBudW1iZXI7XHJcbiAgICBtYXhZYXc6IG51bWJlcjtcclxuICAgIG1pbllhdzogbnVtYmVyO1xyXG59XHJcblxyXG4vL3Nob3VsZCBnZW5lcmFsbHkgdXNlIHRoZSBxLmJlZHJvY2tfc3RhdGVmdWwoKSBtZXRob2QsIGJ1dCBjYW4gYWxzbyB1c2UgdGhlIHEuYmVkcm9ja19wcmltYXJ5XHJcbmV4cG9ydCBpbnRlcmZhY2UgTmFtZWRBbmltYXRpb24gZXh0ZW5kcyBBbmltYXRpb257XHJcbiAgICBuYW1lOiBOYW1lZEFuaW1hdGlvblR5cGVzIHwgTW92ZUlkZW50aWZpZXIgfCBQb3NlVHlwZSB8IHN0cmluZztcclxuICAgIHByaW1hcnlTZXR0aW5ncz86IFByaW1hcnlTZXR0aW5ncztcclxufVxyXG5cclxuXHJcbi8vc2hvdWxkIGdlbmVyYWxseSB1c2UgdGhlIHEuYmVkcm9ja19xdWlyaygpIG1ldGhvZCwgYnV0IGNhbiBhbHNvIHVzZSB0aGUgcS5iZWRyb2NrX3ByaW1hcnlfcXVpcmtcclxuZXhwb3J0IGludGVyZmFjZSBRdWlya0FuaW1hdGlvbiBleHRlbmRzIEFuaW1hdGlvbiB7XHJcbiAgICBsb29wVGltZXM/OiBudW1iZXI7XHJcbiAgICBvY2N1cnJlbmNlUmFuZ2U/OiBOdW1iZXJSYW5nZTtcclxuICAgIHByaW1hcnlTZXR0aW5ncz86IFByaW1hcnlTZXR0aW5ncztcclxufSJdfQ==