import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
    theme: {
        tokens: {
            fonts: {
                body: { value: "'Roboto', sans-serif" },
            },
            colors: {
                heading: { value: '#101828' },
                gray: {
                    400: { value: '#667085' },
                },
                black: {
                    900: { value: '#344054' },
                },
            },
            fontWeights: {
                normal: { value: '400' },
                medium: { value: '600' },
            },
            fontSizes: {
                normal: { value: '18px' },
            },
        },
    },
    globalCss: {
        'body': {
            fontFamily: '{fonts.body}',
            fontWeight: '{fontWeights.normal}',
            fontSize: '{fontSizes.normal}',
            color: '{colors.black.900}',
        },
        'h1,h2,h3,h4,h5,h6': {
            color: '{colors.heading}',
        },
    },
});

export const systemTheme = createSystem(defaultConfig, customConfig);
