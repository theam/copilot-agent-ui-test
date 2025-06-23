# GitHub Copilot Instructions

## Project Overview

This is a React TypeScript application built with Vite that provides a user management interface. The project uses modern React patterns, TypeScript for type safety, and PrimeReact for UI components. The project includes comprehensive e2e testing with Playwright.

## Technology Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Library**: PrimeReact with Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Icons**: PrimeIcons
- **E2E Testing**: Playwright

## Code Style and Conventions

### TypeScript

- Use strict TypeScript configuration
- Define proper interfaces for all data structures
- Use type annotations for function parameters and return types
- Prefer `interface` over `type` for object shapes
- Use generic types where appropriate

### React Patterns

- Use functional components with hooks
- Implement proper error boundaries
- Follow the single responsibility principle for components
- Use proper prop types and default props
- Add data-testid attributes for e2e testing

### File Organization

- Keep components in `src/components/`
- Store pages in `src/pages/`
- Place utilities in `src/lib/`
- API-related code goes in `src/api/`
- E2E tests go in `e2e/` directory
- Use absolute imports with `@/` prefix

### Naming Conventions

- Use PascalCase for components and interfaces
- Use camelCase for variables, functions, and properties
- Use kebab-case for file names
- Use UPPER_SNAKE_CASE for constants
- Use descriptive test names for e2e tests

## Component Guidelines

### PrimeReact Components

- Use PrimeReact components consistently throughout the application
- Follow PrimeReact's design patterns and props structure
- Use proper PrimeReact theming and styling classes
- Implement responsive design using PrimeReact's responsive utilities
- Add accessible labels and roles for e2e testing
- Use PrimeReact's built-in accessibility features

### Form Handling

- Use React Hook Form for all form implementations
- Implement proper validation with error messages
- Use PrimeReact form components (InputText, etc.) with React Hook Form
- Handle form submission states (loading, success, error)
- Add proper form labels and error states for e2e testing
- Use PrimeReact's form validation components

### State Management

- Use Zustand for global state management
- Keep local component state with useState when appropriate
- Use proper state immutability patterns
- Implement optimistic updates where beneficial
- Ensure state changes are testable in e2e scenarios

## API Integration

### Mock API Pattern

- Follow the existing mock API structure in `src/api/mock-api.ts`
- Implement proper TypeScript interfaces for API requests/responses
- Use consistent error handling patterns
- Add realistic delays for better UX simulation
- Ensure API responses are consistent for e2e testing

### Data Flow

- Use the user store pattern for managing application state
- Implement proper loading states
- Handle error states gracefully
- Use optimistic updates for better user experience
- Make data loading states visible for e2e testing

## Styling Guidelines

### Tailwind CSS

- Use Tailwind utility classes for styling
- Follow the existing color scheme (slate variants)
- Use responsive design patterns
- Implement proper spacing and typography scales
- Ensure sufficient color contrast for accessibility and e2e testing

### Component Styling

- Use PrimeReact components as the primary UI building blocks
- Customize with Tailwind classes when needed
- Maintain consistent spacing and sizing
- Use proper semantic HTML elements
- Ensure interactive elements are properly sized for e2e testing
- Leverage PrimeReact's theming system for consistent styling

## Performance Considerations

- Implement proper loading states
- Optimize re-renders with proper dependency arrays
- Use lazy loading for routes when appropriate
- Implement proper error boundaries
- Ensure loading states are visible and testable in e2e

## Testing Guidelines

### E2E Testing with Playwright

- Write e2e tests for all user workflows
- Test form submissions and validations
- Verify data table interactions (sorting, pagination)
- Test responsive design across different viewports
- Use semantic selectors (getByRole, getByLabelText) over CSS selectors
- Add data-testid attributes for complex components
- Test loading states and error scenarios
- Verify accessibility features (keyboard navigation, screen readers)
- Test cross-browser compatibility (Chrome, Firefox, Safari)

### E2E Test Structure

```typescript
// Example e2e test pattern
test('user can add a new user', async ({ page }) => {
  await page.goto('/');
  
  // Wait for page to load
  await page.waitForSelector('[data-testid="users-table"]');
  
  // Click add user button
  await page.getByRole('button', { name: 'Add User' }).click();
  
  // Fill form
  await page.getByLabelText('Name').fill('John Doe');
  await page.getByLabelText('Email').fill('john@example.com');
  
  // Submit form
  await page.getByRole('button', { name: 'Add' }).click();
  
  // Verify success
  await expect(page.getByText('John Doe')).toBeVisible();
});
```

## Accessibility

- Use semantic HTML elements
- Implement proper ARIA labels
- Ensure keyboard navigation works
- Maintain proper color contrast
- Test with screen readers
- Add proper focus indicators for e2e testing
- Ensure all interactive elements are keyboard accessible
- Leverage PrimeReact's built-in accessibility features

## Error Handling

- Implement proper error boundaries
- Show user-friendly error messages
- Log errors appropriately
- Handle network errors gracefully
- Provide fallback UI for error states
- Test error scenarios in e2e tests
- Ensure error messages are visible and testable

## Security Considerations

- Validate all user inputs
- Sanitize data before rendering
- Use proper TypeScript types to prevent type-related issues
- Implement proper authentication patterns when needed
- Test input validation in e2e scenarios
- Verify XSS protection measures

## Development Workflow

- Use ESLint for code quality
- Follow the existing project structure
- Use proper Git commit messages
- Test changes thoroughly before committing
- Keep components small and focused
- Run e2e tests before merging features
- Ensure all user flows are covered by e2e tests

## Common Patterns

### Data Table Implementation

```typescript
// Use PrimeReact DataTable with proper configuration
<DataTable
  value={data}
  paginator
  rows={5}
  stripedRows
  showGridlines
  className="modern-table"
  rowHover
  responsiveLayout="scroll"
  data-testid="users-table"
>
  <Column field="fieldName" header="Header" sortable />
</DataTable>
```

### Form Implementation

```typescript
// Use React Hook Form with PrimeReact components
const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

<form onSubmit={handleSubmit(onSubmit)} data-testid="user-form">
  <span className="p-float-label">
    <InputText {...register('fieldName', { required: 'Required' })} />
    <label>Label</label>
  </span>
  {errors.fieldName && <small className="p-error">{errors.fieldName.message}</small>}
</form>
```

### Store Pattern

```typescript
// Use Zustand for state management
interface State {
  data: DataType[];
  setData: (data: DataType[]) => void;
}

export const useStore = create<State>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));
```

### E2E Test Helpers

```typescript
// Common e2e test utilities
export const waitForTableLoad = async (page: Page) => {
  await page.waitForSelector('[data-testid="users-table"]');
  await page.waitForLoadState('networkidle');
};

export const fillUserForm = async (page: Page, userData: CreateUserDto) => {
  await page.getByLabelText('Name').fill(userData.name);
  await page.getByLabelText('Email').fill(userData.email);
  await page.getByLabelText('Username').fill(userData.username);
  await page.getByLabelText('TIN').fill(userData.userTin);
  await page.getByLabelText('Phone').fill(userData.phone);
};
```

## When Adding New Features

1. **Analyze existing patterns** in the codebase
2. **Follow the established file structure**
3. **Use consistent naming conventions**
4. **Implement proper TypeScript types**
5. **Add appropriate loading and error states**
6. **Test the feature thoroughly**
7. **Update documentation if needed**
8. **Add e2e tests for all user workflows**
9. **Ensure accessibility compliance**
10. **Test across different browsers and viewports**

## Code Quality Standards

- Write self-documenting code with clear variable names
- Add comments for complex business logic
- Keep functions small and focused
- Use proper TypeScript types throughout
- Follow React best practices
- Maintain consistent code formatting
- Add data-testid attributes for e2e testing
- Ensure all user interactions are testable

## E2E Testing Best Practices

- Write tests from a user's perspective
- Use descriptive test names that explain the scenario
- Group related tests using test.describe()
- Use page object models for complex applications
- Implement proper waiting strategies (waitForSelector, waitForLoadState)
- Test both happy path and error scenarios
- Verify visual elements and interactions
- Test responsive behavior on different screen sizes
- Use accessibility-focused selectors when possible
- Keep tests independent and isolated

Remember to always consider the user experience, maintain type safety, follow the established patterns in this codebase, and ensure all features are thoroughly tested with e2e tests.
