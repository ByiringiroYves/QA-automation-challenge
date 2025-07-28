// UserListPage.js
const { expect } = require('@playwright/test');

class UserListPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.addUserButton = page.locator('button:has-text("Add User")');
    this.logoutButton = page.locator('button:has-text("Logout")');
    this.userTable = page.locator('table');
    this.userRows = page.locator('tbody tr'); // All rows in the table body
    this.messageAlert = page.locator('[role="alert"]');
    this.modalErrorMessage = page.locator('[data-testid="user-form-error-message"]'); // Success/Error messages

    // Modals and Form elements (reused for Add/Edit)
    this.modalTitle = page.locator('.fixed.inset-0 h3'); // Title of the modal (Add New User / Edit User)
    this.userNameInput = page.locator('#name');
    this.userEmailInput = page.locator('#email');
    this.userRoleSelect = page.locator('#role');

    // UPDATED LOCATOR: Target the submit button specifically within the active modal
    this.saveUserButton = page.locator('.fixed.inset-0.bg-gray-600 .bg-white button[type="submit"]');

    this.cancelButton = page.locator('button:has-text("Cancel")'); // Cancel button in modal

    // Confirm Delete Modal
    this.confirmDeleteModal = page.locator('.fixed.inset-0.bg-gray-600'); // The entire confirm modal
    this.confirmDeleteButton = page.locator('.fixed.inset-0.bg-gray-600 .bg-white button:has-text("Delete")'); // Delete button in confirm modal
    this.cancelDeleteButton = page.locator('.fixed.inset-0.bg-gray-600 .bg-white button:has-text("Cancel")'); // Cancel button in confirm modal
  }

  /**
   * Navigates to the base URL of the application.
   * Playwright's baseURL is configured in playwright.config.js.
   */
  async goto() {
    await this.page.goto('/');
    // Optionally, wait for the user management page to load
    await expect(this.page.locator('h2:has-text("REMWASTE User Management")')).toBeVisible();
    await expect(this.userTable).toBeVisible();
  }

  async navigateToUserListAfterLogin() {
    // Assuming we are already logged in and on the user list page
    await expect(this.page.locator('h2:has-text("REMWASTE User Management")')).toBeVisible();
    await expect(this.userTable).toBeVisible();
  }

  async clickAddUser() {
    await this.addUserButton.click();
    await expect(this.modalTitle).toContainText('Add New User');
  }

  async fillUserForm(name, email, role = 'User') { // Corrected method name
    await this.userNameInput.fill(name);
    await this.userEmailInput.fill(email);
    await this.userRoleSelect.selectOption(role);
  }

  async saveUser() { // Corrected method name (was submitForm)
    await this.saveUserButton.click();
    //await expect(this.modalTitle).not.toBeVisible(); // Modal should close
  }

  async cancelForm() {
    await this.cancelButton.click();
    await expect(this.modalTitle).not.toBeVisible(); // Modal should close
  }

  async getUserRow(name) {
    // This locator finds a <tr> element that contains a <td> with the exact name.
    return this.page.locator(`tbody tr:has(td:text-is("${name}"))`);
  }

  // Also, let's refine the assertUserInList to be more explicit about what it's checking
  async assertUserInList(user) { // Corrected method name (was assertUserExists)
    console.log('assertUserInList: User object received:', user);
    console.log('assertUserInList: User name being used:', user.name);

    const userRow = this.page.locator(`tbody tr:has(td:text-is("${user.name}"))`);
    await expect(userRow).toBeVisible();
    await expect(userRow).toContainText(user.email);
    await expect(userRow).toContainText(user.role);
  }

  // And assertUserNotInList
  async assertUserNotInList(name) { // Corrected method name (was assertUserDoesNotExist)
    const userRow = this.page.locator(`tbody tr:has(td:text-is("${name}"))`);
    await expect(userRow).not.toBeVisible();
  }

  async clickEditUser(name) {
    const userRow = await this.getUserRow(name);
    await userRow.locator('button:has-text("Edit")').click();
    await this.page.waitForSelector('.fixed.inset-0 h3', { timeout: 3000 });
    await expect(this.modalTitle).toContainText('Edit User');
    // Assert form is pre-filled
    await expect(this.userNameInput).toHaveValue(name);
  }

  async clickDeleteUser(name) {
    const userRow = await this.getUserRow(name);
    await userRow.locator('button:has-text("Delete")').click();
    await expect(this.confirmDeleteModal).toBeVisible();
    await expect(this.confirmDeleteModal).toContainText(`Are you sure you want to delete user "${name}"?`);
  }

  async confirmDelete() {
    await this.confirmDeleteButton.click();
    await expect(this.confirmDeleteModal).not.toBeVisible(); // Modal should close
  }

  async cancelDelete() {
    await this.cancelDeleteButton.click();
    await expect(this.confirmDeleteModal).not.toBeVisible(); // Modal should close
  }

  async assertSuccessMessage(message) {
    await expect(this.messageAlert).toBeVisible();
    await expect(this.messageAlert).toContainText(message);
    await expect(this.messageAlert).toHaveClass(/bg-green-100/); // Check for green background
  }

  async assertErrorMessage(message) {
    // Small delay to allow React to render the error text
    await this.page.waitForTimeout(100);

    // More precise: check the inner <span> directly
    await expect(this.modalErrorMessage.locator('span')).toHaveText(message, { timeout: 3000 });
  }

  async logout() {
    await this.logoutButton.click();
    // After logout, we should be back on the login page
    await expect(this.page.locator('h2:has-text("Sign in with REMWASTE Account")')).toBeVisible();
  }
}

module.exports = UserListPage;
// UserListPage.js
const { expect } = require('@playwright/test');

class UserListPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.addUserButton = page.locator('button:has-text("Add User")');
    this.logoutButton = page.locator('button:has-text("Logout")');
    this.userTable = page.locator('table');
    this.userRows = page.locator('tbody tr'); // All rows in the table body
    this.messageAlert = page.locator('[role="alert"]');
    this.modalErrorMessage = page.locator('[data-testid="user-form-error-message"]'); // Success/Error messages

    // Modals and Form elements (reused for Add/Edit)
    this.modalTitle = page.locator('.fixed.inset-0 h3'); // Title of the modal (Add New User / Edit User)
    this.userNameInput = page.locator('#name');
    this.userEmailInput = page.locator('#email');
    this.userRoleSelect = page.locator('#role');

    // UPDATED LOCATOR: Target the submit button specifically within the active modal
    this.saveUserButton = page.locator('.fixed.inset-0.bg-gray-600 .bg-white button[type="submit"]');

    this.cancelButton = page.locator('button:has-text("Cancel")'); // Cancel button in modal

    // Confirm Delete Modal
    this.confirmDeleteModal = page.locator('.fixed.inset-0.bg-gray-600'); // The entire confirm modal
    this.confirmDeleteButton = page.locator('.fixed.inset-0.bg-gray-600 .bg-white button:has-text("Delete")'); // Delete button in confirm modal
    this.cancelDeleteButton = page.locator('.fixed.inset-0.bg-gray-600 .bg-white button:has-text("Cancel")'); // Cancel button in confirm modal
  }

  /**
   * Navigates to the base URL of the application.
   * Playwright's baseURL is configured in playwright.config.js.
   */
  async goto() {
    await this.page.goto('/');
    // Optionally, wait for the user management page to load
    await expect(this.page.locator('h2:has-text("REMWASTE User Management")')).toBeVisible();
    await expect(this.userTable).toBeVisible();
  }

  async navigateToUserListAfterLogin() {
    // Assuming we are already logged in and on the user list page
    await expect(this.page.locator('h2:has-text("REMWASTE User Management")')).toBeVisible();
    await expect(this.userTable).toBeVisible();
  }

  async clickAddUser() {
    await this.addUserButton.click();
    await expect(this.modalTitle).toContainText('Add New User');
  }

  async fillUserForm(name, email, role = 'User') { // Corrected method name
    await this.userNameInput.fill(name);
    await this.userEmailInput.fill(email);
    await this.userRoleSelect.selectOption(role);
  }

  async saveUser() { // Corrected method name (was submitForm)
    await this.saveUserButton.click();
    //await expect(this.modalTitle).not.toBeVisible(); // Modal should close
  }

  async cancelForm() {
    await this.cancelButton.click();
    await expect(this.modalTitle).not.toBeVisible(); // Modal should close
  }

  async getUserRow(name) {
    // This locator finds a <tr> element that contains a <td> with the exact name.
    return this.page.locator(`tbody tr:has(td:text-is("${name}"))`);
  }

  // Also, let's refine the assertUserInList to be more explicit about what it's checking
  async assertUserInList(user) { // Corrected method name (was assertUserExists)
    console.log('assertUserInList: User object received:', user);
    console.log('assertUserInList: User name being used:', user.name);

    const userRow = this.page.locator(`tbody tr:has(td:text-is("${user.name}"))`);
    await expect(userRow).toBeVisible();
    await expect(userRow).toContainText(user.email);
    await expect(userRow).toContainText(user.role);
  }

  // And assertUserNotInList
  async assertUserNotInList(name) { // Corrected method name (was assertUserDoesNotExist)
    const userRow = this.page.locator(`tbody tr:has(td:text-is("${name}"))`);
    await expect(userRow).not.toBeVisible();
  }

  async clickEditUser(name) {
    const userRow = await this.getUserRow(name);
    await userRow.locator('button:has-text("Edit")').click();
    await this.page.waitForSelector('.fixed.inset-0 h3', { timeout: 3000 });
    await expect(this.modalTitle).toContainText('Edit User');
    // Assert form is pre-filled
    await expect(this.userNameInput).toHaveValue(name);
  }

  async clickDeleteUser(name) {
    const userRow = await this.getUserRow(name);
    await userRow.locator('button:has-text("Delete")').click();
    await expect(this.confirmDeleteModal).toBeVisible();
    await expect(this.confirmDeleteModal).toContainText(`Are you sure you want to delete user "${name}"?`);
  }

  async confirmDelete() {
    await this.confirmDeleteButton.click();
    await expect(this.confirmDeleteModal).not.toBeVisible(); // Modal should close
  }

  async cancelDelete() {
    await this.cancelDeleteButton.click();
    await expect(this.confirmDeleteModal).not.toBeVisible(); // Modal should close
  }

  async assertSuccessMessage(message) {
    await expect(this.messageAlert).toBeVisible();
    await expect(this.messageAlert).toContainText(message);
    await expect(this.messageAlert).toHaveClass(/bg-green-100/); // Check for green background
  }

  async assertErrorMessage(message) {
    // Small delay to allow React to render the error text
    await this.page.waitForTimeout(100);

    // More precise: check the inner <span> directly
    await expect(this.modalErrorMessage.locator('span')).toHaveText(message, { timeout: 3000 });
  }

  async logout() {
    await this.logoutButton.click();
    // After logout, we should be back on the login page
    await expect(this.page.locator('h2:has-text("Sign in with REMWASTE Account")')).toBeVisible();
  }
}

module.exports = UserListPage;
// UserListPage.js
const { expect } = require('@playwright/test');

class UserListPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.addUserButton = page.locator('button:has-text("Add User")');
    this.logoutButton = page.locator('button:has-text("Logout")');
    this.userTable = page.locator('table');
    this.userRows = page.locator('tbody tr'); // All rows in the table body
    this.messageAlert = page.locator('[role="alert"]');
    this.modalErrorMessage = page.locator('[data-testid="user-form-error-message"]'); // Success/Error messages

    // Modals and Form elements (reused for Add/Edit)
    this.modalTitle = page.locator('.fixed.inset-0 h3'); // Title of the modal (Add New User / Edit User)
    this.userNameInput = page.locator('#name');
    this.userEmailInput = page.locator('#email');
    this.userRoleSelect = page.locator('#role');

    // UPDATED LOCATOR: Target the submit button specifically within the active modal
    this.saveUserButton = page.locator('.fixed.inset-0.bg-gray-600 .bg-white button[type="submit"]');

    this.cancelButton = page.locator('button:has-text("Cancel")'); // Cancel button in modal

    // Confirm Delete Modal
    this.confirmDeleteModal = page.locator('.fixed.inset-0.bg-gray-600'); // The entire confirm modal
    this.confirmDeleteButton = page.locator('.fixed.inset-0.bg-gray-600 .bg-white button:has-text("Delete")'); // Delete button in confirm modal
    this.cancelDeleteButton = page.locator('.fixed.inset-0.bg-gray-600 .bg-white button:has-text("Cancel")'); // Cancel button in confirm modal
  }

  /**
   * Navigates to the base URL of the application.
   * Playwright's baseURL is configured in playwright.config.js.
   */
  async goto() {
    await this.page.goto('/');
    // Optionally, wait for the user management page to load
    await expect(this.page.locator('h2:has-text("REMWASTE User Management")')).toBeVisible();
    await expect(this.userTable).toBeVisible();
  }

  async navigateToUserListAfterLogin() {
    // Assuming we are already logged in and on the user list page
    await expect(this.page.locator('h2:has-text("REMWASTE User Management")')).toBeVisible();
    await expect(this.userTable).toBeVisible();
  }

  async clickAddUser() {
    await this.addUserButton.click();
    await expect(this.modalTitle).toContainText('Add New User');
  }

  async fillUserForm(name, email, role = 'User') { // Corrected method name
    await this.userNameInput.fill(name);
    await this.userEmailInput.fill(email);
    await this.userRoleSelect.selectOption(role);
  }

  async saveUser() { // Corrected method name (was submitForm)
    await this.saveUserButton.click();
    //await expect(this.modalTitle).not.toBeVisible(); // Modal should close
  }

  async cancelForm() {
    await this.cancelButton.click();
    await expect(this.modalTitle).not.toBeVisible(); // Modal should close
  }

  async getUserRow(name) {
    // This locator finds a <tr> element that contains a <td> with the exact name.
    return this.page.locator(`tbody tr:has(td:text-is("${name}"))`);
  }

  // Also, let's refine the assertUserInList to be more explicit about what it's checking
  async assertUserInList(user) { // Corrected method name (was assertUserExists)
    console.log('assertUserInList: User object received:', user);
    console.log('assertUserInList: User name being used:', user.name);

    const userRow = this.page.locator(`tbody tr:has(td:text-is("${user.name}"))`);
    await expect(userRow).toBeVisible();
    await expect(userRow).toContainText(user.email);
    await expect(userRow).toContainText(user.role);
  }

  // And assertUserNotInList
  async assertUserNotInList(name) { // Corrected method name (was assertUserDoesNotExist)
    const userRow = this.page.locator(`tbody tr:has(td:text-is("${name}"))`);
    await expect(userRow).not.toBeVisible();
  }

  async clickEditUser(name) {
    const userRow = await this.getUserRow(name);
    await userRow.locator('button:has-text("Edit")').click();
    await this.page.waitForSelector('.fixed.inset-0 h3', { timeout: 3000 });
    await expect(this.modalTitle).toContainText('Edit User');
    // Assert form is pre-filled
    await expect(this.userNameInput).toHaveValue(name);
  }

  async clickDeleteUser(name) {
    const userRow = await this.getUserRow(name);
    await userRow.locator('button:has-text("Delete")').click();
    await expect(this.confirmDeleteModal).toBeVisible();
    await expect(this.confirmDeleteModal).toContainText(`Are you sure you want to delete user "${name}"?`);
  }

  async confirmDelete() {
    await this.confirmDeleteButton.click();
    await expect(this.confirmDeleteModal).not.toBeVisible(); // Modal should close
  }

  async cancelDelete() {
    await this.cancelDeleteButton.click();
    await expect(this.confirmDeleteModal).not.toBeVisible(); // Modal should close
  }

  async assertSuccessMessage(message) {
    await expect(this.messageAlert).toBeVisible();
    await expect(this.messageAlert).toContainText(message);
    await expect(this.messageAlert).toHaveClass(/bg-green-100/); // Check for green background
  }

  async assertErrorMessage(message) {
    // Small delay to allow React to render the error text
    await this.page.waitForTimeout(100);

    // More precise: check the inner <span> directly
    await expect(this.modalErrorMessage.locator('span')).toHaveText(message, { timeout: 3000 });
  }

  async logout() {
    await this.logoutButton.click();
    // After logout, we should be back on the login page
    await expect(this.page.locator('h2:has-text("Sign in with REMWASTE Account")')).toBeVisible();
  }
}

module.exports = UserListPage;
