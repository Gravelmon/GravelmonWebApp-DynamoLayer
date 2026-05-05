export declare const createErrorResponse: (statusCode: number, message: string) => {
    statusCode: number;
    body: string;
};
export declare const createSuccessResponse: (statusCode: number, data: any) => {
    statusCode: number;
    body: string;
};
