import { BlogService } from '@/application/services/BlogService'
import { SiteService } from '@/application/services/SiteService'
import { sanityClient } from '@/infrastructure/sanity/client'
import { SanityPostRepository } from '@/infrastructure/sanity/repositories/SanityPostRepository'
import { SanitySiteRepository } from '@/infrastructure/sanity/repositories/SanitySiteRepository'

const postRepository = new SanityPostRepository(sanityClient);
const siteRepository = new SanitySiteRepository(sanityClient);

// Singleton services for the application
export const blogService = new BlogService(postRepository);
export const siteService = new SiteService(siteRepository);
