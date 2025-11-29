import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Join() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'mentee',
    location: '',
    about: '',
    photo: '', // data URL of uploaded image
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle'|'success'|'error'>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // handle image file input -> store data URL in form.photo
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, photo: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    return form.name.trim().length >= 2 && /\S+@\S+\.\S+/.test(form.email);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatus('error');
      return;
    }
    setSubmitting(true);
    setStatus('idle');

    // Placeholder for real API call
    setTimeout(() => {
      setSubmitting(false);
      setStatus('success');
      // persist basic profile (including photo data URL) locally for the demo dashboard and navigate there
      try {
        localStorage.setItem('riseher_user', JSON.stringify(form));
      } catch (err) {
        /* ignore storage errors for now */
      }
      navigate('/dashboard');
    }, 900);
  };

  const formWrap: React.CSSProperties = { maxWidth: 760, margin: '2rem auto', padding: '1.25rem' };
  const field: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 };
  const labelStyle: React.CSSProperties = { fontWeight: 700, color: 'var(--color-deep-purple, #5A007A)' };
  const inputStyle: React.CSSProperties = { padding: '0.65rem .9rem', borderRadius: 8, border: '1px solid #DDD', fontSize: '1rem' };
  const submitStyle: React.CSSProperties = { background: '#FFD700', color: '#5A007A', padding: '.7rem 1.1rem', borderRadius: 10, border: 'none', fontWeight: 800, cursor: 'pointer' };
  const noteStyle: React.CSSProperties = { marginTop: 12, color: 'var(--color-dark-gray, #2E2E2E)', opacity: 0.9 };

  return (
    <div style={formWrap}>
      <h1 style={{ marginTop: 0, color: 'var(--color-deep-purple, #5A007A)' }}>Join the RIseHer Network</h1>
      <p style={{ marginTop: 0, marginBottom: 12 }}>
        Sign up to access mentorship, events, resources, and community. We'll never share your personal details without consent.
      </p>

      <form onSubmit={onSubmit} aria-describedby="join-status">
        <div style={field}>
          <label htmlFor="photo" style={labelStyle}>Profile photo (optional)</label>
          <input id="photo" name="photo" type="file" accept="image/*" onChange={onFileChange} style={inputStyle} />
          {form.photo && (
            <img
              src={form.photo}
              alt="Profile preview"
              style={{ width: 88, height: 88, objectFit: 'cover', borderRadius: 12, marginTop: 10, border: '2px solid rgba(0,0,0,0.06)' }}
            />
          )}
        </div>

        <div style={field}>
          <label htmlFor="name" style={labelStyle}>Full name</label>
          <input id="name" name="name" value={form.name} onChange={onChange} style={inputStyle} required aria-required="true" />
        </div>

        <div style={field}>
          <label htmlFor="email" style={labelStyle}>Email address</label>
          <input id="email" name="email" type="email" value={form.email} onChange={onChange} style={inputStyle} required aria-required="true" />
        </div>

        <div style={field}>
          <label htmlFor="role" style={labelStyle}>I am a</label>
          <select id="role" name="role" value={form.role} onChange={onChange} style={inputStyle}>
            <option value="mentee">Mentee / Emerging leader</option>
            <option value="mentor">Mentor / Sponsor</option>
            <option value="other">Other (ally, organizer)</option>
          </select>
        </div>

        <div style={field}>
          <label htmlFor="location" style={labelStyle}>Location (city, country)</label>
          <input id="location" name="location" value={form.location} onChange={onChange} style={inputStyle} />
        </div>

        <div style={field}>
          <label htmlFor="about" style={labelStyle}>Brief bio / areas of interest</label>
          <textarea id="about" name="about" value={form.about} onChange={onChange} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button type="submit" style={submitStyle} disabled={submitting}>
            {submitting ? 'Signing up…' : 'Sign up'}
          </button>

          <button type="button" onClick={() => navigate(-1)} style={{ background: 'transparent', border: 'none', color: 'var(--color-deep-purple, #5A007A)', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>

        <div id="join-status" aria-live="polite" style={noteStyle}>
          {status === 'error' && <span style={{ color: '#D9534F' }}>Please provide a valid name and email.</span>}
          {status === 'success' && <span style={{ color: 'green' }}>Thank you — your sign up was received. Check your email for next steps.</span>}
        </div>
      </form>
    </div>
  );
}
