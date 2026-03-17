const { defineConfig, devices } = require('@playwright/test');

const mobileFirefox = {
  name: 'Firefox Mobile 390',
  use: {
    browserName: 'firefox',
    viewport: { width: 390, height: 844 },
    hasTouch: true,
  },
};

const mobileFirefoxNarrow = {
  name: 'Firefox Mobile 360',
  use: {
    browserName: 'firefox',
    viewport: { width: 360, height: 740 },
    hasTouch: true,
  },
};

const androidChromeUa =
  'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36';

module.exports = defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'output/playwright/report' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  webServer: {
    command: 'python3 -m http.server 4173 --bind 127.0.0.1',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'Desktop Safari',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    {
      name: 'Desktop Firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'iPhone SE',
      use: { ...devices['iPhone SE'] },
    },
    {
      name: 'iPhone 12',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'iPhone 14 Pro Max',
      use: { ...devices['iPhone 14 Pro Max'] },
    },
    {
      name: 'iPhone 12 Landscape',
      use: {
        browserName: 'webkit',
        viewport: { width: 844, height: 390 },
        isMobile: true,
        hasTouch: true,
        userAgent: devices['iPhone 12'].userAgent,
      },
    },
    {
      name: 'Pixel 5',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Pixel 7',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'Galaxy S8+',
      use: {
        browserName: 'chromium',
        viewport: { width: 360, height: 740 },
        screen: { width: 360, height: 740 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 3,
        userAgent: androidChromeUa,
      },
    },
    {
      name: 'Galaxy S20 Ultra',
      use: {
        browserName: 'chromium',
        viewport: { width: 412, height: 915 },
        screen: { width: 412, height: 915 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 3.5,
        userAgent: androidChromeUa,
      },
    },
    mobileFirefox,
    mobileFirefoxNarrow,
    {
      name: 'iPad Mini',
      use: { ...devices['iPad Mini'] },
    },
    {
      name: 'iPad Mini Landscape',
      use: {
        browserName: 'webkit',
        viewport: { width: 1024, height: 768 },
        isMobile: true,
        hasTouch: true,
        userAgent: devices['iPad Mini'].userAgent,
      },
    },
  ],
});
