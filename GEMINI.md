# Membrane Transport Development Guidelines

## General Architecture

The project is a web-based interactive simulation built with TypeScript. It follows a Model-View-Controller (MVC) like pattern, with clear separation of concerns. The directory structure is well-organized, with distinct folders for source code (`js`), assets (`images`, `sounds`), documentation (`doc`), and build artifacts (`build`).

The codebase is organized by screens: SimpleDiffusion, FacilitatedDiffusion, ActiveTransport, and Playground. Common code is located in `js/common/`, further divided into `model/` and `view/` directories. Shared values are often stored in `MembraneTransportConstants`.

This project is developed as part of a PhET monorepo. You can follow import paths to explore dependencies, but be aware that TypeScript files (`.ts`) are often imported with a `.js` extension.

## Core Technologies and Frameworks

*   **TypeScript:** The entire codebase is written in TypeScript, providing static typing and improved code quality.
*   **Grunt:** The project uses Grunt as a task runner for building, testing, and other development tasks.
*   **Custom PhET Framework:** The simulation is built on a custom PhET framework that mixes libraries like Scenery (scene graph), Axon (data binding), and Dot (math). It includes:
    *   A component-based scene graph for creating and managing visual elements. UI nodes are typically `Node` subclasses or `CanvasNode` for high-volume rendering.
    *   A property-based model for managing application state (`axon`).
    *   A model-view transform system (`ModelViewTransform2`) for mapping between model and view coordinates.
    *   A sound management system.
    *   An internationalization system with support for fluent syntax.

### Type System
*   Use `TReadOnlyProperty<T>` from axon for read-only observables used in constructors.
*   Use `Property<T>` from axon when you need to mutate the property.
*   String properties from translations are `LocalizedStringProperty` type, not directly assignable to `Property<string>`.

## Key Features and Patterns

*   **Component-Based Structure:** The application is composed of a hierarchy of components, each with its own model and view. This makes the code modular and easy to understand.
*   **Reactivity and Time-Based Updates:**
    *   The model exposes `Property` and `DerivedProperty` instances. Listen to changes via `property.link( listener )`.
    *   For time-driven animations, many view nodes expose a `stepEmitter` that emits the time delta (`dt`) on each frame.
    *   Avoid `setTimeout` or `setInterval`. Use `stepEmitter` callbacks for timed effects. The linter will flag direct async timer usage.
*   **Rendering:**
    *   The scene graph uses both Scenery `Node` objects and `CanvasNode`.
    *   When using `CanvasNode`, you must manually call `invalidatePaint()` to trigger a redraw.
    *   For performance-critical vector nodes, consider using `rasterizeNode` to cache them as images.
*   **Layout and Styling:**
    *   Layout often relies on fixed-size boxes with children clipped using `clipArea`.
    *   Primitive shapes like `Rectangle`, `Path`, and `ArrowNode` are used for UI elements, positioned with properties like `.left` and `.centerY`.
*   **Accessibility:** The codebase has a strong focus on accessibility, with features like:
    *   A parallel DOM (`PDOM`) for screen readers. Use `PatternMessageProperty` bound to `accessibleName` and an appropriate `tagName` (e.g., `'li'`).
    *   Voicing for providing audio feedback.
    *   Keyboard navigation and interaction.
*   **Internationalization:** The application is designed to be easily translated into other languages. It uses a fluent API for creating internationalized strings with placeholders.
*   **Options Handling:** The `optionize` and `combineOptions` utilities provide a clean and consistent way to handle component options.
*   **Derived Properties:** The `DerivedProperty` class allows for the creation of properties that are computed from other properties. This helps to keep the model concise and easy to reason about.
*   **Component Patterns:**
    *   Use configuration objects with standardized patterns for creating similar components.
    *   Factor out repeated component creation logic into standalone functions.
    *   When many instances of similar UI elements exist, use alignment groups for consistent sizing.
    *   Interactive elements often use both mouse drag listeners and keyboard handlers.
*   **Performance:**
    *   Use flat data structures for serialization.
    *   Design for lightweight models and views.
*   **Error Handling:**
    *   Validate inputs with `assert` and `affirm` statements.
    *   Use type narrowing for safe operations.
    *   Document expected behaviors in code comments.


## Surprising and Unique Aspects

*   **Custom Framework:** The use of a custom framework is a bit surprising, but it seems to be well-suited for the specific needs of the project. It provides a lot of powerful features out of the box, such as the property-based model and the model-view transform system.
*   **Focus on Accessibility:** The level of attention paid to accessibility is impressive. The `voicing` and `PDOM` features are particularly noteworthy.
*   **Fluent Internationalization:** The use of a fluent API for internationalization is a nice touch. It makes the code more readable and easier to maintain.
*   **`affirm`:** The use of a custom assertion library (`affirm`) is interesting. It seems to be used for runtime checks and to enforce invariants.

## Development Workflow

*   **Build-Driven Refactoring:** The primary refactoring workflow is to make a change and then run `grunt type-check`. The resulting compilation errors from the TypeScript compiler should be used to identify all the locations in the code that require updates.
*   **Asset `modulify`cation:** The `grunt modulify --targets=images` command is used to convert assets like SVGs into TypeScript modules. This command is integrated with git and will automatically `git add` the generated files.
*   **Stale Artifacts:** The `modulify` task does **not** automatically clean up stale generated files. If an asset is renamed or deleted, the corresponding generated TypeScript module must be manually deleted from the repository before `grunt type-check` will report the correct errors.
*   **Git-Based File Operations:** All file system modifications (renaming, deleting) must be done through `git` commands (`git mv`, `git rm`) to ensure the project history is preserved.

### Build Commands
*   `grunt lint --fix`: Run ESLint, automatically addressing formatting issues. The linter is configured to forbid certain patterns, like direct use of `setTimeout`.
*   `grunt type-check`: Run TypeScript type checking.

## Learned Conventions and Tricky Workflows

*   **Commit Message Format:** All git commits **must** be a single line and include a full URL to a corresponding GitHub issue at the end of the message. Do not use conventional commit prefixes like "Feat:" or "Refactor:". For example: `git commit -m "Improve performance, see https://github.com/phetsims/membrane-transport/issues/123"`.
*   **Asset Renaming Workflow:** Renaming an image asset requires a specific, manual workflow:
    1.  Use `git mv` to rename the asset file (e.g., `images/foo.svg`).
    2.  Use `git mv` to rename the corresponding generated TypeScript module (e.g., `images/foo_svg.ts`).
    3.  Update the `images/license.json` file to reflect the new asset filename.
    4.  Search the codebase for the old filename and update any import statements or references in the code.
    5.  Run `grunt type-check` to ensure all references have been correctly updated. The compiler errors will guide this process.
*   **Render Order:** When adding children to a Scenery `Node`, the order matters. Background elements must be added before foreground or interactive elements.
*   **Code Style:**
    *   Follows PhET naming conventions: PascalCase for classes, camelCase for variables.
    *   JS/TS files do not end with newlines.
    *   Line comments are preceded by a blank line.
    *   Import `.ts` files as `.js` in the import statements.
*   **Internationalization (i18n):**
    *   Strings in `membrane-transport-strings_en.json` follow a nested structure that must be mirrored in `MembraneTransportStrings.ts`.
    *   The `grunt modulify` command automatically updates `MembraneTransportStrings.ts` when strings are changed.
    *   A11y strings often need deeper nesting (component > subcomponent > feature > property).
    *   When adding new accessibility text, check existing patterns for proper nesting structure.