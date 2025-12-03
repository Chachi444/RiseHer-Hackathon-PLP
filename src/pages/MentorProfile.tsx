import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/mentor-profile.css';

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
    cv: '/assets/placeholder.pdf',
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
    cv: '/assets/placeholder.pdf',
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
    cv: '/assets/placeholder.pdf',
  },
];

export default function MentorProfile() {
  const { id } = useParams<{ id: string }>();
  const mentor = mentors.find((m) => String(m.id) === String(id));

  if (!mentor) {
    return (
      <div className="mpage-notfound">
        <h1>Mentor not found</h1>
        <p>The mentor you requested could not be found.</p>
        <Link to="/mentorship">Back to mentors</Link>
      </div>
    );
  }

  return (
    <main className="mentor-container" role="main" aria-labelledby="mentor-name">
      <div className="mp-header">
        <img src={mentor.photo} alt={`${mentor.name} photo`} className="mp-photo" />
        <div className="mp-meta">
          <h1 id="mentor-name" className="mp-name">
            {mentor.name}
          </h1>
          <div className="mp-sub">
            <strong>{mentor.title}</strong> • {mentor.location}
          </div>

          <div className="mp-badges">
            {mentor.expertise?.slice(0, 4).map((e) => (
              <span key={e} className="badge">
                {e}
              </span>
            ))}
          </div>

          <div className="mp-actions">
            <a
              href={`/mentorship/request?mentorId=${mentor.id}`}
              className="btn-primary"
              aria-label={`Request an introduction to ${mentor.name}`}
            >
              Request an introduction
            </a>
            <a
              href={`/contact?name=${encodeURIComponent(mentor.name)}&email=${encodeURIComponent(mentor.contact?.email || '')}`}
              className="btn-secondary"
              aria-label={`Contact ${mentor.name}`}
            >
              Contact
            </a>
            {mentor.cv && (
              <a
                href={mentor.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                aria-label="Download CV"
              >
                Download CV
              </a>
            )}
            <button
              onClick={() => window.print()}
              className="btn-secondary"
              aria-label="Print profile"
            >
              Print
            </button>
          </div>
        </div>

        <aside className="mp-quick">
          <div className="mp-quick-card">
            <strong>Quick info</strong>
            <div className="muted">
              <div><strong>Location:</strong> {mentor.location}</div>
              <div><strong>Availability:</strong> By request</div>
              <div><strong>Expertise:</strong> {mentor.expertise?.slice(0, 3).join(', ')}</div>
            </div>
            <div className="mp-quick-actions">
              <a
                href={`/mentorship/request?mentorId=${mentor.id}`}
                className="btn-primary"
                aria-label="Request intro (open) on quick info"
              >
                Request intro
              </a>
            </div>
          </div>
        </aside>
      </div>

      <section aria-labelledby="about" className="mp-section">
        <div className="mp-content">
          <h2 id="about" className="mp-title">About</h2>
          <p className="mp-bio">{mentor.bio}</p>
        </div>
      </section>

      <section aria-labelledby="experience" className="mp-section mp-experience">
        <div className="mp-content">
          <h3 id="experience" className="mp-title">Selected experience</h3>
          <ul className="mp-experience-list">
            {mentor.experience?.map((ex, i) => (
              <li key={i} className="mp-experience-item">{ex}</li>
            ))}
          </ul>
        </div>

        <aside className="mp-aside">
          <div className="mp-card">
            <h4 className="mp-subtitle">Credentials</h4>
            <div className="mp-credentials">{mentor.credentials?.join(' · ')}</div>
          </div>

          <div className="mp-card mp-testimonials">
            <h4 className="mp-subtitle">Testimonials</h4>
            {mentor.testimonials?.map((t, i) => (
              <blockquote key={i} className="mp-testimonial">
                “{t.quote}”
                <div className="mp-testimonial-author">— {t.from}</div>
              </blockquote>
            ))}
          </div>
        </aside>
      </section>

      <div className="mp-footer">
        <Link to="/mentorship" className="mp-back" aria-label="Back to mentors">Back to mentors</Link>
      </div>
    </main>
  );
}
