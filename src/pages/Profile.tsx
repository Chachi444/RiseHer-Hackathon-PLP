import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type User = { name?: string; email?: string; role?: string; location?: string; about?: string; photo?: string };

export default function Profile() {
  const [user, setUser] = useState<User>({});
  const [status, setStatus] = useState<'idle'|'saved'>('idle');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('riseher_user');
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((u) => ({ ...u, [name]: value }));
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('riseher_user', JSON.stringify(user));
      setStatus('saved');
      setTimeout(()=>setStatus('idle'),1500);
    } catch {}
  };

  return (
    <div style={{ maxWidth: 760, margin: '2rem auto', padding: 20 }}>
      <h1>Edit Profile</h1>
      <form onSubmit={onSave}>
        <label style={{ display: 'block', marginTop: 12 }}>
          Full name
          <input name="name" value={user.name || ''} onChange={onChange} style={{ display: 'block', width: '100%', padding: '.6rem .8rem', borderRadius: 8, marginTop: 6 }} />
        </label>

        <label style={{ display: 'block', marginTop: 12 }}>
          Email
          <input name="email" type="email" value={user.email || ''} onChange={onChange} style={{ display: 'block', width: '100%', padding: '.6rem .8rem', borderRadius: 8, marginTop: 6 }} />
        </label>

        <label style={{ display: 'block', marginTop: 12 }}>
          Role
          <select name="role" value={user.role || 'mentee'} onChange={onChange} style={{ display: 'block', width: '100%', padding: '.6rem .8rem', borderRadius: 8, marginTop: 6 }}>
            <option value="mentee">Mentee</option>
            <option value="mentor">Mentor</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label style={{ display: 'block', marginTop: 12 }}>
          Location
          <input name="location" value={user.location || ''} onChange={onChange} style={{ display: 'block', width: '100%', padding: '.6rem .8rem', borderRadius: 8, marginTop: 6 }} />
        </label>

        <label style={{ display: 'block', marginTop: 12 }}>
          About / interests
          <textarea name="about" value={user.about || ''} onChange={onChange} rows={4} style={{ display: 'block', width: '100%', padding: '.6rem .8rem', borderRadius: 8, marginTop: 6 }} />
        </label>

        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <button type="submit" style={{ padding: '.6rem .9rem', background: '#FFD700', color: '#5A007A', borderRadius: 8, border: 'none', fontWeight: 800 }}>Save</button>
          <Link to="/dashboard" aria-label="Go back to dashboard" style={{ alignSelf: 'center' }}>Go back</Link>
        </div>

        {status === 'saved' && <div style={{ marginTop: 10, color: 'green' }}>Profile saved</div>}
      </form>
    </div>
  );
}
