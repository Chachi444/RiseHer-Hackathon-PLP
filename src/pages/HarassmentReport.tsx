import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Evidence = { name: string; dataUrl: string; type: string; size: number };

export default function HarassmentReport() {
  const [form, setForm] = useState({
    reporterName: '',
    email: '',
    incidentDate: '',
    location: '',
    description: '',
    anonymous: false,
    consent: false,
  });
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const toRead = Array.from(files).slice(0, 5); // limit to 5 files
    const readers = toRead.map(file => {
      return new Promise<Evidence | null>(resolve => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({ name: file.name, dataUrl: String(reader.result), type: file.type, size: file.size });
        };
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(results => {
      const valid = results.filter(Boolean) as Evidence[];
      setEvidence(prev => [...prev, ...valid].slice(0, 5));
    });
    // clear input value to allow re-uploading same file if needed
    e.currentTarget.value = '';
  };

  const removeEvidence = (idx: number) => setEvidence(prev => prev.filter((_, i) => i !== idx));

  const validate = () => {
    if (!form.description.trim()) {
      setErrorMsg('Please provide a description of the incident.');
      return false;
    }
    if (!form.consent) {
      setErrorMsg('Please confirm you consent to submit this report for review.');
      return false;
    }
    return true;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!validate()) {
      setStatus('error');
      return;
    }
    setStatus('saving');
    try {
      const raw = localStorage.getItem('riseher_harassment_reports') || '[]';
      const list = JSON.parse(raw);
      const payload = {
        id: `r_${Date.now()}`,
        reporterName: form.anonymous ? 'Anonymous' : form.reporterName.trim() || 'Anonymous',
        email: form.email.trim() || '',
        incidentDate: form.incidentDate || new Date().toISOString(),
        location: form.location || '',
        description: form.description.trim(),
        evidence,
        consent: form.consent,
        createdAt: new Date().toISOString(),
        status: 'submitted',
      };
      list.unshift(payload);
      localStorage.setItem('riseher_harassment_reports', JSON.stringify(list));
      setStatus('success');
      setForm({ reporterName: '', email: '', incidentDate: '', location: '', description: '', anonymous: false, consent: false });
      setEvidence([]);
      setTimeout(() => setStatus('idle'), 1800);
    } catch (err) {
      setStatus('error');
      setErrorMsg('Unable to save the report. Try again.');
    }
  };

  return (
    <main style={{ maxWidth: 820, margin: '2rem auto', padding: 20 }}>
      <h1 style={{ marginTop: 0, color: 'var(--color-deep-purple, #5A007A)' }}>Report harassment</h1>
      <p style={{ color: '#444' }}>
        If you or someone you know experienced harassment in public life, please use this form to submit a report and any evidence you have.
        Submissions are reviewed and acted on by our safety team. You may submit anonymously. If you need immediate assistance, contact local emergency services.
      </p>

      <form onSubmit={onSubmit} aria-describedby="harassment-status" style={{ marginTop: 12 }}>
        <fieldset style={{ border: 'none', padding: 0 }}>
          <legend style={{ fontWeight: 700 }}>Reporter (optional)</legend>

          <label style={{ display: 'block', marginTop: 10 }}>
            Your name
            <input name="reporterName" value={form.reporterName} onChange={onChange} disabled={form.anonymous} style={{ display: 'block', width: '100%', padding: '.6rem .8rem', marginTop: 6, borderRadius: 8, border: '1px solid #ddd' }} />
          </label>

          <label style={{ display: 'block', marginTop: 10 }}>
            Contact email (we will only use this to follow up)
            <input name="email" type="email" value={form.email} onChange={onChange} disabled={form.anonymous} placeholder="you@example.org" style={{ display: 'block', width: '100%', padding: '.6rem .8rem', marginTop: 6, borderRadius: 8, border: '1px solid #ddd' }} />
          </label>

          <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
            <input name="anonymous" type="checkbox" checked={form.anonymous} onChange={onChange} />
            <span>Submit anonymously (do not include my name or contact)</span>
          </label>
        </fieldset>

        <fieldset style={{ border: 'none', padding: 0, marginTop: 12 }}>
          <legend style={{ fontWeight: 700 }}>Incident details</legend>

          <label style={{ display: 'block', marginTop: 10 }}>
            Date of incident
            <input name="incidentDate" type="date" value={form.incidentDate} onChange={onChange} style={{ display: 'block', padding: '.5rem .7rem', borderRadius: 8, border: '1px solid #ddd', marginTop: 6 }} />
          </label>

          <label style={{ display: 'block', marginTop: 10 }}>
            Location
            <input name="location" value={form.location} onChange={onChange} placeholder="City, venue or online platform" style={{ display: 'block', width: '100%', padding: '.6rem .8rem', marginTop: 6, borderRadius: 8, border: '1px solid #ddd' }} />
          </label>

          <label style={{ display: 'block', marginTop: 10 }}>
            Description (what happened)
            <textarea name="description" value={form.description} onChange={onChange} rows={6} required style={{ display: 'block', width: '100%', padding: '.6rem .8rem', marginTop: 6, borderRadius: 8, border: '1px solid #ddd' }} />
          </label>
        </fieldset>

        <fieldset style={{ border: 'none', padding: 0, marginTop: 12 }}>
          <legend style={{ fontWeight: 700 }}>Evidence (optional)</legend>
          <p style={{ marginTop: 4, color: '#555' }}>Attach images, screenshots, or documents. Max 5 files. Files are stored locally in this prototype.</p>

          <input type="file" accept="image/*,application/pdf,video/*" multiple onChange={onFiles} aria-label="Upload evidence files" />
          {evidence.length > 0 && (
            <ul style={{ marginTop: 8 }}>
              {evidence.map((f, i) => (
                <li key={i} style={{ marginBottom: 6, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: '.9rem' }}>{f.name} ({Math.round(f.size/1024)} KB)</span>
                  <button type="button" onClick={() => removeEvidence(i)} style={{ marginLeft: 8, background: 'transparent', border: 'none', color: '#c0392b', cursor: 'pointer' }} aria-label={`Remove file ${f.name}`}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </fieldset>

        <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
          <input name="consent" type="checkbox" checked={form.consent} onChange={onChange} />
          <span>I consent to submitting this report for review by the RIseHer safety team. I understand evidence may be reviewed for verification.</span>
        </label>

        <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          <button type="submit" disabled={status === 'saving'} style={{ padding: '.6rem .95rem', background: '#D9534F', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700 }}>
            {status === 'saving' ? 'Submitting…' : 'Submit report'}
          </button>
          <Link to="/dashboard" style={{ alignSelf: 'center' }}>Cancel</Link>
        </div>

        <div id="harassment-status" aria-live="polite" style={{ marginTop: 12 }}>
          {status === 'error' && <div style={{ color: '#c0392b' }}>{errorMsg || 'Please correct the highlighted fields.'}</div>}
          {status === 'success' && <div style={{ color: 'green' }}>Thank you — your report was saved. Our safety team will review it.</div>}
        </div>
      </form>

      <section aria-labelledby="safety-resources" style={{ marginTop: 18 }}>
        <h2 id="safety-resources">Safety resources & next steps</h2>
        <p style={{ color: '#444' }}>If you are in immediate danger contact local emergency services. For legal or NGO support, see trusted partners listed on our About page.</p>
      </section>
    </main>
  );
}
