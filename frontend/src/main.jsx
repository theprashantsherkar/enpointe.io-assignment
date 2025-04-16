import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserContextWrapper } from './context/UserContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextWrapper>
      <App />
    </UserContextWrapper>
  </StrictMode>,
)
