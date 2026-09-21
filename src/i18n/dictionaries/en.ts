import type { Dictionary } from "./tr";

export const en: Dictionary = {
  meta: {
    siteName: "Gudia Digital",
    title: "Gudia Digital — Mobile Apps, Web and Game Development",
    description:
      "Mobile app, website, mobile and PC game development; Trendyol store and social media management. A digital studio that takes your idea all the way to launch.",
  },

  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Projects",
    contact: "Contact",
    cta: "Start a Project",
    menu: "Menu",
    close: "Close",
    langLabel: "Language",
  },

  hero: {
    eyebrow: "Digital product studio",
    titleLead: "We turn your idea into",
    titleAccent: "a product that ships",
    titleTail: "— not a slide deck.",
    subtitle:
      "Gudia Digital builds mobile apps, websites and games, and grows e-commerce stores. Small team, no account managers, no agency layers — you talk to the people who actually build it.",
    ctaPrimary: "Start a Project",
    ctaSecondary: "Explore Services",
    stats: [
      { value: "iOS", label: "Native development experience" },
      { value: "2", label: "Founders, direct contact" },
      { value: "6", label: "Service areas" },
    ],
  },

  services: {
    eyebrow: "Services",
    title: "End-to-end digital production",
    subtitle:
      "We work on a single product or your brand's entire digital presence. Every service has a defined scope and process — no surprise invoices.",
    allLink: "All services",
    detailLink: "See details",
    items: {
      "mobil-uygulama": {
        title: "Mobile App Development",
        short:
          "Native-performance apps for iOS and Android, delivered all the way through App Store and Google Play release.",
        intro:
          "We take your app from idea to store listing. With our co-founder Gürkan's background as an iOS developer, we go especially deep in the Apple ecosystem: App Store review, privacy manifests, TestFlight distribution and release management included.",
        features: [
          "Native iOS development with Swift / SwiftUI",
          "Android and cross-platform options",
          "Interface design and user flow architecture",
          "Backend, database and API integration",
          "Push notifications, analytics and in-app purchases",
          "App Store & Google Play release and version management",
        ],
        deliverables: [
          "Full source code ownership",
          "Design files and component library",
          "Post-launch technical support period",
        ],
      },
      "web-sitesi": {
        title: "Website Development",
        short:
          "Fast-loading, search-visible sites and web apps that work properly on phones and desktops alike.",
        intro:
          "We don't install templates. We build sites designed around your brand with a measurable goal: a marketing site, a corporate presence, a landing page, or a web app with real business logic behind it.",
        features: [
          "Custom interface and design system",
          "Mobile-first, responsive across every screen",
          "Technical SEO, performance and accessibility work",
          "Content management panel (optional)",
          "Multilingual structure and regional content",
          "Domain, hosting and deployment setup",
        ],
        deliverables: [
          "Live site connected to your domain",
          "Training on updating content yourself",
          "Performance and SEO report",
        ],
      },
      "mobil-oyun": {
        title: "Mobile Game Development",
        short:
          "From hypercasual to mid-scale projects — mobile games built ready for store release.",
        intro:
          "We start your game idea as a playable prototype and carry it to a tested, shippable build. The core loop, progression balance and revenue model are designed together from day one.",
        features: [
          "Gameplay design and prototyping",
          "2D / 3D game development",
          "Level design and difficulty balancing",
          "Ad and in-app purchase integration",
          "Leaderboards, achievements, cloud saves",
          "Store release and update cycle",
        ],
        deliverables: [
          "Playable prototype",
          "Release-ready game build",
          "Store assets and promotional material",
        ],
      },
      "pc-oyun": {
        title: "PC Game Development",
        short:
          "Game projects for Steam and PC platforms, from prototype through to release.",
        intro:
          "PC games are longer projects. We define the scope up front and split it into stages: vertical slice, playable demo, early access, full release. At every stage you have something you can actually show.",
        features: [
          "Game mechanics and systems design",
          "3D / 2D production and technical direction",
          "Save system, settings, controller support",
          "Steam integration and store page setup",
          "Performance optimisation and build pipeline",
          "Demo, early access and update planning",
        ],
        deliverables: [
          "Playable builds at every stage",
          "Steam store page and release setup",
          "Technical documentation",
        ],
      },
      "trendyol-sosyal-medya": {
        title: "Trendyol & Social Media Management",
        short:
          "Day-to-day operation of your Trendyol store and a consistent social presence for your brand — handled in one place.",
        intro:
          "Even a great product doesn't sell without store operations and consistent content. We take over the Trendyol side and build a steady, no-nonsense presence on social media.",
        features: [
          "Trendyol store setup and product listings",
          "Product titles, descriptions and image curation",
          "Price, stock and campaign tracking",
          "Customer questions and review management",
          "Social media content calendar and publishing",
          "Monthly performance reporting",
        ],
        deliverables: [
          "Clean, live product catalogue",
          "Monthly content calendar",
          "Sales and engagement report",
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
        title: "We talk",
        text: "We listen to what you want to build. No jargon — we work out together what the project actually needs.",
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
        text: "Store release, domain, servers — we handle all of it. Support continues for an agreed period after delivery.",
      },
    ],
  },

  about: {
    eyebrow: "About",
    title: "A two-person team, direct contact",
    lead:
      "Gudia Digital was founded to remove the layers big agencies put in the middle. You talk to whoever is building your project.",
    story: [
      "We started Gudia Digital because of the same problem we kept seeing across years of different projects: a client explains something, three people get involved in between, and a completely different product comes out the other end.",
      "We choose to stay small. The people who take on the work are the people who build and deliver it. That's why we deliver what we promised — and say up front when something isn't work we should take.",
      "We work across a wide range, from mobile apps and games to corporate sites and e-commerce operations. The common thread: every job ends with a product that's genuinely live and that people use.",
    ],
    missionTitle: "Our mission",
    mission:
      "To make well-designed, properly working digital products reachable for small and mid-sized brands without enterprise budgets.",
    visionTitle: "Our vision",
    vision:
      "To become a digital studio from Türkiye that also builds its own products — referenced both for client work and for our own games and apps.",
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
        bio: "Leads mobile app development. Builds native iOS apps with Swift and SwiftUI, and is responsible for App Store release processes, architecture decisions and technical production.",
      },
      {
        name: "Dilara İşman",
        role: "Co-founder",
        bio: "Runs project management, client communication, and e-commerce & social media operations.",
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
  },

  cta: {
    title: "Got a project in mind?",
    subtitle:
      "Write to us even if it's still just an idea. The first conversation is free — let's talk about whether it's feasible and roughly what it costs.",
    button: "Get in Touch",
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's talk",
    subtitle:
      "Fill in the form or email us directly. We usually reply the same day.",
    emailLabel: "Email",
    email: "contact@gudiadigital.com",
    responseLabel: "Response time",
    responseValue: "Within 24 hours on weekdays",
    locationLabel: "Location",
    locationValue: "Türkiye · We work remotely",
    form: {
      name: "Full name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      subject: "Subject",
      subjectPlaceholder: "Choose a service",
      subjectOther: "Other",
      message: "Your message",
      messagePlaceholder: "Tell us briefly about your project: what do you want to build, and by when?",
      submit: "Send Message",
      submitting: "Sending…",
      success: "Message received. We'll get back to you shortly.",
      error: "Couldn't send the message. Please email contact@gudiadigital.com directly.",
      required: "This field is required",
      invalidEmail: "Enter a valid email address",
    },
  },

  footer: {
    tagline: "Mobile app, web and game development studio.",
    servicesTitle: "Services",
    companyTitle: "Company",
    contactTitle: "Contact",
    rights: "All rights reserved.",
  },

  common: {
    backToServices: "Back to all services",
    whatWeDo: "Scope",
    whatYouGet: "What you get",
    skipToContent: "Skip to content",
  },
};
