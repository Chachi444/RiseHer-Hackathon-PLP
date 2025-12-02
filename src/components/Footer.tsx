import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="src\assets\logo3.png" alt="RIseHer logo" className="logo-small" />
          <p>RIseHer — Empowering women in public life & public service.</p>
        </div>

        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Transparency</a>
          {/* quick access to safety reporting */}
          <a href="/report-harassment" aria-label="Report harassment">Report Harassment</a>
        </div>

        <div className="socials" aria-label="Social links">
          <a href="#" aria-label="Instagram"><img src="src\assets\instagram.png" alt="Instagram" /></a>
          <a href="#" aria-label="TikTok"><img src="src\assets\tiktok.png" alt="TikTok" /></a>
          <a href="#" aria-label="LinkedIn"><img src="src\assets\linkedin.png" alt="LinkedIn" /></a>
          <a href="#" aria-label="Twitter"><img src="src\assets\twitter.png" alt="Twitter" /></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} RIseHer. All rights reserved.</p>
      </div>
    </footer>
  );
}
