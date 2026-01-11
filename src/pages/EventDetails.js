  import React from 'react';
  import { useNavigate } from 'react-router-dom'; // Combined imports
  import '../styles/EventDetails.css'; 

  const EventDetails = () => {
    // 1. Initialize all hooks at the top of the component

    const navigate = useNavigate();

    return (
      <div className="event-details-page">
        <div className="details-hero" style={{backgroundImage: "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200')"}}>
          <div className="details-overlay">
            <h1>Event Details</h1>
          </div>
        </div>

        <div className="details-container">
          <div className="details-main-content">
            <h2 style={{fontFamily: 'Cinzel', fontWeight: 'bold'}}>Sharing Our Faith & Gospel</h2>
            <p className="description-text">
              This event is designed to bring the community together for an inspiring session 
              of faith and fellowship. Join us for a powerful morning (RS3).
            </p>
            <div style={{background: '#f9f9f9', padding: '20px', borderRadius: '5px', borderLeft: '4px solid #fccb00'}}>
              <h4 style={{fontFamily: 'Cinzel'}}>Location:</h4>
              <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
            </div>
          </div>

          <aside className="booking-sidebar">
            <div className="sidebar-info">
              <p><strong>Price:</strong> <span style={{color: '#fccb00'}}>$25.00</span></p>
              <p><strong>Time:</strong> 8:30am - 11:30am</p>
              <p><strong>Organizer:</strong> Jerry Simon</p>
            </div>
            {/* 2. Navigate correctly to Checkout (RS5) */}
            <button 
    className="btn-join w-100" 
    onClick={() => {
      window.scrollTo(0, 0); // Ensures the checkout page starts at the top
      navigate('/checkout');
    }}
  >
    Confirm Booking
  </button>
          </aside>
        </div>
      </div>
    );
  };

  export default EventDetails;