/* src/pages/AdminDashboard.js */
import React, { useState } from 'react';
import '../styles/AdminDashboard.css';

const AdminDashboard = ({ events, onUpdateStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', price: '', category: 'Faith' });

  // Separate events into Pending (New Submissions) and Approved (Existing Management)
  const pendingEvents = events.filter(ev => ev.status === 'pending');
  const approvedEvents = events.filter(ev => ev.status === 'approved');

  const handleCreate = (e) => {
    e.preventDefault();
    // Simulate creating an approved event directly from admin
    const id = events.length + 1;
    onUpdateStatus({ ...newEvent, id, sales: 0, status: 'approved' }); 
    setShowModal(false);
    setNewEvent({ title: '', date: '', price: '', category: 'Faith' });

    setToast({ show: true, message: "EVENT PUBLISHED SUCCESSFULLY", type: 'approved' });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };


  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // NEW: Function to trigger toast
  const triggerAction = (id, status, title) => {
    onUpdateStatus(id, status);
    const message = status === 'approved' 
      ? `"${title}" IS NOW LIVE` 
      : `"${title}" HAS BEEN REJECTED`;
    
    setToast({ show: true, message, type: status });
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };
  return (
   <div className="admin-container">
      {/* SUCCESS TOAST COMPONENT */}
      {toast.show && (
        <div className={`admin-toast ${toast.type === 'approved' ? 'toast-gold' : 'toast-red'}`}>
          <div className="toast-content">
            <span className="toast-icon">{toast.type === 'approved' ? '✓' : '✕'}</span>
            <p>{toast.message}</p>
          </div>
          <div className="toast-progress"></div>
        </div>
      )}

      {/* 1. NEW: MODERATION QUEUE SECTION */}
      <section className="moderation-queue animate-up" style={{ animationDelay: '0.05s' }}>
          <div className="section-header-refined">
            <h3 className="cinzel-font">Moderation <span>Queue</span></h3>
            <span className="task-badge">{pendingEvents.length} Pending Approval</span>
          </div>
          <div className="glass-panel">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>User Submission</th>
                  <th>Organizer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingEvents.map((event) => (
                  <tr key={event.id} className="fade-in-scale pending-row">
                    <td><strong>{event.title}</strong></td>
                    <td>{event.organizer || "User Submitted"}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="approve-btn" onClick={() => triggerAction(event.id, 'approved', event.title)}>Approve</button>
                        <button className="reject-btn" onClick={() => triggerAction(event.id, 'rejected', event.title)}>Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      {/* 2. STATS SECTION (Existing) */}
      <div className="admin-stats-grid animate-up" style={{ animationDelay: '0.1s', marginTop: '40px' }}>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">$4,250.00</p>
          <span className="stat-label">+12% from last month</span>
        </div>
        <div className="stat-card">
          <h3>Active Bookings</h3>
          <p className="stat-value">195</p>
          <span className="stat-label">Across {approvedEvents.length} live events</span>
        </div>
        <div className="stat-card">
          <h3>User Growth</h3>
          <p className="stat-value">840</p>
          <span className="stat-label">Registered Members</span>
        </div>
      </div>

      {/* 3. MANAGEMENT TABLE (Existing - Now filtered for Approved only) */}
      <div className="section-header-refined animate-up" style={{ marginTop: '50px' }}>
        <h3 className="cinzel-font">Active <span>Events</span></h3>
      </div>
      <div className="glass-panel animate-up" style={{ animationDelay: '0.2s' }}>
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
            {approvedEvents.map((event) => (
              <tr key={event.id} className="fade-in-scale">
                <td><strong>{event.title}</strong></td>
                <td><span className="badge-category">{event.category}</span></td>
                <td>{event.date}</td>
                <td>{event.sales || 0} Tickets</td>
                <td>
                  <div className="admin-actions">
                    <button className="action-btn-circle edit" title="Edit">✎</button>
                    <button className="action-btn-circle delete" onClick={() => onUpdateStatus(event.id, 'deleted')} title="Delete">×</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE EVENT MODAL (Existing) */}
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