"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberRange = void 0;
class NumberRange {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    static fromFlat(flatRange) {
        return new NumberRange(flatRange, flatRange);
    }
    serialize() {
        return {
            min: this.min,
            max: this.max
        };
    }
    static deserialize(data) {
        if (typeof data === "object" && "min" in data && "max" in data) {
            return new NumberRange(data.min, data.max);
        }
        else {
            throw new Error(`Invalid NumberRange format: ${JSON.stringify(data)}`);
        }
    }
}
exports.NumberRange = NumberRange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyUmFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZ3JhdmVsbW9uLWR5bmFtb2RiL21vZGVscy9wcm9wZXJ0aWVzL251bWJlclJhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsV0FBVztJQUlwQixZQUFZLEdBQVcsRUFBRSxHQUFXO1FBQ2hDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBaUI7UUFDN0IsT0FBTyxJQUFJLFdBQVcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELFNBQVM7UUFDTCxPQUFPO1lBQ0gsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1NBQ2hCLENBQUE7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFTO1FBQ3hCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQzdELE9BQU8sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0MsQ0FBQzthQUFNLENBQUM7WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzRSxDQUFDO0lBQ0wsQ0FBQztDQUNKO0FBM0JELGtDQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBOdW1iZXJSYW5nZSB7XHJcbiAgICBtaW46IG51bWJlcjtcclxuICAgIG1heDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubWluID0gbWluO1xyXG4gICAgICAgIHRoaXMubWF4ID0gbWF4O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBmcm9tRmxhdChmbGF0UmFuZ2U6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgTnVtYmVyUmFuZ2UoZmxhdFJhbmdlLCBmbGF0UmFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlcmlhbGl6ZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pbjogdGhpcy5taW4sXHJcbiAgICAgICAgICAgIG1heDogdGhpcy5tYXhcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRlc2VyaWFsaXplKGRhdGE6IGFueSk6IE51bWJlclJhbmdlIHtcclxuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgXCJtaW5cIiBpbiBkYXRhICYmIFwibWF4XCIgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE51bWJlclJhbmdlKGRhdGEubWluLCBkYXRhLm1heCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIE51bWJlclJhbmdlIGZvcm1hdDogJHtKU09OLnN0cmluZ2lmeShkYXRhKX1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=