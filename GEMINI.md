This document records my observations about the `membrane-transport` codebase.

## General Architecture

The project is a web-based interactive simulation built with TypeScript. It follows a Model-View-Controller (MVC) like pattern, with clear separation of concerns. The directory structure is well-organized, with distinct folders for source code (`js`), assets (`images`, `sounds`), documentation (`doc`), and build artifacts (`build`).

## Core Technologies and Frameworks

*   **TypeScript:** The entire codebase is written in TypeScript, providing static typing and improved code quality.
*   **Grunt:** The project uses Grunt as a task runner for building, testing, and other development tasks.
*   **Custom Framework:** The simulation is built on a custom framework that includes:
    *   A component-based scene graph for creating and managing visual elements.
    *   A property-based model for managing application state (`axon`).
    *   A model-view transform system for mapping between model and view coordinates.
    *   A sound management system.
    *   An internationalization system with support for fluent syntax.

## Key Features and Patterns

*   **Component-Based Structure:** The application is composed of a hierarchy of components, each with its own model and view. This makes the code modular and easy to understand.
*   **Accessibility:** The codebase has a strong focus on accessibility, with features like:
    *   A parallel DOM (`PDOM`) for screen readers.
    *   Voicing for providing audio feedback.
    *   Keyboard navigation and interaction.
*   **Internationalization:** The application is designed to be easily translated into other languages. It uses a fluent API for creating internationalized strings with placeholders.
*   **Options Handling:** The `optionize` and `combineOptions` utilities provide a clean and consistent way to handle component options.
*   **Derived Properties:** The `DerivedProperty` class allows for the creation of properties that are computed from other properties. This helps to keep the model concise and aeasy to reason about.

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

Overall, the `membrane-transport` codebase is well-structured, well-documented, and easy to understand. It makes good use of modern web technologies and has a strong focus on quality and accessibility.