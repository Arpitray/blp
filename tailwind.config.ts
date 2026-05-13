import type { Config } from 'tailwindcss'


const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Typography ──────────────────────────────────────────────────
      fontFamily: {
        anek: ['"Anek Latin"', 'sans-serif'],
      },
      // ── Brand Color Tokens ──────────────────────────────────────────
      colors: {
        brand: {
          primary: '#002954',   // text/primary-txt
          accent:  '#1160FF',   // text/accent (logo "P", links)
          muted:   '#595959',   // secondary text (category, author meta)
        },
        card: {
          fill: '#F6FAFF',      // card/fill/card-fill-start & end
        },
        cta: {
          fill:    '#0076F4',   // cta/fill/cta-primary-fill (button face)
          shadow:  '#004C9D',   // cta bottom shadow layer
          text:    '#FFFFFF',   // cta/text/cta-primary-text
        },
      },
      // ── Shadows ─────────────────────────────────────────────────────
      boxShadow: {
        topbar: '0px 4px 4px 0px rgba(0, 118, 244, 0.25)', // Card/Shadow
        card:   '0px 4px 4px 0px rgba(0, 118, 244, 0.25)',
      },
      // ── Border Radius ────────────────────────────────────────────────
      borderRadius: {
        topbar: '46px',   // nav pill
        cta:    '53px',   // CTA button
        card:   '25px',   // post cards / featured
        post:   '14px',   // thumbnail roundness
      },
      // ── Max Widths ───────────────────────────────────────────────────
      maxWidth: {
        topbar:  '1324px',  // header pill (1440px design baseline)
        content: '1280px',  // content inner max
        site:    '1898px',  // expanded site max-width
      },
      spacing: {
        'nav-gap':    '59px',  // gap between nav items
        'header-px':  '58px',  // outer left/right padding of the header wrapper
        'topbar-pl':  '64px',  // topbar inner-left padding
        'topbar-pr':  '12px',  // topbar inner-right padding
      },
    },
  },
  plugins: [],
}

export default config
