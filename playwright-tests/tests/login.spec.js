//login.spec

    const { test, expect } = require('@playwright/test');
    const LoginPage = require('../page-objects/AuthPage'); // Path is relative to this file

    test.describe('Login Functionality', () => {
      let loginPage;

      // Before each test, navigate to the login page
      test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateTo();
      });

      test('should allow a user to login with valid credentials', async ({ page }) => {
        await test.step('Enter valid username and password', async () => {
          await loginPage.login('test', 'password123');
        });

        await test.step('Assert successful login and redirection', async () => {
          await loginPage.assertLoggedIn();
          // Additional assertion for the welcome message or user list presence
          await expect(page.locator('h3:has-text("Users")')).toBeVisible();
          await expect(page.locator('button:has-text("Add User")')).toBeVisible();
        });

        // Bonus: Take a visual snapshot after successful login
        await test.step('Take visual snapshot of user list', async () => {
          await page.waitForLoadState('networkidle'); // Ensure all network requests are done
          await expect(page).toHaveScreenshot('user-list-after-login.png', { fullPage: true });
        });
      });

      test('should display an error message for invalid credentials', async ({ page }) => {
        await test.step('Enter invalid username and password', async () => {
          await loginPage.login('invaliduser', 'wrongpassword');
        });

        await test.step('Assert error message and stay on login page', async () => {
           await loginPage.assertErrorMessage('Invalid credentials');
           await loginPage.assertLoginFailed();
          // Taking a visual snapshot of the login page with error
          await expect(page).toHaveScreenshot('login-error-invalid-credentials.png', { fullPage: true });
        });
      });

      test('should display an error message for empty credentials', async ({ page }) => {
        await test.step('Attempt to login with empty username and password', async () => {
          await loginPage.login('', '');
        });

        await test.step('Assert error message and stay on login page', async () => {
          await loginPage.assertErrorMessage('Please enter both username and password.');
          await loginPage.assertLoginFailed();
          await expect(page).toHaveScreenshot('login-error-empty-credentials.png', { fullPage: true });
        });
      });
    });
    