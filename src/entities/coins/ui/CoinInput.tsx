import { Flex, Spinner } from '@chakra-ui/react';
import { Select, Field } from '@/shared/ui';
import { Coin } from '../types';

interface CoinInputProps {
    defaultCoinId: string;
    coinsList?: Coin[];
    amountValue?: string;
    onChangeAmount: (value: string) => void;
    selectedCoinId: string;
    onChangeCoinId: (value: string) => void;
    isLoading?: boolean;
}

export const CoinInput = ({
    defaultCoinId,
    coinsList,
    amountValue,
    onChangeAmount,
    selectedCoinId,
    onChangeCoinId,
    isLoading,
}: CoinInputProps) => {
    const selectItems =
        coinsList?.map((coin) => ({
            value: String(coin.id),
            label: coin.symbol,
            desc: coin.name,
        })) || [];

    return (
        <Flex gap={'6px'} position={'relative'}>
            {isLoading && (
                <Spinner
                    size="sm"
                    color="blue.solid"
                    position={'absolute'}
                    left={'12px'}
                    bottom={'12px'}
                />
            )}
            <Field
                value={isLoading ? '' : amountValue}
                onChange={(e) => onChangeAmount(e.target.value)}
                inputMode="decimal"
            />
            <Select
                onChange={(symbol) => onChangeCoinId(symbol)}
                value={selectedCoinId}
                items={selectItems}
                defaultValue={defaultCoinId}
                isDisabled={!coinsList}
                width="280px"
            />
        </Flex>
    );
};
