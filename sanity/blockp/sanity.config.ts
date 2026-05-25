import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '../../schemaTypes'
import { SlugEditorPane } from './components/SlugEditorPane'
import { languages } from './languages'

export default defineConfig({
  name: 'default',
  title: 'BlockP',

  projectId: 'pl6zt5cf',
  dataset: 'test',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('BlockP Content')
          .items([

            // ─── 📄 PAGES ──────────────────────────────────────────
            S.listItem()
              .title('📄 Pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([

                    // Homepage (one doc per language — list all)
                    S.listItem()
                      .title('Homepage')
                      .schemaType('homepage')
                      .child(
                        S.documentTypeList('homepage')
                          .title('Homepage — Select Language')
                      ),

                    // Premium Page (one doc per language)
                    S.listItem()
                      .title('Premium Page')
                      .schemaType('premiumPage')
                      .child(
                        S.documentTypeList('premiumPage')
                          .title('Premium Page — Select Language')
                      ),

                    // FAQs Page (one doc per language)
                    S.listItem()
                      .title('FAQs Page')
                      .schemaType('faqsPage')
                      .child(
                        S.documentTypeList('faqsPage')
                          .title('FAQs Page — Select Language')
                      ),
                  ])
              ),

            S.divider(),

            // ─── 📱 PRODUCTS ───────────────────────────────────────
            S.listItem()
              .title('📱 Products')
              .child(
                S.list()
                  .title('Products')
                  .items([
                    S.listItem()
                      .title('Android')
                      .schemaType('productAndroid')
                      .child(S.documentTypeList('productAndroid').title('Android - Select Language')),
                    S.listItem()
                      .title('iOS')
                      .schemaType('productIos')
                      .child(S.documentTypeList('productIos').title('iOS - Select Language')),
                    S.listItem()
                      .title('Chrome')
                      .schemaType('productChrome')
                      .child(S.documentTypeList('productChrome').title('Chrome - Select Language')),
                    S.listItem()
                      .title('MacBook')
                      .schemaType('productMacos')
                      .child(S.documentTypeList('productMacos').title('MacBook - Select Language')),
                    S.listItem()
                      .title('Windows')
                      .schemaType('productMicrosoft')
                      .child(S.documentTypeList('productMicrosoft').title('Windows - Select Language')),
                  ])
              ),

            S.divider(),

            // ─── 📝 BLOG ──────────────────────────────────────────
            S.listItem()
              .title('📝 Blog')
              .child(
                S.list()
                  .title('Blog')
                  .items([

                    S.listItem()
                      .title('Posts (By Slug)')
                      .child(
                        S.documentTypeList('postMetadata')
                          .title('Posts (By Slug)')
                          .child(documentId =>
                            S.document()
                              .documentId(documentId)
                              .schemaType('postMetadata')
                              .views([
                                S.view.form(),
                                S.view
                                  .component(SlugEditorPane)
                                  .title('Manage Translations')
                              ])
                          )
                      ),

                    S.listItem()
                      .title('Posts (By Language)')
                      .child(
                        S.list()
                          .title('Languages')
                          .items(
                            languages.map((lang) =>
                              S.listItem()
                                .title(`${lang.title} Posts`)
                                .child(
                                  S.documentList()
                                    .title(`${lang.title} Posts`)
                                    .schemaType('post')
                                    .filter('_type == "post" && language == $lang')
                                    .params({ lang: lang.id })
                                )
                            )
                          )
                      ),

                    S.listItem()
                      .title('All Posts (Unfiltered)')
                      .child(
                        S.documentList()
                          .title('All Posts')
                          .schemaType('post')
                          .filter('_type == "post"')
                      ),

                    S.divider(),

                    S.listItem()
                      .title('Authors')
                      .schemaType('author')
                      .child(S.documentTypeList('author').title('Authors')),

                    S.listItem()
                      .title('Categories')
                      .schemaType('category')
                      .child(S.documentTypeList('category').title('Categories')),
                  ])
              ),

            S.divider(),

            // ─── ⚙️ SETTINGS ──────────────────────────────────────
            S.listItem()
              .title('⚙️ Settings')
              .child(
                S.list()
                  .title('Settings')
                  .items([
                    S.listItem()
                      .title('Site Settings')
                      .schemaType('siteSettings')
                      .child(
                        S.documentTypeList('siteSettings')
                          .title('Site Settings')
                      ),
                    S.listItem()
                      .title('Footer')
                      .schemaType('footer')
                      .child(
                        S.documentTypeList('footer')
                          .title('Footer')
                      ),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes as any,
  },
})

