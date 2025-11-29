import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

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
    <main style={{ maxWidth: 760, margin: '2rem auto', padding: 20 }}>
      <h1 style={{ marginTop: 0 }}>Contact {recipientName || 'the leader'}</h1>
      {recipientEmail && <p style={{ color: '#666' }}>Recipient email (for reference): <strong>{recipientEmail}</strong></p>}
      <p style={{ color: '#555' }}>Use this form to send a secure message through RIseHer. We will deliver the message to the recipient and notify you when they respond.</p>

      <form onSubmit={onSubmit} aria-live="polite" style={{ marginTop: 12 }}>
        <label style={{ display: 'block', marginTop: 10 }}>
          Your name
          <input name="yourName" value={form.yourName} onChange={onChange} required style={{ display: 'block', width: '100%', padding: '.6rem .8rem', borderRadius: 8, marginTop: 6 }} />
        </label>

        <label style={{ display: 'block', marginTop: 10 }}>
          Your email
          <input name="yourEmail" type="email" value={form.yourEmail} onChange={onChange} required style={{ display: 'block', width: '100%', padding: '.6rem .8rem', borderRadius: 8, marginTop: 6 }} />
        </label>

        <label style={{ display: 'block', marginTop: 10 }}>
          Message
          <textarea name="message" value={form.message} onChange={onChange} rows={6} required style={{ display: 'block', width: '100%', padding: '.6rem .8rem', borderRadius: 8, marginTop: 6 }} />
        </label>

        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <button type="submit" style={{ padding: '.6rem .9rem', background: '#5A007A', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700 }}>
            Send message
          </button>
          <Link to="/dashboard" style={{ alignSelf: 'center' }}>Go back</Link>
        </div>

        <div style={{ marginTop: 10 }} aria-live="polite">
          {status === 'error' && <span style={{ color: '#c0392b' }}>Please complete all fields and provide a valid email.</span>}
          {status === 'sent' && <span style={{ color: 'green' }}>Message sent — we will notify you when the recipient replies.</span>}
        </div>
      </form>
    </main>
  );
}
