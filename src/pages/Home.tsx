import { Flex, Heading } from '@chakra-ui/react';
import { ConversionForm } from '@/widgets/ConversionForm';
import { Page } from '@/shared/ui';

export const Home = () => {
    return (
        <Page>
            <Flex minHeight={'100vh'} alignItems={'center'}>
                <Flex
                    flexDirection={'column'}
                    width={'100%'}
                    gap="24px"
                    lg={{
                        padding: '48px',
                    }}
                    padding={'16px'}
                    border={'2px solid black'}
                    backgroundColor={'white'}
                >
                    <Heading>Crypto Exchange 🤑</Heading>
                    <ConversionForm />
                </Flex>
            </Flex>
        </Page>
    );
};
