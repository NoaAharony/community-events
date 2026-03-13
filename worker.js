const SUPABASE_URL = 'https://pscedpbjswyajgledixu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzY2VkcGJqc3d5YWpnbGVkaXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NDYwMTMsImV4cCI6MjA4ODMyMjAxM30.gnxxN1E3_UVFE-HKplmHOLfovy8FDz50TDG0Xs37q3I';
const SITE_NAME = 'Atlanta IL Community Events';
const DEFAULT_DESCRIPTION = 'Events for the Israeli community in Atlanta';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const eventId = url.searchParams.get('event');

    // For non-HTML requests (images, fonts, etc.) — serve directly
    const path = url.pathname;
    if (path !== '/' && !path.endsWith('.html')) {
      return env.ASSETS.fetch(request);
    }

    // Get the base HTML from static assets
    const assetResponse = await env.ASSETS.fetch(request);
    const html = await assetResponse.text();
    const BANNER_URL = `${url.origin}/site_banner.png`;

    // No event param — serve with default site OG tags
    if (!eventId) {
      const ogTags = `
    <meta property="og:title" content="${SITE_NAME}" />
    <meta property="og:description" content="${DEFAULT_DESCRIPTION}" />
    <meta property="og:url" content="${url.origin}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:image" content="${BANNER_URL}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${SITE_NAME}" />
    <meta name="twitter:description" content="${DEFAULT_DESCRIPTION}" />
    <meta name="twitter:image" content="${BANNER_URL}" />`;
      const newHtml = html.replace('</head>', `${ogTags}\n</head>`);
      return new Response(newHtml, {
        status: assetResponse.status,
        headers: { ...Object.fromEntries(assetResponse.headers), 'content-type': 'text/html;charset=UTF-8' }
      });
    }

    // Fetch event from Supabase
    let event = null;
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/events?id=eq.${eventId}&select=name,description,image_url,event_date,city,event_type&limit=1`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          }
        }
      );
      const data = await res.json();
      if (data && data.length > 0) event = data[0];
    } catch (e) {
      return new Response(html, {
        status: assetResponse.status,
        headers: { ...Object.fromEntries(assetResponse.headers), 'content-type': 'text/html;charset=UTF-8' }
      });
    }

    if (!event) {
      return new Response(html, {
        status: assetResponse.status,
        headers: { ...Object.fromEntries(assetResponse.headers), 'content-type': 'text/html;charset=UTF-8' }
      });
    }

    const title = event.name ? `${event.name} - ${SITE_NAME}` : SITE_NAME;

    const descParts = [];
    if (event.event_date) {
      const d = new Date(event.event_date + 'T00:00:00');
      descParts.push(d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
    }
    if (event.city && event.city !== 'Online Event') descParts.push(event.city);
    else if (event.city === 'Online Event') descParts.push('Online');
    if (event.event_type) descParts.push(event.event_type);
    const contextLine = descParts.join(' - ');
    const bodyText = event.description ? event.description.replace(/\n/g, ' ').slice(0, 120) : '';
    const description = contextLine
      ? (bodyText ? `${contextLine}. ${bodyText}` : contextLine)
      : (bodyText || DEFAULT_DESCRIPTION);

    const image = event.image_url || BANNER_URL;

    const ogTags = `
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(request.url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />`;

    const newHtml = html
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
      .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
      .replace('</head>', `${ogTags}\n</head>`);

    return new Response(newHtml, {
      status: assetResponse.status,
      headers: {
        ...Object.fromEntries(assetResponse.headers),
        'content-type': 'text/html;charset=UTF-8',
      }
    });
  }
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
