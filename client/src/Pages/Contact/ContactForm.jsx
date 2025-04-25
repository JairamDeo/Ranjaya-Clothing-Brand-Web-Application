import { useState, useEffect } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import SuccessModal from './SuccessModal';

const ContactForm = ({ 
  address = "PLOT NO 94, Shiv Ashish Society, Udhana Main Road, Surat, Gujarat - 394210",
  phoneNumber = "+91 78629 92669",
  email = "Info@pironi.in",
  mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.2973637777966!2d72.83016691493446!3d21.17409678591881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dec3bccd031%3A0x648add546f73dcb9!2sUdhna%20Main%20Rd%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1650356144509!5m2!1sen!2sin"
}) => {
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phoneNumber: '',
    query: ''
  });
  const [errors, setErrors] = useState({});
  const [phoneInputFocused, setPhoneInputFocused] = useState(false);
  
  // Country codes for the dropdown
  const countryCodes = [
    { code: '+91', country: 'IN', flag: '🇮🇳' },
    { code: '+1', country: 'US', flag: '🇺🇸' },
    { code: '+44', country: 'GB', flag: '🇬🇧' },
    { code: '+61', country: 'AU', flag: '🇦🇺' },
    { code: '+971', country: 'AE', flag: '🇦🇪' },
    { code: '+65', country: 'SG', flag: '🇸🇬' },
  ];

  // Close modal and reset form
  const closeModal = () => {
    setShowSuccessModal(false);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle country code change
  const handleCountryCodeChange = (e) => {
    setFormData(prev => ({ ...prev, countryCode: e.target.value }));
  };

  // Handle phone input focus
  const handlePhoneFocus = () => {
    setPhoneInputFocused(true);
  };

  // Handle phone input blur
  const handlePhoneBlur = () => {
    setPhoneInputFocused(false);
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    
    // Phone validation with libphonenumber-js
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else {
      try {
        const phoneNumber = parsePhoneNumberFromString(
          `${formData.countryCode}${formData.phoneNumber}`
        );
        
        if (!phoneNumber || !phoneNumber.isValid()) {
          newErrors.phoneNumber = "Please enter a valid phone number";
        }
      } catch (error) {
        newErrors.phoneNumber = "Please enter a valid phone number";
      }
    }
    
    // Query validation
    if (!formData.query.trim()) {
      newErrors.query = "Please enter your query";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          mobile: `${formData.countryCode}${formData.phoneNumber}`,
          query: formData.query
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setShowSuccessModal(true);
        setFormSubmitted(true);
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      countryCode: '+91' + ' ',
      phoneNumber: '',
      query: ''
    });
    setErrors({});
  };

  // Reset form after submission
  useEffect(() => {
    if (formSubmitted) {
      resetForm();
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  return (
    <div className="bg-cream py-16 px-4 md:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-cream rounded-lg shadow-custom p-6 md:p-8">
            <h2 className="text-2xl font-bold text-darkBrown mb-6 relative">
              Get in Touch
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-maroon"></span>
            </h2>
            <p className='pb-3 text-gray-600'>We’d love to hear from you—whether it’s feedback, collaboration, or just a hello!</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`peer w-full px-3 py-3 border-2 rounded-md outline-none transition-all duration-300 
                    ${errors.name ? 'border-red-500' : 'border-gray-200 focus:border-maroon'} 
                    bg-transparent pt-6`}
                  placeholder=" "
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-3 top-4 text-gray-500 transition-all duration-300 
                    peer-focus:text-xs peer-focus:top-2 peer-focus:text-maroon
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                    peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2"
                >
                  Name
                </label>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`peer w-full px-3 py-3 border-2 rounded-md outline-none transition-all duration-300 
                    ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-maroon'} 
                    bg-transparent pt-6`}
                  placeholder=" "
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-3 top-4 text-gray-500 transition-all duration-300 
                    peer-focus:text-xs peer-focus:top-2 peer-focus:text-maroon
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                    peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2"
                >
                  Email
                </label>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              {/* Mobile Number Field with Country Code - Combined Focus */}
              <div className="relative">
                <div className={`flex ${phoneInputFocused ? ' ring-maroon rounded-md' : ''}`}>
                  <div className="w-24">
                    <select
                      value={formData.countryCode}
                      onChange={handleCountryCodeChange}
                      onFocus={handlePhoneFocus}
                      onBlur={handlePhoneBlur}
                      className={`peer h-full w-full rounded-l-md border-2 border-r-0 outline-none transition-all duration-300
                        ${errors.phoneNumber ? 'border-red-500' : phoneInputFocused ? 'border-maroon' : 'border-gray-200'} 
                        bg-transparent px-2 py-3`}
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      onFocus={handlePhoneFocus}
                      onBlur={handlePhoneBlur}
                      className={`peer w-full px-3 py-3 border-2 border-l-0 rounded-r-md outline-none transition-all duration-300 
                        ${errors.phoneNumber ? 'border-red-500' : phoneInputFocused ? 'border-maroon' : 'border-gray-200'} 
                        bg-transparent pt-6`}
                      placeholder=" "
                    />
                    <label 
                      htmlFor="phoneNumber" 
                      className="absolute left-3 top-4 text-gray-500 transition-all duration-300 
                        peer-focus:text-xs peer-focus:top-2 peer-focus:text-maroon
                        peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                        peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2"
                    >
                      Phone Number
                    </label>
                  </div>
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>
              
              {/* Query Field */}
              <div className="relative">
                <textarea
                  id="query"
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  rows="4"
                  className={`peer w-full px-3 py-3 border-2 rounded-md outline-none transition-all duration-300 
                    ${errors.query ? 'border-red-500' : 'border-gray-200 focus:border-maroon'} 
                    bg-transparent pt-6 resize-none`}
                  placeholder=" "
                ></textarea>
                <label 
                  htmlFor="query" 
                  className="absolute left-3 top-4 text-gray-500 transition-all duration-300 
                    peer-focus:text-xs peer-focus:top-2 peer-focus:text-maroon
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                    peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2"
                >
                  Your Query
                </label>
                {errors.query && <p className="text-red-500 text-sm mt-1">{errors.query}</p>}
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-maroon hover:bg-darkMaroon text-white font-medium py-3 px-6 rounded-md 
                transition-all duration-300 transform hover:scale-102 focus:outline-none focus:ring-2 
                focus:ring-maroon focus:ring-opacity-50 shadow-md"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  <>
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      Send Message
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="bg-cream rounded-lg shadow-custom p-6 md:p-8 relative">
            <h2 className="text-2xl font-bold text-darkBrown mb-6 relative">
              Contact Information
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-maroon"></span>
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-lightPink flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-darkBrown">Address</h3>
                  <p className="mt-1 text-gray-600">{address}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-lightPink flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-darkBrown">Mobile Number</h3>
                  <p className="mt-1 text-gray-600">{phoneNumber}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-lightPink flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-darkBrown">Email</h3>
                  <p className="mt-1 text-gray-600">{email}</p>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="flex space-x-4">
                  {/* Social Media Icons */}
                  <a href="#" className="w-10 h-10 rounded-full bg-lightPink hover:bg-maroon hover:text-white text-maroon flex items-center justify-center transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-lightPink hover:bg-maroon hover:text-white text-maroon flex items-center justify-center transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-lightPink hover:bg-maroon hover:text-white text-maroon flex items-center justify-center transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-lightPink hover:bg-maroon hover:text-white text-maroon flex items-center justify-center transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map with maroon top border */}
            <div className="mt-8 h-52 rounded-lg overflow-hidden shadow-md relative">
              {/* Maroon top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-maroon z-10"></div>
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && <SuccessModal closeModal={closeModal} />}
    </div>
  );
};

export default ContactForm;