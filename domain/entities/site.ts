export interface SocialLink {
  platform: string
  url: string
}

export interface DownloadBadge {
  badgeUrl: string
  label: string
  url: string
}

export interface FooterColumn {
  title: string
  links: {
    label: string
    url?: string
    internalPath?: string
  }[]
}

export interface FooterData {
  logoUrl?: string
  logoTitle: string
  description: string
  contactEmail: string
  socialLinks?: SocialLink[]
  qrCode?: {
    imageUrl: string
    text: string
    linkUrl?: string
  }
  downloadBadges?: DownloadBadge[]
  columns?: FooterColumn[]
  cta?: {
    title: string
    buttonText: string
    buttonUrl: string
  }
}
