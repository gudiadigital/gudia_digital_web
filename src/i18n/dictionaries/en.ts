import type { Dictionary } from "./tr";

export const en: Dictionary = {
  meta: {
    siteName: "Gudia Digital",
    title: "Gudia Digital — Digital Products & Growth Studio",
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
        title: "Branded Games & Interactive",
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
        short:
          "You already have an app or site, but it's dated, slow or broken. We fix it without starting over.",
        intro:
          "Most businesses don't need a new product — they need the one they have to work properly. We start with a free review and write down concretely what needs fixing; you choose the scope. Apps left un-updated for long enough can even enter App Store removal review, so this isn't work to postpone.",
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
        short:
          "We rebuild your marketplace product pages, images and copy around conversion.",
        intro:
          "Over 600,000 businesses in Türkiye sell on marketplaces, and the difference is rarely the product — it's the product page. We review your store, show you where the quick wins are, then apply them as a before/after.",
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
        role: "Co-founder",
        bio: "Runs project management, client communication, and content & e-commerce operations.",
      },
    ],
  },

  projects: {
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
    eyebrow: "Contact",
    title: "Let's talk",
    subtitle:
      "Ask for a free review, tell us about your project, or email us directly. We usually reply the same day.",
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

  footer: {
    tagline: "Digital product and growth studio. Build, improve, grow.",
    servicesTitle: "Services",
    contactTitle: "Contact",
    rights: "All rights reserved.",
    privacyTitle: "Your data",
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
    skipToContent: "Skip to content",
  },
};
