import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Snowfall from 'react-snowfall'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{ position: 'relative' }}>
      <App />
      <div>
        <Snowfall style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
        }} snowflakeCount={150} />
      </div>
    </div>
  </StrictMode>
)