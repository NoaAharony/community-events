const { openApp, test, expect } = require('../helpers/fixtures');
const { getHorizontalOverflow } = require('../helpers/assertions');

test.describe('Responsive and mobile quality', () => {
  test('@mobile home layout avoids horizontal overflow and keeps key actions reachable', async ({ page }, testInfo) => {
    test.skip(!/iPhone|Pixel|Galaxy|Firefox Mobile|iPad/i.test(testInfo.project.name), 'Mobile-targeted project only');

    await openApp(page);
    const overflow = await getHorizontalOverflow(page);
    expect(overflow).toBeLessThanOrEqual(1);

    await expect(page.locator('#page-home .topbar .btn-submit-top')).toBeVisible();
    await expect(page.locator('#page-home .site-footer .footer-add')).toBeVisible();
    await expect(page.locator('#page-home .site-footer')).toBeVisible();
  });

  test('@mobile event modal stays within the viewport below the sticky toolbar', async ({ page }, testInfo) => {
    test.skip(!/iPhone|Pixel|Galaxy|Firefox Mobile|iPad/i.test(testInfo.project.name), 'Mobile-targeted project only');

    await openApp(page);
    await page.getByText('Hebrew Storytelling Workshop').click();

    const geometry = await page.evaluate(() => {
      const overlay = document.getElementById('overlay-event');
      const modal = document.getElementById('modal-event');
      const filterBar = document.querySelector('#page-home .filter-bar');
      const modalRect = modal.getBoundingClientRect();
      const filterRect = filterBar.getBoundingClientRect();

      return {
        modalTop: modalRect.top,
        modalBottom: modalRect.bottom,
        filterBottom: filterRect.bottom,
        viewportHeight: window.innerHeight,
      };
    });

    expect(geometry.modalTop).toBeGreaterThanOrEqual(geometry.filterBottom - 1);
    expect(geometry.modalBottom).toBeLessThanOrEqual(geometry.viewportHeight + 1);
  });

  test('@mobile sticky action bar does not hide the submit button on small screens', async ({ page }, testInfo) => {
    test.skip(!/iPhone|Pixel|Galaxy|Firefox Mobile|iPad/i.test(testInfo.project.name), 'Mobile-targeted project only');

    await openApp(page);
    await page.locator('#page-home .topbar .btn-submit-top').click();
    await page.locator('#s-name').fill('Mobile Layout Test');

    const submitBox = await page.locator('#submit-btn').boundingBox();
    const footerBox = await page.locator('.form-actions').boundingBox();

    expect(submitBox).not.toBeNull();
    expect(footerBox).not.toBeNull();
    expect(submitBox.y + submitBox.height).toBeLessThanOrEqual(footerBox.y + footerBox.height + 1);
  });

  test('@mobile share buttons meet minimum touch-target expectations', async ({ page }, testInfo) => {
    test.skip(!/iPhone|Pixel|Galaxy|Firefox Mobile|iPad/i.test(testInfo.project.name), 'Mobile-targeted project only');

    await openApp(page);
    const sizes = await page.$$eval('.share-card-btn', (buttons) =>
      buttons.map((button) => {
        const rect = button.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      })
    );

    for (const size of sizes) {
      expect(size.width).toBeGreaterThanOrEqual(44);
      expect(size.height).toBeGreaterThanOrEqual(44);
    }
  });
});
