import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/profile.css';

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
    <div className="profile-page">
      <h1>Edit Profile</h1>
      <form onSubmit={onSave} className="profile-form">
        <label className="form-row">
          Full name
          <input name="name" value={user.name || ''} onChange={onChange} className="form-input" />
        </label>

        <label className="form-row">
          Email
          <input name="email" type="email" value={user.email || ''} onChange={onChange} className="form-input" />
        </label>

        <label className="form-row">
          Role
          <select name="role" value={user.role || 'mentee'} onChange={onChange} className="form-input">
            <option value="mentee">Mentee</option>
            <option value="mentor">Mentor</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label className="form-row">
          Location
          <input name="location" value={user.location || ''} onChange={onChange} className="form-input" />
        </label>

        <label className="form-row">
          About / interests
          <textarea name="about" value={user.about || ''} onChange={onChange} rows={4} className="form-textarea" />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Save</button>
          <Link to="/dashboard" className="link">Go back</Link>
        </div>

        {status === 'saved' && <div className="success">Profile saved</div>}
      </form>
    </div>
  );
}
