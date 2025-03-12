import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { Navbar } from './components/Navbar/Navbar.tsx'
import { HomePage } from './components/HomePage/HomePage.tsx'
import { Footer } from './components/Footer/Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />
    <HomePage />
    <Footer />
  </StrictMode>,
)
