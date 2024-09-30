
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './assets/context/ContextAPI.jsx'


createRoot(document.getElementById('root')).render(

    <ChakraProvider>
    <AuthProvider>
    <App />
    </AuthProvider>
    </ChakraProvider>
)
