import { useState, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ProductDetails from './pages/ProductDetails'
import Navbar from './components/Navbar'
import LoginModal from './components/LoginModal'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [user, setUser] = useState(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error)
      }
    }
  }, [])

  const handleMenuClick = () => {
    setIsSidebarOpen(true)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  const handleLoginClick = () => {
    setIsLoginModalOpen(true)
  }

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false)
  }

  const handleLoginSubmit = (userData) => {
    setUser(userData)
  }

  return (
    <BrowserRouter>
      <Navbar onMenuClick={handleMenuClick} onLoginClick={handleLoginClick} user={user} />
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} onSubmit={handleLoginSubmit} />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              isSidebarOpen={isSidebarOpen}
              onCloseSidebar={handleCloseSidebar}
              onOpenSidebar={handleMenuClick}
              user={user}
            />
          }
        />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
