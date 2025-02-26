# Membrane Channels Development Guidelines

## Build Commands
- `npm run dev`: Bundle and serve with live reload on port 80, probably don't use this one
- `grunt`: Run build tasks, takes about 2 minutes, probably don't use this one.
- `grunt lint`: Run ESLint
- `grunt type-check`: Run TypeScript type checking

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
- No newline at end of file

## Performance
- Use flat data structures for serialization
- Design for lightweight models and views
- Reserve particle slots for efficiency

## Error Handling
- Validate inputs with assert statements
- Use type narrowing for safe operations
- Document expected behaviors in code comments