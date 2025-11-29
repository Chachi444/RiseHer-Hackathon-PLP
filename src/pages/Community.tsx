import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Community() {
  const [threads] = useState([
    { id: 1, title: 'Regional meetups — share your city', replies: 12 },
    { id: 2, title: 'Digital safety tips for candidates', replies: 8 },
  ]);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: 20 }}>
      <h1>Community</h1>
      <p style={{ color: '#555' }}>Join conversations with peers, ask questions, and organize regional meetups.</p>

      <div style={{ marginTop: 18 }}>
        <a href="/community/new" target="_blank" rel="noopener noreferrer" style={{ padding: '.6rem .9rem', background: '#5A007A', color: '#fff', borderRadius: 8, textDecoration: 'none' }}>Start a thread</a>
      </div>

      <ul style={{ marginTop: 14, paddingLeft: 18 }}>
        {threads.map(t => (
          <li key={t.id} style={{ marginBottom: 10 }}>
            <a href={`/community/thread/${t.id}`} target="_blank" rel="noopener noreferrer">{t.title}</a> · <span style={{ color: '#666' }}>{t.replies} replies</span>
          </li>
        ))}
      </ul>

      <footer style={{ marginTop: 20 }}>
        <Link to="/dashboard" aria-label="Go back to dashboard">Go back</Link>
      </footer>
    </div>
  );
}
