// Paste this into your Sanity Studio schemas folder

const siteSettings = {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [{
            name: 'title',
            title: 'Site Title / Header Text',
            type: 'string',
        },
        {
            name: 'logo',
            title: 'Site Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'ctaHeadline',
            title: 'Global CTA Headline',
            type: 'text',
            rows: 2,
            description: 'The big text above the button at the bottom of pages.',
        },
        {
            name: 'ctaButtonText',
            title: 'Global CTA Button Text',
            type: 'string',
        },
        {
            name: 'ctaButtonLink',
            title: 'Global CTA Button Link',
            type: 'string',
            description: 'The URL the button leads to.',
        },
    ],
};

export default siteSettings;