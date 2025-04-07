export interface Coin {
    id: number;
    name: string;
    symbol: string;
}

export interface ResponseError {
    error?: string;
    message: string;
    statusCode: number;
}

export type CoinsResponseResult =
    | { success: true; data: Coin[] }
    | { success: false; error: ResponseError };
