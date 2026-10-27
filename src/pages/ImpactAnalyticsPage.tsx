import React, { useMemo } from 'react';
import {
  Activity,
  Layers,
  MapPin,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  PieChart as PieChartIcon,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Language, SupportRequest, CommunityResource } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface ImpactAnalyticsPageProps {
  language: Language;
  requests: SupportRequest[];
  resources: CommunityResource[];
  onResetData: () => Promise<void>;
}

export const ImpactAnalyticsPage: React.FC<ImpactAnalyticsPageProps> = ({
  language,
  requests,
  resources,
  onResetData,
}) => {
  const t = TRANSLATIONS[language];
  const [isResetting, setIsResetting] = React.useState(false);

  // Dynamic KPI calculations from active dataset
  const totalRequests = requests.length;
  const totalBarriers = requests.reduce(
    (acc, r) => acc + (r.gapReport?.identifiedBarriers?.length || 0),
    0
  );
  const referredCount = requests.filter(
    (r) => r.status === 'Referred' || r.status === 'Assistance Confirmed'
  ).length;
  const confirmedCount = requests.filter(
    (r) => r.status === 'Assistance Confirmed'
  ).length;
  const resolutionRate =
    totalRequests > 0 ? Math.round((confirmedCount / totalRequests) * 100) : 0;

  // Barrier Frequency Breakdown
  const barrierData = useMemo(() => {
    const counts: Record<string, number> = {
      Documentation: 0,
      Awareness: 0,
      Accessibility: 0,
      Procedural: 0,
    };

    requests.forEach((r) => {
      r.gapReport?.identifiedBarriers?.forEach((b) => {
        const cat = b.category.charAt(0).toUpperCase() + b.category.slice(1);
        if (counts[cat] !== undefined) {
          counts[cat]++;
        } else {
          counts['Procedural']++;
        }
      });
    });

    return [
      { name: 'Documentation', count: counts['Documentation'], color: '#0f766e' },
      { name: 'Awareness', count: counts['Awareness'], color: '#d97706' },
      { name: 'Accessibility', count: counts['Accessibility'], color: '#16a34a' },
      { name: 'Procedural', count: counts['Procedural'], color: '#475569' },
    ];
  }, [requests]);

  // Category Breakdown
  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    requests.forEach((r) => {
      const label = t.categories[r.category] || r.category;
      counts[label] = (counts[label] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));
  }, [requests, t]);

  // District Breakdown
  const districtData = useMemo(() => {
    const counts: Record<string, number> = {};
    requests.forEach((r) => {
      counts[r.district] = (counts[r.district] || 0) + 1;
    });

    return Object.entries(counts).map(([district, count]) => ({
      district,
      count,
    }));
  }, [requests]);

  // Lifecycle Pipeline Funnel
  const statusFunnelData = useMemo(() => {
    const statuses = [
      'Submitted',
      'Under Review',
      'Resource Suggested',
      'Referred',
      'Assistance Confirmed',
    ];
    return statuses.map((st) => ({
      status: t.statuses[st as keyof typeof t.statuses] || st,
      count: requests.filter((r) => r.status === st).length,
    }));
  }, [requests, t]);

  const COLORS = ['#0f766e', '#16a34a', '#d97706', '#2563eb', '#9333ea', '#dc2626'];

  const handleReset = async () => {
    setIsResetting(true);
    await onResetData();
    setIsResetting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5" />
            <span>{t.analyticsTitle}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t.analyticsTitle}
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            {t.analyticsSub}
          </p>
        </div>

        <button
          onClick={handleReset}
          disabled={isResetting}
          className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
          <span>{isResetting ? 'Resetting...' : 'Reset Dataset'}</span>
        </button>
      </div>

      {/* Illustrative Prototype Data Disclaimer */}
      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
        <span className="font-medium text-slate-700">
          {t.illustrativeLabel}
        </span>
        <span className="font-mono text-[11px] text-slate-400">
          Sample Size: n={totalRequests} requests
        </span>
      </div>

      {/* Dynamic Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Citizen Requests</span>
          <p className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {totalRequests}
          </p>
          <span className="text-[11px] text-slate-400 block">Total registered</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-amber-700 font-medium">Access Barriers</span>
          <p className="text-3xl font-extrabold text-amber-700 font-mono tabular-nums">
            {totalBarriers}
          </p>
          <span className="text-[11px] text-amber-600/80 block">Identified by UDHAVI</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-teal-700 font-medium">Referrals Connected</span>
          <p className="text-3xl font-extrabold text-teal-800 font-mono tabular-nums">
            {referredCount}
          </p>
          <span className="text-[11px] text-teal-600/80 block">Active grassroots links</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-emerald-800 font-medium">Resolution Success</span>
          <p className="text-3xl font-extrabold text-emerald-900 font-mono tabular-nums">
            {resolutionRate}%
          </p>
          <span className="text-[11px] text-emerald-700 block">Assistance confirmed</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Identified Barriers Frequency */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">
              {t.chartBarriersTitle}
            </h3>
            <p className="text-xs text-slate-500">
              Distribution of root hurdles diagnosed by the Gap Detection engine
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barrierData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#0f766e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Category Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">
              {t.chartCategoriesTitle}
            </h3>
            <p className="text-xs text-slate-500">
              Breakdown of rural needs by functional assistance sector
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Geographic Distribution by TN District */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">
              {t.chartDistrictsTitle}
            </h3>
            <p className="text-xs text-slate-500">
              Geographic spread across Tamil Nadu rural clusters
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="district" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#12382c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Referral Status Funnel */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">
              {t.chartStatusTitle}
            </h3>
            <p className="text-xs text-slate-500">
              Progression from initial intake to confirmed community resolution
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={statusFunnelData}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
              >
                <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                <YAxis dataKey="status" type="category" tick={{ fontSize: 11 }} width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#0f766e" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
