import blockContent from './blockContent'
import post from './post'
import postMetadata from './postMetadata'
import author from './author'
import category from './category'
import siteSettings from './siteSettings'
import footer from './footer'
import product from './product'

// ── Phase 1: Page schemas ─────────────────────────────────────
import homepage from './homepage'
import premiumPage from './premiumPage'
import faqsPage from './faqsPage'

export const schemaTypes = [
  // Blog
  post,
  postMetadata,
  author,
  category,
  blockContent,

  // Site-wide
  siteSettings,
  footer,

  // Products
  product,

  // ── Phase 1: Pages ──────────────────────────────────────────
  homepage,
  premiumPage,
  faqsPage,
]