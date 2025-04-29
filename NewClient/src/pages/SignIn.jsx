import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MobileContainer from '../components/MobileContainer'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const { error, success } = useToast()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const result = await login(formData.email, formData.password)

      if (result.success) {
        success('Logged in successfully')
        navigate('/account-settings')
      } else {
        // Set the error message in the form
        setErrors({
          ...errors,
          general: result.error || 'Login failed. Please check your credentials.'
        })
        error(result.error || 'Login failed')
      }
    } catch (err) {
      setErrors({
        ...errors,
        general: 'An unexpected error occurred. Please try again.'
      })
      error('An unexpected error occurred')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MobileContainer>
      <div className="flex h-full flex-col p-6">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Sign In</h1>
          <p className="text-gray-600">Welcome back to PopX</p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1">
          {errors.general && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {errors.general}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
            required
          />

          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
            required
          />

          <div className="mt-8">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
            >
              Sign In
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/create-account" className="font-medium text-purple-600 hover:text-purple-500">
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </MobileContainer>
  )
}

export default SignIn
