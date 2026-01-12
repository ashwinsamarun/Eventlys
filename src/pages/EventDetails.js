/* src/pages/EventDetails.js */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EventDetails.css'; 

const EventDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="event-details-wrapper animate-up">
      {/* Hero Banner Section */}
      <div className="details-hero" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200')"}}>
        <div className="hero-content">
          <button className="back-link" onClick={() => navigate(-1)}>
        <i className="fas fa-chevron-left"></i> Back to Events</button>
          <span className="category-pill">Community & Culture</span>
          <h1 className="cinzel-font">Sharing Our Faith <span>& Gospel</span></h1>
        </div>
      </div>

      <div className="details-grid-container">
        {/* Main Info Column */}
        <main className="details-main-content">
          <div className="content-block">
            <h3 className="cinzel-font">About the Experience</h3>
            <p className="description-text">
              This event is designed to bring the community together for an inspiring session 
              of faith and fellowship. Join us for a powerful morning where technology meets 
              tradition in a seamless, modern environment.
            </p>
          </div>

          <div className="location-card">

            <div className="location-text">
              <h4 className="cinzel-font">The Venue</h4>
              <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
            </div>
          </div>
        </main>

        {/* Action Sidebar */}
        <aside className="booking-sidebar">
          <div className="sticky-card">
            <div className="sidebar-header">
              <p className="sidebar-label">Admission Fee</p>
              <h2 className="sidebar-price">$25.00</h2>
            </div>
            
            <div className="sidebar-stats-refined">
          <div className="stat-row">
            <div className="stat-icon-wrapper"><i className="far fa-clock"></i></div>
            <div className="stat-details">
              <span className="stat-title">Schedule</span>
              <p>8:30am — 11:30am</p>
            </div>
          </div>
          
          <div className="stat-row">
            <div className="stat-icon-wrapper"><i className="far fa-user"></i></div>
            <div className="stat-details">
              <span className="stat-title">Organizer</span>
              <p>Jerry Simon</p>
            </div>
          </div>
        </div>

            <button 
              className="btn-confirm-booking" 
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/checkout');
              }}
            >
              Confirm Booking
            </button>
            <p className="secure-tag"><b>✓ Secure Reservation</b></p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EventDetails;