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
                isUnique: () => true,
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
                        { _type: 'step', title: "How Does\nBlockP\nAndroid Porn\nBlocker Work?", description: "", imagePath: '/product/android/onboard/1.png' },
                        { _type: 'step', title: "Install BlockP", description: "Download and install the BlockP porn blocker app for Android from the Play Store. Open the app to get started.", imagePath: '/product/android/onboard/2.png' },
                        { _type: 'step', title: "Grant Permissions", description: "Allow the accessibility permissions to BlockP to accurately block adult content inside apps and browsers.", imagePath: '/product/android/onboard/3.png' },
                        { _type: 'step', title: "Turn on Blocking", description: "Tap 'Start Protection' to block porn and distracting content instantly.", imagePath: '/product/android/onboard/4.png' },
                        { _type: 'step', title: "Customize Your Filters", description: "Set up BlockP's custom filters to match your needs. On BlockP's dashboard you will see 3 modes of porn blocking:\n\n1. Off - No porn blocking\n2. Normal - Blocks common adult content\n3. Strict - Maximum protection from any porn, nudity, and potential triggers\n\nWith the custom options in the settings, you can fine-tune your protection by blocking apps, websites, keywords, and social media features based on your personal triggers.", imagePath: '/product/android/onboard/5.png' }
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
                        { 
                            _type: 'benefit', 
                            title: "AI-Powered Porn Blocking", 
                            iconPath: "/product/android/benifits/network.svg", 
                            description: "BlockP's AI-powered filters can detect nude, semi-nude, and AI-generated adult content. It can detect and block hidden or disguised content in real-time to keep you safe across browsers and apps." 
                        },
                        { 
                            _type: 'benefit', 
                            title: "Personalized Blocking", 
                            iconPath: "/product/android/benifits/tune.svg", 
                            description: "BlockP lets you customize your digital space with options to block specific keywords and websites that are triggering for you. You are in full control of what you see." 
                        },
                        { 
                            _type: 'benefit', 
                            title: "Social Media Blocking", 
                            iconPath: "/product/android/benifits/favorite.svg", 
                            description: "BlockP gives you greater control by letting you block searches, stories, and reels on social media platforms for distraction-free browsing. Platforms like Instagram have semi-nude content and Reddit has NSFW content. BlockP's AI-powered filters can detect and block such unsafe content on social media apps." 
                        },
                        { 
                            _type: 'benefit', 
                            title: "Blocklist & Whitelist", 
                            iconPath: "/product/android/benifits/blocklist.svg", 
                            description: "BlockP's blocklist is not restricted to adult websites. You can add any website that is distracting for you to this infinite blocklist. At the same time, you can permit seamless access to essential websites with the whitelist." 
                        },
                        { 
                            _type: 'benefit', 
                            title: "Accountability Partner", 
                            iconPath: "/product/android/benifits/handshake.svg", 
                            description: "Support from a loved one can help you stay consistent even during difficult moments. BlockP lets you create a system of support and commitment by adding a trusted friend or a parent as an accountability partner." 
                        },
                        { 
                            _type: 'benefit', 
                            title: "Focus Mode", 
                            iconPath: "/product/android/benifits/focus.svg", 
                            description: "BlockP's focus mode lets you block distracting apps and notifications to boost productivity. It lets you schedule periods of focus for working or studying without distraction from your phone" 
                        },
                        { 
                            _type: 'benefit', 
                            title: "Bypass Prevention", 
                            iconPath: "/product/android/benifits/bypass.svg", 
                            description: "BlockP lets you secure your settings with a password and set up uninstall prevention. So, even during your weakest moments you can not disable the blocker to watch porn." 
                        },
                        { 
                            _type: 'benefit', 
                            title: "Community Support", 
                            iconPath: "/product/android/benifits/community.svg", 
                            description: "Connect with others who are on a similar journey to quit porn through the Discord and Reddit support community of BlockP. Sharing experiences and connecting with others will motivate you to stay consistent on your quitting porn journey." 
                        }
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
                defineField({ name: 'sectionTitle', title: 'Section Heading', type: 'string', initialValue: 'FAQs on BlockP: Free Porn Blocker App for Android' }),
                defineField({
                    name: 'faqs',
                    title: 'FAQ Items',
                    type: 'array',
                    initialValue: [
                        { _type: 'faqItem', question: "How to block porn sites in mobile?", answer: "Block porn sites on your mobile with BlockP - the powerful porn blocker that instantly blocks millions of adult websites. DNS-filtering and parental control tools can also offer limited protection against porn sites." },
                        { _type: 'faqItem', question: "How to block porn on android phone?", answer: "Block porn and explicit content on your android phone with BlockP’s android app. It blocks all adult websites and uses AI-powered filters to block explicit content in real-time." },
                        { _type: 'faqItem', question: "How to block porn sites permanently?", answer: "To block porn sites permanently you need a combination of blocking with features to prevent bypass. BlockP gives you porn blocking and uninstall prevention features like password protection to block porn sites permanently." }
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
                defineField({ name: 'sectionTitle', title: 'Section Title', type: 'string', initialValue: 'Why BlockP Is The Best Porn Blocker App for Android?' }),
                defineField({ name: 'description1', title: 'First Paragraph', type: 'text', rows: 3, initialValue: 'BlockP is one of the best porn blocker apps for Android to filter adult content from your device. You can stay away from pornography with our customized filtering technology, website and app blocker.' }),
                defineField({ name: 'listHeading', title: 'List Heading', type: 'string', initialValue: 'Our adult content blocker can:' }),
                defineField({ name: 'listItems', title: 'List Items', type: 'array', of: [{ type: 'string' }], initialValue: [
                    "Help you stay away from adult websites and other distractions",
                    "Filter pornography in real-time with AI-powered filters",
                    "Whitelist feature to control accessible content",
                    "Accountability partner and password protection help you stay porn-free",
                    "Block distracting applications like social media",
                    "Block any website, be it pornography, gambling or anything else"
                ]}),
                defineField({ name: 'description2', title: 'Last Paragraph', type: 'text', rows: 3, initialValue: 'Discover all the unique features of the BlockP free porn blocker app for Android, including keyword and website blocking, social media controls, and many more by downloading the BlockP app from the Google Play Store.' }),
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