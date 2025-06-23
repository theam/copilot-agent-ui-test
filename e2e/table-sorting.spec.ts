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
    const nameHeader = page.locator('th:has-text("Name")');
    await expect(nameHeader).toBeVisible();
    await nameHeader.click();

    // Wait for sort to complete using a more reliable method
    await page.waitForLoadState('networkidle');

    // Get all name cells from the second column (index 1, since ID is first)
    const nameCells = page.locator('tbody tr td:nth-child(2)');
    const nameTexts = await nameCells.allTextContents();
    
    // Jack, Jane, Jill, Jim, John (alphabetical)
    expect(nameTexts).toEqual(['Jack Doe', 'Jane Doe', 'Jill Doe', 'Jim Doe', 'John Doe']);

    // Click again to reverse sort
    await nameHeader.click();
    await page.waitForLoadState('networkidle');

    const reversedNameTexts = await nameCells.allTextContents();
    // John, Jim, Jill, Jane, Jack (reverse alphabetical)
    expect(reversedNameTexts).toEqual(['John Doe', 'Jim Doe', 'Jill Doe', 'Jane Doe', 'Jack Doe']);
  });

  test('should be able to sort by Username column', async ({ page }) => {
    // Get the table
    const table = page.getByTestId('users-table');
    await expect(table).toBeVisible();

    // Click on Username column header to sort
    const usernameHeader = page.locator('th:has-text("Username")');
    await expect(usernameHeader).toBeVisible();
    await usernameHeader.click();

    // Wait for sort to complete
    await page.waitForLoadState('networkidle');

    // Get all username cells from the third column (index 2)
    const usernameCells = page.locator('tbody tr td:nth-child(3)');
    const usernameTexts = await usernameCells.allTextContents();
    
    // jackdoe, janedoe, jilldoe, jimdoe, johndoe (alphabetical)
    expect(usernameTexts).toEqual(['jackdoe', 'janedoe', 'jilldoe', 'jimdoe', 'johndoe']);
  });

  test('should be able to sort by TIN column', async ({ page }) => {
    // Get the table
    const table = page.getByTestId('users-table');
    await expect(table).toBeVisible();

    // Click on TIN column header to sort
    const tinHeader = page.locator('th:has-text("TIN")');
    await expect(tinHeader).toBeVisible();
    await tinHeader.click();

    // Wait for sort to complete
    await page.waitForLoadState('networkidle');

    // Get all TIN cells from the fifth column (index 5) - ID, Name, Username, Email, TIN, Phone
    const tinCells = page.locator('tbody tr td:nth-child(5)');
    const tinTexts = await tinCells.allTextContents();
    
    // TIN values should be sorted: 1234567890, 3333333333, 5555555555, 7777777777, 9876543210
    expect(tinTexts).toEqual(['1234567890', '3333333333', '5555555555', '7777777777', '9876543210']);
  });

  test('should not be able to sort unsortable columns', async ({ page }) => {
    // Get the table
    const table = page.getByTestId('users-table');
    await expect(table).toBeVisible();

    // Check that ID, Email, and Phone columns don't have sortable class
    const idHeader = page.locator('th:has-text("ID")');
    const emailHeader = page.locator('th:has-text("Email")');
    const phoneHeader = page.locator('th:has-text("Phone")');
    
    // These headers should not have the p-sortable-column class
    await expect(idHeader).not.toHaveClass(/p-sortable-column/);
    await expect(emailHeader).not.toHaveClass(/p-sortable-column/);
    await expect(phoneHeader).not.toHaveClass(/p-sortable-column/);
  });

  test('should show sort indicators on sortable columns', async ({ page }) => {
    // Get the table
    const table = page.getByTestId('users-table');
    await expect(table).toBeVisible();

    // Check that Name, Username, and TIN columns have sortable class
    const nameHeader = page.locator('th:has-text("Name")');
    const usernameHeader = page.locator('th:has-text("Username")');
    const tinHeader = page.locator('th:has-text("TIN")');
    
    // These headers should have the p-sortable-column class
    await expect(nameHeader).toHaveClass(/p-sortable-column/);
    await expect(usernameHeader).toHaveClass(/p-sortable-column/);
    await expect(tinHeader).toHaveClass(/p-sortable-column/);
  });
});