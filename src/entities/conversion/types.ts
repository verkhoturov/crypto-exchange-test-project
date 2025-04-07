export interface Conversion {
    rate: number;
    estimatedAmount: number;
}

export type ConversionRequestParams =
    | { fromId: string; toId: string; fromAmount: string; toAmount?: never }
    | { fromId: string; toId: string; toAmount: string; fromAmount?: never };

export interface ResponseError {
    error?: string;
    message: string;
    statusCode: number;
}

export type ConversionResponseResult =
    | { success: true; data: Conversion }
    | { success: false; error: ResponseError };
