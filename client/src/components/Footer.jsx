import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';
// Import logo from assets
import Logo from '../assets/Logo.webp';

const Footer = () => {
  const year = new Date().getFullYear();
  
  // Footer Navigation Links
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

  // Social Media Links
  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, path: "https://instagram.com", label: "Instagram", hoverColor: "hover:bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500" },
    { icon: <Facebook className="h-5 w-5" />, path: "https://facebook.com", label: "Facebook", hoverColor: "hover:bg-blue-600" },
    { icon: <Twitter className="h-5 w-5" />, path: "https://twitter.com", label: "Twitter", hoverColor: "hover:bg-sky-500" },
    { icon: <Phone className="h-5 w-5" />, path: "tel:+919876543210", label: "Phone", hoverColor: "hover:bg-green-600" }
  ];

  return (
    <footer className="bg-cream border-t border-maroon-20 pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        {/* Main Footer Content - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and About Column */}
          <div className="space-y-4" data-aos="fade-right" data-aos-duration="1500">
            <Link to="/" className="inline-block transform transition-transform duration-300 hover:scale-105">
              <img src={Logo} alt="Ranjaya" className="h-16" />
            </Link>
            <p className="text-darkBrown text-sm leading-relaxed">
              Celebrating the art of ethnic wear with timeless designs and premium craftsmanship. Every piece tells a story of heritage and elegance.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-3 mt-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.path} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`bg-cream text-maroon ${social.hoverColor} hover:text-white p-2 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
                  data-aos="flip-right"
                  data-aos-duration={2500 + (index * 200)}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Link Columns */}
          {footerLinks.map((column, index) => (
            <div 
              key={index} 
              className="space-y-4"
              data-aos="fade-up"
              data-aos-duration={1500 + ((index + 1) * 500)}
            >
              <h3 className="font-medium text-maroon tracking-wide text-lg relative inline-block">
                {column.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-maroon transition-all duration-300 group-hover:w-full"></span>
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path} 
                      className="text-darkBrown hover:text-maroon transition-colors duration-300 relative group inline-block py-1"
                    >
                      <span>{link.name}</span>
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-maroon transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information Bar */}
        <div className='md:flex md:items-center md:justify-center border-t border-maroon-20'>
          <div className=" pt-6 pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 text-darkBrown text-sm group">
              <Mail size={18} className="text-maroon transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <a href="mailto:contact@ranjaya.com" className="hover:text-maroon transition-colors duration-300 relative inline-block">
                contact@ranjaya.com
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-maroon transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            <div className="flex items-center space-x-2 text-darkBrown text-sm group">
              <Phone size={18} className="text-maroon transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <a href="tel:+919876543210" className="hover:text-maroon transition-colors duration-300 relative inline-block">
                +91 98765 43210
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-maroon transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            <div className="flex items-center space-x-2 text-darkBrown text-sm">
              <MapPin size={18} className="text-maroon" />
              <span>123 Fashion Street, Mumbai, India</span>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-maroon-20 pt-6 text-center text-sm text-darkBrown">
          <p>© {year} Ranjaya. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-2">
            <Link to="/privacy-policy" className="hover:text-maroon transition-colors duration-300 relative group inline-block">
              Privacy Policy
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-maroon transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/terms" className="hover:text-maroon transition-colors duration-300 relative group inline-block">
              Terms of Service
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-maroon transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;