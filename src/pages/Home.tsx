import React from 'react';
import { Flex } from '@chakra-ui/react';
import { getCoinsData, Coin } from '@/entities/coins';
// import { getConversionData } from '@/entities/conversion';
import { Select, Field } from '@/shared/ui';

const DEFAULT_FROM_COIN_SYMBOL = 'BTC';
const DEFAULT_TO_COIN_SYMBOL = 'USDT';

export const Home = () => {
    const [coinsList, setCoinsList] = React.useState<Coin[]>();
    const [fromCoinSymbol, setFromCoinSymbol] = React.useState<string>(DEFAULT_FROM_COIN_SYMBOL);
    const [toCoinSymbol, setToCoinSymbol] = React.useState<string>(DEFAULT_TO_COIN_SYMBOL);

    React.useEffect(() => {
        const getCoins = async () => {
            const coins = await getCoinsData();

            if (coins.success) {
                setCoinsList(coins.data);
            }
        };

        getCoins();
    }, []);

    console.log(fromCoinSymbol, toCoinSymbol);

    if (!coinsList) return null;

    return (
        <form>
            <Flex>
                <Field label="You Send" />
                <Select
                    onChange={(symbol) => setFromCoinSymbol(symbol)}
                    items={
                        coinsList?.map((coin) => ({
                            value: coin.symbol,
                            label: coin.symbol,
                            desc: coin.name,
                        })) || []
                    }
                    defaultValue={DEFAULT_FROM_COIN_SYMBOL}
                    isDisabled={!coinsList}
                />
            </Flex>

            <Flex>
                <Field label="You Get" />
                <Select
                    onChange={(symbol) => setToCoinSymbol(symbol)}
                    items={
                        coinsList?.map((coin) => ({
                            value: coin.symbol,
                            label: coin.symbol,
                            desc: coin.name,
                        })) || []
                    }
                    defaultValue={DEFAULT_TO_COIN_SYMBOL}
                    isDisabled={!coinsList}
                />
            </Flex>
        </form>
    );
};
