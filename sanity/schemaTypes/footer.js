const footer = {
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [{
            name: 'logo',
            title: 'Logo Icon',
            type: 'image',
            description: 'Upload a square logo. Recommended size: 200x200px. Max: 500KB.',
            options: { hotspot: true },
            validation: (Rule) => Rule.required().assetRequired(),
        },
        {
            name: 'logoTitle',
            title: 'Logo Text',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description Text',
            type: 'text',
            rows: 3,
        },
        {
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
        },
        {
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'platform', type: 'string', title: 'Platform' },
                    { name: 'icon', type: 'image', title: 'Icon' },
                    { name: 'url', type: 'string', title: 'URL' }
                ]
            }]
        },
        {
            name: 'qrCode',
            title: 'QR Code',
            type: 'object',
            fields: [{
                    name: 'image',
                    type: 'image',
                    title: 'QR Image',
                    description: 'High-contrast QR code. Recommended: 400x400px.',
                    validation: (Rule) => Rule.required().assetRequired()
                },
                { name: 'text', type: 'string', title: 'Label Text' }
            ]
        },
        {
            name: 'downloadBadges',
            title: 'Download Badges',
            type: 'array',
            of: [{
                type: 'object',
                fields: [{
                        name: 'badge',
                        type: 'image',
                        title: 'Badge Image',
                        description: 'Store badge (e.g. App Store). Max width: 600px.',
                        validation: (Rule) => Rule.required().assetRequired()
                    },
                    { name: 'label', type: 'string', title: 'Platform Label' },
                    { name: 'url', type: 'string', title: 'URL' }
                ]
            }]
        },
        {
            name: 'columns',
            title: 'Link Columns',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'title', title: 'Column Title', type: 'string' },
                    {
                        name: 'links',
                        title: 'Links',
                        type: 'array',
                        of: [{
                            type: 'object',
                            fields: [
                                { name: 'label', type: 'string', title: 'Label' },
                                { name: 'url', type: 'string', title: 'URL' }
                            ]
                        }]
                    }
                ]
            }]
        }
    ],
};

export default footer;