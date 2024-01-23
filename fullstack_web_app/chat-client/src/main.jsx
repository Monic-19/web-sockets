import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as BR } from "react-router-dom";
import { AuthProvider } from './stroe/auth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <BR>
        <App />
      </BR>
    </React.StrictMode>,
  </AuthProvider>
)
