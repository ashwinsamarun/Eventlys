/* src/components/FloatingUtilities.js */
import React, { useState, useEffect, useRef } from 'react';
import '../styles/FloatingUtilities.css';

const FloatingUtilities = ({ isLoggedIn }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [showScroll, setShowScroll] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 400);
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isLoggedIn) return null;

  return (
    <div className="floating-container">
      {/* Notification Area */}
      <div className="floating-item-wrapper" ref={notifRef}>
        {showNotifications && (
          <div className="floating-notif-dropdown glass-panel fade-in-up">
            <div className="notif-header">Notifications</div>
            <div className="notif-item">
              <div className="notif-dot"></div>
              <p><strong>Ticket Confirmed!</strong> Your seat for "Faith & Future" is reserved.</p>
              <span>Just now</span>
            </div>
            <div className="notif-footer" onClick={() => setShowNotifications(false)}>Dismiss</div>
          </div>
        )}
        <div 
          className="floating-btn bell-btn" 
          onClick={() => { setShowNotifications(!showNotifications); setUnreadCount(0); }}
        >
          <i className="far fa-bell"></i>
          {unreadCount > 0 && <span className="floating-badge"></span>}
        </div>
      </div>

      {/* Scroll to Top */}
      <div className={`floating-btn scroll-btn ${showScroll ? 'visible' : ''}`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <i className="fas fa-arrow-up"></i>
      </div>
    </div>
  );
};

export default FloatingUtilities;