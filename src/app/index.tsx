import { BrowserRouter, Routes, Route } from 'react-router';
import { ChakraProvider } from '@chakra-ui/react';
import { systemTheme, ToasterMessage } from '@/shared/ui';

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

            <ToasterMessage />
        </ChakraProvider>
    );
};

export default App;
