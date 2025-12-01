import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/resources.css'; // added stylesheet import

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

	return (
		<div className="res-container">
			<header className="res-header">
				<div>
					<h1 className="res-title">Resources</h1>
					<p className="res-lead">Toolkits, templates, and guides to support campaigns, leadership development, and safety.</p>
				</div>
				<div>
					<button onClick={() => setShowAdd((s) => !s)} className="res-btn-ghost">{showAdd ? 'Close' : 'Add resource'}</button>
				</div>
			</header>

			{showAdd && (
				<form onSubmit={onAdd} className="res-form">
					<input placeholder="Title" value={newRes.title} onChange={(e) => setNewRes((n) => ({ ...n, title: e.target.value }))} className="res-form-input" />
					<div className="res-form-row">
						<select value={newRes.type} onChange={(e) => setNewRes((n) => ({ ...n, type: e.target.value }))} className="res-select">
							<option>Guide</option>
							<option>Video</option>
							<option>Funding</option>
							<option>Tool</option>
						</select>
						<button type="submit" className="res-btn-primary">Add</button>
					</div>
					<textarea placeholder="Short description" value={newRes.description} onChange={(e) => setNewRes((n) => ({ ...n, description: e.target.value }))} rows={3} className="res-textarea" />
				</form>
			)}

			<div className="res-controls">
				<div className="res-small-muted">{resources.length} resources</div>
			</div>

			<ul className="res-grid">
				{results.map((r) => (
					<li key={r.id} className="res-card">
						<div className="res-card-row">
							<div className="res-card-meta">
								<strong className="res-card-title">{r.title}</strong>
								<div className="res-small-muted"><span className="res-pill">{r.type}</span></div>
								<div className="res-card-desc">{r.description?.slice(0, 140)}{r.description && r.description.length > 140 ? '…' : ''}</div>
							</div>

							<div className="res-card-actions">
								<button onClick={() => toggleOpen(r.id)} aria-expanded={openId === r.id} className="res-btn-ghost">{openId === r.id ? 'Close' : 'Open'}</button>
								<button onClick={() => saveResource(r)} disabled={!!r.saved || savingId === r.id} className={`res-btn-primary res-save-btn ${r.saved ? 'saved' : ''}`}>
									{r.saved ? 'Saved' : savingId === r.id ? 'Saving…' : 'Save'}
								</button>
							</div>
						</div>

						{openId === r.id && (
							<div className="res-details">
								<h4 className="res-detail-title">{r.title}</h4>
								<p className="res-card-desc">{r.description || 'No further details provided.'}</p>
								<div className="res-actions">
									<button
										onClick={() => setPreviewId((p) => (p === r.id ? null : r.id))}
										className="res-btn-ghost"
										aria-pressed={previewId === r.id}
									>
										{previewId === r.id ? 'Hide preview' : 'Preview'}
									</button>

									<button onClick={() => downloadResource(r)} className="res-btn-ghost">Download</button>

									<Link to={`/resources/${r.id}`} className="res-btn-primary res-view-link">View page</Link>
								</div>

								{previewId === r.id && (
									<div className="res-preview-panel">
										<strong>Preview</strong>
										<p className="res-card-desc">{r.description || 'No further details provided.'}</p>
									</div>
								)}
							</div>
						)}
					</li>
				))}
			</ul>

			<footer className="res-footer">
				<Link to="/dashboard" className="res-footer-link">Go back</Link>
			</footer>
		</div>
	);
}
