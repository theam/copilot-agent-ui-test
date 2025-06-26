import { test, expect } from '@playwright/test';

test.describe('User Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    // Wait for the page to load
    await page.waitForSelector('[data-testid="users-table"]');
    
    // Click the Add User button to open the modal
    await page.getByTestId('add-user-button').click();
    
    // Wait for the form to be visible
    await page.waitForSelector('[data-testid="user-form"]');
  });

  test('should validate name field correctly', async ({ page }) => {
    const nameField = page.getByLabelText('Name');
    
    // Test required validation
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Name is required')).toBeVisible();
    
    // Test max length validation (>50 chars)
    const longName = 'a'.repeat(51);
    await nameField.fill(longName);
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Name must be at most 50 characters')).toBeVisible();
    
    // Test pattern validation (invalid characters)
    await nameField.fill('John@Doe!');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Name must contain only letters, numbers, underscores, and spaces')).toBeVisible();
    
    // Test valid name
    await nameField.fill('John Doe_123');
    // Should not show error for valid input
    await expect(page.getByText('Name must')).not.toBeVisible();
  });

  test('should validate username field correctly', async ({ page }) => {
    const usernameField = page.getByLabelText('Username');
    
    // Test required validation
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Username is required')).toBeVisible();
    
    // Test max length validation (>50 chars)
    const longUsername = 'u'.repeat(51);
    await usernameField.fill(longUsername);
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Username must be at most 50 characters')).toBeVisible();
    
    // Test pattern validation (invalid characters)
    await usernameField.fill('user@name!');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Username must contain only letters, numbers, underscores, and spaces')).toBeVisible();
    
    // Test valid username
    await usernameField.fill('user_name123');
    // Should not show error for valid input
    await expect(page.getByText('Username must')).not.toBeVisible();
  });

  test('should validate email field correctly', async ({ page }) => {
    const emailField = page.getByLabelText('Email');
    
    // Test required validation
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Email is required')).toBeVisible();
    
    // Test max length validation (>50 chars)
    const longEmail = 'a'.repeat(40) + '@domain.com'; // More than 50 chars
    await emailField.fill(longEmail);
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Email must be at most 50 characters')).toBeVisible();
    
    // Test invalid email format
    await emailField.fill('invalid-email');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Email must be a valid email address')).toBeVisible();
    
    // Test valid email
    await emailField.fill('john@example.com');
    // Should not show error for valid input
    await expect(page.getByText('Email must')).not.toBeVisible();
  });

  test('should validate TIN field correctly', async ({ page }) => {
    const tinField = page.getByLabelText('TIN');
    
    // Test required validation
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('TIN is required')).toBeVisible();
    
    // Test invalid TIN (not 9 digits)
    await tinField.fill('12345');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('TIN must be exactly 9 digits')).toBeVisible();
    
    // Test invalid TIN (letters)
    await tinField.fill('123abc789');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('TIN must be exactly 9 digits')).toBeVisible();
    
    // Test valid TIN
    await tinField.fill('123456789');
    // Should not show error for valid input
    await expect(page.getByText('TIN must')).not.toBeVisible();
  });

  test('should validate phone field correctly', async ({ page }) => {
    const phoneField = page.getByLabelText('Phone');
    
    // Test required validation
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Phone is required')).toBeVisible();
    
    // Test invalid phone (not 10 digits)
    await phoneField.fill('12345');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Phone must be exactly 10 digits')).toBeVisible();
    
    // Test invalid phone (letters)
    await phoneField.fill('123abc7890');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Phone must be exactly 10 digits')).toBeVisible();
    
    // Test valid phone
    await phoneField.fill('1234567890');
    // Should not show error for valid input
    await expect(page.getByText('Phone must')).not.toBeVisible();
  });

  test('should validate website field correctly', async ({ page }) => {
    const websiteField = page.getByLabelText('Website');
    
    // Website is optional, so no required validation
    
    // Test invalid URL
    await websiteField.fill('invalid-url');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Website must be a valid URL')).toBeVisible();
    
    // Test valid URL with http
    await websiteField.fill('http://example.com');
    // Should not show error for valid input
    await expect(page.getByText('Website must')).not.toBeVisible();
    
    // Test valid URL with https
    await websiteField.fill('https://example.com');
    // Should not show error for valid input
    await expect(page.getByText('Website must')).not.toBeVisible();
    
    // Test empty website (should be valid)
    await websiteField.fill('');
    await expect(page.getByText('Website must')).not.toBeVisible();
  });

  test('should successfully submit form with valid data', async ({ page }) => {
    // Fill all required fields with valid data
    await page.getByLabelText('Name').fill('John Doe');
    await page.getByLabelText('Username').fill('john_doe123');
    await page.getByLabelText('Email').fill('john@example.com');
    await page.getByLabelText('TIN').fill('123456789');
    await page.getByLabelText('Phone').fill('1234567890');
    await page.getByLabelText('Website').fill('https://johndoe.com');
    
    // Submit the form
    await page.getByRole('button', { name: 'Add' }).click();
    
    // The modal should close (form should no longer be visible)
    await expect(page.getByTestId('user-form')).not.toBeVisible();
    
    // The new user should appear in the table
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('john_doe123')).toBeVisible();
    await expect(page.getByText('john@example.com')).toBeVisible();
  });
});