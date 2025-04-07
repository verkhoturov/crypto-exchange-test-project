import {
    Portal,
    Select as ChakraSelect,
    createListCollection,
    useSelectContext,
} from '@chakra-ui/react';

interface SelectItem {
    value: string;
    label: string;
    desc?: string;
}

interface SelectProps {
    onChange?: (value: string) => void;
    items: SelectItem[];
    defaultValue: string;
    label?: string;
    isDisabled?: boolean;
    variant?: 'outline' | 'subtle';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    width?: string;
}

const SelectValue = () => {
    const select = useSelectContext();
    const items = select.selectedItems as SelectItem[];

    if (items && items.length > 0) {
        const {
            // value,
            label,
        } = items[0];
        return <>{label}</>;
    }
    return '-';
};

export const Select = ({
    onChange,
    items,
    defaultValue,
    label,
    isDisabled,
    width = '320px',
    variant = 'subtle',
    size = 'md',
}: SelectProps) => {
    const collection = createListCollection({
        items,
    });

    return (
        <ChakraSelect.Root
            onValueChange={(e) => onChange?.(e.value[0])}
            collection={collection}
            defaultValue={[defaultValue]}
            width={width}
            disabled={isDisabled}
            variant={variant}
            size={size}
        >
            {label && <ChakraSelect.Label>{label}</ChakraSelect.Label>}

            <ChakraSelect.Control>
                <ChakraSelect.Trigger>
                    <SelectValue />
                </ChakraSelect.Trigger>

                <ChakraSelect.IndicatorGroup>
                    <ChakraSelect.Indicator />
                </ChakraSelect.IndicatorGroup>
            </ChakraSelect.Control>

            <Portal>
                <ChakraSelect.Positioner>
                    <ChakraSelect.Content>
                        <ChakraSelect.ItemGroup>test</ChakraSelect.ItemGroup>
                        <ChakraSelect.ItemGroup>
                            {collection.items.map((item, i) => (
                                <ChakraSelect.Item
                                    item={item}
                                    key={`${item.value}-${item.label}-${i}`}
                                >
                                    <div>
                                        <p>{item.label}</p>
                                        {item.desc && <span>{item.desc}</span>}{' '}
                                    </div>
                                    <ChakraSelect.ItemIndicator />
                                </ChakraSelect.Item>
                            ))}
                        </ChakraSelect.ItemGroup>
                    </ChakraSelect.Content>
                </ChakraSelect.Positioner>
            </Portal>
        </ChakraSelect.Root>
    );
};
