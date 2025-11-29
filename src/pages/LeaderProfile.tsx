import React from 'react';
import { Link, useParams } from 'react-router-dom';

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
    photo: '/assets/one.jpg',
    bio: 'Amina Sow serves her city with a focus on inclusive policy, civic engagement, and youth leadership programs.',
    expertise: ['Public Policy', 'Community Engagement', 'Youth Leadership'],
    contact: { email: 'amina@example.org' },
  },
  {
    id: 2,
    name: 'Beatrice N.',
    role: 'Community Organizer',
    region: 'Nairobi',
    photo: '/assets/one.jpg',
    bio: 'Beatrice organizes community-led initiatives that increase participation and safety for women in public roles.',
    expertise: ['Organizing', 'Safety Protocols'],
    contact: { email: 'beatrice@example.org' },
  },
  {
    id: 3,
    name: 'Chloe M.',
    role: 'Policy Lead',
    region: 'Accra',
    photo: '/assets/one.jpg',
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
      <div style={{ maxWidth: 900, margin: '2rem auto', padding: 20 }}>
        <h1>Profile not found</h1>
        <p>The leader profile you requested could not be found.</p>
        <Link to="/visibility">Back to directory</Link>
      </div>
    );
  }

  return (
    <main style={{ maxWidth: 1100, margin: '2rem auto', padding: 20 }} role="main" aria-labelledby="leader-name">
      <header style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <img
          src={leader.photo}
          alt={`${leader.name} photo`}
          style={{ width: 160, height: 160, objectFit: 'cover', borderRadius: 12, boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}
        />
        <div style={{ flex: 1, minWidth: 260 }}>
          <h1 id="leader-name" style={{ margin: 0, color: 'var(--color-deep-purple, #5A007A)' }}>{leader.name}</h1>
          <div style={{ marginTop: 6, color: '#666' }}>
            <strong>{leader.role}</strong> • {leader.region}
          </div>

          <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {(leader.expertise || []).slice(0, 4).map((e) => (
              <span key={e} style={{ background: '#F6F0FF', color: '#5A007A', padding: '6px 10px', borderRadius: 999, fontWeight: 700, fontSize: '.9rem' }}>
                {e}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 14, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <a
              href={`/contact?name=${encodeURIComponent(leader.name)}&email=${encodeURIComponent(leader.contact?.email || '')}`}
              style={{ padding: '.55rem .85rem', borderRadius: 8, border: '1px solid rgba(0,0,0,0.08)', textDecoration: 'none' }}
              aria-label={`Contact ${leader.name}`}
            >
              Contact
            </a>
            <Link to="/visibility" style={{ padding: '.55rem .85rem', borderRadius: 8, border: '1px solid rgba(0,0,0,0.08)', textDecoration: 'none' }} aria-label="Back to directory">
              Go back
            </Link>
          </div>
        </div>
      </header>

      <section aria-labelledby="about" style={{ marginTop: 20 }}>
        <div style={{ background: '#fff', padding: 18, borderRadius: 12, boxShadow: '0 10px 30px rgba(16,24,40,0.06)' }}>
          <h2 id="about" style={{ marginTop: 0 }}>About</h2>
          <p style={{ color: '#333' }}>{leader.bio}</p>
        </div>
      </section>

      <section aria-labelledby="experience" style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 300px', gap: 12 }}>
        <div>
          <div style={{ background: '#fff', padding: 18, borderRadius: 12, boxShadow: '0 10px 30px rgba(16,24,40,0.06)' }}>
            <h3 id="experience" style={{ marginTop: 0 }}>Experience & roles</h3>
            <p style={{ color: '#444' }}>Summary of roles and contributions are available on request. This prototype shows a concise professional summary to help organizations and mentees evaluate fit.</p>
          </div>
        </div>

        <aside>
          <div style={{ background: '#fff', padding: 12, borderRadius: 12, boxShadow: '0 10px 30px rgba(16,24,40,0.06)' }}>
            <strong style={{ display: 'block', marginBottom: 8 }}>Quick info</strong>
            <div style={{ color: '#444' }}>
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
