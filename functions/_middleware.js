const SUPABASE_URL = 'https://pscedpbjswyajgledixu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzY2VkcGJqc3d5YWpnbGVkaXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NDYwMTMsImV4cCI6MjA4ODMyMjAxM30.gnxxN1E3_UVFE-HKplmHOLfovy8FDz50TDG0Xs37q3I';
const SITE_NAME = 'Atlanta IL Community Events';
const DEFAULT_DESCRIPTION = 'Events for the Israeli community in Atlanta';

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const eventId = url.searchParams.get('event');

  // No event param - serve normally
  if (!eventId) {
    return next();
  }

  // Fetch event from Supabase
  let event = null;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/events?id=eq.${eventId}&select=title,description,image_url,event_date&limit=1`,
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
    // If fetch fails, just serve the page normally
    return next();
  }

  if (!event) return next();

  // Get the original page HTML
  const response = await next();
  const html = await response.text();

  const title = event.title ? `${event.title} - ${SITE_NAME}` : SITE_NAME;
  const description = event.description
    ? event.description.slice(0, 200)
    : DEFAULT_DESCRIPTION;
  const image = event.image_url || '';
  const pageUrl = request.url;

  const ogTags = `
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(pageUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    ${image ? `<meta property="og:image" content="${escapeHtml(image)}" />` : ''}
    <meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    ${image ? `<meta name="twitter:image" content="${escapeHtml(image)}" />` : ''}`;

  // Inject before </head>
  const newHtml = html.replace('</head>', `${ogTags}\n</head>`);

  return new Response(newHtml, {
    status: response.status,
    headers: {
      ...Object.fromEntries(response.headers),
      'content-type': 'text/html;charset=UTF-8',
    }
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
