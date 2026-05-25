import blockContent from './blockContent'
import post from './post'
import postMetadata from './postMetadata'
import author from './author'
import category from './category'
import siteSettings from './siteSettings'
import footer from './footer'
import productAndroid from './productAndroid'
import productIos from './productIos'
import productChrome from './productChrome'
import productMacos from './productMacos'
import productMicrosoft from './productMicrosoft'

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
  productAndroid,
  productIos,
  productChrome,
  productMacos,
  productMicrosoft,

  // ── Phase 1: Pages ──────────────────────────────────────────
  homepage,
  premiumPage,
  faqsPage,
]