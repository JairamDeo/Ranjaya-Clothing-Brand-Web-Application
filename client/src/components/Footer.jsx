import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';
// Lazy load the image
import Logo from '../assets/Logo.webp'

const Footer = () => {
  const year = new Date().getFullYear();

  // Pre-defined static data - moved outside component to avoid re-creation on renders
  const footerLinks = [
    {
      title: "Shop",
      links: [
        { name: "Suit Sets", path: "/suit-sets" },
        { name: "Sarees", path: "/sarees" },
        { name: "New Arrivals", path: "/new-arrivals" },
        { name: "Best Sellers", path: "/best-sellers" },
        { name: "Clearance Sale", path: "/clearance-sale" }
      ]
    },
    {
      title: "About",
      links: [
        { name: "Our Story", path: "/about-us" },
        { name: "Reviews", path: "/reviews" },
        { name: "Sustainability", path: "/sustainability" },
        { name: "Contact Us", path: "/contact-us" }
      ]
    },
    {
      title: "Help",
      links: [
        { name: "Shipping & Returns", path: "/shipping" },
        { name: "Size Guide", path: "/size-guide" },
        { name: "FAQ", path: "/faq" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms & Conditions", path: "/terms" }
      ]
    }
  ];

  // Social Media Links - memoized outside of component render
  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, path: "https://instagram.com", label: "Instagram", hoverColor: "hover:bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500" },
    { icon: <Facebook className="h-5 w-5" />, path: "https://facebook.com", label: "Facebook", hoverColor: "hover:bg-blue-600" },
    { icon: <Mail className="h-5 w-5" />, path: "https://gmail.com", label: "Gmail", hoverColor: "hover:bg-orange-500" },
    { icon: <Phone className="h-5 w-5" />, path: "tel:+919876543210", label: "Phone", hoverColor: "hover:bg-green-600" }
  ];

  return (
    <footer className="bg-cream border-t border-maroon-20 pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        {/* Main Footer Content - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-8">
          {/* Logo and About Column - Added AOS */}
          <div className="space-y-4" data-aos="fade-up" data-aos-duration="800" >
            <Link to="/" className="inline-block transform transition-transform duration-300 hover:scale-105">
              <img src={Logo} alt="Ranjaya" className="h-16" />
            </Link>
            <p className="text-darkBrown text-sm leading-relaxed">
              Celebrating the art of ethnic wear with timeless designs and premium craftsmanship. Every piece tells a story of heritage and elegance.
            </p>
            {/* Social Media Icons - Simplified */}
            <div className="flex space-x-3 mt-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  to={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`bg-cream text-maroon ${social.hoverColor} hover:text-white p-2 rounded-full transition-colors duration-300`}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Link Columns - Added AOS with staggered delay */}
          {footerLinks.map((column, index) => (
            <div
              key={index}
              className="space-y-4"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={100 * (index + 1)}
            >
              <h3 className="font-medium text-maroon tracking-wide text-lg relative inline-block">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-darkBrown hover:text-maroon transition-colors duration-300 py-1 px-2"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information Bar - Added AOS */}
        <div className="md:flex md:items-center md:justify-center border-t border-maroon-20" data-aos="fade-up" data-aos-duration="800" >
          <div className="pt-6 pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 text-darkBrown text-sm px-3 py-2">
              <Mail size={18} className="text-maroon" />
              <Link to="mailto:contact@ranjaya.com" className="hover:text-maroon transition-colors duration-300">
                contact@ranjaya.com
              </Link>
            </div>
            <div className="flex items-center space-x-2 text-darkBrown text-sm px-3 py-2">
              <Phone size={18} className="text-maroon" />
              <Link to="tel:+919876543210" className="hover:text-maroon transition-colors duration-300">
                +91 98765 43210
              </Link>
            </div>
            <div className="flex items-center space-x-2 text-darkBrown text-sm px-3 py-2">
              <MapPin size={18} className="text-maroon" />
              <span className="hover:text-maroon transition-colors duration-300">
                123 Ethnic Street, Jaipur, Rajasthan, India
              </span>
            </div>
          </div>
        </div>

        {/* Copyright Bar - Added AOS */}
        <div className="border-t border-maroon-20 pt-6 text-center text-sm text-darkBrown" >
          <p>© {year} Ranjaya. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-2">
            <Link to="/privacy-policy" className="hover:text-maroon transition-colors duration-300 px-2 py-1">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-maroon transition-colors duration-300 px-2 py-1">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer); // Memoize the entire component to prevent unnecessary re-renders