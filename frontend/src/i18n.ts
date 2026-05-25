export type Lang = "en" | "ne";

export type Strings = {
  brand: string;
  tagline: string;
  intro: string;
  langLabel: string;
  langEn: string;
  langNe: string;
  inputLabel: string;
  inputHint: (max: number) => string;
  charsRemaining: (n: number) => string;
  examplesLabel: string;
  billsTitle: string;
  billsIntro: string;
  billsComingSoon: string;
  exploreBill: string;
  back: string;
  flowLabel: string;
  stepChoose: string;
  stepUnderstand: string;
  stepExplore: string;
  stepVote: string;
  billNotFound: string;
  backToBills: string;
  viewBillText: string;
  overviewActionTitle: string;
  overviewActionHint: string;
  viewExistingStory: string;
  storyScreenLabel: string;
  goToVote: string;
  voteScreenLabel: string;
  voteScreenIntro: string;
  exploreAnotherBill: string;
  selectBillLabel: string;
  selectBillHint: string;
  selectBillPlaceholder: string;
  continueToBill: string;
  switchBill: string;
  generatePersona: string;
  generateScenario: string;
  analyzeRisks: string;
  generateFull: string;
  analyzePolicy: string;
  analyzingPolicy: string;
  analyzeHint: string;
  policyBriefTitle: string;
  policyBriefSubtitle: string;
  whoAffected: string;
  keyPoints: string;
  impactsTitle: string;
  impactsSubtitle: string;
  personaScenario: string;
  becomesRiskier: string;
  becomesSafer: string;
  personaLabel: (n: number) => string;
  personaOf: (current: number, total: number) => string;
  next: string;
  workingOn: (label: string) => string;
  busyPersona: string;
  busyScenario: string;
  busyRisks: string;
  busyFull: string;
  busyPolicies: string;
  personaTitle: string;
  personaSubtitle: string;
  personaName: string;
  personaAge: string;
  personaOccupation: string;
  personaLocation: string;
  personaBio: string;
  scenarioTitle: string;
  risksHeading: string;
  impactTab: string;
  riskier: string;
  safer: string;
  voteTitle: string;
  voteHint: string;
  voteEnable: string;
  voteFor: string;
  voteAgainst: string;
  voteNeutral: string;
  voteTotals: (f: number, a: number, n: number) => string;
  voteFirst: string;
  voteLoading: string;
  policiesTitle: string;
  policiesIntro: string;
  policiesFetch: string;
  policiesRefresh: string;
  policiesUse: string;
  policiesConfidence: string;
  policiesArea: string;
  policiesStatus: string;
  policiesAffects: string;
  policiesDisclaimer: string;
  whyTitle: string;
  whyBody: string;
  disclaimer: string;
  footer: string;
  skipToMain: string;
  questMissionTitle: string;
  questMissionTeaser: string;
  questMissionExpand: string;
  questMissionCollapse: string;
  questObjectives: string;
  questPickCharacter: string;
  questProgress: (explored: number, total: number) => string;
  questTabProfile: string;
  questTabStory: string;
  questTabImpact: string;
  questReadyVote: string;
  questExploreHint: string;
  questLevelLabel: (n: number) => string;
  questNext: string;
  questBackStep: string;
  questStepOf: (current: number, total: number) => string;
  questChapter: (n: number) => string;
  storyLoading: string;
  compareTitle: string;
  compareSubtitle: string;
  regenerateConfirm: string;
  generatingWait: string;
  storyLangBadge: (lang: string) => string;
  voteThankYou: (stance: string) => string;
  voteAlready: string;
  policiesSideQuest: string;
  errorRateLimit: string;
  errorProviderBusy: string;
  errorProviderConfig: string;
  errorNetwork: string;
  errorGeneric: string;
  errorRetryHint: string;
};

const en: Strings = {
  brand: "Gemma 4 Good · Nepal civic literacy",
  tagline: "Policy Storyteller — Nepal",
  intro:
    "Turn confusing policy into human stories. Pick one of four Nepali bills — Gemma 4 builds a plain-language brief, three diverse personas, and what becomes riskier or safer for each.",
  langLabel: "Language",
  langEn: "English",
  langNe: "नेपाली",
  inputLabel: "Bill text",
  inputHint: (max) =>
    `Up to ${max} characters. Select a bill above or paste your own text, then generate personas and scenarios.`,
  charsRemaining: (n) => `${n} characters remaining`,
  examplesLabel: "Quick bill switch",
  billsTitle: "Choose a bill to explore",
  billsIntro:
    "Four real Nepali legislative bills are ready now. Select one to load its text, then generate AI personas and see how the law might affect different people.",
  billsComingSoon: "4 bills available now — more legislation coming soon.",
  exploreBill: "Explore this bill",
  back: "Back",
  flowLabel: "Exploration steps",
  stepChoose: "Choose bill",
  stepUnderstand: "Understand",
  stepExplore: "Explore story",
  stepVote: "Vote",
  billNotFound: "This bill could not be found.",
  backToBills: "Return to bill selection",
  viewBillText: "View full bill text",
  overviewActionTitle: "Step 2 — Generate your story",
  overviewActionHint:
    "Gemma 4 will create a policy brief, three diverse personas, each with a day-in-the-life scenario and personalized risk analysis. This usually takes 1–2 minutes.",
  viewExistingStory: "View story you already generated",
  storyScreenLabel: "Step 3 — Their story",
  goToVote: "Continue to vote →",
  voteScreenLabel: "Step 4 — Your perspective",
  voteScreenIntro:
    "After reading all three personas and the comparison, share how you lean on this bill overall.",
  exploreAnotherBill: "Explore another bill",
  selectBillLabel: "Select a bill",
  selectBillHint: "Four Nepali legislative bills are available. More coming soon.",
  selectBillPlaceholder: "Choose a bill…",
  continueToBill: "Continue",
  switchBill: "Switch bill",
  generatePersona: "Generate persona",
  generateScenario: "Generate scenario",
  analyzeRisks: "Analyze risks",
  generateFull: "Generate full story",
  analyzePolicy: "Analyze policy impact",
  analyzingPolicy: "Analyzing policy…",
  analyzeHint:
    "Generating policy brief, three personas, scenarios, and risk analysis — usually 2–3 minutes. Please keep this tab open.",
  policyBriefTitle: "Policy brief",
  policyBriefSubtitle: "Plain-language summary of what this notice means.",
  whoAffected: "Who is affected",
  keyPoints: "Key points",
  impactsTitle: "How different people are affected",
  impactsSubtitle:
    "Three diverse personas — each with a day-in-the-life scenario and personalized risk analysis.",
  personaScenario: "Their scenario",
  becomesRiskier: "Becomes riskier",
  becomesSafer: "Becomes safer",
  personaLabel: (n) => `Persona ${n}`,
  personaOf: (current, total) => `Persona ${current} of ${total}`,
  next: "Next",
  workingOn: (label) => `Working on: ${label}…`,
  busyPersona: "persona",
  busyScenario: "scenario",
  busyRisks: "risks",
  busyFull: "full story",
  busyPolicies: "latest Nepal policies",
  personaTitle: "Persona",
  personaSubtitle: "A realistic composite Nepali character affected by the policy.",
  personaName: "Name",
  personaAge: "Age",
  personaOccupation: "Occupation",
  personaLocation: "Location",
  personaBio: "Bio",
  scenarioTitle: "Scenario",
  risksHeading: "Risk and safety changes",
  impactTab: "Impact",
  riskier: "What becomes riskier",
  safer: "What becomes safer",
  voteTitle: "Perspective vote",
  voteHint:
    "After reading all three perspectives, vote how you lean on this policy overall.",
  voteEnable: "Analyze a policy to enable voting.",
  voteFor: "For",
  voteAgainst: "Against",
  voteNeutral: "Neutral",
  voteTotals: (f, a, n) => `Totals: For ${f}, Against ${a}, Neutral ${n}`,
  voteFirst: " — be the first vote for this story.",
  voteLoading: "Loading vote totals…",
  policiesTitle: "Latest Nepal policies & laws (LLM brief)",
  policiesIntro:
    "Ask Gemma 4 to recall notable recent laws, acts, and policies of Nepal from its own training knowledge. No web fetch — purely an educational summary.",
  policiesFetch: "Pull from LLM",
  policiesRefresh: "Refresh",
  policiesUse: "Use this as policy text",
  policiesConfidence: "Confidence",
  policiesArea: "Area",
  policiesStatus: "Status / Year",
  policiesAffects: "Who it affects",
  policiesDisclaimer:
    "Educational summary only. Verify with the Nepal Gazette or a qualified legal/medical professional before acting.",
  whyTitle: "Why this matters",
  whyBody:
    "Young Nepalis often feel disconnected from legislative processes because legal language is intimidating and bills seem abstract. By walking through diverse personas — powered by Gemma 4 — you can build empathy for how laws affect real people before forming your own view.",
  disclaimer:
    "Outputs are explanatory stories, not legal or medical advice. Always verify with a qualified professional or official Nepal Government source.",
  footer: "Built for the Gemma 4 Good Hackathon · Policy Storyteller for Nepal",
  skipToMain: "Skip to main content",
  questMissionTitle: "Mission briefing",
  questMissionTeaser: "Quick summary — expand only if you want the full legal breakdown.",
  questMissionExpand: "Show full briefing",
  questMissionCollapse: "Hide briefing",
  questObjectives: "Quest objectives",
  questPickCharacter: "Pick a character to explore",
  questProgress: (explored, total) => `${explored} of ${total} characters explored`,
  questTabProfile: "Profile",
  questTabStory: "Day in the life",
  questTabImpact: "Impact",
  questReadyVote: "All characters explored — you're ready to vote!",
  questExploreHint: "Tap each character below to unlock the full quest.",
  questLevelLabel: (n) => `Level ${n}`,
  questNext: "Next →",
  questBackStep: "← Back",
  questStepOf: (current, total) => `Step ${current} of ${total}`,
  questChapter: (n) => `Chapter ${n}`,
  storyLoading: "Loading your story…",
  compareTitle: "Compare all three",
  compareSubtitle: "Quick side-by-side view before you vote on the bill overall.",
  regenerateConfirm: "Replace the story you already generated for this bill?",
  generatingWait: "Working… this usually takes 2–3 minutes",
  storyLangBadge: (lang) => `Generated in ${lang === "ne" ? "Nepali" : "English"}`,
  voteThankYou: (stance) => `Thanks — you voted ${stance}.`,
  voteAlready: "You already voted on this story from this browser.",
  policiesSideQuest: "Side quest — explore more Nepal policies",
  errorRateLimit:
    "The AI service is busy (too many requests). Wait about one minute, then try Generate again.",
  errorProviderBusy: "The AI service is temporarily down. Please try again in a few moments.",
  errorProviderConfig:
    "Could not reach the AI service. Check OPENROUTER_API_KEY and OPENROUTER_MODEL in backend .env.",
  errorNetwork: "Could not reach the server. Is the backend running on port 8000?",
  errorGeneric: "Something went wrong while generating. Please try again.",
  errorRetryHint: "You can press Generate again after waiting.",
};

const ne: Strings = {
  brand: "Gemma 4 Good · नेपाल नागरिक साक्षरता",
  tagline: "नीति कथाकार — नेपाल",
  intro:
    "कठिन नीतिलाई मानवीय कथामा बदल्नुहोस्। चार नेपाली विधेयकमध्ये एक छान्नुहोस् — Gemma 4 ले पात्र, परिस्थिति, र के जोखिमयुक्त वा सुरक्षित हुन्छ भन्ने विश्लेषण बनाउँछ।",
  langLabel: "भाषा",
  langEn: "English",
  langNe: "नेपाली",
  inputLabel: "विधेयकको पाठ",
  inputHint: (max) =>
    `अधिकतम ${max} अक्षर। माथि विधेयक छान्नुहोस् वा आफ्नो पाठ टाँस्नुहोस्, त्यसपछि पात्र र परिस्थिति बनाउनुहोस्।`,
  charsRemaining: (n) => `${n} अक्षर बाँकी`,
  examplesLabel: "छिटो विधेयक बदल",
  billsTitle: "अन्वेषण गर्न विधेयक छान्नुहोस्",
  billsIntro:
    "चार वास्तविक नेपाली विधेयक अहिले तयार छन्। एक छान्नुहोस्, पाठ लोड गर्नुहोस्, र AI पात्र बनाएर कानूनले विभिन्न मानिसहरूलाई कसरी असर गर्छ हेर्नुहोस्।",
  billsComingSoon: "४ विधेयक अहिले उपलब्ध — थप कानून चाँडै आउँदैछ।",
  exploreBill: "यो विधेयक अन्वेषण गर्नुहोस्",
  back: "पछाडि",
  flowLabel: "अन्वेषण चरण",
  stepChoose: "विधेयक छान्नुहोस्",
  stepUnderstand: "बुझ्नुहोस्",
  stepExplore: "कथा हेर्नुहोस्",
  stepVote: "मत दिनुहोस्",
  billNotFound: "यो विधेयक फेला परेन।",
  backToBills: "विधेयक छनोटमा फर्कनुहोस्",
  viewBillText: "पूरा विधेयक पाठ हेर्नुहोस्",
  overviewActionTitle: "चरण २ — कथा बनाउनुहोस्",
  overviewActionHint:
    "Gemma 4 ले नीति सारांश, तीन विविध पात्र, प्रत्येकको दैनिक परिस्थिति र जोखिम विश्लेषण बनाउँछ। सामान्यतः १–२ मिनेट लाग्छ।",
  viewExistingStory: "पहिले बनाइएको कथा हेर्नुहोस्",
  storyScreenLabel: "चरण ३ — उनीहरूको कथा",
  goToVote: "मतदानमा जानुहोस् →",
  voteScreenLabel: "चरण ४ — तपाईंको दृष्टिकोण",
  voteScreenIntro:
    "तीनवटै पात्र र तुलना पढिसकेपछि, यो विधेयकप्रति तपाईंको समग्र झुकाव साझा गर्नुहोस्।",
  exploreAnotherBill: "अर्को विधेयक अन्वेषण गर्नुहोस्",
  selectBillLabel: "विधेयक छान्नुहोस्",
  selectBillHint: "चार नेपाली विधेयक उपलब्ध छन्। थप चाँडै आउँदैछ।",
  selectBillPlaceholder: "विधेयक छान्नुहोस्…",
  continueToBill: "अगाडि बढ्नुहोस्",
  switchBill: "विधेयक बदल्नुहोस्",
  generatePersona: "पात्र बनाउनुहोस्",
  generateScenario: "परिस्थिति बनाउनुहोस्",
  analyzeRisks: "जोखिम विश्लेषण",
  generateFull: "पूर्ण कथा बनाउनुहोस्",
  analyzePolicy: "नीति प्रभाव विश्लेषण",
  analyzingPolicy: "नीति विश्लेषण हुँदै…",
  analyzeHint:
    "नीति सारांश, तीन पात्र, परिस्थिति र जोखिम विश्लेषण तयार हुँदै — सामान्यतः १–२ मिनेट। यो ट्याब खुला राख्नुहोस्।",
  policyBriefTitle: "नीति सारांश",
  policyBriefSubtitle: "यो सूचनाको सरल भाषामा अर्थ।",
  whoAffected: "कसलाई असर पर्छ",
  keyPoints: "मुख्य बुँदाहरू",
  impactsTitle: "विभिन्न मानिसहरूलाई कसरी असर पर्छ",
  impactsSubtitle:
    "तीन विविध पात्र — प्रत्येकको दैनिक परिस्थिति र व्यक्तिगत जोखिम विश्लेषण।",
  personaScenario: "उनीहरूको परिस्थिति",
  becomesRiskier: "जोखिम बढ्छ",
  becomesSafer: "सुरक्षित बन्छ",
  personaLabel: (n) => `पात्र ${n}`,
  personaOf: (current, total) => `पात्र ${current} / ${total}`,
  next: "अर्को",
  workingOn: (label) => `काम भइरहेको: ${label}…`,
  busyPersona: "पात्र",
  busyScenario: "परिस्थिति",
  busyRisks: "जोखिम",
  busyFull: "पूर्ण कथा",
  busyPolicies: "नेपालका हालका नीतिहरू",
  personaTitle: "पात्र",
  personaSubtitle: "नीतिबाट प्रभावित एक यथार्थपरक काल्पनिक नेपाली पात्र।",
  personaName: "नाम",
  personaAge: "उमेर",
  personaOccupation: "पेशा",
  personaLocation: "ठेगाना",
  personaBio: "परिचय",
  scenarioTitle: "परिस्थिति",
  risksHeading: "जोखिम र सुरक्षा परिवर्तन",
  impactTab: "प्रभाव",
  riskier: "के जोखिमयुक्त बन्छ",
  safer: "के सुरक्षित बन्छ",
  voteTitle: "दृष्टिकोण मतदान",
  voteHint:
    "तीनवटै दृष्टिकोण पढिसकेपछि, यो नीतिप्रति तपाईंको समग्र झुकावमा मत दिनुहोस्।",
  voteEnable: "मतदान सक्रिय गर्न नीति विश्लेषण चलाउनुहोस्।",
  voteFor: "पक्षमा",
  voteAgainst: "विपक्षमा",
  voteNeutral: "तटस्थ",
  voteTotals: (f, a, n) => `जम्मा: पक्षमा ${f}, विपक्षमा ${a}, तटस्थ ${n}`,
  voteFirst: " — यस कथाको पहिलो मत तपाईंकै हुनसक्छ।",
  voteLoading: "मत गणना लोड हुँदै…",
  policiesTitle: "नेपालका हालका नीति र कानून (LLM सारांश)",
  policiesIntro:
    "Gemma 4 लाई आफ्नै तालिमको ज्ञानबाट नेपालका उल्लेखनीय हालका कानून, ऐन र नीतिहरू सम्झाउन भन्नुहोस्। वेबबाट खिचिएको होइन — शुद्ध शैक्षिक सारांश मात्र।",
  policiesFetch: "LLM बाट तान्नुहोस्",
  policiesRefresh: "पुनः ताजा गर्नुहोस्",
  policiesUse: "यसैलाई नीति पाठका रूपमा प्रयोग गर्नुहोस्",
  policiesConfidence: "विश्वसनीयता",
  policiesArea: "क्षेत्र",
  policiesStatus: "स्थिति / वर्ष",
  policiesAffects: "कसलाई असर पर्छ",
  policiesDisclaimer:
    "शैक्षिक सारांश मात्र हो। कुनै पनि कार्य गर्नुअघि नेपाल राजपत्र वा योग्य कानूनी/स्वास्थ्य पेशेविकसँग पुष्टि गर्नुहोस्।",
  whyTitle: "किन यो महत्त्वपूर्ण छ",
  whyBody:
    "युवा नेपालीहरू प्रायः विधायी प्रक्रियाबाट टाढा महसुस गर्छन् किनभने कानूनी भाषा डरलाग्दो हुन्छ र विधेयकहरू अमूर्त लाग्छन्। Gemma 4 ले बनाएका विविध पात्रहरूमार्फत — कानूनले वास्तविक मानिसहरूलाई कसरी असर गर्छ भन्ने सहानुभूति बनाउनुहोस्, आफ्नो विचार बनाउनु अघि।",
  disclaimer:
    "उत्पादनहरू व्याख्यात्मक कथा हुन्, कानूनी वा स्वास्थ्य सल्लाह होइनन्। योग्य पेशेविक वा नेपाल सरकारी आधिकारिक स्रोतसँग सधैं पुष्टि गर्नुहोस्।",
  footer: "Gemma 4 Good Hackathon का लागि निर्मित · नेपालका लागि नीति कथाकार",
  skipToMain: "मुख्य सामग्रीमा जानुहोस्",
  questMissionTitle: "मिशन ब्रिफिङ",
  questMissionTeaser: "छिटो सारांश — पूरा विवरण चाहिएमा मात्र खोल्नुहोस्।",
  questMissionExpand: "पूरा ब्रिफिङ हेर्नुहोस्",
  questMissionCollapse: "ब्रिफिङ लुकाउनुहोस्",
  questObjectives: "क्वेस्ट उद्देश्यहरू",
  questPickCharacter: "अन्वेषण गर्न पात्र छान्नुहोस्",
  questProgress: (explored, total) => `${total} मध्ये ${explored} पात्र अन्वेषण भयो`,
  questTabProfile: "प्रोफाइल",
  questTabStory: "दैनिक जीवन",
  questTabImpact: "प्रभाव",
  questReadyVote: "सबै पात्र अन्वेषण भयो — मतदान तयार!",
  questExploreHint: "पूरा क्वेस्ट खोल्न तलका प्रत्येक पात्रमा ट्याप गर्नुहोस्।",
  questLevelLabel: (n) => `स्तर ${n}`,
  questNext: "अर्को →",
  questBackStep: "← पछाडि",
  questStepOf: (current, total) => `चरण ${current} / ${total}`,
  questChapter: (n) => `अध्याय ${n}`,
  storyLoading: "तपाईंको कथा लोड हुँदै…",
  compareTitle: "तीनै तुलना गर्नुहोस्",
  compareSubtitle: "मत दिनुअघि छिटो तुलना।",
  regenerateConfirm: "यो विधेयकको पहिले बनाइएको कथा बदल्ने?",
  generatingWait: "काम भइरहेको छ… सामान्यतः १–२ मिनेट",
  storyLangBadge: (lang) => `${lang === "ne" ? "नेपाली" : "अंग्रेजी"} मा बनाइएको`,
  voteThankYou: (stance) => `धन्यवाद — तपाईंले ${stance} मत दिनुभयो।`,
  voteAlready: "यो ब्राउजरबाट यस कथामा पहिले नै मत दिइसकिएको छ।",
  policiesSideQuest: "साइड क्वेस्ट — थप नेपाल नीतिहरू",
  errorRateLimit:
    "AI सेवा व्यस्त छ (धेरै अनुरोध)। लगभग एक मिनेट पर्खनुहोस्, त्यसपछि फेरि «पूर्ण कथा बनाउनुहोस्» थिच्नुहोस्।",
  errorProviderBusy: "AI सेवा अस्थायी रूपमा उपलब्ध छैन। केही क्षणपछि फेरि प्रयास गर्नुहोस्।",
  errorProviderConfig:
    "AI सेवामा जोडिन सकेन। backend .env मा OPENROUTER_API_KEY र OPENROUTER_MODEL जाँच गर्नुहोस्।",
  errorNetwork: "सर्भरमा जोडिन सकेन। backend पोर्ट 8000 मा चलिरहेको छ?",
  errorGeneric: "बनाउँदा समस्या आयो। कृपया फेरि प्रयास गर्नुहोस्।",
  errorRetryHint: "पर्केर फेरि बनाउनुहोस् थिच्न सक्नुहुन्छ।",
};

export const STRINGS: Record<Lang, Strings> = { en, ne };
