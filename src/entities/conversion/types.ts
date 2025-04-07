export interface Conversion {
    rate: number;
    estimatedAmount: number;
}

export type ConversionParams =
    | { fromId: number; toId: number; fromAmount: number; toAmount?: never }
    | { fromId: number; toId: number; toAmount: number; fromAmount?: never };

export interface ResponseError {
    error?: string;
    message: string;
    statusCode: number;
}

export type ConversionResult =
    | { success: true; data: Conversion }
    | { success: false; error: ResponseError };
