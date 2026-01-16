/* src/pages/EventCalendar.js */
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/EventCalendar.css';

const EventCalendar = ({ events = [], userSubmissions = [] }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('public');

  // Unified helper to normalize dates for comparison
  const isSameDay = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const getFilteredEvents = (date, mode) => {
    const dataSource = mode === 'public' ? events : userSubmissions;
    return dataSource.filter(ev => isSameDay(ev.date, date));
  };

  const activeEvents = getFilteredEvents(selectedDate, viewMode);

  return (
    <div className="calendar-wrapper animate-up">
      <div className="calendar-max-container">
        
        <header className="calendar-view-header">
          <div className="header-titles">
            <h1 className="cinzel-font">Event <span>Itinerary</span></h1>
            <p>Your curated schedule across the platform.</p>
          </div>
          
          <div className="view-toggle">
            <button 
              className={viewMode === 'public' ? 'active' : ''} 
              onClick={() => setViewMode('public')}
            >
              Discover All
            </button>
            <button 
              className={viewMode === 'personal' ? 'active' : ''} 
              onClick={() => setViewMode('personal')}
            >
              My Registered
            </button>
          </div>
        </header>

        <div className="calendar-main-grid">
          <div className="calendar-card-container glass-panel">
            <Calendar 
              onChange={setSelectedDate} 
              value={selectedDate}
              // This adds the "Gold Dot" to every date that has an event across the app
              tileContent={({ date, view }) => {
                if (view === 'month') {
                  const hasEvents = getFilteredEvents(date, viewMode).length > 0;
                  return hasEvents ? <div className={`dot-indicator ${viewMode} pulse-animation`}></div> : null;
                }
              }}
            />
          </div>

          <div className="agenda-sidebar-container glass-panel">
            <div className="agenda-date-header">
              <h2 className="date-number">{selectedDate.getDate()}</h2>
              <div className="date-sub">
                <span className="day-name">{selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}</span>
                <span className="month-year">{selectedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>

            <div className="agenda-scroll-box">
              {activeEvents.length > 0 ? (
                activeEvents.map((ev, i) => (
                  <div key={ev.id || i} className="agenda-card-premium fade-in-right" style={{animationDelay: `${i * 0.1}s`}}>
                    <div className="card-accent-line"></div>
                    <div className="card-info">
                      <div className="card-top">
                        <span className="tag">{ev.category}</span>
                        <span className="event-price-tag">{ev.price || 'Free'}</span>
                      </div>
                      <h4>{ev.title}</h4>
                      <p className="meta"><i className="far fa-clock"></i> {ev.time || "TBD"}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-agenda fade-in">
                  <i className="far fa-calendar-times"></i>
                  <p>No events found for this date.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;