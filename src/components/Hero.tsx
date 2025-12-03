import React, { useEffect, useRef, useState } from 'react';
import '../styles/hero.css'; // added
// use public assets (place riseher.png in public/assets/) — do not import large images into JS

export default function Hero() {
	const headerOffset = 0;
	const heroHeight = headerOffset ? `calc(100vh - ${headerOffset}px)` : '100vh';

	// runtime list of failing resources (for debugging 404s)
	const [failed, setFailed] = useState<string[]>([]);
	const failedRef = useRef<Set<string>>(new Set());

	useEffect(() => {
		// capture-phase so we see resource errors (img/script/link) before bubbling
		const onErr = (ev: Event) => {
			const tgt = ev.target as HTMLElement | null;
			if (!tgt) return;
			let url: string | undefined;
			// images, scripts, links, media
			if (tgt instanceof HTMLImageElement) url = tgt.src;
			else if (tgt instanceof HTMLScriptElement) url = tgt.src;
			else if (tgt instanceof HTMLLinkElement) url = tgt.href;
			else if (tgt instanceof HTMLVideoElement) url = tgt.currentSrc || tgt.src;
			else if (tgt instanceof HTMLAudioElement) url = tgt.currentSrc || tgt.src;

			if (!url && (ev as ErrorEvent).message) {
				// fallback: for other error events, try to parse filename from message (best-effort)
				url = (ev as ErrorEvent).filename || undefined;
			}

			if (url) {
				// dedupe and update state
				if (!failedRef.current.has(url)) {
					failedRef.current.add(url);
					setFailed(Array.from(failedRef.current));
					console.warn('[resource-failed]', url);
				}
			}
		};

		window.addEventListener('error', onErr, true);
		return () => window.removeEventListener('error', onErr, true);
	}, []);

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
			{/* DEBUG: failing resource panel — remove when done */}
			{failed.length > 0 && (
				<div
					role="status"
					aria-live="polite"
					style={{
						position: 'fixed',
						left: 12,
						bottom: 12,
						zIndex: 9999,
						background: 'rgba(255,255,255,0.98)',
						color: '#111',
						border: '1px solid rgba(11,12,26,0.06)',
						boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
						padding: 12,
						borderRadius: 8,
						maxWidth: 'min(54ch, 92vw)',
						fontSize: 13,
					}}
				>
					<div style={{ fontWeight: 800, marginBottom: 8 }}>Missing resources (check /public/assets)</div>
					<ul style={{ margin: 0, paddingLeft: 16 }}>
						{failed.map((u) => (
							<li key={u} style={{ marginBottom: 6, wordBreak: 'break-all' }}>
								<a href={u} target="_blank" rel="noreferrer" style={{ color: '#5A007A' }}>{u}</a>
							</li>
						))}
					</ul>
					<div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
						Tip: copy missing files into public/assets and refresh. Press Esc to dismiss (clears on reload).
					</div>
				</div>
			)}
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
