import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'productIos',
    title: 'Product (iOS)',
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
            description: 'The URL path segment for this product (e.g., "android" or "ios"). MUST BE "ios" for this page to work.',
            validation: (Rule) => Rule.required(),
            initialValue: { current: 'ios' }
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero Heading Text',
            type: 'text',
            rows: 2,
            description: 'Main heading text. E.g. "BlockP\nfor iOS."',
            initialValue: 'BlockP\nfor iOS.',
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
                        { _type: 'step', title: 'How to Block\nPorn on iOS\nUsing BlockP', description: "", imagePath: '/product/ios/1.png' },
                        { _type: 'step', title: 'Set Up Smart Porn Blocking for iPhone', description: "BlockP gives powerful, AI-driven filtering to protect your iPhone from pornographic and harmful content. It’s fast, simple and effective. Available as an app for iOS devices and MacBook.", imagePath: '/product/ios/2.png' },
                        { _type: 'step', title: 'Customize Your Protection for You and Your Family', description: "BlockP’s custom blocking options help you set up filters that suit your needs. \nStandard porn blocker for basic adult content blocking\nAI-powered blocking for blocking all adult content and nudity\nBlockP VPN for blocking adult content across your internet to protect all connected devices.", imagePath: '/product/ios/3.png' },
                        { _type: 'step', title: 'Protect Kids with Advanced Parental Controls', description: "Use the Blocklist to block any website or Whitelist to allow access to only safe websites. Set up password protection and block social media features that put your kids at risk.", imagePath: '/product/ios/4.png' },
                        { _type: 'step', title: 'Improve Focus and Mental Well-being', description: "Reduce digital distractions and gain more mental clarity. BlockP helps you stay on task, reduce screen stress and sleep better.", imagePath: '/product/ios/5.png' },
                        { _type: 'step', title: 'Stay safe with Real-Time Detection and Safe Search', description: "Our real-time AI detection and Safe Search features make your browsing cleaner and safer – blocking not just porn, but also other unwanted things like social media, and gambling.", imagePath: '/product/ios/6new.png' }
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
                defineField({ name: 'sectionTitle', title: 'Section Heading', type: 'string', initialValue: 'Why do you need Porn Blocker for iPhone?' }),
                defineField({
                    name: 'cards',
                    title: 'Stat / Reason Cards',
                    type: 'array',
                    description: 'Each card is a short paragraph with a stat. Use **bold** for emphasis.',
                    initialValue: [
                        { _type: 'card', text: "Data from adult websites shows that **87%** of porn watching happens on phones. BlockP adds a digital barrier to prevent this rampant access." },
                        { _type: 'card', text: "**70%** of teens are exposed to explicit content online, often unintentionally. BlockP’s AI-powered filters act in real time to protect the children from accidental exposure to porn." },
                        { _type: 'card', text: "Over **85%** of teens own an iPhone with TikTok and Instagram as their favorite apps. The algorithms on these platforms often push explicit content in searches and reels even in restricted mode. BlockP protects your children by restricting the social media apps." },
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
                defineField({ name: 'sectionTitle', title: 'Section Heading', type: 'string', initialValue: 'Benefits of Using BlockP: Porn Blocker for iPhone' }),
                defineField({
                    name: 'items',
                    title: 'Benefit Items',
                    type: 'array',
                    initialValue: [
                        { _type: 'benefit', title: "Improve Mental Health", iconPath: "/product/android/benifits/network.svg", description: "Studies show that people who watch porn frequently are at a higher risk of emotional distress. BlockP keeps you safe from explicit content that causes feelings of guilt, shame, and anxiety." },
                        { _type: 'benefit', title: "Increase Productivity", iconPath: "/product/android/benifits/tune.svg", description: "Frequent digital interruptions reduce your productivity by 40% and it takes around 20 minutes to regain your focus after a distraction. BlockP helps to reduce exposure to not just porn but other distractions like social media to help you stay focused and productive." },
                        { _type: 'benefit', title: "Prevent Addiction", iconPath: "/product/android/benifits/favorite.svg", description: "Nearly 65% of all our daily actions are driven by habit. Easy access to porn reinforces habitual use which can turn addictive. BlockP helps to break the urge-action cycle and reduces cravings." },
                        { _type: 'benefit', title: "Prevent Trauma", iconPath: "/product/android/benifits/blocklist.svg", description: "Over 85% of teens use an iPhone and 71% of young adults are exposed to pornography online on social media and search results. BlockP keeps them safe from the trauma of accidental exposure to porn, nudity, and semi-nude content on their iPhones." },
                        { _type: 'benefit', title: "Improve Sleep Quality", iconPath: "/product/android/benifits/handshake.svg", description: "Watching stimulating content like porn on your iPhone before bedtime disrupts your sleep cycles. BlockP supports deeper and restful sleep by blocking late-night triggers that keep you awake." },
                        { _type: 'benefit', title: "Healthy Digital Habits", iconPath: "/product/android/benifits/focus.svg", description: "People spend more than 7 hours per day looking at screens, much of it in mindless scrolling and distractions. BlockP helps you learn intentional digital habits with its screen time management features." }
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
                defineField({ name: 'sectionTitle', title: 'Section Heading', type: 'string', initialValue: 'FAQs on BlockP: Porn Blocker\nfor iPhone' }),
                defineField({
                    name: 'faqs',
                    title: 'FAQ Items',
                    type: 'array',
                    initialValue: [
                        { _type: 'faqItem', question: "how to block porn on iphone", answer: "DNS filters and parental control on your iPhone can help you restrict porn. Adding a free porn blocker for iPhone like BlockP helps you block all porn and explicit content more effectively." },
                        { _type: 'faqItem', question: "how to block porn sites on an iphone", answer: "When you install a porn blocker for iPhone like BlockP, it automatically blocks millions of porn sites. You can add as many sites as you want to BlockP’s blocklist for more robust porn blocking." },
                        { _type: 'faqItem', question: "How to block Adults websites on my iPhone permanently", answer: "BlockP features like AI-powered filters, accountability partners, password protection, and uninstall prevention ensure more reliable blocking to prevent access to adult websites." }
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
                defineField({ name: 'sectionTitle', title: 'Section Title', type: 'string', initialValue: 'Why BlockP Is the Best App to Block porn on an iPhone?' }),
                defineField({ name: 'description1', title: 'First Paragraph', type: 'text', rows: 3, initialValue: 'BlockP is one of the best porn blocker for iOS to filter adult content from your iPhone. You can stay away from pornography with our customized filtering technology, website and app blocker.' }),
                defineField({ name: 'listHeading', title: 'List Heading', type: 'string', initialValue: 'Our powerful free porn blocker app can:' }),
                defineField({ name: 'listItems', title: 'List Items', type: 'array', of: [{ type: 'string' }], initialValue: [
                    "Help you stay away from adult websites and other distractions",
                    "Filter pornography in real-time with AI-powered filters",
                    "Whitelist feature to control accessible content",
                    "Accountability partner and password protection help you stay porn-free",
                    "Block distracting applications like social media",
                    "Block any website, be it pornography, gambling or anything else"
                ]}),
                defineField({ name: 'description2', title: 'Last Paragraph', type: 'text', rows: 3, initialValue: 'Discover all the unique features of the BlockP free porn blocker for iPhone, including keyword and website blocking, social media controls, and many more by downloading the BlockP app from the App store.' }),
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