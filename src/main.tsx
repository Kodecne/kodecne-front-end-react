import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
//import { Navbar } from './components/Navbar/Navbar.tsx'
//import { HomePage } from './components/HomePage/HomePage.tsx'
//import { Footer } from './components/Footer/Footer.tsx'
import { LoginPage } from './components/LoginPage/LoginPage'

console.log('Renderizando o componente LoginPage...');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginPage />
  </StrictMode>,
)
