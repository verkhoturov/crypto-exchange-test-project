import { BrowserRouter, Routes, Route } from 'react-router';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

import { Home } from '@/pages/Home';

// import './global.scss';

const App = () => {
    return (
        <ChakraProvider value={defaultSystem}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
};

export default App;
