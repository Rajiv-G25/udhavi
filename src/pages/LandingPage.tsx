import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
  Compass,
  FileCheck2,
  HeartHandshake,
  MapPin,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface LandingPageProps {
  language: Language;
  onNavigate: (tab: string, extra?: any) => void;
  onOpenDemo: () => void;
  stats: {
    totalRequests: number;
    barriersIdentified: number;
    resourcesCount: number;
    confirmedAssistance: number;
  };
}

export const LandingPage: React.FC<LandingPageProps> = ({
  language,
  onNavigate,
  onOpenDemo,
  stats,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-700/60 text-xs font-medium text-emerald-200">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span>{t.themeBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                {t.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
                {t.heroSubtitle}
              </p>

              <div className="p-3.5 rounded-lg bg-emerald-900/60 border border-emerald-800 text-xs text-emerald-200 flex items-start gap-2.5 max-w-xl">
                <ShieldCheck className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                <p>
                  <strong>Empowering Rural Tamil Nadu:</strong> Automated barrier detection for documentation, language, and transport hurdles—connecting vulnerable citizens with verified grassroots support without asking for Aadhaar or bank details.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('assessment')}
                  className="px-5 py-3 rounded-lg text-sm font-semibold bg-teal-600 hover:bg-teal-500 text-white shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.heroPrimaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('volunteer')}
                  className="px-5 py-3 rounded-lg text-sm font-semibold bg-emerald-800/90 hover:bg-emerald-700 text-emerald-100 border border-emerald-700/80 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-emerald-300" />
                  <span>{t.heroSecondaryCta}</span>
                </button>

                <button
                  onClick={onOpenDemo}
                  className="px-4 py-3 rounded-lg text-sm font-medium bg-emerald-900/60 hover:bg-emerald-800 text-teal-200 border border-teal-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-teal-300" />
                  <span>{t.heroLiveDemoBtn}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Authentic Documentary Photography Hero Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-emerald-800/80 group">
                <img
                  src="/src/assets/images/hero_rural_tamilnadu_1793113647001.jpg"
                  alt="Rural village community gathering in Tamil Nadu with social workers assisting residents"
                  className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center gap-2 text-xs text-teal-300 font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Tamil Nadu Village Grassroots Outreach</span>
                  </div>
                  <p className="text-xs text-emerald-100/90 leading-snug">
                    Bridging information divides so elderly citizens, weavers, marginal farmers, and disadvantaged families receive their rightful assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Impact KPI Summary Row */}
          <div className="mt-12 pt-8 border-t border-emerald-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                {stats.totalRequests}
              </span>
              <p className="text-xs text-emerald-200/80">Support Requests Logged</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-teal-300 font-mono tabular-nums">
                {stats.barriersIdentified}
              </span>
              <p className="text-xs text-emerald-200/80">Access Barriers Detected</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                {stats.resourcesCount}
              </span>
              <p className="text-xs text-emerald-200/80">Verified Community Resources</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-teal-300 font-mono tabular-nums">
                {stats.confirmedAssistance}
              </span>
              <p className="text-xs text-emerald-200/80">Simulated Confirmations</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & The Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* The Problem Card */}
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              The Reality: Rural Social Support Gaps
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              In rural Tamil Nadu, welfare schemes exist, but vulnerable individuals—such as an elderly widow in Melur or a weaver in Thiruvaiyaru—face hidden roadblocks:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">·</span>
                <span><strong>Documentation Hurdles:</strong> Missing death certificates, mismatched smart ration cards, or lack of artisan Pehchan registrations cause silent rejections.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">·</span>
                <span><strong>Physical & Travel Distance:</strong> Taluk offices situated 20–35 km away force daily-wage workers to lose a day's livelihood for every inquiry.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">·</span>
                <span><strong>Fragmented Services:</strong> Departments work in silos; citizens rarely know which scheme, subsidy, or NGO can address their compound need.</span>
              </li>
            </ul>
          </div>

          {/* The Solution Card */}
          <div className="bg-white p-8 rounded-xl border border-emerald-900/15 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-emerald-950">
              The UDHAVI Innovation: AI Gap Detection
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              UDHAVI does not replace government welfare or make legal eligibility determinations. Instead, it acts as an intelligent diagnostic bridge:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">·</span>
                <span><strong>Upfront Gap Analysis:</strong> Analyzes natural language descriptions to uncover exact missing paperwork and procedural prerequisites before filing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">·</span>
                <span><strong>Actionable 3-Step Roadmap:</strong> Generates plain-language steps in Tamil or English tailored to rural realities.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">·</span>
                <span><strong>Grassroots Volunteer Dispatch:</strong> Connects consented requests with verified village volunteers for doorstep navigation.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans">
            {t.howItWorksTitle}
          </h2>
          <p className="text-sm text-slate-600">
            {t.howItWorksSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-800">STAGE 01</span>
            <h4 className="text-base font-bold text-slate-900">{t.step1Title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t.step1Desc}</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
            <span className="text-xs font-mono font-bold text-teal-700">STAGE 02</span>
            <h4 className="text-base font-bold text-slate-900">{t.step2Title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t.step2Desc}</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-800">STAGE 03</span>
            <h4 className="text-base font-bold text-slate-900">{t.step3Title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t.step3Desc}</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
            <span className="text-xs font-mono font-bold text-teal-700">STAGE 04</span>
            <h4 className="text-base font-bold text-slate-900">{t.step4Title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t.step4Desc}</p>
          </div>
        </div>
      </section>

      {/* Community Case Studies (Illustrative Examples with Authentic Documentary Photos) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
              <span>Rural Impact Case Studies</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500 font-normal">Illustrative Demonstrations</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Real Rural Needs. Tangible Community Resolution.
            </h2>
          </div>
          <button
            onClick={() => onNavigate('directory')}
            className="text-xs font-semibold text-emerald-900 hover:text-emerald-700 flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>{t.heroExploreDir}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Story 1: Artisan Livelihood Case */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
            <div className="relative h-56 sm:h-64 overflow-hidden">
              <img
                src="/src/assets/images/livelihood_weaving_artisan_1793113647726.jpg"
                alt="Rural artisan handloom weaver working in village workshop in Tamil Nadu"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-semibold text-slate-800 border border-slate-200">
                Thanjavur Rural Cluster · Handloom Livelihood
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900">
                  Livelihood Revival for Flood-Damaged Handloom Weavers
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  After seasonal waterlogging damaged ground pit looms in Thiruvaiyaru, the weaver family lacked working capital for yarn and had missed enrolling in central handloom schemes.
                </p>
                <div className="pt-2 text-xs space-y-1 text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-700 font-bold">Barrier:</span>
                    <span>No Pehchan artisan card & distance to Taluk office</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-teal-700 font-bold">Intervention:</span>
                    <span>Doorstep VAO certification & link to TNSRLM craft subsidy</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Reference ID: UDH-TN-2026-4821</span>
                <button
                  onClick={() => onNavigate('tracker', { demoId: 'UDH-TN-2026-4821' })}
                  className="font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  <span>Track Case</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Story 2: Elderly Social Security Support */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
            <div className="relative h-56 sm:h-64 overflow-hidden">
              <img
                src="/src/assets/images/elderly_care_volunteer_1793113647843.jpg"
                alt="Community volunteer assisting elderly rural resident in Tamil Nadu"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-semibold text-slate-800 border border-slate-200">
                Madurai Rural · Old Age Pension Restoration
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900">
                  Doorstep Biometric e-KYC for Frail Senior Resident
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A 74-year-old widow's pension ceased after a local bank merger changed branch IFSC codes. Unable to undertake a 35 km journey, she remained without vital maintenance allowance for 5 months.
                </p>
                <div className="pt-2 text-xs space-y-1 text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-700 font-bold">Barrier:</span>
                    <span>Severe mobility limitation & bank consolidation disconnect</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-teal-700 font-bold">Intervention:</span>
                    <span>India Post Payments Bank doorstep biometric life certificate</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Reference ID: UDH-TN-2026-3104</span>
                <button
                  onClick={() => onNavigate('tracker', { demoId: 'UDH-TN-2026-3104' })}
                  className="font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  <span>Track Case</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-950 text-white rounded-2xl p-8 lg:p-12 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
              Engineered for Social Impact
            </span>
            <h3 className="text-2xl font-bold mt-1 text-white">
              Why UDHAVI is Different from a Static Directory
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-teal-200">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h5 className="text-sm font-bold text-white">{t.feature1Title}</h5>
              <p className="text-xs text-emerald-200/80 leading-relaxed">{t.feature1Desc}</p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-teal-200">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h5 className="text-sm font-bold text-white">{t.feature2Title}</h5>
              <p className="text-xs text-emerald-200/80 leading-relaxed">{t.feature2Desc}</p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-teal-200">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h5 className="text-sm font-bold text-white">{t.feature3Title}</h5>
              <p className="text-xs text-emerald-200/80 leading-relaxed">{t.feature3Desc}</p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-teal-200">
                <Compass className="w-4 h-4" />
              </div>
              <h5 className="text-sm font-bold text-white">{t.feature4Title}</h5>
              <p className="text-xs text-emerald-200/80 leading-relaxed">{t.feature4Desc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
