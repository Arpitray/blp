import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'productMicrosoft',
    title: 'Product (Microsoft / Windows)',
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
            description: 'Internal reference name (e.g. "Microsoft").',
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
            description: 'The URL path segment for this product (e.g., "microsoft"). MUST BE "microsoft" for this page to work.',
            validation: (Rule) => Rule.required(),
            initialValue: { current: 'microsoft' }
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero Heading Text',
            type: 'text',
            rows: 2,
            description: 'Main heading text. E.g. "BlockP\nfor Windows."',
            initialValue: 'BlockP\nfor Windows.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'storeBadge',
            title: 'Store Download Badge',
            type: 'image',
            description: 'Image of the store badge (e.g., "Download for Windows").',
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
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string', validation: (Rule) => Rule.max(70) }),
                defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, validation: (Rule) => Rule.max(200) }),
            ],
        }),
        defineField({
            name: 'platformsBannerTitle',
            title: 'Platforms Banner Title',
            type: 'string',
            description: 'Text above the platform icons row. E.g. "Stay protected on all platforms"',
            initialValue: 'Stay protected on all platforms',
        }),
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
                        { _type: 'step', title: 'How Does BlockP Porn Blocker for Windows Work?', description: "", imagePath: '/product/windows/1.png' },
                        { _type: 'step', title: 'Just One Click to Block Porn Instantly', description: "Download and install the BlockP porn blocker app for Windows from the Play Store. Open the App to get started.", imagePath: '/product/windows/2.png' },
                        { _type: 'step', title: 'Block the Websites and Keywords That Tempt You', description: "Allow Accessibility permissions to BlockP to activate full porn protection across apps and browsers.", imagePath: '/product/windows/3.png' },
                        { _type: 'step', title: 'Use Custom Blocking Features to Stay Strong', description: "You can block social media, gambling and other distractions on your computer with BlockP.", imagePath: '/product/windows/4.png' },
                        { _type: 'step', title: 'Stop Yourself from Disabling It', description: "Sometimes, when urges are strong, we try to turn the blocker off. That’s why this porn blocker for Windows features powerful settings, including Add accountability partner, Prevent Uninstall, Block Incognito Mode, long sentence password, and Block Guest Mode.", imagePath: '/product/windows/5.png' }
                    ],
                    of: [{
                        type: 'object',
                        name: 'step',
                        fields: [
                            defineField({ name: 'title', title: 'Step Title', type: 'string', validation: (Rule) => Rule.required() }),
                            defineField({ name: 'description', title: 'Step Description', type: 'text', rows: 3 }),
                            defineField({ name: 'imagePath', title: 'Image Path (in /public)', type: 'string', description: 'e.g. /product/windows/1.png' }),
                        ],
                        preview: { select: { title: 'title', subtitle: 'description' } },
                    }],
                }),
            ],
        }),
        defineField({
            name: 'whySection',
            title: 'Why Do You Need a Blocker — Section',
            type: 'object',
            fields: [
                defineField({ name: 'sectionTitle', title: 'Section Heading', type: 'string', initialValue: 'Why do you need a Porn Blocker for Windows?' }),
                defineField({
                    name: 'cards',
                    title: 'Stat / Reason Cards',
                    type: 'array',
                    description: 'Each card is a short paragraph with a stat. Use **bold** for emphasis.',
                    initialValue: [
                        { _type: 'card', text: "**Digital distractions** can reduce productivity by **40%** and after every distraction, you need 20 minutes to refocus. Research has found that website blockers (like BlockP) help to reduce the distracted time by **91%**." },
                        { _type: 'card', text: "Most young people encounter porn when they are **alone and at home**. BlockP secures shared systems to prevent the trauma of **accidental exposure**." },
                        { _type: 'card', text: "**60%** of people admit to watching porn at work. If you are struggling with **porn addiction** and it's affecting your work performance, BlockP porn blocker for windows will help eliminate the distraction of porn." },
                        { _type: 'card', text: "**More than 65%** of our daily actions are **habit driven** and happen on autopilot. BlockP adds a layer of friction that prevents automatic behavior triggered by digital cues." }
                    ],
                    of: [{ type: 'object', name: 'card', fields: [defineField({ name: 'text', title: 'Card Text', type: 'text', rows: 3, validation: (Rule) => Rule.required() })], preview: { select: { title: 'text' }, prepare(s: Record<string, string>) { return { title: s.title?.slice(0, 80) } } } }],
                }),
            ],
        }),
        defineField({
            name: 'benefitsSection',
            title: 'Benefits Section',
            type: 'object',
            fields: [
                defineField({ name: 'sectionTitle', title: 'Section Heading', type: 'string', initialValue: 'Benefits of Using BlockP Porn Blocker for Windows' }),
                defineField({
                    name: 'items',
                    title: 'Benefit Items',
                    type: 'array',
                    initialValue: [
                        { _type: 'benefit', title: "Protect Your Children", iconPath: "", description: "BlockP protects your children from adult websites, explicit content, nudity, misleading ads and links that expose them to inappropriate content. It protects the mental health of your children." },
                        { _type: 'benefit', title: "Learn Healthy Digital Habits", iconPath: "", description: "BlockP is designed to not just block porn but give you complete control over what you view on your device. You can regulate your screen time and social media use with BlockP for learning intentional digital consumption." },
                        { _type: 'benefit', title: "Break Porn Addiction", iconPath: "", description: "BlockP is your greatest ally in quitting porn. It blocks your triggers to prevent relapse. Accountability, community support, and porn-blocking features of BlockP help you stay porn-free in the long term." },
                        { _type: 'benefit', title: "Improve Productivity", iconPath: "", description: "BlockP helps to remove distractions like porn, social media, shopping, and gambling sites. Intentional and focused use boosts your productivity at work and studies." }
                    ],
                    of: [{
                        type: 'object',
                        name: 'benefit',
                        fields: [
                            defineField({ name: 'title', title: 'Benefit Title', type: 'string', validation: (Rule) => Rule.required() }),
                            defineField({ name: 'iconPath', title: 'Icon Path (in /public)', type: 'string', description: 'e.g. /product/windows/benifits/network.svg' }),
                            defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
                        ],
                        preview: { select: { title: 'title', subtitle: 'description' }, prepare(s: Record<string, string>) { return { title: s.title, subtitle: s.subtitle?.slice(0, 60) } } },
                    }],
                }),
            ],
        }),
        defineField({
            name: 'faqsSection',
            title: 'FAQs Section (Product Page)',
            type: 'object',
            fields: [
                defineField({ name: 'sectionTitle', title: 'Section Heading', type: 'string', initialValue: 'FAQs on BlockP: Porn Blocker for Windows' }),
                defineField({
                    name: 'faqs',
                    title: 'FAQ Items',
                    type: 'array',
                    initialValue: [
                        { _type: 'faqItem', question: "How to block porn sites on Windows", answer: "You can block porn sites on your mobile by downloading the BlockP free porn blocker software for Windows from our website." },
                        { _type: 'faqItem', question: "What is the best free porn blocker for Windows?", answer: "BlockP is the best free porn blocker that supports porn blocking across browsers and apps." },
                        { _type: 'faqItem', question: "Can BlockP block content in incognito mode?", answer: "Yes. BlockP can block explicit content even if you are using incognito mode." },
                        { _type: 'faqItem', question: "Is using a blocker a good step toward self-control?", answer: "Yes. BlockP features like whitelisting and social media blocking are designed to support your self-control and focus when you are online." },
                        { _type: 'faqItem', question: "How does blocking triggers improve focus and productivity?", answer: "Triggers are mental distractions that make behaviors automatic. When the triggers are blocked, you can break the habit loop to make better decisions." }
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
        defineField({
            name: 'bestBlockerSection',
            title: 'Best Blocker Section',
            type: 'object',
            fields: [
                defineField({ name: 'sectionTitle', title: 'Section Title', type: 'string', initialValue: 'Why BlockP Is The Best Porn Blocker for Windows?' }),
                defineField({ name: 'description1', title: 'First Paragraph', type: 'text', rows: 3, initialValue: "BlockP creates a safe online environment for your entire family. \n\nIt makes self-control effortless for grown-ups to resist online distractions and improve their focus. It protects the younger ones from accidental exposure to porn and helps them learn responsible digital behavior." }),
                defineField({ name: 'listHeading', title: 'List Heading', type: 'string', initialValue: "" }),
                defineField({ name: 'listItems', title: 'List Items', type: 'array', of: [{ type: 'string' }], initialValue: [
                    "It is easy to install, with a user-friendly interface and offers immediate protection.",
                    "Inappropriate content across browsers and apps will be detected and blocked.",
                    "You can create a ‘blacklist’ of specific websites and keywords that you do not want to see.",
                    "You can completely block or limit specific features of social media platforms."
                ]}),
                defineField({ name: 'description2', title: 'Last Paragraph', type: 'text', rows: 3, initialValue: "Whether you want to quit porn or learn healthy digital habits to reclaim your focus, BlockP supports your goals. Download the BlockP free porn blocker for windows today and secure your computer." }),
                defineField({ name: 'desktopImagePath', title: 'Desktop Image Path', type: 'string', initialValue: '/product/android/desktop.svg' }),
                defineField({ name: 'phoneImagePath', title: 'Phone Image Path', type: 'string', initialValue: '/product/android/phone.svg' }),
            ],
        }),
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
