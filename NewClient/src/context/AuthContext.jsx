import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

// Create context
const AuthContext = createContext()

// Create axios instance with default config
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/users`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      // Set auth header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // Get user data
      fetchUserData()
    } else {
      setLoading(false)
    }
  }, [])

  // Fetch user data
  const fetchUserData = async () => {
    try {
      setLoading(true)
      const response = await api.get('/me')
      setUser(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching user data:', err)
      setError('Failed to fetch user data')
      // Clear token if invalid
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    } finally {
      setLoading(false)
    }
  }

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true)
      const response = await api.post('/register', userData)

      // Save token
      const { token } = response.data
      localStorage.setItem('token', token)

      // Set auth header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // Get user data
      await fetchUserData()

      return { success: true }
    } catch (err) {
      console.error('Registration error:', err)
      setError(err.response?.data?.message || 'Registration failed')
      return {
        success: false,
        error: err.response?.data?.message || 'Registration failed'
      }
    } finally {
      setLoading(false)
    }
  }

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true)
      setError(null) // Clear any previous errors

      const response = await api.post('/login', { email, password })

      // Save token
      const { token } = response.data
      localStorage.setItem('token', token)

      // Set auth header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // Get user data
      await fetchUserData()

      return { success: true }
    } catch (err) {
      console.error('Login error:', err)
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.'
      setError(errorMessage)
      return {
        success: false,
        error: errorMessage
      }
    } finally {
      setLoading(false)
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true)
      const response = await api.put('/profile', userData)
      setUser(response.data)
      return { success: true }
    } catch (err) {
      console.error('Update profile error:', err)
      setError(err.response?.data?.message || 'Failed to update profile')
      return {
        success: false,
        error: err.response?.data?.message || 'Failed to update profile'
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
