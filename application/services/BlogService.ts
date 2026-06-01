import { Post, TextBlock } from '@/domain/entities/post'
import { PostRepository } from '@/domain/repositories/PostRepository'
import { getBlockText, toHeadingId } from '@/lib/utils/heading'

export const POSTS_PER_PAGE = 6

export class BlogService {
  constructor(private repository: PostRepository) {}

  private isHeadingBlock(block: Post['body'][number]): block is TextBlock {
    return block._type === 'block' && (block.style === 'h2' || block.style === 'h3')
  }

  async getPagedPosts(page: number, category?: string, lang?: string): Promise<{ posts: Post[]; totalPages: number }> {
    const cat = category && category !== 'All' ? category : ''
    const offset = (page - 1) * POSTS_PER_PAGE
    const [posts, total] = await Promise.all([
      this.repository.getPagedPosts(offset, POSTS_PER_PAGE, cat, lang),
      this.repository.getPostCount(cat, lang),
    ])
    return { posts, totalPages: Math.ceil(total / POSTS_PER_PAGE) }
  }

  async getFeaturedPost(lang?: string): Promise<Post | null> {
    return this.repository.getLatestFeaturedPost(lang)
  }

  async getPostBySlug(slug: string, lang?: string): Promise<Post | null> {
    if (!slug) return null
    const post = await this.repository.getPostBySlug(slug, lang)
    if (!post) return null

    if (Array.isArray(post.body)) {
      post.headings = post.body
        .filter((b) => this.isHeadingBlock(b))
        .map((b) => {
          const text = getBlockText(b.children)
          const id = toHeadingId(text)
          return { text, id, style: b.style }
        })
    }

    return post
  }

  async getAuthorArticles(authorSlug: string, lang?: string): Promise<Post[]> {
    return this.repository.getPostsByAuthorSlug(authorSlug, lang)
  }

  async getAuthorProfile(slug: string): Promise<any> {
    return this.repository.getAuthorBySlug(slug)
  }

  async getCategories(lang?: string): Promise<string[]> {
    return this.repository.getCategories(lang)
  }

  async getAllSlugs(): Promise<{ slug: string }[]> {
    return this.repository.getAllSlugs()
  }
}
