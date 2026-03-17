const path = require('path');
const { openApp, test, expect } = require('../helpers/fixtures');

test.describe('Critical flows', () => {
  test('@critical submit flow succeeds for a private-address in-person event', async ({ page }) => {
    const nextYear = String(new Date().getFullYear() + 1);
    await openApp(page, '/');

    await page.getByRole('button', { name: /\+ add event/i }).click();
    await page.locator('#s-name').fill('QA Community Dinner');
    await page.locator('#s-month').selectOption('04');
    await page.locator('#s-day').selectOption('20');
    await page.locator('#s-year').selectOption(nextYear);
    await page.locator('#s-start-time').selectOption('18:00:00');
    await page.locator('#s-end-time').selectOption('20:00:00');
    await page.locator('#s-type').selectOption('Dinner');
    await page.locator('input[name="s-audience"][value="Adults"]').check();
    await page.locator('#s-city').selectOption('Atlanta');
    await page.locator('#s-address').fill('100 QA Ave, Atlanta, GA 30303');
    await page.locator('#s-organizer').fill('QA Organizer');
    await page.locator('#s-email').fill('qa.organizer@example.com');
    await page.locator('#submit-btn').click();

    await expect(page.locator('#page-confirm')).toHaveClass(/active/);
    await expect(page.getByText(/your event was added successfully/i)).toBeVisible();
  });

  test('@critical online event without registration link requires visible email and can submit', async ({ page }) => {
    const nextYear = String(new Date().getFullYear() + 1);
    await openApp(page, '/');

    await page.getByRole('button', { name: /\+ add event/i }).click();
    await page.locator('#s-name').fill('Online Town Hall');
    await page.locator('#s-month').selectOption('04');
    await page.locator('#s-day').selectOption('21');
    await page.locator('#s-year').selectOption(nextYear);
    await page.locator('#s-start-time').selectOption('20:00:00');
    await page.locator('#s-type').selectOption('Talk / Lecture');
    await page.locator('input[name="s-audience"][value="Adults"]').check();
    await page.locator('#s-online-btn').click();
    await page.locator('#s-organizer').fill('Online Host');
    await page.locator('#s-email').fill('online.host@example.com');

    await expect(page.locator('#s-show-email')).toBeChecked();
    await page.locator('#submit-btn').click();

    await expect(page.locator('#page-confirm')).toHaveClass(/active/);
  });

  test('@critical edit flow preloads data and saves changes', async ({ page }) => {
    await openApp(page, '/?edit=edit-private-dinner');

    await expect(page.locator('#page-edit')).toHaveClass(/active/);
    await expect(page.locator('#e-name')).toHaveValue('Shabbat Dinner in Brookhaven');
    await page.locator('#e-name').fill('Shabbat Dinner Updated');
    const patchPromise = page.waitForResponse((response) =>
      response.request().method() === 'PATCH' &&
      response.url().includes('/rest/v1/events?id=eq.')
    );
    await page.locator('#save-btn').click();
    await patchPromise;

    await expect(page.locator('#page-home')).toHaveClass(/active/);
  });

  test('@critical organizer can open cancel modal and mark event cancelled', async ({ page }) => {
    await openApp(page, '/?edit=edit-public-workshop');

    await page.getByRole('button', { name: /cancel event/i }).click();
    await expect(page.locator('#overlay-cancel')).toHaveClass(/open/);
    await page.getByRole('button', { name: /mark as cancelled/i }).click();

    await expect(page.locator('#page-home')).toHaveClass(/active/);
  });

  test('@critical image upload path shows preview before submit', async ({ page }) => {
    await openApp(page, '/');
    await page.getByRole('button', { name: /\+ add event/i }).click();

    const fileChooserInput = page.locator('#s-image');
    await fileChooserInput.setInputFiles(path.join(__dirname, '../../favicon.svg'));

    await expect(page.locator('#upload-preview')).toBeVisible();
  });
});
