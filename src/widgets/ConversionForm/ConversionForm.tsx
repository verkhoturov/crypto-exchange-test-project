import React from 'react';
import { useSearchParams } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Button, Flex, Text } from '@chakra-ui/react';
import { LuArrowDownUp } from 'react-icons/lu';
import { CoinInput } from '@/entities/coins';
import { conversionStore } from './model/store';
import { FormLoader } from './ui/FormLoader';

export const ConversionForm = observer(() => {
    const [searchParams, setSearchParams] = useSearchParams();

    React.useEffect(() => {
        const from = searchParams.get('from');
        const to = searchParams.get('to');
        const amount = searchParams.get('amount');

        if (from) conversionStore.setFromCoinId(from);
        if (to) conversionStore.setToCoinId(to);
        if (amount) conversionStore.setFromAmount(amount);

        conversionStore.fetchCoins();
        conversionStore.fetchConversion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        const updated = new URLSearchParams(searchParams);
        updated.set('from', conversionStore.fromCoinId);
        updated.set('to', conversionStore.toCoinId);
        updated.set('amount', conversionStore.fromAmount);

        setSearchParams(updated);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversionStore.fromCoinId, conversionStore.toCoinId, conversionStore.fromAmount]);

    const {
        coinsList,
        fromAmount,
        toAmount,
        fromCoinId,
        toCoinId,
        isLoadingFromAmount,
        isLoadingToAmount,
        isCoinsListLoading,
        setFromAmount,
        setToAmount,
        setFromCoinId,
        setToCoinId,
        reverseCoins,
        conversion,
    } = conversionStore;

    if (isCoinsListLoading) {
        return <FormLoader />;
    }

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

            <Flex justifyContent={'space-between'} alignItems={'center'}>
                <div>
                    <Text fontSize={'14px'}>
                        <Text as="span" textDecoration={'underline'}>
                            Rate
                        </Text>
                        :{' '}
                        <Text as="span" color="blue.solid">
                            {conversion?.rate ?? '...'}
                        </Text>
                    </Text>
                </div>

                <Button onClick={reverseCoins}>
                    <LuArrowDownUp />
                </Button>
            </Flex>

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
