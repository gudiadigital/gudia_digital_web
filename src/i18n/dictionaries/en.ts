import type {
  Dictionary,
  PrivacySection,
  ServiceFaq,
  ServiceProof,
} from "./tr";

export const en: Dictionary = {
  meta: {
    siteName: "Gudia Digital",
    title: "Gudia Digital — Mobile App, Website & Branded Game Studio",
    description:
      "We build, improve and grow digital products for brands: mobile apps, websites, branded games, social media content and e-commerce.",
    profiles: [],
  },

  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Projects",
    contact: "Contact",
    guides: "Guides",
    cta: "Free Review",
    menu: "Menu",
    close: "Close",
    langLabel: "Language",
  },

  hero: {
    eyebrow: "Gudia Digital · Digital Product & Growth Studio",
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

  home: {
    aboutTitle: "About Gudia Digital",
    aboutLink: "Founders and our story",
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
        text: "If your app is dated, your site is slow or the design has fallen behind, we repair, speed up and modernize it without a rewrite.",
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
    chooserTitle: "Which service fits you?",
    forWhomTitle: "Who is it for?",
    proofTitle: "What we've shipped in our own apps",
    faqTitle: "Frequently asked questions",
    faqProjects: "Related projects",
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
        answer:
          "Our mobile app development service builds a custom iOS and Android app for your business from scratch and releases it on the App Store and Google Play. It's for businesses that need an app for things like booking, membership, loyalty, payments or a customer portal.",
        intro:
          "Our goal isn't just to hand over an app; it's to build a product the business actually uses, one that touches operations or sales. With our co-founder Gürkan's background as an iOS developer, we go especially deep in the Apple ecosystem.",
        forWhom: [
          "Businesses that want to move booking, membership or a loyalty program into an app",
          "Businesses that want to take payments from customers through an app",
          "Teams that need a customer portal or internal operations screens",
          "Anyone who wants a native iOS app built with Swift and SwiftUI",
        ],
        proof: [
          { text: "HealthKit and Apple Watch integration, Home Screen widgets and a watch app", project: "pofu" },
          { text: "Interactive widgets, Live Activities and a watchOS app", project: "habitile" },
          { text: "Live on iOS and Android, with the store listing translated into 21 languages", project: "ikra" },
          { text: "Live on iOS and Android in 11 languages", project: "snappet" },
        ] as ServiceProof[],
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
        faq: [
          {
            q: "Who owns the app's source code?",
            a: "You own the full source code. The design files and component library are handed over with it, so you're never locked in to us.",
          },
          {
            q: "Do you handle the App Store and Google Play release?",
            a: "Yes. We take care of the store release and manage later versions. Before launch, we distribute the iOS build to you through TestFlight.",
          },
          {
            q: "What technology do you use for iOS apps?",
            a: "We build iOS apps natively with Swift and SwiftUI. This side is led by our co-founder Gürkan Sevilmiş, who is also responsible for App Store releases and architecture decisions.",
          },
          {
            q: "Do you build Android apps too?",
            a: "Yes, Android and cross-platform options are part of this service. Two of our own apps, İkra and SnapPet, are live on both iOS and Android.",
            projects: ["ikra", "snappet"],
          },
          {
            q: "Do you offer support after launch?",
            a: "Yes. A post-launch support period is part of the handover, and after that we can keep supporting the app on a maintenance plan.",
          },
          {
            q: "Which apps have you built?",
            a: "Our own apps Pofu, SnapPet, Habitile and İkra are live on the App Store, and SnapPet and İkra are on Google Play too.",
            projects: ["pofu", "snappet", "habitile", "ikra"],
          },
        ] as ServiceFaq[],
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
        answer:
          "Our website development service designs a business site, marketing site or landing page around your brand and puts it live on your domain. It's for brands that want a site that loads fast, shows up in search and works properly on both phones and desktops.",
        intro:
          "We don't install templates. We build sites designed around your brand with a measurable goal: a marketing site, a corporate presence, a landing page, or a web app with booking or a customer portal inside it.",
        forWhom: [
          "Brands that want a site of their own, not one that looks like a template",
          "Anyone who wants to present a product or campaign on a single landing page",
          "Businesses that want to win customers through WhatsApp, forms or booking on their site",
          "Teams that need a web app with booking or a customer portal inside it",
        ],
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
        faq: [
          {
            q: "Do you use ready-made templates or themes?",
            a: "No, we don't install templates; we design the interface and design system around your brand. The six sites we built for our own apps each have a different page skeleton.",
          },
          {
            q: "Do you build multilingual sites?",
            a: "Yes, a multilingual setup is available as an option. The Life Planner marketing site is published in seven languages, and the Deyimo site in Turkish and English.",
            projects: ["life-planner", "deyimo"],
          },
          {
            q: "Can I update the site myself later?",
            a: "Yes. At handover we train you on updating the content yourself, and if you'd like, we add a content management panel too.",
          },
          {
            q: "Is search engine optimization (SEO) included?",
            a: "Technical SEO, speed and accessibility work are part of the scope. At handover you also get a performance and SEO report.",
          },
          {
            q: "Do you set up the domain and hosting?",
            a: "Yes. We handle the domain, hosting and deployment setup, and hand the site over live and connected to your domain.",
          },
        ] as ServiceFaq[],
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
        answer:
          "Our branded games service designs and builds custom games and interactive experiences for your brand's events, campaigns and trade shows. It's for brands that want something people play, not just watch, at their stand or in their campaign.",
        intro:
          "Something people play instead of another ad. A competition that draws a queue at your trade show stand, a campaign-linked prize wheel, a training simulation, or a small game set in your brand's world — we define the scope together.",
        forWhom: [
          "Brands that want to draw visitors to their trade show stand",
          "Campaigns that need an interactive layer, such as a prize wheel or a competition",
          "Organizations that want to teach through a simulation or a game",
          "Event teams that want to collect participant data and get a report afterwards",
        ],
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
        faq: [
          {
            q: "What is a branded game (advergame), and where is it used?",
            a: "A branded game is a custom game or interactive experience set in a brand's world that people play instead of watching another ad. It's used at events, in campaigns and at trade shows: a competition at a stand, a campaign-linked prize wheel or a training simulation, for example.",
          },
          {
            q: "Which devices does it run on?",
            a: "We build for tablet, kiosk, web or mobile. Which one to use is decided together with you when we set the scope.",
          },
          {
            q: "Can you add a leaderboard and prizes?",
            a: "Yes. Leaderboards, prizes and participant data capture can be added, and after the event we send you a participation and engagement report.",
          },
          {
            q: "Can I see examples?",
            a: "For examples, see the project pages for the interactive experience built for the Logo Yazılım Software Development Center at KidZania İstanbul, and for PhotoSensia Kids, an app that teaches children photography through play.",
            projects: ["logo-kidzania", "photosensia"],
          },
        ] as ServiceFaq[],
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
        answer:
          "Our digital product improvement service repairs, speeds up and modernizes dated, slow or broken apps and websites without a rewrite. It's for businesses that already have an app or site and don't want to rebuild it from scratch.",
        intro:
          "Most businesses don't need a new product — they need the one they have to work properly. We start with a free review and write down concretely what needs fixing; you choose the scope. Apple warns developers when an app hasn't been updated in three years and has had few or no downloads over the past 12 months: unless an update is submitted within 90 days, the app is removed from the App Store. This isn't work to postpone.",
        sources: [
          {
            label: "Apple Developer: App Store Improvements",
            url: "https://developer.apple.com/support/app-store-improvements/",
          },
        ],
        forWhom: [
          "Owners of an app that hasn't been updated in a long time",
          "Anyone whose site loads slowly or looks broken on phones",
          "Apps that crash or need updating for App Store compliance",
          "Sites with a broken form or missing conversion points such as WhatsApp or booking",
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
          "Written review with a prioritized list",
          "Fixed and released version",
          "Before / after performance comparison",
        ],
        faq: [
          {
            q: "What does the free review include?",
            a: "We look at your app, site or store and send you a written review with a prioritized list of what concretely needs fixing. The review is free with no obligation, and you choose which work gets done.",
          },
          {
            q: "Does it have to be rewritten from scratch?",
            a: "Avoiding that is the point of this service: we repair, speed up and modernize your existing app or site without a rewrite. We first write down what needs fixing in the free review.",
          },
          {
            q: "Will Apple remove my app from the App Store?",
            a: "Apple emails the developers of apps that haven't been updated in the last three years and were downloaded very few times or not at all in the past 12 months. If no update is submitted within 90 days, the app is removed from the App Store until a new version is approved; people who already have it can keep using it. Apps that crash on launch are removed immediately.",
            sources: [
              {
                label: "Apple Developer: App Store Improvements",
                url: "https://developer.apple.com/support/app-store-improvements/",
              },
            ],
          },
          {
            q: "Google Play warned me about the “target API level”. What does it mean?",
            a: "Google Play requires apps to target recent Android versions. Since 31 August 2026, new apps and app updates must target Android 16 (API level 36), and existing apps that don't target at least Android 15 (API level 35) are no longer available to new users on devices running newer Android versions. If you need more time, Google may grant an extension up to a set date; the current deadline is on the source page.",
            sources: [
              {
                label: "Android Developers: Target API level requirements for Google Play",
                url: "https://developer.android.com/google/play/requirements/target-sdk",
              },
            ],
          },
          {
            q: "What does monthly maintenance cover?",
            a: "Monthly technical maintenance covers backups, updates, security and small changes. Once the improvement work is done, we can continue on this plan to keep the product up to date.",
          },
        ] as ServiceFaq[],
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
        answer:
          "Our social media content service plans, edits, designs and publishes your Reels, posts and stories every month. It's for businesses that want to post consistently but don't have time for editing and design.",
        intro:
          "Producing content consistently is the hardest part for most businesses. You send us the footage; we handle everything from editing and design to publishing. No overpromising: professional shoots, talent and locations are outside this scope.",
        forWhom: [
          "Businesses that struggle to post consistently",
          "Teams with footage on hand but no time for editing and design",
          "Brands that want to work from a monthly content plan and publishing calendar",
          "Anyone who wants a monthly report on the engagement their posts get",
        ],
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
        faq: [
          {
            q: "Who does the shooting?",
            a: "You send us the footage; we handle everything else, from editing and design to publishing. Professional shoots, talent and locations are outside this service.",
          },
          {
            q: "Do you come up with the ideas and scripts too?",
            a: "Yes. We write the Reels ideas and short scripts, and prepare the cover designs and captions.",
          },
          {
            q: "Do you publish the posts too?",
            a: "Yes. We schedule and publish the content according to the monthly publishing calendar.",
          },
          {
            q: "What do you deliver each month?",
            a: "Each month you get a content calendar, ready-to-publish Reels, image and story sets, and a report on the engagement the month's content received.",
          },
        ] as ServiceFaq[],
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
        answer:
          "Our e-commerce optimization service reworks your Trendyol store's product images, titles, descriptions, categories and variants around conversion. It's for sellers with a good product whose store isn't being found in search or isn't turning visits into sales.",
        intro:
          "According to Türkiye's Ministry of Trade, 634,611 businesses sold online in 2025. To help a store stand out on a marketplace, we start with the product page: we review your store, show you where the quick wins are, then apply them as a before/after.",
        sources: [
          {
            label: "Türkiye Ministry of Trade announcement, 12 May 2026 (in Turkish)",
            url: "https://ticaret.gov.tr/duyurular/turkiyede-e-ticaretin-gorunumu-raporu-yayinlandi-12-05-2026",
          },
        ],
        forWhom: [
          "Trendyol sellers with a good product whose store isn't being found or isn't selling",
          "Stores with messy or missing product and cover images",
          "Stores whose category and variant structure has become tangled",
          "Sellers who need to upload or update many products in bulk",
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
        faq: [
          {
            q: "What does Trendyol store optimization cover?",
            a: "It covers product and cover images, SEO-friendly product titles and descriptions, infographics and spec/dimension visuals, category and variant structure, and store cover images and storefront layout. We also handle product uploads and bulk updates.",
          },
          {
            q: "How does the work start?",
            a: "We first review your store and show you which products offer quick wins. Then we apply the changes as a before/after.",
          },
          {
            q: "How do I see the results?",
            a: "Before/after comparison visuals show what changed, and a sales and impressions report shows the outcome. The reworked product pages go live directly in your store.",
          },
          {
            q: "Is there an example store?",
            a: "In AysQuilt's Trendyol store, the product imagery, titles and descriptions were rebuilt around conversion; the details are on the project page.",
            projects: ["aysquilt"],
          },
        ] as ServiceFaq[],
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
    entity:
      "Gudia Digital is a two-person digital product and growth studio working remotely from Türkiye. It is run by co-founders Gürkan Sevilmiş and Dilara İşman: Gürkan builds iOS apps with Swift and SwiftUI, while Dilara develops games and handles project management and client communication. Gudia Digital builds mobile apps, websites, branded games and interactive experiences for small and mid-sized brands, improves existing apps and sites without a rewrite, produces social media content and reworks Trendyol stores for conversion. The team also builds and publishes its own apps: İkra (iOS and Android, 21 languages), SnapPet (iOS and Android, 11 languages), and Pofu and Habitile on the App Store.",
    lead:
      "We skip the layers big agencies put in the middle — you talk to whoever is building your project.",
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
        id: "gurkan-sevilmis",
        name: "Gürkan Sevilmiş",
        role: "Co-founder · iOS Developer",
        bio: "Leads mobile app development and product improvement. Builds native iOS apps with Swift and SwiftUI, and is responsible for App Store release processes, architecture decisions and technical production.",
        profiles: [],
      },
      {
        id: "dilara-isman",
        name: "Dilara İşman",
        role: "Co-founder · Game Developer",
        bio: "Runs game development, project management and client communication. Responsible for building branded games and interactive experiences, planning projects and delivering them on time, and day-to-day contact with clients.",
        profiles: [],
      },
    ],
  },

  projects: {
    seo: {
      title: "Projects: Apps, Games & Websites",
      description:
        "Projects we've worked on: mobile apps such as Pofu, SnapPet and İkra, branded games and interactive experiences, websites and a Trendyol store.",
    },
    eyebrow: "Projects",
    title: "What we've been building",
    subtitle:
      "Mobile apps, games, interactive experiences, websites and e-commerce work. We update this page as the list grows.",
    empty:
      "We're getting our first projects ready for launch. This section will be updated soon — in the meantime, if you'd like to discuss a project, get in touch.",
    emptyCta: "Get in touch",
    viewProject: "View project",
    featuredEyebrow: "Selected work",
    featuredTitle: "From apps to games",
    featuredSubtitle:
      "A selection from our own products and the experiences we've built for brands.",
    allProjects: "All projects",
    referencesTitle: "Our {service} work",
    websitesTitle: "Websites",
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
    review: {
      title: "How does the free review work?",
      steps: [
        {
          title: "Send us a link",
          text: "Choose “{subject}” in the form and add your app's App Store or Google Play link, your site's address or your Trendyol store link. You can also email us directly.",
        },
        {
          title: "We get back to you",
          text: "We reply to your message within 24 hours on weekdays.",
        },
        {
          title: "Get the written review",
          text: "We send you a written review with a prioritized list of what can concretely be improved. The review is free with no obligation, and you decide which work gets done.",
        },
      ],
    },
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
      invalid: {
        title: "Please check a few fields",
        text: "Fix the following so we can send your message:",
        close: "Fix",
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
        "How we handle personal data from our contact form and email under Türkiye's KVKK (Law No. 6698): what we collect, why, and your rights.",
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
          "Beyond this, your data may only be shared with authorized public authorities when they request it under a legal obligation.",
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

  guides: {
    seo: {
      title: "Guides: App Updates and Store Rules",
      description:
        "Answers to common questions about App Store and Google Play rules and app updates, with links to official sources. Every guide shows its author and date.",
    },
    title: "Guides to app updates and store rules",
    subtitle:
      "Plain answers to common questions about store rules and app updates, with links to the sources. Every guide shows who wrote it and when it was last updated.",
    byline: "Author",
    published: "Published",
    updated: "Last updated",
    sourcesTitle: "Sources",
    serviceLabel: "Related service",
    projectsLabel: "Related projects",
    relatedTitle: "Related guides",
    backToGuides: "All guides",
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
      "All six have a different page skeleton — none of them is the same template in another color. Their home screens are below; clicking a card opens the live site.",
    visit: "Open the site",
    imageAlt: "{title} website home screen",
    project: "{title} project page",
  },

  common: {
    backToServices: "Back to all services",
    breadcrumb: "Breadcrumb",
    whatWeDo: "What does {service} include?",
    whatYouGet: "What do you get?",
    source: "Source",
    skipToContent: "Skip to content",
  },
};
