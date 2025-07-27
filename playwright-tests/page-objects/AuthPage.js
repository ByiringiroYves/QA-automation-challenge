    // playwright-tests/page-objects/AuthPage.js
    const { expect } = require('@playwright/test');

    class AuthPage {
      /**
       * @param {import('@playwright/test').Page} page
       */
      constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.signInButton = page.locator('button:has-text("Sign In")');
        this.errorMessage = page.locator('[role="alert"]'); // The div with role="alert" for errors
        this.remwasteAccountText = page.locator('text=REMWASTE Account');
      }

      async navigateTo() {
        await this.page.goto('/'); // Uses baseURL from playwright.config.js
      }

      async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
      }

      async assertErrorMessage(message) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(message);
      }

      async assertLoggedIn() {
        // After successful login, we should be on the User Management page
        // A simple assertion could be to check for the presence of "User Management" or "Users" title
        // The current React app does not change the URL path, so we rely on element presence.
        await expect(this.page.locator('h2:has-text("REMWASTE User Management")')).toBeVisible();
      }

      async assertLoginFailed() {
        // After failed login, we should still be on the login page
        // We can check for the presence of the login button or username input to confirm
        await expect(this.signInButton).toBeVisible();
        await expect(this.usernameInput).toBeVisible();
      }
    }

    module.exports = AuthPage;
