import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'postMetadata',
  title: 'Post Metadata',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Mainly for internal identification in the Studio list.',
    }),
    defineField({
      name: 'slug',
      title: 'Common Slug',
      type: 'slug',
      description: 'This slug will be used for all language versions of this post.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Shared across all languages.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'author',
      title: 'Written By',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      options: {
        dateFormat: 'DD MMMM YYYY',
        timeFormat: 'h:mm A',
      },
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isHidden',
      title: 'Is Hidden',
      type: 'boolean',
      description: 'If checked, this post will be hidden from all lists.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Metadata',
        subtitle: subtitle || 'No slug assigned',
        media,
      }
    },
  },
})
