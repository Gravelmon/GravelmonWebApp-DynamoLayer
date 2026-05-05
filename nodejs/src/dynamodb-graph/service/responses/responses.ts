export const createErrorResponse = (statusCode: number, message: string) => {
    return {
        statusCode,
        body: JSON.stringify({
            error: message,
        }),
    };
};

export const createSuccessResponse = (statusCode: number, data: any) => {
    return {
        statusCode,
        body: JSON.stringify({
            data,
        }),
    };
};