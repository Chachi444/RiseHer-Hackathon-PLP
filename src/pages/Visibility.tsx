import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type Leader = { id: number; name: string; role: string; region: string; photo?: string; profile?: string };

export default function Visibility() {
  // sample directory (swap photos in public/assets as needed)
  const initial: Leader[] = [
    { id: 1, name: 'Charity O.', role: 'Councilwoman', region: 'Kigali', photo: '/assets/one.jpg', profile: '/leaders/charity-o' },
    { id: 2, name: 'Beatrice N.', role: 'Community Organizer', region: 'Nairobi', photo: '/assets/one.jpg', profile: '/leaders/beatrice-n' },
    { id: 3, name: 'Chloe M.', role: 'Policy Lead', region: 'Accra', photo: '/assets/one.jpg', profile: '/leaders/chloe-m' },
  ];

  const [query, setQuery] = useState('');
  const [leaders] = useState<Leader[]>(initial);
  const navigate = useNavigate();

  // --- Missing state / helpers fixed (prevent runtime errors) ---
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [zoom, setZoom] = useState<number>(1);
  // derive available regions from leaders
  const regions = useMemo(() => ['All', ...Array.from(new Set(leaders.map(l => l.region)))], [leaders]);
  // visually hidden helper for screen-reader only text
  const visuallyHidden: React.CSSProperties = { position: 'absolute', left: -9999, top: 'auto', width: 1, height: 1, overflow: 'hidden' };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leaders;
    return leaders.filter(l => l.name.toLowerCase().includes(q) || l.role.toLowerCase().includes(q) || l.region.toLowerCase().includes(q));
  }, [query, leaders]);

  // Storytelling form (anonymous option)
  const [story, setStory] = useState({ title: '', body: '', anonymous: false });
  const [storyStatus, setStoryStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const submitStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!story.title.trim() || !story.body.trim()) {
      setStoryStatus('error');
      return;
    }
    try {
      const raw = localStorage.getItem('riseher_stories') || '[]';
      const list = JSON.parse(raw);
      list.unshift({ ...story, createdAt: new Date().toISOString() });
      localStorage.setItem('riseher_stories', JSON.stringify(list));
      setStory({ title: '', body: '', anonymous: false });
      setStoryStatus('success');
    } catch {
      setStoryStatus('error');
    }
  };

  // Ask an Expert
  const [question, setQuestion] = useState({ topic: '', text: '' });
  const [qStatus, setQStatus] = useState<'idle'|'sent'|'error'>('idle');
  const sendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.topic.trim() || !question.text.trim()) { setQStatus('error'); return; }
    try {
      const raw = localStorage.getItem('riseher_questions') || '[]';
      const list = JSON.parse(raw);
      list.unshift({ ...question, createdAt: new Date().toISOString() });
      localStorage.setItem('riseher_questions', JSON.stringify(list));
      setQuestion({ topic: '', text: '' });
      setQStatus('sent');
    } catch {
      setQStatus('error');
    }
  };

  // simple stats for 50x50 dashboard
  const stats = { programsTracked: 42, womenLeaders: 780, parityPercent: 38 };

  // Replace the previous visuallyHidden and ad-hoc inline style objects with these refined styles
  const containerStyle: React.CSSProperties = { maxWidth: 1100, margin: '1.5rem auto', padding: 20, fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' };
  const pageHeaderStyle: React.CSSProperties = { margin: 0, fontSize: '1.5rem', color: 'var(--color-deep-purple, #5A007A)' };
  const subHeadStyle: React.CSSProperties = { color: '#555', marginTop: 6 };

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 14px 40px rgba(16,24,40,0.06)',
    padding: 16,
    border: '1px solid rgba(16,24,40,0.04)',
  };

  const mapPanelStyle: React.CSSProperties = {
    display: 'flex',
    gap: 16,
    alignItems: 'stretch',
    marginTop: 12,
    width: '100%',
  };

  const mapCanvasStyle: React.CSSProperties = {
    flex: 1,
    minHeight: 320,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    background: 'linear-gradient(180deg,#f6f0ff,#fff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const controlGroupStyle: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' };
  const inputStyle: React.CSSProperties = {
    padding: '.55rem .75rem',
    borderRadius: 8,
    border: '1px solid #E6E6F0',
    width: '100%',
    boxSizing: 'border-box',
  };

  const primaryBtn: React.CSSProperties = {
    padding: '.6rem .85rem',
    background: 'linear-gradient(90deg,var(--color-gold,#FFD700),#f0c800)',
    color: 'var(--color-deep-purple,#5A007A)',
    border: 'none',
    borderRadius: 8,
    fontWeight: 800,
    cursor: 'pointer',
  };

  const subtleBtn: React.CSSProperties = {
    padding: '.5rem .75rem',
    background: 'transparent',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: 8,
    cursor: 'pointer',
  };

  const dirListStyle: React.CSSProperties = {
    marginTop: 14,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
    gap: 12,
  };

  const dirItemStyle = (isFocused = false): React.CSSProperties => ({
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    background: '#fff',
    boxShadow: isFocused ? '0 18px 40px rgba(90,0,122,0.08)' : '0 8px 20px rgba(0,0,0,0.04)',
    border: '1px solid rgba(0,0,0,0.04)',
    cursor: 'pointer',
    transition: 'transform .18s ease, box-shadow .18s ease',
    transform: isFocused ? 'translateY(-6px)' : 'translateY(0)',
  });

  const viewLinkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: 'var(--color-deep-purple,#5A007A)',
    fontWeight: 700,
    padding: '.45rem .65rem',
    borderRadius: 8,
    border: '1px solid rgba(90,0,122,0.06)',
    background: 'transparent',
  };

  return (
    <div style={containerStyle}>
      <header>
       {/* <h1 style={pageHeaderStyle}>Visibility & Inspiration</h1> */}
        {/*<p style={subHeadStyle}>Discover women leaders, share stories (anonymous option), and explore visibility tools to amplify voices.</p>*/}
      </header>

      {/* Map / banner (upgraded card) */}
      <section aria-label="Visibility map" style={{ marginTop: 18 }}>
        <div style={{ ...cardStyle }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={mapPanelStyle}>
              <div style={mapCanvasStyle} aria-hidden="false">
                {/* Map artwork or interactive map goes here */}
                <img src="/assets/visi.png" alt="Map artwork" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.98 }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory & search (refined card list) */}
      <section aria-labelledby="directory" style={{ marginTop: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 id="directory" style={pageHeaderStyle}>Directory</h2>
          <div style={{ width: 320 }}>
            <label htmlFor="dir-search" style={{ display: 'block' }}>
              <span style={visuallyHidden}>Search directory</span>
              <input id="dir-search" aria-label="Search directory" placeholder="Search name, role or region" value={query} onChange={e => setQuery(e.target.value)} style={inputStyle} />
            </label>
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true" style={visuallyHidden}>{results.length} result{results.length !== 1 ? 's' : ''}</div>

        <ul style={dirListStyle} role="list" aria-label="Directory results">
          {results.map(l => {
            const headingId = `leader-${l.id}-name`;
            const onKeyDown = (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (l.profile) navigate(l.profile);
              }
            };
            return (
              <li key={l.id}>
                <article
                  role="article"
                  aria-labelledby={headingId}
                  tabIndex={0}
                  onKeyDown={onKeyDown}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                  style={dirItemStyle(false)}
                >
                  {l.photo ? (
                    <img src={l.photo} alt={`${l.name} profile photo`} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 10, flex: '0 0 72px' }} />
                  ) : (
                    <div aria-hidden style={{ width: 72, height: 72, borderRadius: 10, background: '#EEE', flex: '0 0 72px' }} />
                  )}

                  <div style={{ flex: 1 }}>
                    <h3 id={headingId} style={{ margin: 0, fontSize: '1rem' }}>{l.name}</h3>
                    <div style={{ color: '#666', fontSize: '.95rem' }}>{l.role} · {l.region}</div>
                  </div>

                  <div style={{ marginLeft: 12 }}>
                    <Link to={l.profile || '#'} aria-label={`Open profile of ${l.name}`} onClick={(e) => e.stopPropagation()} style={viewLinkStyle}>View</Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      { /* ===== refined Data dashboard, Story form and Ask-an-Expert sections START ===== */ }
<section aria-labelledby="data-dashboard" style={{ marginTop: 28 }}>
  <h2 id="data-dashboard" style={{ margin: 0, ...pageHeaderStyle }}>Data dashboard — 50x50 parity</h2>
  <p style={{ color: '#666', marginTop: 8 }}>Key metrics and progress toward balanced representation in our tracked programs.</p>

  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, marginTop: 12 }}>
    {/* Metric card */}
    <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>{stats.programsTracked}</div>
          <div style={{ color: '#666' }}>Programs tracked</div>
        </div>
        <div style={{ background: 'linear-gradient(90deg,#fef3c7,#fdd49a)', padding: 10, borderRadius: 8 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M4 19h16" stroke="#5A007A" strokeWidth="2" strokeLinecap="round"/><path d="M7 11v8" stroke="#5A007A" strokeWidth="2" strokeLinecap="round"/><path d="M12 6v13" stroke="#5A007A" strokeWidth="2" strokeLinecap="round"/><path d="M17 15v4" stroke="#5A007A" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      </div>

      <div style={{ marginTop: 6 }}>
        <div style={{ height: 10, borderRadius: 999, background: '#f2f0fb', overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(100, Math.max(8, Math.round((stats.programsTracked / 100) * 100)))}%`, height: '100%', background: 'linear-gradient(90deg,#ffd700,#cba6f7)' }} />
        </div>
        <div style={{ color: '#666', marginTop: 8, fontSize: '.9rem' }}>Programs tracked across the network</div>
      </div>
    </div>

    <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>{stats.womenLeaders}</div>
          <div style={{ color: '#666' }}>Women leaders featured</div>
        </div>
        <div style={{ background: 'linear-gradient(90deg,#e6f7ff,#d4efff)', padding: 10, borderRadius: 8 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3" stroke="#5A007A" strokeWidth="1.5"/><path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#5A007A" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
      </div>

      <div style={{ marginTop: 6 }}>
        <div style={{ height: 10, borderRadius: 999, background: '#f2f0fb', overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(100, Math.round((stats.womenLeaders / 1000) * 100))}%`, height: '100%', background: 'linear-gradient(90deg,#ffd700,#cba6f7)' }} />
        </div>
        <div style={{ color: '#666', marginTop: 8, fontSize: '.9rem' }}>Number of featured women leaders</div>
      </div>
    </div>

    <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>{stats.parityPercent}%</div>
          <div style={{ color: '#666' }}>Progress toward 50x50</div>
        </div>
        <div style={{ background: 'linear-gradient(90deg,#fff0f6,#f9e6ff)', padding: 10, borderRadius: 8 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 3v18" stroke="#5A007A" strokeWidth="1.5"/><path d="M8 7h8" stroke="#5A007A" strokeWidth="1.5"/></svg>
        </div>
      </div>

      <div style={{ marginTop: 6 }}>
        <div style={{ height: 10, borderRadius: 999, background: '#f2f0fb', overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(100, stats.parityPercent)}%`, height: '100%', background: 'linear-gradient(90deg,#ffd700,#cba6f7)' }} />
        </div>
        <div style={{ color: '#666', marginTop: 8, fontSize: '.9rem' }}>Current parity progress in tracked programs</div>
      </div>
    </div>
  </div>

  <div style={{ display: 'flex', gap: 12, marginTop: 14, justifyContent: 'flex-end' }}>
    <Link to="/resources" style={{ ...subtleBtn, textDecoration: 'none' }}>View full data</Link>
    <Link to="/mentorship" style={{ ...primaryBtn, textDecoration: 'none' }}>Explore programs</Link>
  </div>
</section>

<section aria-labelledby="share-story" style={{ marginTop: 28 }}>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16 }}>
    <div style={{ ...cardStyle }}>
      <h2 id="share-story" style={{ marginTop: 0 }}>Share your story</h2>
      <p style={{ color: '#555', marginTop: 6 }}>Inspire others by sharing an experience from public life. You may submit anonymously; we review and publish selected stories.</p>

      <form onSubmit={submitStory} aria-live="polite" style={{ marginTop: 12 }}>
        <label style={{ display: 'block', marginBottom: 10 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Title</div>
          <input value={story.title} onChange={e => setStory(s => ({ ...s, title: e.target.value }))} style={inputStyle} placeholder="Short, descriptive title" />
        </label>

        <label style={{ display: 'block', marginBottom: 10 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Your story</div>
          <textarea value={story.body} onChange={e => setStory(s => ({ ...s, body: e.target.value }))} rows={6} style={{ ...inputStyle, minHeight: 160 }} placeholder="Tell us what happened and what you learned" />
        </label>

        <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <input type="checkbox" checked={story.anonymous} onChange={e => setStory(s => ({ ...s, anonymous: e.target.checked }))} />
          <span>Submit anonymously</span>
        </label>

        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" style={primaryBtn}>Submit story</button>
          <Link to="/stories" style={{ ...subtleBtn, textDecoration: 'none', alignSelf: 'center' }}>View stories</Link>
        </div>

        <div aria-live="polite" style={{ marginTop: 10 }}>
          {storyStatus === 'error' && <div style={{ color: '#c0392b' }}>Please add a title and story before submitting.</div>}
          {storyStatus === 'success' && <div style={{ color: 'green' }}>Thanks — your story was submitted for review.</div>}
        </div>
      </form>
    </div>

    <aside>
      <div style={{ ...cardStyle }}>
        <strong style={{ display: 'block', marginBottom: 8 }}>Submission tips</strong>
        <ul style={{ margin: 0, paddingLeft: 18, color: '#555' }}>
          <li>Be specific about what happened and where.</li>
          <li>Include steps others can take or lessons learned.</li>
          <li>Remove personal details if submitting anonymously.</li>
        </ul>
        <div style={{ marginTop: 12 }}>
          <Link to="/report-harassment" style={{ ...primaryBtn, textDecoration: 'none' }} aria-label="Report harassment">Report Harassment (urgent)</Link>
        </div>
      </div>
    </aside>
  </div>
</section>

<section aria-labelledby="ask-expert" style={{ marginTop: 28, marginBottom: 40 }}>
  <div style={{ ...cardStyle }}>
    <h2 id="ask-expert" style={{ marginTop: 0 }}>Ask an Expert</h2>
    <p style={{ color: '#555' }}>Submit a question and our panel will respond with guidance or resources.</p>

    <form onSubmit={sendQuestion} style={{ marginTop: 12, display: 'grid', gap: 12, maxWidth: 720 }}>
      <label>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Topic</div>
        <input value={question.topic} onChange={e => setQuestion(q => ({ ...q, topic: e.target.value }))} style={inputStyle} placeholder="e.g. Digital safety, fundraising" />
      </label>

      <label>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Question</div>
        <textarea value={question.text} onChange={e => setQuestion(q => ({ ...q, text: e.target.value }))} rows={4} style={{ ...inputStyle, minHeight: 120 }} placeholder="Describe your situation and what guidance you need" />
      </label>

      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit" style={{ ...primaryBtn, background: '#FFD700' }}>Send question</button>
        <button type="button" onClick={() => { setQuestion({ topic: '', text: '' }); setQStatus('idle'); }} style={subtleBtn}>Clear</button>
      </div>

      <div aria-live="polite" style={{ marginTop: 6 }}>
        {qStatus === 'error' && <span style={{ color: '#c0392b' }}>Please complete both fields.</span>}
        {qStatus === 'sent' && <span style={{ color: 'green' }}>Question sent. Experts will reply via email.</span>}
      </div>
    </form>
  </div>
</section>
{ /* ===== refined sections END ===== */ }
    </div>
   );
}
