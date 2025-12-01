import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import '../styles/contact.css';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const recipientName = searchParams.get('name') || '';
  const recipientEmail = searchParams.get('email') || '';

  const [form, setForm] = useState({ yourName: '', yourEmail: '', message: '' });
  const [status, setStatus] = useState<'idle'|'sent'|'error'>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const validate = () => form.yourName.trim().length > 1 && /\S+@\S+\.\S+/.test(form.yourEmail) && form.message.trim().length > 5;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatus('error');
      return;
    }
    try {
      const raw = localStorage.getItem('riseher_messages') || '[]';
      const list = JSON.parse(raw);
      list.unshift({
        toName: recipientName,
        toEmail: recipientEmail,
        fromName: form.yourName,
        fromEmail: form.yourEmail,
        message: form.message,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('riseher_messages', JSON.stringify(list));
      setStatus('sent');
      setForm({ yourName: '', yourEmail: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="contact-page">
      <h1>Contact {recipientName || 'the leader'}</h1>
      {recipientEmail && <p className="muted">Recipient email (for reference): <strong>{recipientEmail}</strong></p>}
      <p className="muted">Use this form to send a secure message through RIseHer. We will deliver the message to the recipient and notify you when they respond.</p>

      <form onSubmit={onSubmit} className="contact-form" aria-live="polite">
        <label className="form-row">
          Your name
          <input name="yourName" value={form.yourName} onChange={onChange} required className="form-input" />
        </label>

        <label className="form-row">
          Your email
          <input name="yourEmail" type="email" value={form.yourEmail} onChange={onChange} required className="form-input" />
        </label>

        <label className="form-row">
          Message
          <textarea name="message" value={form.message} onChange={onChange} rows={6} required className="form-textarea" />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Send message</button>
          <Link to="/dashboard">Go back</Link>
        </div>

        <div className="form-status" aria-live="polite">
          {status === 'error' && <span className="error">Please complete all fields and provide a valid email.</span>}
          {status === 'sent' && <span className="success">Message sent — we will notify you when the recipient replies.</span>}
        </div>
      </form>
    </main>
  );
}
