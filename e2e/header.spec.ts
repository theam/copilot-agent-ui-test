import { test, expect } from '@playwright/test';

test.describe('Header', () => {
  test('header should be visible with correct content', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    // Wait for the header to be visible
    const header = page.getByTestId('app-header');
    await expect(header).toBeVisible();
    
    // Check header has correct background color and border
    await expect(header).toHaveCSS('background-color', 'rgb(238, 238, 238)'); // #eee
    await expect(header).toHaveCSS('border-bottom-color', 'rgb(0, 0, 0)'); // black
    await expect(header).toHaveCSS('height', '35px');
    
    // Check logo is visible
    const logo = page.getByTestId('header-logo');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', '/vite.svg');
    await expect(logo).toHaveAttribute('alt', 'Logo');
    
    // Check title text
    const title = page.getByTestId('header-title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Welcome to the best user\'s App');
  });
  
  test('header should appear on all pages', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    // Header should be visible on main page
    await expect(page.getByTestId('app-header')).toBeVisible();
    
    // The header should remain persistent as it's in App.tsx
    await expect(page.getByTestId('header-title')).toHaveText('Welcome to the best user\'s App');
  });
});