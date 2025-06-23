import { test, expect, type Page } from '@playwright/test';

// Helper function to wait for the users table to load
const waitForTableLoad = async (page: Page) => {
  await page.waitForSelector('[data-testid="users-table"]', { timeout: 10000 });
  await page.waitForLoadState('networkidle');
};

// Helper function to fill user form fields
const fillUserForm = async (page: Page, userData: { name?: string; username?: string; email?: string; userTin?: string; phone?: string; website?: string }) => {
  if (userData.name !== undefined) {
    await page.getByLabelText('Name').fill(userData.name);
  }
  if (userData.username !== undefined) {
    await page.getByLabelText('Username').fill(userData.username);
  }
  if (userData.email !== undefined) {
    await page.getByLabelText('Email').fill(userData.email);
  }
  if (userData.userTin !== undefined) {
    await page.getByLabelText('TIN').fill(userData.userTin);
  }
  if (userData.phone !== undefined) {
    await page.getByLabelText('Phone').fill(userData.phone);
  }
  if (userData.website !== undefined) {
    await page.getByLabelText('Website').fill(userData.website);
  }
};

test.describe('User Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display users table', async ({ page }) => {
    // Wait for the page to load
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
    
    // Check that the users table is present
    await waitForTableLoad(page);
    
    // Verify table headers
    await expect(page.getByText('ID')).toBeVisible();
    await expect(page.getByText('Name')).toBeVisible();
    await expect(page.getByText('Username')).toBeVisible();
    await expect(page.getByText('Email')).toBeVisible();
    await expect(page.getByText('TIN')).toBeVisible();
    await expect(page.getByText('Phone')).toBeVisible();
    await expect(page.getByText('Actions')).toBeVisible();
  });

  test('should add a new user', async ({ page }) => {
    await waitForTableLoad(page);
    
    // Click Add User button
    await page.getByRole('button', { name: 'Add User' }).click();
    
    // Check that the dialog opened
    await expect(page.getByText('Add New User')).toBeVisible();
    
    // Fill the form
    await fillUserForm(page, {
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      userTin: '123456789',
      phone: '+1234567890',
      website: 'https://johndoe.com'
    });
    
    // Submit the form
    await page.getByRole('button', { name: 'Add' }).click();
    
    // Wait for the dialog to close and table to refresh
    await expect(page.getByText('Add New User')).not.toBeVisible();
    await waitForTableLoad(page);
    
    // Verify the new user appears in the table
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('johndoe')).toBeVisible();
    await expect(page.getByText('john@example.com')).toBeVisible();
  });

  test('should edit an existing user', async ({ page }) => {
    await waitForTableLoad(page);
    
    // First, add a user to edit
    await page.getByRole('button', { name: 'Add User' }).click();
    await fillUserForm(page, {
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      userTin: '987654321',
      phone: '+9876543210',
      website: 'https://janesmith.com'
    });
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Add New User')).not.toBeVisible();
    await waitForTableLoad(page);
    
    // Find and click the Edit button for the user
    const editButton = page.locator('tr').filter({ hasText: 'Jane Smith' }).getByRole('button', { name: 'Edit' });
    await editButton.click();
    
    // Check that the edit dialog opened
    await expect(page.getByText('Edit User')).toBeVisible();
    
    // Verify form is pre-populated
    await expect(page.getByDisplayValue('Jane Smith')).toBeVisible();
    await expect(page.getByDisplayValue('janesmith')).toBeVisible();
    await expect(page.getByDisplayValue('jane@example.com')).toBeVisible();
    
    // Edit some fields
    await page.getByDisplayValue('Jane Smith').fill('Jane Doe Smith');
    await page.getByDisplayValue('janesmith').fill('janedoesmith');
    await page.getByDisplayValue('+9876543210').fill('+1111111111');
    
    // Submit the form
    await page.getByRole('button', { name: 'Update' }).click();
    
    // Wait for the dialog to close and table to refresh
    await expect(page.getByText('Edit User')).not.toBeVisible();
    await waitForTableLoad(page);
    
    // Verify the user information was updated
    await expect(page.getByText('Jane Doe Smith')).toBeVisible();
    await expect(page.getByText('janedoesmith')).toBeVisible();
    await expect(page.getByText('+1111111111')).toBeVisible();
    
    // Verify the old information is no longer present
    await expect(page.getByText('Jane Smith').first()).not.toBeVisible();
    await expect(page.getByText('janesmith').first()).not.toBeVisible();
    await expect(page.getByText('+9876543210')).not.toBeVisible();
  });

  test('should cancel edit without saving changes', async ({ page }) => {
    await waitForTableLoad(page);
    
    // First, add a user to edit
    await page.getByRole('button', { name: 'Add User' }).click();
    await fillUserForm(page, {
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      userTin: '555555555',
      phone: '+5555555555'
    });
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Add New User')).not.toBeVisible();
    await waitForTableLoad(page);
    
    // Click Edit button
    const editButton = page.locator('tr').filter({ hasText: 'Test User' }).getByRole('button', { name: 'Edit' });
    await editButton.click();
    
    // Check that the edit dialog opened
    await expect(page.getByText('Edit User')).toBeVisible();
    
    // Make some changes
    await page.getByDisplayValue('Test User').fill('Changed Name');
    await page.getByDisplayValue('testuser').fill('changeduser');
    
    // Cancel the edit
    await page.getByRole('button', { name: 'Cancel' }).click();
    
    // Wait for the dialog to close
    await expect(page.getByText('Edit User')).not.toBeVisible();
    
    // Verify the original information is still present (changes were not saved)
    await expect(page.getByText('Test User')).toBeVisible();
    await expect(page.getByText('testuser')).toBeVisible();
    await expect(page.getByText('Changed Name')).not.toBeVisible();
    await expect(page.getByText('changeduser')).not.toBeVisible();
  });

  test('should handle partial user updates', async ({ page }) => {
    await waitForTableLoad(page);
    
    // First, add a user to edit
    await page.getByRole('button', { name: 'Add User' }).click();
    await fillUserForm(page, {
      name: 'Partial Update User',
      username: 'partialuser',
      email: 'partial@example.com',
      userTin: '111111111',
      phone: '+1111111111',
      website: 'https://partial.com'
    });
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Add New User')).not.toBeVisible();
    await waitForTableLoad(page);
    
    // Click Edit button
    const editButton = page.locator('tr').filter({ hasText: 'Partial Update User' }).getByRole('button', { name: 'Edit' });
    await editButton.click();
    
    // Check that the edit dialog opened
    await expect(page.getByText('Edit User')).toBeVisible();
    
    // Only change the phone number
    await page.getByDisplayValue('+1111111111').fill('+2222222222');
    
    // Submit the form
    await page.getByRole('button', { name: 'Update' }).click();
    
    // Wait for the dialog to close and table to refresh
    await expect(page.getByText('Edit User')).not.toBeVisible();
    await waitForTableLoad(page);
    
    // Verify only the phone number was updated, other fields remain the same
    await expect(page.getByText('Partial Update User')).toBeVisible();
    await expect(page.getByText('partialuser')).toBeVisible();
    await expect(page.getByText('partial@example.com')).toBeVisible();
    await expect(page.getByText('111111111')).toBeVisible();
    await expect(page.getByText('+2222222222')).toBeVisible();
    
    // Verify the old phone number is no longer present
    await expect(page.getByText('+1111111111')).not.toBeVisible();
  });

  test('should validate required fields on add user form', async ({ page }) => {
    await waitForTableLoad(page);
    
    // Click Add User button
    await page.getByRole('button', { name: 'Add User' }).click();
    
    // Try to submit without filling required fields
    await page.getByRole('button', { name: 'Add' }).click();
    
    // Check that validation errors appear
    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Username is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('TIN is required')).toBeVisible();
    await expect(page.getByText('Phone is required')).toBeVisible();
  });

  test('should allow empty fields on edit user form', async ({ page }) => {
    await waitForTableLoad(page);
    
    // First, add a user to edit
    await page.getByRole('button', { name: 'Add User' }).click();
    await fillUserForm(page, {
      name: 'Edit Empty User',
      username: 'editemptyuser',
      email: 'editempty@example.com',
      userTin: '777777777',
      phone: '+7777777777'
    });
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Add New User')).not.toBeVisible();
    await waitForTableLoad(page);
    
    // Click Edit button
    const editButton = page.locator('tr').filter({ hasText: 'Edit Empty User' }).getByRole('button', { name: 'Edit' });
    await editButton.click();
    
    // Check that the edit dialog opened
    await expect(page.getByText('Edit User')).toBeVisible();
    
    // Clear some fields (edit form should allow empty fields)
    await page.getByDisplayValue('Edit Empty User').fill('');
    await page.getByDisplayValue('+7777777777').fill('');
    
    // Submit the form (should succeed without validation errors)
    await page.getByRole('button', { name: 'Update' }).click();
    
    // Wait for the dialog to close (no validation errors should prevent submission)
    await expect(page.getByText('Edit User')).not.toBeVisible();
    await waitForTableLoad(page);
  });
});