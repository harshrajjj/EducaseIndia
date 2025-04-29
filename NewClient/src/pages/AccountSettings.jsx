import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileContainer from '../components/MobileContainer'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const AccountSettings = () => {
  const { user, updateProfile, logout } = useAuth()
  const { success, error } = useToast()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profileImage: null,
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  
  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        profileImage: null,
      })
      
      if (user.profileImage) {
        setPreviewUrl(user.profileImage)
      }
    }
  }, [user])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    
    if (file) {
      setFormData(prev => ({ ...prev, profileImage: file }))
      
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      // Create form data for file upload
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      
      if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage)
      }
      
      const result = await updateProfile(formDataToSend)
      
      if (result.success) {
        success('Profile updated successfully')
      } else {
        error(result.error || 'Failed to update profile')
      }
    } catch (err) {
      error('An unexpected error occurred')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleLogout = () => {
    logout()
    success('Logged out successfully')
    navigate('/')
  }
  
  return (
    <MobileContainer>
      <div className="flex h-full flex-col p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600">Manage your profile information</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1">
          {/* Profile Image */}
          <div className="mb-6 flex flex-col items-center">
            <div className="relative mb-4">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-500">
                    <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-purple-600 text-white shadow-md hover:bg-purple-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-600">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
          </div>
          
          <Input
            label="Full Name"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            error={errors.name}
            required
          />
          
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
            label="Phone"
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            error={errors.phone}
            required
          />
          
          <div className="mt-8 space-y-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
            >
              Save Changes
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="lg"
              fullWidth
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </form>
      </div>
    </MobileContainer>
  )
}

export default AccountSettings
