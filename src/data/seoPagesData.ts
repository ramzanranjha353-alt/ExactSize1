import { FileType, TargetPreset } from '../types';

export interface SEOPageData {
  slug: string;
  fileType: FileType;
  targetPreset: TargetPreset;
  targetBytes: number;
  badgeLabel: string;
  title: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  contextLead: string;
  useCaseOverview: {
    heading: string;
    description: string;
    commonPortals: string[];
  };
  compressionDetails: {
    whatHappens: string;
    dimensionAdvice: string;
  };
  tips: {
    title: string;
    text: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
  relatedSizes: {
    slug: string;
    label: string;
    description: string;
  }[];
}

export const SEO_PAGES: Record<string, SEOPageData> = {
  '/compress-image-to-50kb': {
    slug: '/compress-image-to-50kb',
    fileType: 'image',
    targetPreset: '50KB',
    targetBytes: 50 * 1024,
    badgeLabel: 'Signature & Government Exam Preset',
    title: 'Compress Image to 50KB Online (Free & Private) | ExactSize',
    metaDescription: 'Compress image to 50KB online for free. Ideal for SSC, UPSC, state exam portals, and official signature scans. 100% private in-browser compression.',
    h1: 'Compress Image to 50KB',
    tagline: 'Reduce photos and signature scans to strictly under 50KB without blur or server uploads.',
    contextLead:
      'Many government recruitment portals, civil service exams, and passport systems impose a strict 50KB ceiling on uploaded photos and signature scans. Submitting a file at 51KB triggers an instant rejection error. ExactSize uses client-side iterative calibration to hit 48KB–50KB reliably.',
    useCaseOverview: {
      heading: 'Why 50KB is the Strict Standard for Exams & Signatures',
      description:
        'Large-scale public examination portals process millions of candidate records concurrently. To conserve database bandwidth, legacy systems mandate photo sizes between 20KB and 50KB, and signatures between 10KB and 50KB. Achieving this manually with standard export tools usually degrades text beyond recognition.',
      commonPortals: [
        'UPSC Civil Services & SSC Combined Graduate Level (CGL) portals',
        'State Public Service Commissions (MPSC, TNPSC, UPPSC)',
        'Indian Railways Recruitment Board (RRB) applications',
        'National Eligibility cum Entrance Test (NEET) photo uploads',
        'Digital signature upload boxes on banking KYC portals',
      ],
    },
    compressionDetails: {
      whatHappens:
        'Our algorithm reads your image into an HTML5 canvas sandbox. It tests JPEG/WebP quantization matrices in memory. If the initial resolution is excessively large (e.g., 4000x3000px from a smartphone camera), it calculates the exact bicubic downsampling ratio required to preserve facial features while guaranteeing a final file size under 51,200 bytes.',
      dimensionAdvice:
        'For passport photos targeting 50KB, a pixel dimension between 350x450px and 600x600px provides the sharpest clarity. For signature scans, 300x120px to 400x150px keeps ink strokes crisp.',
    },
    tips: [
      {
        title: 'Crop tightly before compressing',
        text: 'Remove empty borders or background margins around your face or signature. Cropping out unneeded white space preserves more bytes for the essential details.',
      },
      {
        title: 'Use uniform lighting on white backgrounds',
        text: 'Busy textured backgrounds consume significant JPEG frequency tables. A solid white or light blue background compresses up to 40% more efficiently.',
      },
      {
        title: 'Avoid double compression',
        text: 'Upload the original camera or scanner image rather than a file already compressed through messaging apps like WhatsApp, which introduce heavy compression artifacts.',
      },
      {
        title: 'Inspect the result before submission',
        text: 'Use our built-in fidelity preview to verify that text on documents or facial details on portraits remain legible before saving.',
      },
    ],
    faqs: [
      {
        q: 'How do I compress an image to 50KB without losing signature clarity?',
        a: 'ExactSize automatically detects high-contrast line scans like signatures. It preserves sharp edge thresholds and adjusts the quantization tables so that ink strokes remain dark and readable while keeping the output file size strictly below 50KB.',
      },
      {
        q: 'What should I do if the portal requires between 20KB and 50KB?',
        a: 'The 50KB preset calibrates the file to land typically between 46KB and 49.5KB. This satisfies both the minimum 20KB threshold and the maximum 50KB ceiling required by exam registration forms.',
      },
      {
        q: 'Are my confidential ID photos or signature scans uploaded to your servers?',
        a: 'No. All processing happens 100% locally in your web browser using HTML5 Canvas APIs. Your files never travel over the network, ensuring complete confidentiality.',
      },
      {
        q: 'What if my original photo is 10MB from a smartphone?',
        a: 'ExactSize handles high-resolution camera photos effortlessly. It calculates the necessary dimensional scaling and quality factors to shrink 10MB down to 50KB in under 500 milliseconds.',
      },
    ],
    relatedSizes: [
      { slug: '/compress-image-to-100kb', label: '100KB Image', description: 'Standard passport & visa photo requirement' },
      { slug: '/compress-image-to-200kb', label: '200KB Image', description: 'LinkedIn & resume profile photo standard' },
      { slug: '/compress-pdf-to-100kb', label: '100KB PDF', description: 'Single-page certificate & receipt compression' },
    ],
  },

  '/compress-image-to-100kb': {
    slug: '/compress-image-to-100kb',
    fileType: 'image',
    targetPreset: '100KB',
    targetBytes: 100 * 1024,
    badgeLabel: 'Passport & Visa Photo Standard',
    title: 'Compress Image to 100KB Online | ExactSize',
    metaDescription: 'Compress image to 100KB online for free. Perfectly calibrated for US Visa DS-160, Schengen Visa, DV Lottery, and job portals. 100% private in-browser tool.',
    h1: 'Compress Image to 100KB',
    tagline: 'Get your photos and scans to exactly 100KB for visa applications, passport renewals, and job portals.',
    contextLead:
      'The 100KB threshold is one of the most widely enforced file size caps worldwide. From official visa platforms like the US Department of State DS-160 to Schengen visa centers and corporate HR portals, photos exceeding 100KB or 240KB fail automated validation.',
    useCaseOverview: {
      heading: 'The 100KB Benchmark in Global Visa & Immigration Systems',
      description:
        'Immigration and consular authorities enforce strict technical criteria for biometric photos. While they require high clarity for facial recognition algorithms, their legacy upload infrastructure rejects files larger than 100KB or 240KB. ExactSize balances facial geometry fidelity with strict byte limits.',
      commonPortals: [
        'US Visa DS-160 Nonimmigrant Visa Electronic Application',
        'Diversity Immigrant Visa Program (DV Lottery) entries',
        'Schengen Visa consular portal uploads (VFS Global, TLScontact)',
        'Canadian Immigration, Refugees and Citizenship (IRCC) photo portals',
        'UK Visas and Immigration (UKVI) identity verification services',
      ],
    },
    compressionDetails: {
      whatHappens:
        'When you select 100KB, ExactSize sets a ceiling of 102,400 bytes. The binary search engine runs iterative quality simulations against the image buffer, seeking the highest possible JPEG quality factor (typically 75%–88%) that fits within the target size without requiring excessive downsampling.',
      dimensionAdvice:
        'Biometric visa photos typically specify 600x600 pixels (2x2 inches at 300 DPI). At 600x600px, 100KB is the sweet spot that provides pristine skin tones and sharp iris contrast.',
    },
    tips: [
      {
        title: 'Maintain 600x600 pixel aspect ratio for visas',
        text: 'If your photo is for a visa or passport, crop it into a 1:1 square with your head centered before compressing to 100KB.',
      },
      {
        title: 'Preserve neutral white or off-white background',
        text: 'Official guidelines prohibit patterned backgrounds. A clean white background also compresses far more cleanly into the 100KB quota.',
      },
      {
        title: 'Export as standard JPEG',
        text: 'Most consular systems specifically require JPEG/JPG format. ExactSize automatically outputs fully compliant JPEG files.',
      },
      {
        title: 'Verify eyes and hairline visibility',
        text: 'Use the comparison preview to ensure compression has not introduced artifacts around eyes, eyebrows, or hairline.',
      },
    ],
    faqs: [
      {
        q: 'Can I compress my image to exactly 100KB for the US Visa DS-160?',
        a: 'Yes. The DS-160 system requires JPEG images less than or equal to 240KB, with many consulates advising photos around 100KB for instant verification. ExactSize ensures your photo is under 100KB while meeting dimension rules.',
      },
      {
        q: 'What if my photo is currently 5MB from an iPhone?',
        a: 'Drop your 5MB photo into the tool. ExactSize will analyze the original resolution and compress it down to ~98KB in a fraction of a second, with zero upload wait time.',
      },
      {
        q: 'Will my photo become blurry when compressed to 100KB?',
        a: 'At 100KB, a standard portrait photo has plenty of data budget to remain razor-sharp. Our smart compression retains high-frequency facial features while discarding invisible redundant metadata.',
      },
      {
        q: 'Does ExactSize save copies of my passport photos?',
        a: 'Never. The compression runs entirely on your device inside your web browser. Neither our servers nor any third party ever receives your photo.',
      },
    ],
    relatedSizes: [
      { slug: '/compress-image-to-50kb', label: '50KB Image', description: 'Government exam and digital signature uploads' },
      { slug: '/compress-image-to-200kb', label: '200KB Image', description: 'LinkedIn & executive profile photo standard' },
      { slug: '/compress-pdf-to-100kb', label: '100KB PDF', description: 'Single-page document & resume compression' },
      { slug: '/compress-pdf-to-200kb', label: '200KB PDF', description: 'Multi-page CV and certification documents' },
    ],
  },

  '/compress-image-to-200kb': {
    slug: '/compress-image-to-200kb',
    fileType: 'image',
    targetPreset: '200KB',
    targetBytes: 200 * 1024,
    badgeLabel: 'Profile & Resume Photo Standard',
    title: 'Compress Image to 200KB Online | ExactSize',
    metaDescription: 'Compress image to 200KB online for free. Ideal for LinkedIn profile photos, resumes, and corporate portals. Fast, private client-side compression.',
    h1: 'Compress Image to 200KB',
    tagline: 'Optimize portraits, profile pictures, and documents to 200KB with crystal-clear sharpness.',
    contextLead:
      'Job portals like Workday, Taleo, Greenhouse, and LinkedIn recommend keeping profile photos and resume graphics under 200KB to ensure fast page loads across mobile recruiter apps. ExactSize delivers optimal 200KB compression in seconds.',
    useCaseOverview: {
      heading: 'Why 200KB is Ideal for Modern Web Profiles & Resumes',
      description:
        'At 200KB, an image retains enough color depth and resolution to look crisp on high-DPI Retina screens while remaining lightweight enough to render instantly. It is the gold standard for applicant tracking systems (ATS) and professional social networks.',
      commonPortals: [
        'LinkedIn profile photo and banner uploads',
        'Enterprise ATS platforms (Workday, SuccessFactors, Taleo)',
        'Corporate intranet directory avatars (Slack, Microsoft Teams, Google Workspace)',
        'Real estate and MLS listing photo uploads',
        'Online banking identity document verification scans',
      ],
    },
    compressionDetails: {
      whatHappens:
        'With a 200KB budget (204,800 bytes), our engine can retain upwards of 85%–92% JPEG quality. It removes unneeded camera EXIF metadata, GPS coordinates, and color profiles that inflate file size without adding visual value.',
      dimensionAdvice:
        'Recommended dimensions for 200KB images are 800x800px to 1200x1200px. This provides full sharpness on 4K monitors and mobile phones alike.',
    },
    tips: [
      {
        title: 'Check facial contrast and skin tones',
        text: '200KB allows rich tonal gradations. Make sure your portrait has balanced exposure before finalizing.',
      },
      {
        title: 'Strip unnecessary camera metadata',
        text: 'ExactSize automatically removes device information and geolocation data, enhancing both privacy and byte efficiency.',
      },
      {
        title: 'Use WebP format for even higher visual quality',
        text: 'If your target platform supports WebP, select WebP in ExactSize for up to 30% higher visual fidelity at the exact same 200KB target.',
      },
      {
        title: 'Keep text readable on badges and cards',
        text: 'If compressing an ID badge or business card, 200KB ensures fine 8pt type remains fully legible.',
      },
    ],
    faqs: [
      {
        q: 'Why did my 4MB photo look identical after compressing to 200KB?',
        a: 'Human vision cannot perceive the subtle compression artifacts that standard JPEG algorithms introduce at 85%+ quality. By eliminating redundant color data and metadata, 200KB looks indistinguishable from the original to the human eye.',
      },
      {
        q: 'Can I compress PNG images with transparent backgrounds to 200KB?',
        a: 'Yes. If your PNG has transparency, ExactSize preserves the alpha channel while optimizing the color palette to hit your 200KB goal.',
      },
      {
        q: 'How does 200KB compare to 100KB for photo clarity?',
        a: 'At 200KB you have twice the data budget of 100KB, allowing for larger pixel dimensions (up to 1200px) and higher quality factors. It is preferred for public portfolios and LinkedIn profiles.',
      },
      {
        q: 'Is there a limit on how many images I can compress?',
        a: 'None. Because compression happens entirely in your local browser CPU, there are no daily limits, paywalls, or throttling.',
      },
    ],
    relatedSizes: [
      { slug: '/compress-image-to-100kb', label: '100KB Image', description: 'Strict passport & visa photo requirements' },
      { slug: '/compress-image-to-300kb', label: '300KB Image', description: 'High-DPI hero graphics & blog banners' },
      { slug: '/compress-pdf-to-200kb', label: '200KB PDF', description: 'Resume & cover letter document compression' },
    ],
  },

  '/compress-image-to-300kb': {
    slug: '/compress-image-to-300kb',
    fileType: 'image',
    targetPreset: '300KB',
    targetBytes: 300 * 1024,
    badgeLabel: 'Web & Blog Featured Image Standard',
    title: 'Compress Image to 300KB Online | ExactSize',
    metaDescription: 'Compress image to 300KB online for free. Ideal for blog featured images, web banners, and ecommerce product photos. 100% private in-browser tool.',
    h1: 'Compress Image to 300KB',
    tagline: 'Reduce website graphics, hero banners, and product photography to 300KB for optimal Core Web Vitals.',
    contextLead:
      'Web performance benchmarks indicate that images above 300KB significantly degrade Largest Contentful Paint (LCP) and mobile page speed scores. Compressing hero images and featured banners to exactly 300KB delivers rapid loading without visible compromise.',
    useCaseOverview: {
      heading: 'The 300KB Standard for Web Publishers & Core Web Vitals',
      description:
        'Google Lighthouse and Core Web Vitals penalize slow-loading hero banners. A 300KB target size ensures your website passes speed audits while showcasing vibrant photography on desktop and mobile screens.',
      commonPortals: [
        'WordPress, Webflow, and Shopify product image uploads',
        'Blog featured hero headers (1200x630px social share cards)',
        'Digital marketing newsletters and Mailchimp campaigns',
        'Real estate portal listing galleries (Zillow, Redfin)',
        'Online portfolio artwork previews',
      ],
    },
    compressionDetails: {
      whatHappens:
        'ExactSize targets 307,200 bytes by running a fine-grained binary search across JPEG/WebP compression levels. It optimizes chroma subsampling (4:2:0 vs 4:4:4) to keep vivid branding colors and product edges crisp.',
      dimensionAdvice:
        'For 300KB images, standard web dimensions of 1200x630px (OpenGraph) or 1600x900px (desktop hero) yield pristine visual results with sub-second mobile transfer times.',
    },
    tips: [
      {
        title: 'Target 1200x630px for social preview cards',
        text: 'The optimal OpenGraph banner dimension is 1200x630px. At 300KB, it loads instantly when links are shared on Slack, X, and iMessage.',
      },
      {
        title: 'Retain smooth color gradients',
        text: 'Images with soft gradients benefit from our gentle quantization curves, preventing color banding artifacts.',
      },
      {
        title: 'Speed up email newsletter delivery',
        text: 'Email clients like Gmail clip or delay messages with heavy image attachments. 300KB ensures instant newsletter rendering.',
      },
      {
        title: 'Boost SEO speed rankings',
        text: 'Replacing 2MB+ uncompressed banner images with 300KB optimized versions immediately improves Google PageSpeed Insights scores.',
      },
    ],
    faqs: [
      {
        q: 'Why should I compress blog images to 300KB instead of 500KB?',
        a: 'On 4G and 5G mobile connections, 300KB loads in under 150ms. A 500KB or 1MB image can delay LCP past Google’s 2.5-second threshold, hurting organic search rankings.',
      },
      {
        q: 'Does ExactSize support WebP conversion for 300KB images?',
        a: 'Yes. If you upload a WebP or choose WebP output, you can fit higher pixel dimensions within the same 300KB envelope.',
      },
      {
        q: 'How fast is the compression process?',
        a: 'Because everything runs on your device’s browser CPU without network upload latency, compression completes in roughly 200–400 milliseconds.',
      },
      {
        q: 'Can I batch compress images to 300KB?',
        a: 'You can compress images sequentially with single-click downloads and instant reset options.',
      },
    ],
    relatedSizes: [
      { slug: '/compress-image-to-200kb', label: '200KB Image', description: 'Optimized for resumes & profile avatars' },
      { slug: '/compress-image-to-500kb', label: '500KB Image', description: 'High-detail product & portfolio photography' },
      { slug: '/compress-pdf-to-300kb', label: '300KB PDF', description: 'Application packet & contract compression' },
    ],
  },

  '/compress-image-to-500kb': {
    slug: '/compress-image-to-500kb',
    fileType: 'image',
    targetPreset: '500KB',
    targetBytes: 500 * 1024,
    badgeLabel: 'High-Res Presentation & Portfolio Preset',
    title: 'Compress Image to 500KB Online | ExactSize',
    metaDescription: 'Compress image to 500KB online for free. Ideal for high-resolution photography, slide decks, and creative portfolios. Fast & 100% private in-browser tool.',
    h1: 'Compress Image to 500KB',
    tagline: 'Reduce large camera photos and graphic designs to 500KB while preserving rich details and colors.',
    contextLead:
      'High-resolution camera exports from Sony, Canon, or modern iPhones frequently range between 8MB and 25MB. Uploading these directly into PowerPoint decks, email clients, or design tools causes sluggish performance. ExactSize brings them cleanly down to 500KB.',
    useCaseOverview: {
      heading: 'When 500KB is the Perfect Balance of Quality and Speed',
      description:
        'A 500KB limit provides ample byte capacity to retain ultra-sharp details, rich textures, and nuanced shadow gradations. It is widely used by photographers, presentation creators, and design agencies who refuse to sacrifice visual quality.',
      commonPortals: [
        'PowerPoint, Keynote, and Google Slides presentation inserts',
        'Creative portfolio showcases (Behance, Dribbble, ArtStation)',
        'E-commerce zoomable product catalog photography',
        'Print-ready proof previews for client signoff',
        'Corporate annual report illustrations',
      ],
    },
    compressionDetails: {
      whatHappens:
        'At 500KB (512,000 bytes), ExactSize utilizes high JPEG quality parameters (90%+). It strips extraneous camera profiles while maintaining high dynamic range color fidelity and sharp 2000px+ resolution.',
      dimensionAdvice:
        'Images targeting 500KB comfortably sustain 1920x1080px (Full HD) to 2560x1440px (2K QHD) with imperceptible compression loss.',
    },
    tips: [
      {
        title: 'Perfect for slide presentation decks',
        text: 'A 20-slide presentation containing 10MB photos becomes a sluggish 200MB file. Compressing images to 500KB keeps the deck snappy and emailable.',
      },
      {
        title: 'Retain crisp typography in graphic designs',
        text: 'Posters and marketing banners containing vector text elements maintain clean edges at 500KB.',
      },
      {
        title: 'Preserve full 1080p resolution',
        text: 'You do not need to downscale dimensions below 1920px when compressing to 500KB.',
      },
      {
        title: 'Zero server uploads for client NDA work',
        text: 'Unreleased client visual assets remain strictly on your machine, compliant with strict non-disclosure agreements.',
      },
    ],
    faqs: [
      {
        q: 'Will a 500KB image look good on a 4K television or Retina display?',
        a: 'Yes. At 500KB, a properly encoded JPEG or WebP can display up to 2560 pixels across with virtually no visible compression artifacts.',
      },
      {
        q: 'How much smaller is 500KB compared to raw phone photos?',
        a: 'Modern smartphone cameras capture 12MB to 25MB per photo. Compressing to 500KB represents a 95% to 98% reduction in storage space.',
      },
      {
        q: 'Can I compress RAW photos directly?',
        a: 'ExactSize supports standard browser-decodable formats including JPEG, PNG, and WebP. Convert camera RAW files to JPEG first before compressing.',
      },
      {
        q: 'Is there any compression watermark added to the file?',
        a: 'No. ExactSize never adds watermarks, metadata tags, or promotional headers to your files.',
      },
    ],
    relatedSizes: [
      { slug: '/compress-image-to-300kb', label: '300KB Image', description: 'Core Web Vitals & website hero optimization' },
      { slug: '/compress-image-to-1mb', label: '1MB Image', description: 'Ultra-high resolution desktop & print previews' },
      { slug: '/compress-pdf-to-500kb', label: '500KB PDF', description: 'Multi-page research papers & financial reports' },
    ],
  },

  '/compress-image-to-1mb': {
    slug: '/compress-image-to-1mb',
    fileType: 'image',
    targetPreset: '1MB',
    targetBytes: 1024 * 1024,
    badgeLabel: 'Ultra-High Resolution Standard',
    title: 'Compress Image to 1MB Online | ExactSize',
    metaDescription: 'Compress image to 1MB online for free. Ideal for high-detail architectural photos, digital art, and large email attachments. 100% private in-browser tool.',
    h1: 'Compress Image to 1MB',
    tagline: 'Bring giant 20MB+ camera files down to a clean 1MB target without losing professional visual fidelity.',
    contextLead:
      'High-megapixel camera sensors produce giant image files (20MB to 50MB) that exceed email attachment limits and trigger upload timeout errors on corporate servers. Compressing an image to 1MB ensures seamless file sharing while maintaining gallery-grade clarity.',
    useCaseOverview: {
      heading: 'The 1MB Ceiling for Email Attachments and Enterprise Portals',
      description:
        'Many corporate Outlook mail servers and client extranets cap individual file attachments or slow down when files exceed 1MB. A 1MB file provides abundant data density for 4K resolutions while transferring effortlessly.',
      commonPortals: [
        'Email attachments sent via Outlook, Gmail, or corporate mail relays',
        'Architectural CAD renders and construction site photography',
        'Fine art digital prints and photography competition entries',
        'E-commerce hero banners for full-width 4K desktop layouts',
        'Government planning permission and land registry photo uploads',
      ],
    },
    compressionDetails: {
      whatHappens:
        'ExactSize preserves the maximum possible resolution when targeting 1,048,576 bytes. It tunes discrete cosine transform (DCT) coefficients to protect intricate textures such as foliage, fabrics, and fine mechanical lines.',
      dimensionAdvice:
        'A 1MB file easily accommodates 3840x2160px (4K UHD) images with professional studio clarity.',
    },
    tips: [
      {
        title: 'Ideal for 4K wallpaper and background imagery',
        text: 'Full 3840x2160px wallpapers compress cleanly into 1MB without introducing edge noise.',
      },
      {
        title: 'Bypass corporate email upload caps',
        text: 'Outlook often rejects messages over 10MB. Bringing three or four 20MB photos down to 1MB each allows the whole batch to send smoothly.',
      },
      {
        title: 'Preserve high-density architecture lines',
        text: 'Thin CAD lines and building facade textures remain razor-sharp at 1MB.',
      },
      {
        title: 'Keep original aspect ratios',
        text: 'ExactSize respects your original aspect ratio without unwanted cropping or stretching.',
      },
    ],
    faqs: [
      {
        q: 'How does 1MB compression handle panoramic photos?',
        a: 'Panoramic photos with aspect ratios like 21:9 or 3:1 compress smoothly to 1MB while preserving panoramic continuity.',
      },
      {
        q: 'Can I print an image that has been compressed to 1MB?',
        a: 'Yes. A 1MB JPEG can easily be printed at 8x10 or 11x14 inches at 300 DPI with crisp, professional visual results.',
      },
      {
        q: 'Why not just email a cloud link instead of compressing to 1MB?',
        a: 'Many recipients cannot access external Google Drive or Dropbox links due to enterprise firewall restrictions. An attached 1MB file opens directly.',
      },
      {
        q: 'Does ExactSize work without an internet connection once loaded?',
        a: 'Yes. Once the page is loaded in your browser, all compression algorithms run locally in client-side memory without needing ongoing network connectivity.',
      },
    ],
    relatedSizes: [
      { slug: '/compress-image-to-500kb', label: '500KB Image', description: 'Presentation decks & portfolio optimization' },
      { slug: '/compress-image-to-300kb', label: '300KB Image', description: 'Web banner & blog header optimization' },
      { slug: '/compress-pdf-to-1mb', label: '1MB PDF', description: 'Comprehensive PDF reports & project proposals' },
    ],
  },

  '/compress-pdf-to-100kb': {
    slug: '/compress-pdf-to-100kb',
    fileType: 'pdf',
    targetPreset: '100KB',
    targetBytes: 100 * 1024,
    badgeLabel: 'Single-Page Resume & Receipt Standard',
    title: 'Compress PDF to 100KB Online | ExactSize',
    metaDescription: 'Compress PDF to 100KB online for free. Ideal for single-page resumes, bank receipts, and government portal uploads. 100% private in-browser compression.',
    h1: 'Compress PDF to 100KB',
    tagline: 'Optimize single-page PDF resumes, payment receipts, and certificates to under 100KB.',
    contextLead:
      'Job boards, state licensing portals, and banking apps frequently cap PDF document uploads at strictly 100KB. A standard single-page PDF exported from Word or Canva often clocks in at 500KB to 2MB due to uncompressed embedded fonts and metadata.',
    useCaseOverview: {
      heading: 'Why 100KB is the Critical Threshold for Single-Page Documents',
      description:
        'When submitting single-page PDF documents like salary slips, academic certificates, or simple resumes, legacy HR and government upload forms enforce a hard 100KB limit. Compressing the PDF locally removes structural bloat while preserving vector text crispness.',
      commonPortals: [
        'State job and public service examination application portals',
        'Bank account opening KYC document upload portals',
        'Academic admissions forms for mark sheet and transcript uploads',
        'Insurance claim receipt and medical invoice uploads',
        'Government tender single-page affidavit submissions',
      ],
    },
    compressionDetails: {
      whatHappens:
        'ExactSize uses client-side WebAssembly and PDF object stream compression. It cleans out redundant metadata, empty form field dictionaries, and unused font descriptors, compacting content streams to approach the 100KB threshold.',
      dimensionAdvice:
        'Single-page PDFs containing clean vector text compress effortlessly under 100KB. For PDFs containing scanned images, ensure the scan was captured at 150 to 200 DPI in grayscale for optimal results.',
    },
    tips: [
      {
        title: 'Use text-based PDFs when possible',
        text: 'PDFs exported directly from Word or Google Docs contain vector text, which compresses to under 100KB far more easily than image-based scans.',
      },
      {
        title: 'Convert scanned receipts to grayscale',
        text: 'Black-and-white or grayscale receipts compress up to 60% smaller than full 24-bit color scans.',
      },
      {
        title: 'Remove duplicate embedded fonts',
        text: 'ExactSize stream optimization strips redundant duplicate font tables embedded by modern design tools.',
      },
      {
        title: 'Verify readability of small financial figures',
        text: 'Always check that small monetary amounts and dates remain sharp and legible before submitting.',
      },
    ],
    faqs: [
      {
        q: 'Can any PDF be compressed to 100KB?',
        a: 'Single-page PDFs and text-heavy documents can almost always reach 100KB. However, multi-page documents containing dozens of high-resolution color photographs have structural minimums. ExactSize optimizes the PDF as far as technically possible and reports the verified resulting file size.',
      },
      {
        q: 'Will my text become blurry or unsearchable?',
        a: 'No. ExactSize optimizes the underlying PDF streams and objects rather than converting your pages into low-resolution raster images, preserving searchable vector text.',
      },
      {
        q: 'Are confidential financial statements safe?',
        a: 'Yes. All PDF operations happen in your browser sandbox. Your documents never touch a remote server, guaranteeing absolute confidentiality for bank slips and tax records.',
      },
      {
        q: 'What if my PDF is password protected?',
        a: 'Please remove the PDF password before compressing, as browser security models restrict editing encrypted document streams.',
      },
    ],
    relatedSizes: [
      { slug: '/compress-pdf-to-200kb', label: '200KB PDF', description: 'Multi-page resume and cover letter standard' },
      { slug: '/compress-pdf-to-300kb', label: '300KB PDF', description: 'Application packet and legal affidavit ceiling' },
      { slug: '/compress-image-to-100kb', label: '100KB Image', description: 'Passport and biometric visa photo standard' },
    ],
  },

  '/compress-pdf-to-200kb': {
    slug: '/compress-pdf-to-200kb',
    fileType: 'pdf',
    targetPreset: '200KB',
    targetBytes: 200 * 1024,
    badgeLabel: 'Two-Page CV & Academic Record Standard',
    title: 'Compress PDF to 200KB Online | ExactSize',
    metaDescription: 'Compress PDF to 200KB online for free. Ideal for two-page CVs, cover letters, and university transcripts. 100% private in-browser compression.',
    h1: 'Compress PDF to 200KB',
    tagline: 'Reduce multi-page resumes, academic transcripts, and contracts to under 200KB.',
    contextLead:
      'Applying for career opportunities often requires submitting a combined 2-to-3 page PDF containing your CV and cover letter. Applicant tracking systems (ATS) commonly cap uploads at 200KB to ensure fast automated parsing. ExactSize optimizes your PDF to meet this cap.',
    useCaseOverview: {
      heading: 'The 200KB Benchmark for Career Applications and Transcripts',
      description:
        'A 200KB budget allows multi-page documents to maintain high typographic quality, clean company logos, and sharp academic seals while passing strict file size filters.',
      commonPortals: [
        'Greenhouse, Lever, and Workday job application forms',
        'University graduate admissions and fellowship portals',
        'Professional licensing boards (medical, legal, engineering)',
        'Immigration document upload portals for proof of funds',
        'Apartment rental lease application submissions',
      ],
    },
    compressionDetails: {
      whatHappens:
        'ExactSize inspects the PDF internal cross-reference table and compresses object streams with FlateDecode. It discards orphaned resources, structural duplication, and unnecessary metadata while preserving layout fidelity.',
      dimensionAdvice:
        'A 200KB budget easily accommodates 2 to 4 pages of crisp vector text along with small scanned signatures and credential badges.',
    },
    tips: [
      {
        title: 'Consolidate multiple pages into one file',
        text: 'Combine your resume and cover letter into one PDF before compressing to 200KB for a unified submission packet.',
      },
      {
        title: 'Avoid high-DPI full-page background images',
        text: 'Decorative colored background patterns in resume templates dramatically bloat PDF size without adding hiring value.',
      },
      {
        title: 'Verify vector text preservation',
        text: 'Ensure hiring managers and ATS bots can copy and paste text from your compressed PDF without garbled characters.',
      },
      {
        title: 'Check document on mobile screen',
        text: 'Open the downloaded PDF on your phone to confirm it opens instantly without rendering lag.',
      },
    ],
    faqs: [
      {
        q: 'Will ATS resume scanners be able to read a compressed 200KB PDF?',
        a: 'Yes. ExactSize preserves the underlying text streams and font encodings required by automated Applicant Tracking Systems like Greenhouse and Workday.',
      },
      {
        q: 'How many pages can fit into a 200KB PDF?',
        a: 'For standard text-based documents, 3 to 6 pages can easily fit within 200KB when optimized.',
      },
      {
        q: 'Is there any risk of losing formatting or page margins?',
        a: 'No. The visual layout, margins, font alignments, and line spacing remain 100% identical to your original layout.',
      },
      {
        q: 'Are my uploaded resume details private?',
        a: 'Completely. ExactSize performs 100% in-browser processing. Your resume and personal contact details are never transmitted over the internet.',
      },
    ],
    relatedSizes: [
      { slug: '/compress-pdf-to-100kb', label: '100KB PDF', description: 'Single-page document and receipt compression' },
      { slug: '/compress-pdf-to-300kb', label: '300KB PDF', description: 'Standard application packets and legal filings' },
      { slug: '/compress-image-to-200kb', label: '200KB Image', description: 'LinkedIn and resume avatar compression' },
    ],
  },

  '/compress-pdf-to-300kb': {
    slug: '/compress-pdf-to-300kb',
    fileType: 'pdf',
    targetPreset: '300KB',
    targetBytes: 300 * 1024,
    badgeLabel: 'Job Packet & Legal Filing Standard',
    title: 'Compress PDF to 300KB Online | ExactSize',
    metaDescription: 'Compress PDF to 300KB online for free. Perfectly suited for job application packets, legal contracts, and scanned forms. 100% private in-browser tool.',
    h1: 'Compress PDF to 300KB',
    tagline: 'Compress PDF packets, contracts, and legal filings to strictly under 300KB.',
    contextLead:
      'The 300KB ceiling is standard across many European and Asian employment portals, court e-filing systems, and tender submission platforms. When combining an application with letters of recommendation, files frequently exceed 300KB. ExactSize brings them down locally and safely.',
    useCaseOverview: {
      heading: 'Why 300KB is the Common Standard for Legal & Job Packets',
      description:
        'At 300KB, a PDF document strikes the ideal balance for multi-page documents that include scanned signatures, official stamps, and detailed text. It satisfies strict upload constraints without compromising document integrity.',
      commonPortals: [
        'European Union public procurement and tender portals',
        'State judicial e-filing and court document upload systems',
        'Corporate HR applicant portals with 300KB upload constraints',
        'Medical board certification renewal packets',
        'Commercial lease agreements and signature annexures',
      ],
    },
    compressionDetails: {
      whatHappens:
        'ExactSize applies multi-stream compression to PDF objects. It rebuilds cross-reference tables, eliminates duplicate embedded resources, and compresses stream data using industry-standard FlateEncode algorithms.',
      dimensionAdvice:
        'Documents containing 4 to 8 pages of text and scanned signatures fit comfortably within a 300KB ceiling.',
    },
    tips: [
      {
        title: 'Check scanned stamp and seal clarity',
        text: 'Ensure official notary stamps and institutional seals remain crisp and legible after compression.',
      },
      {
        title: 'Flatten interactive form fields',
        text: 'Interactive form fields can add unnecessary structural overhead. ExactSize optimizes stream data to keep bytes low.',
      },
      {
        title: 'Keep hyperlinks intact',
        text: 'Hyperlinks to portfolios or references embedded in the PDF are preserved during compression.',
      },
      {
        title: 'Save bandwidth on high-volume email workflows',
        text: 'Sending 300KB contracts instead of 5MB scans prevents full inbox bouncebacks.',
      },
    ],
    faqs: [
      {
        q: 'How do I compress a PDF to 300KB?',
        a: 'Select the 300KB preset on ExactSize, drop your PDF into the upload box, and click "Compress Now". The tool optimizes the streams locally in your browser and gives you an instant download link.',
      },
      {
        q: 'Can I compress a PDF below 300KB if it is currently 10MB?',
        a: 'If the 10MB file consists of uncompressed scans or duplicate font subsets, ExactSize can dramatically reduce it. However, if it contains dozens of high-res photos, the tool will achieve the most compact verified size possible and inform you clearly.',
      },
      {
        q: 'Will compression reduce text quality in my PDF?',
        a: 'No. Vector text and fonts maintain their mathematical sharpness regardless of compression level.',
      },
      {
        q: 'Are my confidential legal contracts uploaded to any server?',
        a: 'No. ExactSize runs 100% in your browser. No files are uploaded, stored, or viewed by anyone.',
      },
    ],
    relatedSizes: [
      { slug: '/compress-pdf-to-200kb', label: '200KB PDF', description: 'Two-page resume and cover letter standard' },
      { slug: '/compress-pdf-to-500kb', label: '500KB PDF', description: 'Comprehensive reports and research briefs' },
      { slug: '/compress-image-to-300kb', label: '300KB Image', description: 'Web banner and featured graphic compression' },
    ],
  },

  '/compress-pdf-to-500kb': {
    slug: '/compress-pdf-to-500kb',
    fileType: 'pdf',
    targetPreset: '500KB',
    targetBytes: 500 * 1024,
    badgeLabel: 'Comprehensive Report & Research Paper Preset',
    title: 'Compress PDF to 500KB Online | ExactSize',
    metaDescription: 'Compress PDF to 500KB online for free. Ideal for academic research papers, financial statements, and multi-page reports. 100% private in-browser compression.',
    h1: 'Compress PDF to 500KB',
    tagline: 'Optimize multi-page research papers, financial reports, and presentations to 500KB.',
    contextLead:
      'Academic journals, conference submission systems (like EasyChair and IEEE), and corporate file portals frequently enforce a 500KB upload limit. Multi-page papers with diagrams often swell to 5MB–15MB. ExactSize compacts them efficiently to 500KB.',
    useCaseOverview: {
      heading: 'The 500KB Limit for Academic & Financial Publishing',
      description:
        'A 500KB capacity accommodates extensive 10-to-20 page documents with embedded vector charts, mathematical notation, and bibliographies. It ensures papers open rapidly for peer reviewers and hiring committees.',
      commonPortals: [
        'Academic journal submission systems (IEEE, ACM, Springer, Elsevier)',
        'Conference submission portals (EasyChair, OpenReview)',
        'Quarterly corporate tax and financial audit portal uploads',
        'Mortgage application document bundle upload boxes',
        'Government grant and research proposal submission systems',
      ],
    },
    compressionDetails: {
      whatHappens:
        'ExactSize compacts PDF structural streams, consolidates font subsets, and applies lossless Flate stream compression. It cleans out outdated document history tables while keeping complex vector diagrams sharp.',
      dimensionAdvice:
        'Text-heavy documents of 15 to 30 pages comfortably fit under 500KB with standard formatting.',
    },
    tips: [
      {
        title: 'Ideal for LaTeX-generated academic papers',
        text: 'LaTeX PDFs often embed full Type 1 font families. ExactSize streamlines object streams to bring them under 500KB.',
      },
      {
        title: 'Preserve chart and graph clarity',
        text: 'Vector charts generated in matplotlib or R remain crisp and scalable at all zoom levels.',
      },
      {
        title: 'Eliminate duplicate metadata overhead',
        text: 'Multi-author editorial tools append bulky XML metadata that ExactSize cleans out safely.',
      },
      {
        title: 'Seamless peer-review sharing',
        text: 'A 500KB paper downloads instantly on reviewers’ mobile devices without cellular data delays.',
      },
    ],
    faqs: [
      {
        q: 'Will mathematical symbols and equations remain sharp at 500KB?',
        a: 'Yes. Mathematical notation and vector fonts are preserved mathematically and are never rasterized into blurry pixels.',
      },
      {
        q: 'Can I compress a 15-page financial audit to 500KB?',
        a: 'Yes. Multi-page spreadsheets and audits consisting of text and numerical tables compress very efficiently under 500KB.',
      },
      {
        q: 'Does ExactSize support encrypted tax documents?',
        a: 'Please remove the PDF password before processing, as browser security models cannot alter encrypted streams.',
      },
      {
        q: 'Is there a page count limit?',
        a: 'There is no hard page limit. The only constraint is your device’s browser memory capacity.',
      },
    ],
    relatedSizes: [
      { slug: '/compress-pdf-to-300kb', label: '300KB PDF', description: 'Application packet and legal filing ceiling' },
      { slug: '/compress-pdf-to-1mb', label: '1MB PDF', description: 'Extensive presentations and project proposals' },
      { slug: '/compress-image-to-500kb', label: '500KB Image', description: 'High-res portfolio and design image compression' },
    ],
  },

  '/compress-pdf-to-1mb': {
    slug: '/compress-pdf-to-1mb',
    fileType: 'pdf',
    targetPreset: '1MB',
    targetBytes: 1024 * 1024,
    badgeLabel: 'Extensive Document & Proposal Standard',
    title: 'Compress PDF to 1MB Online | ExactSize',
    metaDescription: 'Compress PDF to 1MB online for free. Ideal for large presentations, corporate proposals, and scanned document bundles. 100% private in-browser compression.',
    h1: 'Compress PDF to 1MB',
    tagline: 'Reduce large PDF presentations, project proposals, and scanned bundles to a clean 1MB target.',
    contextLead:
      'PDF exports from InDesign, Canva, or PowerPoint easily balloon to 20MB–50MB. While stunning, these giant files bounce off email filters and overwhelm client inboxes. ExactSize brings large PDF documents under the universal 1MB threshold.',
    useCaseOverview: {
      heading: 'The 1MB Universal Sweet Spot for Business Proposals & Decks',
      description:
        'A 1MB file is small enough to attach to any standard corporate email without triggering size warnings, yet generous enough to carry dozens of high-color slides, illustrations, and brand assets.',
      commonPortals: [
        'Corporate email attachments (bypassing 10MB relay limits)',
        'Client pitch decks and RFP proposal submissions',
        'Real estate brochures and architectural property packs',
        'Annual corporate reports and sustainability audits',
        'Scanned multi-page legal discovery bundles',
      ],
    },
    compressionDetails: {
      whatHappens:
        'ExactSize applies deep object stream compression, strips unreferenced objects, and optimizes embedded content streams to fit under 1,048,576 bytes.',
      dimensionAdvice:
        'A 1MB PDF comfortably accommodates 20 to 50 pages of rich content with color headings, tables, and illustrations.',
    },
    tips: [
      {
        title: 'Bypass corporate email attachment restrictions',
        text: 'Never worry about email bouncebacks again by keeping your client proposals strictly under 1MB.',
      },
      {
        title: 'Perfect for Canva and InDesign exports',
        text: 'Design tools export huge uncompressed streams by default. ExactSize streamlines them for instant viewing.',
      },
      {
        title: 'Ensure rapid mobile rendering',
        text: 'Clients on mobile phones can review your 1MB proposal without waiting for megabytes to stream.',
      },
      {
        title: 'Guaranteed confidential business proposals',
        text: 'Trade secrets, financial pricing, and client proposals never leave your computer.',
      },
    ],
    faqs: [
      {
        q: 'Why do my exported Canva and InDesign PDFs get so large?',
        a: 'Design software embeds complete font character sets, color profile tables, and uncompressed artwork metadata. ExactSize eliminates these redundancies to reach 1MB.',
      },
      {
        q: 'Can I send a 1MB PDF via Outlook without issues?',
        a: 'Yes. 1MB is universally accepted by all email providers including Outlook, Gmail, Apple Mail, and Yahoo.',
      },
      {
        q: 'What happens if my PDF is already under 1MB?',
        a: 'ExactSize verifies the file size. If it is already under 1MB, it preserves your original document without degradation.',
      },
      {
        q: 'Does compression affect bookmarks or clickable links?',
        a: 'Interactive table of contents links, bookmarks, and URLs are preserved throughout the optimization process.',
      },
    ],
    relatedSizes: [
      { slug: '/compress-pdf-to-500kb', label: '500KB PDF', description: 'Academic papers and quarterly financial audits' },
      { slug: '/compress-pdf-to-300kb', label: '300KB PDF', description: 'Application packets and legal filings' },
      { slug: '/compress-image-to-1mb', label: '1MB Image', description: 'Ultra-high resolution desktop and photo compression' },
    ],
  },
};
