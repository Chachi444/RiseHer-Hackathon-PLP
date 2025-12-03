import React, { useEffect } from 'react';
import '../styles/hero.css'; // added
// use public assets (place riseher.png in public/assets/) — do not import large images into JS

export default function Hero() {
	const headerOffset = 0;
	const heroHeight = headerOffset ? `calc(100vh - ${headerOffset}px)` : '100vh';

	// ensure the site favicon (site icon) uses your logo file
	useEffect(() => {
		const setLink = (rel: string, href: string) => {
			let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
			if (!el) {
				el = document.createElement('link');
				el.rel = rel;
				document.head.appendChild(el);
			}
			el.href = href;
		};

		// use public path so it is served (not bundled)
		const logoPath = '/assets/logo1.png';

		try {
			setLink('icon', logoPath);
			setLink('apple-touch-icon', logoPath);
		} catch (err) {
			// silent fail — favicon is non-critical
			// console.warn('Failed to set favicon', err);
		}
	}, []);

	return (
		<section className="hero" aria-labelledby="hero-heading">
			<div
				className="hero-media"
				role="img"
				aria-label="RIseHer banner image featuring diverse women leaders"
				style={{ height: heroHeight }} // small dynamic override left in place
			>
				{/* use public asset so the image is served statically and not bundled */}
				<img
					src="/assets/riseher.png"
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
