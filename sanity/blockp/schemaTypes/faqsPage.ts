import { defineField, defineType } from 'sanity'

/**
 * FAQS PAGE SCHEMA
 * One document per language.
 *
 * Powers the dedicated /faqs route (app/[lang]/faqs/page.tsx).
 * Currently the FAQs page reads from `pageTranslations.ts` — this
 * schema will replace that once wired up in Phase 1.
 *
 * Fields:
 *  1. language  — ISO code, used to filter the right document
 *  2. title     — Page title ("FAQs")
 *  3. faqItems  — Array of question + answer pairs
 *  4. seo       — Meta title + description
 */
export default defineType({
    name: 'faqsPage',
    title: 'FAQs Page',
    type: 'document',

    fields: [

        // ─── LANGUAGE ────────────────────────────────────────────
        defineField({
            name: 'language',
            title: 'Language',
            type: 'string',
            description: 'ISO language code for this document (e.g. "en", "es", "fr", "hi"). Create one document per language.',
            options: {
                list: [
                    { title: 'English', value: 'en' },
                    { title: 'Spanish', value: 'es' },
                    { title: 'French', value: 'fr' },
                    { title: 'Hindi', value: 'hi' },
                    { title: 'Portuguese', value: 'pt' },
                    { title: 'German', value: 'de' },
                    { title: 'Italian', value: 'it' },
                    { title: 'Arabic', value: 'ar' },
                    { title: 'Chinese (Simplified)', value: 'zh' },
                    { title: 'Japanese', value: 'ja' },
                    { title: 'Korean', value: 'ko' },
                    { title: 'Russian', value: 'ru' },
                    { title: 'Turkish', value: 'tr' },
                    { title: 'Dutch', value: 'nl' },
                    { title: 'Polish', value: 'pl' },
                ],
            },
            validation: (Rule) => Rule.required(),
            initialValue: 'en',
        }),

        // ─── PAGE TITLE ───────────────────────────────────────────
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            description: 'Large heading shown at the top of the FAQs page. E.g. "FAQs"',
            initialValue: 'FAQs',
            validation: (Rule) => Rule.required(),
        }),

        // ─── FAQ ITEMS ────────────────────────────────────────────
        defineField({
            name: 'faqItems',
            title: 'FAQ Items',
            type: 'array',
            description: 'Each item is an expandable question + answer accordion row. Add as many as you need. They appear in the order listed here.',
            of: [
                {
                    type: 'object',
                    name: 'faqItem',
                    title: 'FAQ Item',
                    fields: [
                        defineField({
                            name: 'question',
                            title: 'Question',
                            type: 'string',
                            description: 'The question shown in the accordion header.',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'answer',
                            title: 'Answer',
                            type: 'text',
                            rows: 6,
                            description: 'The answer shown when the accordion is expanded. You can use newlines to create paragraphs.',
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'question',
                            subtitle: 'answer',
                        },
                        prepare(selection: Record<string, string>) {
                            const { title, subtitle } = selection
                            return {
                                title: title,
                                subtitle: subtitle ? subtitle.slice(0, 80) + '…' : '',
                            }
                        },
                    },
                },
            ],
        }),

        // ─── SEO ──────────────────────────────────────────────────
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            description: 'Meta title and description for search engines.',
            fields: [
                defineField({
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                    description: 'Page title in browser tab and Google results. Keep under 60 characters.',
                    initialValue: 'Frequently Asked Questions — BlockP',
                    validation: (Rule) => Rule.max(70),
                }),
                defineField({
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    rows: 3,
                    description: 'Short summary for search results. Keep under 160 characters.',
                    initialValue: 'Find answers to the most common questions about BlockP — the #1 AI-powered porn blocker for Android, iOS, macOS, Chrome, and Windows.',
                    validation: (Rule) => Rule.max(200),
                }),
            ],
        }),
    ],

    preview: {
        select: {
            language: 'language',
            title: 'title',
        },
        prepare(selection: Record<string, string>) {
            const { language, title } = selection
            return {
                title: `${title ?? 'FAQs Page'} (${language?.toUpperCase() ?? '??'})`,
            }
        },
    },
})
