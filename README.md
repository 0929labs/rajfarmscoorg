# Raj Farms Coorg — Website

Official website for Raj Farms Coorg. Single-estate arabica and robusta coffee, raw forest honey and Coorg spices from the Western Ghats since 1969.

## Structure

```
rajfarmscoorg/
├── index.html              # Home page
├── about.html              # Our Story page
├── privacy-policy.html     # Privacy Policy
├── terms.html              # Terms of Use
├── robots.txt              # Search engine instructions
├── sitemap.xml             # XML sitemap (submit to Google Search Console)
├── _headers                # Cloudflare Pages HTTP security headers
├── _redirects              # Cloudflare Pages redirect rules
├── .gitignore
│
├── css/
│   ├── style.css           # Main stylesheet (used by all pages)
│   └── about.css           # About page specific styles
│
├── js/
│   ├── main.js             # Main app: cart, checkout, nav, FAQ, filters
│   └── about.js            # About page script
│
└── images/
    ├── logo-dark.png           # Main logo (dark background version)
    ├── favicon.ico             # Browser tab icon — ADD THIS
    ├── apple-touch-icon.png    # iOS home screen icon (180x180) — ADD THIS
    ├── og-image.jpg            # Open Graph share image (1200x630) — ADD THIS
    │
    ├── backgrounds/
    │   └── hero-bg.jpg         # Hero section background
    │
    ├── products/
    │   ├── arabica-beans.jpg
    │   ├── robusta-beans.jpg
    │   ├── arabica-pure.jpg
    │   ├── arabica-8020.jpg
    │   ├── arabica-7030.jpg
    │   ├── honey-wild.jpg
    │   ├── pepper-black.jpg
    │   ├── cardamom.jpg
    │   ├── cinnamon.jpg
    │   └── vanilla.jpg
    │
    ├── process/
    │   ├── 01-harvest.jpg
    │   ├── 02-dry.jpg
    │   ├── 03-roast.jpg
    │   └── 04-pack.jpg
    │
    └── team/
        └── (founder photos, farm shots, estate images)
```

## Before Going Live — Checklist

### Must Do
- [ ] Replace `[YOUR FSSAI NO.]` in `index.html` and `terms.html`
- [ ] Add all product images to `images/products/`
- [ ] Add `images/hero-bg.jpg` (hero background)
- [ ] Add `images/logo-dark.png` (actual logo file)
- [ ] Add `favicon.ico` and `apple-touch-icon.png`
- [ ] Add `og-image.jpg` (1200×630px, for WhatsApp/Facebook sharing)
- [ ] Update `sitemap.xml` dates after any page changes
- [ ] Update `<meta name="description">` on each page with final copy

### Recommended
- [ ] Add Google Analytics 4 tag to all pages (add before `</head>`)
- [ ] Add Meta Pixel if running Facebook/Instagram ads
- [ ] Submit sitemap to Google Search Console
- [ ] Set up custom domain and point to Cloudflare Pages

## Hosting (Recommended: Cloudflare Pages)

1. Push this repository to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/) → Connect to Git
3. Select this repo → No build command needed (static site)
4. Set output directory to `/` (root)
5. Add custom domain in Cloudflare Pages settings

The `_headers` file automatically applies all security headers on Cloudflare Pages.  
The `_redirects` file handles URL redirect rules.

## Image Guidelines

- Format: AVIF or WebP with JPEG fallback
- Hero background: 1920×1080px minimum, compressed to <200KB
- Product images: 800×1000px (4:5 ratio), compressed to <100KB each
- Process photos: 800×600px (4:3 ratio), compressed to <80KB each
- Use [Squoosh](https://squoosh.app/) to compress before adding to repo

## Contact

WhatsApp: +91 90357 18580  
Email: rajfarmscoorg@gmail.com  
Instagram: [@rajfarmscoorg](https://instagram.com/rajfarmscoorg)
