import { test, expect } from '@playwright/test';

test.describe('User Management Application', () => {
  test('should load the application with users table', async ({ page }) => {
    await page.goto('/');

    // Check if page loads with correct title
    await expect(page).toHaveTitle(/Vite \+ React \+ TS/);

    // Check if main heading is visible
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();

    // Check if the users table is visible
    await expect(page.getByTestId('users-table')).toBeVisible();

    // Check if the Add User button is visible
    await expect(page.getByTestId('add-user-button')).toBeVisible();
  });

  test('should open and close Add User modal', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await page.waitForSelector('[data-testid="users-table"]');

    // Modal should not be visible initially
    await expect(page.getByTestId('add-user-dialog')).not.toBeVisible();

    // Click Add User button
    await page.getByTestId('add-user-button').click();

    // Modal should be visible
    await expect(page.getByTestId('add-user-dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Add New User' })).toBeVisible();

    // Close modal by clicking Cancel
    await page.getByTestId('cancel-button').click();

    // Modal should be closed
    await expect(page.getByTestId('add-user-dialog')).not.toBeVisible();
  });
});
