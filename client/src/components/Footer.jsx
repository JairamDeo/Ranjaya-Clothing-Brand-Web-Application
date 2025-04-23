import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import Logo from '../assets/Logo.png';

const Footer = () => {
  const socialLinks = [
    {
      icon: <FaInstagram className="text-white text-lg" />,
      href: 'https://www.instagram.com/',
      bg: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
    },
    {
      icon: <FaFacebookF className="text-white text-lg" />,
      href: 'https://www.facebook.com/',
      bg: 'bg-blue-600',
    },
    {
      icon: <FaWhatsapp className="text-white text-lg" />,
      href: 'https://www.whatsapp.com/',
      bg: 'bg-green-500',
    },
  ];

  return (
    <footer className="bg-cream text-darkBrown items-center">
      <div className="px-4 py-3 md:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-6 sm:gap-x-12">
          {/* Logo Section */}
          <div className="lg:col-span-1" data-aos="fade-right">
            <img src={Logo} alt="Ranjaya Logo" className="h-16 mb-4" />
            <p className="leading-relaxed text-sm">
              While the new generation stopped wearing Sarees, Ranjaya is a wave of traditions, and the art of draping a saree for new India.
            </p>
          </div>

          {/* Shop */}
          <div data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-lg font-semibold border-b-2 border-maroon inline-block pb-1">Shop</h3>
            <ul className="space-y-3 mt-4 text-sm">
              {["Sarees", "Nazaakat", "Rut-Bahar", "Rose/Roz"].map((item, index) => (
                <li key={index}>
                  <Link to={`/shop/${item.toLowerCase().replace(/\//g, '-')}`} className="hover:underline transition-all duration-300 ease-in-out hover:scale-105">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          

          {/* Information */}
          <div data-aos="fade-up" data-aos-delay="150">
            <h3 className="text-lg font-semibold border-b-2 border-maroon inline-block pb-1">Information</h3>
            <ul className="space-y-3 mt-4 text-sm">
              <li><Link to="/about" className="hover:underline transition-all duration-300 ease-in-out hover:scale-105">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline transition-all duration-300 ease-in-out hover:scale-105">Contact</Link></li>
              <li><Link to="/faq" className="hover:underline transition-all duration-300 ease-in-out hover:scale-105">FAQs</Link></li>
              <li><Link to="/terms" className="hover:underline transition-all duration-300 ease-in-out hover:scale-105">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-lg font-semibold border-b-2 border-maroon inline-block pb-1">Quick Links</h3>
            <ul className="space-y-3 mt-4 text-sm">
              <li><Link to="/" className="hover:underline transition-all duration-300 ease-in-out hover:scale-105">Home</Link></li>
              <li><Link to="/cart" className="hover:underline transition-all duration-300 ease-in-out hover:scale-105">Cart</Link></li>
              <li><Link to="/wishlist" className="hover:underline transition-all duration-300 ease-in-out hover:scale-105">Wishlist</Link></li>
              <li><Link to="/orders" className="hover:underline transition-all duration-300 ease-in-out hover:scale-105">My Orders</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div data-aos="fade-left" data-aos-delay="300">
            <h3 className="text-lg font-semibold border-b-2 border-maroon inline-block pb-1">Follow Us</h3>
            <div className="flex items-center space-x-4 mt-4">
              {socialLinks.map(({ icon, href, bg }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${bg} p-3 rounded-full shadow-custom transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-6`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 border-t border-lightPink/50 pt-4 text-center text-sm">
          © {new Date().getFullYear()} Ranjaya. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
