    // playwright-tests/tests/user-management.spec.js
    const { test, expect } = require('@playwright/test');
    const AuthPage = require('../page-objects/AuthPage'); // Renamed from LoginPage
    const UserListPage = require('../page-objects/UserListPage');

    test.describe('User Management Functionality (CRUD)', () => {
      let authPage;
      let userListPage;

      // Log in once before all tests in this describe block
      test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        userListPage = new UserListPage(page);

        // Perform login
        await authPage.navigateTo();
        await authPage.login('test', 'password123');
        await authPage.assertLoggedIn(); // Ensure login was successful
        await userListPage.navigateToUserListAfterLogin(); // Ensure we are on the user list page
      });

      test('should allow a user to be created', async ({ page }) => {
        const newUser = {
          name: 'Test User',
          email: 'test.user@example.com',
          role: 'User',
        };

        await test.step('Click Add User and fill form', async () => {
          await userListPage.clickAddUser();
          await userListPage.fillUserForm(newUser.name, newUser.email, newUser.role);
          await userListPage.saveUser();
          await expect(userListPage.modalTitle).not.toBeVisible();
        });

        await test.step('Assert user is added and success message appears', async () => {
          await userListPage.assertSuccessMessage('User added successfully!');
          await userListPage.assertUserInList(newUser);
        });

        // Bonus: Take a visual snapshot after adding a user
        await test.step('Take visual snapshot after adding user', async () => {
          await page.waitForLoadState('networkidle');
          await expect(page).toHaveScreenshot('user-list-after-add.png', { fullPage: true });
        });
      });

      test('should allow an existing user to be edited', async ({ page }) => {
        // First, ensure a user exists to edit (e.g., Alice Smith from dummy data)
        const originalUser = { name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' };
        const updatedUser = { name: 'Alice Updated', email: 'alice.updated@example.com', role: 'User' };

        await test.step('Click Edit for an existing user and update form', async () => {
          await userListPage.clickEditUser(originalUser.name);
          await userListPage.fillUserForm(updatedUser.name, updatedUser.email, updatedUser.role);
          await userListPage.saveUser();
          await expect(userListPage.modalTitle).not.toBeVisible();
        });

        await test.step('Assert user is updated and success message appears', async () => {
          await userListPage.assertSuccessMessage('User updated successfully!');
          await userListPage.assertUserInList(updatedUser);
          await userListPage.assertUserNotInList(originalUser.name); // Original name should no longer be present
        });

        // Bonus: Take a visual snapshot after editing a user
        await test.step('Take visual snapshot after editing user', async () => {
          await page.waitForLoadState('networkidle');
          await expect(page).toHaveScreenshot('user-list-after-edit.png', { fullPage: true });
        });
      });

      test('should allow an existing user to be deleted', async ({ page }) => {
        // First, ensure a user exists to delete (e.g., Bob Johnson from dummy data)
        const userToDeleteName = 'Bob Johnson';

        await test.step('Click Delete for an existing user and confirm deletion', async () => {
          await userListPage.clickDeleteUser(userToDeleteName);
          await userListPage.confirmDelete();
        });

        await test.step('Assert user is deleted and success message appears', async () => {
          await userListPage.assertSuccessMessage('User deleted successfully!');
          await userListPage.assertUserNotInList(userToDeleteName);
        });

        // Bonus: Take a visual snapshot after deleting a user
        await test.step('Take visual snapshot after deleting user', async () => {
          await page.waitForLoadState('networkidle');
          await expect(page).toHaveScreenshot('user-list-after-delete.png', { fullPage: true });
        });
      });

      test('should not add user with empty name or email', async ({ page }) => {
        await test.step('Click Add User and attempt to save with empty fields', async () => {
          await userListPage.clickAddUser();
          await userListPage.fillUserForm('', ''); // Empty name and email
          await userListPage.saveUser();
        });

        await test.step('Assert error message and modal remains open', async () => {
          await userListPage.assertErrorMessage('Name and Email are required.');
          await expect(userListPage.modalTitle).toBeVisible(); // Modal should still be open
          await userListPage.cancelForm(); // Close the modal to clean up
        });
      });

      test('should cancel adding a new user', async ({ page }) => {
        const tempUser = { name: 'Temp User', email: 'temp@example.com', role: 'User' };

        await test.step('Click Add User, fill form partially, then cancel', async () => {
          await userListPage.clickAddUser();
          await userListPage.fillUserForm(tempUser.name, tempUser.email, tempUser.role);
          await userListPage.cancelForm();
        });

        await test.step('Assert user is not added to the list', async () => {
          await userListPage.assertUserNotInList(tempUser.name);
        });
      });

      test('should cancel deleting a user', async ({ page }) => {
        // Use Charlie Brown as a target for cancellation
        const userToKeep = { name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' };

        await test.step('Click Delete for a user, then cancel deletion', async () => {
          await userListPage.clickDeleteUser(userToKeep);
          await userListPage.cancelDelete();
        });

        await test.step('Assert user is still in the list', async () => {
          await userListPage.assertUserInList(userToKeep);
        });
      });
    });
    