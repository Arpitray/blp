import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The name of the author.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'credential',
      title: 'Credential / Title',
      type: 'string',
      description: 'E.g., "board-certified Psychiatrist and Sexual Health Specialist"',
    }),
    defineField({
      name: 'image',
      title: 'Avatar Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn API / Social URL',
      type: 'url',
      description: 'The social link icon displayed by the author\'s name in their bio box.',
    }),
    defineField({
      name: 'bio',
      title: 'Bio Paragraph',
      type: 'text',
      rows: 4,
      description: 'A plain text paragraph providing background on the author, shown in the author bio box.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'credential',
      media: 'image',
    },
  },
})
