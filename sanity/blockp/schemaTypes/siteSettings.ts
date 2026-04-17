import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'HREF', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'text',
    }),
    defineField({
      name: 'footerContact',
      title: 'Footer Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'ctaHeadline',
      title: 'CTA Headline',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'documentationLinks',
      title: 'Documentation Links',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'productLinks',
      title: 'Product Links',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})