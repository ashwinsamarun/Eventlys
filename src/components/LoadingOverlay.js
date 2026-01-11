import React from 'react';
import '../styles/LoadingOverlay.css';

const LoadingOverlay = ({ message = "LOADING..." }) => {
  return (
    <div className="global-loader-overlay">
      <div className="loader-container">
        {/* The Icon Container */}
        <div className="loader-icon-wrapper">
          <img src="/favicon.png" alt="Loading..." className="loader-logo-img" />
          <div className="loader-spin-ring"></div>
        </div>
        <p className="loader-text">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;