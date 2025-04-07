import { Field as ChakraField, Input, InputProps } from '@chakra-ui/react';

interface FieldProps extends InputProps {
    label?: string;
}

export const Field = ({ label, ...props }: FieldProps) => {
    return (
        <ChakraField.Root>
            {label && <ChakraField.Label>{label}</ChakraField.Label>}
            <Input {...props} />
        </ChakraField.Root>
    );
};
