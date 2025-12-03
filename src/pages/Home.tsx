import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import "../styles/home.css"; // added

export default function Home() {
  // community testimonials (15 items) — made a few quotes more conversational
  const testimonials = [
    {
      name: "Fatima K.",
      role: "Voter Educator, Mombasa",
      quote:
        "RIseHer gave me the confidence and tools to run community workshops safely — I couldn't have done it alone.",
      photo: "/assets/one.jpg",
    },
    {
      name: "Grace T.",
      role: "School Leader, Kampala",
      quote:
        "I found a peer network that helped me scale our civic youth program — people who actually listen and help.",
      photo: "/assets/one.jpg",
    },
    {
      name: "Zainab R.",
      role: "Local Advocate, Dar es Salaam",
      quote:
        "The visibility tools helped us get noticed — our turnout tripled!",
      photo: "/assets/one.jpg",
    },
    {
      name: "Maya S.",
      role: "Civic Volunteer, Lusaka",
      quote: "Mentorship matching helped me structure my leadership goals.",
      photo: "/assets/one.jpg",
    },
    {
      name: "Evelyn P.",
      role: "Community Liaison, Accra",
      quote: "I accessed funding listings that supported our training series.",
      photo: "/assets/one.jpg",
    },
    {
      name: "Nadia L.",
      role: "Policy Intern, Nairobi",
      quote: "The workshops sharpened my public policy skills.",
      photo: "/assets/one.jpg",
    },
    {
      name: "Rita A.",
      role: "Campaign Volunteer, Lagos",
      quote:
        "I felt safer using the digital safety checklist during fieldwork.",
      photo: "/assets/one.jpg",
    },
    {
      name: "Sofia M.",
      role: "Youth Organizer, Kigali",
      quote: "The community introduced me to collaborators across regions.",
      photo: "/assets/one.jpg",
    },
    {
      name: "Hannah B.",
      role: "Researcher, Accra",
      quote: "Resources saved us weeks of effort designing our outreach.",
      photo: "/assets/one.jpg",
    },
    {
      name: "Lina C.",
      role: "Advocacy Lead, Kampala",
      quote: "I bookmarked grants and landed funding for a pilot project.",
      photo: "/assets/one.jpg",
    },
    {
      name: "Noor D.",
      role: "Trainer, Mombasa",
      quote:
        "Trainings boosted confidence in public speaking for participants.",
      photo: "/assets/one.jpg",
    },
    {
      name: "Patience K.",
      role: "Community Organiser, Goma",
      quote: "RIseHer connected me to a mentor who guided campaign strategy.",
      photo: "/assets/one.jpg",
    },
    {
      name: "Yasmin O.",
      role: "Regional Coordinator, Nairobi",
      quote:
        "Our meetup saw a 3x increase in volunteers after posting on RIseHer.",
      photo: "/assets/one.jpg",
    },
    {
      name: "Diana F.",
      role: "Civic Tech Volunteer, Lagos",
      quote:
        "The simulation game made leadership training engaging and practical.",
      photo: "/assets/one.jpg",
    },
    {
      name: "Olga H.",
      role: "NGO Partner, Accra",
      quote: "We used the toolkit for safe campaigning across multiple cities.",
      photo: "/assets/one.jpg",
    },
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
      setPage((p) => (p >= maxPage ? 0 : p + 1));
    }, 5000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [maxPage]);

  const goPrev = () => setPage((p) => (p <= 0 ? maxPage : p - 1));
  const goNext = () => setPage((p) => (p >= maxPage ? 0 : p + 1));

  // partners carousel — use placeholders (replace with real assets later)
  const partners = [
    { id: 1, src: "/assets/partner1.png", alt: "Partner 1" },
    { id: 2, src: "/assets/partner2.png", alt: "Partner 2" },
    { id: 3, src: "/assets/partner3.png", alt: "Partner 3" },
    { id: 4, src: "/assets/partner4.png", alt: "Partner 4" },
    { id: 5, src: "/assets/partner5.png", alt: "Partner 5" },
    { id: 6, src: "/assets/partner6.png", alt: "Partner 6" },
    { id: 7, src: "/assets/partner5.png", alt: "Partner 7" },
    { id: 8, src: "/assets/partner4.png", alt: "Partner 8" },
    { id: 9, src: "/assets/partner1.png", alt: "Partner 9" },
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
      setPartnerPage((p) => (p >= partnerMaxPage ? 0 : p + 1));
    }, 4000);
    return () => {
      if (partnerAutoRef.current) clearInterval(partnerAutoRef.current);
    };
  }, [partnerMaxPage]);

  // DEBUG: global image error handler — logs failing src and replaces with placeholder
  useEffect(() => {
    const onImgError = (ev: Event) => {
      const t = ev.target as HTMLImageElement | null;
      if (!t || t.tagName !== "IMG") return;
      // already handled?
      if (t.dataset.fallbackApplied === "1") return;
      console.error("[Image load failed]", t.src);
      // apply fallback and mark so we don't loop
      t.dataset.fallbackApplied = "1";
      t.src = "/assets/placeholder.svg";
    };
    // capture phase ensures we see <img> load errors
    window.addEventListener("error", onImgError, true);
    return () => window.removeEventListener("error", onImgError, true);
  }, []);

  return (
    <div>
      <Hero />

      <section className="quick-highlights container">
        <h2 className="section-title">Quick Higlights</h2>
        

        <div className="home-grid">
          <article className="card" aria-labelledby="featured-leader">
            <div className="media-circle">
              <img
                src="/assets/mumbi Ndung'u.png"
                alt="Featured leader"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.onerror = null;
                  img.src = "/assets/mumbi Ndung'u.png";
                }}
              />
            </div>

            <h3 id="featured-leader" className="card-title">
              <span aria-hidden="true">⭐</span>
              <span>Featured Leader</span>
            </h3>

            <p className="card-body">
              Meet Mumbi Ndung'u, a renowned development specialist and social
              entrepreneur, recognized for her leadership in digital
              development.
            </p>

            <a className="card-link" href="https://live.worldbank.org/en/experts/m/Mumbi-Ndungu">
              Learn more
            </a>
          </article>

          <article className="card" aria-labelledby="upcoming-event">
            <div className="media-square">
              <img
                src="/assets/banner.png"
                alt="Upcoming event illustration"
              />
            </div>

            <h3 id="upcoming-event" className="card-title">
              <span aria-hidden="true">📅</span>
              <span>Upcoming Event</span>
            </h3>

            <p className="card-body">
              Join our virtual workshop on "Public Speaking for Leaders" on July
              15th. Limited spots available!
            </p>

            <a className="card-link" href="/events">
              RSVP
            </a>
          </article>

          <article className="card" aria-labelledby="latest-news">
            <div className="media-square">
              <img
                src="/assets/news.png"
                alt="Latest news illustration"
              />
            </div>

            <h3 id="latest-news" className="card-title">
              <span aria-hidden="true">📰</span>
              <span>Latest News</span>
            </h3>

            <p className="card-body">
              Our new report on the state of women in public service in East
              Africa is now available.
            </p>

            <a className="card-link" href="/news">
              Read
            </a>
          </article>
        </div>
      </section>

      {/* Testimonials & Stories */}
      <section
        aria-labelledby="testimonials-heading"
        className="testimonials-section"
      >
        <div className="container" style={{ maxWidth: 1100 }}>
          <h2 id="testimonials-heading" className="section-title">
            Voices from the network
          </h2>
          <p className="section-subtitle">
            Stories and testimonials from women who’ve used RIseHer —
            mentorship, safety, and opportunities in public life.
          </p>

          <div className="carousel-wrap">
            <div
              className="track"
              style={{
                width: `${pages.length * 100}%`,
                transform: `translateX(-${page * (100 / pages.length)}%)`,
              }}
            >
              {pages.map((pg, pageIndex) => (
                <div
                  key={pageIndex}
                  className="page"
                  aria-hidden={pageIndex !== page}
                  style={{ width: `${100 / pages.length}%` }}
                >
                  <div className="testimonial-grid">
                    {pg.map((t, i) => (
                      <article
                        key={i}
                        className="testimonial-card"
                        aria-label={`Testimonial by ${t.name}`}
                      >
                        <div className="testimonial-header">
                          <img
                            src={t.photo}
                            alt={`${t.name} photo`}
                            className="testimonial-photo"
                            onError={(e) => {
                              const img = e.currentTarget as HTMLImageElement;
                              if (img.dataset.fallbackApplied === "1") return;
                              console.error("[Testimonial image failed]", img.src);
                              img.dataset.fallbackApplied = "1";
                              img.src = "/assets/placeholder.svg";
                            }}
                          />
                          <div className="testimonial-info">
                            <strong className="testimonial-name">
                              {t.name}
                            </strong>
                            <span className="testimonial-role">{t.role}</span>
                          </div>
                        </div>
                        <p className="testimonial-quote">"{t.quote}"</p>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="controls"
              role="tablist"
              aria-label="Testimonial pages"
            >
              {pages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPage(idx)}
                  aria-label={`Go to testimonials page ${idx + 1}`}
                  aria-pressed={idx === page}
                  className={`control-button ${idx === page ? "active" : ""}`}
                />
              ))}
            </div>

            <div
              className="cta-buttons"
              style={{ marginTop: "1rem", justifyContent: "center" }}
            >
              <Link
                to="/join"
                className="cta-button join-button"
                aria-label="Join RIseHer — open join form"
              >
                Join Us
              </Link>
              <Link
                to="/report-harassment"
                className="cta-button report-button"
                aria-label="Report harassment — open reporting form"
              >
                Report Harassment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners carousel */}
      <div className="partners-section partners-modern">
				<div className="container" style={{ maxWidth: 1100 }}>
					<div className="partners-grid">
						<div className="partners-intro">
							
							<h2 className="partners-title">We work with trusted partners</h2>
							<p className="partners-copy">
								We collaborate with organisations across the region to deliver training, safety tools, and funding opportunities.
								Our partners support meetups, mentorship programs and research that advances women’s leadership in public life.
							</p>
							
						</div>

						<div className="partners-logos" aria-hidden={false}>
							{/* show logos in a simple grid. Use partner data where available. */}
							{partners.slice(0, 9).map((p) => (
								<div key={p.id} className="partner-tile" aria-label={p.alt} title={p.alt}>
									<img
										src={p.src}
										alt={p.alt}
										className="partner-logo"
										loading="lazy"
										onError={(e) => {
											const img = e.currentTarget as HTMLImageElement;
											if (img.dataset.fallbackApplied === '1') return;
											img.dataset.fallbackApplied = '1';
											img.src = '/assets/partner-fallback.svg';
										}}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

      {/* Additional home sections (testimonials, map preview, newsletter) can be added here */}
    </div>
  );
}
