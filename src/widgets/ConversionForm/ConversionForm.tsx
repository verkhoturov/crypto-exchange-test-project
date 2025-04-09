// widgets/ConversionForm.tsx
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Flex } from '@chakra-ui/react';
import { LuArrowDownUp } from 'react-icons/lu';
import { CoinInput } from '@/entities/coins';
import { conversionStore } from './model/store';

export const ConversionForm = observer(() => {
    React.useEffect(() => {
        conversionStore.fetchCoins();
        conversionStore.fetchConversion();
    }, []);

    const {
        coinsList,
        fromAmount,
        toAmount,
        fromCoinId,
        toCoinId,
        isLoadingFromAmount,
        isLoadingToAmount,
        setFromAmount,
        setToAmount,
        setFromCoinId,
        setToCoinId,
        reverseCoins,
    } = conversionStore;

    return (
        <Flex as="form" width="100%" flexDirection="column" gap="12px">
            <CoinInput
                coinsList={coinsList}
                amountValue={fromAmount}
                onChangeAmount={setFromAmount}
                selectedCoinId={fromCoinId}
                onChangeCoinId={setFromCoinId}
                defaultCoinId={fromCoinId}
                isLoading={isLoadingFromAmount}
            />

            <div>
                <Button onClick={reverseCoins}>
                    <LuArrowDownUp />
                </Button>
            </div>

            <CoinInput
                coinsList={coinsList}
                amountValue={toAmount}
                onChangeAmount={setToAmount}
                selectedCoinId={toCoinId}
                onChangeCoinId={setToCoinId}
                defaultCoinId={toCoinId}
                isLoading={isLoadingToAmount}
            />
        </Flex>
    );
});
