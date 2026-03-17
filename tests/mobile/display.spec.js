const { openApp, test, expect } = require('../helpers/fixtures');
const { getHorizontalOverflow } = require('../helpers/assertions');

function mobileOnly(testInfo) {
  return /iPhone|Pixel|Galaxy|Firefox Mobile|iPad/i.test(testInfo.project.name);
}

test.describe('Mobile display integrity', () => {
  test('@mobile footer does not cover the final event card', async ({ page }, testInfo) => {
    test.skip(!mobileOnly(testInfo), 'Mobile-targeted project only');

    await openApp(page);
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
    await page.waitForTimeout(100);

    const geometry = await page.evaluate(() => {
      const footer = document.querySelector('#page-home .site-footer');
      const rows = Array.from(document.querySelectorAll('#events-container .event-row'))
        .filter((row) => !row.classList.contains('cancelled'));
      const lastRow = rows[rows.length - 1];
      const footerRect = footer.getBoundingClientRect();
      const rowRect = lastRow.getBoundingClientRect();
      return {
        footerTop: footerRect.top,
        rowBottom: rowRect.bottom,
      };
    });

    expect(geometry.rowBottom).toBeLessThanOrEqual(geometry.footerTop + 1);
  });

  test('@mobile long card content does not overlap share or arrow actions', async ({ page }, testInfo) => {
    test.skip(!mobileOnly(testInfo), 'Mobile-targeted project only');

    await openApp(page);

    const geometry = await page.evaluate(() => {
      const row = Array.from(document.querySelectorAll('#events-container .event-row')).find((candidate) =>
        candidate.textContent.includes('Long-form Community Meetup With a Very Long Name')
      );
      const title = row.querySelector('.row-title');
      const organizer = row.querySelector('.row-org-name');
      const tags = row.querySelector('.row-tags');
      const share = row.querySelector('.share-card-btn');
      const arrow = row.querySelector('.row-arrow');

      const titleRect = title.getBoundingClientRect();
      const organizerRect = organizer.getBoundingClientRect();
      const tagsRect = tags.getBoundingClientRect();
      const shareRect = share.getBoundingClientRect();
      const arrowRect = arrow.getBoundingClientRect();

      return {
        titleRight: titleRect.right,
        organizerRight: organizerRect.right,
        tagsRight: tagsRect.right,
        shareLeft: shareRect.left,
        arrowLeft: arrowRect.left,
      };
    });

    expect(geometry.titleRight).toBeLessThanOrEqual(geometry.shareLeft - 4);
    expect(geometry.organizerRight).toBeLessThanOrEqual(geometry.shareLeft - 4);
    expect(geometry.tagsRight).toBeLessThanOrEqual(geometry.arrowLeft - 4);
  });

  test('@mobile event modal content remains reachable without horizontal clipping', async ({ page }, testInfo) => {
    test.skip(!mobileOnly(testInfo), 'Mobile-targeted project only');

    await openApp(page);
    await page.getByText('Hebrew Storytelling Workshop').click();

    const initialOverflow = await page.evaluate(() => {
      const modal = document.getElementById('modal-event');
      return Math.max(0, modal.scrollWidth - modal.clientWidth);
    });
    expect(initialOverflow).toBeLessThanOrEqual(1);

    await page.locator('#modal-event').evaluate((element) => {
      element.scrollTo({ top: element.scrollHeight, behavior: 'instant' });
    });

    const bottomGeometry = await page.evaluate(() => {
      const modal = document.getElementById('modal-event');
      const shareButton = modal.querySelector('.share-modal-btn');
      const modalRect = modal.getBoundingClientRect();
      const shareRect = shareButton.getBoundingClientRect();
      return {
        modalBottom: modalRect.bottom,
        shareBottom: shareRect.bottom,
      };
    });

    expect(bottomGeometry.shareBottom).toBeLessThanOrEqual(bottomGeometry.modalBottom + 1);
  });

  test('@mobile submit page avoids horizontal overflow and keeps sticky actions in view', async ({ page }, testInfo) => {
    test.skip(!mobileOnly(testInfo), 'Mobile-targeted project only');

    await openApp(page);
    await page.locator('#page-home .topbar .btn-submit-top').click();
    await page.locator('#s-name').fill('Display check event');
    await page.locator('#s-desc').fill('Checking mobile form layout integrity.');

    const overflow = await getHorizontalOverflow(page);
    expect(overflow).toBeLessThanOrEqual(1);

    const geometry = await page.evaluate(() => {
      const actions = document.querySelector('#page-submit .form-actions');
      const submit = document.getElementById('submit-btn');
      const secondary = actions.querySelector('.btn-secondary');
      const actionsRect = actions.getBoundingClientRect();
      const submitRect = submit.getBoundingClientRect();
      const secondaryRect = secondary.getBoundingClientRect();
      return {
        actionsTop: actionsRect.top,
        submitTop: submitRect.top,
        secondaryTop: secondaryRect.top,
        submitBottom: submitRect.bottom,
        viewportHeight: window.innerHeight,
      };
    });

    expect(geometry.submitTop).toBeGreaterThanOrEqual(geometry.actionsTop - 1);
    expect(geometry.secondaryTop).toBeGreaterThanOrEqual(geometry.actionsTop - 1);
    expect(geometry.submitBottom).toBeLessThanOrEqual(geometry.viewportHeight + 1);
  });
});
