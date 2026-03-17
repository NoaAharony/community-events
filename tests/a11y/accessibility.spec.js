const AxeBuilder = require('@axe-core/playwright').default;
const { openApp, test, expect } = require('../helpers/fixtures');

async function scan(page) {
  const results = await new AxeBuilder({ page }).analyze();
  return results.violations.map((violation) => violation.id);
}

test.describe('Accessibility coverage', () => {
  test('@a11y home page has no critical automated accessibility violations', async ({ page }) => {
    await openApp(page);
    const violations = await scan(page);
    expect(violations).toEqual([]);
  });

  test('@a11y submit page has no critical automated accessibility violations', async ({ page }) => {
    await openApp(page);
    await page.getByRole('button', { name: /\+ add event/i }).click();
    const violations = await scan(page);
    expect(violations).toEqual([]);
  });

  test('@a11y event modal has no critical automated accessibility violations', async ({ page }) => {
    await openApp(page);
    await page.getByText('Shabbat Dinner in Brookhaven').click();
    const violations = await scan(page);
    expect(violations).toEqual([]);
  });

  test('@a11y admin page has no critical automated accessibility violations', async ({ page }) => {
    await openApp(page, '/?admin');
    const violations = await scan(page);
    expect(violations).toEqual([]);
  });
});
