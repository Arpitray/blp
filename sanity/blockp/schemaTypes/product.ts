import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'product',
    title: 'Product (Platforms)',
    type: 'document',
    fields: [
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
            description: 'The URL path segment for this product (e.g., "android" or "ios").',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero Heading Text',
            type: 'text',
            rows: 2,
            description: 'Main heading text. E.g. "BlockP\nfor Android."',
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
            description: 'The main dashboard or mascot graphic used in the blue dome section.',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
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
                            description: 'The graphic representing this feature.',
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
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'slug.current',
            media: 'heroImage',
        },
    },
})