<!--
  codex.md
  Notes for AI assistant on project patterns, gotchas, and unique styles
-->
# Project Codex Notes

This document captures unique patterns, conventions, and “gotchas” encountered in this repository, to speed up future enhancements.

## 1. Architecture & Frameworks
- Built on the PhET ecosystem, mixing Scenery, Axon, and Dot libraries.
- UI nodes are either `Node` subclasses or `CanvasNode` for high‑volume rendering.
- Uses `membrane-transport` domain model with `MembraneTransportModel`, `SoluteType`, etc.
- Relative imports are often very deep (e.g. `../../../../scenery/js/...`) and imported relatively like a monorepo.

## 2. Data Binding & Reactivity
- Model exposes `Property` and `DerivedProperty`. Listen via `property.link( listener )`.
- For time‑driven updates, many view nodes expose a `stepEmitter`, emitting `dt` per frame.
- Avoid `setTimeout`/`setInterval` directly—use `stepEmitter` callbacks and `dt` to manage timed effects.

## 3. Canvas vs. Scenery Rendering
- `CanvasNode` requires `invalidatePaint()` to redraw; front/back layers are both drawn here.
- Coordinates are transformed via `ModelViewTransform2`, converting model to view space.

## 4. Styling & Layout
- Fixed‑size layout boxes (e.g. `BOX_WIDTH`, `BOX_HEIGHT`) with children clipped via `clipArea`.
- Use `Rectangle`, `Path`, `ArrowNode` for chart elements; set positions via `.left`, `.centerY`.
- For accessibility, use `PatternMessageProperty` bound to `accessibleName` and appropriate `tagName` (e.g. `'li'`).

## 5. Lint & Build
- Build system uses Grunt tasks (e.g. `grunt lint`, `grunt type-check`).
- `grunt lint` forbids direct async timers; prefer frame‑based scheduling.

## 6. Gotchas & Tips
- Deeply nested directories: use project‐root search (e.g. `grep -R`) rather than guessing import paths.
- When adding children to a node, order matters: define background elements before interactive overlays.
- Use `rasterizeNode` to capture vector nodes as images when performance matters.

---
_These notes should help future AI or human contributors onboard more rapidly._