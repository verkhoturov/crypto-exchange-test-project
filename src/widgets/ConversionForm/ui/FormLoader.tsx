import { Flex, Skeleton } from '@chakra-ui/react';

export const FormLoader = () => {
    return (
        <Flex as="form" width="100%" flexDirection="column" gap="12px">
            <Skeleton height={'40px'} />

            <Flex justifyContent={'space-between'} alignItems={'center'}>
                <Skeleton height={'24px'} width={'60px'} />
                <Skeleton height={'40px'} width={'40px'} />
            </Flex>

            <Skeleton height={'40px'} />
        </Flex>
    );
};
