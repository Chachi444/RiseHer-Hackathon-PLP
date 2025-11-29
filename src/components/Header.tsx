import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="RIseHer home">
          <img src="/assets/logo1.png" alt="RIseHer logo" className="logo" />
          <span className="sr-only">RIseHer</span>
        </Link>

        <nav className="main-nav" role="navigation" aria-label="Main">
          <Link to="/">Home</Link>
          <Link to="/mentorship">Mentorship</Link>
          <Link to="/visibility">Visibility</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/about">About</Link>
        </nav>

        <div className="header-ctas">
          <Link className="btn btn-ghost" to="/join">Join</Link>
          <Link className="btn btn-primary" to="/dashboard">Dashboard</Link>
        </div>
      </div>
    </header>
  );
}
