import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { ToastHandler } from './components/ToastHandler.tsx';
import './styles/global.css'

import { AppRoutes } from './routes.tsx'
import { Navbar } from './components/Navbar/Navbar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar />
      <ToastHandler/>
      <AppRoutes />
    </BrowserRouter>
    <ToastContainer />
  </StrictMode>,
)
