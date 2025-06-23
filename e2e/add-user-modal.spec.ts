import { test, expect } from '@playwright/test';

test.describe('Add User Modal Validations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForSelector('[data-testid="users-table"]');
    
    // Open the Add User modal
    await page.getByTestId('add-user-button').click();
    await page.waitForSelector('[data-testid="add-user-dialog"]');
  });

  test.describe('Name Field Validation', () => {
    test('should show error for empty name field', async ({ page }) => {
      // Focus and blur the name field without entering text
      await page.locator('#name').focus();
      await page.locator('#email').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Name is required')).toBeVisible();
    });

    test('should show error for name exceeding 50 characters', async ({ page }) => {
      const longName = 'a'.repeat(51);
      
      await page.locator('#name').fill(longName);
      await page.locator('#email').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Name must be 50 characters or less')).toBeVisible();
    });

    test('should show error for name with invalid characters', async ({ page }) => {
      await page.locator('#name').fill('John@Doe!');
      await page.locator('#email').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Name can only contain letters, numbers, underscores, and spaces')).toBeVisible();
    });

    test('should accept valid name with letters, numbers, underscores, and spaces', async ({ page }) => {
      await page.locator('#name').fill('John Doe_123');
      await page.locator('#email').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Name is required')).not.toBeVisible();
      await expect(page.getByText('Name must be 50 characters or less')).not.toBeVisible();
      await expect(page.getByText('Name can only contain letters, numbers, underscores, and spaces')).not.toBeVisible();
    });
  });

  test.describe('Username Field Validation', () => {
    test('should show error for empty username field', async ({ page }) => {
      await page.locator('#username').focus();
      await page.locator('#email').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Username is required')).toBeVisible();
    });

    test('should show error for username exceeding 50 characters', async ({ page }) => {
      const longUsername = 'a'.repeat(51);
      
      await page.locator('#username').fill(longUsername);
      await page.locator('#email').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Username must be 50 characters or less')).toBeVisible();
    });

    test('should show error for username with invalid characters', async ({ page }) => {
      await page.locator('#username').fill('john@doe!');
      await page.locator('#email').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Username can only contain letters, numbers, underscores, and spaces')).toBeVisible();
    });

    test('should accept valid username', async ({ page }) => {
      await page.locator('#username').fill('john_doe123');
      await page.locator('#email').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Username is required')).not.toBeVisible();
      await expect(page.getByText('Username must be 50 characters or less')).not.toBeVisible();
      await expect(page.getByText('Username can only contain letters, numbers, underscores, and spaces')).not.toBeVisible();
    });
  });

  test.describe('Email Field Validation', () => {
    test('should show error for empty email field', async ({ page }) => {
      await page.locator('#email').focus();
      await page.locator('#userTin').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Email is required')).toBeVisible();
    });

    test('should show error for email exceeding 50 characters', async ({ page }) => {
      const longEmail = 'a'.repeat(40) + '@email.com'; // 51 characters total
      
      await page.locator('#email').fill(longEmail);
      await page.locator('#userTin').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Email must be 50 characters or less')).toBeVisible();
    });

    test('should show error for invalid email format', async ({ page }) => {
      await page.locator('#email').fill('invalid-email');
      await page.locator('#userTin').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Please enter a valid email address')).toBeVisible();
    });

    test('should accept valid email format', async ({ page }) => {
      await page.locator('#email').fill('john.doe@example.com');
      await page.locator('#userTin').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Email is required')).not.toBeVisible();
      await expect(page.getByText('Email must be 50 characters or less')).not.toBeVisible();
      await expect(page.getByText('Please enter a valid email address')).not.toBeVisible();
    });
  });

  test.describe('TIN Field Validation', () => {
    test('should show error for empty TIN field', async ({ page }) => {
      await page.locator('#userTin').focus();
      await page.locator('#phone').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('TIN is required')).toBeVisible();
    });

    test('should show error for TIN with less than 9 digits', async ({ page }) => {
      await page.locator('#userTin').fill('12345678');
      await page.locator('#phone').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('TIN must be exactly 9 digits')).toBeVisible();
    });

    test('should show error for TIN with more than 9 digits', async ({ page }) => {
      await page.locator('#userTin').fill('1234567890');
      await page.locator('#phone').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('TIN must be exactly 9 digits')).toBeVisible();
    });

    test('should show error for TIN with non-numeric characters', async ({ page }) => {
      await page.locator('#userTin').fill('12345678a');
      await page.locator('#phone').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('TIN must be exactly 9 digits')).toBeVisible();
    });

    test('should accept valid 9-digit TIN', async ({ page }) => {
      await page.locator('#userTin').fill('123456789');
      await page.locator('#phone').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('TIN is required')).not.toBeVisible();
      await expect(page.getByText('TIN must be exactly 9 digits')).not.toBeVisible();
    });
  });

  test.describe('Phone Field Validation', () => {
    test('should show error for empty phone field', async ({ page }) => {
      await page.locator('#phone').focus();
      await page.locator('#website').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Phone is required')).toBeVisible();
    });

    test('should show error for phone with less than 10 digits', async ({ page }) => {
      await page.locator('#phone').fill('123456789');
      await page.locator('#website').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Phone must be exactly 10 digits')).toBeVisible();
    });

    test('should show error for phone with more than 10 digits', async ({ page }) => {
      await page.locator('#phone').fill('12345678901');
      await page.locator('#website').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Phone must be exactly 10 digits')).toBeVisible();
    });

    test('should show error for phone with non-numeric characters', async ({ page }) => {
      await page.locator('#phone').fill('123456789a');
      await page.locator('#website').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Phone must be exactly 10 digits')).toBeVisible();
    });

    test('should accept valid 10-digit phone', async ({ page }) => {
      await page.locator('#phone').fill('1234567890');
      await page.locator('#website').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Phone is required')).not.toBeVisible();
      await expect(page.getByText('Phone must be exactly 10 digits')).not.toBeVisible();
    });
  });

  test.describe('Website Field Validation', () => {
    test('should allow empty website field (optional)', async ({ page }) => {
      await page.locator('#website').focus();
      await page.locator('#name').focus(); // Trigger onBlur validation
      
      // Website is optional, so no error should be shown
      await expect(page.getByText('Please enter a valid URL (e.g., https://example.com)')).not.toBeVisible();
    });

    test('should show error for invalid URL format', async ({ page }) => {
      await page.locator('#website').fill('invalid-url');
      await page.locator('#name').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Please enter a valid URL (e.g., https://example.com)')).toBeVisible();
    });

    test('should accept valid HTTP URL', async ({ page }) => {
      await page.locator('#website').fill('http://example.com');
      await page.locator('#name').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Please enter a valid URL (e.g., https://example.com)')).not.toBeVisible();
    });

    test('should accept valid HTTPS URL', async ({ page }) => {
      await page.locator('#website').fill('https://www.example.com');
      await page.locator('#name').focus(); // Trigger onBlur validation
      
      await expect(page.getByText('Please enter a valid URL (e.g., https://example.com)')).not.toBeVisible();
    });
  });

  test.describe('Form Submission', () => {
    test('should prevent submission with validation errors', async ({ page }) => {
      // Fill form with invalid data
      await page.locator('#name').fill('John@Doe!');
      await page.locator('#username').fill('john@doe!');
      await page.locator('#email').fill('invalid-email');
      await page.locator('#userTin').fill('12345678');
      await page.locator('#phone').fill('123456789');
      await page.locator('#website').fill('invalid-url');
      
      // Try to submit
      await page.getByTestId('submit-button').click();
      
      // Verify that validation errors are shown
      await expect(page.getByText('Name can only contain letters, numbers, underscores, and spaces')).toBeVisible();
      await expect(page.getByText('Username can only contain letters, numbers, underscores, and spaces')).toBeVisible();
      await expect(page.getByText('Please enter a valid email address')).toBeVisible();
      await expect(page.getByText('TIN must be exactly 9 digits')).toBeVisible();
      await expect(page.getByText('Phone must be exactly 10 digits')).toBeVisible();
      await expect(page.getByText('Please enter a valid URL (e.g., https://example.com)')).toBeVisible();
      
      // Dialog should still be open
      await expect(page.getByTestId('add-user-dialog')).toBeVisible();
    });

    test('should successfully submit form with valid data', async ({ page }) => {
      // Fill form with valid data
      await page.locator('#name').fill('John Doe');
      await page.locator('#username').fill('john_doe');
      await page.locator('#email').fill('john.doe@example.com');
      await page.locator('#userTin').fill('123456789');
      await page.locator('#phone').fill('1234567890');
      await page.locator('#website').fill('https://johndoe.com');
      
      // Submit the form
      await page.getByTestId('submit-button').click();
      
      // Wait for form to be submitted and dialog to close
      await page.waitForTimeout(1000); // Wait for API call to complete
      
      // Dialog should be closed
      await expect(page.getByTestId('add-user-dialog')).not.toBeVisible();
      
      // Verify user was added to the table
      await expect(page.getByText('John Doe')).toBeVisible();
      await expect(page.getByText('john_doe')).toBeVisible();
      await expect(page.getByText('john.doe@example.com')).toBeVisible();
    });

    test('should cancel form and close dialog', async ({ page }) => {
      // Fill some data
      await page.locator('#name').fill('John Doe');
      
      // Click cancel
      await page.getByTestId('cancel-button').click();
      
      // Dialog should be closed
      await expect(page.getByTestId('add-user-dialog')).not.toBeVisible();
      
      // Data should not be added to table
      await expect(page.getByText('John Doe')).not.toBeVisible();
    });
  });

  test.describe('Validation Mode (onBlur)', () => {
    test('should validate field when it loses focus', async ({ page }) => {
      // Enter invalid data in name field
      await page.locator('#name').fill('John@Doe!');
      
      // Error should not be visible immediately (not onChange)
      await expect(page.getByText('Name can only contain letters, numbers, underscores, and spaces')).not.toBeVisible();
      
      // Focus another field to trigger onBlur validation
      await page.locator('#email').focus();
      
      // Now error should be visible
      await expect(page.getByText('Name can only contain letters, numbers, underscores, and spaces')).toBeVisible();
    });

    test('should validate all required fields on blur', async ({ page }) => {
      // Focus each required field and then blur without entering data
      await page.locator('#name').focus();
      await page.locator('#username').focus();
      await page.locator('#email').focus();
      await page.locator('#userTin').focus();
      await page.locator('#phone').focus();
      await page.locator('#website').focus(); // Blur the phone field
      
      // All required field errors should be visible
      await expect(page.getByText('Name is required')).toBeVisible();
      await expect(page.getByText('Username is required')).toBeVisible();
      await expect(page.getByText('Email is required')).toBeVisible();
      await expect(page.getByText('TIN is required')).toBeVisible();
      await expect(page.getByText('Phone is required')).toBeVisible();
    });
  });
});