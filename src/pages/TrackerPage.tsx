import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  AlertCircle,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
} from 'lucide-react';
import { Language, SupportRequest, RequestStatus } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface TrackerPageProps {
  language: Language;
  requests: SupportRequest[];
  initialSearchId?: string;
  onNavigate: (tab: string, extra?: any) => void;
}

export const TrackerPage: React.FC<TrackerPageProps> = ({
  language,
  requests,
  initialSearchId = '',
  onNavigate,
}) => {
  const t = TRANSLATIONS[language];
  const [searchId, setSearchId] = useState(initialSearchId || 'UDH-TN-2026-4821');
  const [activeRequest, setActiveRequest] = useState<SupportRequest | null>(
    requests.find((r) => r.id.toLowerCase() === searchId.toLowerCase()) || requests[0] || null
  );
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (idToSearch?: string) => {
    const query = (idToSearch || searchId).trim();
    if (!query) return;

    const found = requests.find((r) => r.id.toLowerCase() === query.toLowerCase());
    setActiveRequest(found || null);
    setHasSearched(true);
  };

  const statusList: RequestStatus[] = [
    'Submitted',
    'Under Review',
    'Resource Suggested',
    'Referred',
    'Assistance Confirmed',
    'Closed',
  ];

  const getCurrentStatusIndex = (currentStatus: RequestStatus) => {
    return statusList.indexOf(currentStatus);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <Search className="w-3.5 h-3.5" />
          <span>{t.trackerTitle}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {t.trackerTitle}
        </h1>
        <p className="text-sm text-slate-600">
          {t.trackerSub}
        </p>
      </div>

      {/* Lookup Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder={t.lookupPlaceholder}
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold bg-emerald-900 hover:bg-emerald-800 text-white transition-colors cursor-pointer"
          >
            {t.searchBtn}
          </button>
        </form>

        {/* Quick Demo Prompts */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600">
          <span className="text-[11px] font-medium text-slate-500">Quick Demo IDs:</span>
          {requests.slice(0, 3).map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setSearchId(r.id);
                handleSearch(r.id);
              }}
              className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 hover:bg-emerald-100 text-emerald-950 border border-slate-200 transition-colors"
            >
              {r.id} ({r.district})
            </button>
          ))}
        </div>
      </div>

      {/* Results View */}
      {activeRequest ? (
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Reference Tracking Code
                </span>
                <h3 className="text-xl font-bold font-mono text-emerald-950">
                  {activeRequest.id}
                </h3>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  {t.currentStatusLabel}
                </span>
                <span className="inline-block mt-0.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
                  {t.statuses[activeRequest.status]}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Location:</strong> {activeRequest.village}, {activeRequest.district}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Category:</strong> {t.categories[activeRequest.category]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Logged Date:</strong> {new Date(activeRequest.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {activeRequest.assignedVolunteer && (
              <div className="p-3 bg-teal-50 rounded-lg border border-teal-200 text-xs text-teal-950">
                <strong>Assigned Volunteer:</strong> {activeRequest.assignedVolunteer}
              </div>
            )}
          </div>

          {/* Stepper Progress Bar */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Lifecycle Progress
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {statusList.map((st, idx) => {
                const currentIdx = getCurrentStatusIndex(activeRequest.status);
                const isPassed = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div
                    key={st}
                    className={`p-2.5 rounded-lg border text-center space-y-1 transition-colors ${
                      isCurrent
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs'
                        : isPassed
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-mono block">0{idx + 1}</span>
                    <span className="text-[11px] font-semibold leading-tight block">
                      {t.statuses[st]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chronological Milestone Timeline */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-700" />
              <span>{t.timelineTitle}</span>
            </h4>

            <div className="relative border-l-2 border-emerald-900/20 ml-3 pl-6 space-y-6">
              {activeRequest.timeline.map((event, idx) => (
                <div key={idx} className="relative space-y-1">
                  <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-800 border-2 border-white ring-2 ring-emerald-100" />
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-slate-900">
                      {t.statuses[event.status]}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {new Date(event.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-emerald-800">
                    By: {event.actor}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === 'ta' ? event.noteTa : event.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => onNavigate('gap-detector', { request: activeRequest })}
              className="px-4 py-2 text-xs font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>View Full Gap Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('volunteer')}
              className="text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Simulate Volunteer Action →
            </button>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">
            {t.requestNotFound}
          </h3>
          <p className="text-xs text-slate-500">
            {t.sampleIdPrompt}
          </p>
        </div>
      ) : null}

      {/* Demonstration Notice Box */}
      <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
        <p>{t.simulationNotice}</p>
      </div>
    </div>
  );
};
