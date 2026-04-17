import { FooterData } from '@/domain/entities/site'

export interface SiteRepository {
  getFooterData(): Promise<FooterData | null>
}
