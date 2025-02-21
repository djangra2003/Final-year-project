import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from '@mui/icons-material/X';
import backgroundImage from '../assets/footer.png'
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-cover bg-center text-white py-8"
    style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none"></div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* About Us */}
        <div>
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <p className="text-sm text-gray-700">
            Discover the beauty of India's beaches, from lively shores to serene
            retreats. We are your ultimate guide to exploring coastal
            adventures, hidden gems, and unforgettable experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/location'>Explore Beaches</Link></li>
            <li><Link to='/activities'>Activities & Adventures</Link></li>
            <li><Link to='/blog'>Blog</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>Email: <a href="mailto:info@beachesofindia.com" className="text-blue-500">info@beachesofindia.com</a></li>
            <li>Phone: +91-8860542549</li>
            <li>Address: [City, State], India</li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us On</h2>
          <div className="flex space-x-4">
            <a href="#" aria-label="Instagram">
              <InstagramIcon className="text-gray-600 hover:text-blue-500" fontSize="large" />
            </a>
            <a href="#" aria-label="Facebook">
              <FacebookIcon className="text-gray-600 hover:text-blue-500" fontSize="large" />
            </a>
            <a href="#" aria-label="YouTube">
              <YouTubeIcon className="text-gray-600 hover:text-blue-500" fontSize="large" />
            </a>
            <a href="#" aria-label="Twitter">
              <XIcon className="text-gray-600 hover:text-blue-500" fontSize="large" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
