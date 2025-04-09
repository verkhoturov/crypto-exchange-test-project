import {
    Portal,
    Select as ChakraSelect,
    createListCollection,
    useSelectContext,
    Text,
    Box,
    Input,
    InputGroup,
    Center,
} from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { useMemo, useState } from 'react';

interface SelectItem {
    value: string;
    label: string;
    desc?: string;
}

interface SelectProps {
    onChange?: (value: string) => void;
    value: string;
    items: SelectItem[];
    defaultValue: string;
    label?: string;
    isDisabled?: boolean;
    variant?: 'outline' | 'subtle';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    width?: string;
    ariaLabel?: string;
}

const SelectValue = () => {
    const select = useSelectContext();
    const items = select.selectedItems as SelectItem[];

    if (items?.length > 0 && items[0]) {
        const { label } = items[0];
        return <>{label}</>;
    }
    return '-';
};

export const Select = ({
    onChange,
    value,
    items,
    defaultValue,
    label,
    isDisabled,
    width = '320px',
    variant = 'subtle',
    size = 'md',
    ariaLabel,
}: SelectProps) => {
    const [filterText, setFilterText] = useState('');

    const filteredItems = useMemo(() => {
        return items.filter(
            (item) =>
                item.label.toLowerCase().includes(filterText.toLowerCase()) ||
                item.desc?.toLowerCase().includes(filterText.toLowerCase()),
        );
    }, [items, filterText]);

    const collection = createListCollection({ items: filteredItems });

    const handleValueChange = (e: { value: string[] }) => {
        onChange?.(e.value[0]);
        setFilterText('');
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            setFilterText('');
        }
    };

    return (
        <ChakraSelect.Root
            value={[value]}
            onValueChange={handleValueChange}
            onOpenChange={(details) => handleOpenChange(details.open)}
            collection={collection}
            defaultValue={[defaultValue]}
            width={width}
            disabled={isDisabled}
            variant={variant}
            size={size}
        >
            {label && <ChakraSelect.Label>{label}</ChakraSelect.Label>}

            <ChakraSelect.Control>
                <ChakraSelect.Trigger aria-label={ariaLabel}>
                    <SelectValue />
                </ChakraSelect.Trigger>

                <ChakraSelect.IndicatorGroup>
                    <ChakraSelect.Indicator />
                </ChakraSelect.IndicatorGroup>
            </ChakraSelect.Control>

            <Portal>
                <ChakraSelect.Positioner>
                    <ChakraSelect.Content paddingTop={'60px'}>
                        <ChakraSelect.ItemGroup
                            height={'48px'}
                            backgroundColor={'white'}
                            position={'absolute'}
                            top={0}
                            left={0}
                            right={0}
                            zIndex={1}
                        >
                            <Box>
                                <InputGroup startElement={<LuSearch />} padding={'4px 8px'}>
                                    <Input
                                        placeholder="Type a currency"
                                        value={filterText}
                                        onChange={(e) => setFilterText(e.target.value)}
                                    />
                                </InputGroup>
                            </Box>
                        </ChakraSelect.ItemGroup>

                        <ChakraSelect.ItemGroup>
                            {collection.items.length > 0 ? (
                                collection.items.map((item, i) => (
                                    <ChakraSelect.Item
                                        item={item}
                                        key={`${item.value}-${item.label}-${i}`}
                                    >
                                        <div>
                                            <Text>{item.label}</Text>
                                            {item.desc && (
                                                <Text as="span" color={'gray.400'}>
                                                    {item.desc}
                                                </Text>
                                            )}
                                        </div>
                                        <ChakraSelect.ItemIndicator />
                                    </ChakraSelect.Item>
                                ))
                            ) : (
                                <Center padding={4} color="gray.500">
                                    No results found
                                </Center>
                            )}
                        </ChakraSelect.ItemGroup>
                    </ChakraSelect.Content>
                </ChakraSelect.Positioner>
            </Portal>
        </ChakraSelect.Root>
    );
};
