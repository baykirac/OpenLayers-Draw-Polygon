import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import "primeicons/primeicons.css";
createRoot(document.getElementById('root')).render(
    <PrimeReactProvider>
<App />
    </PrimeReactProvider>
    
)
