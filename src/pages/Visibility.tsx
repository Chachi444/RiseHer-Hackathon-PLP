import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/visibility.css'; // import the moved CSS

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

  return (
    <div className="vh-container">
      <header>
        {/* Optional heading */}
        {/* <h1 className="vh-page-header">Visibility & Inspiration</h1> */}
        {/* <p className="vh-subhead">Discover women leaders, share stories...</p> */}
      </header>

      <section aria-label="Visibility map" className="vh-section">
        <div className="vh-card">
          <div className="vh-card-row">
            <div className="vh-map-panel">
              <div className="vh-map-canvas" aria-hidden="false">
                <img src="/assets/visi.png" alt="Map artwork" className="vh-map-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="directory" className="vh-section">
        <div className="vh-dir-head">
          <h2 id="directory" className="vh-page-header">Directory</h2>
          <div className="vh-search-wrap">
            <label htmlFor="dir-search" className="vh-search-label">
              <span className="vh-visually-hidden">Search directory</span>
              <input id="dir-search" aria-label="Search directory" placeholder="Search name, role or region" value={query} onChange={e => setQuery(e.target.value)} className="vh-input" />
            </label>
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true" className="vh-visually-hidden">{results.length} result{results.length !== 1 ? 's' : ''}</div>

        <ul className="vh-dir-list" role="list" aria-label="Directory results">
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
                  className="vh-dir-item"
                >
                  {l.photo ? (
                    <img src={l.photo} alt={`${l.name} profile photo`} className="vh-dir-photo" />
                  ) : (
                    <div aria-hidden className="vh-dir-placeholder" />
                  )}

                  <div className="vh-dir-meta">
                    <h3 id={headingId} className="vh-dir-name">{l.name}</h3>
                    <div className="vh-dir-sub">{l.role} · {l.region}</div>
                  </div>

                  <div className="vh-dir-action">
                    <Link to={l.profile || '#'} aria-label={`Open profile of ${l.name}`} onClick={(e) => e.stopPropagation()} className="vh-view-link">View</Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ===== Data dashboard, Story form and Ask-an-Expert sections (classes applied) ===== */}
      <section aria-labelledby="data-dashboard" className="vh-section">
        <h2 id="data-dashboard" className="vh-page-header">Data dashboard — 50x50 parity</h2>
        <p className="vh-subhead">Key metrics and progress toward balanced representation in our tracked programs.</p>

        <div className="vh-metrics-grid">
          {/* Metric card 1 */}
          <div className="vh-card vh-metric">
            <div className="vh-metric-row">
              <div>
                <div className="vh-metric-value">{stats.programsTracked}</div>
                <div className="vh-metric-label">Programs tracked</div>
              </div>
              <div className="vh-metric-icon icon-gold">
                {/* svg */}
              </div>
            </div>

            <div className="vh-progress-wrap">
              <div className="vh-progress">
                <div className="vh-progress-bar" style={{ width: `${Math.min(100, Math.max(8, Math.round((stats.programsTracked / 100) * 100)))}%` }} />
              </div>
              <div className="vh-progress-caption">Programs tracked across the network</div>
            </div>
          </div>

          {/* Metric card 2 */}
          <div className="vh-card vh-metric">
            <div className="vh-metric-row">
              <div>
                <div className="vh-metric-value">{stats.womenLeaders}</div>
                <div className="vh-metric-label">Women leaders featured</div>
              </div>
              <div className="vh-metric-icon icon-blue">
                {/* svg */}
              </div>
            </div>

            <div className="vh-progress-wrap">
              <div className="vh-progress">
                <div className="vh-progress-bar" style={{ width: `${Math.min(100, Math.round((stats.womenLeaders / 1000) * 100))}%` }} />
              </div>
              <div className="vh-progress-caption">Number of featured women leaders</div>
            </div>
          </div>

          {/* Metric card 3 */}
          <div className="vh-card vh-metric">
            <div className="vh-metric-row">
              <div>
                <div className="vh-metric-value">{stats.parityPercent}%</div>
                <div className="vh-metric-label">Progress toward 50x50</div>
              </div>
              <div className="vh-metric-icon icon-pink">
                {/* svg */}
              </div>
            </div>

            <div className="vh-progress-wrap">
              <div className="vh-progress">
                <div className="vh-progress-bar" style={{ width: `${Math.min(100, stats.parityPercent)}%` }} />
              </div>
              <div className="vh-progress-caption">Current parity progress in tracked programs</div>
            </div>
          </div>
        </div>

        <div className="vh-actions-row">
          <Link to="/resources" className="vh-subtle-btn">View full data</Link>
          <Link to="/mentorship" className="vh-primary-btn">Explore programs</Link>
        </div>
      </section>

      <section aria-labelledby="share-story" className="vh-section">
        <div className="vh-grid-two">
          <div className="vh-card">
            <h2 id="share-story">Share your story</h2>
            <p className="vh-subhead">Inspire others by sharing an experience from public life. You may submit anonymously; we review and publish selected stories.</p>

            <form onSubmit={submitStory} aria-live="polite" className="vh-form">
              <label className="vh-form-row">
                <div className="vh-form-label">Title</div>
                <input value={story.title} onChange={e => setStory(s => ({ ...s, title: e.target.value }))} className="vh-input" placeholder="Short, descriptive title" />
              </label>

              <label className="vh-form-row">
                <div className="vh-form-label">Your story</div>
                <textarea value={story.body} onChange={e => setStory(s => ({ ...s, body: e.target.value }))} rows={6} className="vh-textarea" placeholder="Tell us what happened and what you learned" />
              </label>

              <label className="vh-checkbox-row">
                <input type="checkbox" checked={story.anonymous} onChange={e => setStory(s => ({ ...s, anonymous: e.target.checked }))} />
                <span>Submit anonymously</span>
              </label>

              <div className="vh-form-actions">
                <button type="submit" className="vh-primary-btn">Submit story</button>
                <Link to="/stories" className="vh-subtle-btn" aria-label="View stories">View stories</Link>
              </div>

              <div aria-live="polite" className="vh-feedback">
                {storyStatus === 'error' && <div className="vh-error">Please add a title and story before submitting.</div>}
                {storyStatus === 'success' && <div className="vh-success">Thanks — your story was submitted for review.</div>}
              </div>
            </form>
          </div>

          <aside>
            <div className="vh-card">
              <strong className="vh-strong">Submission tips</strong>
              <ul className="vh-tips">
                <li>Be specific about what happened and where.</li>
                <li>Include steps others can take or lessons learned.</li>
                <li>Remove personal details if submitting anonymously.</li>
              </ul>
              <div className="vh-cta">
                <Link to="/report-harassment" className="vh-primary-btn" aria-label="Report harassment">Report Harassment (urgent)</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="ask-expert" className="vh-section">
        <div className="vh-card">
          <h2 id="ask-expert">Ask an Expert</h2>
          <p className="vh-subhead">Submit a question and our panel will respond with guidance or resources.</p>

          <form onSubmit={sendQuestion} className="vh-form vh-form-grid">
            <label>
              <div className="vh-form-label">Topic</div>
              <input value={question.topic} onChange={e => setQuestion(q => ({ ...q, topic: e.target.value }))} className="vh-input" placeholder="e.g. Digital safety, fundraising" />
            </label>

            <label>
              <div className="vh-form-label">Question</div>
              <textarea value={question.text} onChange={e => setQuestion(q => ({ ...q, text: e.target.value }))} rows={4} className="vh-textarea" placeholder="Describe your situation and what guidance you need" />
            </label>

            <div className="vh-form-actions">
              <button type="submit" className="vh-primary-btn alt">Send question</button>
              <button type="button" onClick={() => { setQuestion({ topic: '', text: '' }); setQStatus('idle'); }} className="vh-subtle-btn">Clear</button>
            </div>

            <div aria-live="polite" className="vh-feedback">
              {qStatus === 'error' && <span className="vh-error">Please complete both fields.</span>}
              {qStatus === 'sent' && <span className="vh-success">Question sent. Experts will reply via email.</span>}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
