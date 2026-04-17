import { FooterData } from '@/domain/entities/site'
import { SiteRepository } from '@/domain/repositories/SiteRepository'
import { FOOTER_QUERY } from '@/infrastructure/sanity/queries'

type SanityFetchClient = {
  fetch<T = unknown>(query: string, params?: Record<string, unknown>): Promise<T>
}

export class SanitySiteRepository implements SiteRepository {
  constructor(private client: SanityFetchClient) {}

  async getFooterData(): Promise<FooterData | null> {
    return this.client.fetch<FooterData | null>(FOOTER_QUERY)
  }
}
