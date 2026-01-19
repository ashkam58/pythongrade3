import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { getGeminiHelp } from '../services/geminiService';
import { ChatMessage } from '../types';

interface GeminiTutorProps {
  context: string;
  currentCode: string;
}

export const GeminiTutor: React.FC<GeminiTutorProps> = ({ context, currentCode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm your AI Coding Buddy. Stuck? Ask me anything!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await getGeminiHelp(context, currentCode, userMsg);

    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-xl hover:bg-purple-700 transition-all hover:scale-110 z-50 flex items-center gap-2"
      >
        <Sparkles size={24} />
        <span className="font-bold hidden md:inline">Ask AI Buddy</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border-4 border-purple-200 z-50 flex flex-col overflow-hidden max-h-[500px]">
      {/* Header */}
      <div className="bg-purple-600 text-white p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles size={20} />
          <h3 className="font-bold">AI Coding Buddy</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-purple-500 rounded p-1">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-xl text-sm ${
                msg.role === 'user'
                  ? 'bg-purple-100 text-purple-900 rounded-tr-none'
                  : 'bg-white border border-gray-200 shadow-sm text-gray-800 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-xl rounded-tl-none text-sm text-gray-400 italic">
              Thinking... 🤖
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Why isn't this working?"
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};
