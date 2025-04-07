import React from 'react';
import { getCoinsData } from '@/entities/coins';
import { getConversionData } from '@/entities/conversion';

export const Home = () => {
    React.useEffect(() => {
        getCoinsData();

        getConversionData({
            fromId: 1,
            toId: 2,
            fromAmount: 1,
        })
    }, []);

    return <>home</>;
};
