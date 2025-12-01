import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

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

  if (!user) {
    return (
      <div className="dash-page">
        <div className="dash-actionCard dash-center">
          <h1 className="dash-welcome">Welcome to RIseHer</h1>
          <p className="dash-lead">Create your profile to access mentorship, resources and a personalized community experience.</p>
          <div className="dash-ctaRow">
            <a href="/join" target="_blank" rel="noopener noreferrer" className="btn-primary">Create your profile</a>
            <a href="/" target="_blank" rel="noopener noreferrer" className="btn-link">Back to home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dash-page">
      <div className="dash-layout">
        {/* Left: profile card */}
        <aside className="profile-card" aria-label="Your profile">
          <div className="profile-row">
            {user.photo ? (
              <img src={user.photo} alt={`${user.name ?? 'Profile'} photo`} className="avatar" />
            ) : (
              <div className="avatar-placeholder">
                {user.name ? user.name.split(' ')[0].slice(0,2).toUpperCase() : 'RH'}
              </div>
            )}
            <div>
              <h2 className="heading">Hello, {user.name ? user.name.split(' ')[0] : 'Member'}</h2>
              <p className="small">{user.role ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)}` : 'Member'} • {user.location || '—'}</p>
            </div>
          </div>

          {/* profile progress blocks */}
          <div className="profile-block">
            <strong className="accent">Profile completeness</strong>
            <div className="progress-wrap" aria-hidden>
              <div className="progress-inner" style={{ width: '78%' }} />
            </div>
            <p className="muted small">Complete your profile to improve matching: add experience, skills and availability.</p>
            <div className="profile-actions">
              <a href="/profile" className="btn-link">Edit profile</a>
              <a href="/mentorship" className="btn-link">Find mentor</a>
            </div>
          </div>

          <div className="profile-block">
            <strong className="accent">Parity goal — 50x50</strong>
            <div className="progress-wrap" aria-hidden>
              <div className="progress-inner" style={{ width: `${parityProgress}%` }} />
            </div>
            <p className="muted small">{parityProgress}% progress toward balanced representation in our tracked programs.</p>
          </div>

          <div className="profile-actions">
            <a href="/settings" className="btn-link">Settings</a>
            <button onClick={signOut} className="btn-link">Sign out</button>
          </div>
        </aside>

        {/* Right: main content */}
        <main>
          <div className="action-card">
            <h3 className="section-title">Your Mentorship Matches</h3>
            <p className="section-lead">We recommend mentors based on your interests. View matches, request an intro, or join the next cohort.</p>
            <div className="grid-two">
              <div className="metric-card">
                <strong>3</strong>
                <div className="metric-label">Recommended mentors</div>
              </div>
              <div className="metric-card">
                <strong>1</strong>
                <div className="metric-label">Pending intros</div>
              </div>
            </div>
            <div className="cta-row">
              <a href="/mentorship" target="_blank" rel="noopener noreferrer" className="btn-primary">View matches</a>
              <a href="/mentorship" target="_blank" rel="noopener noreferrer" className="btn-link">Request intro</a>
            </div>
          </div>

          <div className="action-card">
            <h3 className="section-title">Saved Resources</h3>
            <p className="section-lead">Templates, toolkits and funding opportunities you bookmarked.</p>
            <ul className="resource-list">
              <li>Campaign toolkit — Digital safety</li>
              <li>Leadership workshop recording</li>
              <li>Grant: Women in Civic Leadership</li>
            </ul>
            <div className="cta-row">
              <a href="/resources" target="_blank" rel="noopener noreferrer" className="btn-link">Open resources</a>
            </div>
          </div>

          <div className="grid-two">
            <div className="action-card">
              <h3 className="section-title">Upcoming Events</h3>
              <div className="event-item">
                <div className="event-date">
                  <div className="date-day">Jul 15</div>
                  <div className="date-time">10:00 GMT</div>
                </div>
                <div className="event-details">
                  <div className="event-name">Public Speaking for Leaders</div>
                  <div className="event-meta">Virtual workshop • RSVP required</div>
                </div>
              </div>
              <div className="cta-row">
                <a href="/events" target="_blank" rel="noopener noreferrer" className="btn-primary">RSVP</a>
              </div>
            </div>

            <div className="action-card">
              <h3 className="section-title">Recent Activity</h3>
              <ul className="activity-list">
                <li className="activity-item"><strong>Mentor request accepted</strong> — You were connected with Lara M.</li>
                <li className="activity-item"><strong>New resource</strong> — "Safe Campaigning" guide added.</li>
                <li className="activity-item"><strong>Forum reply</strong> — Thread on regional meetups has new comments.</li>
              </ul>
              <div className="cta-row">
                <a href="/community" target="_blank" rel="noopener noreferrer" className="btn-link">View activity</a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
