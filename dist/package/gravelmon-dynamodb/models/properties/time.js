"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
exports.serializeTimeRange = serializeTimeRange;
exports.isTimeRange = isTimeRange;
exports.deserializeTimeRange = deserializeTimeRange;
const numberRange_1 = require("./numberRange");
var Time;
(function (Time) {
    Time["Day"] = "day";
    Time["Any"] = "any";
    Time["Night"] = "night";
    Time["Twilight"] = "twilight";
})(Time || (exports.Time = Time = {}));
function serializeTimeRange(value) {
    switch (value.type) {
        case "time": return value.value;
        case "range": return value.value.serialize();
        case "list": return value.value.map(serializeTimeRange);
    }
}
function isTimeRange(value) {
    return (value &&
        typeof value === "object" &&
        "type" in value &&
        ["time", "range", "list"].includes(value.type));
}
function deserializeTimeRange(value) {
    if (!value) {
        throw new Error("Invalid TimeRange: value is null/undefined");
    }
    if (Array.isArray(value)) {
        return {
            type: "list",
            value: value.map(deserializeTimeRange)
        };
    }
    if (typeof value === "object" && "min" in value && "max" in value) {
        return {
            type: "range",
            value: numberRange_1.NumberRange.deserialize(value)
        };
    }
    if (typeof value === "string") {
        if (!Object.values(Time).includes(value)) {
            throw new Error(`Invalid Time value: ${value}`);
        }
        return {
            type: "time",
            value: value
        };
    }
    throw new Error(`Unknown TimeRange format: ${JSON.stringify(value)}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9ncmF2ZWxtb24tZHluYW1vZGIvbW9kZWxzL3Byb3BlcnRpZXMvdGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFjQSxnREFNQztBQUVELGtDQU9DO0FBRUQsb0RBK0JDO0FBOURELCtDQUE0QztBQUU1QyxJQUFZLElBS1g7QUFMRCxXQUFZLElBQUk7SUFDWixtQkFBVyxDQUFBO0lBQ1gsbUJBQVcsQ0FBQTtJQUNYLHVCQUFlLENBQUE7SUFDZiw2QkFBcUIsQ0FBQTtBQUN6QixDQUFDLEVBTFcsSUFBSSxvQkFBSixJQUFJLFFBS2Y7QUFPRCxTQUFnQixrQkFBa0IsQ0FBQyxLQUFnQjtJQUMvQyxRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQixLQUFLLE1BQU0sQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNoQyxLQUFLLE9BQU8sQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM3QyxLQUFLLE1BQU0sQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM1RCxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxLQUFVO0lBQ2xDLE9BQU8sQ0FDSCxLQUFLO1FBQ0wsT0FBTyxLQUFLLEtBQUssUUFBUTtRQUN6QixNQUFNLElBQUksS0FBSztRQUNmLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUNqRCxDQUFDO0FBQ04sQ0FBQztBQUVELFNBQWdCLG9CQUFvQixDQUFDLEtBQVU7SUFDM0MsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUN2QixPQUFPO1lBQ0gsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztTQUN6QyxDQUFDO0lBQ04sQ0FBQztJQUVELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ2hFLE9BQU87WUFDSCxJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRSx5QkFBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7U0FDeEMsQ0FBQztJQUNOLENBQUM7SUFFRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFhLENBQUMsRUFBRSxDQUFDO1lBQy9DLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUVELE9BQU87WUFDSCxJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxLQUFhO1NBQ3ZCLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDMUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE51bWJlclJhbmdlIH0gZnJvbSBcIi4vbnVtYmVyUmFuZ2VcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFRpbWUge1xyXG4gICAgRGF5ID0gXCJkYXlcIixcclxuICAgIEFueSA9IFwiYW55XCIsXHJcbiAgICBOaWdodCA9IFwibmlnaHRcIixcclxuICAgIFR3aWxpZ2h0ID0gXCJ0d2lsaWdodFwiXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFRpbWVSYW5nZSA9XHJcbiAgICB8IHsgdHlwZTogXCJ0aW1lXCI7IHZhbHVlOiBUaW1lIH1cclxuICAgIHwgeyB0eXBlOiBcInJhbmdlXCI7IHZhbHVlOiBOdW1iZXJSYW5nZSB9XHJcbiAgICB8IHsgdHlwZTogXCJsaXN0XCI7IHZhbHVlOiBUaW1lUmFuZ2VbXSB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZVRpbWVSYW5nZSh2YWx1ZTogVGltZVJhbmdlKTogYW55IHtcclxuICAgIHN3aXRjaCAodmFsdWUudHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJ0aW1lXCI6IHJldHVybiB2YWx1ZS52YWx1ZTtcclxuICAgICAgICBjYXNlIFwicmFuZ2VcIjogcmV0dXJuIHZhbHVlLnZhbHVlLnNlcmlhbGl6ZSgpO1xyXG4gICAgICAgIGNhc2UgXCJsaXN0XCI6IHJldHVybiB2YWx1ZS52YWx1ZS5tYXAoc2VyaWFsaXplVGltZVJhbmdlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVGltZVJhbmdlKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBUaW1lUmFuZ2Uge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICB2YWx1ZSAmJlxyXG4gICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxyXG4gICAgICAgIFwidHlwZVwiIGluIHZhbHVlICYmXHJcbiAgICAgICAgW1widGltZVwiLCBcInJhbmdlXCIsIFwibGlzdFwiXS5pbmNsdWRlcyh2YWx1ZS50eXBlKVxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlc2VyaWFsaXplVGltZVJhbmdlKHZhbHVlOiBhbnkpOiBUaW1lUmFuZ2Uge1xyXG4gICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgVGltZVJhbmdlOiB2YWx1ZSBpcyBudWxsL3VuZGVmaW5lZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiBcImxpc3RcIixcclxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLm1hcChkZXNlcmlhbGl6ZVRpbWVSYW5nZSlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgXCJtaW5cIiBpbiB2YWx1ZSAmJiBcIm1heFwiIGluIHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxyXG4gICAgICAgICAgICB2YWx1ZTogTnVtYmVyUmFuZ2UuZGVzZXJpYWxpemUodmFsdWUpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgaWYgKCFPYmplY3QudmFsdWVzKFRpbWUpLmluY2x1ZGVzKHZhbHVlIGFzIFRpbWUpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBUaW1lIHZhbHVlOiAke3ZhbHVlfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogXCJ0aW1lXCIsXHJcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSBhcyBUaW1lXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gVGltZVJhbmdlIGZvcm1hdDogJHtKU09OLnN0cmluZ2lmeSh2YWx1ZSl9YCk7XHJcbn0iXX0=