import React from 'react';

export default function Hero() {
  // If you need to subtract header height set headerOffset, otherwise leave 0 to use full viewport.
  const headerOffset = 0; // set (in px) if your sticky header should be excluded from the hero height
  const heroHeight = headerOffset ? `calc(100vh - ${headerOffset}px)` : '100vh';

  // Full-bleed banner style (not constrained by .container)
  const bannerStyle: React.CSSProperties = {
    width: '100%',
    height: heroHeight,
    backgroundImage:
      "linear-gradient(180deg, rgba(0,0,0,0.28), rgba(0,0,0,0.18)), url('/assets/riseher.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // center content horizontally
    position: 'relative',
    overflow: 'hidden',
  };

  // Center content both vertically and horizontally
  const contentWrap: React.CSSProperties = {
    width: '100%',
    maxWidth: '1300px',
    padding: 'clamp(1rem, 4vw, 2.5rem)',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // center vertically
    textAlign: 'center',
  };

  // Plain centered write-up (no boxed banner)
  const overlayStyle: React.CSSProperties = {
    background: 'transparent',
    color: '#FFFFFF',
    padding: 0,
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: 'clamp(2rem, 7vw, 5.2rem)', // large, responsive title like your pasted image
    fontWeight: 800,
    color: '#FFFFFF',
    lineHeight: 1.02,
    textShadow: '0 8px 24px rgba(0,0,0,0.6)',
    letterSpacing: '-0.02em',
  };

  const subStyle: React.CSSProperties = {
    marginTop: '.75rem',
    marginBottom: 0,
    fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
    color: 'rgba(255,255,255,0.95)',
    textShadow: '0 6px 18px rgba(0,0,0,0.5)',
    maxWidth: '72ch',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const ctaGroup: React.CSSProperties = {
    marginTop: '1.25rem',
    display: 'flex',
    gap: '.8rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  // New button styles to match the design you liked
  const btnTextArrow: React.CSSProperties = {
    background: 'transparent',
    color: '#FFFFFF',
    border: 'none',
    padding: '.6rem 1rem',
    borderRadius: 999,
    textDecoration: 'none',
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '.5rem',
    fontSize: '1rem',
  };

  const btnOutlineLarge: React.CSSProperties = {
    background: 'transparent',
    color: '#FFFFFF',
    border: '2px solid rgba(255,255,255,0.95)',
    padding: '.7rem 1.25rem',
    borderRadius: 12,
    textDecoration: 'none',
    fontWeight: 700,
    boxShadow: 'none',
  };

  const btnGhostSimple: React.CSSProperties = {
    background: 'transparent',
    color: '#FFFFFF',
    border: 'none',
    padding: '.6rem 1rem',
    borderRadius: 999,
    textDecoration: 'none',
    fontWeight: 700,
  };

  const arrowStyle: React.CSSProperties = {
    display: 'inline-block',
    transform: 'translateX(2px)',
    fontSize: '1.05rem',
    lineHeight: 1,
  };

  return (
    <section className="hero" aria-labelledby="hero-heading">
      {/* Full-bleed banner (no .container wrapper here so it fills the page width) */}
      <div
        className="hero-media"
        role="img"
        aria-label="RIseHer banner image featuring diverse women leaders"
        style={bannerStyle}
      >
        {/* Decorative <img> for UA preference; aria-hidden since background conveys visual */}
        <img src="/assets/riseher.png" alt="" aria-hidden="true" style={{ display: 'none' }} />

        {/* Centered normal writeup inside the image (no boxed banner) */}
        <div style={contentWrap}>
          <div style={overlayStyle}>
            <h1 id="hero-heading" className="hero-title" style={titleStyle}>
              RIseHer — Women in Public Life & Public Service
            </h1>

            <p className="hero-sub" style={subStyle}>
              A central hub to empower, connect, and protect women in public service — mentorship, visibility, safety, and resources.
            </p>

            <div className="hero-ctas" role="group" aria-label="Primary calls to action" style={ctaGroup}>
              {/* Left: text-style button with arrow */}
              <a className="btn" style={btnTextArrow} href="/join" aria-label="Join the Network">
                Join the Network <span aria-hidden="true" style={arrowStyle}>→</span>
              </a>

              {/* Center: prominent outlined pill */}
              <a className="btn" style={btnOutlineLarge} href="/mentorship" aria-label="Find a Mentor">
                Find a Mentor
              </a>

              {/* Right: subtle white text (ghost) */}
              <a className="btn" style={btnGhostSimple} href="/stories" aria-label="Share Your Story">
                Share Your Story
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
