const { openApp, test, expect } = require('../helpers/fixtures');
const { getHorizontalOverflow } = require('../helpers/assertions');

test.describe('Visual and UI integrity checks', () => {
  test('@visual key surfaces render without overlap or unreachable controls', async ({ page }) => {
    await openApp(page);
    await page.getByText('Shabbat Dinner in Brookhaven').click();

    const problems = await page.evaluate(() => {
      const selectors = ['.topbar', '.filter-bar', '.share-card-btn', '#modal-event', '.form-actions', '.edit-cancel-bar'];
      return selectors.flatMap((selector) => {
        return Array.from(document.querySelectorAll(selector)).map((element) => {
          const rect = element.getBoundingClientRect();
          const clipped = rect.right > window.innerWidth + 1 || rect.left < -1;
          return clipped ? selector : null;
        }).filter(Boolean);
      });
    });

    expect(problems).toEqual([]);
  });

  test('@visual event cards keep the share button clear of the arrow rail and content', async ({ page }) => {
    await openApp(page);

    const collisions = await page.$$eval('.event-row', (cards) =>
      cards.map((card) => {
        const share = card.querySelector('.share-card-btn');
        const arrow = card.querySelector('.row-arrow');
        const main = card.querySelector('.row-main');
        if (!share || !arrow || !main) return false;
        const shareRect = share.getBoundingClientRect();
        const arrowRect = arrow.getBoundingClientRect();
        const mainRect = main.getBoundingClientRect();
        const overlapsArrow = !(shareRect.right <= arrowRect.left || shareRect.left >= arrowRect.right);
        const overlapsMain = shareRect.left < mainRect.right && shareRect.top < mainRect.bottom;
        return overlapsArrow || overlapsMain;
      }).filter(Boolean)
    );

    expect(collisions).toEqual([]);
  });

  test('@visual no page-level horizontal scrolling is introduced on desktop', async ({ page }) => {
    await openApp(page);
    const overflow = await getHorizontalOverflow(page);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
