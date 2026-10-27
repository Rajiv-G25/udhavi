import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DemoScenarioModal } from './components/DemoScenarioModal';
import { LandingPage } from './pages/LandingPage';
import { CitizenAssessmentPage } from './pages/CitizenAssessmentPage';
import { GapDetectorPage } from './pages/GapDetectorPage';
import { UdhaviAssistantPage } from './pages/UdhaviAssistantPage';
import { ResourceDirectoryPage } from './pages/ResourceDirectoryPage';
import { TrackerPage } from './pages/TrackerPage';
import { VolunteerDashboardPage } from './pages/VolunteerDashboardPage';
import { ImpactAnalyticsPage } from './pages/ImpactAnalyticsPage';
import { Language, SupportRequest, CommunityResource } from './types';
import {
  INITIAL_COMMUNITY_RESOURCES,
  INITIAL_SUPPORT_REQUESTS,
} from './data/mockData';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('udhavi_lang');
    return (saved as Language) || 'en';
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [requests, setRequests] = useState<SupportRequest[]>([...INITIAL_SUPPORT_REQUESTS]);
  const [resources, setResources] = useState<CommunityResource[]>([...INITIAL_COMMUNITY_RESOURCES]);
  const [latestRequest, setLatestRequest] = useState<SupportRequest | null>(
    INITIAL_SUPPORT_REQUESTS[0]
  );
  const [trackerInitialId, setTrackerInitialId] = useState<string>('UDH-TN-2026-4821');
  const [directorySelectedId, setDirectorySelectedId] = useState<string | undefined>(undefined);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Sync Language change
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('udhavi_lang', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Initial data load from Express API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reqRes, resRes] = await Promise.all([
          fetch('/api/requests'),
          fetch('/api/resources'),
        ]);

        if (reqRes.ok) {
          const reqData = await reqRes.json();
          if (Array.isArray(reqData.requests) && reqData.requests.length > 0) {
            setRequests(reqData.requests);
            setLatestRequest(reqData.requests[0]);
          }
        }

        if (resRes.ok) {
          const resData = await resRes.json();
          if (Array.isArray(resData.resources) && resData.resources.length > 0) {
            setResources(resData.resources);
          }
        }
      } catch (err) {
        console.warn('API fetch error, falling back to bundled dataset:', err);
      }
    };

    fetchData();
  }, []);

  // Universal Tab Navigation with contextual payload
  const handleNavigate = (tab: string, extra?: any) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (extra?.demoId) {
      setTrackerInitialId(extra.demoId);
      const found = requests.find((r) => r.id.toLowerCase() === extra.demoId.toLowerCase());
      if (found) {
        setLatestRequest(found);
      }
    }

    if (extra?.request) {
      setLatestRequest(extra.request);
    }

    if (extra?.selectId) {
      setDirectorySelectedId(extra.selectId);
    }
  };

  // When a citizen submits a new assessment
  const handleAssessmentSubmitted = (newReq: SupportRequest) => {
    setRequests((prev) => [newReq, ...prev]);
    setLatestRequest(newReq);
    setTrackerInitialId(newReq.id);
    setActiveTab('gap-detector');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When a volunteer updates status
  const handleRequestUpdated = (updatedReq: SupportRequest) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === updatedReq.id ? updatedReq : r))
    );
    if (latestRequest?.id === updatedReq.id) {
      setLatestRequest(updatedReq);
    }
  };

  // Reset Demo Dataset via Express API
  const handleResetData = async () => {
    try {
      const res = await fetch('/api/demo/reset', { method: 'POST' });
      if (res.ok) {
        const [reqRes, resRes] = await Promise.all([
          fetch('/api/requests'),
          fetch('/api/resources'),
        ]);
        if (reqRes.ok) {
          const data = await reqRes.json();
          setRequests(data.requests);
          setLatestRequest(data.requests[0]);
        }
        if (resRes.ok) {
          const data = await resRes.json();
          setResources(data.resources);
        }
      }
    } catch (e) {
      console.warn('Reset error, resetting locally:', e);
      setRequests([...INITIAL_SUPPORT_REQUESTS]);
      setResources([...INITIAL_COMMUNITY_RESOURCES]);
      setLatestRequest(INITIAL_SUPPORT_REQUESTS[0]);
    }
  };

  // Global KPI stats for landing page
  const stats = {
    totalRequests: requests.length,
    barriersIdentified: requests.reduce(
      (acc, r) => acc + (r.gapReport?.identifiedBarriers?.length || 0),
      0
    ),
    resourcesCount: resources.length,
    confirmedAssistance: requests.filter((r) => r.status === 'Assistance Confirmed').length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] text-[#172b22] font-sans">
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        activeTab={activeTab}
        onSelectTab={(tab) => handleNavigate(tab)}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />

      <main className="flex-1">
        {activeTab === 'home' && (
          <LandingPage
            language={language}
            onNavigate={handleNavigate}
            onOpenDemo={() => setIsDemoModalOpen(true)}
            stats={stats}
          />
        )}

        {activeTab === 'assessment' && (
          <CitizenAssessmentPage
            language={language}
            onSubmitSuccess={handleAssessmentSubmitted}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'gap-detector' && (
          <GapDetectorPage
            language={language}
            latestRequest={latestRequest}
            resources={resources}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'assistant' && (
          <UdhaviAssistantPage language={language} />
        )}

        {activeTab === 'directory' && (
          <ResourceDirectoryPage
            language={language}
            resources={resources}
            initialSelectedId={directorySelectedId}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'tracker' && (
          <TrackerPage
            language={language}
            requests={requests}
            initialSearchId={trackerInitialId}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'volunteer' && (
          <VolunteerDashboardPage
            language={language}
            requests={requests}
            onRequestUpdated={handleRequestUpdated}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'analytics' && (
          <ImpactAnalyticsPage
            language={language}
            requests={requests}
            resources={resources}
            onResetData={handleResetData}
          />
        )}
      </main>

      <Footer
        language={language}
        onSelectTab={(tab) => handleNavigate(tab)}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />

      <DemoScenarioModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        language={language}
        onNavigateToTab={handleNavigate}
        onResetData={handleResetData}
      />
    </div>
  );
}
