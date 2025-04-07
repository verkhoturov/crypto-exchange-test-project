import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { getCoinsData, Coin } from '@/entities/coins';
import { getConversionData, Conversion } from '@/entities/conversion';
import { Select, Field } from '@/shared/ui';

const DEFAULT_FROM_COIN_ID = '1';
const DEFAULT_TO_COIN_ID = '825'; // USDT

export const Home = () => {
    const [coinsList, setCoinsList] = React.useState<Coin[]>();
    const [conversion, setConversion] = React.useState<Conversion>();

    const [fromCoinId, setFromCoinId] = React.useState<string>(DEFAULT_FROM_COIN_ID);
    const [toCoinId, setToCoinId] = React.useState<string>(DEFAULT_TO_COIN_ID);

    const [fromAmount, setFromAmount] = React.useState('1');
    const [toAmount, setToAmount] = React.useState<string>();

    const [isLoading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const getCoins = async () => {
            setLoading(true);
            const coins = await getCoinsData();

            if (coins.success) {
                setCoinsList(coins.data);
            }
            setLoading(false);
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

    if (!coinsList) return null;

    return (
        <form>
            <Flex>
                <Field
                    label="You Send"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                />
                <Select
                    onChange={(symbol) => setFromCoinId(symbol)}
                    value={fromCoinId}
                    items={
                        coinsList?.map((coin) => ({
                            value: String(coin.id),
                            label: coin.symbol,
                            desc: coin.name,
                        })) || []
                    }
                    defaultValue={DEFAULT_FROM_COIN_ID}
                    isDisabled={!coinsList}
                />
            </Flex>

            <Button onClick={reverseCoins}>{'->'}</Button>

            <Flex>
                <Field
                    label="You Get"
                    value={toAmount}
                    onChange={(e) => setToAmount(e.target.value)}
                    disabled={isLoading}
                />
                <Select
                    onChange={(symbol) => setToCoinId(symbol)}
                    value={toCoinId}
                    items={
                        coinsList?.map((coin) => ({
                            value: String(coin.id),
                            label: coin.symbol,
                            desc: coin.name,
                        })) || []
                    }
                    defaultValue={DEFAULT_TO_COIN_ID}
                    isDisabled={!coinsList}
                />
            </Flex>
        </form>
    );
};
