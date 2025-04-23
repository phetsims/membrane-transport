# Membrane Transport Development Guidelines

This is a PhET Simulation about membrane transport, including Simple Diffusion, Facilitated Diffusion, and Active Transport. The simulation is designed to help students understand the mechanisms of how substances move across cell membranes.

## Environment
- This is developed as part of a monorepo. If you need details of any of the dependencies, you can follow the import paths, note that we import "*.js" of files that are almost always "*.ts"

## Code Style
- TypeScript with strict typing
- Common code in js/common/, divided into model/ and view/
- Use MembraneTransportConstants for shared values
- Follow PhET naming conventions: PascalCase for classes, camelCase for variables

## Axon Property Types
- Use `TReadOnlyProperty<T>` from axon for read-only observables used in constructors
- Use `Property<T>` from axon when you need to mutate the property
- String properties from translations are `LocalizedStringProperty` type, not directly assignable to `Property<string>`

## Internationalization (i18n)
- Strings in JSON follow a nested structure in membrane-transport-strings_en.json

## Component Patterns
- Use configuration objects with standardized patterns for creating similar components
- Factor out repeated component creation logic into standalone functions
- When many instances of similar UI elements exist, use alignment groups for consistent sizing
- Interactive elements often use both mouse drag listeners and keyboard handlers

## Error Handling
- Validate inputs with assert or affirm statements