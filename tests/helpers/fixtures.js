const { test: base, expect } = require('@playwright/test');

const SUPABASE_URL = 'https://pscedpbjswyajgledixu.supabase.co';
const REST_URL = `${SUPABASE_URL}/rest/v1`;
const FUNCTION_URL = `${SUPABASE_URL}/functions/v1/send-email`;
const STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/event-images/`;

const sampleEvents = [
  {
    id: 'evt-private-dinner',
    name: 'Shabbat Dinner in Brookhaven',
    event_date: '2099-04-11',
    start_time: '18:30:00',
    end_time: '21:00:00',
    event_type: 'Dinner',
    audience: 'Adults, Parents',
    cost: 'Paid',
    amount: '$25',
    description: 'Hosted dinner with limited seats. Bring a side dish if you can.',
    registration_link: null,
    city: 'Brookhaven',
    full_address: '123 Havurah Way, Brookhaven, GA 30319',
    address_public: false,
    organizer_name: 'Noa Gruenwald',
    org_type: 'Individual',
    contact_email: 'host@example.com',
    contact_phone: null,
    show_email: false,
    show_phone: false,
    image_url: null,
    status: 'active',
    edit_key: 'edit-private-dinner',
    contact_opt_in: false,
  },
  {
    id: 'evt-public-workshop',
    name: 'Hebrew Storytelling Workshop',
    event_date: '2099-04-12',
    start_time: '10:00:00',
    end_time: '12:00:00',
    event_type: 'Workshop',
    audience: 'Families, Kids',
    cost: 'Free',
    amount: null,
    description: 'Interactive session for families and kids.',
    registration_link: null,
    city: 'Atlanta',
    full_address: '456 Peachtree St NE, Atlanta, GA 30308',
    address_public: true,
    organizer_name: 'Keshet Atlanta',
    org_type: 'Business',
    contact_email: 'stories@example.com',
    contact_phone: null,
    show_email: true,
    show_phone: false,
    image_url: null,
    status: 'active',
    edit_key: 'edit-public-workshop',
    contact_opt_in: false,
  },
  {
    id: 'evt-online-talk',
    name: 'Israel Tech Talk Live',
    event_date: '2099-04-13',
    start_time: '20:00:00',
    end_time: '21:00:00',
    event_type: 'Talk / Lecture',
    audience: 'Adults, Teens',
    cost: 'Free',
    amount: null,
    description: 'Zoom conversation with founders in Tel Aviv.',
    registration_link: null,
    city: 'Online Event',
    full_address: null,
    address_public: false,
    organizer_name: 'Startup ATL',
    org_type: 'Business',
    contact_email: 'online@example.com',
    contact_phone: null,
    show_email: true,
    show_phone: false,
    image_url: null,
    status: 'active',
    edit_key: 'edit-online-talk',
    contact_opt_in: false,
  },
  {
    id: 'evt-registration-show',
    name: 'Indie Show Night',
    event_date: '2099-04-14',
    start_time: '19:30:00',
    end_time: '22:00:00',
    event_type: 'Show',
    audience: 'Adults',
    cost: 'Paid',
    amount: '$40',
    description: 'Ticketed performance with outside registration.',
    registration_link: 'https://example.com/tickets',
    city: 'Sandy Springs',
    full_address: null,
    address_public: false,
    organizer_name: 'Stage House',
    org_type: 'Business',
    contact_email: 'tickets@example.com',
    contact_phone: null,
    show_email: false,
    show_phone: false,
    image_url: null,
    status: 'active',
    edit_key: 'edit-registration-show',
    contact_opt_in: false,
  },
  {
    id: 'evt-other-city',
    name: 'Long-form Community Meetup With a Very Long Name for Wrapping Checks',
    event_date: '2099-04-15',
    start_time: '17:00:00',
    end_time: '19:00:00',
    event_type: 'Meetup',
    audience: 'All Ages',
    cost: 'Free',
    amount: null,
    description: 'Community meetup in an out-of-list city to exercise the Other filter path.',
    registration_link: null,
    city: 'Marietta',
    full_address: '789 Market St, Marietta, GA 30060',
    address_public: true,
    organizer_name: 'קהילה',
    org_type: 'Individual',
    contact_email: 'meet@example.com',
    contact_phone: null,
    show_email: true,
    show_phone: false,
    image_url: null,
    status: 'active',
    edit_key: 'edit-other-city',
    contact_opt_in: false,
  },
  {
    id: 'evt-cancelled',
    name: 'Cancelled Purim Party',
    event_date: '2099-04-16',
    start_time: '18:00:00',
    end_time: '21:00:00',
    event_type: 'Party',
    audience: 'Adults',
    cost: 'Free',
    amount: null,
    description: 'Cancelled example entry.',
    registration_link: null,
    city: 'Atlanta',
    full_address: 'Cancelled address',
    address_public: true,
    organizer_name: 'Purim Crew',
    org_type: 'Business',
    contact_email: 'purim@example.com',
    contact_phone: null,
    show_email: true,
    show_phone: false,
    image_url: null,
    status: 'cancelled',
    edit_key: 'edit-cancelled',
    contact_opt_in: false,
  },
];

function parseQuery(url) {
  const query = url.split('?')[1] || '';
  return new URLSearchParams(query);
}

function jsonResponse(route, payload, status = 200) {
  return route.fulfill({
    status,
    contentType: 'application/json',
    body: JSON.stringify(payload),
  });
}

async function mockApp(page, options = {}) {
  const {
    events = sampleEvents,
    delayMs = 0,
    failEvents = false,
    submitResult = [{ id: 'evt-created' }],
    patchResult = null,
    deleteResult = null,
    emailResult = { success: true, id: 'email_mock_1' },
    failOnConsoleError = true,
  } = options;

  page.on('dialog', async (dialog) => {
    await dialog.dismiss();
  });

  if (failOnConsoleError) {
    page.on('console', (msg) => {
      if (msg.type() !== 'error') return;
      const text = msg.text();
      if (text.includes('interactive-widget') && text.includes('not recognized and ignored')) return;
      throw new Error(`Console error: ${text}`);
    });
  }

  await page.route(`${REST_URL}/**`, async (route, request) => {
    if (delayMs) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }

    const method = request.method();
    const url = request.url();

    if (failEvents && method === 'GET' && url.includes('/events?')) {
      return route.fulfill({
        status: 500,
        contentType: 'text/plain',
        body: 'backend unavailable',
      });
    }

    if (method === 'GET' && url.includes('/events?')) {
      const params = parseQuery(url);
      const editKey = params.get('edit_key');
      const idFilter = params.get('id');

      if (editKey && editKey.startsWith('eq.')) {
        const match = events.filter((event) => event.edit_key === editKey.slice(3));
        return jsonResponse(route, match);
      }

      if (idFilter && idFilter.startsWith('eq.')) {
        const match = events.filter((event) => event.id === idFilter.slice(3));
        return jsonResponse(route, match);
      }

      return jsonResponse(route, events);
    }

    if (method === 'POST' && url.includes('/events')) {
      return jsonResponse(route, submitResult, 201);
    }

    if (method === 'PATCH' && url.includes('/events?')) {
      return jsonResponse(route, patchResult ?? []);
    }

    if (method === 'DELETE' && url.includes('/events?')) {
      return jsonResponse(route, deleteResult ?? []);
    }

    return jsonResponse(route, []);
  });

  await page.route(`${FUNCTION_URL}`, async (route) => {
    return jsonResponse(route, emailResult);
  });

  await page.route(`${STORAGE_URL}**`, async (route) => {
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ Key: 'event-images/mock.png' }),
    });
  });

  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => Promise.resolve(),
      },
      configurable: true,
    });

    Object.defineProperty(navigator, 'share', {
      value: undefined,
      configurable: true,
    });
  });
}

async function openApp(page, path = '/', options = {}) {
  await mockApp(page, options);
  await page.goto(path);
}

async function openLiveApp(page, path = '/', options = {}) {
  const { stubEmail = true, failOnConsoleError = false } = options;

  page.on('dialog', async (dialog) => {
    await dialog.dismiss();
  });

  if (failOnConsoleError) {
    page.on('console', (msg) => {
      if (msg.type() !== 'error') return;
      const text = msg.text();
      if (text.includes('interactive-widget') && text.includes('not recognized and ignored')) return;
      throw new Error(`Console error: ${text}`);
    });
  }

  if (stubEmail) {
    await page.route(`${FUNCTION_URL}`, async (route) => {
      return jsonResponse(route, { success: true, id: 'email_live_stub' });
    });
  }

  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => Promise.resolve(),
      },
      configurable: true,
    });
  });

  await page.goto(path);
}

const test = base.extend({
  sampleEvents: async ({}, use) => {
    await use(sampleEvents);
  },
});

module.exports = {
  test,
  expect,
  sampleEvents,
  mockApp,
  openApp,
  openLiveApp,
};
