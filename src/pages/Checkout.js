/* src/pages/Checkout.js */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // --- NEW: Global Scroll Reset on Component Mount ---
  // Ensures user starts at the top when entering the checkout page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      
      // Force scroll to top before navigating to the Success page
      window.scrollTo(0, 0);
      
      // Redirect to the success page route
      navigate('/success'); 
    }, 2000);
  };

  return (
    <div className="checkout-wrapper fade-in">
      <div className="checkout-grid">
        {/* Payment Form */}
        <form className="payment-card animate-up" onSubmit={handlePayment}>
          <h2 style={{ fontFamily: 'Cinzel', marginBottom: '25px' }}>Secure Checkout</h2>
          
          <div className="input-group">
            <label>Cardholder Name</label>
            <input type="text" placeholder="John Doe" required />
          </div>

          <div className="input-group">
            <label>Card Number</label>
            <input type="text" placeholder="**** **** **** 4444" required />
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Expiry Date</label>
              <input type="text" placeholder="MM/YY" required />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>CVV</label>
              <input type="password" placeholder="***" required />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-complete" 
            disabled={loading}
            style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? "Processing..." : "Complete Purchase"}
          </button>
        </form>

        {/* Order Summary Sidebar */}
        <aside className="summary-card animate-up" style={{ animationDelay: '0.2s' }}>
          <h3 style={{ fontFamily: 'Cinzel' }}>Order Summary</h3>
          <div className="summary-item">
            <span>Event Ticket</span>
            <span>$25.00</span>
          </div>
          <div className="summary-item">
            <span>Service Fee</span>
            <span>$2.50</span>
          </div>
          <div className="summary-item total-row" style={{ borderTop: '2px solid #eee', paddingTop: '15px', marginTop: '15px', fontWeight: 'bold' }}>
            <span>Total</span>
            <span style={{ color: '#fccb00' }}>$27.50</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '20px', textAlign: 'center' }}>
            <i className="fas fa-lock" style={{ marginRight: '5px' }}></i>
            Secure SSL encrypted transaction.
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;