import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'productMacos',
    title: 'Product (macOS)',
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
            description: 'Internal reference name (e.g. "Android", "macOS").',
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
            description: 'The URL path segment for this product (e.g., "macos"). MUST BE "macos" for this page to work.',
            validation: (Rule) => Rule.required(),
            initialValue: { current: 'macos' }
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero Heading Text',
            type: 'text',
            rows: 2,
            description: 'Main heading text. E.g. "BlockP\nfor macOS."',
            initialValue: 'BlockP\nfor macOS.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'storeBadge',
            title: 'Store Download Badge',
            type: 'image',
            description: 'Image of the store badge (e.g., "Download for macOS").',
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
                        { _type: 'step', title: 'How Does BlockP Porn Blocker for Mac Work?', description: "", imagePath: '/product/macos/1.png' },
                        { _type: 'step', title: 'Block Porn on Browsers', description: "Choose the browsers you want to block porn on - Safari, Arc, Chrome, and Opera. You can also prevent uninstalling the extension on the Chrome browser in the settings for stronger protection.", imagePath: '/product/macos/2.png' },
                        { _type: 'step', title: 'Block the Websites and Keywords That Tempt You', description: "You can choose which websites or words to block. Add any porn site or trigger word to your block list, or just allow the safe ones with the whitelist. Our porn blocker for MacBook helps you avoid anything that pulls you back into bad habits.", imagePath: '/product/macos/3.png' },
                        { _type: 'step', title: 'Use Custom Blocking Features to Stay Strong', description: "You can block social media, restrict reels and searches, and block gambling and other distractions with BlockP. You can also add custom block messages and redirect links as a buffer when you try to access porn.", imagePath: '/product/macos/4.png' },
                        { _type: 'step', title: 'Stop Yourself from Disabling It', description: "Sometimes, when urges are strong, we try to turn the blocker off. That’s why BlockP porn blocker for MacBook, features powerful settings, including add accountability partner, prevent uninstall, and long sentence password.", imagePath: '/product/macos/5.png' }
                    ],
                    of: [{
                        type: 'object',
                        name: 'step',
                        fields: [
                            defineField({ name: 'title', title: 'Step Title', type: 'string', validation: (Rule) => Rule.required() }),
                            defineField({ name: 'description', title: 'Step Description', type: 'text', rows: 3 }),
                            defineField({ name: 'imagePath', title: 'Image Path (in /public)', type: 'string', description: 'e.g. /product/macos/1.png' }),
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
                defineField({ name: 'sectionTitle', title: 'Section Heading', type: 'string', initialValue: 'Why do you need a Porn Blocker for Mac?' }),
                defineField({
                    name: 'cards',
                    title: 'Stat / Reason Cards',
                    type: 'array',
                    description: 'Each card is a short paragraph with a stat. Use **bold** for emphasis.',
                    initialValue: [
                        { _type: 'card', text: "**60%** of people admit to watching porn at work. If you are struggling with porn addiction and it's affecting your work performance, BlockP porn blocker for MacBook, will help eliminate the distraction of porn." },
                        { _type: 'card', text: "**More than 50%** of remote workers admit to watching porn on the same device they use for work. BlockP reduces triggers and distractions to prevent impulsive browsing during work hours." },
                        { _type: 'card', text: "**20%** of the desktop traffic on adult websites comes from macOS devices and mostly through browsers other than Safari. BlockP filters porn across all major browsers for complete protection from porn." },
                        { _type: 'card', text: "**More than 65%** of our daily actions are habit-driven and happen on autopilot. BlockP adds a layer of friction that prevents automatic behavior triggered by digital cues." }
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
                defineField({ name: 'sectionTitle', title: 'Section Heading', type: 'string', initialValue: 'Benefits of Using BlockP Porn Blocker for MacBook' }),
                defineField({
                    name: 'items',
                    title: 'Benefit Items',
                    type: 'array',
                    initialValue: [
                        { _type: 'benefit', title: "Protect Your Children", iconPath: "", description: "BlockP protects your children from adult websites, explicit content, nudity, misleading ads, and links that expose them to inappropriate content. It protects the mental health of your children." },
                        { _type: 'benefit', title: "Learn Healthy Digital Habits", iconPath: "", description: "BlockP is designed to not just block porn but give you complete control over what you view on your device. You can regulate your screen time and social media use with BlockP for learning intentional digital consumption." },
                        { _type: 'benefit', title: "Break Porn Addiction", iconPath: "", description: "BlockP is your greatest ally in quitting porn. It blocks your triggers to prevent relapse on unlimited devices. Accountability and porn-blocking features of BlockP help you stay porn-free in the long term." },
                        { _type: 'benefit', title: "Improve Productivity", iconPath: "", description: "BlockP helps to remove distractions like porn, social media, and gambling sites. Intentional and focused use boosts your productivity at work and in studies." }
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
        defineField({
            name: 'faqsSection',
            title: 'FAQs Section (Product Page)',
            type: 'object',
            fields: [
                defineField({ name: 'sectionTitle', title: 'Section Heading', type: 'string', initialValue: 'FAQs on BlockP: Porn Blocker for MacBook' }),
                defineField({
                    name: 'faqs',
                    title: 'FAQ Items',
                    type: 'array',
                    initialValue: [
                        {
                            _type: 'faqItem',
                            question: "How do I block porn websites on my MacBook for free?",
                            answer: "You can block porn on Mac using built-in browser restrictions. If you want more reliable and real-time porn blocking, you can install BlockP porn blocker for MacBook. It uses AI-powered filters to block porn and also lets you add any website of your choice to the blacklist."
                        },
                        {
                            _type: 'faqItem',
                            question: "Can I block specific websites on Blockp for MacBook?",
                            answer: "Yes. You can add any specific website or keyword (unrelated to porn also) that you want to block to BlockP’s custom blocklist."
                        },
                        {
                            _type: 'faqItem',
                            question: "Can BlockP block adult websites instantly on MacBook?",
                            answer: "Yes. You can block adult websites instantly by activating the ‘Limit adult content’ on the BlockP dashboard."
                        },
                        {
                            _type: 'faqItem',
                            question: "Is BlockP safe to use on MacBook?",
                            answer: "BlockP is a device-based porn blocker, so your personal information and browsing data will not be shared with any external servers or third parties."
                        }
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
                defineField({ name: 'sectionTitle', title: 'Section Title', type: 'string', initialValue: 'Why BlockP Is The Best Porn Blocker for MacBook?' }),
                defineField({ name: 'description1', title: 'First Paragraph', type: 'text', rows: 3, initialValue: 'BlockP helps you make your digital environment safer and distraction-free. It reduces exposure to porn and explicit content to help you stay focused on your goals while keeping the younger ones safe from accidental exposure to porn.' }),
                defineField({ name: 'listHeading', title: 'List Heading', type: 'string', initialValue: 'Features that make BlockP the best:' }),
                defineField({ name: 'listItems', title: 'List Items', type: 'array', of: [{ type: 'string' }], initialValue: [
                    "It is easy to install, with a user-friendly interface, and offers immediate protection.",
                    "Inappropriate content across browsers and apps will be detected and blocked.",
                    "You use the unlimited blocklist and whitelist to control what you want to see.",
                    "You can completely block or limit specific features of social media platforms.",
                    "Use password protection and accountability partner settings to prevent bypass during moments of temptation."
                ]}),
                defineField({ name: 'description2', title: 'Last Paragraph', type: 'text', rows: 3, initialValue: 'Whether you want to quit porn or learn healthy digital habits to reclaim your focus, BlockP supports your goals. Download the BlockP free porn blocker for MacBook today for safe and distraction-free browsing.' }),
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
