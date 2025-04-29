import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

// Create context
const ToastContext = createContext()

// Provider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  // Add toast
  const addToast = (message, type = 'info', duration = 5000) => {
    const id = Date.now()
    
    setToasts(prevToasts => [
      ...prevToasts,
      { id, message, type, duration }
    ])
    
    // Auto remove toast after duration
    setTimeout(() => {
      removeToast(id)
    }, duration)
    
    return id
  }

  // Remove toast
  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id))
  }

  // Shorthand methods
  const success = (message, duration) => addToast(message, 'success', duration)
  const error = (message, duration) => addToast(message, 'error', duration)
  const info = (message, duration) => addToast(message, 'info', duration)
  const warning = (message, duration) => addToast(message, 'warning', duration)

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        success,
        error,
        info,
        warning,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// Custom hook to use toast context
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
