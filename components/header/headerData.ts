import { LANGUAGES as APP_LANGUAGES } from '@/lib/languages';

export interface DropdownItem {
    label: string;
    subLabel?: string;
    icon?: string;
    href?: string;
    onClick?: () => void;
    divider?: boolean;
}

export interface LocaleCopy {
    home: string;
    blog: string;
    latestStories: string;
    blogPageTitle: string;
    blogListMetaDescription: string;
    products: string;
    premium: string;
    getStarted: string;
}

export interface ProductLabels {
    ios: string;
    android: string;
    chrome: string;
    macbook: string;
    windows: string;
}

const NATIVE_LABELS: Record<string, string> = {
    en: 'English',
    es: 'Espanol',
    fr: 'Francais',
    de: 'Deutsch',
    hi: 'Hindi',
    hr: 'Hrvatski',
    nl: 'Nederlands',
    it: 'Italiano',
    ja: 'Nihongo',
    ko: 'Hangugeo',
    pt: 'Portugues',
    ru: 'Russkiy',
    ar: 'Arabi',
    zh: 'Zhongwen',
    pl: 'Polski',
};

export const LANGUAGES = APP_LANGUAGES.map((lang) => ({
    code: lang.id.toUpperCase(),
    label: NATIVE_LABELS[lang.id] ?? lang.title,
    subLabel: lang.title,
}));

export const LOCALE_COPY: Record<string, LocaleCopy> = {
    en: {
        home: 'Home',
        blog: 'Blog',
        latestStories: 'Latest Stories',
        blogPageTitle: 'Blog - BlockP',
        blogListMetaDescription: 'Read the latest stories and insights from BlockP.',
        products: 'Products',
        premium: 'Premium',
        getStarted: 'Get started',
    },
    es: {
        home: 'Inicio',
        blog: 'Blog',
        latestStories: 'Ultimas historias',
        blogPageTitle: 'Blog - BlockP',
        blogListMetaDescription: 'Lee las ultimas historias y perspectivas de BlockP.',
        products: 'Productos',
        premium: 'Premium',
        getStarted: 'Comenzar',
    },
    fr: {
        home: 'Accueil',
        blog: 'Blog',
        latestStories: 'Dernieres histoires',
        blogPageTitle: 'Blog - BlockP',
        blogListMetaDescription: 'Lisez les dernieres histoires et analyses de BlockP.',
        products: 'Produits',
        premium: 'Premium',
        getStarted: 'Commencer',
    },
    de: {
        home: 'Startseite',
        blog: 'Blog',
        latestStories: 'Neueste Geschichten',
        blogPageTitle: 'Blog - BlockP',
        blogListMetaDescription: 'Lies die neuesten Geschichten und Einblicke von BlockP.',
        products: 'Produkte',
        premium: 'Premium',
        getStarted: 'Loslegen',
    },
    hi: {
        home: 'होम',
        blog: 'ब्लॉग',
        latestStories: 'नवीनतम कहानियां',
        blogPageTitle: 'ब्लॉग - BlockP',
        blogListMetaDescription: 'BlockP की नवीनतम कहानियां और जानकारी पढ़ें।',
        products: 'प्रोडक्ट्स',
        premium: 'प्रीमियम',
        getStarted: 'शुरू करें',
    },
    hr: {
        home: 'Pocetna',
        blog: 'Blog',
        latestStories: 'Najnovije price',
        blogPageTitle: 'Blog - BlockP',
        blogListMetaDescription: 'Procitajte najnovije price i uvide iz BlockP-a.',
        products: 'Proizvodi',
        premium: 'Premium',
        getStarted: 'Pocnite',
    },
    nl: {
        home: 'Home',
        blog: 'Blog',
        latestStories: 'Nieuwste verhalen',
        blogPageTitle: 'Blog - BlockP',
        blogListMetaDescription: 'Lees de nieuwste verhalen en inzichten van BlockP.',
        products: 'Producten',
        premium: 'Premium',
        getStarted: 'Aan de slag',
    },
    it: {
        home: 'Home',
        blog: 'Blog',
        latestStories: 'Ultime storie',
        blogPageTitle: 'Blog - BlockP',
        blogListMetaDescription: 'Leggi le ultime storie e approfondimenti di BlockP.',
        products: 'Prodotti',
        premium: 'Premium',
        getStarted: 'Inizia',
    },
    ja: {
        home: 'ホーム',
        blog: 'ブログ',
        latestStories: '最新のストーリー',
        blogPageTitle: 'ブログ - BlockP',
        blogListMetaDescription: 'BlockPの最新ストーリーと洞察をお読みください。',
        products: '製品',
        premium: 'プレミアム',
        getStarted: '開始する',
    },
    ko: {
        home: '홈',
        blog: '블로그',
        latestStories: '최신 스토리',
        blogPageTitle: '블로그 - BlockP',
        blogListMetaDescription: 'BlockP의 최신 스토리와 인사이트를 읽어보세요.',
        products: '제품',
        premium: '프리미엄',
        getStarted: '시작하기',
    },
    pt: {
        home: 'Inicio',
        blog: 'Blog',
        latestStories: 'Historias mais recentes',
        blogPageTitle: 'Blog - BlockP',
        blogListMetaDescription: 'Leia as historias e insights mais recentes da BlockP.',
        products: 'Produtos',
        premium: 'Premium',
        getStarted: 'Comecar',
    },
    ru: {
        home: 'Главная',
        blog: 'Блог',
        latestStories: 'Последние истории',
        blogPageTitle: 'Блог - BlockP',
        blogListMetaDescription: 'Читайте последние истории и материалы от BlockP.',
        products: 'Продукты',
        premium: 'Премиум',
        getStarted: 'Начать',
    },
    ar: {
        home: 'الرئيسية',
        blog: 'المدونة',
        latestStories: 'احدث القصص',
        blogPageTitle: 'المدونة - BlockP',
        blogListMetaDescription: 'اقرا احدث القصص والرؤى من BlockP.',
        products: 'المنتجات',
        premium: 'بريميوم',
        getStarted: 'ابدأ',
    },
    zh: {
        home: '首页',
        blog: '博客',
        latestStories: '最新故事',
        blogPageTitle: '博客 - BlockP',
        blogListMetaDescription: '阅读来自 BlockP 的最新故事和见解。',
        products: '产品',
        premium: '高级版',
        getStarted: '开始使用',
    },
    pl: {
        home: 'Strona glowna',
        blog: 'Blog',
        latestStories: 'Najnowsze historie',
        blogPageTitle: 'Blog - BlockP',
        blogListMetaDescription: 'Czytaj najnowsze historie i analizy od BlockP.',
        products: 'Produkty',
        premium: 'Premium',
        getStarted: 'Zaczynaj',
    },
};

export const PRODUCT_LABELS: Record<string, ProductLabels> = {
    en: {
        ios: 'BlockP for iOS',
        android: 'BlockP for Android',
        chrome: 'BlockP for Chrome',
        macbook: 'BlockP for Macbook',
        windows: 'BlockP for Windows',
    },
    es: {
        ios: 'BlockP para iOS',
        android: 'BlockP para Android',
        chrome: 'BlockP para Chrome',
        macbook: 'BlockP para Macbook',
        windows: 'BlockP para Windows',
    },
    fr: {
        ios: 'BlockP pour iOS',
        android: 'BlockP pour Android',
        chrome: 'BlockP pour Chrome',
        macbook: 'BlockP pour Macbook',
        windows: 'BlockP pour Windows',
    },
    de: {
        ios: 'BlockP fur iOS',
        android: 'BlockP fur Android',
        chrome: 'BlockP fur Chrome',
        macbook: 'BlockP fur Macbook',
        windows: 'BlockP fur Windows',
    },
    hi: {
        ios: 'iOS के लिए BlockP',
        android: 'Android के लिए BlockP',
        chrome: 'Chrome के लिए BlockP',
        macbook: 'Macbook के लिए BlockP',
        windows: 'Windows के लिए BlockP',
    },
    hr: {
        ios: 'BlockP za iOS',
        android: 'BlockP za Android',
        chrome: 'BlockP za Chrome',
        macbook: 'BlockP za Macbook',
        windows: 'BlockP za Windows',
    },
    nl: {
        ios: 'BlockP voor iOS',
        android: 'BlockP voor Android',
        chrome: 'BlockP voor Chrome',
        macbook: 'BlockP voor Macbook',
        windows: 'BlockP voor Windows',
    },
    it: {
        ios: 'BlockP per iOS',
        android: 'BlockP per Android',
        chrome: 'BlockP per Chrome',
        macbook: 'BlockP per Macbook',
        windows: 'BlockP per Windows',
    },
    ja: {
        ios: 'iOS向け BlockP',
        android: 'Android向け BlockP',
        chrome: 'Chrome向け BlockP',
        macbook: 'Macbook向け BlockP',
        windows: 'Windows向け BlockP',
    },
    ko: {
        ios: 'iOS용 BlockP',
        android: 'Android용 BlockP',
        chrome: 'Chrome용 BlockP',
        macbook: 'Macbook용 BlockP',
        windows: 'Windows용 BlockP',
    },
    pt: {
        ios: 'BlockP para iOS',
        android: 'BlockP para Android',
        chrome: 'BlockP para Chrome',
        macbook: 'BlockP para Macbook',
        windows: 'BlockP para Windows',
    },
    ru: {
        ios: 'BlockP для iOS',
        android: 'BlockP для Android',
        chrome: 'BlockP для Chrome',
        macbook: 'BlockP для Macbook',
        windows: 'BlockP для Windows',
    },
    ar: {
        ios: 'BlockP لنظام iOS',
        android: 'BlockP لنظام Android',
        chrome: 'BlockP لمتصفح Chrome',
        macbook: 'BlockP لنظام Macbook',
        windows: 'BlockP لنظام Windows',
    },
    zh: {
        ios: 'BlockP iOS版',
        android: 'BlockP Android版',
        chrome: 'BlockP Chrome版',
        macbook: 'BlockP Macbook版',
        windows: 'BlockP Windows版',
    },
    pl: {
        ios: 'BlockP dla iOS',
        android: 'BlockP dla Android',
        chrome: 'BlockP dla Chrome',
        macbook: 'BlockP dla Macbook',
        windows: 'BlockP dla Windows',
    },
};

export function getLocaleCopy(locale: string): LocaleCopy {
    return LOCALE_COPY[locale] ?? LOCALE_COPY.en;
}

export function getLocalizedProducts(locale: string): DropdownItem[] {
    const labels = PRODUCT_LABELS[locale] ?? PRODUCT_LABELS.en;

    return [
        { label: labels.ios, icon: '/apple.svg', href: '/products/ios' },
        { label: labels.android, icon: '/android.svg', href: '/products/android' },
        { label: labels.chrome, icon: '/chrome.svg', href: '/products/chrome' },
        { label: labels.macbook, icon: '/macos.svg', href: '/products/macos' },
        { label: labels.windows, icon: '/windows.svg', href: '/products/microsoft' },
    ];
}

export const PRODUCTS: DropdownItem[] = getLocalizedProducts('en');
