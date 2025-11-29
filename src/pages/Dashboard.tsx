import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  // load user from localStorage (demo)
  let user: { name?: string; email?: string; role?: string; location?: string; photo?: string } | null = null;
  try {
    const raw = localStorage.getItem('riseher_user');
    user = raw ? JSON.parse(raw) : null;
  } catch {
    user = null;
  }

  const signOut = () => {
    localStorage.removeItem('riseher_user');
    navigate('/');
  };

  // demo progress toward "50x50" parity goal
  const parityProgress = 32; // percent — replace with real metric

  const page: React.CSSProperties = { maxWidth: 1200, margin: '2rem auto', padding: '1rem', gap: 20, boxSizing: 'border-box' };
  const layout: React.CSSProperties = { display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20, alignItems: 'start' };
  const profileCard: React.CSSProperties = { background: '#fff', padding: 18, borderRadius: 12, boxShadow: '0 10px 30px rgba(16,24,40,0.06)' };
  const avatarStyle: React.CSSProperties = { width: 96, height: 96, borderRadius: 12, objectFit: 'cover', boxShadow: '0 8px 20px rgba(0,0,0,0.12)' };
  const heading: React.CSSProperties = { margin: 0, color: 'var(--color-deep-purple, #5A007A)' };
  const small: React.CSSProperties = { margin: 0, color: 'var(--color-dark-gray, #2E2E2E)', opacity: 0.9, fontSize: '.95rem' };
  const actionCard: React.CSSProperties = { background: '#fff', padding: 18, borderRadius: 12, boxShadow: '0 10px 30px rgba(16,24,40,0.06)' };
  const gridTwo: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 };
  const buttonPrimary: React.CSSProperties = { background: 'var(--color-gold, #FFD700)', color: '#5A007A', padding: '.6rem .9rem', borderRadius: 8, border: 'none', fontWeight: 800, cursor: 'pointer' };
  const linkBtn: React.CSSProperties = { background: 'transparent', border: '1px solid rgba(0,0,0,0.06)', padding: '.5rem .8rem', borderRadius: 8, cursor: 'pointer' };
  const progressBarWrap: React.CSSProperties = { background: 'linear-gradient(90deg,#f1edf8,#fff)', height: 12, borderRadius: 999, overflow: 'hidden', marginTop: 12 };
  const progressInner = (p: number): React.CSSProperties => ({ width: `${p}%`, height: '100%', background: 'linear-gradient(90deg,#ffd700,#cba6f7)', transition: 'width .6s ease' });

  if (!user) {
    return (
      <div style={page}>
        <div style={{ ...actionCard, textAlign: 'center' }}>
          <h1 style={{ marginTop: 0, color: 'var(--color-deep-purple, #5A007A)' }}>Welcome to RIseHer</h1>
          <p style={{ marginTop: 8, marginBottom: 18 }}>Create your profile to access mentorship, resources and a personalized community experience.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <a href="/join" target="_blank" rel="noopener noreferrer" style={buttonPrimary} aria-label="Create your profile (opens in new tab)">Create your profile</a>
            <a href="/" target="_blank" rel="noopener noreferrer" style={linkBtn} aria-label="Back to home (opens in new tab)">Back to home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={page}>
      <div style={layout}>
        {/* Left: profile card */}
        <aside style={profileCard} aria-label="Your profile">
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            {user.photo ? (
              <img src={user.photo} alt={`${user.name ?? 'Profile'} photo`} style={avatarStyle} />
            ) : (
              <div style={{ ...avatarStyle, background: 'linear-gradient(135deg,#cba6f7,#ffd700)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>
                {user.name ? user.name.split(' ')[0].slice(0,2).toUpperCase() : 'RH'}
              </div>
            )}
            <div>
              <h2 style={heading}>Hello, {user.name ? user.name.split(' ')[0] : 'Member'}</h2>
              <p style={small}>{user.role ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)}` : 'Member'} • {user.location || '—'}</p>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <strong style={{ color: 'var(--color-deep-purple, #5A007A)' }}>Profile completeness</strong>
            <div style={progressBarWrap} aria-hidden>
              <div style={progressInner(78)} />
            </div>
            <p style={{ marginTop: 8, marginBottom: 0, fontSize: '.9rem' }}>Complete your profile to improve matching: add experience, skills and availability.</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {/* navigation opens in new tab by default; use full anchors so user can right-click/open as usual */}
              <a href="/profile" target="_blank" rel="noopener noreferrer" style={linkBtn} aria-label="Edit profile (opens in new tab)">Edit profile</a>
              <a href="/mentorship" target="_blank" rel="noopener noreferrer" style={linkBtn} aria-label="Find mentor (opens in new tab)">Find mentor</a>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <strong style={{ color: 'var(--color-deep-purple, #5A007A)' }}>Parity goal — 50x50</strong>
            <div style={progressBarWrap} aria-hidden>
              <div style={progressInner(parityProgress)} />
            </div>
            <p style={{ marginTop: 8, marginBottom: 0, fontSize: '.9rem' }}>{parityProgress}% progress toward balanced representation in our tracked programs.</p>
          </div>

          <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
            <a href="/settings" target="_blank" rel="noopener noreferrer" style={linkBtn} aria-label="Settings (opens in new tab)">Settings</a>
            <button onClick={signOut} style={linkBtn} aria-label="Sign out">Sign out</button>
          </div>
        </aside>

        {/* Right: main content */}
        <main>
          <div style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
            <div style={{ ...actionCard, flex: 1 }}>
              <h3 style={{ marginTop: 0 }}>Your Mentorship Matches</h3>
              <p style={{ marginBottom: 12, color: 'var(--color-dark-gray, #2E2E2E)' }}>We recommend mentors based on your interests. View matches, request an intro, or join the next cohort.</p>
              <div style={gridTwo}>
                <div style={{ padding: 12, borderRadius: 10, background: 'linear-gradient(90deg,#fff,#fbf7ff)' }}>
                  <strong>3</strong>
                  <div style={{ fontSize: '.95rem', color: 'var(--color-dark-gray, #2E2E2E)' }}>Recommended mentors</div>
                </div>
                <div style={{ padding: 12, borderRadius: 10, background: 'linear-gradient(90deg,#fff,#fffaf0)' }}>
                  <strong>1</strong>
                  <div style={{ fontSize: '.95rem', color: 'var(--color-dark-gray, #2E2E2E)' }}>Pending intros</div>
                </div>
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <a href="/mentorship" target="_blank" rel="noopener noreferrer" style={buttonPrimary} aria-label="View mentorship matches (opens in new tab)">View matches</a>
                <a href="/mentorship" target="_blank" rel="noopener noreferrer" style={linkBtn} aria-label="Request an intro (opens in new tab)">Request intro</a>
              </div>
            </div>

            <div style={{ ...actionCard, flex: 1 }}>
              <h3 style={{ marginTop: 0 }}>Saved Resources</h3>
              <p style={{ marginBottom: 12, color: 'var(--color-dark-gray, #2E2E2E)' }}>Templates, toolkits and funding opportunities you bookmarked.</p>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li>Campaign toolkit — Digital safety</li>
                <li>Leadership workshop recording</li>
                <li>Grant: Women in Civic Leadership</li>
              </ul>
              <div style={{ marginTop: 12 }}>
                <a href="/resources" target="_blank" rel="noopener noreferrer" style={linkBtn} aria-label="Open resources (opens in new tab)">Open resources</a>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            <div style={actionCard}>
              <h3 style={{ marginTop: 0 }}>Upcoming Events</h3>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ minWidth: 84 }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Jul 15</div>
                  <div style={{ color: 'var(--color-dark-gray, #2E2E2E)' }}>10:00 GMT</div>
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>Public Speaking for Leaders</div>
                  <div style={{ color: 'var(--color-dark-gray, #2E2E2E)' }}>Virtual workshop • RSVP required</div>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <a href="/events" target="_blank" rel="noopener noreferrer" style={buttonPrimary} aria-label="RSVP for event (opens in new tab)">RSVP</a>
              </div>
            </div>

            <div style={actionCard}>
              <h3 style={{ marginTop: 0 }}>Recent Activity</h3>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li style={{ marginBottom: 8 }}><strong>Mentor request accepted</strong> — You were connected with Lara M.</li>
                <li style={{ marginBottom: 8 }}><strong>New resource</strong> — "Safe Campaigning" guide added.</li>
                <li><strong>Forum reply</strong> — Thread on regional meetups has new comments.</li>
              </ul>
              <div style={{ marginTop: 12 }}>
                <a href="/community" target="_blank" rel="noopener noreferrer" style={linkBtn} aria-label="View community activity (opens in new tab)">View activity</a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
