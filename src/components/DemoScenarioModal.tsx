import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  UserCheck,
  FileSearch,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { Language } from '../types';

interface DemoScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onNavigateToTab: (tab: string, extra?: any) => void;
  onResetData: () => Promise<void>;
}

export const DemoScenarioModal: React.FC<DemoScenarioModalProps> = ({
  isOpen,
  onClose,
  language,
  onNavigateToTab,
  onResetData,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isResetting, setIsResetting] = useState(false);

  if (!isOpen) return null;

  const steps = [
    {
      step: 1,
      title: '1. Rural Citizen Submits Support Assessment',
      titleTa: '1. கிராமப்புற நெசவாளர் உதவி தேவை பதிவு செய்தல்',
      tab: 'assessment',
      description:
        'Lakshmi, a 52-year-old traditional handloom weaver from Thiruvaiyaru, Thanjavur, experiences loom damage after heavy rains. She cannot read English or navigate online portal forms.',
      descriptionTa:
        'தஞ்சாவூர் திருவையாறு பகுதியைச் சேர்ந்த லட்சுமி என்ற 52 வயது கைத்தறி நெசவாளர், மழைக்கால சேதத்திற்குப் பின் மூலதனம் இன்றி தவிக்கிறார். அவருக்கு ஆன்லைன் படிவங்களை நிரப்ப வழியில்லை.',
      actionLabel: 'View Assessment Form with Pre-filled Demo Data',
      actionLabelTa: 'மாதிரி தரவுகளுடன் மதிப்பீட்டு படிவத்தை காண்க',
    },
    {
      step: 2,
      title: '2. AI Gap Detector Flags Documentation & Scheme Gaps',
      titleTa: '2. AI இடைவெளி கண்டறியும் கருவி தடைகளை சுட்டிக்காட்டுகிறது',
      tab: 'gap-detector',
      description:
        'UDHAVI automatically identifies that Lakshmi lacks the mandatory Pehchan Artisan ID Card and was unaware of the Special Handloom Corpus Fund for flood-affected artisans in Delta districts.',
      descriptionTa:
        'நெசவாளர் பெஹ்சான் அடையாள அட்டை இல்லாததால் கடன் பெற முடியாது என்பதையும், டெல்டா நெசவாளர் சிறப்பு நிதி பற்றிய விழிப்புணர்வு இடைவெளியையும் UDHAVI கண்டறிகிறது.',
      actionLabel: 'Inspect Generated Support Gap Report',
      actionLabelTa: 'உருவாக்கப்பட்ட இடைவெளி அறிக்கையை காண்க',
    },
    {
      step: 3,
      title: '3. Platform Matches Verified Community Resources',
      titleTa: '3. சரிபார்க்கப்பட்ட சமூக அமைப்புகளுடன் பொருத்துதல்',
      tab: 'directory',
      description:
        'The platform connects her need with the TN Rural Livelihood Mission (TNSRLM) Handloom Desk in Kumbakonam and Kudumbam collective for emergency raw material yarn support.',
      descriptionTa:
        'கும்பகோணம் TNSRLM கைத்தறி உதவி மையம் மற்றும் குடும்பம் இயற்கை அமைப்பின் மூலப்பொருள் உதவி மையத்துடன் தானாக இணைக்கிறது.',
      actionLabel: 'Browse Matched Resource Cards',
      actionLabelTa: 'பொருந்திய சமூக வளங்களை காண்க',
    },
    {
      step: 4,
      title: '4. Volunteer Reviews Consented Need on Dashboard',
      titleTa: '4. தன்னார்வலர் கோரிக்கையை ஏற்று களப்பணி தொடங்குதல்',
      tab: 'volunteer',
      description:
        'Murugan, a certified village field coordinator in Thanjavur, reviews the anonymized request, notes the missing VAO endorsement, and accepts the case.',
      descriptionTa:
        'தஞ்சாவூர் கள ஒருங்கிணைப்பாளர் முருகன், கிராம நிர்வாக அலுவலர் (VAO) சான்றிதழ் பெற லட்சுமிக்கு உதவ முன்வந்து கோரிக்கையை ஏற்கிறார்.',
      actionLabel: 'Open Field Volunteer Hub',
      actionLabelTa: 'தன்னார்வலர் கட்டுப்பாட்டு தளத்திற்கு செல்லவும்',
    },
    {
      step: 5,
      title: '5. Volunteer Initiates Referral in Simulation Mode',
      titleTa: '5. மாதிரி முறையில் பரிந்துரையை தொடங்குதல்',
      tab: 'volunteer',
      description:
        'The volunteer logs a simulated referral to the Block Development Office with offline biometric enrollment at the nearest village e-Seva centre.',
      descriptionTa:
        'அருகிலுள்ள இ-சேவை மையத்தில் பயோமெட்ரிக் பதிவு செய்ய வழிகாட்டி, தாலுகா அலுவலகத்திற்கு மாதிரி பரிந்துரையை பதிவு செய்கிறார்.',
      actionLabel: 'Trigger Referral Action',
      actionLabelTa: 'பரிந்துரை செயல்முறையை இயக்கவும்',
    },
    {
      step: 6,
      title: '6. Citizen Verifies Progress with Reference ID',
      titleTa: '6. குடிமக்கள் குறிப்பு எண் மூலம் நிலையை அறிதல்',
      tab: 'tracker',
      description:
        'Using Reference ID "UDH-TN-2026-4821", the citizen family verifies the updated timeline transparently on a simple, mobile-friendly tracker.',
      descriptionTa:
        '"UDH-TN-2026-4821" என்ற குறிப்பு எண்ணை உள்ளிட்டு, கோரிக்கை எந்த நிலையில் உள்ளது என்பதை பொதுமக்கள் வெளிப்படையாக கண்காணிக்கலாம்.',
      actionLabel: 'Track Reference ID (UDH-TN-2026-4821)',
      actionLabelTa: 'குறிப்பு எண்ணை கண்காணிக்கவும்',
    },
    {
      step: 7,
      title: '7. Impact Analytics Reflects Resolved Barrier',
      titleTa: '7. தாக்க பகுப்பாய்வில் புதிய முன்னேற்றம் பதிவாதல்',
      tab: 'analytics',
      description:
        'The system aggregates this intervention into real-time barrier trends, highlighting documentation bottlenecks in Thanjavur district to help policymakers allocate resources.',
      descriptionTa:
        'தஞ்சாவூர் மாவட்டத்தில் ஆவண சிக்கல்கள் எவ்வாறு களையப்படுகின்றன என்பதை பகுப்பாய்வு விளக்கப்படங்கள் உடனடியாக புதுப்பிக்கின்றன.',
      actionLabel: 'View Updated Analytics Dashboard',
      actionLabelTa: 'தாக்க பகுப்பாய்வு பக்கத்தை காண்க',
    },
  ];

  const current = steps[currentStep - 1];

  const handleStepAction = () => {
    onNavigateToTab(current.tab, { demoId: 'UDH-TN-2026-4821' });
    onClose();
  };

  const handleReset = async () => {
    setIsResetting(true);
    await onResetData();
    setIsResetting(false);
    setCurrentStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-emerald-900/20 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">
                Live Hackathon Demo Walkthrough
              </h3>
              <p className="text-xs text-emerald-300">
                7-Step Realistic Rural Social Support Workflow · Thanjavur Livelihood Case
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-emerald-300 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="bg-emerald-50/70 border-b border-emerald-100 px-6 py-3 flex items-center justify-between overflow-x-auto gap-2">
          {steps.map((s) => {
            const isCompleted = s.step < currentStep;
            const isCurrent = s.step === currentStep;
            return (
              <button
                key={s.step}
                onClick={() => setCurrentStep(s.step)}
                className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded transition-colors whitespace-nowrap ${
                  isCurrent
                    ? 'bg-emerald-900 text-white font-semibold'
                    : isCompleted
                    ? 'text-emerald-800 hover:bg-emerald-100'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center border border-current">
                    {s.step}
                  </span>
                )}
                <span className="hidden sm:inline">Step {s.step}</span>
              </button>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Step {current.step} of 7
            </span>
            <h4 className="text-lg font-bold text-slate-900">
              {language === 'ta' ? current.titleTa : current.title}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'ta' ? current.descriptionTa : current.description}
            </p>
          </div>

          {/* Key Simulation Reassurance */}
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800">
                Transparent Evaluation Context:
              </p>
              <p className="mt-0.5">
                All names and case details in this walkthrough are realistic illustrative examples designed for the MyBharat competition. No actual citizen records are modified.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleReset}
            disabled={isResetting}
            className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            title="Reset dataset to clean state"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
            <span>{isResetting ? 'Resetting Demo...' : 'Reset Demo Data'}</span>
          </button>

          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Previous
              </button>
            )}

            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-3 py-2 text-xs font-medium text-emerald-950 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
              >
                Next Step
              </button>
            ) : null}

            <button
              onClick={handleStepAction}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>{language === 'ta' ? current.actionLabelTa : current.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
