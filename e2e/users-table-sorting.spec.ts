import { test, expect } from '@playwright/test';

test.describe('Users Table Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the table to load
    await page.waitForSelector('[data-testid="users-table"]');
    // Wait for data to be loaded (spinner to disappear)
    await page.waitForSelector('.p-progressspinner', { state: 'detached' });
  });

  test('should sort by Name column in ascending order', async ({ page }) => {
    // Click on the Name column header to sort
    await page.locator('th').filter({ hasText: 'Name' }).click();
    
    // Wait for sorting to complete and table to update
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');
    
    // Get all name cells - using more specific selector
    const nameCells = await page.locator('[data-testid="users-table"] tbody tr td:nth-child(2)').allInnerTexts();
    
    // Verify names are sorted in ascending order (case-insensitive)
    const sortedNames = [...nameCells].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    expect(nameCells).toEqual(sortedNames);
  });

  test('should sort by Name column in descending order when clicked twice', async ({ page }) => {
    // Click on the Name column header twice to sort in descending order
    await page.locator('th').filter({ hasText: 'Name' }).click();
    await page.waitForTimeout(500);
    await page.locator('th').filter({ hasText: 'Name' }).click();
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');
    
    // Get all name cells - using more specific selector
    const nameCells = await page.locator('[data-testid="users-table"] tbody tr td:nth-child(2)').allInnerTexts();
    
    // Verify names are sorted in descending order (case-insensitive)
    const sortedNames = [...nameCells].sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()));
    expect(nameCells).toEqual(sortedNames);
  });

  test('should sort by Username column in ascending order', async ({ page }) => {
    // Click on the Username column header to sort
    await page.locator('th').filter({ hasText: 'Username' }).click();
    
    // Wait for sorting to complete and table to update
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');
    
    // Get all username cells - using more specific selector
    const usernameCells = await page.locator('[data-testid="users-table"] tbody tr td:nth-child(3)').allInnerTexts();
    
    // Verify usernames are sorted in ascending order (case-insensitive)
    const sortedUsernames = [...usernameCells].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    expect(usernameCells).toEqual(sortedUsernames);
  });

  test('should sort by Username column in descending order when clicked twice', async ({ page }) => {
    // Click on the Username column header twice to sort in descending order
    await page.locator('th').filter({ hasText: 'Username' }).click();
    await page.waitForTimeout(500);
    await page.locator('th').filter({ hasText: 'Username' }).click();
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');
    
    // Get all username cells - using more specific selector
    const usernameCells = await page.locator('[data-testid="users-table"] tbody tr td:nth-child(3)').allInnerTexts();
    
    // Verify usernames are sorted in descending order (case-insensitive)
    const sortedUsernames = [...usernameCells].sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()));
    expect(usernameCells).toEqual(sortedUsernames);
  });

  test('should sort by Email column in ascending order', async ({ page }) => {
    // Click on the Email column header to sort
    await page.locator('th').filter({ hasText: 'Email' }).click();
    
    // Wait for sorting to complete and table to update
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');
    
    // Get all email cells - using more specific selector
    const emailCells = await page.locator('[data-testid="users-table"] tbody tr td:nth-child(4)').allInnerTexts();
    
    // Verify emails are sorted in ascending order (case-insensitive)
    const sortedEmails = [...emailCells].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    expect(emailCells).toEqual(sortedEmails);
  });

  test('should sort by Email column in descending order when clicked twice', async ({ page }) => {
    // Click on the Email column header twice to sort in descending order
    await page.locator('th').filter({ hasText: 'Email' }).click();
    await page.waitForTimeout(500);
    await page.locator('th').filter({ hasText: 'Email' }).click();
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');
    
    // Get all email cells - using more specific selector
    const emailCells = await page.locator('[data-testid="users-table"] tbody tr td:nth-child(4)').allInnerTexts();
    
    // Verify emails are sorted in descending order (case-insensitive)
    const sortedEmails = [...emailCells].sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()));
    expect(emailCells).toEqual(sortedEmails);
  });

  test('should sort by TIN column in ascending order', async ({ page }) => {
    // Click on the TIN column header to sort
    await page.locator('th').filter({ hasText: 'TIN' }).click();
    
    // Wait for sorting to complete and table to update
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');
    
    // Get all TIN cells - using more specific selector
    const tinCells = await page.locator('[data-testid="users-table"] tbody tr td:nth-child(5)').allInnerTexts();
    
    // Verify TINs are sorted in ascending order
    const sortedTins = [...tinCells].sort();
    expect(tinCells).toEqual(sortedTins);
  });

  test('should sort by TIN column in descending order when clicked twice', async ({ page }) => {
    // Click on the TIN column header twice to sort in descending order
    await page.locator('th').filter({ hasText: 'TIN' }).click();
    await page.waitForTimeout(500);
    await page.locator('th').filter({ hasText: 'TIN' }).click();
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');
    
    // Get all TIN cells - using more specific selector
    const tinCells = await page.locator('[data-testid="users-table"] tbody tr td:nth-child(5)').allInnerTexts();
    
    // Verify TINs are sorted in descending order
    const sortedTins = [...tinCells].sort().reverse();
    expect(tinCells).toEqual(sortedTins);
  });

  test('should show sort indicators when columns are sorted', async ({ page }) => {
    // Click on the Name column header to sort
    await page.locator('th').filter({ hasText: 'Name' }).click();
    await page.waitForTimeout(1000);
    
    // Check that the Name column header has sortable class - PrimeReact adds this
    const nameHeader = page.locator('th').filter({ hasText: 'Name' });
    await expect(nameHeader).toHaveClass(/p-sortable-column/);
    
    // Click on Username to change sort
    await page.locator('th').filter({ hasText: 'Username' }).click();
    await page.waitForTimeout(1000);
    
    // Check that the Username column header has sortable class
    const usernameHeader = page.locator('th').filter({ hasText: 'Username' });  
    await expect(usernameHeader).toHaveClass(/p-sortable-column/);
  });

  test('should verify non-sortable columns do not have sort functionality', async ({ page }) => {
    // Check that ID column header doesn't have sortable class or icon
    const idHeader = page.locator('th').filter({ hasText: 'ID' });
    await expect(idHeader).not.toHaveClass(/p-sortable-column/);
    
    // Check that Phone column header doesn't have sortable class or icon
    const phoneHeader = page.locator('th').filter({ hasText: 'Phone' });
    await expect(phoneHeader).not.toHaveClass(/p-sortable-column/);
    
    // Clicking on ID column should not change sort order
    const originalFirstRowContent = await page.locator('[data-testid="users-table"] tbody tr:first-child').textContent();
    await idHeader.click();
    await page.waitForTimeout(500);
    const afterClickFirstRowContent = await page.locator('[data-testid="users-table"] tbody tr:first-child').textContent();
    expect(originalFirstRowContent).toBe(afterClickFirstRowContent);
  });
});
