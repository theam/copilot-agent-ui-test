import { test, expect } from '@playwright/test';

test.describe('Users Table Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    // Wait for users table to load
    await page.waitForSelector('[data-testid="users-table"]');
    await page.waitForLoadState('networkidle');
  });

  test('should be able to sort by Name column', async ({ page }) => {
    // Get the table
    const table = page.getByTestId('users-table');
    await expect(table).toBeVisible();

    // Click on Name column header to sort
    const nameHeader = page.locator('th').filter({ hasText: 'Name' });
    await expect(nameHeader).toBeVisible();
    await nameHeader.click();

    // Wait for sort to complete
    await page.waitForTimeout(500);

    // Get all name cells and verify they are sorted
    const nameCells = page.locator('td[data-field="name"]');
    const nameTexts = await nameCells.allTextContents();
    
    // Jack, Jane, Jill, Jim, John (alphabetical)
    expect(nameTexts).toEqual(['Jack Doe', 'Jane Doe', 'Jill Doe', 'Jim Doe', 'John Doe']);

    // Click again to reverse sort
    await nameHeader.click();
    await page.waitForTimeout(500);

    const reversedNameTexts = await nameCells.allTextContents();
    // John, Jim, Jill, Jane, Jack (reverse alphabetical)
    expect(reversedNameTexts).toEqual(['John Doe', 'Jim Doe', 'Jill Doe', 'Jane Doe', 'Jack Doe']);
  });

  test('should be able to sort by Username column', async ({ page }) => {
    // Get the table
    const table = page.getByTestId('users-table');
    await expect(table).toBeVisible();

    // Click on Username column header to sort
    const usernameHeader = page.locator('th').filter({ hasText: 'Username' });
    await expect(usernameHeader).toBeVisible();
    await usernameHeader.click();

    // Wait for sort to complete
    await page.waitForTimeout(500);

    // Get all username cells and verify they are sorted
    const usernameCells = page.locator('td[data-field="username"]');
    const usernameTexts = await usernameCells.allTextContents();
    
    // jackdoe, janedoe, jilldoe, jimdoe, johndoe (alphabetical)
    expect(usernameTexts).toEqual(['jackdoe', 'janedoe', 'jilldoe', 'jimdoe', 'johndoe']);
  });

  test('should be able to sort by TIN column', async ({ page }) => {
    // Get the table
    const table = page.getByTestId('users-table');
    await expect(table).toBeVisible();

    // Click on TIN column header to sort
    const tinHeader = page.locator('th').filter({ hasText: 'TIN' });
    await expect(tinHeader).toBeVisible();
    await tinHeader.click();

    // Wait for sort to complete
    await page.waitForTimeout(500);

    // Get all TIN cells and verify they are sorted
    const tinCells = page.locator('td[data-field="userTin"]');
    const tinTexts = await tinCells.allTextContents();
    
    // TIN values should be sorted: 1234567890, 3333333333, 5555555555, 7777777777, 9876543210
    expect(tinTexts).toEqual(['1234567890', '3333333333', '5555555555', '7777777777', '9876543210']);
  });

  test('should not be able to sort unsortable columns', async ({ page }) => {
    // Get the table
    const table = page.getByTestId('users-table');
    await expect(table).toBeVisible();

    // Check that ID, Email, and Phone columns don't have sort indicators
    const idHeader = page.locator('th').filter({ hasText: 'ID' });
    const emailHeader = page.locator('th').filter({ hasText: 'Email' });
    const phoneHeader = page.locator('th').filter({ hasText: 'Phone' });
    
    // These headers should not have sort icons (pi-sort-* classes)
    await expect(idHeader.locator('.pi-sort')).not.toBeVisible();
    await expect(emailHeader.locator('.pi-sort')).not.toBeVisible();
    await expect(phoneHeader.locator('.pi-sort')).not.toBeVisible();
  });

  test('should show sort indicators on sortable columns', async ({ page }) => {
    // Get the table
    const table = page.getByTestId('users-table');
    await expect(table).toBeVisible();

    // Check that Name, Username, and TIN columns have sort indicators
    const nameHeader = page.locator('th').filter({ hasText: 'Name' });
    const usernameHeader = page.locator('th').filter({ hasText: 'Username' });
    const tinHeader = page.locator('th').filter({ hasText: 'TIN' });
    
    // These headers should have sort icons visible
    await expect(nameHeader.locator('.p-sortable-column-icon')).toBeVisible();
    await expect(usernameHeader.locator('.p-sortable-column-icon')).toBeVisible();
    await expect(tinHeader.locator('.p-sortable-column-icon')).toBeVisible();
  });
});