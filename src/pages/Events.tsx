import React from 'react';
import { Link } from 'react-router-dom';

export default function Events() {
  const events = [
    { id: 1, date: 'Jul 15', title: 'Public Speaking for Leaders', time: '10:00 GMT' },
    { id: 2, date: 'Aug 02', title: 'Regional Meetup — City Hall Forum', time: '14:00 GMT' },
  ];

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto', padding: 20 }}>
      <h1>Events</h1>
      <p style={{ color: '#555' }}>Upcoming events, workshops and regional meetups. Click an event to RSVP or see details.</p>

      <div style={{ marginTop: 18, display: 'grid', gap: 12 }}>
        {events.map(ev => (
          <article key={ev.id} style={{ background: '#fff', padding: 12, borderRadius: 10, boxShadow: '0 8px 20px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 800 }}>{ev.title}</div>
              <div style={{ color: '#666' }}>{ev.date} · {ev.time}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href={`/events/${ev.id}`} target="_blank" rel="noopener noreferrer" style={{ padding: '.5rem .8rem', borderRadius: 8, background: '#FFD700', color: '#5A007A', fontWeight: 700, textDecoration: 'none' }}>RSVP</a>
              <Link to="/dashboard" aria-label="Go back to dashboard" style={{ alignSelf: 'center' }}>Go back</Link>
            </div>
          </article>
        ))}
      </div>

      <footer style={{ marginTop: 18 }}>
        <Link to="/dashboard" aria-label="Go back to dashboard">Go back</Link>
      </footer>
    </div>
  );
}
