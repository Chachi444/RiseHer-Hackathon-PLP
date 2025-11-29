import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Settings() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [safeMode, setSafeMode] = useState(false);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: 20 }}>
      <h1>Settings</h1>
      <section style={{ marginTop: 12 }}>
        <h2 style={{ margin: 0 }}>Notifications</h2>
        <label style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 10 }}>
          <input type="checkbox" checked={emailNotifs} onChange={() => setEmailNotifs(s => !s)} />
          <span>Receive email notifications</span>
        </label>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2 style={{ margin: 0 }}>Safety & privacy</h2>
        <label style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 10 }}>
          <input type="checkbox" checked={safeMode} onChange={() => setSafeMode(s => !s)} />
          <span>Enable Safe browsing mode</span>
        </label>
        <p style={{ color: '#666', marginTop: 8 }}>Safe mode hides location and profile photo from directory listings.</p>
      </section>

      <div style={{ marginTop: 18 }}>
        <Link to="/dashboard" aria-label="Go back to dashboard">Go back</Link>
      </div>
    </div>
  );
}
