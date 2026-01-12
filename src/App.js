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
      // 1. ALL HOOKS AT THE TOP (No exceptions)
      const navigate = useNavigate();
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [userRole, setUserRole] = useState('user');
      const [searchQuery, setSearchQuery] = useState("");
      const [showScrollBtn, setShowScrollBtn] = useState(false);
      const [loading, setLoading] = useState(true); 
      
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
      // 2. This triggers on every page change
      window.scrollTo(0, 0);
    }, [pathname]);
      // --- UPDATED: Scroll Reveal Effect (Now includes About Section) ---
      useEffect(() => {
      // Only run this if we aren't loading and we are on the home route
      if (!loading) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
              }
            });
          },
          { threshold: 0.05 } // Lower threshold is safer
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

      // 2. CONDITIONAL RETURN FOR LOADER
      if (loading) {
        return (
          <div className="app-loader">
            <LoadingOverlay message="ESTABLISHING SECURE CONNECTION..." />
            <h2 className="cinzel-font">EVENTLY<span>$</span></h2>
          </div>
        );
      }

      // 3. MAIN RENDER
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
                        <button className="btn btn-primary py-2 px-4" onClick={() => scrollToSection(aboutRef)}>Learn More</button>
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
                      <span >EVENTLY<span className="superscript">$</span></span> is a premier, full-stack event management ecosystem 
                      engineered to bridge the gap between vision and experience. We provide organizers with the sophisticated tools needed 
                      to curate, manage, and scale events, while offering attendees a seamless path to discovery. Whether it’s a high-level 
                      corporate summit or a local community initiative, <span >EVENTLY<span className="superscript">$</span></span> is the infrastructure behind every successful gathering.
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
                    <p className="search-hint">Found 3 premium events for you</p>
                  </div>
                  
                  <div className="events-grid">
                    <div className="event-card">
                      <div className="card-img-wrapper" style={{backgroundImage: "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800')"}}>
                        <div className="time-badge">8:30am - 11:30am</div>
                      </div>
                      <div className="card-body">
                        <h3>Sharing Our Faith & Gospel</h3>
                        <p className="pastor-text">by pastor: <span>Jerry Simon</span></p>
                        <p className="location-text">203 Fake St. Mountain View, San Francisco, California, USA</p>
                        <button className="btn-join" onClick={() => navigate('/event/1')}>Join Us</button>
                      </div>
                    </div>

                    <div className="event-card">
                      <div className="card-img-wrapper" style={{backgroundImage: "url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800')"}}>
                        <div className="time-badge">9:00am - 12:30pm</div>
                      </div>
                      <div className="card-body">
                        <h3>Community Youth Summit</h3>
                        <p className="pastor-text">by leader: <span>Sarah Jenkins</span></p>
                        <p className="location-text">101 Ocean Ave, Santa Monica, California, USA</p>
                      <button className="btn-join" onClick={() => navigate('/event/2')}>Join Us</button>
                      </div>
                    </div>

                    <div className="event-card">
                      <div className="card-img-wrapper" style={{backgroundImage: "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800')"}}>
                        <div className="time-badge">7:00pm - 10:00pm</div>
                      </div>
                      <div className="card-body">
                        <h3>Evening of Reflection</h3>
                        <p className="pastor-text">by pastor: <span>Jerry Simon</span></p>
                        <p className="location-text">203 Fake St. Mountain View, San Francisco, California, USA</p>
                        <button className="btn-join" onClick={() => navigate('/event/3')}>Join Us</button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            } />

            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/checkout" element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />} />
            <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} /> 
            <Route path="/success" element={isLoggedIn ? <Success /> : <Navigate to="/login" />} />
            <Route path="/support" element={<Support />} />
            
            <Route path="/admin" element={
              <AdminRoute isLoggedIn={isLoggedIn} userRole={userRole}>
                <AdminDashboard />
              </AdminRoute>
            } />
            
          </Routes>

          <FloatingUtilities isLoggedIn={isLoggedIn} />
          <Footer />
        </div>
      );
    }

    export default App;