import { Coin, ResponseError, CoinsResponseResult } from './types';

const API = import.meta.env.VITE_API_URL;

export const getCoinsData = async (): Promise<CoinsResponseResult> => {
    try {
        const response = await fetch(`${API}/coins`);
        const data: Coin[] | ResponseError = await response.json();

        if (response.ok) {
            return {
                success: true,
                data: data as Coin[],
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
