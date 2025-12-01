import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../styles/header.css'; // added

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        {/* Skip link for keyboard users */}
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        <Link to="/" className="brand" aria-label="RIseHer home">
          {/* use safe placeholder logo bundled in public/assets */}
          <img
            src="/assets/placeholder-logo.svg"
            alt="RIseHer logo"
            className="logo"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.onerror = null;
              img.src = '/assets/placeholder-logo.svg';
            }}
          />
          <span className="sr-only">RIseHer</span>
        </Link>

        <nav className="main-nav" role="navigation" aria-label="Main">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          <NavLink to="/mentorship" className={({ isActive }) => (isActive ? 'active' : '')}>Mentorship</NavLink>
          {/* visibility link gets an explicit label for clarity */}
          <NavLink to="/visibility" className={({ isActive }) => (isActive ? 'active' : '')} aria-label="Visibility and Inspiration">Visibility</NavLink>
          <NavLink to="/resources" className={({ isActive }) => (isActive ? 'active' : '')}>Resources</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
        </nav>

        <div className="header-ctas">
          <Link className="btn btn-ghost" to="/join">Join</Link>
          <Link className="btn btn-primary" to="/dashboard">Dashboard</Link>
        </div>
      </div>
    </header>
  );
}
