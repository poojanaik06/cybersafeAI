type MessageBubbleProps = {
  sender: 'user' | 'ai';
  text: string;
  category?: string;
  risk?: string;
};

export function MessageBubble({ sender, text, category, risk }: MessageBubbleProps) {
  const alertClass = risk === 'HIGH'
    ? 'text-red-200 border-red-500/40 bg-red-500/10'
    : risk === 'MEDIUM'
      ? 'text-yellow-200 border-yellow-500/40 bg-yellow-500/10'
      : 'text-emerald-200 border-emerald-500/40 bg-emerald-500/10';

  return (
    <div className={`max-w-[85%] rounded-2xl border p-4 ${sender === 'user' ? 'ml-auto border-cyan-400/40 bg-cyan-500/10 text-cyan-50' : 'border-slate-700 bg-slate-900 text-slate-100'}`}>
      {sender === 'ai' && (
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-cyan-300">CyberSafe AI</span>
          <span className="rounded-full border border-slate-600 bg-slate-800 px-2 py-1 text-slate-300">Topic: {category || 'General Cybersecurity'}</span>
          <span className={`rounded-full border px-2 py-1 ${alertClass}`}>Awareness Risk: {risk || 'LOW'}</span>
        </div>
      )}
      <p className="whitespace-pre-line leading-7">{text}</p>
    </div>
  );
}
