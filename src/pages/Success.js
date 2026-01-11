/* src/pages/Success.js */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Success.css';

const Success = () => {
  const navigate = useNavigate();
  const [bookingId, setBookingId] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const randomId = "EVT-" + Math.random().toString(36).substr(2, 5).toUpperCase();
    setBookingId(randomId);
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Simulate high-end generation delay
    setTimeout(() => {
      const element = document.createElement("a");
      const file = new Blob([`
        EVENTLY$ TICKET RECEIPT
        -----------------------
        Booking ID: ${bookingId}
        Event: Sharing Our Faith & Gospel
        Status: Confirmed / Paid
        Date: January 2026
      `], {type: 'text/plain'});
      
      element.href = URL.createObjectURL(file);
      element.download = `Ticket_${bookingId}.txt`;
      document.body.appendChild(element);
      element.click();
      
      setIsDownloading(false);
      setDownloaded(true);
      
      // Reset "Downloaded" text after 3 seconds
      setTimeout(() => setDownloaded(false), 3000);
    }, 1500);
  };

  return (
    <div className="success-wrapper animate-up">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h2 style={{ fontFamily: 'Cinzel', fontWeight: 'bold' }}>Booking Confirmed!</h2>
        
        <div className="booking-id-box">
          <h4>Your Booking ID</h4>
          <p>{bookingId}</p>
        </div>

        <div className="download-container">
          <button 
            className={`btn-download ${downloaded ? 'success-gold' : ''}`} 
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <span className="loader"></span>
            ) : downloaded ? (
              "✓ Ticket Downloaded"
            ) : (
              "Download PDF Ticket"
            )}
          </button>
        </div>

        <button className="btn-dashboard-return" onClick={() => navigate('/dashboard')}>
          Go to My Dashboard
        </button>
      </div>
    </div>
  );
};

export default Success;