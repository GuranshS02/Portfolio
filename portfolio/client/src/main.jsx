import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0f0e0c', color: '#f5f0e8',
            border: '1px solid rgba(245,240,232,0.12)',
            fontFamily: "'Outfit', sans-serif", fontSize: '14px',
          },
          success: { iconTheme: { primary: '#c8531a', secondary: '#f5f0e8' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)
