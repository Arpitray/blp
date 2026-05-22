import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'productAndroid',
    title: 'Product (Android)',
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
            },
            description: 'The URL path segment for this product (e.g., "android" or "ios"). MUST BE "android" for this page to work.',
            validation: (Rule) => Rule.required(),
            initialValue: { current: 'android' }
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero Heading Text',
            type: 'text',
            rows: 2,
            description: 'Main heading text. E.g. "BlockP\nfor Android."',
            initialValue: 'BlockP\nfor Android.',
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
        // ─── SCROLL STEPS (How does it work) ──────────────────────
        defineField({
            name: 'scrollSteps',
            title: 'How It Works — Scroll Steps',
            type: 'object',
            description: 'The step-by-step section showing how to set up BlockP.',
            fields: [
                defineField({
                    name: 'steps',
                    title: 'Steps',
                    type: 'array',
                    initialValue: [
                        { _type: 'step', title: 'Install the App & Provide Essential Permissions', description: "A blocker needs deep access to Android to ensure it cannot be bypassed. During setup, you'll be prompted to grant permissions like Accessibility and Device Admin.", imagePath: '/product/android/onboard/1.png' },
                        { _type: 'step', title: 'Enable BlockP Protection', description: "Once permissions are granted, simply toggle the main switch to activate protection. BlockP will immediately begin filtering adult content across all browsers and apps.", imagePath: '/product/android/onboard/2.png' },
                        { _type: 'step', title: 'Customize Your Blocking Preferences', description: "Every journey is unique. You can enable Strict Mode to prevent uninstalling the app, or customize your blocked keywords and sites for a personalized safe space.", imagePath: '/product/android/onboard/3.png' }
                    ],
                    of: [{
                        type: 'object',
                        name: 'step',
                        fields: [
                            defineField({ name: 'title', title: 'Step Title', type: 'string', validation: (Rule) => Rule.required() }),
                            defineField({ name: 'description', title: 'Step Description', type: 'text', rows: 3 }),
                            defineField({ name: 'imagePath', title: 'Image Path (in /public)', type: 'string', description: 'e.g. /product/android/onboard/2.png' }),
                        ],
                        preview: { select: { title: 'title', subtitle: 'description' } },
                    }],
                }),
            ],
        }),
        // ─── WHY SECTION ──────────────────────────────────────────
        defineField({
            name: 'whySection',
            title: 'Why Do You Need a Blocker — Section',
            type: 'object',
            fields: [
                defineField({ name: 'sectionTitle', title: 'Section Heading', type: 'string', initialValue: 'Why do you need Porn Blocker for Android?' }),
                defineField({
                    name: 'cards',
                    title: 'Stat / Reason Cards',
                    type: 'array',
                    description: 'Each card is a short paragraph with a stat. Use **bold** for emphasis.',
                    initialValue: [
                        { _type: 'card', text: "Data from adult websites shows that **87%** of porn watching happens on phones. BlockP adds a digital barrier to prevent this rampant access." },
                        { _type: 'card', text: "**67.7%** of porn access on smartphones happens on Android devices. BlockP helps to secure all apps and browsers on Android devices to block porn, nudity, and semi-nude content." },
                        { _type: 'card', text: "**70%** of teens are exposed to explicit content online, often unintentionally. BlockP’s AI-powered filters act in real time to protect the children from accidental exposure to porn." },
                        { _type: 'card', text: "A typical tween (8 to 12 years) spends around **6 hours** per day on their phone and the smartphone use time goes up to **8 hours** for teens. BlockP helps parents to regulate screen time and teach healthy digital behaviors." },
                        { _type: 'card', text: "Digital distractions can reduce productivity by **40%** and it takes **23 minutes** to refocus. BlockP helps to protect you from porn and other online distractions like social media, shopping apps etc. to protect your focus and boost productivity." },
                        { _type: 'card', text: "Research shows that problematic porn use is strongly linked to easy and convenient access of porn on **mobile phones.** If you are trying to quit porn, BlockP prevents easy access to porn and blocks triggering content to protect you from relapse." }
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
                defineField({ name: 'sectionTitle', title: 'Section Heading', type: 'string', initialValue: 'Benefits of using a porn blocker' }),
                defineField({
                    name: 'items',
                    title: 'Benefit Items',
                    type: 'array',
                    initialValue: [
                        { _type: 'benefit', title: "Increased Focus & Productivity", iconPath: "/product/android/benifits/network.svg", description: "By removing the distraction and temptation of adult content, you can reclaim hours of your day. This newfound time and mental energy can be redirected towards your personal goals, work, and hobbies." },
                        { _type: 'benefit', title: "Healthier Brain Chemistry", iconPath: "/product/android/benifits/health.svg", description: "Consistent consumption of adult content can alter dopamine pathways. A blocker helps break this cycle, allowing your brain to reset and find pleasure in everyday, real-world activities and achievements." },
                        { _type: 'benefit', title: "Better Mental Health", iconPath: "/product/android/benifits/mental_health.svg", description: "Many users report reduced anxiety, lower levels of depression, and a significant decrease in brain fog after quitting porn. A reliable blocker is a powerful tool to support this mental health journey." },
                        { _type: 'benefit', title: "Improved Relationships", iconPath: "/product/android/benifits/relationships.svg", description: "Without the unrealistic expectations often created by adult content, you can foster deeper, more authentic connections with your partner and experience greater satisfaction in real-world intimacy." }
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
                defineField({ name: 'sectionTitle', title: 'Section Heading', type: 'string', initialValue: 'FAQs' }),
                defineField({
                    name: 'faqs',
                    title: 'FAQ Items',
                    type: 'array',
                    initialValue: [
                        { _type: 'faqItem', question: "How to block porn on Android for free?", answer: "Install the BlockP app from the Google Play Store. The free version offers robust, basic protection to block adult websites effectively." },
                        { _type: 'faqItem', question: "Which is the best free porn blocker for teens or young adults?", answer: "BlockP is highly recommended. It offers strong un-bypassable features, making it ideal for protecting teens and young adults from adult content." },
                        { _type: 'faqItem', question: "How to block porn sites permanently on Android?", answer: "By installing BlockP and enabling features like Strict Mode and Uninstall Protection, you can create a nearly permanent barrier against adult sites." },
                        { _type: 'faqItem', question: "What does the BlockP Android app do?", answer: "It actively monitors web traffic and app usage to instantly block access to adult websites, nudity, and customized keywords on your Android device." },
                        { _type: 'faqItem', question: "Can the BlockP app help me quit porn addiction?", answer: "Yes. By removing the immediate accessibility of adult content, BlockP provides the necessary friction to help break the cycle of addiction." },
                        { _type: 'faqItem', question: "Does BlockP work in Incognito mode or private browsing?", answer: "Yes! BlockP uses accessibility and VPN-like services to filter content across all browsers, including Incognito and private tabs." },
                        { _type: 'faqItem', question: "Does this app block adult content on YouTube, Reddit, or Twitter?", answer: "Absolutely. BlockP is designed to filter out NSFW content and adult material even within popular social media and video apps." },
                        { _type: 'faqItem', question: "Can this app help during NoFap or digital detox journeys?", answer: "Yes, it is an essential companion for NoFap. It eliminates triggers, helping you maintain your streak and successfully complete your digital detox." }
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
                defineField({ name: 'sectionTitle', title: 'Section Title', type: 'string', initialValue: 'Why BlockP Is The Best Porn Blocker App For Android' }),
                defineField({ name: 'description1', title: 'First Paragraph', type: 'text', rows: 3, initialValue: 'BlockP is the best Android porn blocker because it offers an uncompromising, multi-layered approach to content filtering. While many blockers rely on simple DNS filtering that can be easily bypassed, BlockP combines advanced AI analysis with deep system-level integration.' }),
                defineField({ name: 'listHeading', title: 'List Heading', type: 'string', initialValue: 'Key advantages include:' }),
                defineField({ name: 'listItems', title: 'List Items', type: 'array', of: [{ type: 'string' }], initialValue: [
                    "Un-bypassable protection with advanced uninstall prevention.",
                    "Real-time AI scanning that catches new and hidden adult sites.",
                    "Customizable blocklists and keyword filtering for your specific needs.",
                    "Lightweight design that won't drain your Android's battery."
                ]}),
                defineField({ name: 'description2', title: 'Last Paragraph', type: 'text', rows: 3, initialValue: 'By securing your device at its core, BlockP ensures that your digital environment remains safe, clean, and entirely under your control.' }),
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