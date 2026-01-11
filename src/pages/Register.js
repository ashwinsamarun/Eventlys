/* src/pages/Register.js */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import LoadingOverlay from '../components/LoadingOverlay';

const Register = () => {
  const navigate = useNavigate();
  // New state to manage the registration animation
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    
    // 1. Trigger the premium authentication overlay
    setIsRegistering(true);

    // 2. Simulate a secure processing delay (1.2 seconds)
    setTimeout(() => {
      // 3. Navigate to login after "creating" the account
      navigate('/login');
      
      // Ensure the login page starts at the top
      window.scrollTo(0, 0);
      setIsRegistering(false);
    }, 1200);
  };

  return (
    <>
      {/* --- AUTHENTICATION OVERLAY --- */}
      {isRegistering && <LoadingOverlay message="REGISTERING USER..." />}

      <div className="auth-wrapper">
        <div className="auth-card animate-up">
          <h2 className="cinzel-font">Create <span>Account</span></h2>
          
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Full Name" 
                required 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
              />
              <input 
                type="password" 
                placeholder="Password" 
                required 
              />
            </div>

            <button type="submit" className="btn-auth-main" style={{ marginTop: '10px' }}>
              Register
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <span className="auth-link-alt" onClick={() => navigate('/login')}>
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;