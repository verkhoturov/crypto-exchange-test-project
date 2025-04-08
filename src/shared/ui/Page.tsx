import React from 'react';
import { Container } from '@chakra-ui/react';

interface PageProps {
    children: React.ReactNode;
}

export const Page = ({ children }: PageProps) => {
    return (
        <Container as="main" maxWidth={'600px'} padding={'0 16px'} margin={'0 auto'}>
            {children}
        </Container>
    );
};
