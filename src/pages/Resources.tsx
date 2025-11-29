import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type Resource = {
	id: number;
	title: string;
	type: string;
	description?: string;
	saved?: boolean;
};

export default function Resources() {
	// initial resources
	const initial = useMemo<Resource[]>(
		() => [
			{ id: 1, title: 'Campaign Toolkit — Digital Safety', type: 'Guide', description: 'Practical steps to secure accounts, protect supporters, and manage digital risk during campaigns.' },
			{ id: 2, title: 'Leadership Workshop Recording', type: 'Video', description: 'Recording of our interactive workshop on public speaking and stakeholder engagement.' },
			{ id: 3, title: 'Grant: Women in Civic Leadership', type: 'Funding', description: 'Grant opportunity for civic leadership projects focused on women’s empowerment.' },
		],
		[]
	);

	const [resources, setResources] = useState<Resource[]>(initial);
	const [query, setQuery] = useState('');
	const [showAdd, setShowAdd] = useState(false);
	const [openId, setOpenId] = useState<number | null>(null);
	const [savingId, setSavingId] = useState<number | null>(null);
	const [previewId, setPreviewId] = useState<number | null>(null);

	// add form state
	const [newRes, setNewRes] = useState({ title: '', type: 'Guide', description: '' });

	const results = resources.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()) || r.type.toLowerCase().includes(query.toLowerCase()));

	const saveResource = (res: Resource) => {
		setSavingId(res.id);
		// simulate async save, persist to localStorage
		try {
			const raw = localStorage.getItem('riseher_saved_resources') || '[]';
			const list = JSON.parse(raw) as Resource[];
			if (!list.find((x) => x.id === res.id)) {
				list.unshift(res);
				localStorage.setItem('riseher_saved_resources', JSON.stringify(list));
			}
			// mark saved in UI
			setResources((prev) => prev.map((r) => (r.id === res.id ? { ...r, saved: true } : r)));
		} catch {
			// ignore for prototype
		} finally {
			setTimeout(() => setSavingId(null), 700);
		}
	};

	// download resource as a simple text file (prototype)
	const downloadResource = (res: Resource) => {
		try {
			const content = `${res.title}\n\n${res.description || ''}`;
			const blob = new Blob([content], { type: 'text/plain' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			// sanitize filename
			a.download = `${res.title.replace(/[^\w\-]+/g, '_')}.txt`;
			document.body.appendChild(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(url);
		} catch {
			// fallback noop for prototype
		}
	};

	const toggleOpen = (id: number) => setOpenId((prev) => (prev === id ? null : id));

	const onAdd = (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		if (!newRes.title.trim()) return;
		const id = Math.max(0, ...resources.map((r) => r.id)) + 1;
		const res: Resource = { id, title: newRes.title.trim(), type: newRes.type || 'Guide', description: newRes.description.trim() || 'No description provided.' };
		setResources((p) => [res, ...p]);
		setNewRes({ title: '', type: 'Guide', description: '' });
		setShowAdd(false);
	};

	// styles (refined)
	const container = { maxWidth: 1000, margin: '2rem auto', padding: 20, fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto' } as React.CSSProperties;
	const header = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 } as React.CSSProperties;
	const title = { margin: 0, fontSize: '1.4rem', color: '#2c1a4a' } as React.CSSProperties;
	const lead = { color: '#555', marginTop: 6 } as React.CSSProperties;
	const controls = { marginTop: 14, display: 'flex', gap: 12, alignItems: 'center' } as React.CSSProperties;
	const searchInput = { flex: 1, padding: '.55rem .75rem', borderRadius: 8, border: '1px solid #E6E6F0' } as React.CSSProperties;
	const btnPrimary = { padding: '.55rem .9rem', background: '#5A007A', color: '#fff', borderRadius: 8, textDecoration: 'none', border: 'none', cursor: 'pointer' } as React.CSSProperties;
	const btnGhost = { padding: '.5rem .85rem', background: 'transparent', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 8, cursor: 'pointer' } as React.CSSProperties;

	const grid = { display: 'grid', gap: 12, marginTop: 16 } as React.CSSProperties;
	const card = { background: '#fff', padding: 16, borderRadius: 10, boxShadow: '0 10px 30px rgba(10,10,20,0.04)', border: '1px solid rgba(0,0,0,0.04)' } as React.CSSProperties;
	const pill = { display: 'inline-block', padding: '4px 8px', background: '#F6F0FF', color: '#5A007A', borderRadius: 999, fontWeight: 700, fontSize: '.85rem' } as React.CSSProperties;
	const actions = { marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' } as React.CSSProperties;
	const details = { marginTop: 12, padding: 12, background: '#FBFBFF', borderRadius: 8, border: '1px solid rgba(11,12,26,0.03)' } as React.CSSProperties;
	const smallMuted = { color: '#666', fontSize: '.95rem' } as React.CSSProperties;

	return (
		<div style={container}>
			<header style={header}>
				<div>
					<h1 style={title}>Resources</h1>
					<p style={lead}>Toolkits, templates, and guides to support campaigns, leadership development, and safety.</p>
				</div>
				{/* no external blank target — inline add form */}
				<div>
					<button onClick={() => setShowAdd((s) => !s)} style={btnGhost}>{showAdd ? 'Close' : 'Add resource'}</button>
				</div>
			</header>

			{showAdd && (
				<form onSubmit={onAdd} style={{ marginTop: 12, marginBottom: 8, display: 'grid', gap: 8 }}>
					<input placeholder="Title" value={newRes.title} onChange={(e) => setNewRes((n) => ({ ...n, title: e.target.value }))} style={{ padding: '.6rem .8rem', borderRadius: 8, border: '1px solid #E6E6F0' }} />
					<div style={{ display: 'flex', gap: 8 }}>
						<select value={newRes.type} onChange={(e) => setNewRes((n) => ({ ...n, type: e.target.value }))} style={{ padding: '.55rem .75rem', borderRadius: 8, border: '1px solid #E6E6F0' }}>
							<option>Guide</option>
							<option>Video</option>
							<option>Funding</option>
							<option>Tool</option>
						</select>
						<button type="submit" style={btnPrimary}>Add</button>
					</div>
					<textarea placeholder="Short description" value={newRes.description} onChange={(e) => setNewRes((n) => ({ ...n, description: e.target.value }))} rows={3} style={{ padding: '.6rem .8rem', borderRadius: 8, border: '1px solid #E6E6F0' }} />
				</form>
			)}

			{/* header controls simplified: no search, no create page */}
			<div style={controls}>
				<div style={{ color: '#666', fontSize: '.95rem' }}>{resources.length} resources</div>
			</div>

			<ul style={grid}>
				{results.map((r) => (
					<li key={r.id} style={card}>
						<div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
							<div style={{ flex: 1 }}>
								<strong style={{ fontSize: '1.02rem' }}>{r.title}</strong>
								<div style={smallMuted}><span style={pill as any}>{r.type}</span></div>
								<div style={{ marginTop: 8, color: '#444' }}>{r.description?.slice(0, 140)}{r.description && r.description.length > 140 ? '…' : ''}</div>
							</div>

							<div style={{ marginLeft: 12, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
								<button onClick={() => toggleOpen(r.id)} aria-expanded={openId === r.id} style={btnGhost}>{openId === r.id ? 'Close' : 'Open'}</button>
								<button onClick={() => saveResource(r)} disabled={!!r.saved || savingId === r.id} style={{ ...btnPrimary, opacity: r.saved ? 0.7 : 1, cursor: r.saved ? 'default' : 'pointer' }}>
									{r.saved ? 'Saved' : savingId === r.id ? 'Saving…' : 'Save'}
								</button>
							</div>
						</div>

						{openId === r.id && (
							<div style={details}>
								<h4 style={{ margin: 0 }}>{r.title}</h4>
								<p style={{ marginTop: 8, color: '#444' }}>{r.description || 'No further details provided.'}</p>
								<div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
									{/* Inline preview toggle */}
									<button
										onClick={() => setPreviewId((p) => (p === r.id ? null : r.id))}
										style={btnGhost}
										aria-pressed={previewId === r.id}
									>
										{previewId === r.id ? 'Hide preview' : 'Preview'}
									</button>

									{/* download as text file (prototype) */}
									<button onClick={() => downloadResource(r)} style={btnGhost}>Download</button>

									{/* view page still navigates inside app */}
									<Link to={`/resources/${r.id}`} style={{ ...btnPrimary, textDecoration: 'none' }}>View page</Link>
								</div>

								{/* Inline preview panel (shows when Preview clicked) */}
								{previewId === r.id && (
									<div style={{ marginTop: 12, padding: 12, background: '#fff', border: '1px solid rgba(0,0,0,0.04)', borderRadius: 8 }}>
										<strong style={{ display: 'block' }}>Preview</strong>
										<p style={{ marginTop: 8, color: '#444' }}>{r.description || 'No further details provided.'}</p>
									</div>
								)}
							</div>
						)}
					</li>
				))}
			</ul>

			<footer style={{ marginTop: 20 }}>
				<Link to="/dashboard" aria-label="Go back to dashboard">Go back</Link>
			</footer>
		</div>
	);
}
