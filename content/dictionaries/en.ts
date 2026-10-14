/**
 * English dictionary.
 * Same key structure as ko.ts. Missing keys fall back to Korean.
 * Placeholders in [brackets] must be replaced with real data before launch.
 */
import type { Dictionary } from './ko';

const en: Dictionary = {
  meta: {
    siteName: 'IUYU',
    defaultTitle: 'Silicone Case OEM/ODM Manufacturer',
    defaultDescription:
      'IUYU is an OEM/ODM manufacturer specialising in silicone protective cases and pouches for vape devices. Structural design, mold making, LSR injection molding and brand packaging are all handled on our own lines.',
    keywords: [
      'silicone case manufacturer',
      'protective case OEM',
      'case ODM',
      'silicone injection molding',
      'LSR molding',
      'mold design',
      'vape accessory manufacturer',
      'pouch manufacturer',
      'silicone case factory',
      'IUYU',
    ],
  },

  nav: [
    { href: '/', label: 'Home' },
    { href: '/capabilities/', label: 'Capabilities' },
    { href: '/products/', label: 'Products' },
    { href: '/oem/', label: 'Process' },
    { href: '/about/', label: 'About' },
    { href: '/contact/', label: 'Contact' },
  ],

  brand: {
    role: 'OEM/ODM Manufacturer of Vape Accessories',
    description:
      'IUYU is an OEM/ODM manufacturer specialising in silicone protective cases and pouches for vape devices. Structural design, mold making, in-house injection molding and own-brand product development are handled under one roof.',
    tagline: 'From design to mass production, in silicone.',
    subline: 'SILICONE CASE MFG.',
    hours: 'Mon–Fri 09:00 – 18:00 (KST)',
    since: '2016',
  },

  gate: {
    eyebrow: 'BUSINESS SCOPE',
    titleLine1: 'IUYU is a',
    titleAccent: 'silicone accessory manufacturer',
    titleLine2: '.',
    scopeTitle: 'What we make',
    scopeItems: ['Silicone protective cases', 'Pouches / grips', 'Device protection accessories'],
    outOfScopeTitle: 'What we do not make',
    outOfScopeItems: ['Nicotine liquid / pods / refills', 'Finished device units', 'Consumer online sales'],
    body:
      'This site is a B2B manufacturing enquiry channel. We do not sell to consumers. Information here is intended for business partners aged 19 and over.',
    accept: 'I understand',
    privacyNote: 'This acknowledgement is stored only in your browser and is never sent to a server.',
  },

  hero: {
    chips: ['OEM / ODM', 'In-house mold & injection'],
    h1Line1: 'From design',
    h1Accent: 'to mass production,',
    h1Line2: 'in silicone.',
    lede:
      'We specialise in silicone protective cases and pouches for vape devices. Structural design, mold making, injection molding and brand packaging are all handled in-house. No drawings needed — a physical sample is enough to start.',
    ctaPrimary: 'Request a quote',
    ctaSecondary: 'See our capabilities',
    facts: [
      { k: 'Body size', v: '96 × 53.5 × 29 mm', d: '111 mm including mouthpiece' },
      { k: 'Structure', v: 'Silicone case + lanyard', d: '44 cm lanyard · detachable' },
      { k: 'Processes', v: 'Design → mold → molding', d: 'All in-house' },
    ],
    productAlt: 'Silicone protective case and lanyard product photo — manufactured by IUYU',
    dimW: '53.5',
    dimH: '96',
    dimTotal: '111',
  },

  summaryBand: [
    { k: 'Production mode', v: 'OEM · ODM', d: 'Customer design / our design' },
    { k: 'In-house steps', v: 'Design → mold → molding', d: 'No outsourcing' },
    { k: 'Materials', v: 'LSR · HCR silicone', d: 'PC/TPU two-shot molding' },
    { k: 'Coverage', v: 'Pilot run → mass production', d: 'Export packaging supported' },
  ],

  capabilities: {
    eyebrow: 'CAPABILITIES',
    h2Line1: 'We do not just list what we make.',
    h2Line2: 'We tell you how far we do it ourselves.',
    lede:
      'We do not outsource design, mold making or injection molding. Splitting those steps across vendors is what makes schedules and quality slip.',
    items: [
      {
        id: 'oem',
        no: '01',
        title: 'OEM / ODM Manufacturing',
        titleEn: 'OEM / ODM Manufacturing',
        lead: 'We build to your design, or to ours.',
        body:
          'We run both OEM — production to your drawings or samples — and ODM, where our own verified design assets are supplied under your brand. Pre-validated molds for many device models shorten the initial development cycle.',
        points: [
          'OEM production from customer drawings / samples',
          'ODM supply based on IUYU design assets',
          'Pilot run before committing to mass production',
          'Customer brand packaging and labelling',
        ],
      },
      {
        id: 'design',
        no: '02',
        title: 'Structural & Mold Design',
        titleEn: 'Structural & Mold Design',
        lead: 'From 3D modelling to mold design, all in-house.',
        body:
          'The sequence runs device measurement → 3D scan → structural design → flow analysis → mold design. Case-specific issues such as magnetic closure, opening mechanisms and slide cores are reviewed directly by our in-house design team.',
        points: [
          'Device measurement and 3D scanning',
          '3D modelling (SolidWorks / NX)',
          'Injection flow analysis (Moldflow)',
          'Mold structure design and revision support',
        ],
      },
      {
        id: 'mold',
        no: '03',
        title: 'In-house Mold & Injection',
        titleEn: 'In-house Mold & Injection',
        lead: 'Mold machining and molding never leave the building.',
        body:
          'We own both mold machining equipment and injection molding machines, so mold revisions and mass production are managed on the same line. Trial-shot results feed straight back into the mold, which keeps the development cycle short.',
        points: [
          'In-house mold machining equipment',
          'In-house injection machines (including LSR)',
          'Trial shot → dimensional check → mold revision loop',
          'Flexible response to volume changes',
        ],
      },
      {
        id: 'brand',
        no: '04',
        title: 'Own-brand Product Development',
        titleEn: 'Own-brand Product Development',
        lead: 'Verified design assets, supplied under your brand.',
        body:
          'IUYU maintains its own developed and validated case line-up. When launching a new brand, applying your branding to already-verified products removes the design and mold development steps entirely and cuts lead time significantly.',
        points: [
          'Validated case design assets',
          'Brand labelling and package customisation',
          'Device-by-device fit verification data',
          'Colour and texture customisation',
        ],
      },
    ],
  },

  materials: {
    eyebrow: 'MATERIAL',
    h2: 'In silicone, 0.2 mm decides everything.',
    lede:
      'A protective case is about feel, recovery and the precision not to squeeze the device. IUYU selects different silicone grades by application.',
    grades: [
      {
        k: 'LSR',
        v: 'Liquid silicone rubber',
        d: 'Used for thin-wall cases that need precise dimensions and clarity. We handle this molding on our own line.',
        temp: 'Heat resistance −50 to 200 °C',
      },
      {
        k: 'HCR',
        v: 'High-consistency rubber',
        d: 'Used for thicker pouches and grips that need recovery and tear strength.',
        temp: 'Tear strength [value] N/mm',
      },
      {
        k: 'PC / TPU',
        v: 'Rigid + soft composite',
        d: 'Two-shot molding bonds silicone with rigid resin, combining shape retention and grip.',
        temp: 'Two-shot molding available',
      },
    ],
    finishesLabel: 'FINISH OPTIONS',
    finishes: [
      { k: 'Matte', v: '무광', d: 'The default finish — no fingerprints. Silicone oil coating applied.' },
      { k: 'Soft-touch', v: '소프트터치', d: 'Higher slip resistance. Applied where grip matters.' },
      { k: 'Glossy', v: '글로시', d: 'High gloss. Vivid colour reproduction for brand colours.' },
      { k: 'Embossed', v: '엠보', d: 'Pattern embossing. Works for brand motifs and logo marking.' },
    ],
    note: 'Note: surface texture is determined by the mold EDM pattern and coating method. Texture swatches are shipped with samples on request.',
  },

  process: {
    eyebrow: 'PROCESS',
    h2: 'From enquiry to mass production, in this order.',
    steps: [
      { no: '01', t: 'Enquiry & consultation', d: 'Tell us the device model, desired form and expected volume. We reply with feasibility and an estimated schedule.', dur: '1–2 days' },
      { no: '02', t: 'Design & 3D modelling', d: 'We measure the device or work from your drawings to build a 3D model, and share the structural review with it.', dur: '[duration]' },
      { no: '03', t: 'Mold making', d: 'Produced on our in-house mold line. Mold structure and gate position are fixed before machining starts.', dur: '[duration]' },
      { no: '04', t: 'Trial shot & verification', d: 'Trial samples are checked for dimensions and closure feel. The mold is revised and re-verified if needed.', dur: '[duration]' },
      { no: '05', t: 'Mass production & shipping', d: 'Produced to the approved sample, inspected, packed and shipped. Brand packaging is supported.', dur: '[duration]' },
    ],
  },

  equipment: {
    eyebrow: 'EQUIPMENT',
    h2: 'Equipment',
    lede: 'Mold machining and injection molding run on our own line. Replace the figures below with your actual machine counts.',
    items: [
      { k: 'Injection machines', v: '[count]', d: '[tonnage range]' },
      { k: 'Mold machining', v: '[count]', d: 'CNC · wire cut · EDM' },
      { k: 'Metrology', v: '[count]', d: 'CMM · calipers · durometer' },
      { k: 'Trial molding', v: '[count]', d: 'Dedicated to mold validation' },
    ],
    note: 'Note: the figures above are placeholders. Replace them with your actual machine counts and tonnages.',
  },

  qa: {
    eyebrow: 'QUALITY',
    h2: 'Pre-shipment inspection',
    lede: 'To hold the same standard from approved sample through mass production, the following are checked lot by lot.',
    checks: [
      { k: 'Dimensions', d: 'CMM measurement of key dimensions, gate and parting line check' },
      { k: 'Closure', d: 'Magnet pull force, repeated open/close durability' },
      { k: 'Appearance', d: 'Visual check for flow marks, burrs, foreign matter, colour deviation' },
      { k: 'Material', d: 'Hardness (Shore A), tensile strength' },
      { k: 'Assembly', d: 'Interference and play checked with the actual device fitted' },
      { k: 'Packaging', d: 'Label, quantity and packing condition' },
    ],
    certsTitle: 'Certifications',
    certsNote: 'Replace these with scans of certificates you actually hold. It is safer to delete any line you cannot evidence.',
    certs: [
      { k: 'ISO 9001', v: 'Status to be confirmed' },
      { k: 'ISO 14001', v: 'Status to be confirmed' },
      { k: 'RoHS / REACH', v: 'Material test reports available on request' },
      { k: 'FDA / LFGB', v: 'Available where food-contact grade is required' },
      { k: 'BSCI / Sedex', v: 'Status to be confirmed' },
    ],
  },

  lines: {
    eyebrow: 'PRODUCT LINES',
    h2: 'Forms we can produce',
    lede: 'These four lines cover most requests. If the form is not decided yet, a reference image is enough to start a conversation.',
    items: [
      { id: 'shell', name: 'Shell Series', nameKo: 'Silicone Case', desc: 'Slim silicone case wrapping the device body. The screen area is open, and side buttons and the charging port remain fully usable.', specs: ['Based on 96 × 53.5 × 29 mm body', '111 mm including mouthpiece', 'Matte silicone · anti-fingerprint', 'Colour customisation'] },
      { id: 'lanyard', name: 'Lanyard Series', nameKo: 'Neck Lanyard', desc: 'Detachable neck lanyard so the device can be carried around the neck. Attaches to the loops on the case.', specs: ['44 cm total length', 'Detachable attachment loops', 'Silicone grip stopper', 'Metal hardware option'] },
      { id: 'mouthpiece', name: 'Mouthpiece Cover', nameKo: 'Mouthpiece Cover', desc: 'Small cap covering the mouthpiece. Handles hygiene and protection together.', specs: ['Based on 15 × 25 × 14 mm', 'Hygiene cover', 'Detachable structure', 'Colour matched'] },
      { id: 'custom', name: 'Custom Development', nameKo: 'Custom Development', desc: 'New development from your drawings or a physical sample. Measured, tooled and produced end to end.', specs: ['3D scan / measurement', 'New mold fabrication', 'Trial shot verification', 'Transition to mass production'] },
    ],
  },

  factory: {
    eyebrow: 'FACILITY',
    h2: 'Our lines and equipment, shown directly.',
    lede: 'All photos were taken in our own production facility. Clean-room inspection, assembly and weighing, automated equipment, outbound staging and the sample showroom.',
    note: 'Note: employee faces have been obscured for privacy.',
    items: [
      { src: '/assets/factory-cleanroom-inspection.jpg', cap: 'Clean-room inspection', d: 'Appearance and dimensional checks in the clean room.', ratio: 1.33 },
      { src: '/assets/factory-assembly-station.jpg', cap: 'Assembly & weighing', d: 'Weighing and assembly handled at the same station.', ratio: 1.33 },
      { src: '/assets/factory-equipment-detail.jpg', cap: 'Automated equipment', d: 'Automated line including the IPQC inspection area.', ratio: 1.33 },
      { src: '/assets/factory-warehouse.jpg', cap: 'Outbound staging', d: 'Inspected goods waiting for dispatch.', ratio: 1.33 },
      { src: '/assets/factory-showroom.jpg', cap: 'Sample showroom', d: 'Mold assets and finish samples on permanent display.', ratio: 1.33 },
      { src: '/assets/factory-showroom-side.jpg', cap: 'Sample showroom, side view', d: 'Validated samples archived by customer.', ratio: 1.33 },
    ],
    cta: 'Ask about our equipment',
    stat: [
      { k: 'Facility', v: 'Company-owned' },
      { k: 'Clean room', v: 'Inspection & assembly' },
      { k: 'Automation', v: 'IPQC included' },
    ],
  },

  stats: {
    eyebrow: 'AT A GLANCE',
    items: [
      { k: 'Experience', v: '[years]', d: 'In silicone molding' },
      { k: 'Device models', v: '[count]', d: 'Validated molds held' },
      { k: 'Monthly output', v: '[volume]', d: 'Mass production basis' },
      { k: 'Export markets', v: '[countries]', d: 'OEM supply record' },
    ],
    note: 'Note: these figures are placeholders. Replace them with your actual record.',
  },

  howToStart: {
    eyebrow: 'HOW TO START',
    h2: 'Three things are enough to start a project.',
    items: [
      { k: 'Device model', d: 'The model name, or measured dimensions (width · thickness · height)' },
      { k: 'Form', d: 'Case / pouch / grip, plus any reference images' },
      { k: 'Expected volume', d: 'Initial and monthly volume — small pilot runs are welcome' },
    ],
    note: 'No drawings or 3D data required. Send a physical sample and we will measure it and propose a design.',
    cta: 'Request a quote',
  },

  scope: {
    title: 'Scope of business',
    inTitle: 'What we manufacture and supply',
    inBody:
      'Silicone protective cases, pouches and grips for vape devices, plus related protection accessories. B2B supply only, on an OEM/ODM basis. We do not sell directly to consumers.',
    outTitle: 'What we do not manufacture or sell',
    outBody:
      'Nicotine liquid, pods, refills, and finished devices (both heated-tobacco and liquid types). We do not handle these categories at all, and do not advertise or sell them online.',
    footer:
      'This site is a B2B manufacturing enquiry channel and its content is intended for business partners. Product images show actual production output; specifications may change through consultation. Items marked as placeholders will be updated once the real data is confirmed.',
  },

  cta: {
    eyebrow: 'START A PROJECT',
    h2Line1: 'Tell us the device model and the form.',
    h2Line2: 'We will review it and come back to you.',
    body: 'No drawings needed. Send a physical sample and we will measure it and propose a design along with an estimated schedule.',
    primary: 'Request a quote',
    secondary: 'See our capabilities in detail',
    note: 'Usually within 1–2 business days',
  },

  faq: {
    eyebrow: 'FAQ',
    h2: 'Frequently asked questions',
    items: [
      { q: 'What is your minimum order quantity (MOQ)?', a: '[MOQ]. It differs between projects requiring a new mold and projects reusing an existing mold, so we confirm which applies when you enquire.' },
      { q: 'Do you also manufacture finished devices?', a: 'No. IUYU only manufactures accessories such as protective cases, pouches and grips. We do not handle nicotine liquid, pods, refills or finished devices.' },
      { q: 'Who owns the mold?', a: 'Where the customer bears the mold cost, ownership sits with the customer. Storage and transfer arrangements are agreed in the contract.' },
      { q: 'How long does development take?', a: 'Around [duration] for a new mold. Where IUYU design assets can be reused, supply is possible within [duration] with no mold development.' },
      { q: 'Can I receive a sample first?', a: 'Yes. Samples can be shipped for models where a mold already exists. For new developments, you can review at the trial-shot stage.' },
      { q: 'Do you support export orders?', a: 'Yes. We have experience with export packaging, labelling and documentation, and can arrange material test reports to suit the destination market.' },
      { q: 'Do you provide material test reports for the silicone?', a: 'Yes, including RoHS and REACH on request. Tell us which items you need when you enquire.' },
      { q: 'Can you match colours and mark logos?', a: 'Yes. We support Pantone-based colour matching and logo marking by embossing or printing.' },
    ],
  },

  pages: {
    capabilities: {
      title: 'Capabilities — design, mold making and LSR molding in-house',
      description:
        'IUYU capabilities: structural design and 3D modelling, mold design and fabrication, LSR/HCR silicone molding, two-shot molding and pre-shipment inspection — all on our own lines. Equipment and inspection items listed.',
      h1Line1: 'From design to shipment,',
      h1Line2: 'finished on one line.',
      lede:
        'When design and molding sit in different companies, silicone cases always run into trouble. A 0.2 mm difference changes how the case closes, and one wrong gate position leaves a flow mark on the surface. At IUYU the design team and the molding team share a building, so that feedback comes back the same day.',
      materialTableHead: ['Grade', 'Name', 'Application'],
      specTable: [
        ['Body size', '96 × 53.5 × 29 mm'],
        ['Mouthpiece cover', '15 × 25 × 14 mm'],
        ['Overall height', '111 mm (with mouthpiece)'],
        ['Lanyard length', '44 cm'],
        ['Material', 'Silicone (matte · anti-fingerprint)'],
        ['Attachment', 'Detachable lanyard loops'],
      ],
      ctaPrimary: 'Request a quote',
      ctaSecondary: 'See the OEM/ODM process',
      processH2: 'Sequence',
      durLabel: 'Duration',
    },
    products: {
      title: 'Product lines — cases, pouches, grips and custom development',
      description:
        'Forms IUYU manufactures: silicone protective cases (Shell), pouches (Pouch), grips (Grip) and custom development. Material, finish and customisation options listed by form.',
      h1Line1: 'Four forms cover',
      h1Line2: 'most requests.',
      lede:
        'These are the forms we actually mass-produce. If you have drawings or reference images, we can also design a new form from scratch. Pricing depends on form, volume and mold conditions, so it is quoted per enquiry.',
      galleryH2: 'Product photos',
      galleryLede: 'Actual production output — check the form and finish condition.',
      views: [
        { src: '/assets/view-full-set.png', cap: 'Full set', note: 'Two cases + three lanyards', ratio: 0.66 },
        { src: '/assets/hero-product.png', cap: 'Case close-up', note: 'Open and closed pair', ratio: 1.59 },
        { src: '/assets/lanyard-a.png', cap: 'Lanyard A', note: 'Loop type · detachable', ratio: 1.48 },
        { src: '/assets/lanyard-b.png', cap: 'Lanyard B', note: 'With grip stopper', ratio: 1.84 },
      ],
      finishH2: 'Surface finish options',
      finishNote: 'Note: surface texture is determined by the mold EDM pattern and coating method. Texture swatches are enclosed with samples on request.',
      customH2: 'Customisation scope',
      customRows: [
        ['Form', 'New design from your drawings, reuse of an existing mold, partial form changes'],
        ['Colour', 'Pantone-based matching. Target within ±ΔE 1.0 given silicone behaviour'],
        ['Surface', 'Matte / soft-touch / glossy / embossed pattern'],
        ['Logo', 'Embossed marking, silk printing, label application'],
        ['Closure', 'Magnet count and placement changes, slide or snap structure options'],
        ['Packaging', 'Customer brand box, poly bag, label, export packing'],
        ['Accessories', 'Spare magnets, microfibre pouch, instruction sheet'],
      ],
    },
    oem: {
      title: 'OEM/ODM process — from enquiry to mass production',
      description:
        'IUYU OEM/ODM process step by step: enquiry and consultation, design and 3D modelling, mold making, trial shot verification, mass production and shipping. Required inputs and lead times for each stage.',
      h1Line1: 'From enquiry to mass production,',
      h1Line2: 'in five stages.',
      lede:
        'Each stage has a review and approval point. If the direction changes mid-way the mold has to be remade, so we front-load the review into the design stage.',
      durLabel: 'Duration',
      stepsNote:
        'Note: [duration] items are placeholders — replace them with your actual development lead times. Projects reusing an existing mold can skip stages 02–04 and go straight to production.',
      contractH2: 'Points to confirm in the contract',
      contracts: [
        { k: 'Mold ownership', d: 'Where the customer bears the mold cost, ownership sits with the customer. Storage and transfer are set by contract.' },
        { k: 'Confidentiality (NDA)', d: 'Customer drawings and 3D data are treated as confidential. We sign an NDA before receiving materials on request.' },
        { k: 'MOQ', d: 'Minimum order quantity differs between new mold development and reuse of an existing mold. We confirm which applies per enquiry.' },
        { k: 'Quality standard', d: 'The approved trial sample becomes the production standard. Where output deviates, we rework or re-produce.' },
        { k: 'Payment terms', d: 'Mold cost and production cost are invoiced separately. Specific terms are agreed according to project scale.' },
        { k: 'Delivery', d: 'Confirmed according to approval timing and volume. Advance booking may be required in peak season.' },
      ],
      ipLink: 'Read the full IP policy',
    },
    about: {
      title: 'About — IUYU, silicone case manufacturer',
      description:
        'IUYU specialises in silicone protective cases and pouches for vape devices. Business scope, in-house capabilities, equipment and company information.',
      h1Line1: 'A company that has made',
      h1Line2: 'one material for a long time.',
      paragraphs: [
        'IUYU manufactures protective accessories for vape devices. A case is a small product, but getting it right requires compound formulation, mold precision and molding conditions to line up at once. A 0.2 mm deviation changes how it closes, and a wrong gate position leaves a flow mark on the surface.',
        'That is why we never separated design from molding. The structural design team and the molding team sit on the same line, so trial-shot results turn into design revisions the same day. That iteration speed is the real reason our development cycles are short.',
        'We run OEM, producing to customer drawings, alongside ODM, supplying our own validated design assets under the customer brand. For a new brand launch, the latter cuts lead time substantially.',
      ],
      scopeLabel: 'Business scope',
      scopeBody:
        'OEM/ODM manufacturing of silicone protective cases, pouches, grips and device protection accessories. We do not handle nicotine liquid, pods, refills or finished devices.',
      capLabel: 'In-house capabilities',
      bizH2: 'Company information',
      bizRows: [
        ['Company (KR)', 'companyKo'],
        ['Company (EN)', 'companyEn'],
        ['CEO', 'ceo'],
        ['Business registration no.', 'bizNo'],
        ['HQ / Factory', 'address'],
        ['Office', 'addressOffice'],
        ['Sales enquiries', 'email'],
        ['Telephone', 'tel'],
        ['Business hours', 'hours'],
      ],
    },
    contact: {
      title: 'Request a quote — OEM/ODM enquiry',
      description:
        'OEM/ODM quote enquiry for silicone protective cases and pouches. Send the device model, desired form and expected volume and we usually respond within 1–2 business days.',
      h1Line1: 'Just tell us the device model',
      h1Line2: 'and the form you want.',
      lede:
        'Fill in the form and the responsible engineer will review and reply. No drawings or 3D data needed; send a physical sample and we will measure it and propose a design.',
      formH2: 'Enquiry form',
      formNote: 'Marked fields are required. Fill in the rest as far as you know.',
      directLabel: 'Direct contact',
      whatsappLabel: 'WhatsApp',
      whatsappCta: 'Chat on WhatsApp',
      salesLabel: 'Sales · quotes',
      emailLabel: 'Email',
      telLabel: 'Telephone',
      hoursLabel: 'Business hours',
      prepLabel: 'Helpful to prepare',
      replyLabel: 'Response time',
      replyBody:
        'We usually reply within 1–2 business days. Development enquiries can take longer to review, and in that case we will still update you on progress first.',
      scopeLabel: 'Scope of business',
      scopeBody:
        'IUYU manufactures silicone protective cases, pouches and similar accessories only. We do not respond to enquiries about nicotine liquid, pods, refills or finished devices.',
    },
  },

  form: {
    company: 'Company name',
    name: 'Contact name',
    email: 'Email',
    phone: 'Phone',
    country: 'Country / region',
    device: 'Device model',
    line: 'Desired form',
    qty: 'Expected volume',
    message: 'Enquiry details',
    selectPlaceholder: 'Please select',
    lineUndecided: 'Not decided yet (consultation)',
    placeholderCompany: 'e.g. Acme Co., Ltd.',
    placeholderName: 'e.g. Jane Doe',
    placeholderEmail: 'name@company.com',
    placeholderPhone: '+1 555 000 0000',
    placeholderCountry: 'e.g. United States / Germany',
    placeholderDevice: 'Model name, or measured dimensions (width · thickness · height)',
    placeholderQty: 'e.g. 1,000 initial / 5,000 per month',
    placeholderMessage: 'Desired form, reference images, schedule, current stage — anything you can share.',
    consent:
      'I agree to the collection and use of my personal data. The information is used only to respond to this enquiry and is destroyed once that purpose is met. See the Privacy Policy for details.',
    consentLink: 'Privacy Policy',
    submit: 'Send enquiry',
    replyNote: 'Usually within 1–2 business days',
    requiredError: 'Please complete all required fields.',
    sentNote: 'If your mail client does not open, please email {EMAIL} directly. The form backend is connected at deployment.',
    mailSubjectPrefix: '[IUYU] Quote enquiry — ',
    labels: {
      company: 'Company',
      name: 'Contact',
      email: 'Email',
      phone: 'Phone',
      country: 'Country',
      device: 'Device model',
      line: 'Form',
      qty: 'Volume',
      message: 'Enquiry',
    },
  },

  footer: {
    menuLabel: 'MENU',
    policyLabel: 'POLICY',
    contactLabel: 'CONTACT',
    serviceNote:
      'IUYU is a B2B manufacturer of silicone protective cases, pouches and similar accessories for vape devices. We do not manufacture or sell nicotine liquid, pods, refills or finished devices, and we do not sell to consumers from this site.',
    rights: 'All rights reserved.',
    tagline: 'OEM/ODM manufacturing of vape accessories',
    bizRows: [
      ['Company', 'companyKo'],
      ['CEO', 'ceo'],
      ['Business reg. no.', 'bizNo'],
      ['HQ / Factory', 'address'],
      ['Office', 'addressOffice'],
    ],
    scopeTitle: 'Scope of business',
  },

  floating: {
    mobileTitle: 'OEM / ODM quote enquiry',
    mobileSub: 'Send us the device model and we will review it',
    mobileCta: 'Enquire',
    desktopCta: 'Request a quote',
    whatsapp: 'Chat on WhatsApp',
  },

  legal: {
    eyebrow: 'POLICY',
    updatedLabel: 'Last updated',
    otherDocsLabel: 'Other documents',
    scopeLabel: 'Scope of business',
    scopeBody:
      'IUYU manufactures silicone protective cases, pouches and similar accessories only. We do not handle nicotine liquid, pods, refills or finished devices.',
    cta: 'Request a quote',
    reviewerNote:
      'This document is a draft based on IUYU\u2019s business model. It must be reviewed by legal counsel and replaced with a final version once the actual contract structure (mold ownership, payment terms, subcontracted vendors) is fixed. Contact:',
    docs: {
      terms: { title: 'Terms of Use', desc: 'Terms governing use of the IUYU B2B site, including enquiries, contracts, intellectual property and liability.' },
      privacy: { title: 'Privacy Policy', desc: 'What enquiry information IUYU collects, how it is used, how long it is kept, and the rights of the data subject.' },
      youth: { title: 'Youth Protection Policy', desc: 'IUYU\u2019s youth protection measures and the business scope that excludes nicotine products.' },
      quality: { title: 'Quality & Claims Policy', desc: 'Pre-shipment inspection criteria, claim submission process, rework and compensation basis.' },
      ip: { title: 'Intellectual Property Policy', desc: 'Mold ownership, confidentiality of customer drawings, and ownership of design assets.' },
    },
  },

  notFound: {
    eyebrow: '404',
    h1: 'Page not found.',
    body: 'The address may have changed or the page may have been removed. Use one of the links below.',
    home: 'Home',
    capabilities: 'Capabilities',
    contact: 'Request a quote',
  },

  common: {
    loading: 'LOADING',
    skipToContent: 'Skip to content',
    ariaMenuOpen: 'Open menu',
    ariaMenuClose: 'Close menu',
    ariaPrimaryNav: 'Main navigation',
    ariaMobileNav: 'Mobile navigation',
    ariaBreadcrumb: 'Breadcrumb',
    home: 'Home',
    langLabel: 'Language',
  },
};

export default en;
