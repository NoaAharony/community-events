const { test, expect, openLiveApp } = require('../helpers/fixtures');

function buildEventSeed() {
  const stamp = Date.now();
  return {
    name: `QA Live Event ${stamp}`,
    updatedName: `QA Live Event Updated ${stamp}`,
    organizer: `QA Organizer ${stamp}`,
    email: `qa-live-${stamp}@example.com`,
    address: `100 QA Avenue ${stamp}, Atlanta, GA 30303`,
  };
}

async function openSubmitForm(page) {
  await page.getByRole('button', { name: /\+ add event/i }).click();
  await expect(page.locator('#page-submit')).toHaveClass(/active/);
}

async function fillRequiredEventFields(page, seed) {
  const nextYear = String(new Date().getFullYear() + 1);

  await page.locator('#s-name').fill(seed.name);
  await page.locator('#s-month').selectOption('04');
  await page.locator('#s-day').selectOption('20');
  await page.locator('#s-year').selectOption(nextYear);
  await page.locator('#s-start-time').selectOption('18:00:00');
  await page.locator('#s-end-time').selectOption('20:00:00');
  await page.locator('#s-type').selectOption('Dinner');
  await page.locator('input[name="s-audience"][value="Adults"]').check();
  await page.locator('#s-city').selectOption('Atlanta');
  await page.locator('#s-address').fill(seed.address);
  await page.locator('#s-organizer').fill(seed.organizer);
  await page.locator('#s-email').fill(seed.email);
}

async function submitEvent(page, seed) {
  await fillRequiredEventFields(page, seed);
  await page.locator('#submit-btn').click();
  await expect(page.locator('#page-confirm')).toHaveClass(/active/);
  await expect(page.getByText(/your event was added successfully/i)).toBeVisible();
  const editLink = await page.evaluate(() => window._confirmEditLink || '');
  expect(editLink).toContain('?edit=');
  return editLink;
}

async function returnHomeAndRefresh(page) {
  await page.getByRole('button', { name: /back to events/i }).click();
  await expect(page.locator('#page-home')).toHaveClass(/active/);
  await page.waitForLoadState('networkidle');
}

async function removeThroughEditLink(page, editLink) {
  await page.goto(editLink);
  await expect(page.locator('#page-edit')).toHaveClass(/active/);
  await page.getByRole('button', { name: /cancel event/i }).click();
  await expect(page.locator('#overlay-cancel')).toHaveClass(/open/);
  await page.getByRole('button', { name: /remove completely/i }).click();
  await expect(page.locator('#page-home')).toHaveClass(/active/);
}

async function waitForSaveCompletion(page) {
  await expect(page.locator('#save-btn')).toHaveText(/save changes/i);
  await expect(page.locator('#edit-error')).toBeHidden();
}

test.describe('Live Supabase flows', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page, browserName }, testInfo) => {
    test.skip(browserName !== 'chromium', 'Live writes run on Chromium only.');
    test.skip(/iPhone|Pixel|Galaxy|Firefox Mobile|iPad/.test(testInfo.project.name), 'Live writes run on desktop only.');
    await openLiveApp(page);
  });

  test('@critical live submit, edit, and remove flow works against Supabase', async ({ page }) => {
    const seed = buildEventSeed();
    let editLink = '';

    try {
      await openSubmitForm(page);
      editLink = await submitEvent(page, seed);

      await returnHomeAndRefresh(page);
      await expect(page.getByText(seed.name)).toBeVisible({ timeout: 20_000 });

      await page.goto(editLink);
      await expect(page.locator('#page-edit')).toHaveClass(/active/);
      await expect(page.locator('#e-name')).toHaveValue(seed.name);
      await page.locator('#e-name').fill(seed.updatedName);
      const patchPromise = page.waitForResponse((response) =>
        response.request().method() === 'PATCH' &&
        response.url().includes('/rest/v1/events?id=eq.')
      );
      await page.locator('#save-btn').click();
      await patchPromise;
      await waitForSaveCompletion(page);

      await page.goto(editLink);
      await expect(page.locator('#page-edit')).toHaveClass(/active/);
      await expect(page.locator('#e-name')).toHaveValue(seed.updatedName, { timeout: 20_000 });

      await removeThroughEditLink(page, editLink);
      await page.goto('/');
      await expect(page.getByText(seed.updatedName)).toHaveCount(0);
    } finally {
      if (editLink) {
        try {
          await removeThroughEditLink(page, editLink);
        } catch {}
      }
    }
  });

  test('@critical live admin can delete a real test event', async ({ page }) => {
    const seed = buildEventSeed();
    let editLink = '';

    try {
      await openSubmitForm(page);
      editLink = await submitEvent(page, seed);

      await page.goto('/?admin');
      await expect(page.locator('#page-admin')).toHaveClass(/active/);
      const row = page.locator('#admin-tbody tr').filter({ hasText: seed.name }).first();
      await expect(row).toBeVisible({ timeout: 20_000 });
      await row.getByRole('button', { name: /delete/i }).click();
      await expect(page.locator('#overlay-admin-delete')).toHaveClass(/open/);
      await page.getByRole('button', { name: /yes, delete permanently/i }).click();
      await expect(page.locator('#admin-tbody tr').filter({ hasText: seed.name })).toHaveCount(0);

      await page.goto(editLink);
      await expect(page.locator('#page-invalid')).toHaveClass(/active/);
    } finally {
      if (editLink) {
        try {
          await removeThroughEditLink(page, editLink);
        } catch {}
      }
    }
  });
});
