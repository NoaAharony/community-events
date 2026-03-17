const { openApp, test, expect, sampleEvents } = require('../helpers/fixtures');

test.describe('Regression coverage', () => {
  test('@regression filters work across event type, city, and audience', async ({ page }) => {
    await openApp(page);

    await page.locator('#chip-type').click();
    await page.getByText('Show', { exact: true }).click();
    await expect(page.getByText('Indie Show Night')).toBeVisible();
    await expect(page.getByText('Hebrew Storytelling Workshop')).not.toBeVisible();

    await page.locator('#chip-city').click();
    await page.getByText('Other', { exact: true }).click();
    await expect(page.getByText(/long-form community meetup/i)).toBeVisible();

    await page.locator('#chip-audience').click();
    await page.getByText('Kids', { exact: true }).click();
    await expect(page.getByText(/showing all upcoming events instead/i)).toBeVisible();
  });

  test('@regression loading, empty, and error states render correctly', async ({ page }) => {
    await openApp(page, '/', { events: [], delayMs: 500 });
    await expect(page.locator('.skeleton-card').first()).toBeVisible();
    await expect(page.getByText(/no events yet/i)).toBeVisible();

    await openApp(page, '/', { failEvents: true });
    await expect(page.getByText(/could not load events/i)).toBeVisible();
  });

  test('@regression contact organizer flow submits and shows success state', async ({ page }) => {
    await openApp(page);

    await page.getByText('Shabbat Dinner in Brookhaven').click();
    await page.getByRole('button', { name: /contact organizer/i }).click();
    await expect(page.locator('#overlay-address')).toHaveClass(/open/);

    await page.locator('#req-fname').fill('Avi');
    await page.locator('#req-lname').fill('Cohen');
    await page.locator('#req-email').fill('avi@example.com');
    await page.locator('#req-phone').fill('4045550111');
    await page.getByRole('button', { name: /send request/i }).click();

    await expect(page.getByText(/request sent/i)).toBeVisible();
  });

  test('@regression admin route shows stats and actions', async ({ page }) => {
    await openApp(page, '/?admin');

    await expect(page.locator('#page-admin')).toHaveClass(/active/);
    await expect(page.locator('#stat-total')).toHaveText(String(sampleEvents.length));
    await expect(page.getByRole('button', { name: /delete/i }).first()).toBeVisible();
  });

  test('@regression registration-link events expose outbound CTA instead of modal-only actions', async ({ page }) => {
    await openApp(page);

    const popupPromise = page.waitForEvent('popup');
    await page.getByText('Indie Show Night').click();
    const popup = await popupPromise;

    await expect(popup).toHaveURL(/example\.com\/tickets/);
    await popup.close();
  });
});
