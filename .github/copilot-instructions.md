# GitHub Copilot Instructions

## Project Overview

This is a React TypeScript application built with Vite that provides a user management interface. The project uses modern React patterns, TypeScript for type safety, and PrimeReact for UI components.

## Technology Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Library**: PrimeReact with Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Routing**: React Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React and PrimeIcons

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
- Use React.memo() for performance optimization when needed
- Follow the single responsibility principle for components
- Use proper prop types and default props

### File Organization

- Keep components in `src/components/`
- Store pages in `src/pages/`
- Place utilities in `src/lib/`
- API-related code goes in `src/api/`
- Use absolute imports with `@/` prefix

### Naming Conventions

- Use PascalCase for components and interfaces
- Use camelCase for variables, functions, and properties
- Use kebab-case for file names
- Use UPPER_SNAKE_CASE for constants

## Component Guidelines

### PrimeReact Components

- Use PrimeReact components consistently throughout the application
- Follow PrimeReact's design patterns and props structure
- Use proper PrimeReact theming and styling classes
- Implement responsive design using PrimeReact's responsive utilities

### Form Handling

- Use React Hook Form for all form implementations
- Implement proper validation with error messages
- Use PrimeReact form components (InputText, etc.) with React Hook Form
- Handle form submission states (loading, success, error)

### State Management

- Use Zustand for global state management
- Keep local component state with useState when appropriate
- Use proper state immutability patterns
- Implement optimistic updates where beneficial

## API Integration

### Mock API Pattern

- Follow the existing mock API structure in `src/api/mock-api.ts`
- Implement proper TypeScript interfaces for API requests/responses
- Use consistent error handling patterns
- Add realistic delays for better UX simulation

### Data Flow

- Use the user store pattern for managing application state
- Implement proper loading states
- Handle error states gracefully
- Use optimistic updates for better user experience

## Styling Guidelines

### Tailwind CSS

- Use Tailwind utility classes for styling
- Follow the existing color scheme (slate variants)
- Use responsive design patterns
- Implement proper spacing and typography scales

### Component Styling

- Use shadcn/ui components as the base
- Customize with Tailwind classes when needed
- Maintain consistent spacing and sizing
- Use proper semantic HTML elements

## Performance Considerations

- Implement proper loading states
- Use React.memo() for expensive components
- Optimize re-renders with proper dependency arrays
- Use lazy loading for routes when appropriate
- Implement proper error boundaries

## Testing Guidelines

- Write unit tests for utility functions
- Test component behavior with user interactions
- Mock API calls in tests
- Test error states and edge cases
- Use proper TypeScript types in tests

## Accessibility

- Use semantic HTML elements
- Implement proper ARIA labels
- Ensure keyboard navigation works
- Maintain proper color contrast
- Test with screen readers

## Error Handling

- Implement proper error boundaries
- Show user-friendly error messages
- Log errors appropriately
- Handle network errors gracefully
- Provide fallback UI for error states

## Security Considerations

- Validate all user inputs
- Sanitize data before rendering
- Use proper TypeScript types to prevent type-related issues
- Implement proper authentication patterns when needed

## Development Workflow

- Use ESLint for code quality
- Follow the existing project structure
- Use proper Git commit messages
- Test changes thoroughly before committing
- Keep components small and focused

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
>
  <Column field="fieldName" header="Header" sortable />
</DataTable>
```

### Form Implementation

```typescript
// Use React Hook Form with PrimeReact components
const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

<form onSubmit={handleSubmit(onSubmit)}>
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

## When Adding New Features

1. **Analyze existing patterns** in the codebase
2. **Follow the established file structure**
3. **Use consistent naming conventions**
4. **Implement proper TypeScript types**
5. **Add appropriate loading and error states**
6. **Test the feature thoroughly**
7. **Update documentation if needed**

## Code Quality Standards

- Write self-documenting code with clear variable names
- Add comments for complex business logic
- Keep functions small and focused
- Use proper TypeScript types throughout
- Follow React best practices
- Maintain consistent code formatting

Remember to always consider the user experience, maintain type safety, and follow the established patterns in this codebase.
