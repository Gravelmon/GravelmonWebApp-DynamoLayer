
export interface LambdaEvent {
    httpMethod?: string;
    queryStringParameters?: { [key: string]: string | undefined };
    body?: string;
}

export function parseBody<T>(event: LambdaEvent): T {
    if (!event.body) {
        throw new Error("Missing body");
    }
    return JSON.parse(event.body) as T;
}