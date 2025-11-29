import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function MentorshipRequest() {
  const [searchParams] = useSearchParams();
  const mentorIdParam = searchParams.get('mentorId');

  // same mentor set (keep in sync with Mentorship/MentorProfile)
  const mentors = [
    { id: 1, name: 'Lara Mensah' },
    { id: 2, name: 'Aisha Gomez' },
    { id: 3, name: 'Nora Okoye' },
  ];

  const initial = {
    name: '',
    email: '',
    message: '',
    mentorId: mentorIdParam ? Number(mentorIdParam) : mentors[0].id,
  };

  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<'idle'|'success'|'error'>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'mentorId' ? Number(value) : value }));
  };

  const validate = () => form.name.trim().length > 1 && /\S+@\S+\.\S+/.test(form.email) && form.message.trim().length > 5;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatus('error');
      return;
    }
    // persist request to localStorage (simple demo)
    try {
      const raw = localStorage.getItem('riseher_requests');
      const list = raw ? JSON.parse(raw) : [];
      list.push({ ...form, createdAt: new Date().toISOString() });
      localStorage.setItem('riseher_requests', JSON.stringify(list));
      setStatus('success');
      setForm(initial);
    } catch (err) {
      setStatus('error');
    }
  };

  const selectedMentor = mentors.find(m => m.id === form.mentorId);

  return (
    <div style={{ maxWidth: 760, margin: '2rem auto', padding: 20 }}>
      <h1 style={{ marginTop: 0 }}>Request an introduction</h1>
      <p style={{ color: '#555' }}>Fill this form to request an intro to a mentor. We will send your request and follow up by email.</p>

      <form onSubmit={onSubmit} aria-describedby="request-status" style={{ marginTop: 12 }}>
        <label style={{ display: 'block', marginBottom: 10 }}>
          Mentor
          <select name="mentorId" value={form.mentorId} onChange={onChange} style={{ display: 'block', width: '100%', padding: '.6rem .8rem', borderRadius: 8, marginTop: 6 }}>
            {mentors.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: 10 }}>
          Your name
          <input name="name" value={form.name} onChange={onChange} style={{ display: 'block', width: '100%', padding: '.6rem .8rem', borderRadius: 8, marginTop: 6 }} required />
        </label>

        <label style={{ display: 'block', marginBottom: 10 }}>
          Your email
          <input name="email" type="email" value={form.email} onChange={onChange} style={{ display: 'block', width: '100%', padding: '.6rem .8rem', borderRadius: 8, marginTop: 6 }} required />
        </label>

        <label style={{ display: 'block', marginBottom: 10 }}>
          Message / context
          <textarea name="message" value={form.message} onChange={onChange} rows={5} style={{ display: 'block', width: '100%', padding: '.6rem .8rem', borderRadius: 8, marginTop: 6 }} required />
        </label>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button type="submit" style={{ padding: '.6rem .9rem', background: '#5A007A', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700 }}>Send request</button>
          <Link to={`/mentorship/profile/${selectedMentor?.id || mentors[0].id}`} aria-label="Back to mentor profile">Back to profile</Link>
        </div>

        <div id="request-status" aria-live="polite" style={{ marginTop: 12 }}>
          {status === 'error' && <div style={{ color: '#c0392b' }}>Please complete the form correctly.</div>}
          {status === 'success' && <div style={{ color: 'green' }}>Request sent. We'll notify you by email when there's an update.</div>}
        </div>
      </form>
    </div>
  );
}
