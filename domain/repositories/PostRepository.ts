import { Post } from '@/domain/entities/post'

export interface PostRepository {
  getPagedPosts(offset: number, limit: number, category?: string, lang?: string): Promise<Post[]>
  getPostCount(category?: string, lang?: string): Promise<number>
  getPostBySlug(slug: string, lang?: string): Promise<Post | null>
  getPostsByAuthorId(authorId: string): Promise<Post[]>
  getLatestFeaturedPost(lang?: string): Promise<Post | null>
  getCategories(lang?: string): Promise<string[]>
  getAllSlugs(): Promise<{ slug: string }[]>
}
