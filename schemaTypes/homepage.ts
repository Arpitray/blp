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
                    description: 'The big white H1 heading. Current: "BlockP: #1 Free AI porn blocker \\nto increase your productivity"',
                    initialValue: 'BlockP: #1 Free AI porn blocker \nto increase your productivity',
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
                defineField({
                    name: 'fallbackMascotImageUrl',
                    title: 'Fallback Mascot Image URL',
                    type: 'string',
                    description: 'Image path or URL used if no mascot image is uploaded. E.g. /landing/maskot.svg',
                    initialValue: '/landing/maskot.svg',
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
                    initialValue: [
                        { _key: 'google', _type: 'logo', name: 'Google', localLogoPath: '/landing/google.svg' },
                        { _key: 'meta', _type: 'logo', name: 'Meta', localLogoPath: '/landing/meta.svg' },
                        { _key: 'microsoft', _type: 'logo', name: 'Microsoft', localLogoPath: '/landing/microsoft.svg' }
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
                    initialValue: [
                        { _key: 'android', _type: 'platform', name: 'Android', localIconPath: '/premium/android.svg' },
                        { _key: 'ios', _type: 'platform', name: 'iOS', localIconPath: '/premium/ios.svg' },
                        { _key: 'macos', _type: 'platform', name: 'macOS', localIconPath: '/premium/MacOS_logo.svg' },
                        { _key: 'chrome', _type: 'platform', name: 'Chrome', localIconPath: '/premium/chrome.svg' },
                        { _key: 'windows', _type: 'platform', name: 'Windows', localIconPath: '/premium/windows.svg' }
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
                                    name: 'fallbackImageUrl',
                                    title: 'Fallback Icon URL',
                                    type: 'string',
                                    description: 'Icon URL used if no image is uploaded. E.g. https://...',
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
                    initialValue: [
                        { _key: 'stat1', _type: 'stat', fallbackImageUrl: '/landing/star_shine.svg', value: '4.4 Star', label: 'Average rating based on reviews' },
                        { _key: 'stat2', _type: 'stat', fallbackImageUrl: '/landing/download.svg', value: '1M+ Downloads', label: 'Across all platforms' },
                        { _key: 'stat3', _type: 'stat', fallbackImageUrl: '/landing/thumbs_up_double.svg', value: '20K+ Reviews', label: 'On google play store' }
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
                    initialValue: [
                        { _key: 'test1', _type: 'testimonial', quote: 'The best blocker app. Light on battery usage compared to competitors, and powerful enough to not only block adult content but also block politics and other \'toxic\' stuff by adding my own custom keywords.', authorName: 'Herdjati Pravito', authorRole: 'BlockP User', rating: 5 }
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
                                defineField({
                                    name: 'fallbackImageUrl',
                                    title: 'Fallback Image URL',
                                    type: 'string',
                                    description: 'Image URL used if no image is uploaded.',
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
                    initialValue: [
                        { _key: 'card1', _type: 'card', title: 'Meditation', description: 'The art of meditation helps you to get away from your urges. You can listen to calming music or use a meditation app. BlockP also has a feature that reduces your urge when you feel like giving up. It also has a meditation mode which can help you concentrate and understand the main cause of your addiction.', fallbackImageUrl: '/landing/stop-watching-placeholder.svg' },
                        { _key: 'card2', _type: 'card', title: 'Physical activity', description: 'To tackle your addiction healthily, pick a sport you enjoy or hit the gym. This way you can stay physically fit and tackle your urges.', fallbackImageUrl: '/landing/stop-watching-placeholder.svg' },
                        { _key: 'card3', _type: 'card', title: 'Seek help from your close ones', description: 'Sometimes it is difficult to handle a problem alone and it is okay to seek help from your friends and family. Getting through it can be difficult, when you know you will get sudden urges that are hard to resist.', fallbackImageUrl: '/landing/stop-watching-placeholder.svg' },
                        { _key: 'card4', _type: 'card', title: 'Prioritize your values', description: 'Everyone has some values that they need to prioritize to live a moral and good life. By doing this, it will help to let go of things that aren\'t right for you. Start by understanding your values and aligning yourself with them. Gradually you will understand what is important to you and what is not.', fallbackImageUrl: '/landing/stop-watching-placeholder.svg' },
                        { _key: 'card5', _type: 'card', title: 'Consult a sexologist', description: 'They can help you understand the underlying cause of your addiction, it could be anything like relationship problems, emotional problems, family problems, etc.', fallbackImageUrl: '/landing/stop-watching-placeholder.svg' },
                        { _key: 'card6', _type: 'card', title: 'Install a porn blocker', description: 'Installing a porn blocker on your device would help control your sudden urges; BlockP is the best adult content blocker that will act as a barrier, driving you to act consciously.', fallbackImageUrl: '/landing/stop-watching-placeholder.svg' },
                        { _key: 'card7', _type: 'card', title: 'Join a support group', description: 'It can be difficult to face this alone, joining a support group of people going through the same thing will give you more confidence. Having a support network can offer new viewpoints and coping techniques, as well as a sense of understanding. To join this type of community we have BlockP Community. Join Now!', fallbackImageUrl: '/landing/stop-watching-placeholder.svg' },
                        { _key: 'card8', _type: 'card', title: 'Replace the habit', description: 'Redirect your energy into a healthy hobby or passion project that fills the gap – like reading, art, music, or learning a new skill. Creative pursuits fill your time, reduce boredom and uplift your mood.', fallbackImageUrl: '/landing/stop-watching-placeholder.svg' }
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
                    initialValue: [
                        { _key: 'faq1', _type: 'faqItem', question: 'Is BlockP free?', answer: 'Yes! BlockP offers a free tier with standard content blocking. Upgrade to Premium for AI-powered blocking, multi-device support, and advanced features.' },
                        { _key: 'faq2', _type: 'faqItem', question: 'What platforms does BlockP support?', answer: 'BlockP works on Android, iOS, macOS, Chrome, and Windows — covering virtually every device your family uses.' },
                        { _key: 'faq3', _type: 'faqItem', question: 'Can my child bypass BlockP?', answer: 'BlockP uses advanced tamper-protection technology that makes it extremely difficult to bypass. Premium users get additional uninstall protection.' },
                        { _key: 'faq4', _type: 'faqItem', question: 'How does the AI blocking work?', answer: 'Our AI analyzes images and text in real-time across all apps — not just browsers. It detects explicit content even on platforms like YouTube, Instagram, and Reddit.' },
                        { _key: 'faq5', _type: 'faqItem', question: 'Is my data private?', answer: 'Absolutely. BlockP never stores or transmits your browsing data. All filtering happens locally on your device. Read our privacy policy for details.' }
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
