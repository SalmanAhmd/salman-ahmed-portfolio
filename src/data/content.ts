export const PROFILE = {
  name: 'Salman Ahmed Ansari',
  role: 'Sr. Lead Engineer, Frontend',
  location: 'Mumbai, India',
  experience: '7+ years building production software',
  email: 'developer.salmanahmed@gmail.com',
  github: 'https://github.com/salmanahmd',
  linkedin: 'https://www.linkedin.com/in/ansari-salman/',
  company: 'FynTune Solutions',
  since: 'June 2020',
} as const

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'notes', label: 'Notes' },
] as const

/* ------------------------------------------------------------------ */
/* Hero architecture visual                                            */
/* ------------------------------------------------------------------ */

export const HERO_LAYERS = [
  { id: 'react', label: 'React', meta: 'runtime', depth: 0.9 },
  { id: 'arch', label: 'Application Architecture', meta: 'structure', depth: 0.65 },
  { id: 'modules', label: 'Modules', meta: '300+ feature units', depth: 0.42 },
  { id: 'state', label: 'State / API / Permissions', meta: 'contract layer', depth: 0.22 },
  { id: 'users', label: 'Users', meta: '9M+ users', depth: 0.08 },
] as const

/* ------------------------------------------------------------------ */
/* Case study                                                          */
/* ------------------------------------------------------------------ */

export const CASE_METRICS = [
  {
    value: 9,
    suffix: 'M+',
    label: 'users',
    meaning:
      'Users across the platforms we ship to, a number that makes bundle size, render cost and route weight product concerns, not cosmetic ones.',
  },
  {
    value: 12,
    suffix: '',
    label: 'insurance organizations',
    meaning:
      'Tenants with different branding, products, permissions and rules, all served by one codebase instead of twelve forks.',
  },
  {
    value: 300,
    suffix: '+',
    label: 'modules',
    meaning:
      'Feature units with defined entry points and dependencies, so a screen composes modules instead of owning them.',
  },
  {
    value: 500,
    suffix: '+',
    label: 'routes',
    meaning:
      'A route graph large enough that naive eager loading stops being viable, routing, splitting and loading strategy become architecture.',
  },
] as const

export const CASE_LAYERS = [
  {
    id: 'tenant',
    title: 'Tenant',
    meta: 'entry',
    detail:
      'The request arrives with a tenant identity. Everything downstream, theme, product catalogue, feature flags, navigation, resolves from it, so the shell never hard-codes which organization it is serving.',
  },
  {
    id: 'shell',
    title: 'Application Shell',
    meta: 'composition root',
    detail:
      'The persistent frame: routing, layout, navigation, tenant theme. It owns what is shared across every screen and stays deliberately thin so tenant-specific behaviour enters through configuration, not conditionals scattered through components.',
  },
  {
    id: 'permissions',
    title: 'Permission Engine',
    meta: 'backend-driven',
    detail:
      'Permissions are read from the backend rather than guessed in the client. The engine translates them into capabilities the UI can ask about "can this user see this block?", so access control has a single source of truth.',
  },
  {
    id: 'features',
    title: 'Feature Modules',
    meta: '300+ units',
    detail:
      'Business workflows live here: enrollment, claims, benefits, admin tooling. Each module exposes a narrow surface and declares its own dependencies, which is what keeps a 500+ route application navigable for the team building it.',
  },
  {
    id: 'shared',
    title: 'Shared Components',
    meta: 'design system',
    detail:
      'Forms, tables, filters, empty states, domain widgets. The reuse layer that stops twelve tenants and hundreds of modules from drifting into twelve different visual and interaction languages.',
  },
  {
    id: 'api',
    title: 'API Layer',
    meta: 'contracts',
    detail:
      'Typed requests, normalization, caching boundaries and error handling in one place. Business rules that change frequently stay on the server; the frontend consumes the resolved rule instead of reimplementing it.',
  },
] as const

export const CASE_CHALLENGES = [
  {
    title: 'Multi-tenant frontend architecture',
    body: 'One platform serving twelve organizations and 9M+ users: tenant identity resolved at the shell, expressed through configuration and theming rather than forked codebases.',
  },
  {
    title: 'Separating broker and insurer applications',
    body: 'Defining the architectural boundaries that let broker and insurer applications live in independent repositories, cleaner ownership, independent releases and a path to onboard new insurer partners.',
  },
  {
    title: 'Configuration-driven onboarding',
    body: 'New brokers and insurers onboard with minimal custom development: products, branding, permissions and rules are configuration the platform reads, not code each client forks.',
  },
  {
    title: 'Dynamic business rules',
    body: 'Insurance products change constantly. Rules are resolved by the backend and consumed as data, so a pricing or eligibility change ships without a client release.',
  },
  {
    title: 'Backend-driven permissions & conditional UI',
    body: 'The client renders from capabilities it is given, not roles it assumes. Blocks, actions and routes appear only where the permission engine allows them.',
  },
  {
    title: 'Large route structure',
    body: '500+ routes organized around feature ownership, with route-level code splitting, lazy loading and React Suspense keeping first paint small.',
  },
  {
    title: 'Reusable modules & design system',
    body: '300+ modules built from shared primitives so new workflows are assembled, not rebuilt, and visual consistency survives team growth.',
  },
  {
    title: 'Performance engineering',
    body: 'Code splitting, lazy loading, image optimization and render-cost review applied continuously, because a platform this size makes every kilobyte and re-render visible to users.',
  },
  {
    title: 'Framework modernization: React 16 → 18',
    body: 'Led a staged React 16 to React 18 migration with dependency upgrades and React Router modernization, modernizing a large surface without stalling delivery.',
  },
  {
    title: 'Build modernization: CRA → Vite',
    body: 'Migrated the application from Create React App to Vite, reworking configuration, environment handling and build scripts to cut developer feedback loops and modernize the toolchain.',
  },
  {
    title: 'Leading a frontend team of nine',
    body: 'Owning architecture, technical design, sprint planning, code quality, release management and engineering standards while mentoring a growing team of React engineers.',
  },
  {
    title: 'Testing & engineering practice',
    body: 'Automated testing introduced where it protects critical workflows, paired with code review discipline and CI checks so refactors on a large codebase stay safe.',
  },
] as const

/* ------------------------------------------------------------------ */
/* Journey                                                             */
/* ------------------------------------------------------------------ */

export const JOURNEY = [
  {
    year: '2020',
    title: 'Joined FynTune as a founding frontend engineer',
    note: 'One of three engineers building a digital insurance and employee benefits platform from the ground up.',
  },
  {
    year: '',
    title: 'Built the platform foundation',
    note: 'Delivered 80+ business modules, claims, policy administration, enrollment, wellness and hospital discovery.',
  },
  {
    year: '',
    title: 'Mentored to build Cyber Insurance and build Travel Insurance within three months',
    note: 'Led a team of three to launch a new insurance line end to end, alongside Cyber and Travel offerings.',
  },
  {
    year: '2021',
    title: 'First enterprise onboarding',
    note: 'Shipped the first client onto the platform and proved the multi-tenant model.',
  },
  {
    year: '',
    title: 'Configuration over customization',
    note: 'Designed the config-driven approach that let new clients onboard without forking the codebase.',
  },
  {
    year: '',
    title: 'Mobile launch',
    note: 'Led React Native employee apps to the Apple App Store and Google Play.',
  },
  {
    year: '2023',
    title: 'Promoted to Senior ReactJS Developer',
    note: 'Took ownership of frontend delivery, technical mentorship and product expansion for enterprise clients.',
  },
  {
    year: '',
    title: 'Scaled the team and the surface',
    note: 'Grew the team from 4 to 6; delivered 180+ modules across RFQ, plan management, E-Cashless claims, TPA and enrollment.',
  },
  {
    year: '2024',
    title: 'Modernized the stack',
    note: 'React 16 → React 18, dependency upgrades and React Router modernization.',
  },
  {
    year: '2025',
    title: 'Broker and insurer, separated',
    note: 'Split the two applications into independent repositories along clear architectural boundaries.',
  },
  {
    year: '2026',
    title: 'Promoted to Sr. Lead Engineer, Frontend',
    note: 'Leading 9 React engineers across architecture, engineering standards and delivery execution.',
  },
  {
    year: 'Now',
    title: 'Frontend architecture / system engineering',
    note: 'The direction the work keeps pulling toward, structure, boundaries and contracts at platform scale.',
  },
] as const

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const EXPERIENCE_POINTS = [
  'Lead frontend engineering for a multi-tenant InsurTech platform serving 9M+ users across brokers, insurers, employers and employees.',
  'Own frontend architecture, technical strategy, engineering standards and delivery for 300+ business modules and 500+ routes spanning 12 insurance organizations.',
  'Manage and mentor a team of 9 React engineers, sprint planning, technical design, code quality, release management and engineering practices.',
  'Spearheaded insurer onboarding by separating broker and insurer applications into independent repositories along defined architectural boundaries.',
  'Led modernization initiatives: CRA → Vite migration, bundle optimization with lazy loading and React Suspense, image optimization, and automated testing adoption.',
  'Evolved the configuration-driven multi-tenant architecture so new brokers and insurers onboard with minimal custom development.',
  'Drove a React 16 → React 18 migration, dependency upgrades and React Router modernization across a large surface.',
  'Delivered 180+ business modules across RFQ and plan management, E-Cashless claim journeys, TPA portals, aviation insurance and flexible enrollment.',
  'As a founding engineer, delivered the first 80+ modules that became the foundation of the platform, plus the first enterprise client onboarding.',
  'Launched employee-facing React Native apps on the App Store and Google Play, and led a team of three to ship the Travel Insurance platform in three months.',
  'Integrated third-party services, payment gateways, wellness platforms and TPAs, to extend platform capabilities.',
  'Partner closely with product leaders, business stakeholders and enterprise clients (CEOs, CTOs and department heads) to translate complex insurance workflows into configurable solutions.',
  'Own delivery and stakeholder management for enterprise accounts, requirement analysis, production support and incident resolution.',
  'Contribute to organizational growth through technical interviewing, hiring, mentoring and career development of frontend engineers.',
] as const

/* ------------------------------------------------------------------ */
/* Tech ecosystem                                                      */
/* ------------------------------------------------------------------ */

export type StackItem = { name: string; note?: string; state?: 'core' | 'learning' }

export const STACK: { group: string; caption: string; items: StackItem[] }[] = [
  {
    group: 'Core',
    caption: 'The daily instruments',
    items: [
      { name: 'React', note: 'Primary environment since 2020' },
      { name: 'React Native', note: 'Production mobile applications' },
      { name: 'JavaScript', note: 'Deep, everyday fluency' },
      { name: 'TypeScript', note: 'Actively strengthening, used in earnest, not claimed as mastery', state: 'learning' },
      { name: 'Vite', note: 'Adopted through the CRA → Vite migration' },
    ],
  },
  {
    group: 'Architecture',
    caption: 'Where most decisions are made',
    items: [
      { name: 'Frontend Architecture' },
      { name: 'Design Systems' },
      { name: 'Modular Architecture' },
      { name: 'Multi-Tenant Applications' },
      { name: 'State Management' },
      { name: 'Routing' },
      { name: 'Permissions' },
    ],
  },
  {
    group: 'Performance',
    caption: 'Measured, then optimized',
    items: [
      { name: 'Code Splitting' },
      { name: 'Lazy Loading' },
      { name: 'React Suspense' },
      { name: 'Bundle Optimization' },
      { name: 'Image Optimization' },
      { name: 'Rendering Performance' },
    ],
  },
  {
    group: 'UI',
    caption: 'What users actually touch',
    items: [
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'Tailwind' },
      { name: 'MUI' },
      { name: 'Bootstrap' },
      { name: 'Responsive Design' },
      { name: 'Accessibility' },
    ],
  },
  {
    group: 'Engineering',
    caption: 'How the work stays safe',
    items: [
      { name: 'Git' },
      { name: 'Testing' },
      { name: 'Code Review' },
      { name: 'CI/CD' },
      { name: 'API Integration' },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Selected work                                                       */
/* ------------------------------------------------------------------ */

export type Project = {
  id: string
  title: string
  subtitle?: string
  kind?: string
  aiAssisted?: boolean
  fromScratch?: boolean
  problem?: string
  solution?: string
  stack?: string[]
  challenge?: string
  outcome?: string
  repo?: string
  href?: string
  demo?: string
  doc?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'ebp',
    title: 'Employee Benefit Platform',
    subtitle: 'Large-scale InsurTech platform',
    kind: 'Product · Ongoing',
    fromScratch: true,
    problem:
      'Insurance organizations each need their own products, branding, permissions and rules, but maintaining separate frontends for every tenant does not scale in cost, quality or speed.',
    solution:
      'A multi-tenant React platform: tenant resolved at the shell, permissions read from the backend, business rules consumed as data, and 300+ feature modules composed into 500+ routes, with broker and insurer applications separated into independent repositories as it grew.',
    stack: ['React', 'JavaScript', 'Modular architecture', 'React Router', 'Vite', 'Testing'],
    challenge:
      'Keeping the system understandable as it grew, defining module boundaries, separating broker and insurer concerns, preventing tenant-specific conditionals from leaking everywhere, and holding performance steady across a route graph too large to load eagerly.',
    outcome:
      'Twelve organizations and 9M+ users served from one platform, now led by a team of nine engineers, with a structure that lets new products and workflows be assembled from existing modules instead of rebuilt.',
  },
  {
    id: 'rn',
    title: 'React Native Applications',
    subtitle: 'Production mobile applications',
    kind: 'Mobile · Production',
    fromScratch: true,
    problem:
      'Product workflows needed to reach mobile without splitting the team or duplicating business logic across platforms.',
    solution:
      'React Native applications sharing React conventions, component thinking and API contracts with the web platform, so the same engineering habits apply on both surfaces.',
    stack: ['React Native', 'React', 'JavaScript', 'API integration'],
    challenge:
      'Platform differences: navigation, performance characteristics, release cadence and device behaviour all diverge from the web, while the product language must stay consistent.',
    outcome:
      'Employee-facing apps shipped to production on the Apple App Store and Google Play, with a shared mental model across web and mobile that kept the team able to move between surfaces.',
  },
  {
    id: 'life-os',
    title: 'Life OS',
    subtitle: 'Personal operating system',
    kind: 'Personal · Shipped',
    aiAssisted: true,
    problem:
      'Tasks, events, goals, habits, notes and journaling each live in separate apps, so nothing connects, and the overhead of switching tools eats the time they were meant to save.',
    solution:
      'A Next.js application that brings tasks, events, goals, habits, notes and journal into a single flow, so the day can be planned, tracked and reflected on in one place.',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Prisma',
      'PostgreSQL',
      'NextAuth',
      'Radix UI',
      'React Hook Form',
      'Zod',
    ],
    challenge:
      'Designing one coherent model for very different content types, a habit is not a note is not a task, and keeping it fast and simple as the data grows.',
    outcome:
      'A live system for tracking and managing tasks, events, goals, habits, notes and journal, deployed on Vercel and in daily use.',
    repo: 'https://github.com/SalmanAhmd/life-os',
    href: 'https://life-os-salman.vercel.app/',
    demo: 'https://app.trupeer.ai/view/IwNd2CqUc/life-os-feature-tour',
  },
  {
    id: 'linkcraft',
    title: 'LinkCraft',
    subtitle: 'QR code generator and URL shortener',
    kind: 'Personal · Shipped',
    aiAssisted: true,
    problem:
      'Short links and QR codes are usually handled by separate tools, each with its own account, limits and tracking, so managing them becomes fragmented.',
    solution:
      'A full-stack monorepo: a React client for generating QR codes and shortening URLs, backed by an Express API with SQLite persistence, with shared tooling, tests and typechecking across both workspaces.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'SQLite', 'Vitest'],
    challenge:
      'Keeping the client and server in one workspace with shared tooling, tests, typechecking and database migrations, and deploying the result reliably.',
    outcome:
      'A shipped QR code generator and URL shortener, deployed on Render.',
    repo: 'https://github.com/SalmanAhmd/qr-code',
    href: 'https://qr-code-h7dg.onrender.com/',
  },

  {
    id: 'mac-clipboard',
    title: 'ClipVault',
    subtitle: 'Mac clipboard history manager',
    kind: 'Personal · Desktop application',
    aiAssisted: true,
    problem:
      'Copied text and other clipboard content is easy to lose when a new copy replaces it, making it difficult to retrieve something copied earlier.',
    solution:
      'A fast, local-only desktop application that keeps clipboard history available to browse and reuse.',
    stack: ['Tauri 2', 'React 19', 'TypeScript', 'Vite 8'],
    challenge:
      'Building a responsive desktop experience for clipboard history while keeping clipboard data local to the device.',
    outcome: 'A desktop clipboard history manager focused on fast access and local-only storage.',
    repo: 'https://github.com/SalmanAhmd/mac-clipboard',
  },


  {
    id: 'phunny-tools',
    title: 'Phunny Tools',
    subtitle: 'Playful web utilities',
    kind: 'Personal · Shipped',
    aiAssisted: true,
    problem:
      'Everyday utilities promise to make things easier, but often quietly make them worse, and nothing pokes fun at that.',
    solution:
      'A set of playful web tools, from PDF handling to zip files, that work hard at doing absolutely nothing, polished enough to be genuinely fun to share.',
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'React Router',
      'JSZip',
      'PDF.js',
    ],
    challenge:
      'Making the joke land on first use: it has to be fast, obvious and shareable, without becoming a chore to build or maintain.',
    outcome:
      'A shipped, shareable web tool that people open for a laugh, and that shows a small product built end to end.',
    repo: 'https://github.com/SalmanAhmd/phunny-tools',
    href: 'https://salmanahmd.github.io/phunny-tools/',
  },
  {
    id: 'salah',
    title: 'Salah Mumbai',
    subtitle: 'Personal Android application',
    kind: 'Personal · Shipped',
    aiAssisted: true,
    problem:
      'A personal need: reliable prayer times for Mumbai, with reminders, goal tracking and a history of one’s own observance, in a calm, focused interface.',
    solution:
      'An Android application covering prayer times, reminders, goals and prayer history, built and published as a personal product.',
    stack: ['Android', 'Mobile UI', 'Local data', 'Notifications'],
    challenge:
      'Designing for daily use: correct timing, dependable reminders and an interface that stays out of the way every single day.',
    outcome:
      'A shipped, usable personal application, live on the web.',
    href: 'https://salmanahmd.github.io/Salah-Mumbai/',
  },
  {
    id: 'locking-popping',
    title: 'Locking Popping',
    subtitle: 'Retro rhythm battle game',
    kind: 'Personal · Shipped',
    aiAssisted: true,
    problem:
      'A quick, playful idea: two dancers face off in a battle, decided in the moment rather than across a long session.',
    solution:
      'A retro underground locking vs popping rhythm battle game, players pick moves and the outcome is judged on the spot, light enough for a break and replayable enough to share.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Vitest'],
    challenge:
      'Keeping the battle readable and responsive in the browser: timing, animation and input feel matter far more than any feature list.',
    outcome:
      'A shipped, playable browser game with a clear battle loop that runs in any modern browser.',
    repo: 'https://github.com/SalmanAhmd/locking-popping',
    href: 'https://salmanahmd.github.io/locking-popping/',
  },
  {
    id: 'superbond',
    title: 'Superbond',
    subtitle: 'Decentralized bond market on Solana',
    kind: 'Freelance',
    fromScratch: true,
    problem: 'Bond markets are opaque and hard to access. Superbond set out to make it possible for consumers to buy, trade and store yield-generating bonds on the Solana network — a decentralized bonds exchange that gives customers access to DeFi marketplaces while ensuring their bonds or non-fungible tokens are properly valued.',
    solution: 'Designed and implemented the React API layer that connects the frontend to the Solana-based decentralized bond market, letting users interact with yield-generating bonds and NFTs through a web interface.',
    stack: ['React', 'Solana', 'Web3 API', 'DeFi'],
    challenge: 'Bridging a traditional React frontend with a decentralized Solana backend: handling wallet integration, on-chain data, and bond/NFT valuation flows in a seamless way.',
    outcome: 'A functional React interface for buying, trading and storing yield-generating bonds on the Solana network. Not currently live.',
  },
  {
    id: 'agricom',
    title: 'Agricom',
    subtitle: 'Agriculture marketplace connecting farmers, sellers and consumers',
    kind: 'Personal · Built from scratch',
    fromScratch: true,
    problem:
      'Farmers in India are not getting a fair price for their products because of contractors sitting between them and buyers. The aim was to bring the whole agriculture industry onto a single platform so farmers, sellers and consumers can trade directly.',
    solution:
      'A full-stack marketplace built with React and Redux on the frontend and Node.js with Express on the backend, with PostgreSQL and MongoDB as data stores. It removes the contractor middleman: farmers can buy farming needs from sellers and sell their produce directly to consumers, with chat, Google OAuth login, profiles, cart and checkout, billing, orders with email acknowledgement, and a blog page.',
    stack: ['React', 'Redux', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Heroku', 'Cloudinary'],
    challenge:
      'Designing role-based experiences for farmers, sellers and consumers, each with their own profiles, inventory and flows, while keeping the marketplace, chat, payments and order acknowledgement consistent across the platform.',
    outcome:
      'A working agriculture marketplace prototype connecting farmers, sellers and consumers, with roles, profiles, cart, checkout, orders, chat and a blog page.',
    repo: 'https://github.com/SalmanAhmd/Salman-Sitanshu-Kissan-Junction-au4',
    demo: 'https://drive.google.com/file/d/1SRzREnaXyMat04TImXR2F4BvqUiT-MBB/view?usp=sharing',
    doc: 'https://docs.google.com/document/d/1SH3liTO59viYvGi6V7J5R95MmqyycTOOl1jeo8YNKNY/edit?tab=t.0',
  },
]

/* ------------------------------------------------------------------ */
/* How I think                                                         */
/* ------------------------------------------------------------------ */

export const METHOD = [
  { step: 'Problem', body: 'Start from the actual constraint, not the requested feature.' },
  { step: 'Understand constraints', body: 'Data, team, time, existing system, what cannot move.' },
  { step: 'Model the system', body: 'Name the entities, boundaries and contracts before components.' },
  { step: 'Design architecture', body: 'Choose where complexity is allowed to live.' },
  { step: 'Build the smallest reliable solution', body: 'Enough to be real, simple enough to change.' },
  { step: 'Measure', body: 'Observe behaviour in production terms, not assumptions.' },
  { step: 'Optimize', body: 'Only where measurement says it matters.' },
  { step: 'Document', body: 'So the next person does not need me in the room.' },
] as const

/* ------------------------------------------------------------------ */
/* Focus / Notes                                                       */
/* ------------------------------------------------------------------ */

export const HORIZONS = [
  {
    horizon: 'Deepen',
    caption: 'Real depth in the tools I already rely on',
    items: [
      { area: 'TypeScript', note: 'From capable use to genuine depth across large codebases.' },
      { area: 'Testing', note: 'Coverage that protects workflows, not numbers that impress dashboards.' },
      { area: 'Accessibility', note: 'Built in as the interface is made, not audited for later.' },
      { area: 'Performance engineering', note: 'Treating Core Web Vitals as product requirements.' },
    ],
  },
  {
    horizon: 'Widen',
    caption: 'A wider frame around the component code',
    items: [
      { area: 'Next.js', note: 'Rendering strategies and the server/client boundary chosen deliberately.' },
      { area: 'Advanced frontend architecture', note: 'Boundaries, contracts and modularity at team scale.' },
      { area: 'Design systems', note: 'Systems that survive contact with multiple teams.' },
      { area: 'System design', note: 'Widening past the frontend when the problem asks for it.' },
    ],
  },
  {
    horizon: 'Amplify',
    caption: 'Levers that multiply the whole team',
    items: [
      { area: 'AI-assisted development', note: 'Using it seriously as an engineering multiplier, with judgement.' },
      { area: 'Developer tooling', note: 'Shortening feedback loops for everyone in the repo.' },
    ],
  },
] as const

export const NOTE_TOPICS = [
  'Frontend architecture',
  'React',
  'Performance',
  'JavaScript',
  'Engineering leadership',
  'AI-assisted development',
  'Lessons from large frontend systems',
] as const

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

export type BlogPost = {
  slug: string
  title: string
  summary: string
  date: string
  readingTime: string
  tags: string[]
  body: string[]
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const POSTS: BlogPost[] = [
  {
    slug: 'leading-a-team-of-nine',
    title: 'What leading a frontend team actually changes',
    summary:
      'Moving from individual contribution to technical leadership means making decisions explicit, reducing ambiguity, and helping engineers deliver independently without becoming a bottleneck.',
    date: '2026-10-01',
    readingTime: '5 min read',
    tags: ['Engineering Leadership', 'Architecture', 'Team Development'],
    body: [
      'Early in my career, being a strong engineer meant being able to solve difficult problems myself. As my responsibilities grew, I realized that individual problem-solving was only one part of the job. The bigger challenge was helping multiple engineers solve problems consistently across a shared codebase.',
      'In a frontend application with hundreds of routes and feature modules, small inconsistencies compound quickly. Different developers can solve the same problem in different ways, creating duplicated logic, inconsistent patterns, and unnecessary maintenance costs.',
      'This is where architecture and communication intersect. Clear module boundaries, shared conventions, meaningful code reviews, and documented technical decisions give engineers a common understanding of how the system should evolve.',
      'Code reviews become more valuable when they examine design decisions, maintainability, and edge cases rather than formatting alone. Discussing the design before implementation can also prevent expensive changes later.',
      'Technical leadership does not mean making every decision yourself. It means creating an environment where engineers understand the constraints, can make informed decisions, and know when a decision needs broader discussion.',
      'I still believe hands-on engineering matters for technical leads. Staying close to the code helps identify architectural problems early and keeps technical decisions grounded in implementation reality.',
      'My biggest takeaway is that a team becomes more effective when knowledge is shared through systems, conventions, and communication instead of remaining concentrated in a few individuals.',
    ],
  },
  {
    slug: 'where-complexity-lives',
    title: 'Frontend architecture is a decision about where complexity lives',
    summary:
      'You cannot eliminate complexity from a growing application. You can decide whether it spreads across components or stays contained behind explicit boundaries.',
    date: '2026-08-14',
    readingTime: '5 min read',
    tags: ['Frontend Architecture', 'React', 'Maintainability'],
    body: [
      'Every frontend application starts with a relatively simple structure. As features, business rules, user roles, and client requirements accumulate, that simplicity disappears. The important architectural decision is where the resulting complexity should live.',
      'Consider a business rule that affects multiple screens. If every component implements its own interpretation, changing the rule requires finding and updating multiple locations. Over time, those implementations drift apart and become difficult to reason about.',
      'A better approach is to identify the responsibility that owns the rule and establish a clear contract around it. Components should consume the resulting behavior rather than repeatedly reconstructing the same business logic.',
      'This principle becomes particularly important in enterprise applications with hundreds of routes and feature modules. A small amount of duplicated logic can turn into a maintenance problem when repeated across the application.',
      'I evaluate architecture by asking how far a change has to travel. Can a new requirement be implemented within one module? Does a shared change affect unrelated workflows? Are dependencies explicit, or does every feature know too much about the others?',
      'Good abstractions are not necessarily complicated. Often, the most valuable improvement is a clear boundary, a consistent interface, or a decision that prevents business rules from leaking into unrelated components.',
      'The goal is not to create the most sophisticated architecture. It is to make the next change easier to understand, implement, review, and maintain.',
    ],
  },
  {
    slug: 'separating-broker-and-insurer-surfaces',
    title: 'When one application becomes two: separating broker and insurer experiences',
    summary:
      'Supporting different user groups in one frontend raises an important architectural question: which capabilities should be shared, and which deserve independent ownership?',
    date: '2026-07-10',
    readingTime: '5 min read',
    tags: ['Architecture', 'Multi-Tenant', 'Application Design'],
    body: [
      'Enterprise applications often begin with a shared interface for multiple user groups. As the product evolves, those groups develop different workflows, permissions, responsibilities, and release requirements.',
      'The challenge is that the application can remain technically unified while becoming increasingly difficult to maintain. A change for one user group may introduce complexity into another part of the product, even when the two workflows have little in common.',
      'The first step is understanding the domain boundary. Which components represent genuinely shared capabilities? Which workflows belong exclusively to one user group? Which dependencies are shared only because the code happens to live in the same repository?',
      'Separating application surfaces can improve ownership and make independent development easier, but a repository split is not a substitute for architectural design. Moving tightly coupled code into two repositories simply creates two places where the same coupling must be managed.',
      'Shared capabilities need explicit contracts. If multiple applications depend on the same components or utilities, those dependencies should have clear ownership, compatibility expectations, and a sustainable way to evolve.',
      'There are trade-offs, too. Independent applications introduce additional build and release workflows, dependency management, and coordination around shared changes.',
      'The lesson is to establish the boundary before choosing the tooling. Repository structure should reflect the product architecture rather than dictate it.',
    ],
  },
  {
    slug: 'splitting-hundreds-of-routes',
    title: 'Splitting hundreds of React routes without breaking navigation',
    summary:
      'Route-level code splitting is more than a build optimization. It requires understanding feature boundaries, loading behavior, and how users move through the application.',
    date: '2026-06-02',
    readingTime: '5 min read',
    tags: ['React', 'Performance', 'Routing'],
    body: [
      'As a React application grows to hundreds of routes, loading every feature eagerly becomes increasingly difficult to justify. Most users do not need every part of the application during their initial visit.',
      'The obvious solution is lazy loading, but applying it indiscriminately can create a different set of problems. Poorly chosen boundaries can introduce loading waterfalls, duplicate dependencies, and inconsistent navigation experiences.',
      'I prefer thinking about route splitting in terms of feature ownership. Related screens should be organized around meaningful product capabilities, with their routes and feature-specific dependencies loaded when required.',
      'The application shell, essential shared components, and common infrastructure deserve different treatment because many screens depend on them. Loading these dependencies inefficiently can affect the entire application.',
      'Loading states are part of the design. A user navigating between related screens should not encounter unnecessary delays or disruptive flashes simply because code has been split into separate chunks.',
      'React lazy loading and Suspense can help structure these boundaries, but they do not replace thoughtful decisions about where the boundaries belong.',
      'The right objective is not the smallest possible initial bundle at any cost. It is a balance between initial loading, navigation responsiveness, shared dependencies, and maintainability.',
      'Measure the application before and after changes. Without real measurements, a code-splitting strategy is an architectural hypothesis rather than demonstrated performance improvement.',
    ],
  },
  {
    slug: 'react-16-to-18-migration',
    title: 'Modernizing React in a production application that cannot stop shipping',
    summary:
      'Framework modernization is a sequencing problem as much as a technical one. The challenge is improving the foundation without unnecessarily disrupting ongoing product development.',
    date: '2026-05-12',
    readingTime: '5 min read',
    tags: ['React', 'Migration', 'Engineering Practices'],
    body: [
      'Upgrading a production application is different from starting a new project with the latest framework. Existing dependencies, application behavior, and business workflows all create constraints that must be understood before changes begin.',
      'A migration plan should start with an assessment of the current application. Which dependencies constrain the upgrade? Which APIs or patterns require attention? Which parts of the product are most sensitive to behavioral changes?',
      'Breaking the work into manageable stages makes it easier to identify the source of problems and validate progress. Dependency compatibility, framework changes, routing updates, and cleanup should not become one enormous change that is difficult to review.',
      'The most challenging problems are not always in frequently used components. Legacy dependencies and less frequently visited workflows can hide assumptions that become visible only after an upgrade.',
      'Testing matters because a successful build does not prove that an application behaves correctly. Critical workflows, navigation, forms, permissions, and integrations need appropriate validation.',
      'Migration work also competes with feature development. A practical plan should make progress without unnecessarily freezing the product roadmap.',
      'The goal is not merely to install a newer version. It is to leave the application in a state that is easier to maintain and better positioned for future improvements.',
    ],
  },
  {
    slug: 'configuration-over-customization',
    title: 'Configuration over customization: scaling enterprise features without forking',
    summary:
      'When a client requests a variation, the important question is whether the product needs a new capability or simply another configuration of an existing one.',
    date: '2026-05-01',
    readingTime: '5 min read',
    tags: ['Multi-Tenant', 'Architecture', 'Scalability'],
    body: [
      'Enterprise products rarely serve customers with identical requirements. Different organizations may need different workflows, products, permissions, or combinations of available features.',
      'The quickest response is often a client-specific conditional. One conditional becomes several, and eventually the same business decision appears in multiple components and modules.',
      'This creates hidden coupling. A change intended for one organization may affect another, and developers must understand an increasing number of exceptions before making even a small modification.',
      'Configuration offers a different approach. Instead of implementing a separate version of an existing capability for every client, identify the dimensions that legitimately vary and model them explicitly.',
      'For example, if two organizations use the same workflow but have different feature availability, configuration can determine which capabilities are enabled without duplicating the workflow itself.',
      'This approach requires discipline. Configuration should have a clear schema, defined defaults, predictable behavior, and validation. An unrestricted configuration system can become just as difficult to maintain as scattered conditionals.',
      'Not every requirement belongs in configuration. A genuinely different business capability may require a new implementation or a more substantial architectural decision.',
      'The question I find useful is simple: is this a new capability, or another supported variation of an existing capability? Answering that question early can prevent unnecessary complexity as the product grows.',
    ],
  },
  {
    slug: 'one-frontend-twelve-tenants',
    title: 'One frontend, twelve tenants: what multi-tenancy actually costs',
    summary:
      'A shared frontend reduces duplication, but supporting multiple organizations introduces constraints that must be managed deliberately throughout the application.',
    date: '2026-04-19',
    readingTime: '5 min read',
    tags: ['Multi-Tenant', 'Frontend Architecture', 'Enterprise'],
    body: [
      'Multi-tenancy offers an attractive proposition: one product, one shared codebase, and the ability to serve multiple organizations without maintaining a separate application for each.',
      'The difficulty begins when organizations need different products, permissions, branding, workflows, or feature combinations. Each requirement creates a decision about what should be shared and what should vary.',
      'Without clear boundaries, tenant-specific behavior spreads throughout the component tree. Components begin checking organization identifiers, navigation implements its own exceptions, and business rules become difficult to change safely.',
      'A more structured approach resolves tenant context at an appropriate application boundary. Downstream modules then consume well-defined configuration and permission information rather than independently reconstructing tenant identity.',
      'This does not eliminate complexity. It makes the dimensions of variation explicit and creates a more predictable way to manage them.',
      'Testing also becomes more important. A change that works for one tenant does not automatically work for all others. Validation should account for meaningful combinations of configuration, permissions, and workflows.',
      'The real cost of multi-tenancy is ongoing architectural discipline. Every new requirement is an opportunity either to strengthen the shared model or to introduce another exception.',
      'A shared codebase is valuable when it makes the product easier to evolve. The objective is not simply to keep everything together, but to keep the relationships understandable.',
    ],
  },
  {
    slug: 'shipping-react-native-applications',
    title: 'Shipping React Native applications with a frontend engineering mindset',
    summary:
      'React Native allows web engineers to apply familiar component-based concepts to mobile development, but successful delivery still requires understanding platform-specific constraints.',
    date: '2026-03-08',
    readingTime: '5 min read',
    tags: ['React Native', 'Mobile', 'Cross-Platform'],
    body: [
      'React Native provides a familiar starting point for engineers who already work with React. Components, state management, API integration, and reusable UI concepts can carry over from web development.',
      'That familiarity is useful, but mobile development is not simply web development with a different rendering target. Navigation, application lifecycle, device behavior, permissions, and release processes introduce their own constraints.',
      'The first challenge is recognizing which parts of the product can share concepts and which require platform-specific implementation. A shared mental model is valuable; assuming identical behavior is not.',
      'Performance also needs to be considered in the context of the device. Interactions, rendering, lists, navigation, and network conditions can produce different experiences from those seen in a desktop browser.',
      'Mobile releases require deliberate preparation. Testing across relevant devices, validating application configuration, and understanding the distribution process are important parts of delivering a reliable product.',
      'React Native can help teams extend their capabilities across web and mobile without abandoning their existing engineering knowledge. That benefit is strongest when teams respect the differences between the platforms.',
      'The broader lesson is that reusable engineering principles travel well, but production quality still depends on understanding the environment in which the software runs.',
    ],
  },
  {
    slug: 'cra-to-vite-migration',
    title: 'Moving from Create React App to Vite: modernization beyond tooling',
    summary:
      'Changing build tools affects the development workflow, dependency compatibility, and production delivery. A migration should improve the engineering foundation without creating unnecessary risk.',
    date: '2026-02-16',
    readingTime: '5 min read',
    tags: ['Vite', 'React', 'Build Tooling'],
    body: [
      'Build tooling becomes part of the daily experience of every frontend engineer. It affects how quickly developers receive feedback, how dependencies are processed, and how the application is prepared for production.',
      'Migrating an established React application from Create React App to Vite is not simply a matter of replacing one package with another. Existing scripts, environment variables, asset handling, dependencies, and assumptions about the build process all need attention.',
      'The first step is understanding how the current application actually works. A migration plan based only on a fresh-project configuration can overlook behavior that has accumulated over years of development.',
      'Dependency compatibility is an important part of the process. Packages that work under one build setup may require configuration changes or replacement under another.',
      'The migration should also preserve the workflows developers rely on. Development commands, environment-specific configuration, asset paths, and production output need to be validated rather than assumed to work identically.',
      'For a large application, the most useful validation focuses on critical user journeys as well as whether the application compiles successfully.',
      'Modernization is valuable when it improves the foundation without transferring hidden complexity into the next tool. Measure development and build performance before claiming a measurable improvement.',
    ],
  },
  {
    slug: 'permission-driven-interfaces',
    title: 'Designing permission-driven interfaces in enterprise React applications',
    summary:
      'Role-dependent interfaces become difficult to maintain when access rules are scattered across routes, navigation, and individual components.',
    date: '2026-01-20',
    readingTime: '5 min read',
    tags: ['React', 'Authorization', 'Enterprise Architecture'],
    body: [
      'Enterprise applications often serve users with different responsibilities. Brokers, administrators, employees, and other roles may have access to different workflows and capabilities.',
      'The challenge is not only deciding which screens a user can see. The application must present consistent navigation, controls, and feature availability without duplicating access decisions across unrelated components.',
      'When every component implements its own interpretation of permissions, inconsistencies become difficult to avoid. A permission change may require edits in multiple places, and one forgotten condition can expose an inappropriate interface.',
      'A more maintainable approach establishes clear contracts for permission data and uses shared application patterns to determine which navigation items and capabilities are presented.',
      'Route access, feature visibility, and action availability should be considered together, while still reflecting their distinct responsibilities.',
      'It is also important to distinguish user-interface behavior from actual authorization. Hiding a button or restricting a route in the browser does not protect the underlying operation. The backend must enforce access to protected data and actions.',
      'Testing should cover representative roles and permission combinations, including cases where a user lacks access to a feature or action.',
      'The objective is predictable behavior: developers should know where access decisions come from, and users should encounter a consistent interface that reflects their actual permissions.',
    ],
  },
  {
    slug: 'building-reusable-feature-modules',
    title: 'Building reusable feature modules in a growing React application',
    summary:
      'Reusable architecture is not about extracting every component. It is about identifying stable responsibilities and defining boundaries that make features easier to evolve.',
    date: '2025-12-12',
    readingTime: '5 min read',
    tags: ['React', 'Modular Architecture', 'Maintainability'],
    body: [
      'As a frontend application grows, the number of components and modules increases. The temptation is to extract every repeated pattern into a shared abstraction, but reuse by itself is not a sufficient architectural goal.',
      'Two screens can look similar while representing different business responsibilities. Forcing them into a single abstraction can introduce configuration options and conditional behavior that make the shared component harder to understand than the original implementations.',
      'A useful module has a clear purpose, an understandable interface, and dependencies that reflect its responsibility. Its consumers should not need to understand every internal implementation detail.',
      'Shared components are most valuable when their behavior is stable and their responsibilities are genuinely common. Feature-specific behavior should remain within the feature unless there is a strong reason to generalize it.',
      'Ownership matters as much as folder structure. Developers need to know where a behavior belongs, which module should change, and which other areas may be affected.',
      'In a large React application, these boundaries also influence routing, lazy loading, testing, and code review. A well-defined feature boundary can support several engineering practices at once.',
      'The best abstraction is not the one that eliminates the most lines of code. It is the one that makes future changes easier without introducing unnecessary coupling.',
    ],
  },
  {
    slug: 'frontend-engineering-beyond-components',
    title: 'Frontend engineering is more than building components',
    summary:
      'The difficult part of enterprise frontend development is often not rendering a screen, but coordinating business rules, data, permissions, architecture, and change.',
    date: '2025-11-05',
    readingTime: '4 min read',
    tags: ['Frontend Engineering', 'React', 'Career Growth'],
    body: [
      'When people think about frontend development, they often picture components, styling, and interactions. Those are essential, but they represent only one part of building a production application.',
      'Enterprise products introduce additional responsibilities: business workflows, permissions, API contracts, tenant-specific configuration, routing, error handling, and the need to preserve existing behavior while new features are introduced.',
      'A component can be perfectly implemented in isolation and still create problems if it duplicates business logic, depends on the wrong module, or introduces unnecessary work into the initial application load.',
      'This is why understanding the system around a component matters. Where does its data come from? Which layer owns the business rule? What happens when the user lacks permission? Which other features depend on the same behavior?',
      'As applications grow, maintainability becomes a product concern. Engineers need to consider not only how quickly a feature can be built today, but how safely it can be modified months later by someone else.',
      'This perspective changes how I approach frontend work. Implementation is important, but so are architecture, clear contracts, performance, testing, and the experience of the developers who will maintain the result.',
      'The strongest frontend engineering combines detailed implementation skills with an understanding of the larger system those implementations become part of.',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* GitHub activity                                                     */
/* ------------------------------------------------------------------ */

export const GITHUB_SECTION = {
  index: '06',
  label: 'Open source activity',
  title: 'The work shows up daily.',
  intro:
    'A live look at public GitHub activity since 2019: the side projects, experiments and small fixes that keep the tools sharp.',
} as const

export const GITHUB_ACTIVITY = {
  username: 'SalmanAhmd',
  profileUrl: 'https://github.com/SalmanAhmd',
  apiUrl: 'https://github-contributions-api.jogruber.de/v4/SalmanAhmd?y=all',
  fallbackImage: 'contributions.png',
  cacheKey: 'github-activity:SalmanAhmd:v1',
  cacheTtlMs: 12 * 60 * 60 * 1000,
  requestTimeoutMs: 8000,
  readoutDefault: 'Hover or tap a square to see the day.',
  fallbackNote: 'Live feed unavailable, showing the static snapshot.',
  fallbackTotals: {
    2019: 274,
    2020: 2970,
    2021: 5937,
    2022: 6394,
    2023: 5032,
    2024: 4558,
    2025: 9211,
    2026: 2917,
  } as Record<string, number>,
} as const
