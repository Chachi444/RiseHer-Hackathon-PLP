import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/join.css';

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

  return (
    <div className="join-page">
      <h1 className="join-title">Join the RIseHer Network</h1>
      <p className="join-lead">
        Sign up to access mentorship, events, resources, and community. We'll never share your personal details without consent.
      </p>

      <form onSubmit={onSubmit} className="join-form" aria-describedby="join-status">
        <div className="form-field">
          <label className="form-label">Profile photo (optional)</label>
          <input id="photo" name="photo" type="file" accept="image/*" onChange={onFileChange} className="form-input" />
          {form.photo && (
            <img
              src={form.photo}
              alt="Profile preview"
              className="join-avatar"
            />
          )}
        </div>

        <div className="form-field">
          <label className="form-label">Full name</label>
          <input id="name" name="name" value={form.name} onChange={onChange} className="form-input" required aria-required="true" />
        </div>

        <div className="form-field">
          <label className="form-label">Email address</label>
          <input id="email" name="email" type="email" value={form.email} onChange={onChange} className="form-input" required aria-required="true" />
        </div>

        <div className="form-field">
          <label className="form-label">I am a</label>
          <select id="role" name="role" value={form.role} onChange={onChange} className="form-input">
            <option value="mentee">Mentee / Emerging leader</option>
            <option value="mentor">Mentor / Sponsor</option>
            <option value="other">Other (ally, organizer)</option>
          </select>
        </div>

        <div className="form-field">
          <label className="form-label">Location (city, country)</label>
          <input id="location" name="location" value={form.location} onChange={onChange} className="form-input" />
        </div>

        <div className="form-field">
          <label className="form-label">Brief bio / areas of interest</label>
          <textarea id="about" name="about" value={form.about} onChange={onChange} rows={4} className="form-input" />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={submitting} aria-label="Sign up">
            {submitting ? 'Signing up…' : 'Sign up'}
          </button>

          {/* Cancel is navigation — use Link for accessible navigation */}
          <Link to="/" className="link cancel" aria-label="Cancel sign up and go home">
            Cancel
          </Link>
        </div>

        <div id="join-status" aria-live="polite" className="join-note">
          {status === 'error' && <span className="error">Please provide a valid name and email.</span>}
          {status === 'success' && <span className="success">Thank you — your sign up was received. Check your email for next steps.</span>}
        </div>
      </form>
    </div>
  );
}
