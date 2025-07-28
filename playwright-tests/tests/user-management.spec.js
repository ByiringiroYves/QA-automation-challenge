// tests/user.spec.js
const { test, expect } = require('@playwright/test');
const { UserListPage } = require('./UserListPage');

test.describe('User Management CRUD', () => {
  let userPage;

  test.beforeEach(async ({ page }) => {
    userPage = new UserListPage(page);
    await userPage.goto();
  });

  test('should allow adding a user', async () => {
    await userPage.clickAddUser();
    await userPage.fillForm('John Doe', 'john@example.com');
    await userPage.submitForm();
    await userPage.assertUserExists('John Doe', 'john@example.com');
  });

  test('should not add user with empty name or email', async () => {
    await userPage.clickAddUser();
    await userPage.fillForm('', '');
    await userPage.submitForm();
    await userPage.assertErrorMessage('Name and Email are required.');
  });

  test('should allow editing user', async () => {
    await userPage.clickAddUser();
    await userPage.fillForm('Alice', 'alice@example.com');
    await userPage.submitForm();

    await userPage.clickEditUser('Alice');
    await userPage.fillForm('Alice Smith', 'alice.smith@example.com');
    await userPage.submitForm();
    await userPage.assertUserExists('Alice Smith', 'alice.smith@example.com');
  });

  test('should delete user', async () => {
    await userPage.clickAddUser();
    await userPage.fillForm('Bob', 'bob@example.com');
    await userPage.submitForm();

    await userPage.clickDeleteUser('Bob');
    await userPage.assertUserDoesNotExist('Bob');
  });
});
