import React from 'react';
import './StatsSection.css';

function StatsSection() {
  return (
    <section className="stats-section">
      <h2>Trusted by Thousands</h2>
      <p>Join our growing community of satisfied customers and verified professionals</p>
      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-number">15,000+</span>
          <span className="stat-label">Happy Customers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">2,500+</span>
          <span className="stat-label">Verified Professionals</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">98%</span>
          <span className="stat-label">Satisfaction Rate</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">50+</span>
          <span className="stat-label">Service Categories</span>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;