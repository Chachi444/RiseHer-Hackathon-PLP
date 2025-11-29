import React from 'react';
import { Link, useParams } from 'react-router-dom';

type Mentor = {
  id: number;
  name: string;
  title: string;
  location: string;
  photo?: string;
  bio?: string;
  expertise?: string[];
  experience?: string[];
  credentials?: string[];
  publications?: { title: string; link?: string }[];
  testimonials?: { from: string; quote: string }[];
  contact?: { email?: string; website?: string };
  cv?: string;
};

const mentors: Mentor[] = [
  {
    id: 1,
    name: 'Lara Mensah',
    title: 'City Councilor • Civic Tech',
    location: 'Accra',
    photo: '/assets/one.jpg',
    bio:
      'Lara Mensah is a civic-technology and public-policy leader with 12+ years of experience designing inclusive civic services, participatory budgeting programs, and civic data initiatives. She advises local governments and trains community leaders.',
    expertise: ['Civic Tech', 'Participatory Budgeting', 'Public Policy', 'Community Engagement'],
    experience: [
      'City Councilor — Accra (2018–present)',
      'Director, Civic Tech Lab (2015–2018)',
      'Program Lead, Open Data Initiative (2012–2015)',
    ],
    credentials: ['MSc Public Policy', 'Fellow, Civic Leaders Program'],
    publications: [
      { title: 'Inclusive Cities: Civic Tech for Local Government', link: undefined },
      { title: 'Participatory Budgeting — A Practical Guide', link: undefined },
    ],
    testimonials: [
      { from: 'Mayor E. Kwame', quote: 'Lara’s initiatives transformed civic engagement in our city.' },
    ],
    contact: { email: 'lara@example.org', website: 'https://example.org/lara' },
    cv: '/assets/lara-cv.pdf',
  },
  {
    id: 2,
    name: 'Aisha Gomez',
    title: 'Community Organizer • Public Policy',
    location: 'Nairobi',
    photo: '/assets/one.jpg',
    bio:
      'Aisha leads grassroots mobilization and training programs focused on women’s civic participation, safe campaigning, and leadership development.',
    expertise: ['Organizing', 'Leadership Training', 'Safe Campaigning'],
    experience: ['Community Organizer (2014–present)', 'Trainer, WomenLead (2017–2020)'],
    credentials: ['MA Community Development'],
    publications: [],
    testimonials: [{ from: 'Program Director', quote: 'Aisha builds powerful community networks and trains durable leaders.' }],
    contact: { email: 'aisha@example.org' },
    cv: '/assets/aisha-cv.pdf',
  },
  {
    id: 3,
    name: 'Nora Okoye',
    title: 'Campaign Strategist',
    location: 'Lagos',
    photo: '/assets/one.jpg',
    bio:
      'Nora is a campaign strategist with deep experience in outreach design, evidence-driven messaging and digital safety protocols for civic initiatives.',
    expertise: ['Campaign Strategy', 'Digital Safety', 'Stakeholder Engagement'],
    experience: ['Lead Strategist, CampaignWorks (2016–present)'],
    credentials: ['Certificate, Digital Security for Campaigns'],
    testimonials: [{ from: 'Campaign Lead', quote: 'Nora’s strategies consistently deliver strong voter engagement.' }],
    contact: { email: 'nora@example.org' },
    cv: '/assets/nora-cv.pdf',
  },
];

export default function MentorProfile() {
  const { id } = useParams<{ id: string }>();
  const mentor = mentors.find((m) => String(m.id) === String(id));

  if (!mentor) {
    return (
      <div style={{ maxWidth: 900, margin: '2rem auto', padding: 20 }}>
        <h1>Mentor not found</h1>
        <p>The mentor you requested could not be found.</p>
        <Link to="/mentorship">Back to mentors</Link>
      </div>
    );
  }

  const container: React.CSSProperties = { maxWidth: 1100, margin: '2rem auto', padding: 20 };
  const headerStyle: React.CSSProperties = { display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' };
  const photoStyle: React.CSSProperties = { width: 180, height: 180, objectFit: 'cover', borderRadius: 12, boxShadow: '0 12px 30px rgba(0,0,0,0.12)' };
  const nameStyle: React.CSSProperties = { margin: 0, fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', color: 'var(--color-deep-purple, #5A007A)' };
  const metaStyle: React.CSSProperties = { marginTop: 6, color: '#666' };
  const section: React.CSSProperties = { marginTop: 18, background: '#fff', padding: 18, borderRadius: 12, boxShadow: '0 10px 30px rgba(16,24,40,0.06)' };
  const badge: React.CSSProperties = { background: '#F6F0FF', color: '#5A007A', padding: '6px 10px', borderRadius: 999, fontWeight: 700, fontSize: '.9rem' };
  const actionPrimary: React.CSSProperties = { padding: '.6rem .9rem', background: '#FFD700', color: '#5A007A', borderRadius: 8, textDecoration: 'none', fontWeight: 700, display: 'inline-block' };
  const actionSecondary: React.CSSProperties = { padding: '.55rem .85rem', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, textDecoration: 'none', display: 'inline-block' };

  return (
    <main style={container} role="main" aria-labelledby="mentor-name">
      <div style={headerStyle}>
        <img src={mentor.photo} alt={`${mentor.name} photo`} style={photoStyle} />
        <div style={{ flex: 1, minWidth: 260 }}>
          <h1 id="mentor-name" style={nameStyle}>
            {mentor.name}
          </h1>
          <div style={metaStyle}>
            <strong>{mentor.title}</strong> • {mentor.location}
          </div>

          <div style={{ marginTop: 12, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {mentor.expertise?.slice(0, 4).map((e) => (
              <span key={e} style={badge}>
                {e}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 14, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <a
              href={`/mentorship/request?mentorId=${mentor.id}`}
              style={actionPrimary}
              aria-label={`Request an introduction to ${mentor.name}`}
            >
              Request an introduction
            </a>

            {/* Opens contact page (pre-filled) instead of mailto */}
            <a
              href={`/contact?name=${encodeURIComponent(mentor.name)}&email=${encodeURIComponent(mentor.contact?.email || '')}`}
              style={actionSecondary}
              aria-label={`Contact ${mentor.name}`}
            >
              Contact
            </a>

            {mentor.cv && (
              <a href={mentor.cv} target="_blank" rel="noopener noreferrer" style={actionSecondary} aria-label="Download CV">
                Download CV
              </a>
            )}

            <button
              onClick={() => window.print()}
              style={{ ...actionSecondary, background: 'transparent', cursor: 'pointer' }}
              aria-label="Print profile"
            >
              Print
            </button>
          </div>
        </div>

        <div style={{ minWidth: 220 }}>
          <div style={{ borderRadius: 12, padding: 12, background: '#fff', boxShadow: '0 8px 20px rgba(0,0,0,0.04)' }}>
            <strong style={{ display: 'block', marginBottom: 8 }}>Quick info</strong>
            <div style={{ color: '#444', marginBottom: 8 }}>
              <div><strong>Location:</strong> {mentor.location}</div>
              <div><strong>Availability:</strong> By request</div>
              <div><strong>Expertise:</strong> {mentor.expertise?.slice(0, 3).join(', ')}</div>
            </div>

            <div style={{ marginTop: 8 }}>
              <a href={`/mentorship/request?mentorId=${mentor.id}`} style={actionPrimary} aria-label="Request intro (open) on quick info">
                Request intro
              </a>
            </div>
          </div>
        </div>
      </div>

      <section aria-labelledby="about" style={{ marginTop: 18 }}>
        <div style={section}>
          <h2 id="about" style={{ marginTop: 0 }}>About</h2>
          <p style={{ color: '#333' }}>{mentor.bio}</p>
        </div>
      </section>

      <section aria-labelledby="experience" style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 380px', gap: 12 }}>
        <div>
          <div style={section}>
            <h3 id="experience" style={{ marginTop: 0 }}>Selected experience</h3>
            <ul>
              {mentor.experience?.map((ex, i) => (
                <li key={i} style={{ marginBottom: 8 }}>{ex}</li>
              ))}
            </ul>
          </div>

          <div style={{ ...section, marginTop: 12 }}>
            <h3 style={{ marginTop: 0 }}>Publications & resources</h3>
            {mentor.publications && mentor.publications.length ? (
              <ul>
                {mentor.publications.map((p, i) => (
                  <li key={i} style={{ marginBottom: 8 }}>
                    {p.link ? <a href={p.link} target="_blank" rel="noopener noreferrer">{p.title}</a> : p.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#666' }}>No publications listed.</p>
            )}
          </div>
        </div>

        <aside>
          <div style={section}>
            <h4 style={{ marginTop: 0 }}>Credentials</h4>
            <div style={{ color: '#444' }}>{mentor.credentials?.join(' · ')}</div>
          </div>

          <div style={{ ...section, marginTop: 12 }}>
            <h4 style={{ marginTop: 0 }}>Testimonials</h4>
            {mentor.testimonials?.map((t, i) => (
              <blockquote key={i} style={{ margin: '8px 0', color: '#333' }}>
                “{t.quote}”
                <div style={{ marginTop: 6, fontSize: '.95rem', color: '#666' }}>— {t.from}</div>
              </blockquote>
            ))}
          </div>
        </aside>
      </section>

      <div style={{ marginTop: 18 }}>
        <Link to="/mentorship" aria-label="Back to mentors">Back to mentors</Link>
      </div>
    </main>
  );
}
