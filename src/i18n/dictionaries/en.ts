import type { Dictionary, PrivacySection } from "./tr";

export const en: Dictionary = {
  meta: {
    siteName: "Gudia Digital",
    title: "Gudia Digital — Mobile App, Website & Branded Game Studio",
    description:
      "We build, improve and grow digital products for brands: mobile apps, websites, branded games, social media content and e-commerce.",
  },

  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Projects",
    contact: "Contact",
    cta: "Free Review",
    menu: "Menu",
    close: "Close",
    langLabel: "Language",
  },

  hero: {
    eyebrow: "Digital Products & Growth Studio",
    title: [
      { text: "We ", accent: false },
      { text: "build", accent: true },
      { text: ", ", accent: false },
      { text: "improve", accent: true },
      { text: " and ", accent: false },
      { text: "grow", accent: true },
      { text: " digital products for brands.", accent: false },
    ],
    pillars: ["Web", "Mobile", "Interactive", "Content", "Commerce"],
    subtitle:
      "We build products from scratch, fix the digital assets you already have, and get them ready to sell. Small team — no account managers, no agency layers, you talk to the people who actually build it.",
    ctaPrimary: "Get a Free Review",
    ctaSecondary: "Our Services",
  },

  story: {
    chapter: "Chapter",
    progress: "Progress",
  },

  approach: {
    eyebrow: "How we work",
    title: "Build, improve, grow",
    subtitle:
      "No two brands are at the same point. Some need a product built from scratch, some need what they have fixed, some need it turned into sales. The same team handles all three.",
    groups: {
      build: {
        label: "Build",
        title: "From scratch",
        text: "When there's nothing there yet, we build it: mobile apps, websites, branded games and interactive experiences.",
        specs: [
          { k: "Platform", v: "iOS · Android · Web · PC" },
          { k: "Handover", v: "You own the full source code" },
          { k: "Process", v: "Staged, a working build at each step" },
        ],
      },
      improve: {
        label: "Improve",
        title: "Fix what you have",
        text: "If your app is dated, your site is slow or the design has fallen behind, we repair, speed up and modernise it without a rewrite.",
        specs: [
          { k: "Start", v: "Free written review" },
          { k: "Method", v: "Repair without a rewrite" },
          { k: "After", v: "Monthly technical maintenance" },
        ],
      },
      grow: {
        label: "Grow",
        title: "Make it visible and sellable",
        text: "A good product still doesn't sell without content and a tidy storefront. We produce your social content and rebuild your e-commerce pages.",
        specs: [
          { k: "Content", v: "Monthly plan, production, publishing" },
          { k: "Marketplace", v: "Product pages and imagery" },
          { k: "Measurement", v: "Monthly performance report" },
        ],
      },
    },
  },

  services: {
    seo: {
      title: "Services: Mobile Apps, Web, Games & E-Commerce",
      description:
        "Mobile apps, websites, branded games, product improvement, social media content and Trendyol store optimization, each with a clearly defined scope.",
    },
    eyebrow: "Services",
    title: "End-to-end digital production",
    subtitle:
      "We work on a single product or your brand's entire digital presence. Every service has a defined scope and process — no surprise invoices.",
    allLink: "All services",
    detailLink: "See details",
    groupLabels: {
      build: "Build",
      improve: "Improve",
      grow: "Grow",
    },
    items: {
      "mobil-uygulama": {
        title: "Mobile App Development",
        seo: {
          title: "iOS & Android App Development",
          description:
            "Custom iOS and Android apps for your business: booking, membership, loyalty and payment flows. You own the source code; we handle the store release.",
        },
        short:
          "Apps built from scratch for iOS and Android: booking, membership, loyalty, payments and customer portals tailored to your business.",
        intro:
          "Our goal isn't just to hand over an app; it's to build a product the business actually uses, one that touches operations or sales. With our co-founder Gürkan's background as an iOS developer, we go especially deep in the Apple ecosystem.",
        features: [
          "Native iOS development with Swift / SwiftUI",
          "Android and cross-platform options",
          "Booking, membership, loyalty and payment flows",
          "Customer portals and internal operations screens",
          "Push notifications, analytics and in-app purchases",
          "App Store & Google Play release and version management",
        ],
        deliverables: [
          "Full source code ownership",
          "Design files and component library",
          "TestFlight distribution and post-launch support period",
        ],
      },
      "web-sitesi": {
        title: "Website Development",
        seo: {
          title: "Business Websites & Landing Pages",
          description:
            "Business websites and landing pages designed around your brand, not a template: mobile-first, fast-loading, with technical SEO, live on your domain.",
        },
        short:
          "Fast-loading, search-visible corporate sites and landing pages that work properly on phones and desktops alike.",
        intro:
          "We don't install templates. We build sites designed around your brand with a measurable goal: a marketing site, a corporate presence, a landing page, or a web app with booking or a customer portal inside it.",
        features: [
          "Custom interface and design system",
          "Mobile-first, responsive across every screen",
          "Technical SEO, performance and accessibility work",
          "Conversion points: WhatsApp, forms, booking",
          "Content management panel and multilingual setup (optional)",
          "Domain, hosting and deployment setup",
        ],
        deliverables: [
          "Live site connected to your domain",
          "Training on updating content yourself",
          "Performance and SEO report",
        ],
      },
      "markali-oyunlar": {
        title: "Branded Games & Interactive Experiences",
        seo: {
          title: "Branded Games for Events & Trade Shows",
          description:
            "Branded games and interactive experiences for events, trade shows and campaigns, on tablet, kiosk, web or mobile, with optional leaderboards and prizes.",
        },
        short:
          "Custom games and interactive activations for events, campaigns and trade shows.",
        intro:
          "Something people play instead of another ad. A competition that draws a queue at your trade show stand, a campaign-linked prize wheel, a training simulation, or a small game set in your brand's world — we define the scope together.",
        features: [
          "Gamification for events and trade shows",
          "Campaign-linked interactive experiences",
          "Custom characters, visual language and gameplay",
          "Runs on tablet, kiosk, web and mobile",
          "Leaderboards, prizes and participant data capture",
          "Post-event reporting",
        ],
        deliverables: [
          "Playable prototype",
          "Event-ready setup with a fallback plan",
          "Participation and engagement report",
        ],
      },
      "dijital-urun-iyilestirme": {
        title: "Digital Product Improvement",
        seo: {
          title: "App & Website Maintenance and Improvement",
          description:
            "We fix dated, slow or broken apps and websites without a rewrite: a free written review, App Store compliance updates and monthly maintenance.",
        },
        short:
          "You already have an app or site, but it's dated, slow or broken. We fix it without starting over.",
        intro:
          "Most businesses don't need a new product — they need the one they have to work properly. We start with a free review and write down concretely what needs fixing; you choose the scope. Apple warns developers when an app hasn't been updated in three years and has had few or no downloads over the past 12 months: unless an update is submitted within 90 days, the app is removed from the App Store. This isn't work to postpone.",
        sources: [
          {
            label: "Apple Developer: App Store Improvements",
            url: "https://developer.apple.com/support/app-store-improvements/",
          },
        ],
        features: [
          "App audit: crash, performance and usage analysis",
          "Interface refresh and user flow fixes",
          "Swift and dependency updates, App Store compliance",
          "Website refresh: mobile layout, speed, SSL and form repairs",
          "Adding missing conversion points (WhatsApp, forms, booking)",
          "Monthly maintenance: backups, updates, security, small changes",
        ],
        deliverables: [
          "Written review with a prioritised list",
          "Fixed and released version",
          "Before / after performance comparison",
        ],
      },
      "sosyal-medya-icerik": {
        title: "Social Media Content Production",
        seo: {
          title: "Social Media Content: Reels, Posts & Stories",
          description:
            "Monthly Reels, posts and stories: content plan, short scripts, editing, cover designs and captions, with publishing and a monthly engagement report.",
        },
        short:
          "Monthly Reels, posts and stories — with the content plan, scripts and cover designs included.",
        intro:
          "Producing content consistently is the hardest part for most businesses. You send us the footage; we handle everything from editing and design to publishing. No overpromising: professional shoots, talent and locations are outside this scope.",
        features: [
          "Monthly content plan and publishing calendar",
          "Reels editing, ideas and short scripts",
          "Image and carousel post design",
          "Cover designs and caption copy",
          "Story designs",
          "Scheduling and publishing",
        ],
        deliverables: [
          "Monthly content calendar",
          "Ready-to-publish Reels, image and story sets",
          "Monthly engagement report",
        ],
      },
      "e-ticaret-optimizasyonu": {
        title: "E-Commerce Optimization",
        seo: {
          title: "Trendyol Store Optimization",
          description:
            "We rework your Trendyol store for conversion: product images, SEO-friendly titles and descriptions, and a tidy category and variant structure.",
        },
        short:
          "We rebuild your marketplace product pages, images and copy around conversion.",
        intro:
          "According to Türkiye's Ministry of Trade, 600,800 businesses sold online in 2024. What sets them apart is rarely the product — it's the product page. We review your store, show you where the quick wins are, then apply them as a before/after.",
        sources: [
          {
            label: "Türkiye Ministry of Trade announcement, 6 May 2025 (in Turkish)",
            url: "https://ticaret.gov.tr/duyurular/turkiyede-e-ticaretin-gorunumu-raporu-yayinlandi-06-05-2025",
          },
        ],
        features: [
          "Product and cover image rework",
          "SEO-friendly product titles and descriptions",
          "Infographics and spec/dimension visuals",
          "Tidying up categories and variant structure",
          "Store cover images and storefront layout",
          "Product uploads and bulk updates",
        ],
        deliverables: [
          "Before / after comparison visuals",
          "Rebuilt, live product pages",
          "Sales and impressions report",
        ],
      },
    },
  },

  process: {
    eyebrow: "How we work",
    title: "A clear process in four steps",
    subtitle:
      "We don't like surprises. What gets delivered and when is written down before anything starts.",
    steps: [
      {
        title: "Review",
        text: "We look at your existing app, site or store. We listen to what you want to build and work out what the project actually needs.",
      },
      {
        title: "Scope and quote",
        text: "We write the work down item by item, with timeline and budget. Nothing starts before you approve it.",
      },
      {
        title: "Build",
        text: "We split the work into stages. At the end of each one you get a version that genuinely runs and that you can see.",
      },
      {
        title: "Launch and after",
        text: "Store release, domain, servers — we handle all of it. Support can continue afterwards on a maintenance plan.",
      },
    ],
  },

  about: {
    seo: {
      title: "About: Gürkan Sevilmiş & Dilara İşman",
      description:
        "Gudia Digital is a two-person digital product and growth studio run remotely from Türkiye by co-founders Gürkan Sevilmiş and Dilara İşman.",
    },
    eyebrow: "About",
    title: "A two-person team, direct contact",
    lead:
      "Gudia Digital is a digital product and growth studio, founded to remove the layers big agencies put in the middle — you talk to whoever is building your project.",
    story: [
      "We started Gudia Digital because of the same problem we kept seeing across years of different projects: a client explains something, three people get involved in between, and a completely different product comes out the other end.",
      "We choose to stay small. The people who take on the work are the people who build and deliver it. That's why we deliver what we promised — and say up front when something isn't work we should take.",
      "Our work falls into three parts: building, improving and growing. With some brands we build an app from scratch, for others we fix the site they already have, and for others we rebuild a storefront that nobody can find despite a good product. The common thread: every job ends with something genuinely live that people use.",
    ],
    missionTitle: "Our mission",
    mission:
      "To make well-designed, properly working digital products reachable for small and mid-sized brands without enterprise budgets.",
    visionTitle: "Our vision",
    vision:
      "To become a digital studio from Türkiye that also builds its own products — referenced both for client work and for our own apps and games.",
    valuesTitle: "Our values",
    values: [
      {
        title: "Open communication",
        text: "If something will be late, we say so in advance. We don't claim to know things we don't.",
      },
      {
        title: "Work that ships",
        text: "Working products, not presentations. Every stage produces something tangible.",
      },
      {
        title: "You own it",
        text: "Source code, design files, accounts — all yours. You're never locked in to us.",
      },
      {
        title: "Honest pricing",
        text: "Priced for the work done. No hidden line items, no costs added later.",
      },
    ],
    foundersTitle: "Founders",
    founders: [
      {
        name: "Gürkan Sevilmiş",
        role: "Co-founder · iOS Developer",
        bio: "Leads mobile app development and product improvement. Builds native iOS apps with Swift and SwiftUI, and is responsible for App Store release processes, architecture decisions and technical production.",
      },
      {
        name: "Dilara İşman",
        role: "Co-founder · Game Developer",
        bio: "Runs game development, project management and client communication. Responsible for building branded games and interactive experiences, planning projects and delivering them on time, and day-to-day contact with clients.",
      },
    ],
  },

  projects: {
    seo: {
      title: "Projects: Apps, Games & E-Commerce",
      description:
        "Projects we've worked on: mobile apps such as Pofu, SnapPet, Habitile and İkra, branded games and interactive experiences, and a Trendyol store.",
    },
    eyebrow: "Projects",
    title: "What we've been building",
    subtitle:
      "Work we've shipped and keep developing. We update this page as the list grows.",
    empty:
      "We're getting our first projects ready for launch. This section will be updated soon — in the meantime, if you'd like to discuss a project, get in touch.",
    emptyCta: "Get in touch",
    viewProject: "View project",
    featuredEyebrow: "Selected work",
    featuredTitle: "Projects that shipped",
    featuredSubtitle:
      "From experiences we built for brands to our own apps — work that is genuinely live.",
    allProjects: "All projects",
    referencesTitle: "Our work in this area",
    backToProjects: "Back to all projects",
    detailTitle: "About the project",
    screensTitle: "Store screenshots",
    screensTitleSite: "Screenshots",
    factsTitle: "Details",
    linksTitle: "Where to find it",
    ratingLabel: "App Store rating",
    ratingCount: "ratings",
    ratingAsOf: "as of",
    otherProjects: "Other projects",
    linkLabels: {
      appstore: "App Store",
      playstore: "Google Play",
      steam: "Steam",
      web: "Website",
      trendyol: "Trendyol",
      instagram: "Instagram",
    },
  },

  cta: {
    title: "Want us to look at what you have?",
    subtitle:
      "We'll review your app, site or store and send you a written list of what can concretely be improved — free, no obligation. Nothing built yet? Write anyway, and we'll talk through feasibility in the first call.",
    button: "Get a Free Review",
  },

  contact: {
    seo: {
      title: "Contact & Free Review",
      description:
        "Ask for a free review of your app, site or store, tell us about your project, or email us directly. We reply within 24 hours on weekdays.",
    },
    eyebrow: "Contact",
    title: "Let's talk",
    subtitle:
      "Ask for a free review, tell us about your project, or email us directly. We reply within 24 hours on weekdays.",
    emailLabel: "Email",
    email: "contact@gudiadigital.com",
    responseLabel: "Response time",
    responseValue: "Within 24 hours on weekdays",
    locationLabel: "Location",
    locationValue: "Türkiye · We work remotely",
    formTitle: "Or fill in the form",
    form: {
      name: "Full name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      phone: "Phone",
      phonePlaceholder: "Your phone number",
      contactHint: "How should we get back to you? An email or a phone number is enough.",
      contactRequired: "Enter an email or a phone number",
      invalidPhone: "Enter a valid phone number",
      subject: "Subject",
      subjectReview: "I'd like a free review",
      subjectOther: "Other",
      message: "Your message",
      messagePlaceholder: "Tell us briefly about your project: what do you want to build, and by when?",
      submit: "Send Message",
      privacyNotice: {
        before: "Read how the information you send is processed in our ",
        link: "Privacy Notice",
        after: ".",
      },
      submitting: "Sending…",
      success: {
        title: "Message received",
        text: "We'll get back to you shortly.",
        close: "OK",
      },
      error: "Couldn't send the message. You can still reach us with one of the options below.",
      required: "This field is required",
      invalidEmail: "Enter a valid email address",
      send: {
        title: "Your message is ready",
        hint: "Choose where to send it from. If there's no email app on your computer, send it with Gmail or Outlook, or copy the message and paste it into an email to us.",
        gmail: "Send with Gmail",
        outlook: "Send with Outlook",
        app: "Open in email app",
        copy: "Copy message",
        copied: "Copied",
        copyFailed: "Couldn't copy; please copy the message manually.",
        to: "To",
      },
    },
  },

  improvements: {
    eyebrow: "Examples",
    title: "Improvements we made to our own products",
    subtitle:
      "Our own apps show best what this service means. Both were reworked while already live; below is what was done at each stage, in order.",
    projectLink: "Project page",
  },

  privacy: {
    seo: {
      title: "Privacy Notice",
      description:
        "How Gudia Digital handles personal data from its contact form and email under Türkiye's KVKK Law No. 6698: data collected, purposes, transfers and your rights.",
    },
    title: "Privacy Notice",
    lead: "Under Article 10 of Türkiye's Personal Data Protection Law No. 6698 (KVKK), this notice explains how your personal data is processed on this site and when you write to us.",
    updated: "Last updated: 28 September 2026",
    sections: [
      {
        title: "Data controller",
        body: [
          "Your personal data is processed by Gürkan Sevilmiş and Dilara İşman, who work together as Gudia Digital, acting as data controllers. You can reach us at contact@gudiadigital.com.",
        ],
      },
      {
        title: "What data we process",
        items: [
          "Identity: your first and last name",
          "Contact: your email address and/or phone number",
          "Request: the subject you pick and whatever you share in your message",
          "Security: the IP address and browser information that the hosting and form services record technically when you visit the site or send the form",
        ],
        after: [
          "This site uses no cookies, analytics or ad tracking. Please don't share sensitive personal data such as health, religion or ethnic origin in your message.",
        ],
      },
      {
        title: "Why we process it",
        items: [
          "To answer your question, project request or free review request",
          "To prepare a proposal and discuss the project",
          "To carry out a working relationship once one is established",
          "To keep the site and contact form secure and to prevent unwanted submissions (spam)",
        ],
      },
      {
        title: "How we collect it and on what legal basis",
        body: [
          "Your data is collected electronically, directly from you, through the contact form or by email. We rely on the following legal grounds in Article 5(2) of the Law:",
        ],
        items: [
          "(c) It is directly related to entering into or performing a contract — for proposals, project discussions and working relationships",
          "(f) It is necessary for our legitimate interests, provided your fundamental rights and freedoms are not harmed — for answering general questions and site security",
        ],
      },
      {
        title: "Who we share it with",
        body: [
          "We don't sell your data or share it with anyone for advertising or marketing. We only use the service providers below so the site and our correspondence work. Their servers are located outside Türkiye, so your data is transferred abroad within the scope of Article 9 of the Law:",
        ],
        items: [
          "Web3Forms — forwards your contact form message to us by email",
          "Google Workspace (Google LLC) — hosts our email account; your message and our correspondence are stored there",
          "GitHub Pages (GitHub, Inc.) — hosts the site; may record your IP address for security when you visit",
        ],
        after: [
          "Beyond this, your data may only be shared with authorised public authorities when they request it under a legal obligation.",
        ],
      },
      {
        title: "How long we keep it",
        body: [
          "Your message and our correspondence are kept for at most 1 year after your request is resolved. If we start working together, they are kept for the duration of that relationship and any legal retention periods. When the period ends, the data is deleted.",
        ],
      },
      {
        title: "Your rights",
        body: ["Under Article 11 of the Law, you have the right to:"],
        items: [
          "Learn whether your personal data is processed",
          "Request information about it if it is",
          "Learn the purpose of processing and whether the data is used accordingly",
          "Know the third parties it is transferred to in Türkiye or abroad",
          "Ask for it to be corrected if it is incomplete or inaccurate",
          "Ask for it to be erased or destroyed under the conditions in Article 7 of the Law",
          "Ask for corrections, erasures and destructions to be notified to third parties the data was transferred to",
          "Object to an outcome against you that results solely from automated analysis",
          "Claim compensation if you suffer damage from unlawful processing",
        ],
      },
      {
        title: "How to apply",
        body: [
          "To use these rights, write to the address below from the email address you used to contact us before. We reply free of charge within 30 days at the latest. If you're not satisfied with our reply, you can file a complaint with the Personal Data Protection Board (KVKK).",
        ],
      },
    ] as PrivacySection[],
  },

  footer: {
    tagline: "Digital product and growth studio. Build, improve, grow.",
    servicesTitle: "Services",
    contactTitle: "Contact",
    rights: "All rights reserved.",
    privacyTitle: "Your data",
    privacyLink: "Privacy notice",
    privacyNote:
      "This site uses no cookies, analytics or tracking. What you write in the contact form is sent through the Web3Forms service only to deliver it to us by email; this site stores no data.",
  },

  webShowcase: {
    eyebrow: "Live sites",
    title: "Sites we built for our own apps",
    subtitle:
      "All six have a different page skeleton — none of them is the same template in another colour. Their home screens are below; clicking a card opens the live site.",
    visit: "Open the site",
    project: "See the project",
  },

  common: {
    backToServices: "Back to all services",
    whatWeDo: "Scope",
    whatYouGet: "What you get",
    source: "Source",
    skipToContent: "Skip to content",
  },
};
