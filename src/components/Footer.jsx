import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'; // Import the CSS

export const Footer = () => {
  return (
    <footer className="footer">
      <img src={require('./images/logo.png')} alt="Logo" className="footer-logo" />
      <div className="social-media">
        <a href="https://web.facebook.com/numoacomexb/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer" className="social-media__link">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://twitter.com/numoacomexb" target="_blank" rel="noopener noreferrer" className="social-media__link">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://www.instagram.com/numoacomexb" target="_blank" rel="noopener noreferrer" className="social-media__link">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </footer>
  );
};