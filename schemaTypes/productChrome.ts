import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'productChrome',
    title: 'Product (Chrome)',
    type: 'document',
    fields: [
        defineField({
            name: 'language',
            title: 'Language',
            type: 'string',
            description: 'ISO language code (e.g. "en", "es").',
            options: {
                list: [
                    { title: 'English', value: 'en' },
                    { title: 'Spanish', value: 'es' },
                    { title: 'French', value: 'fr' },
                    { title: 'Hindi', value: 'hi' },
                    { title: 'Portuguese', value: 'pt' },
                    { title: 'German', value: 'de' },
                ],
            },
            validation: (Rule) => Rule.required(),
            initialValue: 'en',
        }),
        defineField({
            name: 'name',
            title: 'Platform Name',
            type: 'string',
            description: 'Internal reference name (e.g. "Android", "iOS", "Windows").',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
                isUnique: () => true,
            },
            description: 'The URL path segment for this product (e.g., "android" or "ios"). MUST BE "chrome" for this page to work.',
            validation: (Rule) => Rule.required(),
            initialValue: { current: 'chrome' }
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero Heading Text',
            type: 'text',
            rows: 2,
            description: 'Main heading text. E.g. "BlockP\nfor Chrome."',
            initialValue: 'BlockP\nfor Chrome.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'storeBadge',
            title: 'Store Download Badge',
            type: 'image',
            description: 'Image of the store badge (e.g., "Get it on Google Play").',
            options: { hotspot: true },
        }),
        defineField({
            name: 'storeUrl',
            title: 'Store URL Link',
            type: 'url',
            description: 'Link that the store badge will direct the user to.',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero / Dashboard Image',
            type: 'image',
            description: 'The main dashboard or mascot graphic used in the blue dome section. Leave empty to use the default hardcoded image.',
            options: { hotspot: true },
        }),
        defineField({
            name: 'features',
            title: 'Feature Sections',
            type: 'array',
            description: 'List of features to highlight for this specific platform.',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Feature Title',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'description',
                            title: 'Feature Description',
                            type: 'text',
                            rows: 3,
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'image',
                            title: 'Feature Image',
                            type: 'image',
                            description: 'The graphic representing this feature. Leave empty to use default.',
                            options: { hotspot: true },
                        }),
                        defineField({
                            name: 'layout',
                            title: 'Layout Style',
                            type: 'string',
                            description: 'Choose how you want the image and text aligned on desktop.',
                            options: {
                                list: [
                                    { title: 'Image Left, Text Right', value: 'imageLeft' },
                                    { title: 'Image Right, Text Left', value: 'imageRight' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'imageLeft',
                            validation: (Rule) => Rule.required(),
                        })
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'layout',
                            media: 'image',
                        },
                        prepare(selection: any) {
                            const { title, subtitle, media } = selection
                            return {
                                title: title,
                                subtitle: subtitle === 'imageLeft' ? 'Image Left / Text Right' : 'Text Left / Image Right',
                                media: media
                            }
                        }
                    }
                },
            ],
        }),
        // ─── SEO ─────────────────────────────────────────────────
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string', validation: (Rule) => Rule.max(70) }),
                defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, validation: (Rule) => Rule.max(200) }),
            ],
        }),
        // ─── PLATFORMS BANNER ─────────────────────────────────────
        defineField({
            name: 'platformsBannerTitle',
            title: 'Platforms Banner Title',
            type: 'string',
            description: 'Text above the platform icons row. E.g. "Stay protected on all platforms"',
            initialValue: 'Stay protected on all platforms',
        }),
        // ─── PREMIUM CTA SECTION ──────────────────────────────────
        defineField({
            name: 'premiumSection',
            title: 'Premium CTA Section',
            type: 'object',
            description: 'The blue "BlockP Premium" call-to-action section on the product page.',
            fields: [
                defineField({ name: 'title', title: 'Title (e.g. "BlockP\\nPremium.")', type: 'text', rows: 2, initialValue: 'BlockP\nPremium.' }),
                defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2, initialValue: 'Stronger protection, full control, and priority support, so nothing stands in your way.' }),
                defineField({ name: 'ctaText', title: 'Button Text', type: 'string', initialValue: 'Start your free trial!' }),
                defineField({ name: 'ctaUrl', title: 'Button URL', type: 'string', initialValue: '/get-started' }),
            ],
        }),

        // ─── WHY SECTION ──────────────────────────────────────────
        defineField({
            name: 'whySection',
            title: 'Why Do You Need a Blocker — Section',
            type: 'object',
            fields: [
                defineField({ name: 'sectionTitle', title: 'Section Heading', type: 'string', initialValue: 'Why do you Need Porn Blocker Chrome Extension?' }),
                defineField({
                    name: 'cards',
                    title: 'Stat / Reason Cards',
                    type: 'array',
                    description: 'Each card is a short paragraph with a stat. Use **bold** for emphasis.',
                    initialValue: [
                        { _type: 'card', text: "Chrome accounts for **53%** of desktop porn browsing. As desktops are primarily used for work or study, easy access while browsing keeps the urges active and weakens self-control. BlockP protects deep focus by blocking triggering content on websites." },
                        { _type: 'card', text: "**33%** of people admit to visiting adult websites on personal computers that they also use for work. BlockP prevents the blurring of boundaries between work and browser distractions." },
                        { _type: 'card', text: "**60%** of people admit to watching porn at work. If you are struggling with porn addiction and it's affecting your work performance, BlockP Chrome extension will help you stay focused." },
                        { _type: 'card', text: "Most young people encounter porn when they are **alone and at home**. BlockP's Chrome extension secures shared systems while browsing to prevent the trauma of accidental exposure." }
                    ],
                    of: [{ type: 'object', name: 'card', fields: [defineField({ name: 'text', title: 'Card Text', type: 'text', rows: 3, validation: (Rule) => Rule.required() })], preview: { select: { title: 'text' }, prepare(s: Record<string, string>) { return { title: s.title?.slice(0, 80) } } } }],
                }),
            ],
        }),
        // ─── BENEFITS SECTION ─────────────────────────────────────
        defineField({
            name: 'benefitsSection',
            title: 'Benefits Section',
            type: 'object',
            fields: [
                defineField({ name: 'sectionTitle', title: 'Section Heading', type: 'string', initialValue: 'Benefits of Using BlockP Porn\nBlocker Chrome Extension' }),
                defineField({
                    name: 'items',
                    title: 'Benefit Items',
                    type: 'array',
                    initialValue: [
                        { _type: 'benefit', title: "Instant Porn Blocking", iconPath: "/product/android/benifits/network.svg", description: "When you have an urge to watch adult content, BlockP protects you by instantly blocking millions of adult websites with a single click without any complicated set-up." },
                        { _type: 'benefit', title: "User-Friendly Interface", iconPath: "/product/android/benifits/focus.svg", description: "Modify settings based on your needs easily with a simple user-friendly design." },
                        { _type: 'benefit', title: "Unlimited Customization", iconPath: "/product/android/benifits/blocklist.svg", description: "Add unlimited keywords and websites to the blocklist to create a blocking system based on your need." },
                        { _type: 'benefit', title: "Flexible Blocking", iconPath: "/product/android/benifits/tune.svg", description: "Get complete control over your browsing - decide what websites you want to allow and for how long." },
                        { _type: 'benefit', title: "Password Protection", iconPath: "/product/android/benifits/bypass.svg", description: "Secure BlockP settings with a password to prevent bypass or unauthorized changes" },
                        { _type: 'benefit', title: "Community Support", iconPath: "/product/android/benifits/community.svg", description: "Join BlockP's support community on Reddit and Discord to connect with others who are trying to quit porn and reclaim their lives." }
                    ],
                    of: [{
                        type: 'object',
                        name: 'benefit',
                        fields: [
                            defineField({ name: 'title', title: 'Benefit Title', type: 'string', validation: (Rule) => Rule.required() }),
                            defineField({ name: 'iconPath', title: 'Icon Path (in /public)', type: 'string', description: 'e.g. /product/android/benifits/network.svg' }),
                            defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
                        ],
                        preview: { select: { title: 'title', subtitle: 'description' }, prepare(s: Record<string, string>) { return { title: s.title, subtitle: s.subtitle?.slice(0, 60) } } },
                    }],
                }),
            ],
        }),
        // ─── FAQS SECTION ─────────────────────────────────────────
        defineField({
            name: 'faqsSection',
            title: 'FAQs Section (Product Page)',
            type: 'object',
            fields: [
                defineField({ name: 'sectionTitle', title: 'Section Heading', type: 'string', initialValue: 'FAQs on BlockP: Porn Blocker\nChrome extension' }),
                defineField({
                    name: 'faqs',
                    title: 'FAQ Items',
                    type: 'array',
                    initialValue: [
                        { _type: 'faqItem', question: "How to Block Porn on Chrome For Free?", answer: "Install the BlockP Chrome extension. You can block porn for free." },
                        { _type: 'faqItem', question: "Which is the best free porn blocker extension for teens or young adults?", answer: "BlockP is the best free porn blocker if you are looking to protect young adults from exposure to porn and teach them healthy digital habits." },
                        { _type: 'faqItem', question: "How to block porn sites permanently?", answer: "You can install a porn blocker like BlockP to block porn sites permanently." },
                        { _type: 'faqItem', question: "What does Porn Blocker chrome extension do?", answer: "A porn blocker Chrome extension like BlockP blocks adult websites along with nude and semi-nude content." },
                        { _type: 'faqItem', question: "Can BlockP extension help me quit porn addiction?", answer: "Yes. BlockP helps you block porn and other sexual content that triggers relapse." },
                        { _type: 'faqItem', question: "Does BlockP work in Incognito mode or private browsing?", answer: "Yes. BlockP Chrome extension blocks porn in incognito mode or private browsing." },
                        { _type: 'faqItem', question: "Does this extension block adult content on YouTube, Reddit, or Twitter?", answer: "Yes. BlockP extension blocks content on YouTube like Shorts and other social media platforms like Reddit and Twitter." },
                        { _type: 'faqItem', question: "Can this extension help during NoFap or digital detox journeys?", answer: "Yes. BlockP helps you block your triggers, track your streak to stay motivated, and learn better digital habits." }
                    ],
                    of: [{
                        type: 'object',
                        name: 'faqItem',
                        fields: [
                            defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
                            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
                        ],
                        preview: { select: { title: 'question' } },
                    }],
                }),
            ],
        }),
        // ─── BEST BLOCKER SECTION (e.g. Why BlockP is the best Android Blocker)
        defineField({
            name: 'bestBlockerSection',
            title: 'Best Blocker Section',
            type: 'object',
            fields: [
                defineField({ name: 'sectionTitle', title: 'Section Title', type: 'string', initialValue: 'Why BlockP Is The Best Porn Blocker Chrome Extension?' }),
                defineField({ name: 'description1', title: 'First Paragraph', type: 'text', rows: 3, initialValue: 'BlockP is an effective porn blocker for PC, offering a simple and fast way to block inappropriate sites in Chrome.' }),
                defineField({ name: 'listHeading', title: 'List Heading', type: 'string', initialValue: 'Key advantages include:' }),
                defineField({ name: 'listItems', title: 'List Items', type: 'array', of: [{ type: 'string' }], initialValue: [
                    "It is easy to install, with a user-friendly interface and offers immediate protection.",
                    "Inappropriate content across browsers will be detected and blocked by AI-powered filters",
                    "You can create a ‘blacklist’ of specific websites and keywords that you do not want to see.",
                    "You can completely block or limit specific features of social media platforms."
                ]}),
                defineField({ name: 'description2', title: 'Last Paragraph', type: 'text', rows: 3, initialValue: 'Discover all the unique features of the BlockP Chrome extension including keyword and website blocking, inspirational quotes, custom redirect URLs and many more by visiting the Chrome Web Store and downloading our extension today.' }),
                defineField({ name: 'desktopImagePath', title: 'Desktop Image Path', type: 'string', initialValue: '/product/android/desktop.svg' }),
                defineField({ name: 'phoneImagePath', title: 'Phone Image Path', type: 'string', initialValue: '/product/android/phone.svg' }),
            ],
        }),
        // ─── WEBSITE FEATURES SECTION (Rive Animations)
        defineField({
            name: 'websiteFeatures',
            title: 'Website Features (Rive Animations)',
            type: 'object',
            fields: [
                defineField({
                    name: 'features',
                    title: 'Features',
                    type: 'array',
                    initialValue: [
                        { _type: 'riveFeature', title: 'Keyword\nBlocking', description: 'Take control of your online experience by blocking specific words or phrases. Whether it\'s a trigger word or an annoying topic, BlockP ensures you never see it. Customize your blocklist and enjoy a cleaner, safer internet.', stateMachine: 'State Machine 1' },
                        { _type: 'riveFeature', title: 'Block \nApps', description: 'Easily restrict access to distracting or inappropriate apps. Whether you\'re trying to boost productivity or protect your kids, BlockP lets you manage app usage with just a few taps. Stay focused and in control.', stateMachine: 'State Machine 1' },
                        { _type: 'riveFeature', title: 'Safe Search', description: 'Ensure a family-friendly browsing experience across all search engines. Safe Search automatically filters out explicit images, videos, and websites from search results, providing peace of mind for you and your loved ones.', stateMachine: 'State Machine 1' },
                        { _type: 'riveFeature', title: 'Uninstall \nProtection', description: 'Keep your settings secure with Uninstall Protection. Prevent BlockP from being removed without authorization, ensuring that your blocking rules and safe search settings stay active at all times. Maximum security, zero compromise.', stateMachine: 'State Machine 1' }
                    ],
                    of: [{
                        type: 'object',
                        name: 'riveFeature',
                        fields: [
                            defineField({ name: 'stateMachine', title: 'State Machine Name', type: 'string', readOnly: true }),
                            defineField({ name: 'title', title: 'Title (use \\n for line breaks)', type: 'text', rows: 2 }),
                            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                        ],
                        preview: { select: { title: 'stateMachine', subtitle: 'title' } },
                    }],
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'slug.current',
            media: 'heroImage',
        },
    },
})