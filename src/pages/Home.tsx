import React from 'react';
import Hero from '../components/Hero';

export default function Home() {
	// Simple inline styles to match the provided design
	const gridStyle: React.CSSProperties = {
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 1fr)',
		gap: '1.5rem',
		marginTop: '1rem',
		alignItems: 'start',
	};

	const cardStyle: React.CSSProperties = {
		background: '#FFFFFF',
		borderRadius: 12,
		padding: '2rem 1.25rem 1.5rem',
		boxShadow: '0 10px 30px rgba(16,24,40,0.06)',
		textAlign: 'center',
		minHeight: '260px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
	};

	const mediaCircle: React.CSSProperties = {
		width: 110,
		height: 110,
		borderRadius: '50%',
		overflow: 'hidden',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: '1rem',
		border: '6px solid rgba(231,227,235,0.9)',
		boxShadow: '0 8px 20px rgba(90,0,122,0.06)',
	};

	const mediaSquare: React.CSSProperties = {
		width: 110,
		height: 110,
		borderRadius: 12,
		overflow: 'hidden',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: '1rem',
		border: '6px solid rgba(231,227,235,0.9)',
		boxShadow: '0 8px 20px rgba(90,0,122,0.06)',
		background: '#fff',
	};

	const titleStyle: React.CSSProperties = {
		margin: 0,
		fontSize: '1.05rem',
		fontWeight: 800,
		color: 'var(--color-deep-purple, #5A007A)',
		display: 'flex',
		gap: '.6rem',
		alignItems: 'center',
		justifyContent: 'center',
	};

	const bodyStyle: React.CSSProperties = {
		marginTop: '.8rem',
		color: 'var(--color-dark-gray, #2E2E2E)',
		opacity: 0.85,
		lineHeight: 1.5,
		maxWidth: '44ch',
	};

	const linkStyle: React.CSSProperties = {
		marginTop: 'auto',
		color: 'var(--color-deep-purple, #5A007A)',
		fontWeight: 700,
		textDecoration: 'none',
		marginTop: '1rem',
	};

	const iconStyle: React.CSSProperties = {
		fontSize: '1.15rem',
		display: 'inline-block',
	};

	return (
		<div>
			{/* local styles: card hover lift + deeper shadow */}
			<style>{`
				.card {
					transition: transform .24s cubic-bezier(.2,.9,.2,1), box-shadow .24s cubic-bezier(.2,.9,.2,1);
					will-change: transform, box-shadow;
				}
				.card:hover,
				.card:focus-within {
					transform: translateY(-8px);
					box-shadow: 0 20px 40px rgba(90,0,122,0.12);
				}
			`}</style>
			<Hero />

			<section className="quick-highlights container" aria-labelledby="highlights-heading" style={{ padding: '3rem 1rem' }}>
				<h2 id="highlights-heading" style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-deep-purple, #5A007A)' }}>
					Quick Highlights
				</h2>

				<div style={gridStyle} aria-live="polite">
					<article className="card" style={cardStyle} aria-labelledby="featured-leader">
						<div style={mediaCircle}>
							<img src="/assets/Mumbi Ndung'u.png" alt="Amina Sow — featured leader" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
						</div>

						<h3 id="featured-leader" style={titleStyle}>
							<span style={iconStyle} aria-hidden="true">⭐</span>
							<span>Featured Leader</span>
						</h3>

						<p style={bodyStyle}>
							Meet Mumbi Ndung'u, a renowned development specialist and social entrepreneur, recognized for her leadership in digital development.</p>

						<a className="link" href="/leaders/amina-sow" style={linkStyle}>
							Learn more
						</a>
					</article>

					<article className="card" style={cardStyle} aria-labelledby="upcoming-event">
						<div style={mediaSquare}>
							<img src="/assets/Banner.png" alt="Upcoming event illustration" style={{ width: 110, height: 110, objectFit: 'cover', borderRadius: 8 }} />
						</div>

						<h3 id="upcoming-event" style={titleStyle}>
							<span style={iconStyle} aria-hidden="true">📅</span>
							<span>Upcoming Event</span>
						</h3>

						<p style={bodyStyle}>
							Join our virtual workshop on "Public Speaking for Leaders" on July 15th. Limited spots available!
						</p>

						<a className="link" href="/events" style={linkStyle}>
							RSVP
						</a>
					</article>

					<article className="card" style={cardStyle} aria-labelledby="latest-news">
						<div style={mediaSquare}>
							<img src="/assets/News.png" alt="Latest news illustration" style={{ width: 110, height: 110, objectFit: 'cover', borderRadius: 8 }} />
						</div>

						<h3 id="latest-news" style={titleStyle}>
							<span style={iconStyle} aria-hidden="true">📰</span>
							<span>Latest News</span>
						</h3>

						<p style={bodyStyle}>
							Our new report on the state of women in public service in East Africa is now available.
						</p>

						<a className="link" href="/news" style={linkStyle}>
							Read
						</a>
					</article>
				</div>
			</section>

			{/* Additional home sections (testimonials, map preview, newsletter) can be added here */}
		</div>
	);
}
