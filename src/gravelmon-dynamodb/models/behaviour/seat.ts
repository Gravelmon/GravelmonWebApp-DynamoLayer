export type Seat = {
    locator: string
}

export function serializeSeat(seat: Seat): Record<string, any> {
    return {
        locator: seat.locator
    };
}

export function deserializeSeat(data: any): Seat {
    return {
        locator: data.locator
    };
}