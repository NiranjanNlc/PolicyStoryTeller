export type Bill = {
  id: string;
  emoji: string;
  label: { en: string; ne: string };
  summary: { en: string; ne: string };
  text: { en: string; ne: string };
};

/** Four real Nepali legislative bills — more coming soon. */
export const BILLS: Bill[] = [
  {
    id: "social-media-2081",
    emoji: "📱",
    label: {
      en: "Social Media Act (Bill), 2081",
      ne: "सामाजिक सञ्जाल ऐन (विधेयक), २०८१",
    },
    summary: {
      en: "Regulates social media platforms and users through registration, content moderation, and penalties for harmful content.",
      ne: "दर्ता, सामग्री संयम र हानिकारक सामग्रीका लागि दण्डमार्फत सामाजिक सञ्जाल प्लेटफर्म र प्रयोगकर्ताहरू नियमन गर्छ।",
    },
    text: {
      en:
        "Social Media Act (Bill), 2081 — This bill proposes to regulate social media platforms operating in Nepal and their users. " +
        "Key provisions include mandatory registration or licensing of platforms, obligations for content moderation and removal of illegal or harmful material, " +
        "requirements for user identity verification on certain platforms, data retention rules, and penalties for spreading misinformation, hate speech, or content that threatens public order. " +
        "Platforms must appoint local representatives and comply with government takedown requests within specified timeframes. " +
        "Youth creators, student activists, and small online businesses would be directly affected by registration rules and content liability standards.",
      ne:
        "सामाजिक सञ्जाल ऐन (विधेयक), २०८१ — यो विधेयकले नेपालमा सञ्चालित सामाजिक सञ्जाल प्लेटफर्म र तिनका प्रयोगकर्ताहरू नियमन गर्ने प्रस्ताव गर्छ। " +
        "मुख्य व्यवस्थाहरूमा प्लेटफर्मको अनिवार्य दर्ता वा इजाजत, गैरकानूनी वा हानिकारक सामग्री संयम र हटाउने दायित्व, " +
        "केही प्लेटफर्ममा प्रयोगकर्ता पहिचान प्रमाणीकरण, डाटा राख्ने नियम, र गलत सूचना, घृणा फैलाउने वा सार्वजनिक शान्ति खतरामा पार्ने सामग्रीका लागि दण्ड समावेश छ। " +
        "प्लेटफर्मले स्थानीय प्रतिनिधि नियुक्त गर्नुपर्छ र निर्धारित समयभित्र सरकारको हटाउने अनुरोध पालना गर्नुपर्छ। " +
        "युवा सिर्जनाकर्ता, विद्यार्थी कार्यकर्ता र साना अनलाइन व्यवसायहरू दर्ता नियम र सामग्री दायित्व मापदण्डबाट प्रत्यक्ष प्रभावित हुनेछन्।",
    },
  },
  {
    id: "it-cyber-security-2082",
    emoji: "🔒",
    label: {
      en: "IT and Cyber Security Bill, 2082",
      ne: "सूचना प्रविधि तथा साइबर सुरक्षा विधेयक, २०८२",
    },
    summary: {
      en: "Defines cybercrime offenses, national cyber security structures, and compliance duties for digital service providers.",
      ne: "साइबर अपराध, राष्ट्रिय साइबर सुरक्षा संरचना र डिजिटल सेवा प्रदायकका अनुपालन दायित्व परिभाषित गर्छ।",
    },
    text: {
      en:
        "Information Technology and Cyber Security Bill, 2082 — This bill replaces older IT legislation and establishes a comprehensive framework for cybercrime and digital security in Nepal. " +
        "It defines offenses including unauthorized access, data theft, online fraud, cyber harassment, and attacks on critical information infrastructure, with tiered penalties. " +
        "It creates national cyber security structures, sets incident reporting requirements for institutions, and imposes security and compliance duties on digital service providers, banks, and government agencies. " +
        "Youth who run online shops, gaming communities, or freelance tech work would face new obligations around data protection and reporting suspicious cyber activity.",
      ne:
        "सूचना प्रविधि तथा साइबर सुरक्षा विधेयक, २०८२ — यो विधेयकले पुरानो IT कानून प्रतिस्थापन गरी नेपालमा साइबर अपराध र डिजिटल सुरक्षाको व्यापक ढाँचा स्थापना गर्छ। " +
        "अनाधिकृत पहुँच, डाटा चोरी, अनलाइन ठगी, साइबर उत्पीडन र महत्वपूर्ण सूचना पूर्वाधारमा आक्रमण जस्ता अपराधहरू परिभाषित गर्छ, स्तरित दण्डसहित। " +
        "राष्ट्रिय साइबर सुरक्षा संरचना बनाउँछ, संस्थाहरूका लागि घटना रिपोर्टिङ आवश्यकता राख्छ, र डिजिटल सेवा प्रदायक, बैंक र सरकारी निकायमा सुरक्षा र अनुपालन दायित्व लगाउँछ। " +
        "अनलाइन पसल, गेमिङ समुदाय वा फ्रिलान्स टेक काम गर्ने युवाहरू डाटा संरक्षण र शङ्कास्पद साइबर गतिविधि रिपोर्ट गर्ने नयाँ दायित्व सामना गर्नेछन्।",
    },
  },
  {
    id: "school-education-2080",
    emoji: "🎓",
    label: {
      en: "School Education Bill, 2080",
      ne: "विद्यालय शिक्षा विधेयक, २०८०",
    },
    summary: {
      en: "Restructures school levels, teacher standards, and roles of federal, provincial, and local governments in education.",
      ne: "विद्यालय तह पुनर्गठन, शिक्षक मापदण्ड र शिक्षामा तीन तह सरकारको भूमिका व्यवस्थित गर्छ।",
    },
    text: {
      en:
        "School Education Bill, 2080 — This bill replaces the old Education Act and restructures Nepal's school education system. " +
        "It defines school levels (basic and secondary), sets minimum qualifications and licensing for teachers, regulates public and private schools, " +
        "and clarifies the roles of federal, provincial, and local governments in curriculum, inspection, and funding. " +
        "Provisions cover student assessment, school management committees, inclusive education for marginalized groups, and penalties for operating unregistered institutions. " +
        "Students, parents, teachers, and private school operators — especially in urban and rural municipalities — would see changes to fees, hiring rules, and graduation requirements.",
      ne:
        "विद्यालय शिक्षा विधेयक, २०८० — यो विधेयकले पुरानो शिक्षा ऐन प्रतिस्थापन गरी नेपालको विद्यालय शिक्षा प्रणाली पुनर्गठन गर्छ। " +
        "विद्यालय तह (आधारभूत र माध्यमिक) परिभाषित गर्छ, शिक्षकका लागि न्यूनतम योग्यता र इजाजपत्र, सार्वजनिक र निजी विद्यालय नियमन, " +
        "र पाठ्यक्रम, निरीक्षण र कोषमा संघ, प्रदेश र स्थानीय सरकारको भूमिका स्पष्ट पार्छ। " +
        "विद्यार्थी मूल्याङ्कन, विद्यालय व्यवस्थापन समिति, सिमान्तकृत समूहका लागि समावेशी शिक्षा र दर्ता बिना सञ्चालित संस्थामा दण्ड समावेश छ। " +
        "विद्यार्थी, अभिभावक, शिक्षक र निजी विद्यालय सञ्चालक — विशेष गरी शहरी र ग्रामीण नगरपालिकामा — शुल्क, भर्ना नियम र स्नात्ति आवश्यकतामा परिवर्तन देख्नेछन्।",
    },
  },
  {
    id: "privacy-act-2075",
    emoji: "🔐",
    label: {
      en: "Privacy Act, 2075",
      ne: "गोपनीयता ऐन, २०७५",
    },
    summary: {
      en: "Governs collection, use, and protection of personal data — covering consent, data handling, and misuse.",
      ne: "व्यक्तिगत डाटाको सङ्कलन, प्रयोग र संरक्षण — सहमति, डाटा व्यवस्थापन र दुरुपयोग सम्बन्धी नियम।",
    },
    text: {
      en:
        "Privacy Act, 2075 (Individual Privacy Act) — This act governs the collection, use, storage, and protection of personal data and individual privacy in Nepal. " +
        "It covers personal information in physical and electronic form, sets rules for consent before data collection, limits data sharing with third parties, " +
        "and establishes penalties for unauthorized disclosure, surveillance, or misuse of private records. " +
        "Public bodies and private companies must handle citizen data responsibly and respond to privacy complaints. " +
        "Young people using mobile apps, social platforms, and e-government services would gain new rights to know how their data is used and to seek redress when it is mishandled.",
      ne:
        "गोपनीयता ऐन, २०७५ (व्यक्तिगत गोपनीयता ऐन) — यो ऐनले नेपालमा व्यक्तिगत डाटा र व्यक्तिगत गोपनीयताको सङ्कलन, प्रयोग, भण्डारण र संरक्षण नियमन गर्छ। " +
        "भौतिक र इलेक्ट्रोनिक रूपमा व्यक्तिगत जानकारी समेट्छ, डाटा सङ्कलन अघि सहमति नियम, तेस्रो पक्षसँग डाटा साझेदारी सीमा, " +
        "र अनाधिकृत प्रकट, निगरानी वा निजी अभिलेख दुरुपयोगका लागि दण्ड स्थापना गर्छ। " +
        "सार्वजनिक निकाय र निजी कम्पनीहरूले नागरिक डाटा जिम्मेवारीपूर्वक व्यवस्थापन गर्नुपर्छ र गोपनीयता गुनासोको जवाफ दिनुपर्छ। " +
        "मोबाइल एप, सामाजिक प्लेटफर्म र इ-सरकार सेवा प्रयोग गर्ने युवाहरूले आफ्नो डाटा कसरी प्रयोग हुन्छ भन्ने जान्ने र दुरुपयोग भएमा उपचार खोज्ने अधिकार पाउनेछन्।",
    },
  },
];
