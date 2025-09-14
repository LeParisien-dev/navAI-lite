import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './auth/AuthContext'
import { BrowserRouter } from 'react-router-dom' // [MODIF] ajout

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* [MODIF] Router au top */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
