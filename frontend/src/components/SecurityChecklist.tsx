const checklist = [
  'Use strong and unique passwords',
  'Enable multi-factor authentication',
  'Never share OTPs',
  'Verify suspicious messages',
  'Avoid unknown links',
  'Keep software updated',
  'Avoid unknown attachments',
  'Use official websites/apps for payments',
  'Review account login activity',
  'Back up important data'
];

export function SecurityChecklist() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-panel">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Cybersecurity checklist</p>
        <h3 className="mt-2 text-2xl font-bold text-white">Security Checklist</h3>
      </div>

      <ul className="space-y-3 text-slate-200">
        {checklist.map((item) => (
          <li key={item} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2">
            <span className="mt-0.5 text-cyan-300">□</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
