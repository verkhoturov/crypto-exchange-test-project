import { BrowserRouter, Routes, Route } from 'react-router';
import { ChakraProvider } from '@chakra-ui/react';
import { systemTheme, Toaster } from '@/shared/ui';

import { Home } from '@/pages/Home';

import './global.css';

const App = () => {
    return (
        <ChakraProvider value={systemTheme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>

            <Toaster />
        </ChakraProvider>
    );
};

export default App;
