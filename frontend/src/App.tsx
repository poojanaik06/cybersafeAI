import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, MessageSquareText, Shield, Sparkles } from 'lucide-react';
import { ChatWindow } from './components/ChatWindow';

export type Message = {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  category?: string;
  risk?: string;
};

const starterQuestions = [
  'I received a suspicious email.',
  'How can I create a secure password?',
  'Someone called me claiming to be from my bank and asked for my OTP.',
  'I clicked a suspicious link.'
];

const defaultResponse = {
  response: 'CyberSafe AI helps you understand common cyber threats in simple, practical language. Ask about phishing, scams, weak passwords, suspicious links, QR codes, or account security.',
  category: 'General Cybersecurity',
  risk: 'LOW'
};

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: 'Welcome to CyberSafe AI. Tell me what happened online and I will explain the risk and what to do next.',
      category: 'General Cybersecurity',
      risk: 'LOW'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatHeader = useMemo(() => ({
    title: 'CyberSafe AI',
    subtitle: 'Simple advice for online safety.'
  }), []);

  const sendMessage = async (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { id: Date.now(), sender: 'user', text: trimmed };
    setMessages((current) => [...current, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed })
      });

      const result = await response.json();

      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        text: result.response || defaultResponse.response,
        category: result.category || defaultResponse.category,
        risk: result.risk || defaultResponse.risk
      };

      setMessages((current) => [...current, aiMessage]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: 'CyberSafe AI is temporarily unavailable. Please try again.',
          category: 'General Cybersecurity',
          risk: 'MEDIUM'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-900">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">CyberSafe</p>
              <h1 className="text-base font-semibold text-white">{chatHeader.title}</h1>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300 sm:flex">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            Safe guidance
          </div>
        </header>

        <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-slate-300">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            Online safety
          </div>

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Keep yourself safe online.
              </h2>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                {chatHeader.subtitle}
              </p>
            </div>

            <button
              onClick={() => sendMessage('I received a suspicious email.')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
            >
              Ask AI
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <main className="space-y-5">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm text-slate-300">
              <MessageSquareText className="h-4 w-4 text-cyan-400" />
              Quick questions
            </div>

            <div className="flex flex-wrap gap-2">
              {starterQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => sendMessage(question)}
                  className="rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200 transition hover:border-slate-500 hover:text-white"
                >
                  {question}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-3">
            <ChatWindow messages={messages} isLoading={isLoading} />

            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage(input);
              }}
              className="mt-3 flex gap-2 rounded-xl border border-slate-700 bg-slate-950 p-2"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-slate-500 focus:outline-none"
                placeholder="Describe your situation..."
              />
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Send
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
