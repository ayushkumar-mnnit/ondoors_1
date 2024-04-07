import { App } from './App'
import {createRoot} from 'react-dom/client'
import { AuthProvider } from './jwt_Store/jwtStorage'

createRoot(document.getElementById('root'))
.render(
<AuthProvider>
<App/>
</AuthProvider>
)