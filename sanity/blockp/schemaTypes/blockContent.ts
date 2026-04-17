// import {defineType, defineArrayMember, defineField} from 'sanity'

import { defineType, defineArrayMember, defineField } from 'sanity'
import { HelpCircle, Minus } from 'lucide-react'


export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    // ── Standard Rich Text Block ──────────────────────────────────
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Arrow List →', value: 'bullet' },
        { title: 'Check List ✓', value: 'check' },
        { title: 'Numbered List', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Underline', value: 'underline' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),

    // ── Image Block ───────────────────────────────────────────────
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Required: describes the image for screen readers and SEO.',
          validation: (Rule) => Rule.required().warning('Alt text improves accessibility and SEO.'),
        }),
      ],
    }),

    defineArrayMember({
      type: 'object',
      name: 'faqBlock',
      title: 'FAQ Block',
      icon: HelpCircle,
      fields: [
        defineField({
          name: 'items',
          title: 'FAQ Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'faqItem',
              title: 'Question & Answer',
              fields: [
                defineField({
                  name: 'question',
                  title: 'Question',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'answer',
                  title: 'Answer',
                  type: 'text',
                  rows: 4,
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: { title: 'question', subtitle: 'answer' },
              },
            }),
          ],
        }),
      ],
      preview: {
        select: { items: 'items' },
        prepare({ items }) {
          const count = items?.length ?? 0
          return {
            title: `FAQ Block`,
            subtitle: `${count} question${count !== 1 ? 's' : ''}`,
          }
        },
      },
    }),

    defineArrayMember({
      type: 'object',
      name: 'sectionDivider',
      title: 'Section Divider',
      icon: Minus,
      fields: [
        // No config needed — purely decorative
        defineField({
          name: 'key',
          title: 'Key',
          type: 'string',
          hidden: true,
          initialValue: () => Math.random().toString(36).slice(2),
        }),
      ],
      preview: {
        prepare() {
          return { title: '─── Section Divider ───' }
        },
      },
    }),
  ],
})