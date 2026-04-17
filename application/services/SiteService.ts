import { FooterData } from '@/domain/entities/site'
import { SiteRepository } from '@/domain/repositories/SiteRepository'

export class SiteService {
  constructor(private repository: SiteRepository) {}

  async getFooterData(): Promise<FooterData | null> {
    const data = await this.repository.getFooterData()
    if (!data) return null
    return data
  }
}
