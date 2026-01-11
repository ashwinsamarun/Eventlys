/* src/pages/EventsPage.js */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EventsPage.css';

const EventsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Faith', 'Community', 'Youth', 'Charity'];
  const locations = ['All', 'Main Hall', 'Youth Center', 'Community Park', 'Grand Ballroom'];

  const allEvents = [
    { id: 1, title: "Sharing Our Faith & Gospel", date: "2026-03-15", category: "Faith", location: "Main Hall", price: "$10", img: "https://images.unsplash.com/photo-1504052434467-547071f008f5?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, title: "Community Youth Summit", date: "2026-04-20", category: "Youth", location: "Youth Center", price: "Free", img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, title: "Evening of Reflection", date: "2026-05-10", category: "Faith", location: "Main Hall", price: "$5", img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1000&auto=format&fit=crop" },
    { id: 4, title: "Local Food Drive", date: "2026-06-05", category: "Charity", location: "Community Park", price: "Free", img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop" },
    { id: 5, title: "Leadership Workshop", date: "2026-07-12", category: "Youth", location: "Youth Center", price: "$25", img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop" },
    { id: 6, title: "Summer Charity Gala", date: "2026-08-22", category: "Charity", location: "Grand Ballroom", price: "$50", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop" },
  ];

  const filtered = allEvents.filter(e => {
    const matchesCat = filter === 'All' || e.category === filter;
    const matchesLoc = locationFilter === 'All' || e.location === locationFilter;
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesLoc && matchesSearch;
  });

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 2);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="events-page-container">
      <header className="events-hero animate-up">
        <h1 className="cinzel-font">Explore <span>Catalog</span></h1>
        <div className="master-search-wrapper">
          <input 
            type="text" 
            placeholder="Search by event title..." 
            className="master-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* REFINED CONTROL BAR */}
      <div className="controls-bar animate-up">
        <div className="filter-section">
          <div className="category-group">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`pill-refined ${filter === cat ? 'active' : ''}`}
                onClick={() => { setFilter(cat); setVisibleCount(4); }}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="dropdown-group">
            <select 
              className="location-select-refined"
              value={locationFilter}
              onChange={(e) => { setLocationFilter(e.target.value); setVisibleCount(4); }}
            >
              <option value="All">All Venues</option>
              {locations.filter(l => l !== 'All').map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="events-grid-master">
        {filtered.length > 0 ? (
          filtered.slice(0, visibleCount).map((event, index) => (
            <div className="master-event-card fade-in-scale" key={event.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card-img-wrapper">
                <img src={event.img} alt={event.title} />
                <span className="card-category-tag">{event.category}</span>
              </div>
              <div className="card-content-master">
                <h3>{event.title}</h3>
                <div className="card-info-row">
                  <span>📍 {event.location}</span>
                  <span>📅 {event.date}</span>
                </div>
                <div className="card-footer-master">
                  <span className="card-price-master">{event.price}</span>
                  <button className="btn-details-master" onClick={() => navigate(`/event/${event.id}`)}>Book Now</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results animate-up">
            <h3>No results found</h3>
            <p>Try adjusting your search or filters to find what you're looking for.</p>
            <button className="pill-refined active" onClick={() => {setFilter('All'); setLocationFilter('All'); setSearchTerm('');}}>Clear All</button>
          </div>
        )}
      </div>

      {visibleCount < filtered.length && !isLoading && (
        <div className="load-more-container animate-up">
          <button className="btn-load-more" onClick={handleLoadMore}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsPage;