    // playwright.config.js
    import { defineConfig, devices } from '@playwright/test';

    /**
     * Read environment variables from .env file.
     * https://github.com/motdotla/dotenv
     */
    // require('dotenv').config();

    /**
     * @see https://playwright.dev/docs/test-configuration
     */
    export default defineConfig({
      testDir: './playwright-tests/tests', // Directory where your test files are located
      /* Run tests in files in parallel */
      fullyParallel: true,
      /* Fail the build on CI if you accidentally left test.only in the source code. */
      forbidOnly: !!process.env.CI,
      /* Retry on CI only */
      retries: process.env.CI ? 2 : 0,
      /* Opt out of parallel tests on CI. */
      workers: process.env.CI ? 1 : undefined,
      /* Reporter to use. See https://playwright.dev/docs/test-reporters */
      reporter: 'html', // Generates an HTML report after tests run
      /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
      use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: 'http://localhost:5173/', // Our React app's default port for Vite http://localhost:5173/

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        /* Set a default timeout for assertions */
        actionTimeout: 0, // No action timeout, let test timeout handle it
        navigationTimeout: 30000, // 30 seconds for navigation
      },

      /* Configure projects for major browsers */
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

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
      ],

      /* Run your local dev server before starting the tests */
      webServer: {
        command: 'npm run dev', // Command to start your React app
        url: 'http://localhost:5173', // URL your React app will be running on
        timeout: 120 * 1000, // Give it 120 seconds to start
        reuseExistingServer: !process.env.CI, // Reuse server if not on CI
        cwd: './react-app', // IMPORTANT: Specify the directory where 'npm run dev' should be executed
      },
    });
    