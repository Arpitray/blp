import { defineType, defineField } from 'sanity'
import { languages } from '../sanity/blockp/languages'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',

  groups: [
    { name: 'content', title: '📝 Content', default: true },
    { name: 'seo', title: '🔍 SEO' },
  ],

  fields: [
    // ─── RELATIONSHIP ───────────────────────────────────────
    defineField({
      name: 'metadata',
      title: 'Post Metadata (Shared)',
      type: 'reference',
      to: [{ type: 'postMetadata' }],
      group: 'content',
      description: 'Link this localized version to the shared post metadata (Slug, Hero, Author, etc.)',
      validation: (Rule) => Rule.required(),
    }),

    // ─── CONTENT ────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'The main headline shown large on the blog post page.',
      validation: (Rule) => Rule.required().min(10).max(120),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description:
        'A short 1–2 sentence summary shown on blog cards. Keep it under 160 characters.',
      validation: (Rule) => Rule.max(200),
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content',
      description:
        'Full article content. Use H2 and H3 headings — these are automatically extracted to build the Table of Contents sidebar.',
    }),

    // ─── SEO ────────────────────────────────────────────────
    defineField({
      name: 'metaTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description:
        'Overrides the page <title> tag. Leave blank to use the post title.',
      validation: (Rule) => Rule.max(60),
    }),

    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
      group: 'seo',
      description:
        'Overrides the meta description. Leave blank to use the Excerpt.',
      validation: (Rule) => Rule.max(160),
    }),

    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),

    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      group: 'seo',
      initialValue: 'en',
      options: {
        list: languages.map(lang => ({ title: lang.title, value: lang.id }))
      }
    }),
  ],

  preview: {
    select: {
      title: 'title',
      language: 'language',
      metadataSlug: 'metadata.slug.current',
    },
    prepare({ title, language, metadataSlug }) {
      return {
        title: title || metadataSlug || 'Untitled Post',
        subtitle: `Language: ${language?.toUpperCase() || '??'}`,
      }
    },
  },
})
