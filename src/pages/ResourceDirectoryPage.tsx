import React, { useState, useMemo } from 'react';
import {
  Compass,
  Search,
  MapPin,
  ShieldCheck,
  Calendar,
  PhoneCall,
  ExternalLink,
  Navigation,
  X,
  Filter,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Language, CommunityResource, SupportCategory } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { TN_DISTRICTS, DISTRICT_COORDINATES, calculateDistanceKm } from '../data/mockData';

interface ResourceDirectoryPageProps {
  language: Language;
  resources: CommunityResource[];
  initialSelectedId?: string;
  onNavigate: (tab: string, extra?: any) => void;
}

export const ResourceDirectoryPage: React.FC<ResourceDirectoryPageProps> = ({
  language,
  resources,
  initialSelectedId,
  onNavigate,
}) => {
  const t = TRANSLATIONS[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [activeResourceModal, setActiveResourceModal] = useState<CommunityResource | null>(
    initialSelectedId
      ? resources.find((r) => r.id === initialSelectedId) || null
      : null
  );

  // Geolocation State
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [geoError, setGeoError] = useState<string>('');
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Handle Geolocation Request
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    setGeoError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setGeoError(
          error.code === 1
            ? 'Location permission was denied. You can filter by district instead.'
            : 'Unable to retrieve location. Please select your district manually.'
        );
        setIsLocating(false);
      },
      { timeout: 10000 }
    );
  };

  // Filter and compute distances
  const filteredResources = useMemo(() => {
    let result = resources.map((r) => {
      let distanceKm: number | undefined = undefined;
      if (userLocation && r.coordinates) {
        distanceKm = calculateDistanceKm(
          userLocation.lat,
          userLocation.lng,
          r.coordinates.lat,
          r.coordinates.lng
        );
      } else if (userLocation && DISTRICT_COORDINATES[r.district]) {
        const coords = DISTRICT_COORDINATES[r.district];
        distanceKm = calculateDistanceKm(userLocation.lat, userLocation.lng, coords.lat, coords.lng);
      }
      return { ...r, distanceKm };
    });

    if (selectedCategory !== 'all') {
      result = result.filter((r) => r.category === selectedCategory);
    }

    if (selectedDistrict !== 'all') {
      result = result.filter((r) => r.district === selectedDistrict);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.nameTa.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.descriptionTa.toLowerCase().includes(q) ||
          r.locality.toLowerCase().includes(q)
      );
    }

    if (userLocation) {
      result.sort((a, b) => (a.distanceKm ?? 99999) - (b.distanceKm ?? 99999));
    }

    return result;
  }, [resources, searchQuery, selectedCategory, selectedDistrict, userLocation]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.directoryTitle}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t.directoryTitle}
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            {t.directorySub}
          </p>
        </div>

        {/* Geolocation Button */}
        <div className="flex flex-col items-start md:items-end gap-1">
          <button
            onClick={handleGetLocation}
            disabled={isLocating}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all flex items-center gap-2 ${
              userLocation
                ? 'bg-teal-50 text-teal-800 border-teal-300'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{userLocation ? t.geoActive : t.geoBtn}</span>
          </button>
          {geoError && <span className="text-[11px] text-amber-700">{geoError}</span>}
        </div>
      </div>

      {/* Demo Dataset Disclaimer */}
      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
        <span>{t.demoDataNotice}</span>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Search */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchResourcePlaceholder}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>

        {/* Category Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
          >
            <option value="all">All Categories ({resources.length})</option>
            {Object.entries(t.categories).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* District Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
          >
            <option value="all">All Districts (Tamil Nadu)</option>
            {TN_DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between p-5 space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-emerald-800">{t.categories[res.category]}</span>
                {res.distanceKm !== undefined && (
                  <span className="text-[11px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                    ~{res.distanceKm} km away
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {language === 'ta' ? res.nameTa : res.name}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{res.locality}, {res.district}</span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {language === 'ta' ? res.descriptionTa : res.description}
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.verifiedOn} {res.lastVerifiedDate}</span>
                </span>
                <span className="text-slate-400 font-mono text-[10px]">DEMO</span>
              </div>

              <button
                onClick={() => setActiveResourceModal(res)}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-emerald-50 text-emerald-950 border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{t.viewDetailsBtn}</span>
              </button>
            </div>
          </div>
        ))}

        {filteredResources.length === 0 && (
          <div className="col-span-full py-16 text-center space-y-3 bg-white rounded-xl border border-slate-200">
            <Compass className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              No matching community resources found
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search query or reset category/district filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDistrict('all');
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Resource Detail Modal */}
      {activeResourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full border border-slate-200 overflow-hidden space-y-4 p-6 animate-fadeIn">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">
                  {t.categories[activeResourceModal.category]}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {language === 'ta' ? activeResourceModal.nameTa : activeResourceModal.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveResourceModal(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>
                  <strong>Location:</strong> {activeResourceModal.locality}, {activeResourceModal.district} District
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <PhoneCall className="w-4 h-4 text-teal-700 shrink-0" />
                <span>
                  <strong>Contact / Helpline:</strong> {activeResourceModal.contactInfo}
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  <strong>Source:</strong> {activeResourceModal.source}
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Last Verified:</strong> {activeResourceModal.lastVerifiedDate}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 mt-2 space-y-1">
                <span className="font-semibold text-slate-800">Resource Scope & Services:</span>
                <p className="leading-relaxed">
                  {language === 'ta'
                    ? activeResourceModal.descriptionTa
                    : activeResourceModal.description}
                </p>
              </div>

              <div className="p-2.5 bg-amber-50 rounded border border-amber-200 text-[11px] text-amber-900">
                Notice: Telephone contact numbers are mock identifiers for the MyBharat competition prototype.
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveResourceModal(null)}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveResourceModal(null);
                  onNavigate('assessment');
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white transition-colors"
              >
                Request Assistance Through This Resource
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
