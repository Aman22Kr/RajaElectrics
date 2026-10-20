# RajaElectrics

A static, multi-page demo storefront for electronics and home appliances, modelled on the layout of
https://mahajanelectronics.com/ (a Shopify store). Built with Vite, React, Tailwind CSS, React Router,
Lucide icons and Framer Motion. There is no backend: everything runs in the browser.

## What is in it
- Home (hero carousel, brand tiles, featured / best-seller / deal / new-arrival / mobile rows)
- Mega-menu with the reference site's category tree (desktop hover menu, mobile accordion drawer)
- Collection pages (`#/collections/<handle>`) with brand and price filters, sorting, load-more
- Product detail pages (`#/products/<slug>`), quick-view modal, related and recently viewed items
- Global search with live suggestions and recent searches (`#/search?q=…`)
- Cart with a demo checkout, wishlist, demo profile, contact form, 404 page
- A small ad-space strip above the footer on every page

## Quick Settings
Edit `src/config.js` (brand name, tagline, contact placeholders, animation speed/intensity, storage prefix).
Colours and fonts live in `tailwind.config.js`. Products live in `src/data/products.js`, the menu in `src/data/menu.js`.
Product photos can be added in `src/data/images.js` (`{ 'product-slug': 'https://…' }`); without one, a branded placeholder tile is shown.

## Run locally
```bash
npm install
npm run dev        # development server
npm run build      # production build into dist/
npm run preview    # serve the production build
```

## Deploy to GitHub Pages (GitHub Actions only)
1. Create a repository (e.g. `rajaelectrics`) under the `Aman22kr` account.
2. In the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Push the project:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Aman22kr/rajaelectrics.git
git push -u origin main
```
4. The workflow `.github/workflows/deploy.yml` builds and publishes on every push to `main`.
   The site appears at `https://aman22kr.github.io/rajaelectrics/`.

Routing uses `HashRouter` and `vite.config.js` uses `base: './'`, so refreshes, deep links and any repository name work without server rewrites.
Run `npm install` once locally and commit the generated `package-lock.json`; the workflow then uses `npm ci`.

## localStorage
Cart, saved items, recently viewed, search history, animation settings, demo profile and form drafts are stored under the
`rajaelectrics:v1:` prefix. They are specific to one browser on one device, do not sync, and are not a real account.
Passwords and payment details are never stored. Malformed stored data is ignored and replaced with defaults.

## Demo limitations
- Products marked "Sample listing" have invented prices; other listings use titles and prices seen on the reference homepage and are not live.
- Checkout, login and the contact form are simulations; no payment, authentication or message is sent anywhere.
- Contact details are placeholders.
- Only the reference homepage and its navigation were inspected; collection and product page layouts follow common storefront patterns, not a page-by-page copy.
- Hero banners hotlink the reference site's images and fall back to a colour panel if they fail to load.
