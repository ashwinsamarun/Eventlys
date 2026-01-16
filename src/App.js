/* src/App.js */
import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

// Import Pages
import Navbar from './pages/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EventsPage from './pages/EventsPage';
import AdminDashboard from './pages/AdminDashboard';
import Settings from './pages/Settings';
import Support from './pages/Support';
import Footer from './components/Footer';
import FloatingUtilities from './components/FloatingUtilities';
import EventDetails from './pages/EventDetails'; 
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import LoadingOverlay from './components/LoadingOverlay';
import RegisterEvent from './pages/RegisterEvent'; 
import EventCalendar from './pages/EventCalendar';

// Import Styles
import './styles/App.css';
import './styles/Navbar.css';
import './styles/Landing.css';
import './styles/LoadingOverlay.css';

// --- Admin Protection Wrapper ---
const AdminRoute = ({ isLoggedIn, userRole, children }) => {
  if (!isLoggedIn || userRole !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  // 1. ALL HOOKS AT THE TOP
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [loading, setLoading] = useState(true); 

  // --- NEW: Event State for Front-end Logic ---
  const [events, setEvents] = useState([
    { id: 1, title: "Sharing Our Faith & Gospel", organizer: "Jerry Simon", status: "approved", category: "Faith", date: "2026-03-15", price: "$25.00" },
    { id: 2, title: "Community Youth Summit", organizer: "Sarah Jenkins", status: "approved", category: "Community", date: "2026-04-20", price: "Free" },
    { id: 3, title: "Evening of Reflection", organizer: "Jerry Simon", status: "approved", category: "Faith", date: "2026-05-10", price: "$15.00" }
  ]);

  const addNewEvent = (newEvent) => {
    // Generate unique ID and default to pending
    setEvents([...events, { ...newEvent, id: Date.now(), status: 'pending' }]);
  };

  const handleUpdateStatus = (eventId, newStatus) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId ? { ...event, status: newStatus } : event
      )
    );
  };

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const eventsRef = useRef(null);

  // Effect for Scroll Button & App Loading
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) setShowScrollBtn(true);
      else setShowScrollBtn(false);
    };
    const timer = setTimeout(() => setLoading(false), 1500);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
            }
          });
        },
        { threshold: 0.05 }
      );

      if (eventsRef.current) {
        const grid = eventsRef.current.querySelector('.events-grid');
        if (grid) observer.observe(grid);
      }
      if (aboutRef.current) {
        const aboutContent = aboutRef.current.querySelector('.about-container');
        if (aboutContent) observer.observe(aboutContent);
      }
      return () => observer.disconnect();
    }
  }, [loading, isLoggedIn]);

  const scrollToSection = (elementRef) => {
    if (elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return (
      <div className="app-loader">
        <LoadingOverlay message="ESTABLISHING SECURE CONNECTION..." />
        <h2 className="cinzel-font">EVENTLY<span>$</span></h2>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}
        userRole={userRole} 
        scrollToHome={() => scrollToSection(homeRef)}
        scrollToAbout={() => scrollToSection(aboutRef)}
        scrollToEvents={() => scrollToSection(eventsRef)}
      />

      <Routes>
        <Route path="/" element={
          <div className="landing-page">
            <header className="hero-section" ref={homeRef}>
              <div className="hero-overlay">
                <div className="hero-content">
                  <h1 className="main-title">
                  <span className="word"> EVENTLY<span className="superscript">$</span></span>
                  </h1>
                <h1 className="hero-title cinzel-font">Elevate Your <span>Experience</span></h1>
                  <p className="hero-subtitle"> Discover and secure your place at the world’s most impactful gatherings.</p>
                  <div className="hero-btns">
                    <button className="btn btn-primary py-2 px-4" onClick={() => scrollToSection(eventsRef)}>Explore Events</button>
                    
                    {isLoggedIn && (
                      <button className="btn btn-primary py-2 px-4" onClick={() => navigate('/register-event')}>
                        Register Event
                      </button>
                    )}
                    
                    {!isLoggedIn && (
                      <button className="btn btn-primary py-2 px-4" onClick={() => scrollToSection(aboutRef)}>Learn More</button>
                    )}
                  </div>
                </div>
              </div>
            </header>

            <div className={`scroll-to-top ${showScrollBtn ? 'visible' : ''}`} onClick={() => scrollToSection(homeRef)}>
              <span className="arrow-up">↑</span>
            </div>

            <section className="stats-bar">
              <div className="stat-item"><h3>98,087</h3><p>MEMBERS</p></div>
              <div className="stat-item"><h3>309</h3><p>ORGANIZERS</p></div>
              <div className="stat-item"><h3>9,350,500</h3><p>BOOKINGS</p></div>
              <div className="stat-item"><h3>206</h3><p>CITIES</p></div>
            </section>

            <section className="about-section" ref={aboutRef}>
              <p className="section-tag">WHO WE ARE</p>
              <h2 className="section-title">About Evently<span className="superscript">$</span></h2>
              <div className="about-container">
                <p>
                  <span>EVENTLY<span className="superscript">$</span></span> is a premier, full-stack event management ecosystem 
                  engineered to bridge the gap between vision and experience.
                </p>
              </div>
            </section>

            <section className="events-grid-section" ref={eventsRef}>
              <p className="section-tag">EVENTS</p>
              <h2 className="section-title">Upcoming Events</h2>
              
              <div className="search-container animate-up">
                <div className="search-wrapper">
                  <i className="fas fa-search search-icon"></i>
                  <input
                    type="text"
                    className="event-search-input"
                    placeholder="Search for events, pastors, or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="search-line"></div>
                </div>
                <p className="search-hint">
                  Found {events.filter(e => e.status === 'approved').length} premium events for you
                </p>
              </div>
              
              <div className="events-grid">
                {events
                  .filter(event => 
                    event.status === 'approved' && 
                    (event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    event.organizer.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map((event, index) => (
                    <div 
                      className="event-card fade-in-scale" 
                      key={event.id}
                      style={{ animationDelay: `${index * 0.1}s` }} 
                    >
                      <div 
                        className="card-img-wrapper" 
                        style={{ 
                          backgroundImage: `url(${event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800'})` 
                        }}
                      >
                        <div className="time-badge">{event.time || "TBD"}</div>
                      </div>
                      <div className="card-body">
                        <span className="event-category-tag">{event.category}</span>
                        <h3>{event.title}</h3>
                        <p className="pastor-text">by: <span>{event.organizer}</span></p>
                        <p className="location-text">{event.location || "Location provided upon booking"}</p>
                        <div className="card-footer">
                          <span className="event-price">{event.price || "Free"}</span>
                          <button className="btn-join" onClick={() => navigate(`/event/${event.id}`)}>
                            Join Us
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        } />

        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
        <Route path="/register" element={<Register />} />
        
        {/* UPDATED DASHBOARD ROUTE */}
        <Route path="/dashboard" element={
          isLoggedIn ? (
            <Dashboard events={events} onUpdateStatus={handleUpdateStatus} />
          ) : (
            <Navigate to="/login" />
          )
        } />
        
        <Route path="/register-event" element={isLoggedIn ? <RegisterEvent onAdd={addNewEvent} /> : <Navigate to="/login" />} />
        
        <Route path="/events" element={<EventsPage />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/checkout" element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} /> 
        <Route path="/success" element={isLoggedIn ? <Success /> : <Navigate to="/login" />} />
        <Route path="/support" element={<Support />} />
        <Route path="/calendar" element={<EventCalendar events={events} />} />
        
        <Route path="/admin" element={
          <AdminRoute isLoggedIn={isLoggedIn} userRole={userRole}>
            <AdminDashboard 
              events={events} 
              onUpdateStatus={handleUpdateStatus} 
            />
          </AdminRoute>
        } />
      </Routes>

      <FloatingUtilities isLoggedIn={isLoggedIn} />
      <Footer />
    </div>
  );
}

export default App;