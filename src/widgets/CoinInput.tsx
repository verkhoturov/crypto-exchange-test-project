import { Flex } from '@chakra-ui/react';
import { Select, Field } from '@/shared/ui';
import { Coin } from '@/entities/coins';

interface CoinInputProps {
    label: string;
    defaultCoinId: string;
    coinsList?: Coin[];
    amountValue?: string;
    onChangeAmount: (value: string) => void;
    selectedCoinId: string;
    onChangeCoinId: (value: string) => void;
    isLoading?: boolean;
}

export const CoinInput = ({
    label,
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
        <Flex>
            <Field
                label={label}
                value={isLoading ? 'Loading...' : amountValue}
                onChange={(e) => onChangeAmount(e.target.value)}
            />
            <Select
                onChange={(symbol) => onChangeCoinId(symbol)}
                value={selectedCoinId}
                items={selectItems}
                defaultValue={defaultCoinId}
                isDisabled={!coinsList}
            />
        </Flex>
    );
};
