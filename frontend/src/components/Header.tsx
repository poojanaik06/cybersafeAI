import { Shield, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between rounded-2xl border border-sky-500/30 bg-slate-900/80 px-5 py-4 shadow-panel backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-500 text-slate-950 shadow-glow">
          <Shield className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">CyberSafe AI</p>
          <h1 className="text-xl font-semibold text-white">AI-Powered Cybersecurity Awareness Assistant</h1>
        </div>
      </div>
      <div className="hidden items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200 md:flex">
        <Sparkles className="h-4 w-4" />
        Active protection guidance
      </div>
    </header>
  );
}
