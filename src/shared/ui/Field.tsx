import { Field as ChakraField, Input, InputProps } from '@chakra-ui/react';

export const Field = (props: InputProps) => {
    return (
        <ChakraField.Root>
            <Input {...props} />
        </ChakraField.Root>
    );
};
