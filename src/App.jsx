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

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-full flex flex-col app-gradient text-dark dark:text-white font-sans bg-white dark:bg-gray-900">
        <Navbar />
        <main className="flex-1 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/enquiries"
              element={
                <ProtectedRoute>
                  <EnquiriesAdmin />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <FloatingInfo />
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  )
}

export default App
