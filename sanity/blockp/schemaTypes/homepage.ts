import { defineField, defineType } from 'sanity'

/**
 * HOMEPAGE SCHEMA
 * Singleton document — only ONE homepage document should exist.
 * Covers every hardcoded section in app/[lang]/page.tsx
 *
 * Sections modelled:
 *  1. Hero (title, subtitle, CTA button, hero image, mascot)
 *  2. "As Seen On" logos
 *  3. "Stay protected on all platforms" list
 *  4. Stats (4.4 Star / 1M+ Downloads / 20K+ Reviews)
 *  5. Testimonials carousel
 *  6. "How can you stop watching porn?" cards
 *  7. FAQ accordion
 *  8. SEO meta (title + description)
 */
export default defineType({
    name: 'homepage',
    title: 'Homepage',
    type: 'document',

    fields: [

        // ─────────────────────────────────────────────────────────
        //  LANGUAGE  (one document per language)
        // ─────────────────────────────────────────────────────────
        defineField({
            name: 'language',
            title: 'Language',
            type: 'string',
            description: 'ISO language code for this document (e.g. "en", "es", "fr", "hi").',
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

        // ─────────────────────────────────────────────────────────
        //  1. HERO SECTION
        // ─────────────────────────────────────────────────────────
        defineField({
            name: 'hero',
            title: '1. Hero Section',
            type: 'object',
            description: 'The large blue gradient section at the very top of the homepage.',
            fields: [
                defineField({
                    name: 'title',
                    title: 'Main Heading',
                    type: 'string',
                    description: 'The big white H1 heading. Current: "BlockP: #1 Free AI porn blocker to increase your productivity"',
                    initialValue: 'BlockP: #1 Free AI porn blocker to increase your productivity',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'subtitle',
                    title: 'Subtitle / Description',
                    type: 'text',
                    rows: 4,
                    description: 'The paragraph below the heading.',
                    initialValue: 'Whether you want to block porn on your device or your child\'s, or even overcome a porn addiction online, BlockP is the #1 AI-Powered Porn Blocker, which is a free, reliable, and intuitive software program to steer clear of pornographic content on the Internet.',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'ctaText',
                    title: 'CTA Button Text',
                    type: 'string',
                    description: 'Text on the white download button.',
                    initialValue: 'Download Now',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'ctaUrl',
                    title: 'CTA Button URL',
                    type: 'string',
                    description: 'Where the button links. Use an internal path like /premium or a full URL.',
                    initialValue: '/premium',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'heroImage',
                    title: 'Hero Image (Right Side Dashboard)',
                    type: 'image',
                    description: 'The dashboard screenshot shown on the right side of the hero.',
                    options: { hotspot: true },
                }),
                defineField({
                    name: 'mascotImage',
                    title: 'Mascot Image (Bottom Center)',
                    type: 'image',
                    description: 'The mascot SVG/image shown at the bottom of the hero above the white curve.',
                    options: { hotspot: true },
                }),
            ],
        }),

        // ─────────────────────────────────────────────────────────
        //  2. "AS SEEN ON" SECTION
        // ─────────────────────────────────────────────────────────
        defineField({
            name: 'asSeenOn',
            title: '2. "As Seen On" Section',
            type: 'object',
            description: 'The logos row shown just below the hero (Google, Meta, Microsoft).',
            fields: [
                defineField({
                    name: 'sectionTitle',
                    title: 'Section Title',
                    type: 'string',
                    description: 'Heading above the logos. Current: "As seen on"',
                    initialValue: 'As seen on',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'logos',
                    title: 'Brand Logos',
                    type: 'array',
                    description: 'Add/remove/reorder brand logos.',
                    of: [
                        {
                            type: 'object',
                            name: 'logo',
                            title: 'Logo',
                            fields: [
                                defineField({
                                    name: 'name',
                                    title: 'Brand Name',
                                    type: 'string',
                                    description: 'Used as alt text (e.g. "Google")',
                                    validation: (Rule) => Rule.required(),
                                }),
                                defineField({
                                    name: 'logo',
                                    title: 'Logo Image',
                                    type: 'image',
                                    description: 'Upload the brand logo (SVG or PNG with transparent background).',
                                    options: { hotspot: true },
                                }),
                                defineField({
                                    name: 'localLogoPath',
                                    title: 'Local Logo Path (fallback)',
                                    type: 'string',
                                    description: 'Path to logo in /public folder, e.g. /landing/google.svg — used if no image uploaded above.',
                                }),
                            ],
                            preview: {
                                select: {
                                    title: 'name',
                                    media: 'logo',
                                },
                            },
                        },
                    ],
                }),
            ],
        }),

        // ─────────────────────────────────────────────────────────
        //  3. PLATFORMS SECTION
        // ─────────────────────────────────────────────────────────
        defineField({
            name: 'platforms',
            title: '3. Platforms Section',
            type: 'object',
            description: '"Stay protected on all platforms" — the row of 5 platform icons.',
            fields: [
                defineField({
                    name: 'sectionTitle',
                    title: 'Section Heading',
                    type: 'string',
                    initialValue: 'Stay protected on all platforms',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'platformList',
                    title: 'Platform List',
                    type: 'array',
                    description: 'Each platform shown with an icon and label.',
                    of: [
                        {
                            type: 'object',
                            name: 'platform',
                            title: 'Platform',
                            fields: [
                                defineField({
                                    name: 'name',
                                    title: 'Platform Name',
                                    type: 'string',
                                    description: 'Display label, e.g. "Android"',
                                    validation: (Rule) => Rule.required(),
                                }),
                                defineField({
                                    name: 'icon',
                                    title: 'Platform Icon',
                                    type: 'image',
                                    description: 'Upload platform icon (SVG preferred).',
                                    options: { hotspot: true },
                                }),
                                defineField({
                                    name: 'localIconPath',
                                    title: 'Local Icon Path (fallback)',
                                    type: 'string',
                                    description: 'Path in /public folder, e.g. /premium/android.svg',
                                }),
                                defineField({
                                    name: 'linkUrl',
                                    title: 'Platform Page URL',
                                    type: 'string',
                                    description: 'Route to the product page, e.g. /products/android',
                                }),
                            ],
                            preview: {
                                select: {
                                    title: 'name',
                                    media: 'icon',
                                },
                            },
                        },
                    ],
                }),
            ],
        }),

        // ─────────────────────────────────────────────────────────
        //  4. STATS SECTION
        // ─────────────────────────────────────────────────────────
        defineField({
            name: 'stats',
            title: '4. Stats Section',
            type: 'object',
            description: '"Join the millions who trust us" — the 3 icon + number + label cards.',
            fields: [
                defineField({
                    name: 'sectionTitle',
                    title: 'Section Heading',
                    type: 'string',
                    initialValue: 'Join the millions of users who trust us',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'statItems',
                    title: 'Stat Items',
                    type: 'array',
                    description: 'Each stat card: icon + big number/value + label.',
                    of: [
                        {
                            type: 'object',
                            name: 'stat',
                            title: 'Stat',
                            fields: [
                                defineField({
                                    name: 'icon',
                                    title: 'Icon Image',
                                    type: 'image',
                                    description: 'The illustration/icon for this stat (e.g. star icon for rating).',
                                    options: { hotspot: true },
                                }),
                                defineField({
                                    name: 'value',
                                    title: 'Stat Value',
                                    type: 'string',
                                    description: 'The big bold number/text, e.g. "4.4 Star" or "1M+ Downloads".',
                                    validation: (Rule) => Rule.required(),
                                }),
                                defineField({
                                    name: 'label',
                                    title: 'Stat Label',
                                    type: 'string',
                                    description: 'Smaller text below the value, e.g. "Average rating based on reviews".',
                                    validation: (Rule) => Rule.required(),
                                }),
                            ],
                            preview: {
                                select: {
                                    title: 'value',
                                    subtitle: 'label',
                                    media: 'icon',
                                },
                            },
                        },
                    ],
                }),
            ],
        }),

        // ─────────────────────────────────────────────────────────
        //  5. TESTIMONIALS SECTION
        // ─────────────────────────────────────────────────────────
        defineField({
            name: 'testimonials',
            title: '5. Testimonials Section',
            type: 'object',
            description: '"What our users say about us" — the review carousel.',
            fields: [
                defineField({
                    name: 'sectionTitle',
                    title: 'Section Heading',
                    type: 'string',
                    initialValue: 'What our users say about us',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'testimonialItems',
                    title: 'Testimonials',
                    type: 'array',
                    description: 'Add multiple testimonials. They will be displayed in a carousel.',
                    of: [
                        {
                            type: 'object',
                            name: 'testimonial',
                            title: 'Testimonial',
                            fields: [
                                defineField({
                                    name: 'quote',
                                    title: 'Quote / Review Text',
                                    type: 'text',
                                    rows: 4,
                                    description: 'The review text (without surrounding quotes — the UI adds them).',
                                    validation: (Rule) => Rule.required(),
                                }),
                                defineField({
                                    name: 'authorName',
                                    title: 'Reviewer Name',
                                    type: 'string',
                                    description: 'Full name of the reviewer.',
                                    validation: (Rule) => Rule.required(),
                                }),
                                defineField({
                                    name: 'authorRole',
                                    title: 'Reviewer Role / Label',
                                    type: 'string',
                                    description: 'e.g. "BlockP User" or "Verified Purchaser"',
                                    initialValue: 'BlockP User',
                                }),
                                defineField({
                                    name: 'rating',
                                    title: 'Star Rating (1–5)',
                                    type: 'number',
                                    description: 'Number of stars (whole numbers only, 1–5).',
                                    initialValue: 5,
                                    validation: (Rule) => Rule.min(1).max(5).integer(),
                                }),
                            ],
                            preview: {
                                select: {
                                    title: 'authorName',
                                    subtitle: 'quote',
                                },
                                prepare(selection: Record<string, string>) {
                                    const { title, subtitle } = selection
                                    return {
                                        title: title,
                                        subtitle: subtitle ? `"${subtitle.slice(0, 60)}…"` : '',
                                    }
                                },
                            },
                        },
                    ],
                }),
            ],
        }),

        // ─────────────────────────────────────────────────────────
        //  6. "HOW TO STOP WATCHING PORN" CARDS
        // ─────────────────────────────────────────────────────────
        defineField({
            name: 'stopWatching',
            title: '6. "How to Stop Watching Porn" Cards',
            type: 'object',
            description: 'The 2-column grid of tip cards (Meditation, Physical activity, etc.)',
            fields: [
                defineField({
                    name: 'sectionTitle',
                    title: 'Section Heading',
                    type: 'string',
                    initialValue: 'How can you stop watching porn?',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'cards',
                    title: 'Tip Cards',
                    type: 'array',
                    description: 'Each card has an image, title, and description. Displayed in a 2-column grid.',
                    of: [
                        {
                            type: 'object',
                            name: 'card',
                            title: 'Tip Card',
                            fields: [
                                defineField({
                                    name: 'title',
                                    title: 'Card Title',
                                    type: 'string',
                                    description: 'e.g. "Meditation" or "Physical activity"',
                                    validation: (Rule) => Rule.required(),
                                }),
                                defineField({
                                    name: 'description',
                                    title: 'Card Description',
                                    type: 'text',
                                    rows: 4,
                                    description: 'The paragraph text on the card.',
                                    validation: (Rule) => Rule.required(),
                                }),
                                defineField({
                                    name: 'image',
                                    title: 'Card Image',
                                    type: 'image',
                                    description: 'The illustration shown at the top of the card.',
                                    options: { hotspot: true },
                                }),
                            ],
                            preview: {
                                select: {
                                    title: 'title',
                                    media: 'image',
                                },
                            },
                        },
                    ],
                }),
            ],
        }),

        // ─────────────────────────────────────────────────────────
        //  7. FAQ SECTION (on homepage)
        // ─────────────────────────────────────────────────────────
        defineField({
            name: 'faq',
            title: '7. FAQ Accordion (on Homepage)',
            type: 'object',
            description: '"Have More Questions?" — the FAQ accordion at the bottom of the homepage.',
            fields: [
                defineField({
                    name: 'sectionTitle',
                    title: 'Section Heading',
                    type: 'string',
                    initialValue: 'Have More Questions?',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'faqItems',
                    title: 'FAQ Items',
                    type: 'array',
                    description: 'Each item is a question + answer. Displayed as an expandable accordion.',
                    of: [
                        {
                            type: 'object',
                            name: 'faqItem',
                            title: 'FAQ Item',
                            fields: [
                                defineField({
                                    name: 'question',
                                    title: 'Question',
                                    type: 'string',
                                    validation: (Rule) => Rule.required(),
                                }),
                                defineField({
                                    name: 'answer',
                                    title: 'Answer',
                                    type: 'text',
                                    rows: 4,
                                    validation: (Rule) => Rule.required(),
                                }),
                            ],
                            preview: {
                                select: {
                                    title: 'question',
                                },
                            },
                        },
                    ],
                }),
            ],
        }),

        // ─────────────────────────────────────────────────────────
        //  8. SEO
        // ─────────────────────────────────────────────────────────
        defineField({
            name: 'seo',
            title: '8. SEO Settings',
            type: 'object',
            description: 'Page title and meta description for search engines.',
            fields: [
                defineField({
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                    description: 'Appears in browser tab and Google results. Keep under 60 characters.',
                    initialValue: 'BlockP: #1 Free AI porn blocker to increase your productivity',
                    validation: (Rule) => Rule.max(70),
                }),
                defineField({
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    rows: 3,
                    description: 'Short summary shown in Google results. Keep under 160 characters.',
                    initialValue: 'Whether you want to block porn on your device or your child\'s, or even overcome a porn addiction online, BlockP is the #1 AI-Powered Porn Blocker.',
                    validation: (Rule) => Rule.max(200),
                }),
            ],
        }),
    ],

    preview: {
        select: {
            language: 'language',
            title: 'hero.title',
        },
        prepare(selection: Record<string, string>) {
            const { language, title } = selection
            return {
                title: `Homepage (${language?.toUpperCase() ?? '??'})`,
                subtitle: title,
            }
        },
    },
})
