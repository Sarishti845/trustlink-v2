import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Find <span className="highlight">Verified</span> Local Service Providers</h1>
          <p className="subheading">
            Connect with trusted professionals in your area. Transparent pricing,
            guaranteed arrival times, and real verified reviews.
          </p>
          <ul className="features-list">
            <li>✅ Verified Professionals</li>
            <li>🕒 Guaranteed Arrival</li>
            <li>💲 Transparent Pricing</li>
          </ul>
          <div className="search-form">
            <div className="input-group">
              <label>What service do you need?</label>
              <input type="text" placeholder="🔍 Plumber, electrician..." />
            </div>
            <div className="input-group">
              <label>Location</label>
              <input type="text" placeholder="Enter your location" />
            </div>
           <button className="find-services-btn" onClick={() => navigate('/services')}>
  Find Services
</button>
          </div>
        </div>
        <div className="hero-image-container">
          <img
            src="https://images.pexels.com/photos/8005396/pexels-photo-8005396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Service professional at work"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;