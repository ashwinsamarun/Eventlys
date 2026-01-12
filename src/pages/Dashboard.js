/* src/pages/Dashboard.js */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

// 1. Accept props from App.js
const Dashboard = ({ events = [], onUpdateStatus }) => {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null); 
  // 2. Added UI states for Delete & Toast
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });
  
  const navigate = useNavigate();

  const handleReDownload = (bookingRef, eventTitle) => {
    const element = document.createElement("a");
    const file = new Blob([`EVENTLY$ OFFICIAL TICKET\nRef: ${bookingRef}\nEvent: ${eventTitle}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Ticket_${bookingRef}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const staticEvents = [
    { id: 1, title: "Sharing Our Faith & Gospel", date: "2026-03-15", price: "$25.00", category: "Faith", desc: "A morning of spiritual growth and community fellowship." },
    { id: 2, title: "Community Youth Summit", date: "2026-04-20", price: "Free", category: "Community", desc: "Empowering the next generation with purpose and leadership." },
    { id: 3, title: "Evening of Reflection", date: "2026-05-10", price: "$15.00", category: "Faith", desc: "A quiet guided evening for mindfulness and prayer." }
  ];

  // 3. Filtered Logic: Show static + user-created events in Browse
  const allEvents = [...staticEvents, ...events].filter(ev => ev.status !== 'deleted');

  const filteredEvents = allEvents.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 4. Contributions Logic: Only user-submitted items
  const mySubmissions = events.filter(ev => ev.status !== 'deleted');

  const handleDelete = (id, title) => {
    // Visual feedback before state update
    const row = document.getElementById(`row-${id}`);
    if (row) row.style.opacity = '0.3';

    setTimeout(() => {
      onUpdateStatus(id, 'deleted');
      setToast({ show: true, message: `"${title}" has been successfully withdrawn.` });
      setConfirmDeleteId(null);
      setTimeout(() => setToast({ show: false, message: '' }), 3000);
    }, 300);
  };

  return (
    <div className="dashboard-wrapper">
      {/* PROFESSIONAL TOAST NOTIFICATION */}
      {toast.show && (
        <div className="dashboard-toast">
          <span className="toast-dot"></span> {toast.message}
        </div>
      )}

      {/* --- REFINED SIDE DRAWER --- */}
      <div className={`drawer-overlay ${selectedEvent ? 'active' : ''}`} onClick={() => setSelectedEvent(null)}>
        <div className={`drawer-content ${selectedEvent ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          {selectedEvent && (
            <>
              <button className="drawer-close-btn" onClick={() => setSelectedEvent(null)}>
                <span>&times;</span>
              </button>
              <div className="drawer-header">
                <span className="drawer-tag">{selectedEvent.category}</span>
                <h2 className="drawer-title">{selectedEvent.title}</h2>
              </div>
              <div className="drawer-body">
                <p className="drawer-date">📅 {selectedEvent.date || 'TBD'}</p>
                <p className="drawer-desc">{selectedEvent.desc}</p>
              </div>
              <div className="drawer-footer">
                <span className="drawer-price">{selectedEvent.price || 'Free'}</span>
                <div className="footer-action-wrapper">
                  <button className="btn-premium-gold" onClick={() => navigate(`/event/${selectedEvent.id}`)}>
                    Book Now
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="dashboard-container-light">
        <header className="dashboard-header">
          <h2 className="portal-title">User <span>Portal</span></h2>
          <div className="header-controls">
            <div className="tab-pill-container">
              <button className={`tab-pill ${activeTab === 'browse' ? 'active' : ''}`} onClick={() => setActiveTab('browse')}>Discover</button>
              <button className={`tab-pill ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>Schedule</button>
              {/* NEW TAB */}
              <button className={`tab-pill ${activeTab === 'contributions' ? 'active' : ''}`} onClick={() => setActiveTab('contributions')}>Contributions</button>
            </div>
            
            {activeTab === 'browse' && (
              <div className="search-box-refined">
                <i className="fas fa-search"></i>
                <input 
                  type="text" 
                  placeholder="Search events..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
          </div>
        </header>

        <main className="content-area">
          {activeTab === 'browse' && (
            <div className="event-grid-refined">
              {filteredEvents.map(event => (
                <div className="event-card-refined fade-in-up" key={event.id}>
                  <div className="card-top">
                    <span className="category-label">{event.category}</span>
                    <h3 className="event-name">{event.title}</h3>
                    <p className="event-date">{event.date}</p>
                  </div>
                  <div className="card-bottom">
                    <span className="event-price-label">{event.price}</span>
                    <button className="btn-outline-dark" onClick={() => setSelectedEvent(event)}>Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="history-table-wrapper fade-in-up">
              <table className="history-table-refined">
                <thead>
                  <tr><th>Reference</th><th>Event</th><th>Status</th><th>Management</th></tr>
                </thead>
                <tbody>
                  <tr className="table-row-refined">
                    <td><span className="id-badge">#BK-7721</span></td>
                    <td>
                      <div className="td-title">Sharing Our Faith</div>
                      <div className="td-subtitle">March 15, 2026</div>
                    </td>
                    <td><span className="status-badge-green">Confirmed</span></td>
                    <td className="actions-cell">
                      <button className="btn-circle-action" onClick={() => handleReDownload('#BK-7721', 'Sharing Our Faith')}>↓</button>
                      <button className="btn-text-danger">Cancel</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* CONTRIBUTIONS TAB */}
          {activeTab === 'contributions' && (
            <div className="history-table-wrapper fade-in-up">
              <table className="history-table-refined">
                <thead>
                  <tr><th>ID</th><th>Proposed Event</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {mySubmissions.map((sub) => (
                    <tr key={sub.id} id={`row-${sub.id}`} className="table-row-refined">
                      <td><span className="id-badge">#EV-{sub.id.toString().slice(-4)}</span></td>
                      <td>
                        <div className="td-title">{sub.title}</div>
                        <div className="td-subtitle">{sub.category}</div>
                      </td>
                      <td><span className={`status-pill ${sub.status || 'pending'}`}>{sub.status || 'Pending'}</span></td>
                      <td className="actions-cell-inline">
                        <button className="btn-text-dark" onClick={() => setSelectedEvent(sub)}>View</button>
                        {confirmDeleteId === sub.id ? (
                          <button className="btn-confirm-red" onClick={() => handleDelete(sub.id, sub.title)}>Confirm?</button>
                        ) : (
                          <button className="btn-text-danger" onClick={() => setConfirmDeleteId(sub.id)}>Delete</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {mySubmissions.length === 0 && <p className="empty-state">No contributions submitted yet.</p>}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;