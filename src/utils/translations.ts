import { Language, SupportCategory, UrgencyLevel, RequestStatus } from '../types';

export const TRANSLATIONS = {
  en: {
    appTitle: 'UDHAVI',
    appSubTitle: 'AI-Powered Social Support Gap Detector',
    tagline: 'Every Unmet Need Deserves a Helping Hand.',
    themeBadge: 'MyBharat Hack for Social Cause · Rural Development & Livelihoods',
    navHome: 'Home',
    navAssessment: 'Find Support',
    navGapDetector: 'Gap Detector',
    navAssistant: 'Udhavi AI Assistant',
    navDirectory: 'Resource Directory',
    navTracker: 'Track Request',
    navVolunteer: 'Volunteer Hub',
    navAnalytics: 'Impact Analytics',
    navDemoGuide: 'Demo Scenario',

    // Hero
    heroHeadline: 'No One Should Be Left Behind.',
    heroSubtitle: 'Connecting rural communities across Tamil Nadu with social support, overcoming documentation hurdles, fragmented schemes, and accessibility barriers.',
    heroPrimaryCta: 'Find Support Now',
    heroSecondaryCta: 'Join as a Volunteer',
    heroExploreDir: 'Explore Resources',
    heroLiveDemoBtn: 'Try 7-Step Hackathon Demo',

    // How It Works
    howItWorksTitle: 'How UDHAVI Bridges Social Support Gaps',
    howItWorksSub: 'A transparent, community-anchored process from unmet rural need to verified local assistance.',
    step1Title: '1. Citizen Assessment',
    step1Desc: 'Residents or community workers submit basic need details without compromising privacy or sensitive documents.',
    step2Title: '2. AI Gap Detection',
    step2Desc: 'UDHAVI identifies documentation shortfalls, mobility issues, and scheme eligibility barriers before referral.',
    step3Title: '3. Verified Directory Match',
    step3Desc: 'Smart matching with verified NGOs, SHG federations, government service centres, and local welfare bodies.',
    step4Title: '4. Volunteer Follow-up',
    step4Desc: 'Consented requests connect to local grassroots volunteers who provide on-the-ground navigation and tracking.',

    // Features
    feature1Title: 'Documentation Barrier Analysis',
    feature1Desc: 'Flags missing ration card endorsements, disability certificates, or artisan ID registrations before application rejection.',
    feature2Title: 'Bilingual Tamil & English Support',
    feature2Desc: 'Designed from the ground up for rural usability with native Tamil script and simple voice-friendly text guidance.',
    feature3Title: 'Strict Privacy & Zero PII Exposure',
    feature3Desc: 'No Aadhaar numbers, passwords, or bank details collected. Only the minimal information required to find help.',
    feature4Title: 'Transparent Status Tracking',
    feature4Desc: 'Unique reference tracking code keeps citizens and field volunteers informed at each milestone.',

    // Categories
    categories: {
      welfare: 'Government Welfare & Scheme Guidance',
      supplies: 'Essential Supplies & Food Security',
      healthcare: 'Healthcare Access & Medical Camps',
      elderly: 'Elderly Assistance & Pension Care',
      education: 'Rural Education & Student Aid',
      livelihood: 'Livelihood, Handicrafts & Agriculture',
      documents: 'Document & Application Guidance',
      accessibility: 'Disability & Accessibility Assistance',
    } as Record<SupportCategory, string>,

    // Urgency
    urgencyLevels: {
      low: 'Low (Within 2–3 weeks)',
      medium: 'Medium (Within 1 week)',
      high: 'High (Within 48 hours)',
      critical: 'Critical Emergency (Immediate care needed)',
    } as Record<UrgencyLevel, string>,

    // Form
    assessmentTitle: 'Citizen Support Assessment',
    assessmentSub: 'Tell us what support you or someone in your village needs. We will analyze barriers and match with verified local assistance.',
    privacyNote: 'Privacy First: We do not ask for Aadhaar numbers, bank details, or sensitive financial information.',
    districtLabel: 'District in Tamil Nadu',
    villageLabel: 'Village / Town / Locality',
    villagePlaceholder: 'e.g. Thiruvaiyaru, Alangudi, or Ward 4',
    categoryLabel: 'Type of Support Required',
    urgencyLabel: 'Urgency Level',
    difficultyLabel: 'Main Difficulty Faced',
    difficultyPlaceholder: 'e.g. Missing death certificate of spouse, no transport to Taluk office, unable to read online forms',
    languagePrefLabel: 'Preferred Communication Language',
    descriptionLabel: 'Describe your situation (Optional but helpful)',
    descriptionPlaceholder: 'e.g. An elderly weaver living with ailing spouse has not received monthly pension for 6 months after migration...',
    consentLabel: 'I consent to sharing this basic summary with verified local volunteers and welfare organizations to find help.',
    submitAssessmentBtn: 'Analyze Need & Detect Gaps',
    submittingBtn: 'Analyzing Support Gaps...',
    validationError: 'Please complete all required fields and grant consent to proceed.',

    // Gap Report
    gapReportTitle: 'Support Gap Report',
    gapReportSub: 'Automated barrier detection and structured recommendation roadmap.',
    primaryNeedLabel: 'Primary Unmet Need',
    identifiedBarriersLabel: 'Identified Access Barriers',
    missingDocsLabel: 'Missing or Required Documents',
    suggestedActionsLabel: 'Recommended Action Steps',
    matchedResourcesLabel: 'Matching Community Resources in Directory',
    trackingIdNotice: 'Your Reference Tracking ID:',
    trackThisRequestBtn: 'Track This Request Timeline',
    preliminaryDisclaimer: 'Preliminary Guidance Notice: AI suggestions are for guidance and navigational assistance only. They do not constitute official government eligibility or legal entitlement.',

    // Tracker
    trackerTitle: 'Referral & Follow-Up Tracker',
    trackerSub: 'Enter your unique reference ID to check current status and milestone timeline.',
    lookupPlaceholder: 'Enter Reference ID (e.g. UDH-TN-2026-4821)',
    searchBtn: 'Search Status',
    requestNotFound: 'No request found with this Reference ID. Please verify or try the sample demo ID.',
    sampleIdPrompt: 'Try demo ID: UDH-TN-2026-4821',
    currentStatusLabel: 'Current Lifecycle Status',
    timelineTitle: 'Milestone Timeline',
    simulationNotice: 'Demonstration Notice: Status changes in this hackathon prototype are simulated to demonstrate the workflow. No real citizen records are exposed.',

    // Statuses
    statuses: {
      'Submitted': 'Submitted',
      'Under Review': 'Under Review',
      'Resource Suggested': 'Resource Suggested',
      'Referred': 'Referred to Local Agency',
      'Assistance Confirmed': 'Assistance Confirmed',
      'Closed': 'Resolved & Closed',
    } as Record<RequestStatus, string>,

    // Volunteer
    volunteerTitle: 'Community Volunteer Dashboard',
    volunteerSub: 'Review consented citizen requests, identify rural gaps, propose referrals, and record field assistance.',
    volunteerBadge: 'Field Worker Console (Demo Mode)',
    totalRequestsLabel: 'Total Active Requests',
    criticalCountLabel: 'High/Critical Urgency',
    referredCountLabel: 'Referred to Services',
    completedCountLabel: 'Assistance Confirmed',
    filterByDistrict: 'Filter by District',
    filterByCategory: 'Filter by Category',
    filterByUrgency: 'Filter by Urgency',
    allOption: 'All',
    acceptRequestBtn: 'Offer Help / Propose Referral',
    updateStatusBtn: 'Update Status',
    volunteerNotePrompt: 'Field Volunteer Action Notes',

    // Resources
    directoryTitle: 'Community Resource Directory',
    directorySub: 'Verified grassroots NGOs, SHG federations, government facilitation desks, and healthcare centres across Tamil Nadu.',
    demoDataNotice: 'DEMO DATASET: All phone numbers and specific volunteer entries are sample mock data for prototype evaluation.',
    geoBtn: 'Use My Current Location',
    geoActive: 'Sorted by Proximity to your Location',
    searchResourcePlaceholder: 'Search by organization name, scheme, or keywords...',
    verifiedOn: 'Verified on:',
    sourceLabel: 'Source:',
    contactLabel: 'Helpline / Contact:',
    viewDetailsBtn: 'View Resource Details',

    // Assistant
    assistantTitle: 'Udhavi AI Support Assistant',
    assistantSub: 'Ask questions in English or Tamil about Tamil Nadu welfare schemes, documentation checklists, and rural support pathways.',
    assistantInputPlaceholder: 'Type your question in English or தமிழ் (e.g., How to apply for Old Age Pension without death certificate?)...',
    sendBtn: 'Send Question',
    quickQuestions: [
      'How can an elderly weaver apply for pension in Thanjavur?',
      'What documents are needed for rural disabled mobility aid?',
      'How to resolve a blocked ration card in a remote village?',
      'Available livelihood schemes for women self-help groups?'
    ],
    demoAssistantNotice: 'Grounded Assistant: Uses Gemini server-side when configured, or reliable deterministic guidance in offline mode. Never gives medical or legal advice.',

    // Analytics
    analyticsTitle: 'Impact & Gap Analytics',
    analyticsSub: 'Real-time aggregated insights on rural support gaps, barrier frequencies, and geographic distribution across Tamil Nadu.',
    chartBarriersTitle: 'Identified Barriers Distribution',
    chartCategoriesTitle: 'Support Requests by Need Category',
    chartDistrictsTitle: 'Requests Across Tamil Nadu Districts',
    chartStatusTitle: 'Referral Pipeline Funnel',
    illustrativeLabel: 'Illustrative Prototype Data · Calculated dynamically from loaded records',

    // Footer
    footerMission: 'UDHAVI is an open civic innovation initiative engineered for the MyBharat Hack for Social Cause competition, addressing rural development and livelihood gaps in Tamil Nadu.',
    footerPrivacy: 'Privacy & Data Governance',
    footerAccessibility: 'Accessibility Statement',
    footerContact: 'State Support Helplines',
    footerCopyright: '© 2026 UDHAVI Project. Built for MyBharat Hack for Social Cause.',
  },

  ta: {
    appTitle: 'உதவி (UDHAVI)',
    appSubTitle: 'சமூக உதவி இடைவெளி கண்டறியும் ஏஐ தளம்',
    tagline: 'ஒவ்வொரு பூர்த்தி செய்யப்படாத தேவைக்கும் ஒரு உதவும் கரம் தேவை.',
    themeBadge: 'மைபாரத் சமூக நலப் போட்டி · ஊரக வளர்ச்சி மற்றும் வாழ்வாதாரம்',
    navHome: 'முகப்பு',
    navAssessment: 'உதவி தேடுங்கள்',
    navGapDetector: 'இடைவெளி அறிக்கை',
    navAssistant: 'உதவி AI வழிகாட்டி',
    navDirectory: 'வளங்கள் பட்டியல்',
    navTracker: 'நிலை அறிதல்',
    navVolunteer: 'தன்னார்வலர் தளம்',
    navAnalytics: 'தாக்க பகுப்பாய்வு',
    navDemoGuide: 'டெமோ விளக்கம்',

    // Hero
    heroHeadline: 'யாரும் பின்தங்கிவிடக் கூடாது.',
    heroSubtitle: 'தமிழ்நாட்டின் கிராமப்புற மக்களுக்கு தேவையான அரசு திட்டங்கள், சமூக உதவிகள் மற்றும் வாழ்வாதார வாய்ப்புகளை தடையின்றி சேர்க்கும் சமூக-தொழில்நுட்ப தளம்.',
    heroPrimaryCta: 'உதவி பெறுங்கள்',
    heroSecondaryCta: 'தன்னார்வலராக இணையுங்கள்',
    heroExploreDir: 'வளங்களை காண்க',
    heroLiveDemoBtn: '7-படி போட்டி செயல்முறை',

    // How It Works
    howItWorksTitle: 'உதவி தளம் எவ்வாறு இடைவெளிகளை இணைக்கிறது?',
    howItWorksSub: 'கிராமப்புற மக்களின் தேவைகள் முதல் உள்ளூர் உதவி வரை வெளிப்படையான வழிமுறை.',
    step1Title: '1. குடிமக்கள் தேவை பதிவு',
    step1Desc: 'தனியுரிமை பாதிக்காத வகையில் எளிய தகவல்களை மட்டும் வழங்கி தேவையை பதிவு செய்தல்.',
    step2Title: '2. AI இடைவெளி கண்டறிதல்',
    step2Desc: 'ஆவணக் குறைபாடுகள், தொலைதூரப் போக்குவரத்து சிக்கல்கள் மற்றும் விழிப்புணர்வு தடைகளை முன்கூட்டியே கண்டறிதல்.',
    step3Title: '3. சரிபார்க்கப்பட்ட வள இணைப்பு',
    step3Desc: 'அருகிலுள்ள மகளிர் சுய உதவிக்குழுக்கள், அரசு சேவை மையங்கள் மற்றும் தொண்டு நிறுவனங்களுடன் பொருத்துதல்.',
    step4Title: '4. தன்னார்வலர் களப்பணி',
    step4Desc: 'அனுமதி பெற்ற தேவைகளை உள்ளூர் களப்பணியாளர்கள் ஏற்று நேரடி வழிகாட்டல் வழங்குதல்.',

    // Features
    feature1Title: 'ஆவண தடை பகுப்பாய்வு',
    feature1Desc: 'விண்ணப்பங்கள் நிராகரிக்கப்படுவதற்கு முன்பே விடுபட்ட சான்றிதழ்கள் மற்றும் ஆவணங்களை துல்லியமாக சுட்டிக்காட்டுகிறது.',
    feature2Title: 'தமிழ் & ஆங்கில மொழி ஆதரவு',
    feature2Desc: 'கிராமப்புற மக்கள் எளிதாக வாசிக்கக்கூடிய தெளிவான தமிழ் வடிவம் மற்றும் எளிய வழிகாட்டல்.',
    feature3Title: 'ஆதார் அல்லது வங்கி ரகசியங்கள் கேட்கப்படாது',
    feature3Desc: 'அவசியமற்ற தனிநபர் தகவல்களை தவிர்த்து, உதவிக்கு தேவையான அடிப்படை விவரங்களை மட்டுமே சேகரிக்கிறோம்.',
    feature4Title: 'வெளிப்படையான குறிப்பு எண் கண்காணிப்பு',
    feature4Desc: 'தனித்துவ குறிப்பு எண் மூலம் ஒவ்வொரு கட்ட முன்னேற்றத்தையும் பொதுமக்கள் கண்காணிக்கலாம்.',

    // Categories
    categories: {
      welfare: 'அரசு நலத்திட்டங்கள் மற்றும் வழிகாட்டல்',
      supplies: 'அத்தியாவசிய உணவு மற்றும் வாழ்வாதார பொருட்கள்',
      healthcare: 'மருத்துவ சிகிச்சை மற்றும் மருத்துவ முகாம்கள்',
      elderly: 'முதியோர் பராமரிப்பு மற்றும் ஓய்வூதிய உதவி',
      education: 'கிராமப்புற கல்வி மற்றும் மாணவர் உதவித்தொகை',
      livelihood: 'வாழ்வாதாரம், கைவினை மற்றும் சுயதொழில்',
      documents: 'சான்றிதழ் மற்றும் விண்ணப்ப வழிகாட்டல்',
      accessibility: 'மாற்றுத்திறனாளிகள் உபகரணங்கள் மற்றும் உதவி',
    } as Record<SupportCategory, string>,

    // Urgency
    urgencyLevels: {
      low: 'குறைந்த அவசரம் (2–3 வாரங்களுக்குள்)',
      medium: 'நடுத்தர அவசரம் (1 வாரத்திற்குள்)',
      high: 'அதி முக்கியம் (48 மணி நேரத்திற்குள்)',
      critical: 'அவசர நிலை (உடனடி உதவி தேவை)',
    } as Record<UrgencyLevel, string>,

    // Form
    assessmentTitle: 'குடிமக்கள் உதவி மதிப்பீடு',
    assessmentSub: 'உங்களுக்கோ அல்லது உங்கள் கிராமத்தில் உள்ளவருக்கோ தேவையான உதவியைப் பதிவு செய்யுங்கள். தடைகளை ஆய்வு செய்து பொருத்தமான வழிகாட்டலை வழங்குகிறோம்.',
    privacyNote: 'பாதுகாப்பு உறுதிமொழி: ஆதார் எண்கள், வங்கி கணக்கு விவரங்கள் அல்லது கடவுச்சொற்கள் எதுவும் கேட்கப்படாது.',
    districtLabel: 'தமிழ்நாடு மாவட்டம்',
    villageLabel: 'கிராமம் / ஊர் / பகுதி',
    villagePlaceholder: 'உதா: திருவையாறு, ஆலங்குடி, அல்லது வார்டு 4',
    categoryLabel: 'தேவையான உதவி வகை',
    urgencyLabel: 'அவசர நிலை',
    difficultyLabel: 'எதிர்கொள்ளும் முக்கிய சிக்கல்',
    difficultyPlaceholder: 'உதா: கணவரின் இறப்புச் சான்றிதழ் இல்லை, தாலுகா அலுவலகம் செல்ல வழியில்லை, இணையத்தில் விண்ணப்பிக்க தெரியவில்லை',
    languagePrefLabel: 'விருப்ப மொழி',
    descriptionLabel: 'சூழ்நிலையை விவரிக்கவும் (விருப்பத்தேர்வு)',
    descriptionPlaceholder: 'உதா: முதிய நெசவாளர் குடும்பத்தில் ஓய்வூதியம் கிடைக்கவில்லை, விண்ணப்பம் எங்கு கொடுப்பது என்று தெரியவில்லை...',
    consentLabel: 'சரிபார்க்கப்பட்ட உள்ளூர் தன்னார்வலர்கள் மற்றும் அமைப்புகள் உதவ இந்த அடிப்படை தகவலை பகிர ஒப்புக்கொள்கிறேன்.',
    submitAssessmentBtn: 'தேவையை ஆய்வு செய்து இடைவெளிகளை காண்க',
    submittingBtn: 'இடைவெளிகள் ஆய்வு செய்யப்படுகின்றன...',
    validationError: 'அனைத்து கட்டாய புலங்களையும் பூர்த்தி செய்து சம்மதத்தை தேர்வு செய்யவும்.',

    // Gap Report
    gapReportTitle: 'சமூக உதவி இடைவெளி அறிக்கை',
    gapReportSub: 'கண்டறியப்பட்ட அணுகல் தடைகள் மற்றும் அடுத்தகட்ட வழிகாட்டல் பாதை.',
    primaryNeedLabel: 'முதன்மை தேவை',
    identifiedBarriersLabel: 'கண்டறியப்பட்ட அணுகல் தடைகள்',
    missingDocsLabel: 'தேவைப்படும் ஆவணங்கள்',
    suggestedActionsLabel: 'பரிந்துரைக்கப்படும் செயல்முறைகள்',
    matchedResourcesLabel: 'பொருத்தமான சமூக வளங்கள்',
    trackingIdNotice: 'உங்கள் குறிப்பு கண்காணிப்பு எண்:',
    trackThisRequestBtn: 'இந்த கோரிக்கையை கண்காணிக்கவும்',
    preliminaryDisclaimer: 'முதற்கட்ட வழிகாட்டல் குறிப்பு: AI பரிந்துரைகள் வழிகாட்டலுக்காக மட்டுமே. இவை அரசு தகுதியையோ அல்லது உத்தரவாதத்தையோ அளிக்காது.',

    // Tracker
    trackerTitle: 'கோரிக்கை நிலை கண்காணிப்பகம்',
    trackerSub: 'உங்கள் குறிப்பு எண்ணை உள்ளிட்டு தற்போதைய நிலையை அறியவும்.',
    lookupPlaceholder: 'குறிப்பு எண் (உதா: UDH-TN-2026-4821)',
    searchBtn: 'நிலையை தேடு',
    requestNotFound: 'இந்த குறிப்பு எண்ணில் கோரிக்கை எதுவும் இல்லை. தயவுசெய்து சரிபார்க்கவும்.',
    sampleIdPrompt: 'மாதிரி எண்: UDH-TN-2026-4821',
    currentStatusLabel: 'தற்போதைய நிலை',
    timelineTitle: 'காலவரிசை முன்னேற்றம்',
    simulationNotice: 'டெமோ அறிவிப்பு: இந்த மாதிரி திட்டத்தில் நிலைகள் செயல்முறை விளக்கத்திற்காக மட்டுமே மாற்றப்படுகின்றன.',

    // Statuses
    statuses: {
      'Submitted': 'சமர்ப்பிக்கப்பட்டது',
      'Under Review': 'ஆய்வில் உள்ளது',
      'Resource Suggested': 'வளங்கள் பரிந்துரைக்கப்பட்டன',
      'Referred': 'உள்ளூர் அமைப்புக்கு பரிந்துரைக்கப்பட்டது',
      'Assistance Confirmed': 'உதவி உறுதிசெய்யப்பட்டது',
      'Closed': 'தீர்வு காணப்பட்டு நிறைவுற்றது',
    } as Record<RequestStatus, string>,

    // Volunteer
    volunteerTitle: 'தன்னார்வலர் கட்டுப்பாட்டு தளம்',
    volunteerSub: 'மக்களின் உதவி கோரிக்கைகளை ஆய்வு செய்து களப்பணி ஆதரவு வழங்குங்கள்.',
    volunteerBadge: 'களப்பணியாளர் பணியகம் (டெமோ முறை)',
    totalRequestsLabel: 'மொத்த கோரிக்கைகள்',
    criticalCountLabel: 'அதி முக்கிய அவசரம்',
    referredCountLabel: 'பரிந்துரைக்கப்பட்டவை',
    completedCountLabel: 'உதவி பெற்றவை',
    filterByDistrict: 'மாவட்டம் வாரியாக வடிகட்டவும்',
    filterByCategory: 'பிரிவு வாரியாக வடிகட்டவும்',
    filterByUrgency: 'அவசரம் வாரியாக வடிகட்டவும்',
    allOption: 'அனைத்தும்',
    acceptRequestBtn: 'உதவி வழங்க / பரிந்துரைக்க',
    updateStatusBtn: 'நிலையை புதுப்பிக்கவும்',
    volunteerNotePrompt: 'களப்பணியாளர் குறிப்புகள்',

    // Resources
    directoryTitle: 'சமூக வளங்கள் அடைவு',
    directorySub: 'தமிழ்நாட்டின் சரிபார்க்கப்பட்ட அரசு உதவி மையங்கள், தொண்டு நிறுவனங்கள் மற்றும் சுய உதவி அமைப்புகள்.',
    demoDataNotice: 'டெமோ தரவுத்தளம்: தொலைபேசி எண்கள் மற்றும் முகவரிகள் மாதிரி மதிப்பீட்டிற்காக மட்டுமே.',
    geoBtn: 'என் தற்போதைய இருப்பிடத்தைப் பயன்படுத்து',
    geoActive: 'இருப்பிடத்தின் அருகாமை வரிசைப்படுத்தப்பட்டது',
    searchResourcePlaceholder: 'அமைப்பு பெயர், திட்டம் அல்லது முக்கிய சொற்களை தேடவும்...',
    verifiedOn: 'சரிபார்க்கப்பட்ட நாள்:',
    sourceLabel: 'ஆதாரம்:',
    contactLabel: 'தொடர்பு / உதவி எண்:',
    viewDetailsBtn: 'முழு விவரம் காண்க',

    // Assistant
    assistantTitle: 'உதவி AI வழிகாட்டி',
    assistantSub: 'தமிழ்நாடு அரசு திட்டங்கள், ஆவண சான்றிதழ்கள் மற்றும் ஊரக உதவிகள் பற்றி தமிழில் அல்லது ஆங்கிலத்தில் கேளுங்கள்.',
    assistantInputPlaceholder: 'உங்கள் கேள்வியை தமிழில் அல்லது ஆங்கிலத்தில் தட்டச்சு செய்யவும்...',
    sendBtn: 'கேள்வி அனுப்பு',
    quickQuestions: [
      'தஞ்சாவூரில் முதியோர் ஓய்வூதியத்திற்கு எவ்வாறு விண்ணப்பிப்பது?',
      'மாற்றுத்திறனாளி உபகரணங்கள் பெற என்னென்ன ஆவணங்கள் தேவை?',
      'கிராமத்தில் குடும்ப அட்டை முடக்கப்பட்டால் என்ன செய்ய வேண்டும்?',
      'மகளிர் சுய உதவிக்குழுக்களுக்கான தற்போதைய வாழ்வாதார திட்டங்கள் என்ன?'
    ],
    demoAssistantNotice: 'வழிகாட்டி: ஜெமினி சர்வர்-வழி இயங்குகிறது. இணையமில்லாத போதும் நிலையான வழிகாட்டல் தரும்.',

    // Analytics
    analyticsTitle: 'தாக்கம் மற்றும் இடைவெளி பகுப்பாய்வு',
    analyticsSub: 'தமிழ்நாடு முழுவதும் சமூக உதவி இடைவெளிகள் மற்றும் தடைகளின் தொகுக்கப்பட்ட புள்ளிவிவரங்கள்.',
    chartBarriersTitle: 'கண்டறியப்பட்ட தடைகளின் விநியோகம்',
    chartCategoriesTitle: 'பிரிவுகள் வாரியாக உதவி தேவைகள்',
    chartDistrictsTitle: 'மாவட்டங்கள் வாரியான கோரிக்கைகள்',
    chartStatusTitle: 'பரிந்துரை நிலைகளின் புனல்',
    illustrativeLabel: 'மாதிரி டெமோ தரவு · கணினி மூலம் கணக்கிடப்பட்டது',

    // Footer
    footerMission: 'உதவி (UDHAVI) என்பது மைபாரத் சமூகப் போட்டிக்காக உருவாக்கப்பட்ட ஊரக சமூக இடைவெளி இணைக்கும் தளம்.',
    footerPrivacy: 'தனியுரிமை & பாதுகாப்பு கொள்கை',
    footerAccessibility: 'அணுகல்தன்மை உறுதிப்பாடு',
    footerContact: 'மாநில உதவி எண்கள்',
    footerCopyright: '© 2026 UDHAVI திட்டம். மைபாரத் சமூக நலப் போட்டிக்காக உருவாக்கப்பட்டது.',
  }
};
