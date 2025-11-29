import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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

	// community testimonials (15 items)
	const testimonials = [
		{ name: 'Fatima K.', role: 'Voter Educator, Mombasa', quote: 'RIseHer gave me tools to run community workshops safely.', photo: '/assets/one.jpg' },
		{ name: 'Grace T.', role: 'School Leader, Kampala', quote: 'I found a peer network that helped me scale our civic youth program.', photo: '/assets/one.jpg' },
		{ name: 'Zainab R.', role: 'Local Advocate, Dar es Salaam', quote: 'The visibility tools helped raise awareness for our campaign.', photo: '/assets/one.jpg' },
		{ name: 'Maya S.', role: 'Civic Volunteer, Lusaka', quote: 'Mentorship matching helped me structure my leadership goals.', photo: '/assets/one.jpg' },
		{ name: 'Evelyn P.', role: 'Community Liaison, Accra', quote: 'I accessed funding listings that supported our training series.', photo: '/assets/one.jpg' },
		{ name: 'Nadia L.', role: 'Policy Intern, Nairobi', quote: 'The workshops sharpened my public policy skills.', photo: '/assets/one.jpg' },
		{ name: 'Rita A.', role: 'Campaign Volunteer, Lagos', quote: 'I felt safer using the digital safety checklist during fieldwork.', photo: '/assets/one.jpg' },
		{ name: 'Sofia M.', role: 'Youth Organizer, Kigali', quote: 'The community introduced me to collaborators across regions.', photo: '/assets/one.jpg' },
		{ name: 'Hannah B.', role: 'Researcher, Accra', quote: 'Resources saved us weeks of effort designing our outreach.', photo: '/assets/one.jpg' },
		{ name: 'Lina C.', role: 'Advocacy Lead, Kampala', quote: 'I bookmarked grants and landed funding for a pilot project.', photo: '/assets/one.jpg' },
		{ name: 'Noor D.', role: 'Trainer, Mombasa', quote: 'Trainings boosted confidence in public speaking for participants.', photo: '/assets/one.jpg' },
		{ name: 'Patience K.', role: 'Community Organiser, Goma', quote: 'RIseHer connected me to a mentor who guided campaign strategy.', photo: '/assets/one.jpg' },
		{ name: 'Yasmin O.', role: 'Regional Coordinator, Nairobi', quote: 'Our meetup saw a 3x increase in volunteers after posting on RIseHer.', photo: '/assets/one.jpg' },
		{ name: 'Diana F.', role: 'Civic Tech Volunteer, Lagos', quote: 'The simulation game made leadership training engaging and practical.', photo: '/assets/one.jpg' },
		{ name: 'Olga H.', role: 'NGO Partner, Accra', quote: 'We used the toolkit for safe campaigning across multiple cities.', photo: '/assets/one.jpg' },
	];

	// chunk into pages of 3
	const visibleCount = 3;
	const pages = [];
	for (let i = 0; i < testimonials.length; i += visibleCount) {
		pages.push(testimonials.slice(i, i + visibleCount));
	}
	const maxPage = pages.length - 1;

	const [page, setPage] = useState(0);
	const autoplayRef = useRef<number | null>(null);

	useEffect(() => {
		autoplayRef.current = window.setInterval(() => {
			setPage(p => (p >= maxPage ? 0 : p + 1));
		}, 5000);
		return () => {
			if (autoplayRef.current) clearInterval(autoplayRef.current);
		};
	}, [maxPage]);

	const goPrev = () => setPage(p => (p <= 0 ? maxPage : p - 1));
	const goNext = () => setPage(p => (p >= maxPage ? 0 : p + 1));

	// carousel styles: track is flex, each page is 100% width and contains 3 cards laid out in a grid
	const carouselWrap: React.CSSProperties = { marginTop: '1rem', overflow: 'hidden' };
	const trackStyle = (p: number): React.CSSProperties => ({
		display: 'flex',
		width: `${pages.length * 100}%`,
		transform: `translateX(-${p * (100 / pages.length)}%)`,
		transition: 'transform .6s cubic-bezier(.2,.9,.2,1)',
	});
	const pageStyle: React.CSSProperties = { width: `${100 / pages.length}%`, padding: '0 .5rem', boxSizing: 'border-box' };
	const cardStyle2: React.CSSProperties = { background: '#fff', borderRadius: 12, padding: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', minHeight: 160 };
	const controlsStyle: React.CSSProperties = { display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12 };

	// partners carousel (uses public/assets/partner1.png ... partner9.png)
	const partners = [
		{ id: 1, src: '/assets/partner1.png', alt: 'Partner 1' },
		{ id: 2, src: '/assets/partner2.png', alt: 'Partner 2' },
		{ id: 3, src: '/assets/partner3.png', alt: 'Partner 3' },
		{ id: 4, src: '/assets/partner4.png', alt: 'Partner 4' },
		{ id: 5, src: '/assets/partner5.png', alt: 'Partner 5' },
		{ id: 6, src: '/assets/partner6.png', alt: 'Partner 6' },
		{ id: 7, src: '/assets/partner6.png', alt: 'Partner 6' },
		{ id: 8, src: '/assets/partner5.png', alt: 'Partner 8' },
		{ id: 9, src: '/assets/partner6.png', alt: 'Partner 9' },
	];

	const partnersPerPage = 3;
	const partnerPages = [];
	for (let i = 0; i < partners.length; i += partnersPerPage) {
		partnerPages.push(partners.slice(i, i + partnersPerPage));
	}
	const [partnerPage, setPartnerPage] = useState(0);
	const partnerMaxPage = partnerPages.length - 1;
	const partnerAutoRef = useRef<number | null>(null);

	useEffect(() => {
		partnerAutoRef.current = window.setInterval(() => {
			setPartnerPage(p => (p >= partnerMaxPage ? 0 : p + 1));
		}, 4000);
		return () => {
			if (partnerAutoRef.current) clearInterval(partnerAutoRef.current);
		};
	}, [partnerMaxPage]);

	const sliderWrapStyle: React.CSSProperties = { marginTop: 28, overflow: 'hidden' };
	const sliderTrackStyle = (p: number): React.CSSProperties => ({
		display: 'flex',
		width: `${partnerPages.length * 100}%`,
		transform: `translateX(-${p * (100 / partnerPages.length)}%)`,
		transition: 'transform .6s ease',
	});
	const partnerPageStyle: React.CSSProperties = { width: `${100 / partnerPages.length}%`, display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '1rem 0', boxSizing: 'border-box' };
	const partnerCard: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30%', height: 96, background: '#fff', borderRadius: 10, boxShadow: '0 6px 18px rgba(0,0,0,0.06)' };
	const logoStyle: React.CSSProperties = { maxHeight: 64, maxWidth: '80%', objectFit: 'contain', display: 'block' };
	const partnerIndicators: React.CSSProperties = { display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12 };

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

			{/* Testimonials & Stories */}
			<section aria-labelledby="testimonials-heading" style={{ padding: '2rem 1rem', background: 'var(--color-soft-lavender, #CBA6F7)', marginTop: 8 }}>
				<div className="container" style={{ maxWidth: 1100 }}>
					<h2 id="testimonials-heading" style={{ margin: 0, color: 'var(--color-deep-purple, #5A007A)' }}>Voices from the network</h2>
					<p style={{ color: 'rgba(46,46,46,0.85)', marginTop: 8 }}>
						Stories and testimonials from women who’ve used RIseHer — mentorship, safety, and opportunities in public life.
					</p>

					<div style={carouselWrap}>
						<div style={{ overflow: 'hidden' }}>
							<div style={trackStyle(page)}>
								{pages.map((pg, pageIndex) => (
									<div key={pageIndex} style={pageStyle}>
										<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
											{pg.map((t, i) => (
												<article key={i} style={cardStyle2} aria-label={`Testimonial by ${t.name}`}>
													<div style={{ display: 'flex', alignItems: 'center' }}>
														<img src={t.photo} alt={`${t.name} photo`} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', marginRight: 12 }} />
														<div>
															<strong style={{ display: 'block' }}>{t.name}</strong>
															<span style={{ color: '#666', fontSize: '.95rem' }}>{t.role}</span>
														</div>
													</div>
													<p style={{ marginTop: 10, color: 'var(--color-dark-gray, #2E2E2E)' }}>"{t.quote}"</p>
												</article>
											))}
										</div>
									</div>
								))}
							</div>
						</div>

						<div style={controlsStyle} role="tablist" aria-label="Testimonial pages">
							{pages.map((_, idx) => (
								<button
									key={idx}
									onClick={() => setPage(idx)}
									onKeyDown={(e) => { if (e.key === 'ArrowLeft') setPage(p => Math.max(0, p - 1)); if (e.key === 'ArrowRight') setPage(p => Math.min(maxPage, p + 1)); }}
									aria-label={`Go to testimonials page ${idx + 1}`}
									aria-pressed={idx === page}
									style={{ width: 10, height: 10, borderRadius: 999, background: idx === page ? '#5A007A' : '#ddd', border: 'none', margin: '0 4px' }}
								/>
							))}
						</div>

						<div style={{ display: 'flex', gap: '.75rem', marginTop: '1rem', justifyContent: 'center' }}>
							<Link to="/join" style={{ padding: '.6rem 1rem', background: 'var(--color-gold, #FFD700)', color: '#5A007A', borderRadius: 999, textDecoration: 'none', fontWeight: 800 }} aria-label="Join RIseHer — open join form">Join Us</Link>
							<Link to="/report-harassment" style={{ padding: '.6rem 1rem', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.85)', borderRadius: 999, textDecoration: 'none', fontWeight: 700 }} aria-label="Report harassment — open reporting form">Report Harassment</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Partners carousel */}
			<div style={{ padding: '2rem 1rem' }}>
				<div className="container" style={{ maxWidth: 1100 }}>
					<h2 style={{ margin: 0, color: 'var(--color-deep-purple, #5A007A)' }}>Our partners</h2>
					<p style={{ color: '#555', marginTop: 8 }}>We collaborate with organisations across the region.</p>

					<div style={sliderWrapStyle} aria-roledescription="carousel" aria-label="Partner logos carousel">
						<div style={sliderTrackStyle(partnerPage)}>
							{partnerPages.map((pg, pageIndex) => (
								<div key={pageIndex} style={partnerPageStyle} aria-hidden={pageIndex !== partnerPage}>
									{pg.map((p) => (
										<div key={p.id} role="group" aria-label={p.alt} style={partnerCard}>
											<img src={p.src} alt={p.alt} loading="lazy" style={logoStyle} />
										</div>
									))}
								</div>
							))}
						</div>
					</div>

					<div style={partnerIndicators} role="tablist" aria-label="Partner pages">
						{partnerPages.map((_, idx) => (
							<button
								key={idx}
								onClick={() => setPartnerPage(idx)}
								aria-label={`Go to partners page ${idx + 1}`}
								aria-pressed={idx === partnerPage}
								style={{ width: 10, height: 10, borderRadius: 999, background: idx === partnerPage ? '#5A007A' : '#ddd', border: 'none', cursor: 'pointer' }}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Additional home sections (testimonials, map preview, newsletter) can be added here */}
		</div>
	);
}
