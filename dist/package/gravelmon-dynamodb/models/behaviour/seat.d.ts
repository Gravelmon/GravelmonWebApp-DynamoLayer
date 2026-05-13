export type Seat = {
    locator: string;
};
export declare function serializeSeat(seat: Seat): Record<string, any>;
export declare function deserializeSeat(data: any): Seat;
