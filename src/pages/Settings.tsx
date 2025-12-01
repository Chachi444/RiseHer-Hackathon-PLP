import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/settings.css';

export default function Settings() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [safeMode, setSafeMode] = useState(false);

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <section className="settings-section">
        <h2>Notifications</h2>
        <label className="form-row">
          <input type="checkbox" checked={emailNotifs} onChange={() => setEmailNotifs(s => !s)} />
          <span>Receive email notifications</span>
        </label>
      </section>

      <section className="settings-section">
        <h2>Safety & privacy</h2>
        <label className="form-row">
          <input type="checkbox" checked={safeMode} onChange={() => setSafeMode(s => !s)} />
          <span>Enable Safe browsing mode</span>
        </label>
        <p className="muted">Safe mode hides location and profile photo from directory listings.</p>
      </section>

      <div className="settings-footer">
        <Link to="/dashboard">Go back</Link>
      </div>
    </div>
  );
}
