/* src/pages/Login.js */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import LoadingOverlay from '../components/LoadingOverlay';

const Login = ({ setIsLoggedIn, setUserRole }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false); // New state for animation

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 1. Trigger the premium authentication overlay
    setIsLoggingIn(true);

    // 2. Simulate a secure authentication delay (1.2 seconds)
    setTimeout(() => {
      setIsLoggedIn(true);

      if (email === "admin@evently.com") {
        setUserRole('admin');
        navigate('/');
      } else {
        setUserRole('user');
        navigate('/');
      }
      
      // Force scroll reset after navigation
      window.scrollTo(0, 0);
      setIsLoggingIn(false);
    }, 1200);
  };

  const handleResetRequest = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to: ${email || 'your email'}`);
    setShowForgotModal(false);
  };

  return (
    <>
      {/* --- AUTHENTICATION OVERLAY --- */}
      {isLoggingIn && <LoadingOverlay message="LOGGING IN..." />}

      <div className="auth-wrapper">
        <div className="auth-card animate-up">
          <h2 className="cinzel-font">Login</h2>
          
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="Password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-auth-main">Login</button>
          </form>
          <br />
          <div className="auth-options-row">
              <span className="auth-link-alt" onClick={() => setShowForgotModal(true)}>
                Forgot Password?
              </span>
            </div>
          <div className="auth-footer">
            <p>New here? <span className="auth-link-alt" onClick={() => navigate('/register')}>Create Account</span></p>
          </div>
        </div>

        {/* --- FORGOT PASSWORD MODAL --- */}
        {showForgotModal && (
          <div className="modal-overlay" onClick={() => setShowForgotModal(false)}>
            <div className="modal-content animate-up" onClick={(e) => e.stopPropagation()}>
              <button className="close-panel" onClick={() => setShowForgotModal(false)}>&times;</button>
              <h2 className="cinzel-font">Reset <span>Password</span></h2>
              <p className="modal-subtext">
                Enter your email and we'll send you a link to get back into your account.
              </p>
              <form onSubmit={handleResetRequest}>
                <input 
                  type="email" 
                  placeholder="Confirm Email Address" 
                  required 
                  className="modal-input"
                />
                <button type="submit" className="btn-auth-main" style={{width: '100%'}}>
                  Send Reset Link
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;