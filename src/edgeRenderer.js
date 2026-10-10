// src/edgeRenderer.js
// Ultra-fast edge HTML renderer for 30,000+ US cities
// Complies with strict guidelines:
// - H1 strictly targets Installation
// - Title targets Installation & Replacement
// - ZERO 'free estimate' / 'paid estimate'
// - ZERO lead forms (Clean hero image & direct phone CTA)
// - Response time '30 to 90 minutes'
// - 'Licensed and Insured Independent Roofing Contractors'
// - Phone: (833) 348-0328 hardcoded

const states = require('./_data/states.json');
const services = require('./_data/services.json');
const site = require('./_data/site.json');
const locations = require('./_data/locations.json');

const stateMap = {};
states.forEach(s => stateMap[s.slug] = s);

function toTitleCase(slug) {
  if (!slug) return '';
  return slug.split('-').map(word => {
    if (word === 'st') return 'St.';
    if (word === 'ft') return 'Ft.';
    if (word === 'mc') return 'Mc';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

function renderCityHtml(stateSlug, citySlug) {
  const state = stateMap[stateSlug];
  if (!state) return null;

  const stateCityList = locations[stateSlug] || [];
  const foundCity = stateCityList.find(c => c.slug === citySlug);
  const cityName = foundCity ? foundCity.name : toTitleCase(citySlug);

  // Sibling nearby cities in the same state
  const nearby = stateCityList
    .filter(c => c.slug !== citySlug)
    .slice(0, 8);

  const costIndex = state.costIndex || 1.0;
  const archLow = Math.round(8200 * costIndex);
  const archHigh = Math.round(11800 * costIndex);
  const tabLow = Math.round(6800 * costIndex);
  const tabHigh = Math.round(8900 * costIndex);
  const metalLow = Math.round(16500 * costIndex);
  const metalHigh = Math.round(27000 * costIndex);

  const title = `Shingle Roof Installation & Replacement in ${cityName}, ${state.abbr} | ${site.name}`;
  const h1 = `Shingle Installation in ${cityName}, ${state.abbr}`;
  const metaDesc = `Connect with licensed and insured shingle roof installation contractors in ${cityName}, ${state.abbr}. Average partner response time is 30 to 90 minutes.`;
  const canonicalUrl = `${site.domain}/${stateSlug}/${citySlug}/`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${metaDesc}">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="stylesheet" href="/assets/css/style.css">

  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${metaDesc}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:type" content="website">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RoofingContractor",
        "@id": "${canonicalUrl}#organization",
        "name": "${site.name} - ${cityName}",
        "url": "${canonicalUrl}",
        "telephone": "+1-833-348-0328",
        "priceRange": "$$",
        "areaServed": {
          "@type": "City",
          "name": "${cityName}",
          "containedInPlace": {
            "@type": "State",
            "name": "${state.name}"
          }
        },
        "description": "${metaDesc}"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "${site.domain}/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "${state.name}",
            "item": "${site.domain}/states/${stateSlug}/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "${cityName}",
            "item": "${canonicalUrl}"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does a new shingle roof cost in ${cityName}, ${state.abbr}?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For a standard 2,000 square foot home in ${cityName}, architectural asphalt shingle installation generally costs between $${archLow.toLocaleString()} and $${archHigh.toLocaleString()} depending on roof pitch and tear-off layers."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly will a roofing contractor contact me in ${cityName}?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Independent roofing specialists in our network typically reach out within 30 to 90 minutes of your estimate request or call to (833) 348-0328."
            }
          },
          {
            "@type": "Question",
            "name": "Are roofing contractors in ${cityName} licensed and insured?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Contractors in our referral network must verify compliance with ${state.name} building codes (${state.buildingCode}) and regulatory requirements."
            }
          }
        ]
      }
    ]
  }
  </script>
</head>
<body>
  <!-- Main Sticky Header Matching Reference Site -->
  <header class="site-header">
    <div class="container header-inner">
      <a href="/" class="brand-logo" title="${site.name} - Home">
        <div class="logo-icon-box">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <span class="brand-name">${site.name}</span>
      </a>

      <!-- Desktop Navigation -->
      <nav class="main-nav" aria-label="Primary Navigation">
        <a href="/services/" class="nav-link">Shingle Services</a>
        <a href="/states/" class="nav-link">States</a>
        <a href="/roofing-costs/" class="nav-link">Roofing Costs</a>
        <a href="/resources/" class="nav-link">Resources</a>
        <a href="/about/" class="nav-link">About Us</a>
        <a href="/contact/" class="nav-link">Contact</a>
      </nav>

      <!-- Header Call Action & Hamburger Menu (Matching furnacerepairpros.com) -->
      <div class="header-cta">
        <a href="tel:${site.phoneTel}" class="btn btn-primary hide-mobile" title="Call ${site.phoneDisplay}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          <span>${site.phoneDisplay}</span>
        </a>
        <button class="mobile-menu-toggle hamburger" id="mobile-menu-btn" aria-label="Toggle navigation menu" aria-expanded="false">
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Nav Dropdown Drawer -->
    <div class="mobile-nav-menu" id="mobile-nav-dropdown">
      <nav class="mobile-nav-list">
        <a href="/" class="mobile-nav-item">Home</a>
        <a href="/services/" class="mobile-nav-item">Shingle Services</a>
        <a href="/states/" class="mobile-nav-item">States Directory</a>
        <a href="/roofing-costs/" class="mobile-nav-item">Roofing Costs</a>
        <a href="/resources/" class="mobile-nav-item">Resources &amp; Guides</a>
        <a href="/about/" class="mobile-nav-item">About Us</a>
        <a href="/contact/" class="mobile-nav-item">Contact</a>
        <a href="tel:${site.phoneTel}" class="mobile-nav-item" style="color: var(--color-accent); font-weight: 800; display: flex; align-items: center; gap: 0.5rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          <span>Call: ${site.phoneDisplay}</span>
        </a>
      </nav>
    </div>
  </header>

  <main id="main-content">
    <!-- Breadcrumb Navigation Strip -->
    <div class="breadcrumb-strip">
      <div class="container">
        <nav class="breadcrumb-nav" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span class="breadcrumb-separator">/</span>
          <a href="/states/${stateSlug}/">${state.name}</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">${cityName}</span>
        </nav>
      </div>
    </div>

    <!-- City Hero Section -->
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-content">
          <!-- Badges Top (Matching furnace repair pros) -->
          <div class="hero-badges-top">
            <span class="hero-pill-active"><span class="badge-dot"></span> Priority Roofing Network Active</span>
            <span class="hero-pill-fast">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              FAST ROOFING SERVICE IN ${cityName.toUpperCase()}, ${state.abbr}
            </span>
          </div>

          <h1>${h1}</h1>

          <!-- Rich Niche Paragraph (Matching furnace repair pros depth) -->
          <p class="hero-lead">
            American Shingle Co. provides homeowners in ${cityName} with licensed and insured roofing specialists who arrive fully equipped to inspect deck integrity, manage complete tear-offs, and install precision architectural, metal, and composite shingles on schedule. We provide rapid dispatch with typical contractor response times of 30 to 90 minutes &mdash; code-compliant installation, verified contractor credentials, and guaranteed structural protection.
          </p>

          <div class="hero-trust-pills">
            <span class="trust-pill"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> Code: ${state.buildingCode}</span>
            <span class="trust-pill"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg> Hail Risk: ${state.hailRisk}</span>
          </div>

          <!-- Action Buttons (Matching furnace repair pros) -->
          <div class="hero-actions">
            <a href="tel:${site.phoneTel}" class="hero-call-btn" id="hero-call-btn">
              <div class="hero-call-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg>
              </div>
              <div class="hero-call-text">
                <span class="hero-call-label">Call 24/7 Service</span>
                <span class="hero-call-number">${site.phoneDisplay}</span>
              </div>
            </a>
            <a href="/states/${stateSlug}/" class="hero-secondary-btn" id="hero-directory-btn">
              <span>${state.name} Directory</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>

        <div>
          <div class="hero-img-wrapper" style="position: relative;">
            <img src="/assets/images/hero_roofing.jpg" alt="Professional roofing contractor installing shingles in ${cityName}, ${state.abbr}" class="hero-main-img" width="900" height="650">
            <div class="hero-img-badge">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              <span>Response Time: 30 to 90 Mins</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Ribbon below Hero (Matching furnace repair pros) -->
    <div class="hero-stats-strip">
      <div class="container hero-stats-grid">
        <div class="hero-stat-item">
          <span class="hero-stat-value">30 to 90 Min</span>
          <span class="hero-stat-label">Average Partner Response</span>
        </div>
        <div class="hero-stat-item">
          <span class="hero-stat-value">Licensed &amp; Insured</span>
          <span class="hero-stat-label">Independent Contractors</span>
        </div>
        <div class="hero-stat-item">
          <span class="hero-stat-value">All 7 Materials</span>
          <span class="hero-stat-label">Asphalt, Metal, Slate &amp; More</span>
        </div>
        <div class="hero-stat-item">
          <span class="hero-stat-value">Code Compliance</span>
          <span class="hero-stat-label">${state.name} Permitting Verified</span>
        </div>
      </div>
    </div>

    <!-- Main City Body -->
    <section style="padding: 3.5rem 0;">
      <div class="container" style="max-width: 900px;">
        
        <!-- Direct Answer Lead -->
        <div class="direct-answer">
          <strong>${cityName} Roofing Overview:</strong> Homeowners in ${cityName}, ${state.name} face regional weather conditions characterized by ${state.climate.toLowerCase()}. When replacing or installing a shingle roof in ${cityName}, proper adherence to ${state.buildingCode} and local wind velocity specifications is critical to protect your structural investment. Independent contractors in our referral network respond within <strong>${site.responseTime}</strong>.
        </div>

        <!-- Local Roofing Guide -->
        <h2>Local Roofing Guide for ${cityName}, ${state.name}</h2>
        <p>
          Residential roofs in ${cityName} must be engineered to withstand ${state.windRisk.toLowerCase()} wind stresses and ${state.hailRisk.toLowerCase()} hail events. Whether you are replacing aging asphalt shingles or upgrading to Class 4 impact shingles or metal roofing, our network connects you with vetted, licensed, and insured roofing contractors who manage the complete process:
        </p>

        <!-- 7 Services Cards in City with Images -->
        <h2>Shingle Roofing Systems Available in ${cityName}</h2>
        <div class="services-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin: 1.5rem 0 2.5rem 0;">
          ${services.map(s => `
          <div class="service-card">
            <div class="service-card-img-wrapper">
              <img src="${s.image}" alt="${s.name} in ${cityName}" loading="lazy" width="400" height="250" class="service-card-img">
            </div>
            <div class="service-card-body">
              <h3 style="margin: 0 0 0.5rem 0;"><a href="/services/${s.slug}/">${s.name} in ${cityName}</a></h3>
              <p style="font-size: 0.92rem; margin: 0.5rem 0;">${s.shortDescription}</p>
              <div style="display: flex; gap: 1rem; font-size: 0.82rem; color: var(--color-text-muted); margin-top: auto;">
                <span><strong>Lifespan:</strong> ${s.lifespan}</span>
                <span><strong>Wind:</strong> ${s.windRating}</span>
              </div>
            </div>
          </div>
          `).join('')}
        </div>

        <!-- Building Codes & Permits Box -->
        <h2>Building Permits & Inspections in ${cityName}</h2>
        <div class="callout-box" style="border-left: 4px solid var(--color-secondary);">
          <h3 style="margin-top: 0;">Code Compliance: ${state.buildingCode}</h3>
          <p>
            In ${cityName} and throughout ${state.name}, complete roof tear-offs and structural replacements typically require municipal building permits prior to starting construction. Contractors in our referral network obtain required permits, schedule official in-progress decking and flashing inspections, and verify adherence to state regulatory standards (${state.licensing}).
          </p>
        </div>

        <!-- Local Estimated Costs Table -->
        <h2>Estimated Shingle Roof Costs in ${cityName}</h2>
        <p>
          Project investment estimates based on a typical 2,000 square foot single-family home in ${cityName}, calibrated for local regional labor and material indices:
        </p>

        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Shingle Material</th>
                <th>Cost Per Square Installed</th>
                <th>Estimated 2,000 Sq Ft Project</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Standard 3-Tab Asphalt</strong></td>
                <td>$340 – $440</td>
                <td>$${tabLow.toLocaleString()} – $${tabHigh.toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Architectural Asphalt Shingles</strong></td>
                <td>$410 – $590</td>
                <td>$${archLow.toLocaleString()} – $${archHigh.toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>UL 2218 Class 4 Impact Asphalt</strong></td>
                <td>$480 – $670</td>
                <td>$${Math.round(9600 * costIndex).toLocaleString()} – $${Math.round(13400 * costIndex).toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Stone-Coated Metal Shingles</strong></td>
                <td>$825 – $1,350</td>
                <td>$${metalLow.toLocaleString()} – $${metalHigh.toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Recycled Rubber Shingles</strong></td>
                <td>$790 – $1,320</td>
                <td>$${Math.round(15800 * costIndex).toLocaleString()} – $${Math.round(26400 * costIndex).toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Composite Synthetic Slate</strong></td>
                <td>$940 – $1,580</td>
                <td>$${Math.round(18800 * costIndex).toLocaleString()} – $${Math.round(31600 * costIndex).toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Natural S1 Quarried Slate</strong></td>
                <td>$1,500 – $2,900+</td>
                <td>$${Math.round(30000 * costIndex).toLocaleString()} – $${Math.round(58000 * costIndex).toLocaleString()}+</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Nearby Sibling Communities -->
        ${nearby.length > 0 ? `
        <h2>Also Serving Nearby Communities</h2>
        <p>Our contractor network also provides roofing services in communities neighboring ${cityName}:</p>
        <div class="state-grid" style="grid-template-columns: repeat(2, 1fr); margin-bottom: 2.5rem;">
          ${nearby.map(n => `
          <a href="/${stateSlug}/${n.slug}/" class="state-link">
            <span>${n.name}, ${state.abbr}</span>
            <span class="state-abbr">&rarr;</span>
          </a>
          `).join('')}
        </div>
        ` : ''}

        <!-- Local FAQs -->
        <h2>Frequently Asked Questions in ${cityName}</h2>
        <div class="faq-list">
          <details class="faq-item">
            <summary class="faq-summary">How much does a new shingle roof cost in ${cityName}?</summary>
            <div class="faq-content">
              <p>For an average 2,000 square foot single-family home in ${cityName}, architectural asphalt shingle installation generally costs between $${archLow.toLocaleString()} and $${archHigh.toLocaleString()}. Final cost depends on roof pitch steepness, tear-off layers, and decking replacement needs.</p>
            </div>
          </details>
          <details class="faq-item">
            <summary class="faq-summary">How long does a roof replacement take in ${cityName}?</summary>
            <div class="faq-content">
              <p>Most residential shingle replacements in ${cityName} are completed in 1 to 2 days by an experienced 5-6 person crew, weather permitting. Daily cleanup includes ground magnetic sweeps for nails.</p>
            </div>
          </details>
          <details class="faq-item">
            <summary class="faq-summary">Are contractors in ${cityName} licensed and insured?</summary>
            <div class="faq-content">
              <p>Yes. All independent roofing contractors in the American Shingle Co. referral network must verify compliance with ${state.name} licensing and local permit requirements.</p>
            </div>
          </details>
        </div>

        <!-- Direct Link Back to State Hub -->
        <div style="margin-top: 3rem; text-align: center; padding: 2rem; background: #f8fafc; border-radius: var(--radius-md); border: 1px solid var(--color-border);">
          <h3 style="margin-top: 0;">Explore All Cities in ${state.name}</h3>
          <p style="color: var(--color-text-muted); margin-bottom: 1.5rem;">Looking for roofing contractors elsewhere in ${state.name}? View the complete directory of cities served.</p>
          <a href="/states/${stateSlug}/" class="btn btn-secondary">View ${state.name} Directory &rarr;</a>
        </div>

        <!-- Final Call to Action -->
        <div style="background: var(--color-primary); color: #ffffff; padding: 2.5rem; border-radius: var(--radius-lg); text-align: center; margin-top: 3rem;">
          <h2 style="color: #ffffff; margin-top: 0;">Speak With a Local Roofing Specialist in ${cityName}</h2>
          <p style="color: #cbd5e1; max-width: 600px; margin: 0 auto 1.5rem auto;">
            Speak directly with a licensed roofing specialist serving ${cityName}. Average partner contractor response time is ${site.responseTime}.
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="tel:${site.phoneTel}" class="btn btn-primary" id="contact-cta-${citySlug}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              Call Now: ${site.phoneDisplay}
            </a>
            <a href="/states/${stateSlug}/" class="btn btn-secondary">
              Browse ${state.name} Directory &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  </main>

  <!-- Mobile Sticky Floating Call CTA (Exact match to furnacerepairpros.com) -->
  <div class="mobile-sticky-cta" role="complementary" aria-label="Call ${site.name}">
    <a href="tel:${site.phoneTel}" aria-label="Call ${site.phoneDisplay} 24/7">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    </a>
  </div>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>${site.name}</h4>
          <p style="color: #94a3b8; font-size: 0.88rem; margin-bottom: 1rem;">
            Connecting homeowners with vetted, licensed, and insured roofing contractors across all 50 states and Washington, D.C.
          </p>
          <p style="color: #cbd5e1; font-weight: 700; margin-bottom: 0.4rem;">
            Direct Phone: <a href="tel:${site.phoneTel}" style="color: var(--color-accent); text-decoration: none;">${site.phoneDisplay}</a>
          </p>
          <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 0.4rem;">
            Average Contractor Response: <strong style="color: #ffffff;">${site.responseTime}</strong>
          </p>
        </div>

        <div class="footer-col">
          <h4>Shingle Materials</h4>
          <ul>
            <li><a href="/services/asphalt-shingle-installation/">Asphalt Shingles</a></li>
            <li><a href="/services/wood-cedar-shingle-installation/">Wood & Cedar Shingles</a></li>
            <li><a href="/services/metal-shingle-installation/">Metal Shingles</a></li>
            <li><a href="/services/rubber-shingle-installation/">Recycled Rubber Shingles</a></li>
            <li><a href="/services/composite-shingle-installation/">Composite Synthetic Slate</a></li>
            <li><a href="/services/slate-shingle-installation/">Natural Slate Shingles</a></li>
            <li><a href="/services/solar-shingle-installation/">Solar Shingles (BIPV)</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Cost & Information</h4>
          <ul>
            <li><a href="/roofing-costs/">Roofing Cost Guide</a></li>
            <li><a href="/roofing-costs/shingle-roof-cost-per-square/">Cost Per Square Guide</a></li>
            <li><a href="/roofing-costs/shingle-roof-cost-by-state/">Cost by State Comparison</a></li>
            <li><a href="/resources/types-of-roof-shingles-compared/">Compare All Shingle Types</a></li>
            <li><a href="/resources/best-shingles-for-hail/">Best Shingles for Hail</a></li>
            <li><a href="/resources/best-shingles-for-high-winds-and-hurricanes/">High-Wind Roof Shingles</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Coverage & Legal</h4>
          <ul>
            <li><a href="/states/">All 51 Service Areas</a></li>
            <li><a href="/states/${stateSlug}/">${state.name} Roofing</a></li>
            <li><a href="/about/">About American Shingle Co.</a></li>
            <li><a href="/contact/">Contact Us</a></li>
            <li><a href="/privacy-policy/">Privacy Policy</a></li>
            <li><a href="/terms-of-service/">Terms of Service</a></li>
            <li><a href="/sitemap/">HTML Sitemap</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-disclaimer-strip">
        <p>
          <strong>Referral Network & Legal Disclaimer:</strong> American Shingle Co. is a nationwide consumer referral and matching service. We are not a direct roofing contractor and do not perform roofing construction services ourselves. All roofing estimates, inspections, contracts, warranties, and permits are provided directly by independent, third-party licensed and insured roofing contractors in our referral network.
        </p>
        <p style="margin-top: 1rem; color: #475569;">
          &copy; ${site.year} ${site.name}. All rights reserved. Toll-Free: ${site.phoneDisplay}
        </p>
      </div>
    </div>
  </footer>

  <script>
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuDropdown = document.getElementById('mobile-nav-dropdown');
    if (menuBtn && menuDropdown) {
      menuBtn.addEventListener('click', function() {
        const isExp = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExp);
        menuBtn.classList.toggle('is-active');
        menuDropdown.classList.toggle('is-open');
      });
      menuDropdown.querySelectorAll('a').forEach(function(l) {
        l.addEventListener('click', function() {
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.classList.remove('is-active');
          menuDropdown.classList.remove('is-open');
        });
      });
    }
  </script>
</body>
</html>`;
}

module.exports = {
  renderCityHtml
};
