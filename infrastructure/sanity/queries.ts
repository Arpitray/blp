const POST_FIELDS = `
  "id": _id,
  title,
  "slug": coalesce(metadata->slug.current, slug.current),
  "description": excerpt,
  "imageUrl": coalesce(metadata->mainImage.asset->url, mainImage.asset->url),
  "publishedAt": coalesce(metadata->publishedAt, publishedAt),
  "categories": coalesce(metadata->categories[]->{ "_id": _id, "title": title }, categories[]->{ "_id": _id, "title": title }),
  "author": coalesce(metadata->author->{ name, "slug": slug.current, credential, image { asset }, linkedinUrl, bio }, author->{ name, "slug": slug.current, credential, image { asset }, linkedinUrl, bio }),
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

export const AUTHOR_BY_SLUG_QUERY = `
  *[_type == "author" && (slug.current == $slug || slug.current == "author/" + $slug)][0] {
    _id,
    name,
    "slug": slug.current,
    credential,
    image { asset },
    linkedinUrl,
    bio
  }
`

export const POSTS_BY_AUTHOR_QUERY = `
  *[_type == "post" 
    && (
      coalesce(metadata->author->slug.current, author->slug.current) == $authorSlug ||
      coalesce(metadata->author->slug.current, author->slug.current) == "author/" + $authorSlug ||
      ($authorSlug == 'editorial-team' && !defined(coalesce(metadata->author, author)))
    )
    && coalesce(metadata->isHidden, false) != true
    && ($lang == "" || language == $lang)
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
  *[_type in ["productAndroid", "productIos", "productChrome", "productMacos", "productMicrosoft"] && slug.current == $slug && language == $lang][0] {
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
    },
    seo { metaTitle, metaDescription },
    platformsBannerTitle,
    premiumSection { title, subtitle, ctaText, ctaUrl },
    scrollSteps {
      steps[] { title, description, imagePath }
    },
    whySection {
      sectionTitle,
      cards[] { text }
    },
    benefitsSection {
      sectionTitle,
      items[] { title, iconPath, description }
    },
    faqsSection {
      sectionTitle,
      faqs[] { question, answer }
    },
    bestBlockerSection {
      sectionTitle,
      description1,
      listHeading,
      listItems,
      description2,
      desktopImagePath,
      phoneImagePath
    },
    websiteFeatures {
      features[] { stateMachine, title, description }
    }
  }
`

export const ALL_PRODUCT_SLUGS_QUERY = `
  *[_type in ["productAndroid", "productIos", "productChrome", "productMacos", "productMicrosoft"] && defined(slug.current)] {
    "slug": slug.current
  }
`

// ── Phase 1: Page Queries ─────────────────────────────────────────────────

export const HOMEPAGE_QUERY = `
  *[_type == "homepage" && language == $lang][0] {
    hero {
      title,
      subtitle,
      ctaText,
      ctaUrl,
      "heroImageUrl": heroImage.asset->url,
      "mascotImageUrl": coalesce(mascotImage.asset->url, fallbackMascotImageUrl)
    },
    asSeenOn {
      sectionTitle,
      logos[] { name, "logoUrl": coalesce(logo.asset->url, localLogoPath), localLogoPath }
    },
    platforms {
      sectionTitle,
      platformList[] { name, "iconUrl": coalesce(icon.asset->url, localIconPath), localIconPath, linkUrl }
    },
    stats {
      sectionTitle,
      statItems[] { "iconUrl": coalesce(icon.asset->url, fallbackImageUrl), value, label }
    },
    testimonials {
      sectionTitle,
      testimonialItems[] { quote, authorName, authorRole, rating }
    },
    stopWatching {
      sectionTitle,
      cards[] { title, description, "imageUrl": coalesce(image.asset->url, fallbackImageUrl) }
    },
    benefitsQuittingPorn {
      sectionTitle,
      cards[] { title, description, "imageUrl": coalesce(image.asset->url, fallbackImageUrl) }
    },
    whyNeedPornBlocker {
      title,
      paragraph1,
      paragraph2,
      "imageUrl": coalesce(image.asset->url, fallbackImageUrl)
    },
    typesOfPornBlockers {
      sectionTitle,
      cards[] { title, description, exampleText }
    },
    benefitsUsingBlocker {
      sectionTitle,
      subtitle,
      cards[] { title, description, iconPath }
    },
    blueLandingSection {
      section1 { heading, paragraph1, paragraph2, paragraph3, ctaText, ctaUrl },
      section2WhyBest {
        heading,
        featureCards[] { title, description, iconPath }
      },
      scrollSlides[] { title, subtext, imagePath },
      howDoesItWork { heading, paragraph1, paragraph2, paragraph3 },
      adultBlockerCan { heading, bullets },
      premiumCta { heading, subtext, ctaText, ctaUrl }
    },
    faq {
      sectionTitle,
      faqItems[] { question, answer }
    },
    seo { metaTitle, metaDescription }
  }
`


export const FAQS_PAGE_QUERY = `
  *[_type == "faqsPage" && language == $lang][0] {
    title,
    faqItems[] { question, answer },
    seo { metaTitle, metaDescription }
  }
`

export const PREMIUM_PAGE_QUERY = `
  *[_type == "premiumPage" && language == $lang][0] {
    hero { titleLine1, titleLine2, ctaText, ctaUrl },
    subheading,
    pricing {
      freeLabel,
      annualLabel,
      annualPriceNote,
      monthlyLabel,
      monthlyPriceNote,
      pricingCtaText,
      pricingCtaUrl,
      features[] { label, iconPath, includedInFree }
    },
    testimonial { quote, authorName, authorRole, rating },
    seo { metaTitle, metaDescription }
  }
`
