/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password
 * @param {string} password - The password to validate
 * @returns {object} - Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validates a phone number (10 digits)
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

/**
 * Validates form data
 * @param {object} data - The form data to validate
 * @param {array} fields - The fields to validate
 * @returns {object} - Object with errors for each invalid field
 */
export const validateForm = (data, fields) => {
  const errors = {};
  
  fields.forEach(field => {
    switch (field) {
      case 'name':
        if (!data.name) {
          errors.name = 'Name is required';
        }
        break;
        
      case 'email':
        if (!data.email) {
          errors.email = 'Email is required';
        } else if (!isValidEmail(data.email)) {
          errors.email = 'Email is invalid';
        }
        break;
        
      case 'phone':
        if (!data.phone) {
          errors.phone = 'Phone number is required';
        } else if (!isValidPhone(data.phone)) {
          errors.phone = 'Phone number must be 10 digits';
        }
        break;
        
      case 'password':
        const passwordValidation = validatePassword(data.password);
        if (!passwordValidation.isValid) {
          errors.password = passwordValidation.message;
        }
        break;
        
      case 'confirmPassword':
        if (data.password !== data.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }
        break;
        
      default:
        break;
    }
  });
  
  return errors;
};
