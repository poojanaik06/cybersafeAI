import { Shield, Sparkles } from 'lucide-react';
import type { Message } from '../App';

function getRiskClass(risk?: string) {
  const normalized = (risk || 'LOW').toUpperCase();
  if (normalized === 'HIGH') return 'border-red-500/40 bg-red-500/10 text-red-200';
  if (normalized === 'MEDIUM') return 'border-yellow-500/40 bg-yellow-500/10 text-yellow-200';
  return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200';
}

export function ChatWindow({ messages, isLoading }: { messages: Message[]; isLoading: boolean }) {
  return (
    <div className="flex h-[420px] flex-col gap-3 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/80 p-3">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[85%] rounded-2xl border p-3 ${message.sender === 'user'
            ? 'border-slate-600 bg-slate-800 text-slate-50'
            : 'border-slate-700 bg-slate-900 text-slate-100'} `}>
            {message.sender === 'ai' && (
              <div className="mb-2 flex items-center gap-2 text-xs text-slate-300">
                <div className="rounded-full bg-slate-800 p-1 text-cyan-400">
                  <Shield className="h-3.5 w-3.5" />
                </div>
                <span>CyberSafe AI</span>
              </div>
            )}

            {message.sender === 'ai' && (
              <div className="mb-3 space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between gap-3">
                  <span>Topic</span>
                  <span className="rounded-full border border-slate-600 bg-slate-800 px-2 py-0.5 text-slate-200">
                    {message.category || 'General Cybersecurity'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Risk</span>
                  <span className={`rounded-full border px-2 py-0.5 font-medium ${getRiskClass(message.risk)}`}>
                    {message.risk ? `${message.risk === 'HIGH' ? '🔴' : message.risk === 'MEDIUM' ? '🟡' : '🟢'} ${message.risk}` : '🟢 LOW'}
                  </span>
                </div>
              </div>
            )}

            <p className="whitespace-pre-line text-sm leading-6 text-slate-100">{message.text}</p>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-2xl border border-slate-700 bg-slate-900 p-3 text-slate-200">
            <div className="mb-2 flex items-center gap-2 text-sm text-cyan-300">
              <Sparkles className="h-4 w-4 animate-pulse" />
              Thinking...
            </div>
            <div className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-300 animate-bounce" />
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-bounce [animation-delay:120ms]" />
              <span className="h-2 w-2 rounded-full bg-sky-300 animate-bounce [animation-delay:240ms]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
