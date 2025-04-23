import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

// Make sure your image path is correct
import authBG from '../assets/authbg.jpg';

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle animation when switching between forms
  const toggleAuthMode = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsSignIn(!isSignIn);
      setIsAnimating(false);
    }, 500);

    // Reset form data and errors
    setFormData({ name: "", email: "", mobile: "", password: "" });
    setErrors({});
  };

  // Validation functions
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  const validateMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Login validation
    if (isSignIn) {
      if (!formData.email) {
        newErrors.email = "Email or mobile is required";
      } else {
        const isEmail = formData.email.includes("@gmail.com");
        const isMobile = /^[6-9]\d{9}$/.test(formData.email);

        if (!(isEmail || isMobile)) {
          newErrors.email = "Enter valid email or 10-digit mobile number";
        } else if (isEmail && !validateEmail(formData.email)) {
          newErrors.email = "Enter a valid Gmail address";
        }
      }

      if (!formData.password) {
        newErrors.password = "Password is required";
      }
    }
    // Signup validation
    else {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }

      if (!formData.mobile) {
        newErrors.mobile = "Mobile number is required";
      } else if (!validateMobile(formData.mobile)) {
        newErrors.mobile = "Enter a valid 10-digit mobile number starting with 6-9";
      }

      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Enter a valid Gmail address";
      }

      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (isSignIn) {
        setModalMessage("Login Successful 🎉");
      } else {
        setModalMessage("Account Created Successfully 🎉");
      }
      setShowModal(true);

      // Clear form data after success
      setFormData({ name: "", email: "", mobile: "", password: "" });
    }
  };

  // Close modal function
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-screen w-full transition-all duration-2000 ease-in-out bg-cream ${isSignIn ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Left section - Full Background Image */}
      <div className="relative w-full md:w-1/2 h-72 md:h-auto md:min-h-screen transition-all duration-2000 ease-in-out">
        <img
          src={authBG}
          alt="Fashion model"
          className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-2000 ease-in-out"
        />
        <div className="absolute inset-0 bg-darkBrown bg-opacity-30 flex items-center justify-center">
          <div className="text-white text-center px-6 transform transition-all duration-2000 ease-in-out">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">FASHION ELITE</h1>
            <p className="text-lg md:text-2xl">
              {isSignIn ? "Elevate Your Style" : "Join Our Style Community"}
            </p>
          </div>
        </div>
      </div>

      {/* Right section - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-12 py-8 bg-cream overflow-y-auto">
        <div className={`w-full max-w-md ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-500 ease-in-out my-4`}>
          {/* Form Header with animated underline */}
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-darkBrown relative inline-block">
              {isSignIn ? "Welcome Back" : "Join Us"}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-maroon transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </h2>
            <p className="text-darkBrown mt-2">
              {isSignIn
                ? "Sign in to continue your fashion journey"
                : "Create an account for exclusive offers"}
            </p>
          </div>

          {/* Form Container with enhanced animations */}
          <div className="bg-cream p-8 rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl border border-maroon border-opacity-20">
            {/* Login/Signup Form */}
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {/* Signup Section - Only shown when isSignIn is false */}
              {!isSignIn && (
                <div className="space-y-4" id="signup-section">
                  {/* Comment: Signup form fields start here */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      placeholder="Full Name"
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon transition-all duration-300 bg-cream text-darkBrown placeholder-darkBrown placeholder-opacity-60 ${errors.name ? "border-red-500" : "border-maroon border-opacity-30"
                        }`}
                    />
                    {errors.name && (
                      <p className="text-maroon text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      placeholder="Mobile Number"
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon transition-all duration-300 bg-cream text-darkBrown placeholder-darkBrown placeholder-opacity-60 ${errors.mobile ? "border-red-500" : "border-maroon border-opacity-30"
                        }`}
                    />
                    {errors.mobile && (
                      <p className="text-maroon text-xs mt-1">{errors.mobile}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Common fields for both Login and Signup */}
              <div className="space-y-4" id="login-section">
                {/* Comment: Login form fields start here */}
                <div>
                  <input
                    type={isSignIn ? "text" : "email"}
                    name="email"
                    value={formData.email}
                    placeholder={isSignIn ? "Email or Mobile" : "Email Address"}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon transition-all duration-300 bg-cream text-darkBrown placeholder-darkBrown placeholder-opacity-60 ${errors.email ? "border-red-500" : "border-maroon border-opacity-30"
                      }`}
                  />
                  {errors.email && (
                    <p className="text-maroon text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Password"
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon transition-all duration-300 bg-cream text-darkBrown placeholder-darkBrown placeholder-opacity-60 ${errors.password ? "border-red-500" : "border-maroon border-opacity-30"
                      }`}
                  />
                  {errors.password && (
                    <p className="text-maroon text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                {isSignIn && (
                  <div className="flex justify-end text-sm">
                    <a href="#" className="text-darkBrown hover:text-maroon hover:underline transition-colors duration-300">
                      Forgot password?
                    </a>
                  </div>
                )}
              </div>

              {/* Submit Button with animation */}
              <button
                type="submit"
                className="w-full bg-maroon text-white py-3 rounded-lg hover:bg-darkMaroon transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-medium mt-4 shadow-md"
              >
                {isSignIn ? "Login" : "Create Account"}
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center mt-6 mb-4">
                <div className="border-t border-maroon border-opacity-30 w-full"></div>
                <span className="bg-cream px-3 text-xs text-darkBrown absolute">OR</span>
              </div>

              {/* Google Sign In */}
              <div className="flex items-center justify-center gap-2 py-3 px-4 border border-maroon border-opacity-30 rounded-lg cursor-pointer hover:bg-lightPink transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
                <FcGoogle size={22} />
                <span className="text-darkBrown font-medium">Continue with Google</span>
              </div>
              
              {/* Toggle between Login and Signup */}
              <div className="text-center mt-6">
                {isSignIn ? (
                  <div className="text-sm text-darkBrown">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      className="text-maroon font-semibold hover:underline transition-all duration-300"
                      onClick={toggleAuthMode}
                    >
                      Sign up
                    </button>
                  </div>
                ) : (
                  <div className="text-sm text-darkBrown">
                    Already have an account?{' '}
                    <button
                      type="button"
                      className="text-maroon font-semibold hover:underline transition-all duration-300"
                      onClick={toggleAuthMode}
                    >
                      Sign in
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Overlay */}
            <div className="fixed inset-0 bg-darkBrown opacity-30" onClick={closeModal}></div>

            {/* Modal Content */}
            <div className="bg-cream rounded-xl shadow-xl p-8 w-full max-w-sm mx-auto z-10 relative border border-maroon border-opacity-20">
              <div className="text-center">
                <div className="w-16 h-16 bg-lightPink rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>

                <h3 className="text-2xl font-semibold text-darkBrown mb-2">
                  {modalMessage}
                </h3>

                <p className="text-darkBrown mb-6">
                  {isSignIn
                    ? "Welcome back to our exclusive collection."
                    : "Welcome to our fashion community!"}
                </p>

                <button
                  onClick={closeModal}
                  className="w-full py-3 bg-maroon text-white rounded-lg hover:bg-darkMaroon transition-all duration-300 shadow-md"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}