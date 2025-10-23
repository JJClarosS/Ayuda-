import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import Menu from './components/Menu.jsx';
import CrearPedido from './components/CrearPedido.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Menu/>}/>
      <Route path="/pedido" element={<CrearPedido/>}/>
    </Routes>
  </BrowserRouter>
)
