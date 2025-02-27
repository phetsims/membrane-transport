# Membrane Channels Development Guidelines

## Build Commands
- `npm run dev`: Bundle and serve with live reload on port 80, probably don't use this one
- `grunt`: Run build tasks, takes about 2 minutes, probably don't use this one.
- `grunt lint`: Run ESLint
- `grunt lint --fix`: Run ESLint with automatic fixes
- `grunt type-check`: Run TypeScript type checking

## Environment
- This is developed as part of a monorepo. If you need details of any of the dependencies, you can follow the import paths, but search for the *.ts first.
- When getting the contents of a file, it probably has a *.ts suffix even though it is imported as *.js.

## Code Style
- TypeScript with strict typing
- Follows PhET MVC (Model-View-Controller) pattern
- Organized by screens: SimpleDiffusion, FacilitatedDiffusion, ActiveTransport
- Common code in js/common/
- Use MembraneChannelsConstants for shared values
- Prefer composition over inheritance
- Follow PhET naming conventions: PascalCase for classes, camelCase for variables
- JS/TS files do not end with newlines
- Line comments are preceded by a blank line
- Import *.ts files as *.js in the import statements

## Type System
- Use `TReadOnlyProperty<T>` from axon for read-only observables used in constructors
- Use `Property<T>` from axon when you need to mutate the property
- String properties from translations are `LocalizedStringProperty` type, not directly assignable to `Property<string>`
- Use type imports for specialized types (e.g., `import { ChannelType } from '../model/MembraneChannelsModel.js'`)
- Create TypeScript types/interfaces for configuration objects when multiple similar objects are created
- When refactoring duplicated code, ensure type annotations are consistent with the actual usage

## Component Patterns
- Use configuration objects with standardized patterns for creating similar components
- Factor out repeated component creation logic into standalone functions
- When many instances of similar UI elements exist, use alignment groups for consistent sizing
- Interactive elements often use both mouse drag listeners and keyboard handlers

## Performance
- Use flat data structures for serialization
- Design for lightweight models and views
- Reserve particle slots for efficiency

## Error Handling
- Validate inputs with assert statements
- Use type narrowing for safe operations
- Document expected behaviors in code comments