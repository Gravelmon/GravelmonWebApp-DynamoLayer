export interface LambdaEvent {
    httpMethod?: string;
    queryStringParameters?: {
        [key: string]: string | undefined;
    };
    body?: string;
}
export declare function parseBody<T>(event: LambdaEvent): T;
