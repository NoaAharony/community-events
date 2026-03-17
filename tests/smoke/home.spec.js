const { openApp, test, expect } = require('../helpers/fixtures');

test.describe('Smoke coverage', () => {
  test('@smoke home page boots and renders the event list', async ({ page }) => {
    await openApp(page);

    await expect(page.locator('#page-home')).toHaveClass(/active/);
    await expect(page.getByText('Shabbat Dinner in Brookhaven')).toBeVisible();
    await expect(page.getByText('Hebrew Storytelling Workshop')).toBeVisible();
    await expect(page.locator('.date-group')).toHaveCount(6);
    await expect(page.getByText(/6 events found/i)).toBeVisible();
  });

  test('@smoke deep link opens the event modal', async ({ page }) => {
    await openApp(page, '/?event=evt-public-workshop');

    await expect(page.locator('#overlay-event')).toHaveClass(/open/);
    await expect(page.locator('.modal-event-title')).toHaveText('Hebrew Storytelling Workshop');
    await expect(page.getByRole('button', { name: /share this event/i })).toBeVisible();
  });

  test('@smoke about and invalid-link pages are reachable', async ({ page }) => {
    await openApp(page, '/?edit=missing-key');

    await expect(page.locator('#page-invalid')).toHaveClass(/active/);
    await expect(page.getByText(/this link is invalid or has expired/i)).toBeVisible();

    await page.goto('/');
    await page.locator('#page-home .footer-link', { hasText: 'About' }).click();
    await expect(page.locator('#page-about')).toHaveClass(/active/);
    await expect(page.getByRole('heading', { name: /about atlanta il community events/i })).toBeVisible();
  });
});
