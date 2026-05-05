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
