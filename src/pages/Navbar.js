/* src/pages/Navbar.js */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn, userRole, scrollToHome, scrollToAbout, scrollToEvents, }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // State for logout animation

  // --- NEW: Global Scroll Reset on Page Change ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogout = () => {
    setIsLoggingOut(true); // 1. Trigger the visual overlay

    // 2. Wait for animation, then perform the actual logout
    setTimeout(() => {
      setIsLoggedIn(false);
      setIsLoggingOut(false);
      navigate('/');
      window.scrollTo(0, 0);
    }, 800); // Optimized duration for a smooth feel
  };

  const handleNavClick = (scrollFunc) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        window.scrollTo(0, 0);
        scrollFunc();
      }, 100);
    } else {
      scrollFunc();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  return (
    <>
      {/* --- LOGOUT OVERLAY --- */}
      {isLoggingOut && (
        <div className="logout-overlay">
          <div className="loader-gold"></div>
          <p>SECURELY LOGGING OUT...</p>
        </div>
      )}

      <nav className={`main-nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-logo" onClick={() => handleNavClick(scrollToHome)} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'}}>
  <img src="/favicon.png" alt="Logo" className="navbar-logo-circle" /><span className="brand-text">
    EVENTLY<sup className="gold-superscript">$</sup>
  </span>
</div>
        <div className="nav-links">
          <span className="nav-item" onClick={() => handleNavClick(scrollToHome)}>Home</span>
          <span className="nav-item" onClick={() => handleNavClick(scrollToAbout)}>About</span>
          <span  className="nav-item" onClick={() => navigate('/events')}>Events</span>
          {isLoggedIn && (<span  className="nav-item" onClick={() => navigate('/register-event')}> Register Event</span> )}
         
          <div className="auth-btns">
            {isLoggedIn ? (
              <>
                {userRole === 'admin' && (
                  <Link to="/admin" className="nav-item admin-link" style={{color: '#fccb00', fontWeight: 'bold', marginRight: '15px', textDecoration: 'none'}}>Admin Console
                  </Link>
                )}
                
                <Link to="/dashboard" className="nav-item dashboard-link" style={{marginRight: '15px', textDecoration: 'none'}}>Dashboard</Link>
                <Link to="/settings" className="nav-item dashboard-link" style={{marginRight: '15px', textDecoration: 'none'}}>Settings</Link>
                 <span  className="nav-item" style={{marginRight: '15px', textDecoration: 'none'}}onClick={() => navigate('/support')}>Help</span>
                <button onClick={handleLogout} className="btn-login-outline">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-login-outline">Login</Link>
                <Link to="/register" className="btn-register-fill">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;