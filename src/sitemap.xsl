<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
    xmlns:html="http://www.w3.org/TR/REC-html40"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | American Shingle Co.</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #0f172a;
            background: #f8fafc;
            padding: 2.5rem 1.5rem;
            line-height: 1.6;
          }
          .container {
            max-width: 960px;
            margin: 0 auto;
            background: #ffffff;
            padding: 2.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
            border: 1px solid #e2e8f0;
          }
          .badge {
            display: inline-block;
            background: #fff7ed;
            color: #ea580c;
            border: 1px solid #fed7aa;
            padding: 0.3rem 0.85rem;
            border-radius: 9999px;
            font-size: 0.8rem;
            font-weight: 800;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 1rem;
          }
          h1 {
            margin: 0 0 0.5rem 0;
            color: #0b1320;
            font-size: 1.85rem;
            font-weight: 900;
            letter-spacing: -0.02em;
          }
          p {
            color: #64748b;
            font-size: 0.95rem;
            margin-bottom: 1.5rem;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
          }
          th {
            background: #0b192c;
            color: #ffffff;
            text-align: left;
            padding: 0.85rem 1rem;
            font-size: 0.85rem;
            font-weight: 700;
            letter-spacing: 0.02em;
          }
          th:first-child { border-top-left-radius: 8px; }
          th:last-child { border-top-right-radius: 8px; }
          td {
            padding: 0.85rem 1rem;
            border-bottom: 1px solid #e2e8f0;
            font-size: 0.92rem;
          }
          tr:hover td {
            background: #f8fafc;
          }
          a {
            color: #0284c7;
            text-decoration: none;
            font-weight: 600;
            word-break: break-all;
          }
          a:hover {
            color: #ea580c;
            text-decoration: underline;
          }
          .footer-note {
            margin-top: 2rem;
            padding-top: 1.25rem;
            border-top: 1px solid #e2e8f0;
            font-size: 0.82rem;
            color: #94a3b8;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <span class="badge">Google Search Console Index</span>
          <h1>American Shingle Co. XML Sitemap</h1>
          <p>
            This XML Sitemap index is configured for search engines (Google, Bing, Yahoo). It lists all section sitemaps covering all nationwide roofing services, state directories, cost guides, and 30,000+ US city landing pages.
          </p>
          <table>
            <thead>
              <tr>
                <th>Sitemap URL</th>
                <th style="width: 180px;">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td style="color: #64748b; font-weight: 600;">
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                </tr>
              </xsl:for-each>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td style="color: #64748b; font-weight: 600;">
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          <div class="footer-note">
            &copy; 2026 American Shingle Co. (1-stop-roofing.com). Clean Architecture, WCAG Compliant, Zero Bloat.
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
