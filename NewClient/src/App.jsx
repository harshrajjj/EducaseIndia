import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Welcome from './pages/Welcome'
import SignIn from './pages/SignIn'
import CreateAccount from './pages/CreateAccount'
import AccountSettings from './pages/AccountSettings'
import ToastContainer from './components/ToastContainer'

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  
  if (!user) {
    return <Navigate to="/signin" replace />
  }
  
  return children
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route 
          path="/account-settings" 
          element={
            <ProtectedRoute>
              <AccountSettings />
            </ProtectedRoute>
          } 
        />
      </Routes>
      
      <ToastContainer />
    </>
  )
}

export default App
