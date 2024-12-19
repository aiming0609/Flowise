import App from '@/App'
import { store } from '@/store'
import React from 'react'
import { createRoot } from 'react-dom/client'

// i18n
import '@/i18n'

// style + assets
import '@/assets/scss/style.scss'

// third party
import ConfirmContextProvider from '@/store/context/ConfirmContextProvider'
import { ReactFlowContext } from '@/store/context/ReactFlowContext'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <SnackbarProvider>
                    <ConfirmContextProvider>
                        <ReactFlowContext>
                            <App />
                        </ReactFlowContext>
                    </ConfirmContextProvider>
                </SnackbarProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
