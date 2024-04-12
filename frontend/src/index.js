import { App } from './App'
import {createRoot} from 'react-dom/client'
import { AuthProvider } from './jwt_Store/jwtStorage'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root'))
.render(
<AuthProvider>

<App/>

<ToastContainer 

position="top-right"
autoClose={4000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"




/>
</AuthProvider>
)