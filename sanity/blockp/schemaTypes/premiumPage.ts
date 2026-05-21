import { defineField, defineType } from 'sanity'

/**
 * PREMIUM PAGE SCHEMA
 * Singleton document — one per language.
 *
 * Covers every text section in app/[lang]/premium/page.tsx:
 *  1. Hero (title lines, CTA button)
 *  2. Sub-heading (devices sub-heading)
 *  3. Pricing section (Free / Annual / Monthly cards)
 *     — labels, prices, feature list
 *  4. Testimonial (the blockquote at the bottom)
 *  5. SEO meta
 */
export default defineType({
    name: 'premiumPage',
    title: 'Premium Page',
    type: 'document',

    fields: [

        // ─── LANGUAGE ────────────────────────────────────────────
        defineField({
            name: 'language',
            title: 'Language',
            type: 'string',
            description: 'ISO language code (e.g. "en", "es", "fr", "hi").',
            options: {
                list: [
                    { title: 'English', value: 'en' },
                    { title: 'Spanish', value: 'es' },
                    { title: 'French', value: 'fr' },
                    { title: 'Hindi', value: 'hi' },
                    { title: 'Portuguese', value: 'pt' },
                    { title: 'German', value: 'de' },
                    { title: 'Italian', value: 'it' },
                    { title: 'Arabic', value: 'ar' },
                    { title: 'Chinese (Simplified)', value: 'zh' },
                    { title: 'Japanese', value: 'ja' },
                    { title: 'Korean', value: 'ko' },
                    { title: 'Russian', value: 'ru' },
                    { title: 'Turkish', value: 'tr' },
                    { title: 'Dutch', value: 'nl' },
                    { title: 'Polish', value: 'pl' },
                ],
            },
            validation: (Rule) => Rule.required(),
            initialValue: 'en',
        }),

        // ─── 1. HERO ─────────────────────────────────────────────
        defineField({
            name: 'hero',
            title: '1. Hero Section',
            type: 'object',
            description: 'The blue gradient section at the top with the giant "BlockP / Premium" text.',
            fields: [
                defineField({
                    name: 'titleLine1',
                    title: 'Heading Line 1',
                    type: 'string',
                    description: 'First line of the giant heading. E.g. "BlockP"',
                    initialValue: 'BlockP',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'titleLine2',
                    title: 'Heading Line 2',
                    type: 'string',
                    description: 'Second line of the giant heading. E.g. "Premium"',
                    initialValue: 'Premium',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'ctaText',
                    title: 'CTA Button Text',
                    type: 'string',
                    description: 'The white button text. E.g. "Start your free trial"',
                    initialValue: 'Start your free trial',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'ctaUrl',
                    title: 'CTA Button URL',
                    type: 'string',
                    description: 'Where the button links to (e.g. /get-started or https://...).',
                    initialValue: '/get-started',
                }),
            ],
        }),

        // ─── 2. SUB-HEADING (devices section) ────────────────────
        defineField({
            name: 'subheading',
            title: '2. Devices Sub-heading',
            type: 'text',
            rows: 3,
            description: 'The heading shown above the platform icons. E.g. "One subscription to keep you safe..."',
            initialValue: 'One subscription to keep you safe on every device',
            validation: (Rule) => Rule.required(),
        }),

        // ─── 3. PRICING SECTION ──────────────────────────────────
        defineField({
            name: 'pricing',
            title: '3. Pricing Section',
            type: 'object',
            description: 'The three pricing cards: Free, Annual, Monthly.',
            fields: [

                // ── Free Card ──────────────────────────────────
                defineField({
                    name: 'freeLabel',
                    title: 'Free Card Label',
                    type: 'string',
                    description: 'Heading of the free card. E.g. "Free forever"',
                    initialValue: 'Free forever',
                    validation: (Rule) => Rule.required(),
                }),

                // ── Annual Card ────────────────────────────────
                defineField({
                    name: 'annualLabel',
                    title: 'Annual Card Label',
                    type: 'string',
                    description: 'Heading of the annual card. E.g. "Annual"',
                    initialValue: 'Annual',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'annualPriceNote',
                    title: 'Annual Price Note',
                    type: 'string',
                    description: 'Small text next to "Annual". E.g. "($10 /mo billed annually)"',
                    initialValue: '($10 /mo billed annually)',
                }),

                // ── Monthly Card ───────────────────────────────
                defineField({
                    name: 'monthlyLabel',
                    title: 'Monthly Card Label',
                    type: 'string',
                    description: 'Heading of the monthly card. E.g. "Monthly"',
                    initialValue: 'Monthly',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'monthlyPriceNote',
                    title: 'Monthly Price Note',
                    type: 'string',
                    description: 'Small text next to "Monthly". E.g. "($10 /mo)"',
                    initialValue: '($10 /mo)',
                }),

                // ── CTA below pricing cards ────────────────────
                defineField({
                    name: 'pricingCtaText',
                    title: 'Pricing CTA Button Text',
                    type: 'string',
                    description: 'The blue button below the pricing cards. E.g. "Start your free trial"',
                    initialValue: 'Start your free trial',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'pricingCtaUrl',
                    title: 'Pricing CTA Button URL',
                    type: 'string',
                    description: 'Where the pricing CTA button links.',
                    initialValue: '/get-started',
                }),

                // ── Feature list (shared across cards) ────────
                defineField({
                    name: 'features',
                    title: 'Feature List',
                    type: 'array',
                    description: 'The list of features displayed in each pricing card. Order matters — they appear top to bottom. Free tier gets a dash (✗) for features beyond the first. Annual & Monthly get checkmarks for all.',
                    of: [
                        {
                            type: 'object',
                            name: 'feature',
                            title: 'Feature',
                            fields: [
                                defineField({
                                    name: 'label',
                                    title: 'Feature Label',
                                    type: 'string',
                                    description: 'e.g. "Standard content blocking" or "AI-powered blocking"',
                                    validation: (Rule) => Rule.required(),
                                }),
                                defineField({
                                    name: 'iconPath',
                                    title: 'Icon Path (in /public)',
                                    type: 'string',
                                    description: 'Path to icon in /public folder. e.g. /premium/pricing/free/no_adult_content.svg',
                                }),
                                defineField({
                                    name: 'includedInFree',
                                    title: 'Included in Free tier?',
                                    type: 'boolean',
                                    description: 'If OFF, the Free card shows a dash for this feature.',
                                    initialValue: false,
                                }),
                            ],
                            preview: {
                                select: {
                                    title: 'label',
                                    free: 'includedInFree',
                                },
                                prepare(selection: Record<string, unknown>) {
                                    const { title, free } = selection
                                    return {
                                        title: title as string,
                                        subtitle: free ? '✓ Free + Premium' : '— Premium only',
                                    }
                                },
                            },
                        },
                    ],
                }),
            ],
        }),

        // ─── 4. TESTIMONIAL ──────────────────────────────────────
        defineField({
            name: 'testimonial',
            title: '4. Featured Testimonial',
            type: 'object',
            description: 'The large blockquote testimonial shown at the bottom of the premium page.',
            fields: [
                defineField({
                    name: 'quote',
                    title: 'Quote',
                    type: 'text',
                    rows: 4,
                    description: 'The review text (without surrounding quotes).',
                    initialValue: 'The best blocker app. Light on battery usage compared to competitors, and powerful enough to not only block adult content but also block politics and other \'toxic\' stuff by adding my own custom keywords.',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'authorName',
                    title: 'Author Name',
                    type: 'string',
                    initialValue: 'Hendjati Pravito',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'authorRole',
                    title: 'Author Role',
                    type: 'string',
                    initialValue: 'BlockP User',
                }),
                defineField({
                    name: 'rating',
                    title: 'Star Rating (1–5)',
                    type: 'number',
                    initialValue: 5,
                    validation: (Rule) => Rule.min(1).max(5).integer(),
                }),
            ],
        }),

        // ─── 5. SEO ──────────────────────────────────────────────
        defineField({
            name: 'seo',
            title: '5. SEO Settings',
            type: 'object',
            fields: [
                defineField({
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                    initialValue: 'BlockP Premium — Upgrade for Advanced AI Porn Blocking',
                    validation: (Rule) => Rule.max(70),
                }),
                defineField({
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    rows: 3,
                    initialValue: 'Upgrade to BlockP Premium for AI-powered blocking, multi-device support, ad-free experience, and advanced custom keyword controls.',
                    validation: (Rule) => Rule.max(200),
                }),
            ],
        }),
    ],

    preview: {
        select: {
            language: 'language',
        },
        prepare(selection: Record<string, string>) {
            const { language } = selection
            return {
                title: `Premium Page (${language?.toUpperCase() ?? '??'})`,
            }
        },
    },
})
