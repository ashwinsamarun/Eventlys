/* src/pages/AdminDashboard.js */
import React, { useState } from 'react';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [events, setEvents] = useState([
    { id: 1, title: "Sharing Our Faith", date: "2026-03-15", price: "$25.00", category: "Faith", sales: 45 },
    { id: 2, title: "Community Youth Summit", date: "2026-04-20", price: "Free", category: "Youth", sales: 120 },
    { id: 3, title: "Evening of Reflection", date: "2026-05-10", price: "$15.00", category: "Faith", sales: 30 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', price: '', category: 'Faith' });

  const handleDelete = (id) => {
    const element = document.getElementById(`admin-row-${id}`);
    if (element) element.classList.add('row-exit-fade');
    
    setTimeout(() => {
      setEvents(events.filter(event => event.id !== id));
    }, 400);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const id = events.length + 1;
    setEvents([...events, { ...newEvent, id, sales: 0 }]);
    setShowModal(false);
    setNewEvent({ title: '', date: '', price: '', category: 'Faith' });
  };

  return (
    <div className="admin-container">
      <header className="admin-header animate-up">
        <h1 className="cinzel-font">Admin <span>Management</span></h1>
        <button className="btn-register-fill" onClick={() => setShowModal(true)}>+ Create New Event</button>
      </header>

      {/* Stats Section */}
      <div className="admin-stats-grid animate-up" style={{ animationDelay: '0.1s' }}>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">$4,250.00</p>
          <span className="stat-label">+12% from last month</span>
        </div>
        <div className="stat-card">
          <h3>Active Bookings</h3>
          <p className="stat-value">195</p>
          <span className="stat-label">Across 3 events</span>
        </div>
        <div className="stat-card">
          <h3>User Growth</h3>
          <p className="stat-value">840</p>
          <span className="stat-label">Registered Members</span>
        </div>
      </div>

      {/* Management Table */}
      <div className="glass-panel animate-up" style={{ animationDelay: '0.2s', marginTop: '40px' }}>
        <table className="premium-table">
          <thead>
            <tr>
              <th>Event Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Sales</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="fade-in-scale">
                <td><strong>{event.title}</strong></td>
                <td><span className="badge-category">{event.category}</span></td>
                <td>{event.date}</td>
                <td>{event.sales} Tickets</td>
                <td>
                  <div className="admin-actions">
                      <button className="action-btn-circle edit" title="Edit">✎</button>
                      <button className="action-btn-circle delete" onClick={() => handleDelete(event.id)} title="Delete">×</button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE EVENT MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-up">
            <h2 className="cinzel-font">New <span>Event</span></h2>
            <form onSubmit={handleCreate}>
              <input type="text" placeholder="Event Title" required value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} />
              <div className="form-row">
                <input type="date" required value={newEvent.date} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} />
                <input type="text" placeholder="Price (e.g. $25.00)" required value={newEvent.price} onChange={(e) => setNewEvent({...newEvent, price: e.target.value})} />
              </div>
              <select value={newEvent.category} onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}>
                <option value="Faith">Faith</option>
                <option value="Youth">Youth</option>
                <option value="Community">Community</option>
              </select>
              <div className="modal-footer-btns">
                  <button type="button" className="btn-cancel-flat" onClick={() => setShowModal(false)}>Discard</button>
                  <button type="submit" className="btn-publish-main">Publish Event</button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;