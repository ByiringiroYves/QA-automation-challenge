// playwright.config.js

import { defineConfig, devices } from '@playwright/test';

/**
 *  This section allows you to load environment variables from a .env file.
 * Useful for local development secrets or configuration.
 * Learn more: https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 *  This is where you configure Playwright's test runner behavior.
 * See full options: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  //  Define where your test files are located. Playwright will scan this directory.
  testDir: './playwright-tests/tests', 

  //  Run tests in parallel for faster execution, especially on CI.
  fullyParallel: true,

  //  Prevent accidental 'test.only' commits from passing CI.
  forbidOnly: !!process.env.CI,

  //  Retry failed tests on CI to reduce flakiness caused by transient issues.
  retries: process.env.CI ? 2 : 0,

  //  Control the number of parallel workers on CI for resource management.
  workers: process.env.CI ? 1 : undefined,

  //  Choose your test reporter. 'html' is great for interactive reports.
  reporter: 'html', 

  /**
   *  'use' defines common options for all tests.
   * This includes the base URL for your application and various test behaviors.
   */
  use: {
    //  This is the base URL for your application. 'await page.goto('/')' will navigate here.
    baseURL: 'http://localhost:5173/', // Ensure this matches your React app's running URL.

    //  Capture traces for failed tests. Invaluable for debugging flaky tests on CI.
    trace: 'on-first-retry',

    //  Set a default timeout for actions (like clicks, fills). 0 means no explicit action timeout.
    actionTimeout: 0, 

    //  Set a maximum time for page navigations to complete.
    navigationTimeout: 30000, // 30 seconds should be sufficient for most navigations.

    //  Explicitly define the directory for Playwright's raw test results (traces, videos, screenshots).
    // This is crucial for GitHub Actions to find and upload them as artifacts.
    outputDir: 'test-results/', 
  },

  /**
   *  Configure different browser projects.
   * This allows you to run tests across various browsers (Chromium, Firefox, WebKit).
   */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /*
     *  Uncomment these for mobile viewport testing.
     * Great for ensuring responsiveness.
     */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /*
     *  Uncomment these for testing against branded browsers like Edge or Chrome.
     * Useful if your users primarily use these specific browsers.
     */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /**
   *  Use 'webServer' to automatically start your application before tests run.
   * Playwright will wait for the URL to be reachable.
   */
  webServer: {
    //  The command to start your React application.
    command: 'npm run dev', 

    //  The URL Playwright will wait for to confirm the app is running.
    url: 'http://localhost:5173', 

    //  Maximum time Playwright will wait for the server to start.
    timeout: 120 * 1000, // 120 seconds should be generous enough.

    //  Reuse an existing server if running locally (not on CI) to speed up local development.
    reuseExistingServer: !process.env.CI, 

    //  Crucially, specify the directory where the 'command' should be executed.
    cwd: './react-app', 
  },
});
