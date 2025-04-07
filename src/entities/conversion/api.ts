import { Conversion, ResponseError, ConversionResult, ConversionParams } from './types';

const API = import.meta.env.VITE_API_URL;

export const getConversionData = async (params: ConversionParams): Promise<ConversionResult> => {
    const { fromId, toId, fromAmount, toAmount } = params;

    const query = new URLSearchParams({
        from: fromId.toString(),
        to: toId.toString(),
        // в параметры запроса передаем или fromAmount, или toAmount, но никогда оба - иначе ошибка
        ...(fromAmount !== undefined && {
            fromAmount: fromAmount.toString(),
        }),
        ...(toAmount !== undefined && {
            toAmount: toAmount.toString(),
        }),
    });

    try {
        const response = await fetch(`${API}/conversion?${query}`);
        const data: Conversion | ResponseError = await response.json();

        if (response.ok) {
            return {
                success: true,
                data: data as Conversion,
            };
        } else {
            return {
                success: false,
                error: data as ResponseError,
            };
        }
    } catch (e) {
        return {
            success: false,
            error: {
                error: 'Unknown error',
                message: e instanceof Error ? e.message : 'Something went wrong',
                statusCode: 500,
            },
        };
    }
};
