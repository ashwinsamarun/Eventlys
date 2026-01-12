/* src/pages/Settings.js */
import React, { useState } from 'react';
import '../styles/Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({
    name: 'Ashwin Sam Arun',
    email: 'Ashwin.simon@example.com',
    bio: 'Community organizer passionate about connecting people through events.',
    notifications: true
  });

  // --- NEW: Toast State ---
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Replaced alert with professional toast
    showToast("Settings updated successfully!");
  };

  const handleDeleteAccount = () => {
    // Logic for actual deletion would go here
    showToast("Account deletion initialized.", "danger");
    setShowConfirmDelete(false);
  };

  return (
    <div className="settings-container animate-up">
      {/* --- PREMIUM TOAST NOTIFICATION --- */}
      {toast.show && (
        <div className={`settings-toast ${toast.type} animate-slide-in`}>
          <span className="toast-dot"></span>
          {toast.message}
        </div>
      )}

      <header className="settings-header">
        <h1 className="cinzel-font">Account <span>Settings</span></h1>
        <p>Manage your profile and platform preferences</p>
      </header>

      <div className="settings-layout">
        <aside className="settings-sidebar">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} 
            onClick={() => setActiveTab('profile')}
          >
            <i className="far fa-user"></i> Public Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`} 
            onClick={() => setActiveTab('security')}
          >
            <i className="fas fa-shield-alt"></i> Security
          </button>
          <button 
            className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`} 
            onClick={() => setActiveTab('notifications')}
          >
            <i className="far fa-bell"></i> Notifications
          </button>
        </aside>

        <main className="settings-content glass-panel">
          {activeTab === 'profile' && (
            <div className="tab-pane fade-in">
              <h3 className="cinzel-font">Profile <span>Details</span></h3>
              <form onSubmit={handleUpdate}>
                <div className="profile-upload">
                  <div className="avatar-placeholder">AS</div>
                  <div className="upload-controls">
                    <button type="button" className="btn-avatar-gold">Change Photo</button>
                    <p className="upload-hint">JPG or PNG. Max 1MB.</p>
                  </div>
                </div>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea rows="4" value={user.bio} onChange={(e) => setUser({...user, bio: e.target.value})} />
                </div>
                <button type="submit" className="btn-auth-main">Save Changes</button>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="tab-pane fade-in">
              <h3 className="cinzel-font">Security <span>Settings</span></h3>
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>
                <button type="submit" className="btn-auth-main">Update Password</button>
              </form>

              <div className="danger-zone">
                <h4 className="danger-title">Danger Zone</h4>
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                
                {showConfirmDelete ? (
                  <div className="confirm-actions animate-pulse">
                    <button className="btn-delete-confirm" onClick={handleDeleteAccount}>Confirm Permanent Delete</button>
                    <button className="btn-text-cancel" onClick={() => setShowConfirmDelete(false)}>Cancel</button>
                  </div>
                ) : (
                  <button className="btn-delete-account" onClick={() => setShowConfirmDelete(true)}>
                    Delete Account
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="tab-pane fade-in">
              <h3 className="cinzel-font">Email <span>Preferences</span></h3>
              <div className="pref-row">
                <div>
                  <h4>Event Reminders</h4>
                  <p>Get notified about upcoming events you've joined.</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="pref-row">
                <div>
                  <h4>Newsletter</h4>
                  <p>Receive weekly updates on new premium events.</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;