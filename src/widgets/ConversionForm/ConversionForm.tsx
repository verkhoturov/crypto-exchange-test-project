import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { getCoinsData, Coin, CoinInput } from '@/entities/coins';
import { getConversionData, Conversion } from '@/entities/conversion';

const DEFAULT_FROM_COIN_ID = '1'; // BTC
const DEFAULT_TO_COIN_ID = '825'; // USDT

export const ConversionForm = () => {
    const [coinsList, setCoinsList] = React.useState<Coin[]>();
    const [conversion, setConversion] = React.useState<Conversion>();

    const [fromCoinId, setFromCoinId] = React.useState<string>(DEFAULT_FROM_COIN_ID);
    const [toCoinId, setToCoinId] = React.useState<string>(DEFAULT_TO_COIN_ID);

    const [fromAmount, setFromAmount] = React.useState('1');
    const [toAmount, setToAmount] = React.useState<string>("");

    const [isLoading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const getCoins = async () => {
            const coins = await getCoinsData();

            if (coins.success) {
                setCoinsList(coins.data);
            }
        };

        getCoins();
    }, []);

    React.useEffect(() => {
        const getConversion = async (fromId: string, toId: string, fromAmount: string) => {
            setLoading(true);
            const conversion = await getConversionData({ fromId, toId, fromAmount });

            if (conversion.success) {
                setConversion(conversion.data);
            }
            setLoading(false);
        };

        if (fromCoinId && toCoinId && fromAmount) {
            getConversion(fromCoinId, toCoinId, fromAmount);
        }
    }, [fromCoinId, toCoinId, fromAmount]);

    React.useEffect(() => {
        if (conversion?.estimatedAmount) {
            const amount = String(conversion.estimatedAmount);
            setToAmount(amount);
        }
    }, [conversion?.estimatedAmount]);

    const reverseCoins = () => {
        setFromCoinId((prevId) => {
            setToCoinId(prevId);
            return toCoinId;
        });
    };

    return (
        <Flex as="form" width={'100%'} flexDirection={'column'} gap="12px">
            <CoinInput
                label="You Send"
                coinsList={coinsList}
                amountValue={fromAmount}
                onChangeAmount={setFromAmount}
                selectedCoinId={fromCoinId}
                onChangeCoinId={setFromCoinId}
                defaultCoinId={DEFAULT_FROM_COIN_ID}
            />

            <div>
                <Button onClick={reverseCoins}>{'->'}</Button>
            </div>

            <CoinInput
                label="You Get"
                coinsList={coinsList}
                amountValue={toAmount}
                onChangeAmount={setToAmount}
                selectedCoinId={toCoinId}
                onChangeCoinId={setFromCoinId}
                defaultCoinId={DEFAULT_TO_COIN_ID}
                isLoading={isLoading}
            />
        </Flex>
    );
};
