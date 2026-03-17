const { openApp, test, expect } = require('../helpers/fixtures');

test.describe('Keyboard and focus behavior', () => {
  test('@keyboard primary actions are keyboard reachable from the home page', async ({ page }) => {
    await openApp(page);

    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveText(/atlanta il community events/i);
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveText(/\+ add event/i);
  });

  test('@keyboard event details modal traps focus within the dialog', async ({ page }) => {
    await openApp(page);
    await page.getByText('Hebrew Storytelling Workshop').click();

    for (let index = 0; index < 8; index += 1) {
      await page.keyboard.press('Tab');
    }

    const activeOutsideModal = await page.evaluate(() => {
      const active = document.activeElement;
      const modal = document.getElementById('modal-event');
      return active ? !modal.contains(active) : true;
    });

    expect(activeOutsideModal).toBe(false);
  });

  test('@keyboard submit form controls expose visible focus styling', async ({ page }) => {
    await openApp(page);
    await page.getByRole('button', { name: /\+ add event/i }).click();
    await page.locator('#s-name').focus();

    const focusStyle = await page.locator('#s-name').evaluate((element) => {
      const style = window.getComputedStyle(element);
      return {
        outlineStyle: style.outlineStyle,
        borderColor: style.borderColor,
      };
    });

    expect(
      focusStyle.outlineStyle !== 'none' ||
      focusStyle.borderColor === 'rgb(42, 90, 140)'
    ).toBe(true);
  });
});
