export const ICON_GLOBE = '/language.png'
export const ICON_CHEVRON = '/keyboard_arrow_down.png'
export const DIVIDER_STD = '/d92ac4c08d968bb3fb3ebb875fb78790f58cdfa9.svg'
export const DIVIDER_ALT = '/e7a02853274559d1e6c9baf871bee2aa71a86bac.svg'

export const ICON_IOS = '/apple.png'
export const ICON_ANDROID = '/android.png'
export const ICON_CHROME = '/chrome.png'
export const ICON_MACOS = '/macos.png'
export const ICON_WINDOWS = '/windows.png'

export type Product = { label: string; icon: string; href: string; divider: boolean }
export const PRODUCTS: Product[] = [
    { label: 'BlockP for IOS', icon: ICON_IOS, href: '/products/ios', divider: true },
    { label: 'BlockP for Android', icon: ICON_ANDROID, href: '/products/android', divider: true },
    { label: 'BlockP for Chrome', icon: ICON_CHROME, href: '/products/chrome', divider: true },
    { label: 'BlockP for Macbook', icon: ICON_MACOS, href: '/products/macbook', divider: true },
    { label: 'BlockP for Windows', icon: ICON_WINDOWS, href: '/products/windows', divider: false },
]

export type Language = { native: string; english: string; code: string; altDivider?: boolean; rtl?: boolean }
export const LANGUAGES: Language[] = [
    { native: 'Français', english: 'French', code: 'fr' },
    { native: 'Deutsch', english: 'German', code: 'de' },
    { native: 'Croatian', english: 'Hrvatski', code: 'hr' },
    { native: 'Nederlands', english: 'Dutch', code: 'nl' },
    { native: 'Italiano', english: 'Italian', code: 'it' },
    { native: '日本語', english: 'Japanese', code: 'ja' },
    { native: '한국인', english: 'Korean', code: 'ko' },
    { native: 'Português', english: 'Brazilian Portuguese', code: 'pt-BR' },
    { native: 'Português', english: 'Portugal Portuguese', code: 'pt-PT' },
    { native: 'Русский', english: 'Russian', code: 'ru' },
    { native: 'Español', english: 'Spanish', code: 'es' },
    { native: 'عربي', english: 'Arabic', code: 'ar', altDivider: true, rtl: true },
    { native: '中国人', english: 'Chinese simplified', code: 'zh-CN', altDivider: true },
]

export const LANG_LABELS: Record<string, string> = {
    fr: 'FR', de: 'DE', hr: 'HR', nl: 'NL', it: 'IT',
    ja: 'JP', ko: 'KR', 'pt-BR': 'PT', 'pt-PT': 'PT',
    ru: 'RU', es: 'ES', ar: 'AR', 'zh-CN': 'ZH',
}
