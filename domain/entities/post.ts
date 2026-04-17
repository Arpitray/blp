export type TextSpan = {
  _type: 'span'
  text: string
  marks?: string[]
}

export type TextBlock = {
  _type: 'block'
  _key: string
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
  children: TextSpan[]
}

export type ImageBlock = {
  _type: 'image'
  _key: string
  asset: {
    _ref: string
    url: string
  }
  alt?: string
}

export type PortableTextBlock = TextBlock | ImageBlock

export type Heading = {
  text: string
  id: string
  style: string
}

export type PostCategory = {
  _id: string
  title?: string
}

export type Post = {
  id: string
  title: string
  slug: string
  description: string
  categories?: PostCategory[]
  // Legacy fallback for older payloads; prefer categories for all new UI code.
  category?: string
  publishedAt: string
  body: PortableTextBlock[]
  headings?: Heading[]
  author?: {
    name?: string
    credential?: string
    bio?: string
    linkedinUrl?: string
    image?: {
      asset?: {
        _ref?: string
      }
    }
  }
  authorId?: string
  isFeatured: boolean
  imageUrl?: string
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
}
