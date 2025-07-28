// tests/user-management.spec.js
const { test, expect } = require('@playwright/test');
const { UserListPage } = require('./UserListPage');

test.describe('User Management CRUD', () => {
  let userPage;

  test.beforeEach(async ({ page }) => {
    userPage = new UserListPage(page);
    await userPage.goto(); // Use the new goto() method
  });

  test('should allow adding a user', async () => {
    await userPage.clickAddUser();
    await userPage.fillUserForm('John Doe', 'john@example.com'); // Corrected from fillForm
    await userPage.saveUser(); // Corrected from submitForm
    await userPage.assertUserInList({ name: 'John Doe', email: 'john@example.com', role: 'User' }); // Corrected from assertUserExists, now passes an object
  });

  test('should not add user with empty name or email', async () => {
    await userPage.clickAddUser();
    await userPage.fillUserForm('', ''); // Corrected from fillForm
    await userPage.saveUser(); // Corrected from submitForm
    await userPage.assertErrorMessage('Name and Email are required.');
  });

  test('should allow editing user', async () => {
    await userPage.clickAddUser();
    await userPage.fillUserForm('Alice', 'alice@example.com');
    await userPage.saveUser();

    await userPage.clickEditUser('Alice');
    await userPage.fillUserForm('Alice Smith', 'alice.smith@example.com');
    await userPage.saveUser();
    await userPage.assertUserInList({ name: 'Alice Smith', email: 'alice.smith@example.com', role: 'User' }); // Corrected
  });

  test('should delete user', async () => {
    await userPage.clickAddUser();
    await userPage.fillUserForm('Bob', 'bob@example.com');
    await userPage.saveUser();

    await userPage.clickDeleteUser('Bob');
    await userPage.confirmDelete(); // Added confirmation step
    await userPage.assertUserNotInList('Bob'); // Corrected from assertUserDoesNotExist
  });

  test('should cancel deleting a user', async () => {
    // Ensure a user exists to attempt deletion on
    await userPage.clickAddUser();
    await userPage.fillUserForm('Charlie Brown', 'charlie@example.com');
    await userPage.saveUser();
    await userPage.assertUserInList({ name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' });

    // Attempt to delete and then cancel
    await userPage.clickDeleteUser('Charlie Brown');
    await userPage.cancelDelete();
    // Assert that the user still exists after cancellation
    await userPage.assertUserInList({ name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' });
  });
});
