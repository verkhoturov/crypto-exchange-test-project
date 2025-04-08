import { Flex, Heading } from '@chakra-ui/react';
import { ConversionForm } from '@/widgets/ConversionForm';
import { Page } from '@/shared/ui';

export const Home = () => {
    return (
        <Page>
            <Flex minHeight={'100vh'} alignItems={'center'}>
                <Flex flexDirection={'column'} gap="24px">
                    <Heading>Crypto Exchange 🤑</Heading>
                    <ConversionForm />
                </Flex>
            </Flex>
        </Page>
    );
};
