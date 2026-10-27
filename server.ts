import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import {
  INITIAL_COMMUNITY_RESOURCES,
  INITIAL_SUPPORT_REQUESTS,
  runDeterministicGapAnalysis,
  generateReferenceId,
} from './src/data/mockData.ts';
import { SupportRequest, CommunityResource } from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// In-memory persistent database for session
let dbResources: CommunityResource[] = [...INITIAL_COMMUNITY_RESOURCES];
let dbRequests: SupportRequest[] = [...INITIAL_SUPPORT_REQUESTS];

// API: Health & Status
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    resourceCount: dbResources.length,
    requestCount: dbRequests.length,
  });
});

// API: Resources Directory
app.get('/api/resources', (req: Request, res: Response) => {
  const { category, district, search } = req.query;
  let filtered = [...dbResources];

  if (category && category !== 'all') {
    filtered = filtered.filter((r) => r.category === category);
  }
  if (district && district !== 'all') {
    filtered = filtered.filter((r) => r.district === district);
  }
  if (search && typeof search === 'string' && search.trim() !== '') {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.nameTa.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.descriptionTa.toLowerCase().includes(q) ||
        r.locality.toLowerCase().includes(q)
    );
  }

  res.json({ resources: filtered });
});

// API: Support Requests (List)
app.get('/api/requests', (_req: Request, res: Response) => {
  res.json({ requests: dbRequests });
});

// API: Single Request Lookup by ID
app.get('/api/requests/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const found = dbRequests.find((r) => r.id.toLowerCase() === id.toLowerCase());
  if (!found) {
    return res.status(404).json({ error: 'Request not found' });
  }
  res.json({ request: found });
});

// API: Submit Support Request & Trigger Gap Analysis
app.post('/api/requests', async (req: Request, res: Response) => {
  try {
    const {
      district,
      village,
      category,
      urgency,
      mainDifficulty,
      preferredLanguage = 'en',
      description = '',
      consentGiven = true,
    } = req.body;

    if (!district || !village || !category || !urgency || !mainDifficulty) {
      return res.status(400).json({ error: 'Missing required assessment fields' });
    }

    const newId = generateReferenceId(district);
    const createdAt = new Date().toISOString();

    // Perform Gap Analysis (Gemini if key is available, otherwise deterministic engine)
    let gapReport = runDeterministicGapAnalysis(category, district, mainDifficulty, description);

    if (ai) {
      try {
        const prompt = `You are UDHAVI, an AI Social Support Gap Detector for rural Tamil Nadu.
Analyze this citizen support need and return a structured JSON response.

Citizen Assessment:
District: ${district}, Tamil Nadu
Village: ${village}
Category: ${category}
Urgency: ${urgency}
Main Difficulty: ${mainDifficulty}
Situation Description: ${description || 'Not provided'}
Language: ${preferredLanguage}

Respond ONLY in valid JSON with this exact schema:
{
  "primaryNeed": "string in English summarizing the primary unmet need",
  "primaryNeedTa": "string in Tamil summarizing the primary unmet need",
  "identifiedBarriers": [
    {
      "category": "documentation" | "awareness" | "accessibility" | "procedural",
      "title": "short English title",
      "titleTa": "short Tamil title",
      "description": "English explanation of barrier",
      "descriptionTa": "Tamil explanation of barrier",
      "severity": "high" | "medium" | "low"
    }
  ],
  "missingDocuments": ["list of 2-3 specific missing documents in English"],
  "missingDocumentsTa": ["list of 2-3 specific missing documents in Tamil"],
  "suggestedActions": ["Step 1: ...", "Step 2: ...", "Step 3: ..."],
  "suggestedActionsTa": ["படி 1: ...", "படி 2: ...", "படி 3: ..."]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text.trim());
          gapReport = {
            primaryNeed: parsed.primaryNeed || gapReport.primaryNeed,
            primaryNeedTa: parsed.primaryNeedTa || gapReport.primaryNeedTa,
            identifiedBarriers: parsed.identifiedBarriers?.map((b: any, idx: number) => ({
              ...b,
              id: 'bar-ai-' + idx + '-' + Date.now(),
            })) || gapReport.identifiedBarriers,
            missingDocuments: parsed.missingDocuments || gapReport.missingDocuments,
            missingDocumentsTa: parsed.missingDocumentsTa || gapReport.missingDocumentsTa,
            suggestedActions: parsed.suggestedActions || gapReport.suggestedActions,
            suggestedActionsTa: parsed.suggestedActionsTa || gapReport.suggestedActionsTa,
            recommendedResourceIds: gapReport.recommendedResourceIds,
            disclaimer: gapReport.disclaimer,
            disclaimerTa: gapReport.disclaimerTa,
            isAiGenerated: true,
          };
        }
      } catch (geminiErr) {
        console.warn('Gemini gap analysis fallback to deterministic engine:', geminiErr);
        // Fallback already assigned
      }
    }

    const newRequest: SupportRequest = {
      id: newId,
      createdAt,
      district,
      village,
      category,
      urgency,
      mainDifficulty,
      preferredLanguage,
      description,
      status: 'Submitted',
      gapReport,
      consentGiven: Boolean(consentGiven),
      timeline: [
        {
          status: 'Submitted',
          timestamp: createdAt,
          actor: 'Citizen / Community Worker',
          note: `Support assessment logged with ID ${newId}.`,
          noteTa: `${newId} எண் கொண்டு உதவி கோரிக்கை பதிவு செய்யப்பட்டது.`,
        },
        {
          status: 'Under Review',
          timestamp: new Date(Date.now() + 1000).toISOString(),
          actor: 'UDHAVI Gap Detection Engine',
          note: `Identified ${gapReport.identifiedBarriers.length} access barriers. Matching verified resources.`,
          noteTa: `${gapReport.identifiedBarriers.length} அணுகல் தடைகள் கண்டறியப்பட்டு வளங்கள் பொருத்தப்படுகின்றன.`,
        },
      ],
    };

    dbRequests.unshift(newRequest);
    res.status(201).json({ request: newRequest });
  } catch (error) {
    console.error('Error in POST /api/requests:', error);
    res.status(500).json({ error: 'Failed to process support request' });
  }
});

// API: Update Request Status (Volunteer actions / Referral Simulation)
app.patch('/api/requests/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, note, actor = 'Field Volunteer', assignedVolunteer, referredEntity } = req.body;

  const index = dbRequests.findIndex((r) => r.id.toLowerCase() === id.toLowerCase());
  if (index === -1) {
    return res.status(404).json({ error: 'Request not found' });
  }

  const existing = dbRequests[index];
  const now = new Date().toISOString();

  if (status) {
    existing.status = status;
    existing.timeline.push({
      status,
      timestamp: now,
      actor,
      note: note || `Status updated to ${status} in demo workflow.`,
      noteTa: `நிலை ${status} என மாதிரி டெமோவில் புதுப்பிக்கப்பட்டது.`,
    });
  }

  if (assignedVolunteer) {
    existing.assignedVolunteer = assignedVolunteer;
  }
  if (referredEntity) {
    existing.referredEntity = referredEntity;
  }

  dbRequests[index] = existing;
  res.json({ request: existing });
});

// API: AI Social Support Assistant (Gemini with bilingual grounding & fallback)
app.post('/api/assistant', async (req: Request, res: Response) => {
  const { message, language = 'en' } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // System instruction for rural Tamil Nadu welfare guidance
  const systemInstruction = `You are "Udhavi Assistant" (உதவி உதவியாளர்), an empathetic, knowledgeable social-support guide for rural communities in Tamil Nadu, India.
Key mission: Help citizens, village elders, and volunteers navigate social support gaps, document requirements, and rural livelihood schemes (such as TNSRLM, Pudhu Vaazhvu, Pehchan Artisan Card, Old Age Pension OAP, Differently Abled Welfare, Chief Minister Health Insurance Scheme CMCHIS).

Rules:
1. Always respond in the requested language: ${language === 'ta' ? 'Tamil (தமிழ்)' : 'English'}.
2. Tone: Warm, practical, simple, easy to understand for rural residents. Avoid technical jargon.
3. Structure your response clearly:
   - Understanding of the situation
   - What documents are needed (checklist)
   - Immediate step-by-step actions (Step 1, Step 2, Step 3)
   - What to do if blocked (e.g. contact Village Administrative Officer or e-Seva centre)
4. Do NOT make final legal, medical, or government eligibility decisions. Remind the user that official vetting is conducted by government departments.
5. Keep response scannable with bullet points.`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: message,
        config: {
          systemInstruction,
          temperature: 0.3,
        },
      });

      const replyText = response.text || 'I am ready to help you navigate rural support services.';
      return res.json({
        reply: replyText,
        isDemoFallback: false,
      });
    } catch (geminiError) {
      console.warn('Gemini assistant error, serving intelligent fallback:', geminiError);
    }
  }

  // High quality deterministic fallback guidance
  const query = message.toLowerCase();
  let fallbackReply = '';

  if (language === 'ta') {
    if (query.includes('ஓய்வூதியம்') || query.includes('முதியோர்') || query.includes('pension')) {
      fallbackReply = `வணக்கம். தமிழ்நாட்டில் முதியோர் ஓய்வூதியம் (OAP) பெறுவதற்கான வழிகாட்டல்:

1. தேவையான முக்கிய ஆவணங்கள்:
   • வாக்காளர் அடையாள அட்டை அல்லது குடும்ப அட்டை (60 வயது பூர்த்தியடைந்ததற்கான சான்று)
   • கிராம நிர்வாக அலுவலர் (VAO) வழங்கும் வருமானச் சான்றிதழ் (ஆண்டு வருமானம் நிர்ணயிக்கப்பட்ட வரம்பிற்குள் இருக்க வேண்டும்)
   • நேரடி பணப்பரிமாற்றத்திற்கான வங்கி கணக்கு பாஸ்புக் நகல்

2. அடுத்த கட்ட நடவடிக்கைகள்:
   • படி 1: அருகிலுள்ள இ-சேவை (e-Seva) மையத்தில் ஆன்லைனில் விண்ணப்பத்தை பதிவு செய்யவும்.
   • படி 2: விண்ணப்ப ரசீதை உங்கள் பகுதி வருவாய் ஆய்வாளர் (RI) அல்லது தாலுகா சமூக பாதுகாப்பு திட்ட (SSS) வட்டாட்சியரிடம் சமர்ப்பிக்கவும்.
   • படி 3: வங்கிக்கு செல்ல இயலாத முதியோர்களுக்கு, அஞ்சல் துறை (IPPB) மூலம் வீட்டு வாசலிலேயே டிஜிட்டல் உயிர்வாழ் சான்றிதழ் பெறலாம்.

குறிப்பு: இது முதற்கட்ட வழிகாட்டல் மட்டுமே. இறுதி முடிவை வருவாய்த்துறை எடுக்கும்.`;
    } else if (query.includes('நெசவு') || query.includes('கைவினை') || query.includes('வாழ்வாதாரம்') || query.includes('livelihood')) {
      fallbackReply = `வணக்கம். ஊரக கைவினைஞர்கள் மற்றும் நெசவாளர்களுக்கான வழிகாட்டல்:

1. கைத்தறி நெசவாளர் பெஹ்சான் (Pehchan) அடையாள அட்டை:
   • மத்திய/மாநில மானிய விலை நூல் மற்றும் உபகரண உதவி பெற இந்த அட்டை அவசியமாகும்.
   • நெசவாளர் கூட்டுறவு சங்கம் அல்லது ஜவுளித்துறை உதவி இயக்குநர் அலுவலகத்தில் விண்ணப்பிக்கலாம்.

2. தமிழ்நாடு ஊரக வாழ்வாதார இயக்கம் (TNSRLM):
   • வட்டார வளர்ச்சி அலுவலகத்தில் (BDO) உள்ள மகளிர் சுய உதவிக்குழு கூட்டமைப்பு மூலம் சுழல் நிதி மற்றும் உபகரண மானியங்கள் பெறலாம்.

3. அவசர நடவடிக்கைகள்:
   • படி 1: உள்ளூர் கிராம நிர்வாக அலுவலர் (VAO) மூலம் கைவினைஞர் சான்று பெறவும்.
   • படி 2: UDHAVI வளங்கள் பட்டியலில் உள்ள TNSRLM கைவினை பிரிவை தொடர்பு கொள்ளவும்.`;
    } else {
      fallbackReply = `வணக்கம். உங்கள் உதவித் தேவைக்கு வழிகாட்ட நாங்கள் தயாராக உள்ளோம்.

உதவி பெற 3 முக்கிய வழிகள்:
1. ஆவணங்கள் சரிபார்ப்பு: குடும்ப அட்டை, வருமானச் சான்றிதழ் மற்றும் இருப்பிடச் சான்றிதழ் தயாராக வைத்துக்கொள்ளுங்கள்.
2. இ-சேவை மையம்: அரசு திட்டங்களுக்கு விண்ணப்பிக்க அருகிலுள்ள இ-சேவை மையத்தை அணுகலாம்.
3. உதவி தளம்: எங்களின் 'உதவி தேடுங்கள்' படிவத்தில் உங்கள் தேவையை பதிவு செய்தால், உள்ளூர் தன்னார்வலர் மற்றும் அரசு உதவி மையங்களுடன் இணைக்கப்படுவீர்கள்.

வேறு ஏதேனும் குறிப்பிட்ட சந்தேகம் உள்ளதா?`;
    }
  } else {
    if (query.includes('pension') || query.includes('elderly') || query.includes('senior')) {
      fallbackReply = `Here is practical guidance for accessing Old Age Pension (OAP) in Tamil Nadu:

1. Essential Documents Required:
   • Age proof (Voter ID or Smart Family Ration Card showing age 60+)
   • Income Certificate from Village Administrative Officer (VAO)
   • Active Bank Account Passbook seeded with Aadhaar

2. Step-by-Step Procedure:
   • Step 1: Visit your nearest village e-Seva Centre (TNeGA) to file the online OAP application.
   • Step 2: The Revenue Inspector (RI) will conduct a field verification at the village residence.
   • Step 3: For elders with mobility issues, India Post Payments Bank (IPPB) provides doorstep digital life certification.

Notice: This is preliminary guidance. Eligibility determination is made by the Revenue & Disaster Management Department.`;
    } else if (query.includes('livelihood') || query.includes('weaver') || query.includes('artisan') || query.includes('shg')) {
      fallbackReply = `Guidance on Rural Livelihoods & Artisan Support in Tamil Nadu:

1. Pehchan Artisan / Weaver ID Card:
   • Essential for obtaining subsidized raw material (yarn/clay) and subsidized credit loans.
   • Can be enrolled at the District Handloom & Textiles Assistant Director office or through cooperative societies.

2. Tamil Nadu Rural Livelihood Mission (TNSRLM):
   • Connects self-help groups (SHGs) and rural entrepreneurs with working capital grants and skill training.

3. Recommended Next Steps:
   • Step 1: Secure VAO craft verification certificate.
   • Step 2: Apply for equipment replacement or seed capital grant at your Taluk Block Development Office (BDO).
   • Step 3: Check matching resources in our Community Resource Directory for local NGO support.`;
    } else {
      fallbackReply = `Welcome to UDHAVI Assistant. We are here to help bridge social support gaps in rural Tamil Nadu.

To get started:
• Have your basic documents ready (Family Ration Card, Voter ID, and Village proof).
• If facing a documentation block (e.g. missing certificates), our Citizen Assessment form will generate a customized Gap Report.
• Local field volunteers can assist with physical visits to e-Seva centres or Taluk offices.

Feel free to ask about specific schemes, pensions, disability aid, or healthcare camps!`;
    }
  }

  res.json({
    reply: fallbackReply,
    isDemoFallback: true,
  });
});

// API: Reset Prototype Demo Data (For hackathon judges)
app.post('/api/demo/reset', (_req: Request, res: Response) => {
  dbResources = [...INITIAL_COMMUNITY_RESOURCES];
  dbRequests = [...INITIAL_SUPPORT_REQUESTS];
  res.json({
    success: true,
    message: 'Demo dataset reset to initial state successfully.',
    resourceCount: dbResources.length,
    requestCount: dbRequests.length,
  });
});

// Production & Vite Development Server Integration
async function startServer() {
  const http = await import('http');
  const httpServer = http.createServer(app);

  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const isHmrDisabled = process.env.DISABLE_HMR === 'true';

    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled ? false : { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Explicitly transform and serve index.html for SPA routes in dev
    app.use('*', async (req: Request, res: Response, next) => {
      if (req.originalUrl.startsWith('/api')) {
        return next();
      }
      try {
        const url = req.originalUrl;
        const fs = await import('fs');
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        if (vite) {
          vite.ssrFixStacktrace(e);
        }
        next(e);
      }
    });
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  httpServer.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`UDHAVI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
