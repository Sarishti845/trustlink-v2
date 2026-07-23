import React from 'react';
import { FaRegHandshake } from 'react-icons/fa';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
           <h3 className="footer-logo">
            <FaRegHandshake className="footer-logo-icon" />
            TrustLink
          </h3>
          <p>Connecting customers with verified local service providers. Transparent pricing, guaranteed quality, and trusted professionals.</p>
          <div className="social-icons">
            <FaFacebook /> <FaTwitter /> <FaInstagram /> <FaLinkedin />
          </div>
        </div>
        <div className="footer-links">
          <h4>Services</h4>
          <a href="/">Home Repairs</a>
          <a href="/">Electrical Services</a>
          <a href="/">Plumbing</a>
          <a href="/">All Services</a>
        </div>
        <div className="footer-links">
          <h4>Company</h4>
          <a href="/">About Us</a>
          <a href="/">How It Works</a>
          <a href="/">Careers</a>
          <a href="/">Press</a>
        </div>
        <div className="footer-links">
          <h4>Support</h4>
          <a href="/">Help Center</a>
          <a href="/">Contact Us</a>
          <a href="/">Terms of Service</a>
          <a href="/">Privacy Policy</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 TrustLink. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;