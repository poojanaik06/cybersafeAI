import { FileWarning, LockKeyhole, MessagesSquare, ShieldAlert, Smartphone, TriangleAlert, ScanLine } from 'lucide-react';

const scenarios = [
  { label: '🎣 Phishing', text: 'I received a suspicious email.', icon: FileWarning },
  { label: '💳 Online Scam', text: 'Someone is asking me to make an urgent payment.', icon: TriangleAlert },
  { label: '🔐 Password', text: 'How can I create a secure password?', icon: LockKeyhole },
  { label: '📱 Account Security', text: 'I think someone accessed my account.', icon: Smartphone },
  { label: '🔗 Suspicious Link', text: 'I clicked an unknown link.', icon: ShieldAlert },
  { label: '🦠 Malware', text: 'I downloaded an unknown file.', icon: FileWarning },
  { label: '📲 QR Code', text: 'Someone sent me a QR code and asked me to scan it.', icon: ScanLine }
];

export function ScenarioCards({ onSelectScenario }: { onSelectScenario: (value: string) => void }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-panel">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Common cybersecurity situations</p>
        <h3 className="mt-2 text-2xl font-bold text-white">Quick scenarios</h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {scenarios.map(({ label, text, icon: Icon }) => (
          <button
            key={label}
            onClick={() => onSelectScenario(text)}
            className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-left transition hover:border-cyan-400/50 hover:bg-slate-900"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-white">{label}</p>
              <p className="text-sm text-slate-400">{text}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
