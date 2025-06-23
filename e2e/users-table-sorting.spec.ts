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
    
    // Wait for sorting to complete
    await page.waitForTimeout(500);
    
    // Get all name cells
    const nameCells = await page.locator('[data-testid="users-table"] tbody tr td:nth-child(2)').allTextContents();
    
    // Verify names are sorted in ascending order
    const sortedNames = [...nameCells].sort();
    expect(nameCells).toEqual(sortedNames);
  });

  test('should sort by Name column in descending order when clicked twice', async ({ page }) => {
    // Click on the Name column header twice to sort in descending order
    await page.locator('th').filter({ hasText: 'Name' }).click();
    await page.waitForTimeout(500);
    await page.locator('th').filter({ hasText: 'Name' }).click();
    await page.waitForTimeout(500);
    
    // Get all name cells
    const nameCells = await page.locator('[data-testid="users-table"] tbody tr td:nth-child(2)').allTextContents();
    
    // Verify names are sorted in descending order
    const sortedNames = [...nameCells].sort().reverse();
    expect(nameCells).toEqual(sortedNames);
  });

  test('should sort by Username column in ascending order', async ({ page }) => {
    // Click on the Username column header to sort
    await page.locator('th').filter({ hasText: 'Username' }).click();
    
    // Wait for sorting to complete
    await page.waitForTimeout(500);
    
    // Get all username cells
    const usernameCells = await page.locator('[data-testid="users-table"] tbody tr td:nth-child(3)').allTextContents();
    
    // Verify usernames are sorted in ascending order
    const sortedUsernames = [...usernameCells].sort();
    expect(usernameCells).toEqual(sortedUsernames);
  });

  test('should sort by Username column in descending order when clicked twice', async ({ page }) => {
    // Click on the Username column header twice to sort in descending order
    await page.locator('th').filter({ hasText: 'Username' }).click();
    await page.waitForTimeout(500);
    await page.locator('th').filter({ hasText: 'Username' }).click();
    await page.waitForTimeout(500);
    
    // Get all username cells
    const usernameCells = await page.locator('[data-testid="users-table"] tbody tr td:nth-child(3)').allTextContents();
    
    // Verify usernames are sorted in descending order
    const sortedUsernames = [...usernameCells].sort().reverse();
    expect(usernameCells).toEqual(sortedUsernames);
  });

  test('should sort by Email column in ascending order', async ({ page }) => {
    // Click on the Email column header to sort
    await page.locator('th').filter({ hasText: 'Email' }).click();
    
    // Wait for sorting to complete
    await page.waitForTimeout(500);
    
    // Get all email cells
    const emailCells = await page.locator('[data-testid="users-table"] tbody tr td:nth-child(4)').allTextContents();
    
    // Verify emails are sorted in ascending order
    const sortedEmails = [...emailCells].sort();
    expect(emailCells).toEqual(sortedEmails);
  });

  test('should sort by Email column in descending order when clicked twice', async ({ page }) => {
    // Click on the Email column header twice to sort in descending order
    await page.locator('th').filter({ hasText: 'Email' }).click();
    await page.waitForTimeout(500);
    await page.locator('th').filter({ hasText: 'Email' }).click();
    await page.waitForTimeout(500);
    
    // Get all email cells
    const emailCells = await page.locator('[data-testid="users-table"] tbody tr td:nth-child(4)').allTextContents();
    
    // Verify emails are sorted in descending order
    const sortedEmails = [...emailCells].sort().reverse();
    expect(emailCells).toEqual(sortedEmails);
  });

  test('should sort by TIN column in ascending order', async ({ page }) => {
    // Click on the TIN column header to sort
    await page.locator('th').filter({ hasText: 'TIN' }).click();
    
    // Wait for sorting to complete
    await page.waitForTimeout(500);
    
    // Get all TIN cells
    const tinCells = await page.locator('[data-testid="users-table"] tbody tr td:nth-child(5)').allTextContents();
    
    // Verify TINs are sorted in ascending order
    const sortedTins = [...tinCells].sort();
    expect(tinCells).toEqual(sortedTins);
  });

  test('should sort by TIN column in descending order when clicked twice', async ({ page }) => {
    // Click on the TIN column header twice to sort in descending order
    await page.locator('th').filter({ hasText: 'TIN' }).click();
    await page.waitForTimeout(500);
    await page.locator('th').filter({ hasText: 'TIN' }).click();
    await page.waitForTimeout(500);
    
    // Get all TIN cells
    const tinCells = await page.locator('[data-testid="users-table"] tbody tr td:nth-child(5)').allTextContents();
    
    // Verify TINs are sorted in descending order
    const sortedTins = [...tinCells].sort().reverse();
    expect(tinCells).toEqual(sortedTins);
  });

  test('should show sort indicators when columns are sorted', async ({ page }) => {
    // Click on the Name column header to sort
    await page.locator('th').filter({ hasText: 'Name' }).click();
    await page.waitForTimeout(500);
    
    // Check that the Name column header has a sort indicator
    const nameHeader = page.locator('th').filter({ hasText: 'Name' });
    await expect(nameHeader.locator('.p-sortable-column-icon')).toBeVisible();
    
    // Click on Username to change sort
    await page.locator('th').filter({ hasText: 'Username' }).click();
    await page.waitForTimeout(500);
    
    // Check that the Username column header now has a sort indicator
    const usernameHeader = page.locator('th').filter({ hasText: 'Username' });
    await expect(usernameHeader.locator('.p-sortable-column-icon')).toBeVisible();
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

  test('should maintain sort order when navigating between pages', async ({ page }) => {
    // Sort by Name first
    await page.locator('th').filter({ hasText: 'Name' }).click();
    await page.waitForTimeout(500);
    
    // Get the first name on the first page
    const firstNamePage1 = await page.locator('[data-testid="users-table"] tbody tr:first-child td:nth-child(2)').textContent();
    
    // Go to next page if pagination exists
    const nextPageButton = page.locator('.p-paginator-next');
    if (await nextPageButton.isVisible()) {
      await nextPageButton.click();
      await page.waitForTimeout(500);
      
      // Go back to first page
      const prevPageButton = page.locator('.p-paginator-prev');
      await prevPageButton.click();
      await page.waitForTimeout(500);
      
      // Verify the first name is still the same (sort maintained)
      const firstNameAfterNavigation = await page.locator('[data-testid="users-table"] tbody tr:first-child td:nth-child(2)').textContent();
      expect(firstNamePage1).toBe(firstNameAfterNavigation);
    }
  });
});
