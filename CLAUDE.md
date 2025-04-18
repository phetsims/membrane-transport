# Membrane Transport Development Guidelines

## Build Commands
- `grunt lint --fix`: Run ESLint, automatically addressing formatting issues
- `grunt type-check`: Run TypeScript type checking

## Environment
- This is developed as part of a monorepo. If you need details of any of the dependencies, you can follow the import paths, but search for the *.ts first.
- When getting the contents of a file, it probably has a *.ts suffix even though it is imported as *.js.

## Code Style
- TypeScript with strict typing
- Follows PhET MVC (Model-View-Controller) pattern
- Organized by screens: SimpleDiffusion, FacilitatedDiffusion, ActiveTransport, Playground
- Common code in js/common/, divided into model/ and view/
- Use MembraneTransportConstants for shared values
- Follow PhET naming conventions: PascalCase for classes, camelCase for variables
- JS/TS files do not end with newlines
- Line comments are preceded by a blank line
- Import *.ts files as *.js in the import statements

## Type System
- Use `TReadOnlyProperty<T>` from axon for read-only observables used in constructors
- Use `Property<T>` from axon when you need to mutate the property
- String properties from translations are `LocalizedStringProperty` type, not directly assignable to `Property<string>`

## Internationalization (i18n)
- Strings in JSON follow a nested structure that must be mirrored in MembraneTransportStrings.ts
- The `grunt modulify` command automatically updates the MembraneTransportStrings.ts when strings are changed
- A11y strings often need deeper nesting (component > subcomponent > feature > property)
- When adding new accessibility text, check existing patterns for proper nesting structure

## Component Patterns
- Use configuration objects with standardized patterns for creating similar components
- Factor out repeated component creation logic into standalone functions
- When many instances of similar UI elements exist, use alignment groups for consistent sizing
- Interactive elements often use both mouse drag listeners and keyboard handlers

## Performance
- Use flat data structures for serialization
- Design for lightweight models and views

## Error Handling
- Validate inputs with assert statements
- Use type narrowing for safe operations
- Document expected behaviors in code comments