async function getHorizontalOverflow(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    return Math.max(0, doc.scrollWidth - doc.clientWidth);
  });
}

async function getTextMetrics(page, selector) {
  return page.$$eval(selector, (elements) =>
    elements.map((element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        text: element.textContent.trim(),
        fontSize: Number.parseFloat(style.fontSize),
        lineHeight: Number.parseFloat(style.lineHeight) || null,
        width: rect.width,
        height: rect.height,
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
        scrollHeight: element.scrollHeight,
        clientHeight: element.clientHeight,
      };
    }).filter((entry) => entry.text.length > 0)
  );
}

function luminance(channel) {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function contrastRatio(foreground, background) {
  const fg = foreground.map(luminance);
  const bg = background.map(luminance);
  const fgLum = 0.2126 * fg[0] + 0.7152 * fg[1] + 0.0722 * fg[2];
  const bgLum = 0.2126 * bg[0] + 0.7152 * bg[1] + 0.0722 * bg[2];
  const lighter = Math.max(fgLum, bgLum);
  const darker = Math.min(fgLum, bgLum);
  return (lighter + 0.05) / (darker + 0.05);
}

async function measureContrast(page, selector) {
  return page.$$eval(selector, (elements) => {
    function parseColor(value) {
      const match = value.match(/\d*\.?\d+/g);
      if (!match) return null;
      const [r, g, b, a] = match.map(Number);
      if (Number.isFinite(a) && a === 0) return null;
      return [r, g, b];
    }

    function luminance(channel) {
      const value = channel / 255;
      return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    }

    function ratio(foreground, background) {
      const fg = foreground.map(luminance);
      const bg = background.map(luminance);
      const fgLum = 0.2126 * fg[0] + 0.7152 * fg[1] + 0.0722 * fg[2];
      const bgLum = 0.2126 * bg[0] + 0.7152 * bg[1] + 0.0722 * bg[2];
      const lighter = Math.max(fgLum, bgLum);
      const darker = Math.min(fgLum, bgLum);
      return (lighter + 0.05) / (darker + 0.05);
    }

    return elements.map((element) => {
      const style = window.getComputedStyle(element);
      const foreground = parseColor(style.color);
      let background = parseColor(style.backgroundColor);
      let current = element;

      while (!background && current.parentElement) {
        current = current.parentElement;
        background = parseColor(window.getComputedStyle(current).backgroundColor);
      }

      if (!foreground || !background) {
        return { text: element.textContent.trim(), ratio: null };
      }

      return {
        text: element.textContent.trim(),
        ratio: ratio(foreground, background),
      };
    }).filter((entry) => entry.text.length > 0);
  });
}

module.exports = {
  contrastRatio,
  getHorizontalOverflow,
  getTextMetrics,
  measureContrast,
};
