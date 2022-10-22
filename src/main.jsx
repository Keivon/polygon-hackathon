import React from 'react'
import ReactDOM from 'react-dom/client'
import AppBar from './components/App_bar';
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppBar/>
    <br/>
    <App />
  </React.StrictMode>
)
