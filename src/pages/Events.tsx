import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/events.css'; // added

export default function Events() {
  const events = [
    { id: 1, date: 'Jul 15', title: 'Public Speaking for Leaders', time: '10:00 GMT' },
    { id: 2, date: 'Aug 02', title: 'Regional Meetup — City Hall Forum', time: '14:00 GMT' },
  ];

  return (
    <div className="events-page">
      <h1>Events</h1>
      <p className="muted">Upcoming events, workshops and regional meetups. Click an event to RSVP or see details.</p>

      <div className="events-list">
        {events.map(ev => (
          <article key={ev.id} className="event-card">
            <div>
              <div className="event-title">{ev.title}</div>
              <div className="muted">{ev.date} · {ev.time}</div>
            </div>
            <div className="event-actions">
              <a href={`/events/${ev.id}`} target="_blank" rel="noopener noreferrer" className="btn-primary">RSVP</a>
              <Link to="/dashboard">Go back</Link>
            </div>
          </article>
        ))}
      </div>

      <footer className="page-footer">
        <Link to="/dashboard">Go back</Link>
      </footer>
    </div>
  );
}
