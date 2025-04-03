import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
//import { Navbar } from './components/Navbar/Navbar.tsx'
// import { HomePage } from './components/HomePage/HomePage.tsx'
import { Usuarios } from './components/TesteDeUsuarios.tsx'
import { Footer } from './components/Footer/Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Footer />
    <Usuarios/>
  </StrictMode>,
)
