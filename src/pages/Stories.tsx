import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/stories.css';

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
    <main className="stories-page">
      <h1 className="stories-title">Share Your Story</h1>
      <p className="stories-lead">
        Tell us about your experience in public life or public service. You can submit anonymously — we'll review and publish selected stories to inspire others.
      </p>

      <form onSubmit={onSubmit} className="stories-form" aria-describedby="stories-status">
        <label className="form-row">
          Title
          <input name="title" value={form.title} onChange={onChange} required className="form-input" />
        </label>

        <label className="form-row">
          Story
          <textarea name="body" value={form.body} onChange={onChange} required rows={8} className="form-textarea" />
        </label>

        <label className="form-checkbox">
          <input name="anonymous" type="checkbox" checked={form.anonymous} onChange={onChange} />
          <span>Submit anonymously</span>
        </label>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Submit story</button>
          <Link to="/visibility" className="link">Go back</Link>
        </div>

        <div id="stories-status" aria-live="polite" className="form-status">
          {status === 'error' && <div className="error">Please provide a title (3+ chars) and a longer story (10+ chars).</div>}
          {status === 'success' && <div className="success">Thanks — your story was submitted for review.</div>}
        </div>
      </form>
    </main>
  );
}
