import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ProductDetails from './pages/ProductDetails'
import Navbar from './components/Navbar'

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleHamburgerClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <BrowserRouter>
      <Navbar onHamburgerClick={handleHamburgerClick} />
      <Routes>
        <Route path="/" element={<LandingPage onHamburgerClick={handleHamburgerClick} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
