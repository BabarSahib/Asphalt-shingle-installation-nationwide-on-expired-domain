# American Shingle Co. (1-stop-roofing.com)

A high-performance, conversion-focused, programmatic SEO static website for **American Shingle Co.** built with **Eleventy (11ty)** and deployable directly to **Cloudflare Workers with Static Assets** or **Cloudflare Pages**.

---

## Key Business & Technical Variables Enforced
- **Brand**: American Shingle Co.
- **Apex Domain**: `https://1-stop-roofing.com`
- **Toll-Free Phone**: `(833) 348-0328` (`tel:+18333480328`) hardcoded in static HTML with zero JavaScript dependency.
- **H1 Protocol**: Exclusively focuses on *installation* (e.g. `Shingle Installation in [City], [State]`, `Asphalt Shingle Installation`).
- **Title Protocol**: Combines *installation & replacement* (e.g. `Shingle Roof Installation & Replacement in [City], [State] | American Shingle Co.`).
- **Estimate Protocol**: Strictly forbids "free estimate" or "paid estimate" across all pages. Uses `Request an Estimate`, `Written Estimate`, etc.
- **Trust Badges**: Licensed and insured contractor network.
- **Response Time**: `30 to 90 minutes` prominently displayed.
- **Materials (7)**: Asphalt, Wood/Cedar, Metal Shingles, Recycled Rubber Shingles, Composite Synthetic Slate, Natural Slate, Solar Shingles (BIPV).
- **Coverage**: All 50 states + Washington, D.C. + tiered cities and service-in-city combinations.

---

## Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Build the complete static site into dist/
npm run build

# 3. Run the automated pre-flight SEO and compliance audit
npm test

# 4. Start local development server
npm run serve
```

---

## Cloudflare Deployment

### Deploy via Wrangler (Workers with Static Assets):
```bash
npx wrangler deploy
```

The site deploys from `dist/` with edge caching, `_headers`, `_redirects`, and `/api/lead` form processing handled by `worker/index.js`.
