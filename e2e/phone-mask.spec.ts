import { test, expect } from '@playwright/test';

test.describe('Phone Input Mask', () => {
  test.skip('should apply phone mask ###-###-#### to phone input field', async ({ page }) => {
    // This test validates the phone mask functionality
    // To run: ensure dev server is running and playwright browsers are installed
    await page.goto('http://localhost:5173/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Click Add User button to open the modal
    await page.getByRole('button', { name: 'Add User' }).click();
    
    // Wait for dialog to be visible
    await expect(page.getByRole('dialog')).toBeVisible();
    
    // Get the phone input field
    const phoneInput = page.getByLabelText('Phone');
    await expect(phoneInput).toBeVisible();
    
    // Test that the mask is applied by typing digits
    await phoneInput.click();
    await phoneInput.fill('1234567890');
    
    // Verify the mask is applied (should show as 123-456-7890)
    await expect(phoneInput).toHaveValue('123-456-7890');
    
    // Test partial input
    await phoneInput.clear();
    await phoneInput.fill('12345');
    
    // Should show as 123-45 with mask
    await expect(phoneInput).toHaveValue('123-45');
  });

  test.skip('should allow form submission with masked phone number', async ({ page }) => {
    // This test validates form submission with phone mask
    // To run: ensure dev server is running and playwright browsers are installed  
    await page.goto('http://localhost:5173/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Click Add User button to open the modal
    await page.getByRole('button', { name: 'Add User' }).click();
    
    // Wait for dialog to be visible
    await expect(page.getByRole('dialog')).toBeVisible();
    
    // Fill out all required fields
    await page.getByLabelText('Name').fill('Test User');
    await page.getByLabelText('Username').fill('testuser');
    await page.getByLabelText('Email').fill('test@example.com');
    await page.getByLabelText('TIN').fill('1234567890');
    await page.getByLabelText('Phone').fill('5551234567');
    
    // Verify the phone number is masked
    await expect(page.getByLabelText('Phone')).toHaveValue('555-123-4567');
    
    // Submit the form
    await page.getByRole('button', { name: 'Add' }).click();
    
    // Wait for the dialog to close (indicating successful submission)
    await expect(page.getByRole('dialog')).not.toBeVisible();
    
    // Wait for the table to reload and check if the new user appears
    await page.waitForLoadState('networkidle');
    
    // The user should appear in the table with the phone number
    await expect(page.getByText('Test User')).toBeVisible();
  });
});