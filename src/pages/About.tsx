import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/about.css'; // added

export default function About() {
  // Layout & type (use theme variables and Roboto)
  const container: React.CSSProperties = {
    maxWidth: 1040,
    margin: '2.5rem auto',
    padding: '1.25rem',
    color: 'var(--color-dark-gray, #222)',
    fontFamily: 'var(--font-family, Roboto, system-ui, -apple-system)',
    background: 'transparent',
  };
  const heroGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 420px',
    gap: 28,
    alignItems: 'center',
    marginBottom: 20,
  };
  const heroText: React.CSSProperties = { maxWidth: 720 };
  const eyebrow: React.CSSProperties = { color: 'var(--color-deep-purple, #5A007A)', fontWeight: 800, letterSpacing: '.02em', marginBottom: 10 };
  const title: React.CSSProperties = { margin: 0, fontSize: '2rem', lineHeight: 1.08, color: 'var(--color-deep-purple, #0f0736)' };
  const lead: React.CSSProperties = { marginTop: 12, color: 'var(--color-dark-gray,#444)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '68ch' };

  // Framed image (shows full content)
  const imgWrap: React.CSSProperties = {
    width: '100%',
    height: 320,
    borderRadius: 14,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg, #fff)',
    boxShadow: 'var(--card-shadow, 0 20px 48px rgba(11,12,26,0.06))',
    border: '1px solid var(--card-border, rgba(11,12,26,0.04))',
  };
  const heroImg: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: 'var(--bg, #fff)' };

  // Section card
  const section: React.CSSProperties = {
    background: 'var(--bg,#fff)',
    padding: 20,
    borderRadius: 12,
    boxShadow: 'var(--card-shadow, 0 12px 36px rgba(11,12,26,0.04))',
    marginBottom: 18,
    border: '1px solid var(--card-border, rgba(11,12,26,0.03))',
  };
  const h3: React.CSSProperties = { margin: '0 0 8px 0', fontSize: '1.05rem', color: 'var(--color-deep-purple,#2c1a4a)' };
  const p: React.CSSProperties = { color: 'var(--color-dark-gray,#444)', lineHeight: 1.65, marginTop: 8 };

  const listStyle: React.CSSProperties = { marginTop: 8, paddingLeft: 18, color: '#444' };

  { /* CORE CONTENT — improved styling */ }
  const coreGridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 420px', gap: 20, alignItems: 'start' };
  const missionCard: React.CSSProperties = { background: '#fff', padding: 22, borderRadius: 12, boxShadow: '0 18px 44px rgba(11,12,26,0.04)', border: '1px solid rgba(11,12,26,0.03)' };
  const offersCard: React.CSSProperties = { background: '#fff', padding: 22, borderRadius: 12, boxShadow: '0 18px 44px rgba(11,12,26,0.04)', border: '1px solid rgba(11,12,26,0.03)' };

  const offerItem: React.CSSProperties = { display: 'flex', gap: 12, alignItems: 'flex-start' };
  const badge: React.CSSProperties = { width: 44, height: 44, borderRadius: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#5A007A', background: '#F6F0FF', flex: '0 0 44px' };
  const offerTitleStyle: React.CSSProperties = { margin: 0, fontSize: '.98rem', fontWeight: 700, color: '#222' };
  const offerDescStyle: React.CSSProperties = { margin: '4px 0 0 0', color: '#555', fontSize: '.95rem', lineHeight: 1.5 };

  return (
    <main className="about-container" role="main" aria-labelledby="about-heading">
      {/* HERO */}
      <header className="about-hero-grid">
        <div className="about-hero-text">
          <div className="about-eyebrow">About RIseHer</div>
          <h1 id="about-heading" className="about-title">Empowering women in public life & public service</h1>

          <p className="about-lead">
            <strong>RIseHer</strong> is a global platform dedicated to empowering women in public life and public service. Built on the pillars of <strong>visibility, mentorship, safety, and growth</strong>, RIseHer provides the tools, networks, and resources women need to lead confidently and make lasting impact in politics, governance, business, and civil society.
          </p>

          {/* Emphasized paragraph you requested */}
          <p className="about-emphasized">
            We believe that women’s voices are essential to shaping inclusive policies, driving innovation, and building stronger communities. Yet, many face barriers such as underrepresentation, harassment, and lack of mentorship. RIseHer was created to break these barriers and create a safe, supportive, and inspiring digital space.
          </p>
        </div>
    
        <div className="about-img-wrap" aria-hidden={false}>
          <img src="public/assets/riseher.png" alt="RIseHer hero artwork" className="about-hero-img" />
        </div>
      </header>

      <section aria-labelledby="about-core" className="about-core" >
        <div className="about-core-grid">
          <div className="about-mission-card" aria-labelledby="mission-heading">
            <h3 id="mission-heading" className="about-h3">✨ Our Mission</h3>
            <p className="about-paragraph">
              To <strong>empower, connect, and protect women in public service</strong>, ensuring they have equal opportunities to lead, thrive, and inspire future generations.
            </p>

            <hr className="about-divider" />

            <h3 className="about-h3">🌍 Our Vision</h3>
            <p className="about-paragraph">
              A world where women’s leadership is visible, valued, and protected, where every woman in public service has the tools and community to rise, thrive, and lead change.
            </p>
          </div>

          <aside className="about-offers-card" aria-labelledby="offers-heading">
            <h3 id="offers-heading" className="about-h3">💡 What We Offer</h3>

            <div className="about-offers-grid">
              <div className="about-offer-item">
                <div className="about-badge" aria-hidden>👥</div>
                <div>
                  <p className="about-offer-title">Mentorship Network</p>
                  <p className="about-offer-desc">Connecting aspiring leaders with experienced mentors and sponsors.</p>
                </div>
              </div>

              <div className="about-offer-item">
                <div className="about-badge" aria-hidden>🗺️</div>
                <div>
                  <p className="about-offer-title">Visibility Hub</p>
                  <p className="about-offer-desc">Showcasing women leaders through interactive maps, profiles, and storytelling.</p>
                </div>
              </div>

              <div className="about-offer-item">
                <div className="about-badge" aria-hidden>🛡️</div>
                <div>
                  <p className="about-offer-title">Safety Toolkit</p>
                  <p className="about-offer-desc">Providing resources and reporting tools to combat harassment and discrimination.</p>
                </div>
              </div>

              <div className="about-offer-item">
                <div className="about-badge" aria-hidden>📈</div>
                <div>
                  <p className="about-offer-title">Career Development</p>
                  <p className="about-offer-desc">Offering training, resources, job boards, and leadership simulations.</p>
                </div>
              </div>

              <div className="about-offer-item">
                <div className="about-badge" aria-hidden>🤝</div>
                <div>
                  <p className="about-offer-title">Community Engagement</p>
                  <p className="about-offer-desc">Forums, events, and regional meetups to build solidarity and support.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Footer links (no call-to-action buttons requested) */}
      <div className="about-footer-links">
        <Link to="/" className="about-home-link">Home</Link>
      </div>
    </main>
  );
}
