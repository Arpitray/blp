import { Post } from '@/domain/entities/post'
import { PostRepository } from '@/domain/repositories/PostRepository'
import {
  ALL_SLUGS_QUERY,
  FEATURED_POST_QUERY,
  PAGED_POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  POST_COUNT_QUERY,
  POSTS_BY_AUTHOR_QUERY,
  AUTHOR_BY_SLUG_QUERY,
} from '@/infrastructure/sanity/queries'

type SanityFetchClient = {
  fetch<T = unknown>(query: string, params?: Record<string, unknown>): Promise<T>
}

export class SanityPostRepository implements PostRepository {
  constructor(private client: SanityFetchClient) {}

  async getPagedPosts(offset: number, limit: number, category = '', lang = ''): Promise<Post[]> {
    return this.client.fetch<Post[]>(PAGED_POSTS_QUERY, { offset, end: offset + limit, category, lang })
  }

  async getPostCount(category = '', lang = ''): Promise<number> {
    return this.client.fetch<number>(POST_COUNT_QUERY, { category, lang })
  }

  async getLatestFeaturedPost(lang = ''): Promise<Post | null> {
    return this.client.fetch<Post | null>(FEATURED_POST_QUERY, { lang })
  }

  async getPostBySlug(slug: string, lang = ''): Promise<Post | null> {
    return this.client.fetch<Post | null>(POST_BY_SLUG_QUERY, { slug, lang })
  }

  async getPostsByAuthorSlug(authorSlug: string, lang = ''): Promise<Post[]> {
    return this.client.fetch<Post[]>(POSTS_BY_AUTHOR_QUERY, { authorSlug, lang })
  }

  async getAuthorBySlug(slug: string): Promise<any> {
    return this.client.fetch<any>(AUTHOR_BY_SLUG_QUERY, { slug })
  }

  async getCategories(): Promise<string[]> {
    return this.client.fetch<string[]>(`*[_type == "category"].title`)
  }

  async getAllSlugs(): Promise<{ slug: string }[]> {
    const slugs = await this.client.fetch<{ slug: string }[] | null>(ALL_SLUGS_QUERY)
    return slugs || []
  }
}
