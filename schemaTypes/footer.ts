import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'footer',
    title: 'Footer',
    type: 'document',

    fields: [
        // ─── CTA SECTION (ABOVE FOOTER) ──────────────────────
        defineField({
            name: 'cta',
            title: 'CTA Section (Above Footer)',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    title: 'CTA Title',
                    type: 'string',
                    initialValue: 'Hero text some more text today!',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'buttonText',
                    title: 'Button Text',
                    type: 'string',
                    initialValue: 'Download for Free',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'buttonUrl',
                    title: 'Button URL',
                    type: 'string',
                    initialValue: '/',
                    validation: (Rule) => Rule.required(),
                }),
            ],
            description: 'The "Hero Text" and button shown directly above the blue footer section on every page.',
        }),

        // ─── LEFT COLUMN ─────────────────────────────────────
        defineField({
            name: 'logo',
            title: 'Logo Image',
            type: 'image',
            description: 'The logo image displayed in the footer left section. Will appear in white box.',
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: 'logoTitle',
            title: 'Logo Title',
            type: 'string',
            description: 'The text next to the logo (e.g., "BlockP.")',
            initialValue: 'BlockP.',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'description',
            title: 'Footer Description',
            type: 'text',
            rows: 4,
            description: 'Main description text shown in the left column.',
            validation: (Rule) => Rule.required().max(500),
            initialValue: 'BlockP: Porn and Website Blocker. BlockP is the best porn blocker which offers a safe browsing experience with its exceptional safety and security features.',
        }),

        defineField({
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
            description: 'Email displayed with envelope icon.',
            validation: (Rule) => Rule.required().email(),
            initialValue: 'support@blockp.io',
        }),

        // ─── SOCIAL LINKS ────────────────────────────────────
        defineField({
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'array',
            of: [
                defineField({
                    type: 'object',
                    name: 'socialLink',
                    title: 'Social Link',
                    fields: [
                        defineField({
                            name: 'platform',
                            title: 'Platform Name',
                            type: 'string',
                            description: 'e.g., Facebook, Instagram, Twitter, YouTube, Reddit, LinkedIn',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                            description: 'The link to your social media profile.',
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'platform',
                            subtitle: 'url',
                        },
                    },
                }),
            ],
            description: 'Social media links. Icons will be rendered using hardcoded SVGs based on platform name (Facebook, Instagram, X, YouTube, Reddit, LinkedIn).',
        }),

        // ─── QR CODE ──────────────────────────────────────────
        defineField({
            name: 'qrCode',
            title: 'QR Code Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'image',
                    title: 'QR Code Image',
                    type: 'image',
                    description: 'The QR code image to display.',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'text',
                    title: 'QR Code Label',
                    type: 'string',
                    description: 'Label below the QR code (e.g., "BlockP for mobile")',
                    initialValue: 'BlockP for mobile',
                    validation: (Rule) => Rule.required(),
                }),
            ],
            description: 'QR code with label for mobile app.',
        }),

        // ─── DOWNLOAD BADGES ──────────────────────────────────
        defineField({
            name: 'downloadBadges',
            title: 'Download Badges',
            type: 'array',
            of: [
                defineField({
                    type: 'object',
                    name: 'badge',
                    title: 'Download Badge',
                    fields: [
                        defineField({
                            name: 'badge',
                            title: 'Badge Image',
                            type: 'image',
                            description: 'Badge image (e.g., Mac App Store, Chrome Web Store badges).',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'label',
                            title: 'Badge Label',
                            type: 'string',
                            description: 'Label beneath badge (e.g., "BlockP for Mac OS")',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'url',
                            title: 'Download URL',
                            type: 'url',
                            description: 'Where the badge links to.',
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'label',
                            media: 'badge',
                        },
                    },
                }),
            ],
            description: 'Download badges shown in the bottom left (App Store, Chrome Web Store, etc.).',
        }),

        // ─── FOOTER COLUMNS (LINKS) ───────────────────────────
        defineField({
            name: 'columns',
            title: 'Footer Columns',
            type: 'array',
            of: [
                defineField({
                    type: 'object',
                    name: 'column',
                    title: 'Column',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Column Title',
                            type: 'string',
                            description: 'e.g., "Documentation", "Products", "Helpful resources"',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'links',
                            title: 'Links',
                            type: 'array',
                            of: [
                                defineField({
                                    type: 'object',
                                    name: 'link',
                                    title: 'Link',
                                    fields: [
                                        defineField({
                                            name: 'label',
                                            title: 'Link Label',
                                            type: 'string',
                                            validation: (Rule) => Rule.required(),
                                        }),
                                        defineField({
                                            name: 'url',
                                            title: 'External URL',
                                            type: 'string',
                                            description: 'Use for external links only (https://...).',
                                        }),
                                        defineField({
                                            name: 'internalPath',
                                            title: 'Internal Slug or Path',
                                            type: 'string',
                                            description: 'Use route slug/path only (e.g. privacy-policy or /privacy-policy). It will resolve to /{lang}/{slug}.',
                                            options: {
                                                list: [
                                                    { title: 'Privacy Policy', value: '/privacy-policy' },
                                                    { title: 'Terms and Conditions', value: '/terms-and-conditions' },
                                                    { title: 'FAQs', value: '/faqs' },
                                                    { title: 'Premium', value: '/premium' },
                                                    { title: 'Data Deletion', value: '/data-deletion' },
                                                ],
                                            },
                                        }),
                                        defineField({
                                            name: 'linkValidation',
                                            title: 'Link Validation',
                                            type: 'string',
                                            hidden: true,
                                            validation: (Rule) =>
                                                Rule.custom((_, context) => {
                                                    const parent = context.parent as { url?: string; internalPath?: string } | undefined
                                                    if (parent?.url || parent?.internalPath) return true
                                                    return 'Provide either External URL or Internal Page Path.'
                                                }),
                                        }),
                                    ],
                                    preview: {
                                        select: {
                                            title: 'label',
                                            subtitle: 'url',
                                        },
                                    },
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                        },
                    },
                }),
            ],
            description: 'Navigation columns on the right side of footer.',
        }),
    ],

    preview: {
        select: {
            title: 'logoTitle',
            media: 'logo',
        },
        prepare(selection) {
            return {
                title: selection.title || 'Footer',
                media: selection.media,
            }
        },
    },
})
