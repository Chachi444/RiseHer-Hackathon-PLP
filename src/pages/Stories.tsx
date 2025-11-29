import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Stories() {
  const [form, setForm] = useState({ title: '', body: '', anonymous: false });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => form.title.trim().length > 2 && form.body.trim().length > 10;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatus('error');
      return;
    }
    try {
      const raw = localStorage.getItem('riseher_stories') || '[]';
      const list = JSON.parse(raw);
      list.unshift({ ...form, createdAt: new Date().toISOString() });
      localStorage.setItem('riseher_stories', JSON.stringify(list));
      setForm({ title: '', body: '', anonymous: false });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <main style={{ maxWidth: 860, margin: '2rem auto', padding: 20 }}>
      <h1 style={{ marginTop: 0, color: 'var(--color-deep-purple, #5A007A)' }}>Share Your Story</h1>
      <p style={{ color: '#555' }}>
        Tell us about your experience in public life or public service. You can submit anonymously — we'll review and publish selected stories to inspire others.
      </p>

      <form onSubmit={onSubmit} aria-describedby="stories-status" style={{ marginTop: 12 }}>
        <label style={{ display: 'block', marginTop: 12 }}>
          Title
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            required
            aria-required="true"
            style={{ display: 'block', width: '100%', padding: '.6rem .8rem', borderRadius: 8, border: '1px solid #ddd', marginTop: 6 }}
          />
        </label>

        <label style={{ display: 'block', marginTop: 12 }}>
          Story
          <textarea
            name="body"
            value={form.body}
            onChange={onChange}
            required
            aria-required="true"
            rows={8}
            style={{ display: 'block', width: '100%', padding: '.6rem .8rem', borderRadius: 8, border: '1px solid #ddd', marginTop: 6 }}
          />
        </label>

        <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
          <input name="anonymous" type="checkbox" checked={form.anonymous} onChange={onChange} />
          <span>Submit anonymously</span>
        </label>

        <div style={{ marginTop: 14, display: 'flex', gap: 12 }}>
          <button type="submit" style={{ padding: '.6rem .95rem', background: 'var(--color-gold, #FFD700)', color: 'var(--color-deep-purple, #5A007A)', border: 'none', borderRadius: 8, fontWeight: 800 }}>
            Submit story
          </button>
          <Link to="/visibility" style={{ alignSelf: 'center' }}>Go back</Link>
        </div>

        <div id="stories-status" aria-live="polite" style={{ marginTop: 12 }}>
          {status === 'error' && <div style={{ color: '#c0392b' }}>Please provide a title (3+ chars) and a longer story (10+ chars).</div>}
          {status === 'success' && <div style={{ color: 'green' }}>Thanks — your story was submitted for review.</div>}
        </div>
      </form>
    </main>
  );
}
