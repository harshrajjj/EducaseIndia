import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MobileContainer from '../components/MobileContainer'
import Button from '../components/Button'

const Welcome = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    'Manage digital experiences',
    'Analyze user engagement',
    'Create stunning campaigns',
  ]

  useEffect(() => {
    // Add a small delay for the animation to be noticeable
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    // Rotate through features
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(featureInterval)
    }
  }, [features.length])

  return (
    <MobileContainer>
      <div className="flex h-full flex-col justify-between">
        {/* Decorative elements */}
        <div className="absolute right-6 top-20 h-20 w-20 rounded-full bg-purple-100 opacity-30 blur-xl"></div>
        <div className="absolute bottom-40 left-4 h-16 w-16 rounded-full bg-purple-200 opacity-30 blur-xl"></div>

        {/* Empty top section to push content to bottom */}
        <div className="flex-1"></div>

        {/* Main content at the bottom */}
        <div className="flex flex-col items-center px-8 pb-16 pt-4 z-10">
          {/* Logo */}
          <div className={`mb-8 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 opacity-30 blur-md animate-pulse"></div>
              <div className="relative rounded-full bg-white p-4 shadow-xl">
                <svg className="h-12 w-12 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className={`mb-10 text-center ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <h1 className="mb-4 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-500">
              Welcome to PopX
            </h1>

            {/* Animated feature text */}
            <div className="flex h-16 items-center justify-center">
              {features.map((feature, index) => (
                <p
                  key={index}
                  className={`absolute mx-auto max-w-xs text-xl leading-relaxed text-gray-600 transition-all duration-500 ${
                    index === activeFeature
                      ? 'opacity-100 transform-none'
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  {feature}
                </p>
              ))}
            </div>
          </div>

          <div className={`space-y-4 w-full max-w-md ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <Link to="/create-account" className="block">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              >
                Create Account
              </Button>
            </Link>

            <Link to="/signin" className="block">
              <Button
                variant="secondary"
                size="lg"
                fullWidth
                icon={
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                }
              >
                Already Registered? Login
              </Button>
            </Link>
          </div>

          <div className={`mt-10 text-center text-xs text-gray-400 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <p>© {new Date().getFullYear()} PopX. All rights reserved.</p>
          </div>
        </div>
      </div>
    </MobileContainer>
  )
}

export default Welcome
