import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  RotateCcw,
  Info,
} from 'lucide-react';
import { Language, ChatMessage } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface UdhaviAssistantPageProps {
  language: Language;
}

export const UdhaviAssistantPage: React.FC<UdhaviAssistantPageProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const initialWelcomeEn: ChatMessage = {
    id: 'msg-0',
    role: 'assistant',
    content:
      'Vanakkam & Welcome to Udhavi Assistant. I am here to help rural citizens and volunteers understand government welfare schemes, navigate documentation bottlenecks, and find community resources across Tamil Nadu.\n\nYou can ask questions in English or Tamil (தமிழ்). How can I assist you today?',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isDemoFallback: false,
  };

  const initialWelcomeTa: ChatMessage = {
    id: 'msg-0-ta',
    role: 'assistant',
    content:
      'வணக்கம்! உதவி AI வழிகாட்டிக்கு உங்களை அன்போடு வரவேற்கிறோம். தமிழ்நாட்டில் அரசு நலத்திட்டங்கள், முதியோர் ஓய்வூதியம், மாற்றுத்திறனாளி உதவி உபகரணங்கள் மற்றும் ஊரக வாழ்வாதார வழிகாட்டல் குறித்து நீங்கள் தமிழில் அல்லது ஆங்கிலத்தில் கேட்கலாம்.\n\nஉங்களுக்கு என்ன உதவி தேவை?',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isDemoFallback: false,
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    language === 'ta' ? initialWelcomeTa : initialWelcomeEn,
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastModeWasDemo, setLastModeWasDemo] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Assistant API returned error');
      }

      const data = await response.json();
      setLastModeWasDemo(Boolean(data.isDemoFallback));

      const botMsg: ChatMessage = {
        id: 'msg-bot-' + Date.now(),
        role: 'assistant',
        content: data.reply || 'Thank you for your inquiry. Please consult the nearest e-Seva centre for local verification.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDemoFallback: data.isDemoFallback,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Error contacting Udhavi Assistant:', err);
      const errorMsg: ChatMessage = {
        id: 'msg-err-' + Date.now(),
        role: 'assistant',
        content:
          language === 'ta'
            ? 'மன்னிக்கவும், தகவல் தொடர்பில் சிறு சிக்கல் உள்ளது. அருகிலுள்ள இ-சேவை மையத்தை அணுகவும் அல்லது சிறிது நேரம் கழித்து முயற்சிக்கவும்.'
            : 'Sorry, could not reach the server right now. Please try again or visit your local village e-Seva centre.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDemoFallback: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
      setLastModeWasDemo(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([language === 'ta' ? initialWelcomeTa : initialWelcomeEn]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <Bot className="w-3.5 h-3.5" />
            <span>{t.assistantTitle}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {t.assistantTitle}
          </h1>
          <p className="text-xs text-slate-500">
            {t.assistantSub}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Badge */}
          <div
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium border flex items-center gap-1.5 ${
              lastModeWasDemo
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            <Sparkles className="w-3 h-3 text-teal-600" />
            <span>{lastModeWasDemo ? 'Deterministic Demo Mode' : 'Server-side Gemini 3.8 Flash'}</span>
          </div>

          <button
            onClick={handleResetChat}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Suggested Topics (English & தமிழ்):
        </span>
        <div className="flex flex-wrap gap-2">
          {t.quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="text-xs text-left px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-emerald-700 hover:text-emerald-950 transition-colors shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs h-[480px] flex flex-col overflow-hidden">
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isBot = m.role === 'assistant';
            return (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-lg bg-emerald-900 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] sm:max-w-[75%] rounded-xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isBot
                      ? 'bg-slate-50 text-slate-800 border border-slate-200'
                      : 'bg-emerald-900 text-white shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.content}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px] opacity-70">
                    <span>{m.timestamp}</span>
                    {isBot && m.isDemoFallback && (
                      <span className="text-[10px] font-medium bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                        Demo Mode
                      </span>
                    )}
                  </div>
                </div>
                {!isBot && (
                  <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-emerald-900 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-500 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-700 animate-ping" />
                <span>Udhavi Assistant is reviewing schemes and documentation...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.assistantInputPlaceholder}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="px-4 py-2.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.sendBtn}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Grounding Reassurance Notice */}
      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
        <Info className="w-4 h-4 text-emerald-800 shrink-0" />
        <span>{t.demoAssistantNotice}</span>
      </div>
    </div>
  );
};
