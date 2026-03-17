const { openApp, test, expect } = require('../helpers/fixtures');
const { getTextMetrics, measureContrast } = require('../helpers/assertions');

test.describe('Typography and readability checks', () => {
  test('@typography body copy and controls stay at usable font sizes', async ({ page }) => {
    await openApp(page);

    const metrics = await getTextMetrics(page, '.row-title, .row-meta, .btn-submit-top, .filter-chip, .form-group label, .modal-field label');
    const tooSmall = metrics.filter((entry) => entry.fontSize < 12);

    expect(tooSmall).toEqual([]);
  });

  test('@typography key labels and metadata meet contrast expectations', async ({ page }) => {
    await openApp(page);

    const contrast = await measureContrast(page, '.filter-label, .form-group label, .modal-field label, .results-count, .row-org-name');
    const failures = contrast.filter((entry) => entry.ratio !== null && entry.ratio < 4.5);

    expect(failures).toEqual([]);
  });

  test('@typography mobile cards do not clip or crowd text', async ({ page }, testInfo) => {
    test.skip(!/iPhone|Pixel|Galaxy|Firefox Mobile|iPad/i.test(testInfo.project.name), 'Mobile-targeted project only');

    await openApp(page);

    const metrics = await getTextMetrics(page, '.row-meta, .tag');
    const clipped = metrics.filter((entry) =>
      entry.scrollWidth > entry.clientWidth + 1 || entry.scrollHeight > entry.clientHeight + 1
    );

    expect(clipped).toEqual([]);
  });
});
