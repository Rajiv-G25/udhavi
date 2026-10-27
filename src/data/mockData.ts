import { CommunityResource, SupportRequest, GapReport, SupportCategory } from '../types';

export const TN_DISTRICTS = [
  'Thanjavur',
  'Madurai',
  'Dharmapuri',
  'Salem',
  'Tiruvannamalai',
  'Coimbatore',
  'Ramanathapuram',
  'Tirunelveli',
  'Cuddalore',
  'Dindigul',
  'Nagapattinam',
  'Tiruchirappalli',
  'Tenkasi',
  'Sivaganga',
  'Pudukkottai',
  'Erode',
  'Vellore',
  'Viluppuram',
];

// District approximate coordinates for distance estimation from user's geolocation
export const DISTRICT_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'Thanjavur': { lat: 10.7870, lng: 79.1378 },
  'Madurai': { lat: 9.9252, lng: 78.1198 },
  'Dharmapuri': { lat: 12.1211, lng: 78.1582 },
  'Salem': { lat: 11.6643, lng: 78.1460 },
  'Tiruvannamalai': { lat: 12.2253, lng: 79.0747 },
  'Coimbatore': { lat: 11.0168, lng: 76.9558 },
  'Ramanathapuram': { lat: 9.3639, lng: 78.8395 },
  'Tirunelveli': { lat: 8.7139, lng: 77.7567 },
  'Cuddalore': { lat: 11.7480, lng: 79.7714 },
  'Dindigul': { lat: 10.3673, lng: 77.9803 },
  'Nagapattinam': { lat: 10.7672, lng: 79.8449 },
  'Tiruchirappalli': { lat: 10.7905, lng: 78.7047 },
  'Tenkasi': { lat: 8.9594, lng: 77.3150 },
  'Sivaganga': { lat: 9.8433, lng: 78.4809 },
  'Pudukkottai': { lat: 10.3797, lng: 78.8208 },
  'Erode': { lat: 11.3410, lng: 77.7172 },
  'Vellore': { lat: 12.9165, lng: 79.1325 },
  'Viluppuram': { lat: 11.9401, lng: 79.4861 },
};

export const INITIAL_COMMUNITY_RESOURCES: CommunityResource[] = [
  {
    id: 'res-tn-01',
    name: 'TN Rural Livelihood Mission (TNSRLM) - Handloom & Artisan Desk',
    nameTa: 'தமிழ்நாடு ஊரக வாழ்வாதார இயக்கம் - கைத்தறி மற்றும் கைவினை பிரிவு',
    category: 'livelihood',
    district: 'Thanjavur',
    locality: 'Kumbakonam Rural Cluster',
    description: 'Government facilitation cell supporting traditional weavers, potters, and rural artisans with equipment subsidies, artisan cards, and marketing linkages.',
    descriptionTa: 'பாரம்பரிய நெசவாளர்கள் மற்றும் கிராமப்புற கலைஞர்களுக்கு உபகரண மானியங்கள், அடையாள அட்டை மற்றும் சந்தை வாய்ப்புகளை வழங்கும் அரசு உதவி மையம்.',
    contactInfo: 'District Mission Management Unit, Collectorate Campus (Demo: 04362-230000)',
    phoneDemo: '04362-230000',
    source: 'TN Rural Development & Panchayat Raj Dept (Public Directory)',
    lastVerifiedDate: '2026-09-15',
    isVerified: true,
    isDemoData: true,
    availabilityStatus: 'Active',
    coordinates: { lat: 10.9602, lng: 79.3845 },
  },
  {
    id: 'res-tn-02',
    name: 'Grama Seva Trust & Elderly Care Outreach',
    nameTa: 'கிராம சேவா அறக்கட்டளை - முதியோர் உதவி மையம்',
    category: 'elderly',
    district: 'Madurai',
    locality: 'Melur Block, Madurai Rural',
    description: 'Grassroots community NGO providing door-step ration support, monthly pension documentation follow-up, and geriatric health check-ups for rural elders living alone.',
    descriptionTa: 'தனியாக வாழும் கிராமப்புற முதியோருக்கு வீட்டு வாசலிலேயே உணவு ஆதரவு, ஓய்வூதிய ஆவண சரிபார்ப்பு மற்றும் இலவச மருத்துவ உதவி வழங்கும் தன்னார்வ அமைப்பு.',
    contactInfo: 'Melur Main Road, Madurai (Demo: 0452-2551122)',
    phoneDemo: '0452-2551122',
    source: 'Tamil Nadu Social Welfare Board NGO Registry',
    lastVerifiedDate: '2026-10-02',
    isVerified: true,
    isDemoData: true,
    availabilityStatus: 'Active',
    coordinates: { lat: 10.0270, lng: 78.3340 },
  },
  {
    id: 'res-tn-03',
    name: 'District Differently Abled Welfare Office & Mobility Aid Centre',
    nameTa: 'மாவட்ட மாற்றுத்திறனாளிகள் நல அலுவலகம் & உதவி உபகரண மையம்',
    category: 'accessibility',
    district: 'Dharmapuri',
    locality: 'Collectorate Complex, Dharmapuri',
    description: 'Statutory government office facilitating Unique Disability ID (UDID) cards, motorized tricycles, braille kits, and maintenance allowances.',
    descriptionTa: 'UDID அடையாள அட்டை, சக்கர நாற்காலிகள், பிரெய்லி உபகரணங்கள் மற்றும் மாதாந்திர பராமரிப்பு உதவித்தொகை வழங்கும் அரசு நல அலுவலகம்.',
    contactInfo: 'Ground Floor, Collectorate, Dharmapuri (Demo: 04342-230555)',
    phoneDemo: '04342-230555',
    source: 'Dept. for Welfare of Differently Abled Persons, TN',
    lastVerifiedDate: '2026-08-20',
    isVerified: true,
    isDemoData: true,
    availabilityStatus: 'Active',
    coordinates: { lat: 12.1357, lng: 78.1633 },
  },
  {
    id: 'res-tn-04',
    name: 'Valarmathi Women Self-Help Group (SHG) Federation',
    nameTa: 'வளர்மதி மகளிர் சுய உதவிக்குழு கூட்டமைப்பு',
    category: 'livelihood',
    district: 'Salem',
    locality: 'Omalur Rural Division',
    description: 'Community network of 80+ rural women groups offering seed capital micro-loans, millets value-addition training, and dairy cooperative linkages.',
    descriptionTa: '80-க்கும் மேற்பட்ட கிராமப்புற மகளிர் குழுக்களின் கூட்டமைப்பு. சிறுதொழில் கடன், சிறுதானிய மதிப்புக்கூட்டு பயிற்சி மற்றும் பால் பண்ணை வழிகாட்டல் வழங்குகிறது.',
    contactInfo: 'Omalur Block Development Office Rd (Demo: 0427-2443322)',
    phoneDemo: '0427-2443322',
    source: 'Pudhu Vaazhvu Project & TNSRLM records',
    lastVerifiedDate: '2026-09-28',
    isVerified: true,
    isDemoData: true,
    availabilityStatus: 'Active',
    coordinates: { lat: 11.7410, lng: 78.0450 },
  },
  {
    id: 'res-tn-05',
    name: 'e-Seva Common Service Centre (CSC) - Rural Citizen Assistance',
    nameTa: 'இ-சேவை மையம் - கிராமப்புற குடிமக்கள் உதவி மையம்',
    category: 'documents',
    district: 'Tiruvannamalai',
    locality: 'Polur Taluk Centre',
    description: 'Authorized digital facilitation centre helping rural residents apply for Community Certificates, Income Certificates, Old Age Pensions, and Patta transfers.',
    descriptionTa: 'சாதிச் சான்றிதழ், வருமானச் சான்றிதழ், முதியோர் ஓய்வூதியம் மற்றும் பட்டா மாறுதல் விண்ணப்பங்களை இணையத்தில் பதிவு செய்ய உதவும் அரசு அங்கீகரிக்கப்பட்ட மையம்.',
    contactInfo: 'Taluk Office Road, Polur (Demo: 04181-222333)',
    phoneDemo: '04181-222333',
    source: 'TNeGA (Tamil Nadu e-Governance Agency)',
    lastVerifiedDate: '2026-10-10',
    isVerified: true,
    isDemoData: true,
    availabilityStatus: 'Active',
    coordinates: { lat: 12.5085, lng: 79.1270 },
  },
  {
    id: 'res-tn-06',
    name: 'Aravind Rural Eye Care & Mobile Vision Camps',
    nameTa: 'அரவிந்த் ஊரக கண் சிகிச்சை & நடமாடும் மருத்துவ முகாம்',
    category: 'healthcare',
    district: 'Tirunelveli',
    locality: 'Palayamkottai & Rural Outposts',
    description: 'Free rural cataract screening, prescription glasses for farmworkers, and subsidized surgical care for low-income village elders.',
    descriptionTa: 'கிராமப்புற விவசாயத் தொழிலாளர்களுக்கு இலவச கண்புரை பரிசோதனை, மூக்குக்கண்ணாடிகள் மற்றும் முதியோருக்கான கண் அறுவை சிகிச்சை ஆதரவு.',
    contactInfo: 'Swamy Nellaiappar High Rd (Demo: 0462-4356000)',
    phoneDemo: '0462-4356000',
    source: 'Healthcare Community Registry',
    lastVerifiedDate: '2026-09-18',
    isVerified: true,
    isDemoData: true,
    availabilityStatus: 'Active',
    coordinates: { lat: 8.7180, lng: 77.7420 },
  },
  {
    id: 'res-tn-07',
    name: 'Kudumbam Sustainable Agriculture & Food Security Network',
    nameTa: 'குடும்பம் இயற்கை வேளாண்மை மற்றும் உணவுப் பாதுகாப்பு மையம்',
    category: 'supplies',
    district: 'Pudukkottai',
    locality: 'Viralimalai Rural Area',
    description: 'Assists marginal farmers and landless farm workers with indigenous seeds, drought-resistant millets, community grain banks, and organic farming workshops.',
    descriptionTa: 'விளிம்புநிலை விவசாயிகளுக்கு பாரம்பரிய விதைகள், வறட்சியைத் தாங்கும் சிறுதானியங்கள், சமூக தானிய வங்கி மற்றும் இயற்கை விவசாய பயிற்சிகளை வழங்குகிறது.',
    contactInfo: 'Viralimalai Main Road, Pudukkottai (Demo: 04322-290111)',
    phoneDemo: '04322-290111',
    source: 'Voluntary Action Network India',
    lastVerifiedDate: '2026-07-30',
    isVerified: true,
    isDemoData: true,
    availabilityStatus: 'Active',
    coordinates: { lat: 10.6015, lng: 78.5390 },
  },
  {
    id: 'res-tn-08',
    name: 'Tamil Nadu Adi Dravidar & Tribal Welfare Facilitation Desk',
    nameTa: 'ஆதிதிராவிடர் மற்றும் பழங்குடியினர் நல உதவி மையம்',
    category: 'welfare',
    district: 'Ramanathapuram',
    locality: 'Paramakudi Block',
    description: 'Guidance and follow-up for post-matric scholarships, house site pattas, and livelihood capital subsidies for underprivileged rural communities.',
    descriptionTa: 'கல்வி உதவித்தொகை, இலவச வீட்டுமனை பட்டா மற்றும் தொழில் தொடங்க மானிய உதவிகளுக்கு வழிகாட்டும் உதவி மையம்.',
    contactInfo: 'Sub-Collector Office Compound, Paramakudi (Demo: 04564-222888)',
    phoneDemo: '04564-222888',
    source: 'District Welfare Department',
    lastVerifiedDate: '2026-08-14',
    isVerified: true,
    isDemoData: true,
    availabilityStatus: 'Active',
    coordinates: { lat: 9.5440, lng: 78.5910 },
  },
  {
    id: 'res-tn-09',
    name: 'Kalvi Chudar Rural Student & Library Initiative',
    nameTa: 'கல்விச் சுடர் கிராமப்புற மாணவர் வழிகாட்டல் மையம்',
    category: 'education',
    district: 'Cuddalore',
    locality: 'Kurinjipadi Block',
    description: 'Community library and evening study support for first-generation school students, offering textbook banks and government college entrance counselling.',
    descriptionTa: 'கிராமப்புற மாணவர்களுக்கு மாலை நேர படிப்பு மையம், பாடநூல் வங்கி மற்றும் அரசு கல்லூரி சேர்க்கை வழிகாட்டல்.',
    contactInfo: 'Bazaar Street, Kurinjipadi (Demo: 04142-277100)',
    phoneDemo: '04142-277100',
    source: 'Community Youth Collective',
    lastVerifiedDate: '2026-09-05',
    isVerified: true,
    isDemoData: true,
    availabilityStatus: 'Active',
    coordinates: { lat: 11.5645, lng: 79.5960 },
  }
];

export const INITIAL_SUPPORT_REQUESTS: SupportRequest[] = [
  {
    id: 'UDH-TN-2026-4821',
    createdAt: '2026-10-24T10:30:00Z',
    district: 'Thanjavur',
    village: 'Thiruvaiyaru Rural (Kalyanapuram)',
    category: 'livelihood',
    urgency: 'high',
    mainDifficulty: 'Lack of handloom artisan card and lack of working capital for yarn after flood damage.',
    preferredLanguage: 'ta',
    description: 'Traditional cotton silk weaver family of 4. Weaving pit loom was damaged during seasonal monsoon rains. Needs replacement reeds, artisan registration, and link to TNSRLM craft subsidy.',
    status: 'Referred',
    consentGiven: true,
    assignedVolunteer: 'Murugan K. (District Coordinator, Thanjavur Seva)',
    referredEntity: 'TN Rural Livelihood Mission (TNSRLM) - Handloom Desk',
    gapReport: {
      primaryNeed: 'Handloom equipment restoration and working capital linkage for rural weaver family.',
      primaryNeedTa: 'கிராமப்புற நெசவாளர் குடும்பத்திற்கான தறி உபகரண சீரமைப்பு மற்றும் மூலதன மானிய இணைப்பு.',
      identifiedBarriers: [
        {
          id: 'b-1',
          category: 'documentation',
          title: 'Missing Weaver Artisan Identity Card (Pehchan ID)',
          titleTa: 'நெசவாளர் அடையாள அட்டை (பெஹ்சான் அட்டை) இல்லாமை',
          description: 'Without official artisan registration, weaver cannot qualify for central/state subsidized yarn loans.',
          descriptionTa: 'அதிகாரப்பூர்வ அட்டை இல்லாததால் மானிய விலை நூல் மற்றும் கடன் திட்டங்களை பெற இயலவில்லை.',
          severity: 'high',
        },
        {
          id: 'b-2',
          category: 'awareness',
          title: 'Unaware of Flood Damage Relief Schemes',
          titleTa: 'வெள்ள சேத நிவாரண திட்டங்கள் பற்றிய விழிப்புணர்வின்மை',
          description: 'Applicant was unaware of the Special Handloom Corpus Fund for flood-affected artisans in Delta districts.',
          descriptionTa: 'டெல்டா மாவட்ட நெசவாளர்களுக்கான சிறப்பு கைத்தறி நிவாரண நிதி பற்றி விண்ணப்பதாரருக்கு தகவல் தெரியவில்லை.',
          severity: 'medium',
        },
        {
          id: 'b-3',
          category: 'accessibility',
          title: 'Taluk Office 22km Away with Limited Bus Frequency',
          titleTa: 'தாலுகா அலுவலகம் 22 கி.மீ தொலைவில் உள்ளதால் பயணம் செய்வதில் சிரமம்',
          description: 'Elderly artisan faces transport costs and wage loss each time they visit the sub-collectorate in person.',
          descriptionTa: 'நேரில் சென்று வர போக்குவரத்து செலவு மற்றும் அன்றாட கூலி இழப்பு ஏற்படுகிறது.',
          severity: 'medium',
        }
      ],
      missingDocuments: [
        'Artisan Registration Form attested by Village Administrative Officer (VAO)',
        'Local Handloom Cooperative Society membership proof',
        'Photographs of damaged loom pit and equipment'
      ],
      missingDocumentsTa: [
        'கிராம நிர்வாக அலுவலர் (VAO) சான்றளித்த விண்ணப்பம்',
        'நெசவாளர் கூட்டுறவு சங்க உறுப்பினர் அட்டை',
        'சேதமடைந்த தறி உபகரணங்களின் புகைப்படங்கள்'
      ],
      suggestedActions: [
        'Step 1: Volunteer to assist with offline Pehchan artisan card biometric enrollment at nearest e-Seva centre.',
        'Step 2: Submit emergency relief application to TNSRLM Kumbakonam artisan desk with VAO endorsement.',
        'Step 3: Connect family to Kudumbam collective for short-term yarn advance and direct craft fair stall.'
      ],
      suggestedActionsTa: [
        'படி 1: அருகிலுள்ள இ-சேவை மையத்தில் பயோமெட்ரிக் நெசவாளர் அட்டை பதிவு செய்ய தன்னார்வலர் உதவுதல்.',
        'படி 2: கிராம நிர்வாக அலுவலர் கையொப்பத்துடன் TNSRLM உதவி மையத்தில் விண்ணப்பம் சமர்ப்பித்தல்.',
        'படி 3: உடனடியாக நெசவு தொடங்க மூலப்பொருள் மற்றும் சந்தை வாய்ப்பை ஏற்படுத்தி தருதல்.'
      ],
      recommendedResourceIds: ['res-tn-01', 'res-tn-07'],
      disclaimer: 'Preliminary Guidance Notice: AI suggestions are preliminary and do not guarantee financial disbursements. Official vetting is conducted by government departments.',
      disclaimerTa: 'முதற்கட்ட வழிகாட்டல் குறிப்பு: AI பரிந்துரைகள் வழிகாட்டலுக்காக மட்டுமே. உத்தியோகபூர்வ சரிபார்ப்பை அரசுத் துறைகள் மட்டுமே மேற்கொள்ளும்.',
      isAiGenerated: true,
    },
    timeline: [
      {
        status: 'Submitted',
        timestamp: '2026-10-24T10:30:00Z',
        actor: 'Citizen / Community Worker',
        note: 'Support assessment submitted online with privacy consent granted.',
        noteTa: 'தனியுரிமை சம்மதத்துடன் இணையத்தில் உதவி தேவை பதிவு செய்யப்பட்டது.',
      },
      {
        status: 'Under Review',
        timestamp: '2026-10-24T14:15:00Z',
        actor: 'UDHAVI System & Field Coordinator',
        note: 'AI Gap Detection identified documentation shortfall (missing Pehchan card) and travel barriers.',
        noteTa: 'ஆவணக் குறைபாடு மற்றும் பயண சிரமங்கள் கண்டறியப்பட்டு மதிப்பாய்வு செய்யப்பட்டது.',
      },
      {
        status: 'Resource Suggested',
        timestamp: '2026-10-25T09:00:00Z',
        actor: 'UDHAVI Recommendation Engine',
        note: 'Matched with TNSRLM Artisan Desk and local Kudumbam organic & crafts collective.',
        noteTa: 'TNSRLM கைவினை பிரிவு மற்றும் உள்ளூர் உதவி அமைப்புகள் பொருத்தப்பட்டன.',
      },
      {
        status: 'Referred',
        timestamp: '2026-10-26T11:45:00Z',
        actor: 'Volunteer Murugan K.',
        note: 'Referral proposed and acknowledged by District Mission Management Unit (Simulation Mode).',
        noteTa: 'தன்னார்வலர் மூலம் மாவட்ட திட்ட அலுவலகத்திற்கு பரிந்துரை அனுப்பப்பட்டது (மாதிரி டெமோ).',
      }
    ]
  },
  {
    id: 'UDH-TN-2026-3104',
    createdAt: '2026-10-22T08:15:00Z',
    district: 'Madurai',
    village: 'Melur Taluk (Kottampatti)',
    category: 'elderly',
    urgency: 'high',
    mainDifficulty: 'Elderly widow living alone, pension stopped 5 months ago after bank branch merger.',
    preferredLanguage: 'ta',
    description: '74-year-old resident with limited mobility. Pension payment was redirected during rural bank consolidation. Unable to travel to city branch for biometric e-KYC update.',
    status: 'Assistance Confirmed',
    consentGiven: true,
    assignedVolunteer: 'Selvi Anbarasan (Village Asha Worker)',
    referredEntity: 'Grama Seva Trust & Elderly Care Outreach',
    gapReport: {
      primaryNeed: 'Doorstep biometric e-KYC and revival of Old Age Pension (OAP) for elderly rural widow.',
      primaryNeedTa: 'முதிய பெண்மணிக்கான முதியோர் ஓய்வூதியம் மீண்டும் கிடைக்க வங்கி பயோமெட்ரிக் சரிபார்ப்பு உதவி.',
      identifiedBarriers: [
        {
          id: 'b-e1',
          category: 'procedural',
          title: 'Bank Merger IFSC Discrepancy & Biometric KYC Failure',
          titleTa: 'வங்கி இணைப்பு மாற்றத்தால் உருவான IFSC மற்றும் பயோமெட்ரிக் சிக்கல்',
          description: 'Pension credits bounced due to updated IFSC codes and dormant account classification.',
          descriptionTa: 'வங்கி புதிய கிளையுடன் இணைக்கப்பட்டதால் பழைய கணக்கு முடக்கப்பட்டு ஓய்வூதியம் திரும்பச் சென்றுள்ளது.',
          severity: 'high',
        },
        {
          id: 'b-e2',
          category: 'accessibility',
          title: 'Physical Frailty & Zero Rural Public Transport',
          titleTa: 'முதிய வயது மற்றும் நேரடி போக்குவரத்து வசதியின்மை',
          description: 'Resident cannot endure a 35km bus ride to the main bank branch.',
          descriptionTa: '35 கி.மீ தொலைவில் உள்ள நகர வங்கி கிளைக்கு பயணம் செய்ய முடியாத உடல் நிலை.',
          severity: 'high',
        }
      ],
      missingDocuments: [
        'Updated Bank Passbook with new IFSC/Account details',
        'Life Certificate (Jeevan Pramaan) or VAO Physical Verification Note'
      ],
      missingDocumentsTa: [
        'புதிய IFSC கொண்ட வங்கி பாஸ்புக் நகல்',
        'உயிர்வாழ் சான்றிதழ் அல்லது கிராம நிர்வாக அலுவலர் உறுதிமொழி'
      ],
      suggestedActions: [
        'Step 1: Request Postal Department / India Post Payments Bank (IPPB) doorstep digital life certificate agent.',
        'Step 2: Local Asha volunteer conducts joint visit with Grama Seva Trust representative.',
        'Step 3: Update Taluk Social Security Scheme (SSS) Tahsildar desk with reactivated account proof.'
      ],
      suggestedActionsTa: [
        'படி 1: அஞ்சலக வங்கி (IPPB) மூலம் வீட்டு வாசலிலேயே டிஜிட்டல் உயிர்வாழ் சான்றிதழ் பதிவு செய்தல்.',
        'படி 2: உள்ளூர் களப்பணியாளர் கிராம சேவா அறக்கட்டளையுடன் இணைந்து உதவி செய்தல்.',
        'படி 3: தாலுகா சமூக பாதுகாப்பு திட்ட அலுவலகத்தில் புதிய கணக்கு விவரங்களை சமர்ப்பித்தல்.'
      ],
      recommendedResourceIds: ['res-tn-02', 'res-tn-05'],
      disclaimer: 'Preliminary Guidance Notice: For demonstration only.',
      disclaimerTa: 'முதற்கட்ட வழிகாட்டல் குறிப்பு: டெமோ மதிப்பீட்டிற்காக மட்டுமே.',
      isAiGenerated: true,
    },
    timeline: [
      {
        status: 'Submitted',
        timestamp: '2026-10-22T08:15:00Z',
        actor: 'Citizen Granddaughter',
        note: 'Request logged requesting doorstep banking and pension revival.',
        noteTa: 'ஓய்வூதியம் மீண்டும் பெற உதவி கேட்டு பதிவு செய்யப்பட்டது.',
      },
      {
        status: 'Referred',
        timestamp: '2026-10-23T11:00:00Z',
        actor: 'UDHAVI Coordinator',
        note: 'Referred to Grama Seva Trust Melur field team.',
        noteTa: 'கிராம சேவா அறக்கட்டளைக்கு பரிந்துரைக்கப்பட்டது.',
      },
      {
        status: 'Assistance Confirmed',
        timestamp: '2026-10-25T16:30:00Z',
        actor: 'Volunteer Selvi A.',
        note: 'IPPB postman completed doorstep biometric life certificate; pending 5 months arrears credited.',
        noteTa: 'அஞ்சல் துறை ஊழியர் மூலம் வீட்டுக்கே சென்று பயோமெட்ரிக் பதிவு முடிந்தது; ஓய்வூதியம் வரவு வைக்கப்பட்டது.',
      }
    ]
  },
  {
    id: 'UDH-TN-2026-1940',
    createdAt: '2026-10-25T14:20:00Z',
    district: 'Dharmapuri',
    village: 'Pennagaram Rural',
    category: 'accessibility',
    urgency: 'medium',
    mainDifficulty: 'Child with locomotive disability lacks UDID card and retrofitted school tricycle.',
    preferredLanguage: 'ta',
    description: '11-year-old student unable to travel 3km to higher primary school. Parents are daily wage farm labourers and missed medical board appointment in district headquarters.',
    status: 'Under Review',
    consentGiven: true,
    gapReport: {
      primaryNeed: 'Medical board assessment for UDID card and free motorized school conveyance.',
      primaryNeedTa: 'மாற்றுத்திறனாளி மாணவருக்கு UDID அட்டை மற்றும் பள்ளி செல்ல சக்கர நாற்காலி உதவி.',
      identifiedBarriers: [
        {
          id: 'b-a1',
          category: 'procedural',
          title: 'Missed Weekly Medical Board Camp Appointment',
          titleTa: 'வாராந்திர மருத்துவ வாரிய முகாம் தவறியது',
          description: 'Parents lacked clear instructions on designated Tuesday medical board token system.',
          descriptionTa: 'செவ்வாய்க்கிழமை அரசு மருத்துவமனையில் நடக்கும் மருத்துவ வாரிய டோக்கன் முறை பற்றிய தகவல் இல்லை.',
          severity: 'medium',
        }
      ],
      missingDocuments: ['Hospital disability evaluation certificate', 'Student School Bonafide Certificate'],
      missingDocumentsTa: ['அரசு மருத்துவமனை உடற்கூறு சான்றிதழ்', 'பள்ளி படிப்பு சான்றிதழ்'],
      suggestedActions: [
        'Step 1: Volunteer books next Tuesday slot at Dharmapuri Medical College Board.',
        'Step 2: Coordinate transit aid with District Differently Abled Welfare Office.'
      ],
      suggestedActionsTa: [
        'படி 1: தர்மபுரி அரசு மருத்துவக் கல்லூரி முகாமிற்கு முன்பதிவு செய்தல்.',
        'படி 2: மாவட்ட மாற்றுத்திறனாளிகள் நல அலுவலகம் மூலம் உதவி உபகரணத்திற்கு விண்ணப்பித்தல்.'
      ],
      recommendedResourceIds: ['res-tn-03'],
      disclaimer: 'Preliminary Guidance Notice: For demonstration only.',
      disclaimerTa: 'முதற்கட்ட வழிகாட்டல் குறிப்பு: டெமோ மதிப்பீட்டிற்காக மட்டுமே.',
      isAiGenerated: true,
    },
    timeline: [
      {
        status: 'Submitted',
        timestamp: '2026-10-25T14:20:00Z',
        actor: 'Rural School Teacher',
        note: 'Submitted on behalf of student family.',
        noteTa: 'மாணவர் குடும்பத்தின் சார்பில் ஆசிரியர் பதிவு செய்தார்.',
      },
      {
        status: 'Under Review',
        timestamp: '2026-10-26T09:10:00Z',
        actor: 'UDHAVI Field Team',
        note: 'Reviewing next medical board camp schedule.',
        noteTa: 'அடுத்த மருத்துவ முகாம் தேதியை களப்பணியாளர் ஆய்வு செய்து வருகிறார்.',
      }
    ]
  }
];

// Haversine formula to compute distance in km
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export function generateReferenceId(district: string = 'TN'): string {
  const prefix = district.substring(0, 2).toUpperCase();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `UDH-${prefix}-2026-${randomNum}`;
}

// Fallback deterministic Gap Analysis Engine if Gemini API is offline or not configured
export function runDeterministicGapAnalysis(
  category: SupportCategory,
  district: string,
  difficulty: string,
  description: string
): GapReport {
  const text = `${difficulty} ${description}`.toLowerCase();

  let primaryNeed = 'Citizen requested support under ' + category;
  let primaryNeedTa = 'குடிமக்கள் உதவி தேவை: ' + category;
  const barriers: GapReport['identifiedBarriers'] = [];
  const missingDocs: string[] = [];
  const missingDocsTa: string[] = [];
  const suggestedActions: string[] = [];
  const suggestedActionsTa: string[] = [];
  let recommendedResourceIds: string[] = [];

  // Barrier: Documentation
  if (text.includes('certificate') || text.includes('card') || text.includes('death') || text.includes('aadhaar') || text.includes('patta') || text.includes('proof') || text.includes('சான்றிதழ்') || text.includes('அட்டை')) {
    barriers.push({
      id: 'bar-doc-' + Date.now(),
      category: 'documentation',
      title: 'Documentation / Certification Bottleneck',
      titleTa: 'சான்றிதழ் மற்றும் ஆவணப் பதிவு சிக்கல்',
      description: 'The citizen faces challenges obtaining official prerequisites such as death certificate, ration endorsement, or land records.',
      descriptionTa: 'தேவைப்படும் இறப்பு சான்றிதழ், குடும்ப அட்டை மாற்றம் அல்லது நில ஆவணங்களை பெறுவதில் நடைமுறை தடைகள் உள்ளன.',
      severity: 'high',
    });
    missingDocs.push('Village Administrative Officer (VAO) residence and income verification certificate');
    missingDocsTa.push('கிராம நிர்வாக அலுவலர் (VAO) இருப்பிட மற்றும் வருமான சான்றிதழ்');
    missingDocs.push('Ration card copy with updated family member list');
    missingDocsTa.push('குடும்ப அட்டை நகல் (சரியான உறுப்பினர் விவரங்களுடன்)');
  }

  // Barrier: Physical / Transport
  if (text.includes('travel') || text.includes('distance') || text.includes('transport') || text.includes('office') || text.includes('remote') || text.includes('பயணம்') || text.includes('தொலைவு')) {
    barriers.push({
      id: 'bar-geo-' + Date.now(),
      category: 'accessibility',
      title: 'Geographical Remoteness & Travel Expense',
      titleTa: 'தொலைதூர போக்குவரத்து மற்றும் செலவு தடைகள்',
      description: 'Physical distance to block or Taluk office causes wage loss and high transport fees for rural residents.',
      descriptionTa: 'தாலுகா அல்லது வட்டார வளர்ச்சி அலுவலகம் தொலைவில் உள்ளதால் கூலி இழப்பு மற்றும் பயண செலவு ஏற்படுகிறது.',
      severity: 'medium',
    });
  }

  // Barrier: Awareness / Digital Divide
  if (text.includes('online') || text.includes('read') || text.includes('know') || text.includes('scheme') || text.includes('படிக்க') || text.includes('இணையம்') || text.includes('தெரியவில்லை')) {
    barriers.push({
      id: 'bar-aware-' + Date.now(),
      category: 'awareness',
      title: 'Digital Divide & Scheme Information Gap',
      titleTa: 'இணைய பயன்பாட்டு இடைவெளி மற்றும் விழிப்புணர்வின்மை',
      description: 'Inability to navigate online state e-Seva portals or lack of knowledge about existing departmental subsidies.',
      descriptionTa: 'இணையதளத்தில் விண்ணப்பிக்க தெரியாத நிலை மற்றும் அரசு நலத்திட்டங்கள் குறித்த போதிய தகவலின்மை.',
      severity: 'high',
    });
  }

  // Category specific customizations
  switch (category) {
    case 'livelihood':
      primaryNeed = 'Rural livelihood restoration, artisan equipment support, or SHG enterprise linkage.';
      primaryNeedTa = 'ஊரக வாழ்வாதார உதவி, கைவினை உபகரணங்கள் மற்றும் சுய உதவிக்குழு தொழில் வாய்ப்பு.';
      suggestedActions.push('Step 1: Connect with TNSRLM Block Coordinator for artisan equipment subsidy.');
      suggestedActions.push('Step 2: Enroll in nearest cluster collective for raw material bulk purchasing.');
      suggestedActions.push('Step 3: Assign a village youth volunteer to submit digital enterprise grant form.');
      suggestedActionsTa.push('படி 1: TNSRLM வட்டார ஒருங்கிணைப்பாளரிடம் உபகரண மானியத்திற்கு விண்ணப்பித்தல்.');
      suggestedActionsTa.push('படி 2: மூலப்பொருள் பெற உள்ளூர் உற்பத்தியாளர் கூட்டமைப்பில் இணைதல்.');
      suggestedActionsTa.push('படி 3: இணைய விண்ணப்பத்தை சமர்ப்பிக்க உள்ளூர் தன்னார்வலர் உதவுதல்.');
      recommendedResourceIds = ['res-tn-01', 'res-tn-04', 'res-tn-07'];
      break;

    case 'elderly':
      primaryNeed = 'Elderly welfare, monthly maintenance pension revival, or doorstep geriatric care.';
      primaryNeedTa = 'முதியோர் நலம், மாதாந்திர முதியோர் ஓய்வூதியம் மற்றும் வீட்டு வாசலில் மருத்துவ உதவி.';
      suggestedActions.push('Step 1: Arrange doorstep digital life certificate (e-Jeevan Pramaan) via India Post.');
      suggestedActions.push('Step 2: Coordinate with local elderly care trust for ration and mobility aid.');
      suggestedActions.push('Step 3: Follow up at Taluk Social Security Scheme desk to reactivate stalled pension.');
      suggestedActionsTa.push('படி 1: அஞ்சலக ஊழியர் மூலம் வீட்டிலேயே டிஜிட்டல் உயிர்வாழ் சான்றிதழ் பதிவு செய்தல்.');
      suggestedActionsTa.push('படி 2: உள்ளூர் முதியோர் அறக்கட்டளை மூலம் உணவு மற்றும் மருந்து உதவி பெறுதல்.');
      suggestedActionsTa.push('படி 3: தாலுகா அலுவலகத்தில் நின்றுபோன ஓய்வூதியத்தை மீண்டும் தொடங்க மனு அளித்தல்.');
      recommendedResourceIds = ['res-tn-02', 'res-tn-05'];
      break;

    case 'accessibility':
      primaryNeed = 'Disability assessment, UDID card issuance, and assistive mobility devices.';
      primaryNeedTa = 'மாற்றுத்திறனாளி மதிப்பீடு, UDID அட்டை மற்றும் உதவி உபகரணங்கள் பெறுதல்.';
      suggestedActions.push('Step 1: Book assessment appointment at weekly District Medical Board camp.');
      suggestedActions.push('Step 2: Submit application to District Differently Abled Welfare Office.');
      suggestedActionsTa.push('படி 1: மாவட்ட அரசு மருத்துவமனை வாராந்திர முகாமில் உடற்பரிசோதனை பதிவு செய்தல்.');
      suggestedActionsTa.push('படி 2: மாவட்ட மாற்றுத்திறனாளிகள் நல அலுவலகத்தில் உபகரணத்திற்கு விண்ணப்பித்தல்.');
      recommendedResourceIds = ['res-tn-03', 'res-tn-05'];
      break;

    case 'healthcare':
      primaryNeed = 'Rural healthcare access, specialist consultation, or mobile vision camp aid.';
      primaryNeedTa = 'கிராமப்புற மருத்துவ சிகிச்சை மற்றும் நடமாடும் மருத்துவ முகாம் உதவி.';
      suggestedActions.push('Step 1: Register at nearest Primary Health Centre (PHC) for Chief Minister Health Insurance screening.');
      suggestedActions.push('Step 2: Connect with visiting mobile vision / health outreach team.');
      suggestedActionsTa.push('படி 1: முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டு திட்டத்தில் பதிவு செய்தல்.');
      suggestedActionsTa.push('படி 2: கிராமத்திற்கு வரும் நடமாடும் மருத்துவக் குழுவிடம் பரிசோதனை மேற்கொள்ளுதல்.');
      recommendedResourceIds = ['res-tn-06', 'res-tn-02'];
      break;

    default:
      primaryNeed = `Guidance on accessing social support and welfare services in ${district}.`;
      primaryNeedTa = `${district} மாவட்டத்தில் சமூக நலத்திட்டங்களை பெறுவதற்கான ஒருங்கிணைந்த வழிகாட்டல்.`;
      suggestedActions.push('Step 1: Review preliminary document requirements at nearest e-Seva centre.');
      suggestedActions.push('Step 2: Field volunteer facilitates communication with Taluk facilitation officer.');
      suggestedActionsTa.push('படி 1: அருகிலுள்ள இ-சேவை மையத்தில் தேவையான ஆவணங்களை சரிபார்த்தல்.');
      suggestedActionsTa.push('படி 2: களப்பணியாளர் மூலம் சம்பந்தப்பட்ட அரசு துறை அதிகாரியிடம் மனு அளித்தல்.');
      recommendedResourceIds = ['res-tn-05', 'res-tn-08'];
      break;
  }

  if (barriers.length === 0) {
    barriers.push({
      id: 'bar-std-' + Date.now(),
      category: 'procedural',
      title: 'Procedural Application Complexity',
      titleTa: 'விண்ணப்ப நடைமுறை சிக்கல்கள்',
      description: 'Multiple verification levels required between village administration and district headquarters.',
      descriptionTa: 'கிராம நிர்வாக அலுவலர் முதல் மாவட்ட தலைமையகம் வரை பல கட்ட சரிபார்ப்புகள் தேவைப்படுகின்றன.',
      severity: 'medium',
    });
  }

  if (missingDocs.length === 0) {
    missingDocs.push('Citizen Photo ID (Voter ID or Family Ration Card)');
    missingDocs.push('Proof of residence in rural panchayat');
    missingDocsTa.push('வாக்காளர் அட்டை அல்லது குடும்ப அட்டை நகல்');
    missingDocsTa.push('கிராம பஞ்சாயத்து இருப்பிடச் சான்று');
  }

  return {
    primaryNeed,
    primaryNeedTa,
    identifiedBarriers: barriers,
    missingDocuments: missingDocs,
    missingDocumentsTa: missingDocsTa,
    suggestedActions,
    suggestedActionsTa,
    recommendedResourceIds: recommendedResourceIds.length > 0 ? recommendedResourceIds : ['res-tn-01', 'res-tn-05'],
    disclaimer: 'Preliminary Guidance Notice: AI suggestions are for preliminary guidance only and must not be treated as verified legal or government eligibility. Assistance is coordinated through verified local channels.',
    disclaimerTa: 'முதற்கட்ட வழிகாட்டல் குறிப்பு: AI பரிந்துரைகள் வழிகாட்டலுக்காக மட்டுமே. உத்தியோகபூர்வ அரசு தகுதியையோ அல்லது உத்தரவாதத்தையோ அளிக்காது.',
    isAiGenerated: false,
  };
}
