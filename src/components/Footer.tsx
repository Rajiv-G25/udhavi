import React from 'react';
import { HeartHandshake, PhoneCall, ShieldCheck, Eye, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface FooterProps {
  language: Language;
  onSelectTab: (tab: string) => void;
  onOpenDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onSelectTab, onOpenDemo }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-emerald-950 text-emerald-100/90 border-t border-emerald-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Theme */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-200">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                UDHAVI · உதவி
              </span>
            </div>
            <p className="text-sm text-emerald-200/80 max-w-md leading-relaxed">
              {t.footerMission}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-900/60 border border-emerald-800/80 text-xs text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>Theme: Rural Development & Livelihoods in Tamil Nadu</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('assessment')}
                  className="hover:text-white transition-colors"
                >
                  {t.navAssessment}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('gap-detector')}
                  className="hover:text-white transition-colors"
                >
                  {t.navGapDetector}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('assistant')}
                  className="hover:text-white transition-colors"
                >
                  {t.navAssistant}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('directory')}
                  className="hover:text-white transition-colors"
                >
                  {t.navDirectory}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('tracker')}
                  className="hover:text-white transition-colors"
                >
                  {t.navTracker}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDemo}
                  className="text-teal-300 hover:text-white font-medium transition-colors"
                >
                  {t.navDemoGuide}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Emergency & State Helplines */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-3">
              {t.footerContact}
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/90 font-mono tabular-nums">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>TN Health Helpline: <strong>104</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Elder Helpline: <strong>14567</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Women in Distress: <strong>181</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Differently Abled Cell: <strong>1800-425-0111</strong></span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400/80">
          <p>{t.footerCopyright}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
              <span>Zero Aadhaar / Financial Data Retention</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-teal-300" />
              <span>WCAG AA Accessible</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
