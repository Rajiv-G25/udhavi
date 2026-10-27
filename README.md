# UDHAVI (உதவி) — AI-Powered Social Support Gap Detector

> **"Every Unmet Need Deserves a Helping Hand."**  
> *Built for the MyBharat Hack for Social Cause Competition*  
> **Theme:** Rural Development & Livelihoods in Tamil Nadu

---

## 🌾 The Problem
Rural communities across Tamil Nadu face severe friction when seeking social support. Even when schemes, subsidies, and non-profit resources exist, vulnerable individuals—such as elderly citizens living alone, handloom weavers recovering from monsoon damage, and marginal farmers—are blocked by:
1. **Documentation Bottlenecks:** Missing death certificates, unregistered artisan cards (Pehchan), or un-updated smart ration cards cause silent rejections.
2. **Geographical & Transport Barriers:** Taluk offices situated 20–35 km away force daily-wage workers to sacrifice a day's livelihood for every inquiry.
3. **Information & Digital Divide:** Inability to navigate online government portals and fragmented departmental silos.

---

## 💡 The Solution: UDHAVI
UDHAVI is an AI-assisted social-support platform that:
- Diagnoses **unmet needs and hidden barriers** before a citizen applies.
- Generates a **Support Gap Report** highlighting missing paperwork, accessibility hurdles, and clear 3-step action roadmaps.
- Matches citizens with **verified local community resources** (NGOs, SHG federations, government desks).
- Connects consented requests with **field volunteers** for doorstep navigation.
- Provides a transparent **Referral & Follow-Up Tracker** with unique reference IDs (e.g. `UDH-TN-2026-4821`).

---

## 🛠️ Full-Stack Technology Stack
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React icons, Motion
- **Analytics:** Recharts for dynamic barrier distributions and geographic charts
- **Backend:** Express (`server.ts`) with custom REST endpoints mounted with Vite middleware
- **AI Integration:** Google Gemini API (`gemini-3.8-flash`) via the `@google/genai` SDK on the server, with intelligent deterministic fallbacks for offline evaluation
- **Location:** Browser Geolocation API for proximity calculation with Haversine formula across Tamil Nadu districts
- **Localization:** Native Tamil (தமிழ்) and English bilingual interface with Noto Sans Tamil typography

---

## 🌟 Key Application Modules
1. **Landing Page:** Hero documentary imagery, problem-solution narrative, impact counters, and illustrative rural case studies.
2. **Citizen Support Assessment:** Minimal data collection (strictly **NO** Aadhaar, passwords, or bank details collected) with instant gap diagnosis.
3. **Support Gap Detector:** Automated report breaking down primary need, documentation shortfalls, geographical hurdles, and recommended action steps.
4. **Udhavi AI Assistant:** Interactive bilingual assistant powered by Gemini 3.8 Flash server-side.
5. **Community Resource Directory:** Searchable grassroots organizations across Tamil Nadu, filterable by district and category, with location proximity discovery.
6. **Referral & Follow-Up Tracker:** Milestone progress tracking by reference ID (`Submitted` → `Under Review` → `Resource Suggested` → `Referred` → `Assistance Confirmed` → `Closed`).
7. **Volunteer Dashboard:** Consented citizen queue, filterable by urgency and location, with status simulation controls.
8. **Impact Analytics Dashboard:** Real-time charts calculating barrier frequencies, district distributions, and resolution funnels.
9. **7-Step Hackathon Demo Walkthrough:** An interactive modal enabling competition judges to walk through the complete rural weaver scenario with 1 click.

---

## 🚀 Running the Project
```bash
# Install dependencies
npm install

# Start development server (runs tsx server.ts on port 3000)
npm run dev

# Build for production
npm run build
```

---

## 🔒 Privacy & Social Impact Guarantee
- UDHAVI does not store sensitive personal identification (no Aadhaar, PAN, or bank credentials).
- Clear preliminary guidance disclaimers inform citizens that AI recommendations are for navigational assistance and do not constitute legal government entitlement.
