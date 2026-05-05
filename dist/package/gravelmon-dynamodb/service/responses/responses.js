"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSuccessResponse = exports.createErrorResponse = void 0;
const createErrorResponse = (statusCode, message) => {
    return {
        statusCode,
        body: JSON.stringify({
            error: message,
        }),
    };
};
exports.createErrorResponse = createErrorResponse;
const createSuccessResponse = (statusCode, data) => {
    return {
        statusCode,
        body: JSON.stringify({
            data,
        }),
    };
};
exports.createSuccessResponse = createSuccessResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2dyYXZlbG1vbi1keW5hbW9kYi9zZXJ2aWNlL3Jlc3BvbnNlcy9yZXNwb25zZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQU8sTUFBTSxtQkFBbUIsR0FBRyxDQUFDLFVBQWtCLEVBQUUsT0FBZSxFQUFFLEVBQUU7SUFDdkUsT0FBTztRQUNILFVBQVU7UUFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNqQixLQUFLLEVBQUUsT0FBTztTQUNqQixDQUFDO0tBQ0wsQ0FBQztBQUNOLENBQUMsQ0FBQztBQVBXLFFBQUEsbUJBQW1CLHVCQU85QjtBQUVLLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxVQUFrQixFQUFFLElBQVMsRUFBRSxFQUFFO0lBQ25FLE9BQU87UUFDSCxVQUFVO1FBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDakIsSUFBSTtTQUNQLENBQUM7S0FDTCxDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBUFcsUUFBQSxxQkFBcUIseUJBT2hDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNyZWF0ZUVycm9yUmVzcG9uc2UgPSAoc3RhdHVzQ29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RhdHVzQ29kZSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGVycm9yOiBtZXNzYWdlLFxyXG4gICAgICAgIH0pLFxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVTdWNjZXNzUmVzcG9uc2UgPSAoc3RhdHVzQ29kZTogbnVtYmVyLCBkYXRhOiBhbnkpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RhdHVzQ29kZSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGRhdGEsXHJcbiAgICAgICAgfSksXHJcbiAgICB9O1xyXG59OyJdfQ==