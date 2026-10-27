import React, { useState } from 'react';
import {
  ClipboardList,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { Language, SupportCategory, UrgencyLevel, SupportRequest } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { TN_DISTRICTS } from '../data/mockData';

interface CitizenAssessmentPageProps {
  language: Language;
  onSubmitSuccess: (request: SupportRequest) => void;
  onNavigate: (tab: string) => void;
}

export const CitizenAssessmentPage: React.FC<CitizenAssessmentPageProps> = ({
  language,
  onSubmitSuccess,
  onNavigate,
}) => {
  const t = TRANSLATIONS[language];

  const [district, setDistrict] = useState('Thanjavur');
  const [village, setVillage] = useState('');
  const [category, setCategory] = useState<SupportCategory>('livelihood');
  const [urgency, setUrgency] = useState<UrgencyLevel>('high');
  const [mainDifficulty, setMainDifficulty] = useState('');
  const [preferredLang, setPreferredLang] = useState<Language>(language);
  const [description, setDescription] = useState('');
  const [consentGiven, setConsentGiven] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Quick Preset Scenarios for Hackathon Demonstrations
  const loadPreset = (presetType: 'weaver' | 'elderly' | 'student') => {
    if (presetType === 'weaver') {
      setDistrict('Thanjavur');
      setVillage('Thiruvaiyaru Rural (Kalyanapuram)');
      setCategory('livelihood');
      setUrgency('high');
      setMainDifficulty('Lack of handloom artisan card and lack of working capital for yarn after monsoon flooding.');
      setPreferredLang(language);
      setDescription('Traditional pit loom damaged during seasonal rains. Need replacement reeds, Pehchan artisan card enrollment, and marketing link for woven cotton towels.');
      setConsentGiven(true);
    } else if (presetType === 'elderly') {
      setDistrict('Madurai');
      setVillage('Melur Taluk (Kottampatti)');
      setCategory('elderly');
      setUrgency('high');
      setMainDifficulty('Pension halted due to bank branch merger; physically unable to travel 35km for biometric KYC.');
      setPreferredLang(language);
      setDescription('74-year-old widow living alone. Monthly maintenance pension credits stopped 5 months ago after bank consolidation.');
      setConsentGiven(true);
    } else {
      setDistrict('Dharmapuri');
      setVillage('Pennagaram Rural');
      setCategory('accessibility');
      setUrgency('medium');
      setMainDifficulty('Locomotive disability, lacks UDID card, needs retrofitted school tricycle.');
      setPreferredLang(language);
      setDescription('11-year-old school student walks with crutches 3km. Parents are daily wage farmworkers unable to take unpaid leave for medical board token.');
      setConsentGiven(true);
    }
    setValidationError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!district || !village.trim() || !category || !urgency || !mainDifficulty.trim()) {
      setValidationError(t.validationError);
      return;
    }

    if (!consentGiven) {
      setValidationError(
        language === 'ta'
          ? 'தன்னார்வலர்கள் உதவ தயவுசெய்து ஒப்புதல் வழங்கவும்.'
          : 'Please provide consent so local volunteers can assist with finding resources.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          district,
          village: village.trim(),
          category,
          urgency,
          mainDifficulty: mainDifficulty.trim(),
          preferredLanguage: preferredLang,
          description: description.trim(),
          consentGiven,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit assessment');
      }

      const data = await response.json();
      if (data.request) {
        onSubmitSuccess(data.request);
      }
    } catch (err) {
      console.error('Error submitting assessment:', err);
      setValidationError(
        language === 'ta'
          ? 'படிவத்தை சமர்ப்பிப்பதில் சிக்கல் ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.'
          : 'There was a problem submitting the assessment. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Title & Privacy Assurance */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <ClipboardList className="w-3.5 h-3.5" />
          <span>{t.assessmentTitle}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {t.assessmentTitle}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
          {t.assessmentSub}
        </p>

        {/* Minimal Data Collection Reassurance Box */}
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{t.privacyNote}</p>
            <p className="text-emerald-800/80 mt-0.5">
              We collect only the community location and basic need summary to diagnose procedural barriers and match verified local resources.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Preset Demonstrations for Judges */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Hackathon Quick Presets (Click to autofill sample scenarios)</span>
          </span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={() => loadPreset('weaver')}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-emerald-50 text-emerald-950 border border-slate-300 rounded-md transition-colors"
          >
            Thanjavur Handloom Weaver Case
          </button>
          <button
            type="button"
            onClick={() => loadPreset('elderly')}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-emerald-50 text-emerald-950 border border-slate-300 rounded-md transition-colors"
          >
            Madurai Elderly Pension Case
          </button>
          <button
            type="button"
            onClick={() => loadPreset('student')}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-emerald-50 text-emerald-950 border border-slate-300 rounded-md transition-colors"
          >
            Dharmapuri Disability Tricycle Case
          </button>
        </div>
      </div>

      {/* Assessment Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
        {validationError && (
          <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{validationError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* District */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-800">
              {t.districtLabel} <span className="text-rose-500">*</span>
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
            >
              {TN_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Village / Locality */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-800">
              {t.villageLabel} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              placeholder={t.villagePlaceholder}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-800">
              {t.categoryLabel} <span className="text-rose-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as SupportCategory)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
            >
              {Object.entries(t.categories).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Urgency */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-800">
              {t.urgencyLabel} <span className="text-rose-500">*</span>
            </label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as UrgencyLevel)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
            >
              {Object.entries(t.urgencyLevels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Difficulty */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-800">
            {t.difficultyLabel} <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={mainDifficulty}
            onChange={(e) => setMainDifficulty(e.target.value)}
            placeholder={t.difficultyPlaceholder}
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            required
          />
          <p className="text-[11px] text-slate-500">
            Specify whether paperwork is missing, distance is an issue, or digital portals are inaccessible.
          </p>
        </div>

        {/* Preferred Language & Description */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1.5 sm:col-span-1">
            <label className="block text-xs font-semibold text-slate-800">
              {t.languagePrefLabel}
            </label>
            <div className="flex items-center gap-2 pt-1">
              <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="prefLang"
                  checked={preferredLang === 'en'}
                  onChange={() => setPreferredLang('en')}
                  className="text-emerald-700 focus:ring-emerald-700"
                />
                <span>English</span>
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="prefLang"
                  checked={preferredLang === 'ta'}
                  onChange={() => setPreferredLang('ta')}
                  className="text-emerald-700 focus:ring-emerald-700"
                />
                <span>தமிழ் (Tamil)</span>
              </label>
            </div>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-800">
              {t.descriptionLabel}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.descriptionPlaceholder}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 resize-none"
            />
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-700"
            />
            <span className="text-xs text-slate-700 leading-snug">
              {t.consentLabel}
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-100">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-lg text-xs font-semibold bg-emerald-900 hover:bg-emerald-800 text-white shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
          >
            <span>{isSubmitting ? t.submittingBtn : t.submitAssessmentBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
