const POST_FIELDS = `
  "id": _id,
  title,
  "slug": coalesce(metadata->slug.current, slug.current),
  "description": excerpt,
  "imageUrl": coalesce(metadata->mainImage.asset->url, mainImage.asset->url),
  "publishedAt": coalesce(metadata->publishedAt, publishedAt),
  "categories": coalesce(metadata->categories[]->{ "_id": _id, "title": title }, categories[]->{ "_id": _id, "title": title }),
  "author": coalesce(metadata->author->{ name, credential, image { asset }, linkedinUrl, bio }, author->{ name, credential, image { asset }, linkedinUrl, bio }),
  "isFeatured": coalesce(metadata->isFeatured, isFeatured, false),
  "isHidden": coalesce(metadata->isHidden, false),
  language
`

export const PAGED_POSTS_QUERY = `
  *[_type == "post"
    && coalesce(metadata->isHidden, false) != true
    && (coalesce(metadata->isFeatured, isFeatured, false) != true)
    && ($category == "" || $category in coalesce(metadata->categories[]->title, categories[]->title))
    && ($lang == "" || language == $lang)
  ] | order(coalesce(metadata->publishedAt, publishedAt) desc) [$offset...$end] {
    ${POST_FIELDS}
  }
`

export const POST_COUNT_QUERY = `
  count(*[_type == "post"
    && coalesce(metadata->isHidden, false) != true
    && (coalesce(metadata->isFeatured, isFeatured, false) != true)
    && ($category == "" || $category in coalesce(metadata->categories[]->title, categories[]->title))
    && ($lang == "" || language == $lang)
  ])
`

export const FEATURED_POST_QUERY = `
  *[_type == "post" 
    && coalesce(metadata->isFeatured, isFeatured, false) == true 
    && coalesce(metadata->isHidden, false) != true
    && ($lang == "" || language == $lang)
  ] | order(coalesce(metadata->publishedAt, publishedAt) desc)[0] {
    ${POST_FIELDS}
  }
`

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" 
    && (metadata->slug.current == $slug || slug.current == $slug)
    && ($lang == "" || language == $lang)
  ][0] {
    ${POST_FIELDS},
    body[]{
      ...,
      _type == "image" => { ..., asset->{ url } }
    },
    metaTitle,
    metaDescription,
    keywords
  }
`

export const ALL_SLUGS_QUERY = `
  *[_type == "postMetadata" && defined(slug.current) && isHidden != true] { 
    "slug": slug.current 
  }
`

export const POSTS_BY_AUTHOR_QUERY = `
  *[_type == "post" 
    && (metadata->author._ref == $authorId || author._ref == $authorId) 
    && coalesce(metadata->isHidden, false) != true
  ] | order(coalesce(metadata->publishedAt, publishedAt) desc) {
    ${POST_FIELDS}
  }
`

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    title,
    logo { asset },
    navLinks,
    ctaHeadline,
    ctaButtonText,
    footerTagline,
    footerContact,
    documentationLinks,
    productLinks
  }
`

export const FOOTER_QUERY = `
  *[_type == "footer"][0] {
    cta { title, buttonText, buttonUrl },
    "logoUrl": logo.asset->url,
    logoTitle,
    description,
    contactEmail,
    socialLinks[] { platform, url },
    qrCode { "imageUrl": image.asset->url, text },
    downloadBadges[] { "badgeUrl": badge.asset->url, label, url },
    columns[] { title, links[] { label, url, internalPath } }
  }
`

export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    heroTitle,
    "storeBadgeUrl": storeBadge.asset->url,
    storeUrl,
    "heroImageUrl": heroImage.asset->url,
    features[] {
      title,
      description,
      layout,
      "imageUrl": image.asset->url
    }
  }
`

export const ALL_PRODUCT_SLUGS_QUERY = `
  *[_type == "product" && defined(slug.current)] {
    "slug": slug.current
  }
`
