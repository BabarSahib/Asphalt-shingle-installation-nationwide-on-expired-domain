// Cloudflare Worker for American Shingle Co. (1-stop-roofing.com)
// Handles /api/lead form submissions, static assets, and dynamic 30k+ city rendering

import { renderCityHtml } from './edgeRenderer.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Form Lead Submission Handler
    if (url.pathname === '/api/lead' && request.method === 'POST') {
      try {
        const formData = await request.formData();
        const zip = formData.get('zip')?.trim() || '';
        const name = formData.get('name')?.trim() || '';
        const phone = formData.get('phone')?.trim() || '';
        const projectType = formData.get('project_type') || '';
        const material = formData.get('material_preference') || '';
        const sourceUrl = formData.get('source_url') || '';
        const turnstileToken = formData.get('cf-turnstile-response') || '';

        // Server-side validation
        if (!zip || !name || !phone) {
          return new Response('Missing required fields (ZIP, Name, Phone).', { status: 400 });
        }

        const leadPayload = {
          timestamp: new Date().toISOString(),
          brand: 'American Shingle Co.',
          zip,
          name,
          phone,
          projectType,
          materialPreference: material,
          sourceUrl,
          ip: request.headers.get('cf-connecting-ip') || 'unknown'
        };

        // Forward to CRM Webhook if configured in environment
        if (env.CRM_WEBHOOK_URL) {
          ctx.waitUntil(
            fetch(env.CRM_WEBHOOK_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(leadPayload)
            })
          );
        } else {
          console.log('[LEAD RECEIVED]', JSON.stringify(leadPayload));
        }

        // Redirect to static thank-you confirmation page
        return Response.redirect(`${url.origin}/thank-you/`, 303);
      } catch (err) {
        console.error('Lead processing error:', err);
        return new Response('Error processing estimate request.', { status: 500 });
      }
    }

    // 2. First attempt to serve pre-built static asset via Cloudflare Assets
    if (env.ASSETS) {
      const assetRes = await env.ASSETS.fetch(request);
      if (assetRes.status !== 404) {
        return assetRes;
      }
    }

    // 3. Dynamic Edge Location Renderer for 30,000+ City Pages
    const cleanPath = url.pathname.replace(/^\/|\/$/g, '');
    const parts = cleanPath.split('/');
    if (parts.length === 2) {
      const [stateSlug, citySlug] = parts;
      const reserved = ['services', 'states', 'cities', 'roofing-costs', 'resources', 'api'];
      if (!reserved.includes(stateSlug)) {
        const html = renderCityHtml(stateSlug, citySlug);
        if (html) {
          return new Response(html, {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'public, max-age=604800, s-maxage=2592000'
            }
          });
        }
      }
    }

    return new Response('Page Not Found', { status: 404 });
  }
};
