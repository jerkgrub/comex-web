import React from "react";
import { Link } from "react-router-dom";
import './About.css';

export const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-description">
        We are the NU MOA Community Extension Brigade, a group of students and faculty members from the National University Manila who are passionate about serving our community. Our mission is to extend our academic excellence, social responsibility, and civic engagement to the people of Santo Tomas, Calabarzon, and beyond.
      </p>
      <Link to="/contact" className="contactUs">Contact Us</Link>
    </div>
  )
};