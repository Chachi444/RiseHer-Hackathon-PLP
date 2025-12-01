import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/community.css'; // added

export default function Community() {
  const [threads] = useState([
    { id: 1, title: 'Regional meetups — share your city', replies: 12 },
    { id: 2, title: 'Digital safety tips for candidates', replies: 8 },
  ]);

  return (
    <div className="community-page">
      <h1>Community</h1>
      <p className="muted">Join conversations with peers, ask questions, and organize regional meetups.</p>

      <div className="community-actions">
        <a href="/community/new" target="_blank" rel="noopener noreferrer" className="btn-primary">Start a thread</a>
      </div>

      <ul className="threads-list">
        {threads.map(t => (
          <li key={t.id} className="thread-item">
            <a href={`/community/thread/${t.id}`} target="_blank" rel="noopener noreferrer">{t.title}</a> · <span className="muted small">{t.replies} replies</span>
          </li>
        ))}
      </ul>

      <footer className="page-footer">
        <Link to="/dashboard">Go back</Link>
      </footer>
    </div>
  );
}
