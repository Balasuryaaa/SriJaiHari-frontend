import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Enquiry from './pages/Enquiry'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import EnquiriesAdmin from './pages/admin/EnquiriesAdmin'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import FloatingInfo from './components/FloatingInfo'
import ChatWidget from './components/ChatWidget'

import { LanguageProvider } from './context/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
      <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/enquiry" element={<Enquiry />} />
            {/* Secret admin login — not linked anywhere in the UI */}
            <Route path="/sjh-control-room" element={<AdminLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/enquiries" element={
              <ProtectedRoute>
                <EnquiriesAdmin />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <FloatingInfo />
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
    </LanguageProvider>
  )
}

export default App