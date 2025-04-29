import PropTypes from 'prop-types'

const MobileContainer = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="mobile-container relative flex flex-col overflow-hidden">
        {/* Phone-like notch at the top */}
        <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-xl bg-gray-900 flex items-center justify-center">
          <div className="h-1.5 w-16 rounded-full bg-gray-700"></div>
        </div>
        
        {/* Content */}
        <div className="flex flex-1 flex-col pt-6">
          {children}
        </div>
        
        {/* Bottom "home indicator" like iOS */}
        <div className="absolute bottom-2 left-1/2 z-10 h-1 w-32 -translate-x-1/2 rounded-full bg-gray-300"></div>
      </div>
    </div>
  )
}

MobileContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MobileContainer
