import React from 'react';
import '../styles/hero.css'; // added
// import the asset so Vite resolves it for dev and production
import heroImg from '../assets/riseher.png';

export default function Hero() {
	const headerOffset = 0;
	const heroHeight = headerOffset ? `calc(100vh - ${headerOffset}px)` : '100vh';

	return (
		<section className="hero" aria-labelledby="hero-heading">
			<div
				className="hero-media"
				role="img"
				aria-label="RIseHer banner image featuring diverse women leaders"
				style={{ height: heroHeight }} // small dynamic override left in place
			>
				{/* show the bundled image; fallback to public placeholder if it fails */}
				<img
					src={heroImg}
					alt=""
					aria-hidden="true"
					style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
					onError={(e) => {
						const img = e.currentTarget as HTMLImageElement;
						if (!img.dataset.fallbackApplied) {
							img.dataset.fallbackApplied = '1';
							img.src = '/assets/placeholder-hero.svg';
						}
					}}
				/>
				<div className="hero-content">
					<h1 id="hero-heading" className="hero-title">RIseHer — Women in Public Life & Public Service</h1>
					<p className="hero-sub">A central hub to empower, connect, and protect women in public service — mentorship, visibility, safety, and resources.</p>

					<div className="hero-ctas" role="group" aria-label="Primary calls to action">
						<a className="btn-text-arrow" href="/join">Join the Network <span aria-hidden>→</span></a>
						<a className="btn-outline-large" href="/mentorship">Find a Mentor</a>
						<a className="btn-ghost-simple" href="/stories">Share Your Story</a>
					</div>
				</div>
			</div>
		</section>
	);
}
