import React from 'react';
import {
  Layers,
  AlertTriangle,
  FileText,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Printer,
  Sparkles,
} from 'lucide-react';
import { Language, SupportRequest, CommunityResource } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface GapDetectorPageProps {
  language: Language;
  latestRequest: SupportRequest | null;
  resources: CommunityResource[];
  onNavigate: (tab: string, extra?: any) => void;
}

export const GapDetectorPage: React.FC<GapDetectorPageProps> = ({
  language,
  latestRequest,
  resources,
  onNavigate,
}) => {
  const t = TRANSLATIONS[language];
  const [copied, setCopied] = React.useState(false);

  // If no request is provided in session, use the pre-loaded illustrative case
  const req = latestRequest;
  const gap = req?.gapReport;

  const handleCopyId = () => {
    if (req?.id) {
      navigator.clipboard.writeText(req.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!req || !gap) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
          <Layers className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          No Support Assessment Found in Current View
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Submit a citizen assessment or load an illustrative scenario to generate an automated Support Gap Report.
        </p>
        <button
          onClick={() => onNavigate('assessment')}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-900 text-white hover:bg-emerald-800 transition-colors"
        >
          Go to Citizen Assessment
        </button>
      </div>
    );
  }

  // Matched resources
  const matched = resources.filter((r) =>
    gap.recommendedResourceIds?.includes(r.id)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header with Tracking Reference Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{gap.isAiGenerated ? 'AI-Assisted Gap Detection' : 'Algorithmic Gap Detection'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t.gapReportTitle}
          </h1>
          <p className="text-xs text-slate-500">
            Location: {req.village}, {req.district} District · Logged: {new Date(req.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Tracking Reference ID Pill */}
        <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 text-right space-y-1 self-start sm:self-auto">
          <span className="text-[11px] font-medium text-slate-500 block">
            {t.trackingIdNotice}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-emerald-900 text-sm">
              {req.id}
            </span>
            <button
              onClick={handleCopyId}
              className="p-1 rounded text-slate-500 hover:text-slate-800 hover:bg-white transition-colors"
              title="Copy Reference ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Need Card */}
      <div className="bg-white p-6 rounded-xl border border-emerald-900/15 shadow-xs space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          {t.primaryNeedLabel}
        </span>
        <h3 className="text-lg font-bold text-slate-900 leading-snug">
          {language === 'ta' ? gap.primaryNeedTa : gap.primaryNeed}
        </h3>
        {req.description && (
          <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded border border-slate-100">
            "{req.description}"
          </p>
        )}
      </div>

      {/* Identified Access Barriers */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>{t.identifiedBarriersLabel}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gap.identifiedBarriers.map((barrier, index) => (
            <div
              key={barrier.id || index}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {barrier.category} barrier
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    barrier.severity === 'high'
                      ? 'bg-rose-100 text-rose-800'
                      : barrier.severity === 'medium'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {barrier.severity} priority
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                {language === 'ta' ? barrier.titleTa : barrier.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'ta' ? barrier.descriptionTa : barrier.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Missing or Required Documents Checklist */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-700" />
          <span>{t.missingDocsLabel}</span>
        </h3>
        <div className="space-y-2.5">
          {(language === 'ta' ? gap.missingDocumentsTa : gap.missingDocuments).map(
            (doc, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-800"
              >
                <div className="w-4 h-4 rounded border border-slate-300 bg-white mt-0.5 shrink-0 flex items-center justify-center text-emerald-800 font-bold">
                  {idx + 1}
                </div>
                <span>{doc}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Recommended 3-Step Action Roadmap */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{t.suggestedActionsLabel}</span>
        </h3>
        <div className="space-y-3">
          {(language === 'ta' ? gap.suggestedActionsTa : gap.suggestedActions).map(
            (action, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-900/15 text-xs text-emerald-950 font-medium leading-relaxed"
              >
                {action}
              </div>
            )
          )}
        </div>
      </div>

      {/* Matched Verified Resources */}
      {matched.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-4 h-4 text-teal-700" />
            <span>{t.matchedResourcesLabel}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matched.map((res) => (
              <div
                key={res.id}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{res.district}</span>
                    <span className="text-emerald-700 font-medium">Verified Entry</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {language === 'ta' ? res.nameTa : res.name}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {language === 'ta' ? res.descriptionTa : res.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{res.locality}</span>
                  <button
                    onClick={() => onNavigate('directory', { selectId: res.id })}
                    className="font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preliminary Guidance Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
        <div className="flex items-center gap-2 font-semibold text-amber-950">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Preliminary Guidance Disclaimer</span>
        </div>
        <p className="leading-relaxed">
          {language === 'ta' ? gap.disclaimerTa : gap.disclaimer}
        </p>
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('tracker', { demoId: req.id })}
          className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-emerald-900 hover:bg-emerald-800 text-white shadow-xs transition-colors flex items-center gap-2"
        >
          <span>{t.trackThisRequestBtn}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onNavigate('assessment')}
          className="text-xs font-medium text-slate-600 hover:text-slate-900"
        >
          Submit Another Assessment
        </button>
      </div>
    </div>
  );
};
