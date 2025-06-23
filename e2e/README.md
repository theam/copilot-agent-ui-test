# End-to-End (E2E) Testing

This repository includes comprehensive E2E tests using Playwright to ensure the Add User Modal validations work correctly.

## Test Files

- `e2e/example.spec.ts` - Basic application functionality tests
- `e2e/add-user-modal.spec.ts` - Comprehensive validation tests for the Add User Modal

## Running E2E Tests

### Prerequisites

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

### Test Commands

```bash
# Run all E2E tests
npm run test:e2e

# Run tests with UI (interactive mode)
npm run test:e2e:ui

# Run tests in headed mode (visible browser)
npm run test:e2e:headed

# Run specific test file
npx playwright test e2e/add-user-modal.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Coverage

### Form Validation Tests

The `add-user-modal.spec.ts` file covers:

#### Field-specific Validations
- **Name Field**: Required, max 50 chars, alphanumeric/underscore/spaces only
- **Username Field**: Required, max 50 chars, alphanumeric/underscore/spaces only
- **Email Field**: Required, max 50 chars, valid email format
- **TIN Field**: Required, exactly 9 digits
- **Phone Field**: Required, exactly 10 digits
- **Website Field**: Optional, valid URL format (http/https)

#### Validation Behavior
- **onBlur Validation**: Tests confirm validation triggers when fields lose focus
- **Error Messages**: Verifies appropriate error messages display
- **Form Submission**: Tests prevent submission with invalid data
- **Success Cases**: Tests successful form submission with valid data

#### User Interactions
- **Modal Opening/Closing**: Tests Add User button and Cancel functionality
- **Form Reset**: Tests form clearing on cancel/successful submit

### Application Tests

The `example.spec.ts` file covers:
- **Application Loading**: Verifies page loads with correct elements
- **Modal Interaction**: Tests basic modal open/close functionality

## Test Architecture

### Locator Strategy
Tests use a combination of:
- `data-testid` attributes for reliable element identification
- `page.locator('#id')` for form field selection
- `page.getByText()` for error message validation
- `page.getByRole()` for semantic element selection

### Test Structure
- Organized with `test.describe()` blocks for logical grouping
- `beforeEach()` setup ensures consistent test state
- Descriptive test names explain the specific validation being tested

### Configuration
- Tests run against `http://localhost:5173` (Vite dev server)
- Configured for Chrome, Firefox, and Safari browsers
- Automatic dev server startup during test execution

## Best Practices

1. **Test Independence**: Each test is isolated and doesn't depend on others
2. **Clear Assertions**: Tests verify specific validation rules and error messages
3. **Realistic Data**: Tests use realistic test data patterns
4. **User-Centric**: Tests follow actual user workflows and interactions
5. **Error Scenarios**: Tests cover both valid and invalid input scenarios

## Debugging Tests

```bash
# Run tests with debug mode
npx playwright test --debug

# Generate test traces
npx playwright test --trace on

# View test report
npx playwright show-report
```