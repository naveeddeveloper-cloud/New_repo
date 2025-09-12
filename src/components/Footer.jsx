// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiMapPin, FiPhone, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

// Helper component for a consistent footer title style
const FooterTitle = ({ children }) => (
    <h3 className="text-lg font-bold text-white mb-6 tracking-wider relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-10 after:h-[2px] after:bg-blue-500">
        {children}
    </h3>
);

// Helper component for quick links
const FooterLink = ({ to, children }) => (
    <li>
        <Link to={to} className="text-gray-400 hover:text-blue-300 transition-colors duration-300">
            {children}
        </Link>
    </li>
);

// Helper for contact info items
const ContactInfoItem = ({ icon, children }) => (
    <li className="flex items-start gap-3">
        <div className="text-blue-400 mt-1 flex-shrink-0">{icon}</div>
        <span className="text-gray-400">{children}</span>
    </li>
);

// Helper for social media links
const SocialLink = ({ href, icon }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white bg-gray-700 hover:bg-blue-600 p-2 rounded-full transition-all duration-300">
        {icon}
    </a>
);


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Column 1: Brand & About */}
          <div className="lg:col-span-2 mb-2 space-y-4">
            <Link to="/" className="text-white  text-3xl font-extrabold tracking-wider">
              Campus Connect
            </Link>
            <p className="text-sm mt-2 leading-relaxed text-gray-400 max-w-md">
              Your launchpad into the world of technology. Stay updated with our latest events, courses, and campus news.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <FooterTitle>Explore</FooterTitle>
            <ul className="space-y-3">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/events">All Events</FooterLink>
              <FooterLink to="/gallery">Gallery</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <FooterTitle>Get in Touch</FooterTitle>
            <ul className="space-y-4 text-sm">
              <ContactInfoItem icon={<FiMapPin size={18} />}>
                Shahrah-e-Faisal Rd, near Star Gate, Karachi, Pakistan
              </ContactInfoItem>
              <ContactInfoItem icon={<FiMail size={18} />}>
                <a href="mailto:stargate@aptech-education.com" className="hover:text-blue-300">stargate@aptech-education.com</a>
              </ContactInfoItem>
              <ContactInfoItem icon={<FiPhone size={18} />}>
                <a href="tel:+92211234567" className="hover:text-blue-300">(021) 123-4567</a>
              </ContactInfoItem>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="md:col-span-2 lg:col-span-1">
            <FooterTitle>Stay Updated</FooterTitle>
            <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input type="email" placeholder="Enter your email" required className="w-full bg-gray-800 text-white px-4 py-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                    <button type="submit" className="bg-blue-600 text-white font-bold px-4 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 whitespace-nowrap">
                        Sign Up
                    </button>
                </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Socials */}
        <div className="mt-16 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-gray-500 mb-4 sm:mb-0">
            © {new Date().getFullYear()} Aptech Metro Star Gate. All Rights Reserved.
          </p>
          <div className="flex space-x-3">
            <SocialLink href="#" icon={<FiFacebook size={20} />} />
            <SocialLink href="#" icon={<FiTwitter size={20} />} />
            <SocialLink href="#" icon={<FiInstagram size={20} />} />
            <SocialLink href="#" icon={<FiLinkedin size={20} />} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;