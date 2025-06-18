import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from '../App/App.tsx'

import store from '../../store/store.ts';

import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <StrictMode>
            <App />
        </StrictMode>,
    </Provider>
)
