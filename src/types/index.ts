export type Language = 'en' | 'ta';

export type SupportCategory =
  | 'welfare'
  | 'supplies'
  | 'healthcare'
  | 'elderly'
  | 'education'
  | 'livelihood'
  | 'documents'
  | 'accessibility';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

export type RequestStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Resource Suggested'
  | 'Referred'
  | 'Assistance Confirmed'
  | 'Closed';

export interface BarrierItem {
  id: string;
  category: 'documentation' | 'awareness' | 'accessibility' | 'procedural' | 'language';
  title: string;
  titleTa: string;
  description: string;
  descriptionTa: string;
  severity: 'high' | 'medium' | 'low';
}

export interface GapReport {
  primaryNeed: string;
  primaryNeedTa: string;
  identifiedBarriers: BarrierItem[];
  missingDocuments: string[];
  missingDocumentsTa: string[];
  suggestedActions: string[];
  suggestedActionsTa: string[];
  recommendedResourceIds: string[];
  disclaimer: string;
  disclaimerTa: string;
  isAiGenerated: boolean;
}

export interface StatusTimelineEvent {
  status: RequestStatus;
  timestamp: string;
  actor: string;
  note: string;
  noteTa: string;
}

export interface SupportRequest {
  id: string;
  createdAt: string;
  district: string;
  village: string;
  category: SupportCategory;
  urgency: UrgencyLevel;
  mainDifficulty: string;
  preferredLanguage: Language;
  description: string;
  status: RequestStatus;
  gapReport: GapReport;
  timeline: StatusTimelineEvent[];
  assignedVolunteer?: string;
  referredEntity?: string;
  consentGiven: boolean;
}

export interface CommunityResource {
  id: string;
  name: string;
  nameTa: string;
  category: SupportCategory;
  district: string;
  locality: string;
  description: string;
  descriptionTa: string;
  contactInfo: string;
  phoneDemo: string;
  source: string;
  lastVerifiedDate: string;
  isVerified: boolean;
  isDemoData: boolean;
  availabilityStatus: 'Active' | 'Limited capacity' | 'Temporarily paused';
  coordinates?: {
    lat: number;
    lng: number;
  };
  distanceKm?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isDemoFallback?: boolean;
  suggestedPrompts?: string[];
  matchedResources?: CommunityResource[];
}
