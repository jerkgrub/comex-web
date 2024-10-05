import React from 'react';
import './Services.css'; // Import the CSS

export const Services = () => {
  return (
    <div className="services-container">
      <h1 className="services-header">Our Services</h1>
      <div className="services-grid">
        <div className="service-card">
          <h2 className="service-title">Service 1</h2>
          <p className="service-description">Description for Service 1</p>
        </div>
        <div className="service-card">
          <h2 className="service-title">Service 2</h2>  
          <p className="service-description">Description for Service 2</p>
        </div>
        <div className="service-card">
          <h2 className="service-title">Service 3</h2>
          <p className="service-description">Description for Service 3</p>
        </div>
        {/* Add more service cards as needed */}
      </div>
    </div>
  );
};
