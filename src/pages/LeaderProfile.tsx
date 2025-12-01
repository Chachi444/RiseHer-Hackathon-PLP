import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/leader-profile.css';

type Leader = {
  id: number;
  name: string;
  role: string;
  region: string;
  photo?: string;
  bio?: string;
  expertise?: string[];
  contact?: { email?: string; website?: string };
};

const leaders: Leader[] = [
  {
    id: 1,
    name: 'Amina Sow',
    role: 'Councilwoman',
    region: 'Kigali',
    photo: '/assets/placeholder.svg',
    bio: 'Amina Sow serves her city with a focus on inclusive policy, civic engagement, and youth leadership programs.',
    expertise: ['Public Policy', 'Community Engagement', 'Youth Leadership'],
    contact: { email: 'amina@example.org' },
  },
  {
    id: 2,
    name: 'Beatrice N.',
    role: 'Community Organizer',
    region: 'Nairobi',
    photo: '/assets/placeholder.svg',
    bio: 'Beatrice organizes community-led initiatives that increase participation and safety for women in public roles.',
    expertise: ['Organizing', 'Safety Protocols'],
    contact: { email: 'beatrice@example.org' },
  },
  {
    id: 3,
    name: 'Chloe M.',
    role: 'Policy Lead',
    region: 'Accra',
    photo: '/assets/placeholder.svg',
    bio: 'Chloe leads policy research and program delivery for civic tech and governance projects.',
    expertise: ['Policy Research', 'Program Management'],
    contact: { email: 'chloe@example.org' },
  },
];

// helper to create slug used in directory links (e.g. "amina-sow")
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export default function LeaderProfile() {
  const { slug } = useParams<{ slug: string }>();
  const leader = leaders.find((l) => slugify(l.name) === slug);

  if (!leader) {
    return (
      <div className="lp-notfound">
        <h1>Profile not found</h1>
        <p>The leader profile you requested could not be found.</p>
        <Link to="/visibility">Back to directory</Link>
      </div>
    );
  }

  return (
    <main className="lp-main" role="main" aria-labelledby="leader-name">
      <header className="lp-header">
        <img src={leader.photo} alt={`${leader.name} photo`} className="lp-photo" />
        <div className="lp-meta">
          <h1 id="leader-name" className="lp-name">{leader.name}</h1>
          <div className="lp-sub"><strong>{leader.role}</strong> • {leader.region}</div>

          <div className="lp-badges">
            {(leader.expertise || []).slice(0,4).map(e => <span key={e} className="badge">{e}</span>)}
          </div>

          <div className="lp-actions">
            <a href={`/contact?name=${encodeURIComponent(leader.name)}&email=${encodeURIComponent(leader.contact?.email||'')}`} className="btn-secondary">Contact</a>
            <Link to="/visibility" className="btn-secondary">Go back</Link>
          </div>
        </div>
      </header>

      <section aria-labelledby="about" className="lp-section">
        <div className="lp-card">
          <h2 id="about" className="lp-section-title">About</h2>
          <p className="lp-bio">{leader.bio}</p>
        </div>
      </section>

      <section aria-labelledby="experience" className="lp-section lp-experience-section">
        <div className="lp-experience">
          <div className="lp-card">
            <h3 id="experience" className="lp-section-title">Experience & roles</h3>
            <p className="lp-experience-summary">Summary of roles and contributions are available on request. This prototype shows a concise professional summary to help organizations and mentees evaluate fit.</p>
          </div>
        </div>

        <aside className="lp-aside">
          <div className="lp-card lp-quick-info">
            <strong className="lp-quick-info-title">Quick info</strong>
            <div className="lp-quick-info-details">
              <div><strong>Region:</strong> {leader.region}</div>
              <div><strong>Role:</strong> {leader.role}</div>
              <div><strong>Expertise:</strong> {(leader.expertise || []).join(', ') || '—'}</div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
