import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertTriangle,
  UserCheck,
  Send,
  X,
  FileText,
  MapPin,
} from 'lucide-react';
import { Language, SupportRequest, RequestStatus } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { TN_DISTRICTS } from '../data/mockData';

interface VolunteerDashboardPageProps {
  language: Language;
  requests: SupportRequest[];
  onRequestUpdated: (updated: SupportRequest) => void;
  onNavigate: (tab: string, extra?: any) => void;
}

export const VolunteerDashboardPage: React.FC<VolunteerDashboardPageProps> = ({
  language,
  requests,
  onRequestUpdated,
  onNavigate,
}) => {
  const t = TRANSLATIONS[language];

  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('all');

  const [updatingRequest, setUpdatingRequest] = useState<SupportRequest | null>(null);
  const [newStatus, setNewStatus] = useState<RequestStatus>('Referred');
  const [volunteerNote, setVolunteerNote] = useState('');
  const [volunteerName, setVolunteerName] = useState('Murugan K. (Thanjavur Seva Volunteer)');
  const [referredAgency, setReferredAgency] = useState('TNSRLM Handloom Desk');
  const [isSaving, setIsSaving] = useState(false);

  // Filter consented requests
  const filteredRequests = requests.filter((r) => {
    if (!r.consentGiven) return false;
    if (selectedDistrict !== 'all' && r.district !== selectedDistrict) return false;
    if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
    if (selectedUrgency !== 'all' && r.urgency !== selectedUrgency) return false;
    return true;
  });

  // Metrics
  const criticalCount = requests.filter((r) => r.urgency === 'critical' || r.urgency === 'high').length;
  const referredCount = requests.filter((r) => r.status === 'Referred').length;
  const confirmedCount = requests.filter((r) => r.status === 'Assistance Confirmed').length;

  const handleOpenActionModal = (req: SupportRequest) => {
    setUpdatingRequest(req);
    setNewStatus(req.status === 'Submitted' ? 'Under Review' : req.status === 'Under Review' ? 'Resource Suggested' : 'Referred');
    setVolunteerNote('');
  };

  const handleSaveStatusUpdate = async () => {
    if (!updatingRequest) return;
    setIsSaving(true);

    try {
      const response = await fetch(`/api/requests/${updatingRequest.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          note: volunteerNote || `Field worker intervention: status updated to ${newStatus}.`,
          actor: volunteerName,
          assignedVolunteer: volunteerName,
          referredEntity: referredAgency,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update request');
      }

      const data = await response.json();
      if (data.request) {
        onRequestUpdated(data.request);
        setUpdatingRequest(null);
      }
    } catch (err) {
      console.error('Error updating request:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>{t.volunteerBadge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t.volunteerTitle}
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            {t.volunteerSub}
          </p>
        </div>

        {/* Authenticated Role Simulation Reassurance */}
        <div className="p-3 bg-slate-100 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Role: Grassroots Community Volunteer (Demo Verified)</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">{t.totalRequestsLabel}</span>
          <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {requests.length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-rose-700 font-medium">{t.criticalCountLabel}</span>
          <p className="text-2xl font-bold text-rose-700 font-mono tabular-nums">
            {criticalCount}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-teal-700 font-medium">{t.referredCountLabel}</span>
          <p className="text-2xl font-bold text-teal-800 font-mono tabular-nums">
            {referredCount}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-emerald-800 font-medium">{t.completedCountLabel}</span>
          <p className="text-2xl font-bold text-emerald-900 font-mono tabular-nums">
            {confirmedCount}
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            {t.filterByDistrict}
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
          >
            <option value="all">{t.allOption} Districts</option>
            {TN_DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            {t.filterByCategory}
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
          >
            <option value="all">{t.allOption} Categories</option>
            {Object.entries(t.categories).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            {t.filterByUrgency}
          </label>
          <select
            value={selectedUrgency}
            onChange={(e) => setSelectedUrgency(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
          >
            <option value="all">{t.allOption} Urgencies</option>
            {Object.entries(t.urgencyLevels).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Consented Requests Queue */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Citizen Requests Awaiting Field Navigation ({filteredRequests.length})
        </h3>

        <div className="space-y-4">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-950">
                      {req.id}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {req.village}, {req.district}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {t.categories[req.category]}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      req.urgency === 'critical' || req.urgency === 'high'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {req.urgency} urgency
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                    {t.statuses[req.status]}
                  </span>
                </div>
              </div>

              {/* Primary Need & Main Difficulty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-700">Citizen Difficulty:</span>
                  <p className="text-slate-600 leading-relaxed">{req.mainDifficulty}</p>
                </div>

                <div className="space-y-1 bg-emerald-50/60 p-3 rounded-lg border border-emerald-900/10">
                  <span className="font-semibold text-emerald-900">Identified Support Gaps:</span>
                  <div className="space-y-1">
                    {req.gapReport.identifiedBarriers.map((b, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-emerald-950">
                        <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                        <span className="truncate">
                          {language === 'ta' ? b.titleTa : b.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                <button
                  onClick={() => onNavigate('gap-detector', { request: req })}
                  className="font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Inspect Gap Report</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('tracker', { demoId: req.id })}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    View Timeline
                  </button>
                  <button
                    onClick={() => handleOpenActionModal(req)}
                    className="px-4 py-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white font-semibold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{t.acceptRequestBtn}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="py-12 bg-white rounded-xl border border-slate-200 text-center space-y-2">
              <Users className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-800">
                No consented requests match current filters.
              </p>
              <button
                onClick={() => {
                  setSelectedDistrict('all');
                  setSelectedCategory('all');
                  setSelectedUrgency('all');
                }}
                className="text-xs text-emerald-800 font-semibold hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Volunteer Action Simulation Modal */}
      {updatingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full border border-slate-200 overflow-hidden space-y-4 p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                  Field Intervention Simulation
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Update Request: {updatingRequest.id}
                </h3>
              </div>
              <button
                onClick={() => setUpdatingRequest(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-800">
                  Update Workflow Status:
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as RequestStatus)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                >
                  <option value="Under Review">Under Review (Field Team Reviewing)</option>
                  <option value="Resource Suggested">Resource Suggested</option>
                  <option value="Referred">Referred to Local Agency / NGO</option>
                  <option value="Assistance Confirmed">Assistance Confirmed (Resolved)</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-800">
                  Referred Organization / Agency:
                </label>
                <input
                  type="text"
                  value={referredAgency}
                  onChange={(e) => setReferredAgency(e.target.value)}
                  placeholder="e.g. TN Rural Livelihood Mission, Kudumbam, or Taluk SSS Desk"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-800">
                  Volunteer Action Note:
                </label>
                <textarea
                  rows={3}
                  value={volunteerNote}
                  onChange={(e) => setVolunteerNote(e.target.value)}
                  placeholder="e.g. Completed doorstep visit, assisted with VAO attestation, accompanied citizen to e-Seva centre for biometric enrollment."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 resize-none"
                />
              </div>

              <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-[11px] text-slate-600">
                Notice: Status updates in this demo immediately synchronize with the Citizen Tracker and Impact Analytics views.
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setUpdatingRequest(null)}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStatusUpdate}
                disabled={isSaving}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <span>{isSaving ? 'Saving...' : 'Apply Status Update'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
