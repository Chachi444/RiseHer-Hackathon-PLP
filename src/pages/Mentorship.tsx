import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/mentorship.css';

export default function Mentorship() {
  const mentors = [
    {
      id: 1,
      name: 'Lara Mensah',
      title: 'City Councilor • Civic Tech',
      location: 'Accra',
      photo: '/assets/one.jpg',
      bio:
        'Lara Mensah is a civic technology leader with 12+ years in public policy, community tech programs and participatory budgeting. She advises local governments on inclusive digital services.',
      expertise: ['Civic Tech', 'Policy', 'Community Engagement'],
      experience: [
        'City Councilor — Accra (2018–present)',
        'Director, Civic Tech Lab (2015–2018)',
        'Program Lead, Open Data Initiative (2012–2015)',
      ],
      credentials: ['MSc Public Policy', 'Fellow, Civic Leaders Program'],
      contact: { email: 'lara@example.org' },
    },
    {
      id: 2,
      name: 'Aisha Gomez',
      title: 'Community Organizer • Public Policy',
      location: 'Nairobi',
      photo: '/assets/one.jpg',
      bio:
        'Aisha brings grassroots organizing experience to policy campaigns and leadership training, focused on women’s civic participation and safe campaigning.',
      expertise: ['Organizing', 'Leadership', 'Safe Campaigning'],
      experience: ['Community Organizer (2014–present)', 'Trainer, WomenLead (2017–2020)'],
      credentials: ['MA Community Development'],
      contact: { email: 'aisha@example.org' },
    },
    {
      id: 3,
      name: 'Nora Okoye',
      title: 'Campaign Strategist',
      location: 'Lagos',
      photo: '/assets/one.jpg',
      bio:
        'Nora is a senior campaign strategist who designs evidence-based outreach and digital safety protocols for candidates and civic initiatives.',
      expertise: ['Campaign Strategy', 'Digital Safety'],
      experience: ['Lead Strategist, CampaignWorks (2016–present)'],
      credentials: ['Certificate, Digital Security for Campaigns'],
      contact: { email: 'nora@example.org' },
    },
  ];

  // modal state
  const [openMentor, setOpenMentor] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMentor(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (openMentor !== null) {
      // focus close button for accessibility
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    }
  }, [openMentor]);

  return (
    <div className="mentorship-page">
      <header>
        <h1>Mentorship & Networking</h1>
        <p className="muted">
          Connect with mentors across regions and fields. Use skills-based matching, request intros, and join sponsorship programs.
        </p>
      </header>

      <section className="mentors-section" aria-labelledby="recommended-mentors">
        <h2 id="recommended-mentors">Recommended mentors</h2>
        <div className="mentor-grid">
          {mentors.map((m) => (
            <article key={m.id} className="mentor-card">
              <div className="mentor-top">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={`${m.name} — ${m.title}`}
                    className="mentor-photo"
                    loading="lazy"
                  />
                ) : (
                  <div className="mentor-photo-placeholder">
                    {m.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                  </div>
                )}

                <div className="mentor-meta">
                  <strong>{m.name}</strong>
                  <span className="muted small">
                    {m.title} · {m.location}
                  </span>
                </div>
              </div>

              <p className="muted">{m.bio}</p>

              <div className="mentor-actions">
                <button
                  onClick={() => setOpenMentor(m.id)}
                  className="btn-outline"
                  aria-label={`View professional profile of ${m.name}`}
                >
                  View profile
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="page-footer">
        <Link to="/dashboard">Go back</Link>
      </footer>

      {/* Professional profile modal */}
      {openMentor !== null && (() => {
        const mentor = mentors.find((x) => x.id === openMentor);
        if (!mentor) return null;
        return (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`mentor-title-${mentor.id}`}
            className="mentor-modal"
            onClick={() => setOpenMentor(null)}
          >
            <div
              role="document"
              onClick={(e) => e.stopPropagation()}
              className="mentor-modal-content"
            >
              <div className="mentor-modal-header">
                <img src={mentor.photo} alt={mentor.name} className="mentor-modal-photo" />
                <div className="mentor-modal-meta">
                  <h2 id={`mentor-title-${mentor.id}`} className="mentor-modal-name">
                    {mentor.name}
                  </h2>
                  <div className="mentor-modal-title">
                    {mentor.title} • {mentor.location}
                  </div>
                </div>

                <button
                  ref={closeBtnRef}
                  onClick={() => setOpenMentor(null)}
                  aria-label="Close profile"
                  className="mentor-modal-close"
                >
                  ✕
                </button>
              </div>

              <div className="mentor-modal-body">
                <p className="mentor-modal-bio">{mentor.bio}</p>

                <div className="mentor-modal-section">
                  <strong>Expertise</strong>
                  <div className="mentor-expertise-list">
                    {mentor.expertise.map((e) => (
                      <span key={e} className="mentor-expertise">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mentor-modal-section">
                  <strong>Selected experience</strong>
                  <ul className="mentor-experience-list">
                    {mentor.experience.map((ex, i) => (
                      <li key={i} className="mentor-experience-item">
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mentor-modal-section">
                  <strong>Credentials</strong>
                  <div className="mentor-credentials">
                    {mentor.credentials.join(' · ')}
                  </div>
                </div>
              </div>

              <div className="mentor-modal-footer">
                <Link
                  to={`/mentorship/request?mentorId=${mentor.id}`}
                  className="btn-request-intro"
                  onClick={() => setOpenMentor(null)}
                  aria-label={`Request intro to ${mentor.name}`}
                >
                  Request an introduction
                </Link>

                {/* Open full profile in-app (SPA) to avoid server 404s on direct GET */}
                <Link
                  to={`/mentorship/profile/${mentor.id}`}
                  className="btn-view-full-profile"
                  aria-label="Open full profile"
                  onClick={() => setOpenMentor(null)}
                >
                  Open full profile
                </Link>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
