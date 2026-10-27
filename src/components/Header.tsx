import React, { useState } from 'react';
import {
  HeartHandshake,
  Globe,
  Menu,
  X,
  Sparkles,
  ClipboardList,
  Search,
  MessageSquare,
  Activity,
  Users,
  Compass,
  Layers,
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  activeTab,
  onSelectTab,
  onOpenDemo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: 'home', label: t.navHome, icon: HeartHandshake },
    { id: 'assessment', label: t.navAssessment, icon: ClipboardList },
    { id: 'gap-detector', label: t.navGapDetector, icon: Layers },
    { id: 'assistant', label: t.navAssistant, icon: MessageSquare },
    { id: 'directory', label: t.navDirectory, icon: Compass },
    { id: 'tracker', label: t.navTracker, icon: Search },
    { id: 'volunteer', label: t.navVolunteer, icon: Users },
    { id: 'analytics', label: t.navAnalytics, icon: Activity },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Zone 1: Wordmark & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-900 flex items-center justify-center text-emerald-100 shadow-sm transition-transform group-hover:scale-105">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-emerald-950 font-sans">
                  UDHAVI <span className="text-xs font-semibold text-emerald-700">· உதவி</span>
                </span>
                <span className="text-[10px] tracking-wide text-slate-500 hidden sm:inline">
                  MyBharat Hack for Social Cause
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'text-slate-700 hover:text-emerald-950 hover:bg-emerald-50/70'
                  }`}
                >
                  <item.icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-200' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language Toggle & Demo CTA */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-white text-emerald-950 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('ta')}
                className={`px-2 py-1 rounded font-medium transition-colors ${
                  language === 'ta'
                    ? 'bg-white text-emerald-950 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="தமிழுக்கு மாறவும்"
              >
                தமிழ்
              </button>
            </div>

            {/* Live Demo Scenario Trigger */}
            <button
              onClick={onOpenDemo}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-700 hover:bg-teal-800 text-white shadow-xs transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-200 animate-pulse" />
              <span className="hidden sm:inline">{t.navDemoGuide}</span>
              <span className="sm:hidden">Demo</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-emerald-900/10 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-emerald-900 text-white'
                    : 'text-slate-700 hover:bg-emerald-50/80 hover:text-emerald-950'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
