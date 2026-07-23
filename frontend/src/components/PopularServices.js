import React from 'react';
import { popularServices } from '../mockData';
import './PopularServices.css';

function PopularServices() {
  return (
    <section className="services-section">
      <div className="services-container">
        <h2>Popular Services</h2>
        <p>Find trusted professionals for all your needs</p>
        <div className="services-grid">
          {popularServices.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-name">{service.name}</h3>
              <p className="service-providers">{service.providers} providers</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularServices;