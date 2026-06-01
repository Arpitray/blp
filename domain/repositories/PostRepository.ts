import { Post } from '@/domain/entities/post'

export interface PostRepository {
  getPagedPosts(offset: number, limit: number, category?: string, lang?: string): Promise<Post[]>
  getPostCount(category?: string, lang?: string): Promise<number>
  getPostBySlug(slug: string, lang?: string): Promise<Post | null>
  getPostsByAuthorSlug(authorSlug: string, lang?: string): Promise<Post[]>
  getAuthorBySlug(slug: string): Promise<any>
  getLatestFeaturedPost(lang?: string): Promise<Post | null>
  getCategories(lang?: string): Promise<string[]>
  getAllSlugs(): Promise<{ slug: string }[]>
}
