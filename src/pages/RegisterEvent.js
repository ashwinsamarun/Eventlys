/* src/pages/RegisterEvent.js */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterEvent.css';

const RegisterEvent = ({ onAdd }) => {
  const navigate = useNavigate();
  // Added category, location, and time to the initial state
  const [form, setForm] = useState({ 
    title: '', 
    organizer: '', 
    price: '', 
    image: '',
    category: 'Faith',
    location: '',
    time: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, id: Date.now() });
    navigate('/dashboard'); // Take them back to see their pending status
  };

  return (
    <div className="register-event-page animate-up">
      <div className="form-card">
        <h2 className="cinzel-font">Host Your <span>Event</span></h2>
        <p>Submit your details for administrative review.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Name</label>
            <input type="text" required onChange={e => setForm({...form, title: e.target.value})} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Organizer / Host Name</label>
              <input type="text" required onChange={e => setForm({...form, organizer: e.target.value})} />
            </div>
            {/* New Category Field */}
            <div className="form-group">
              <label>Category</label>
              <select 
                className="premium-select"
                value={form.category} 
                onChange={e => setForm({...form, category: e.target.value})}
              >
                <option value="Faith">Faith</option>
                <option value="Youth">Youth</option>
                <option value="Community">Community</option>
                <option value="Summit">Summit</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            {/* New Location Field */}
            <div className="form-group">
              <label>Location</label>
              <input type="text" placeholder="Full Address" required onChange={e => setForm({...form, location: e.target.value})} />
            </div>
            {/* New Time Field */}
            <div className="form-group">
              <label>Time Slot</label>
              <input type="text" placeholder="e.g. 9:00am - 12:00pm" required onChange={e => setForm({...form, time: e.target.value})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Admission Price</label>
              <input type="text" placeholder="$0.00" onChange={e => setForm({...form, price: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Banner Image URL</label>
              <input type="text" placeholder="https://..." onChange={e => setForm({...form, image: e.target.value})} />
            </div>
          </div>

          <button type="submit" className="btn-submit-premium">Request Approval</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterEvent;