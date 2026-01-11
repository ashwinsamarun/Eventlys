/* src/pages/Support.js */
import React, { useState } from 'react';

const Support = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "How do I get my ticket?", a: "Once you join an event, your digital ticket is available in your Dashboard under 'My Schedule'." },
    { q: "Can I get a refund?", a: "Refunds depend on the organizer's policy. Please contact support 48 hours before the event." },
    { q: "How do I create an event?", a: "Only authorized Admin accounts can create events via the Admin Console." }
  ];

  return (
    <div className="support-container animate-up">
      <header className="support-hero">
        <h1 className="cinzel-font">How can we <span>help?</span></h1>
        <p>Find answers to common questions or reach out to our team.</p>
      </header>

      <div className="support-grid">
        {/* FAQ Section */}
        <div className="faq-section">
          <h2 className="cinzel-font">Common <span>Questions</span></h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${activeFaq === i ? 'open' : ''}`} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <div className="faq-question">
                  {faq.q} <i className="fas fa-chevron-down"></i>
                </div>
                {activeFaq === i && <div className="faq-answer fade-in">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-card glass-panel">
          <h2 className="cinzel-font">Send a <span>Message</span></h2>
          <form onSubmit={(e) => { e.preventDefault(); alert("Message Sent!"); }}>
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="How can we help you today?" rows="5" required></textarea>
            <button type="submit" className="btn-auth-main">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;