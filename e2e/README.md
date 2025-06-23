# E2E Tests for Users Table Sorting

This directory contains end-to-end tests for the sorting functionality in the Users table.

## Overview

The tests verify the sorting functionality for the following columns:
- **Name** - Alphabetical sorting
- **Username** - Alphabetical sorting  
- **Email** - Alphabetical sorting
- **TIN** - Alphanumeric sorting

## Test Scenarios

1. **Ascending Sort**: Click a sortable column header to sort in ascending order
2. **Descending Sort**: Click the same column header twice to sort in descending order
3. **Sort Indicators**: Verify visual indicators appear when columns are sorted
4. **Non-sortable Columns**: Verify ID and Phone columns are not sortable
5. **Pagination Persistence**: Verify sort order is maintained across pagination

## Running Tests

### Prerequisites
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests
```bash
# Run all e2e tests
npm run test:e2e

# Run tests with UI (interactive mode)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npx playwright test users-table-sorting.spec.ts

# Run tests for specific browser
npx playwright test --project=chromium
```

### Debugging Tests
```bash
# Run tests in debug mode
npx playwright test --debug

# Generate test report
npx playwright show-report
```

## Test Configuration

The tests are configured to:
- Start the Vite dev server automatically before running tests
- Run against `http://localhost:5173`
- Use Chromium browser by default (Firefox and WebKit available but commented out)
- Wait for loading states and network idle before interactions
- Use semantic selectors and data-testid attributes for reliability

## Test Structure

Each test:
1. Navigates to the users page
2. Waits for the table to load completely
3. Performs sorting actions by clicking column headers
4. Verifies the sort order by checking cell contents
5. Uses proper waiting strategies to ensure stability

## Troubleshooting

If tests fail:
1. Ensure the dev server is running on port 5173
2. Check that all dependencies are installed
3. Verify Playwright browsers are installed
4. Run tests in headed mode to see what's happening visually