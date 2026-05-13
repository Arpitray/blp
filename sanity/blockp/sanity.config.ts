import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {SlugEditorPane} from './components/SlugEditorPane'
import {languages} from './languages'

export default defineConfig({
  name: 'default',
  title: 'BlockP',

  projectId: 'pl6zt5cf',
  dataset: 'test',

  plugins: [
    structureTool({
      structure: (S, context) => 
        S.list()
          .title('Content')
          .items([
            // Standard singletons & filtered types
            ...S.documentTypeListItems().filter(
              (listItem) => !['post', 'postMetadata'].includes(listItem.getId() as string)
            ),
            S.divider(),
            
            // ─── POSTS BY SLUG (New Parent Structure) ────────────────
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

            // ─── POSTS BY LANGUAGE (Legacy/Filtered View) ────────────
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
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
