import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to define styles for NavLink
  const linkClass = ({ isActive }) => {
    const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300";
    if (isActive) {
      return `${baseClasses} bg-blue-600 text-white shadow-md`;
    }
    return `${baseClasses} text-gray-300 hover:bg-gray-700 hover:text-white`;
  };

  // Function to handle link clicks on mobile and close the menu
  const handleMobileLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand Name */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-2xl font-extrabold tracking-wider">
                CampusConnect
              </Link>
            </div>

            {/* Desktop Menu Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" className={linkClass}>Home</NavLink>
                <NavLink to="/about" className={linkClass}>About</NavLink>
                <NavLink to="/events" className={linkClass}>Events</NavLink>
                <NavLink to="/gallery" className={linkClass}>Gallery</NavLink>
                <NavLink to="/feedback" className={linkClass}>Feedback</NavLink>
                <NavLink to="/contact" className={linkClass}>Contact</NavLink>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon for menu button */}
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel with Slide-in Transition */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-gray-900 to-blue-900 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-16 pb-3 space-y-3 flex flex-col items-center">
            <NavLink to="/" className={linkClass} onClick={handleMobileLinkClick}>Home</NavLink>
            <NavLink to="/about" className={linkClass} onClick={handleMobileLinkClick}>About</NavLink>
            <NavLink to="/events" className={linkClass} onClick={handleMobileLinkClick}>Events</NavLink>
            <NavLink to="/gallery" className={linkClass} onClick={handleMobileLinkClick}>Gallery</NavLink>
            <NavLink to="/feedback" className={linkClass} onClick={handleMobileLinkClick}>Feedback</NavLink>
            <NavLink to="/contact" className={linkClass} onClick={handleMobileLinkClick}>Contact</NavLink>
        </div>
      </div>
      
      {/* Overlay for when mobile menu is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 backdrop-grayscale-100 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;