import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div style={{ maxWidth: 1100, margin: '2rem auto', padding: 20 }}>
      <header>
        <h1>Mentorship & Networking</h1>
        <p style={{ color: '#555' }}>
          Connect with mentors across regions and fields. Use skills-based matching, request intros, and join sponsorship programs.
        </p>
      </header>

      <section aria-labelledby="recommended-mentors" style={{ marginTop: 18 }}>
        <h2 id="recommended-mentors">Recommended mentors</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12, marginTop: 12 }}>
          {mentors.map((m) => (
            <article
              key={m.id}
              style={{
                background: '#fff',
                padding: 12,
                borderRadius: 10,
                boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={`${m.name} — ${m.title}`}
                      style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover', flex: '0 0 56px' }}
                      loading="lazy"
                    />
                  ) : (
                    <div style={{ width: 56, height: 56, borderRadius: 8, background: '#EEE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      {m.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                    </div>
                  )}

                  <div>
                    <strong style={{ display: 'block' }}>{m.name}</strong>
                    <span style={{ fontSize: '.95rem', color: '#666' }}>{m.title} · {m.location}</span>
                  </div>
                </div>

                <p style={{ marginTop: 10, color: '#444' }}>{m.bio}</p>
              </div>

              <div style={{ marginTop: 10 }}>
                <button
                  onClick={() => setOpenMentor(m.id)}
                  style={{
                    padding: '.6rem .85rem',
                    borderRadius: 8,
                    border: '1px solid rgba(0,0,0,0.08)',
                    background: '#fff',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                  aria-label={`View professional profile of ${m.name}`}
                >
                  View profile
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: 24 }}>
        <Link to="/dashboard" aria-label="Go back to dashboard">
          Go back
        </Link>
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
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
              zIndex: 120,
            }}
            onClick={() => setOpenMentor(null)}
          >
            <div
              role="document"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 'min(920px, 96%)',
                maxHeight: '90vh',
                overflow: 'auto',
                background: '#fff',
                borderRadius: 12,
                padding: 20,
                boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
              }}
            >
              <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <img src={mentor.photo} alt={mentor.name} style={{ width: 160, height: 160, objectFit: 'cover', borderRadius: 12 }} />
                <div style={{ flex: 1 }}>
                  <h2 id={`mentor-title-${mentor.id}`} style={{ marginTop: 0 }}>
                    {mentor.name}
                  </h2>
                  <div style={{ color: '#666', marginBottom: 12 }}>
                    {mentor.title} • {mentor.location}
                  </div>

                  <p style={{ color: '#333' }}>{mentor.bio}</p>

                  <div style={{ marginTop: 12 }}>
                    <strong>Expertise</strong>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                      {mentor.expertise.map((e) => (
                        <span key={e} style={{ background: '#F6F0FF', color: '#5A007A', padding: '6px 10px', borderRadius: 999, fontWeight: 700, fontSize: '.9rem' }}>
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <strong>Selected experience</strong>
                    <ul style={{ marginTop: 8 }}>
                      {mentor.experience.map((ex, i) => (
                        <li key={i} style={{ marginBottom: 6 }}>
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <strong>Credentials</strong>
                    <div style={{ marginTop: 8 }}>{mentor.credentials.join(' · ')}</div>
                  </div>

                  <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
                    <Link
                      to={`/mentorship/request?mentorId=${mentor.id}`}
                      style={{ padding: '.6rem .9rem', background: '#FFD700', color: '#5A007A', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}
                      onClick={() => setOpenMentor(null)}
                      aria-label={`Request intro to ${mentor.name}`}
                    >
                      Request an introduction
                    </Link>

                    {/* If a dedicated mentor profile page exists, open it in a new tab */}
                    <a
                      href={`/mentorship/profile/${mentor.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ padding: '.6rem .9rem', borderRadius: 8, border: '1px solid rgba(0,0,0,0.08)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                      aria-label="Open full profile in new tab"
                    >
                      Open full profile
                    </a>
                  </div>
                </div>

                <div style={{ width: 44, display: 'flex', alignItems: 'start', justifyContent: 'flex-end' }}>
                  <button
                    ref={closeBtnRef}
                    onClick={() => setOpenMentor(null)}
                    aria-label="Close profile"
                    style={{ border: 'none', background: 'transparent', fontSize: 18, cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
