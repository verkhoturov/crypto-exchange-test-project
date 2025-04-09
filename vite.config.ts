import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        /*
        visualizer({
            open: true,
            filename: 'stats.html',
        }),
        */
    ],
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/[name]-[hash].js',
                manualChunks: (id) => {
                    if (id.includes('chakra-ui')) return 'chakra-ui';
                    if (id.includes('node_modules')) return 'libs';
                },
            },
        },
    },
});
