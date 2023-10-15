import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { Tooltip } from 'react-tooltip'
import { Toaster } from 'react-hot-toast'

import App from './App.tsx'
import { store } from './store/store.ts'

import 'react-toastify/dist/ReactToastify.css'
import 'react-tooltip/dist/react-tooltip.css'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
        <ToastContainer position='bottom-left' autoClose={2000} />
        <Tooltip id="tooltip" />
        <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
                duration: 6000
            }}
        />
    </Provider>,
)
