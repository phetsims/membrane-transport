# Membrane Transport Simulation – Technical Implementation Overview

This document summarizes the technical implementation and key features of the **Membrane Transport** PhET simulation.
The simulation models particle diffusion through cell membrane channels and pumps, including ligand-gated channels,
voltage-gated channels, a sodium-potassium pump, glucose transporters, and passive diffusion of O₂ and CO₂ molecules
directly across the membrane (without requiring a channel protein). It is a port of the Java-based simulation to HTML5,
incorporating modern PhET frameworks and updated pedagogical features.

## Features Overview

- **Included:**
  - PhET-iO instrumentation
  - Interactive Description
  - sonification
  - Interactive highlights
  - dynamic locales
  - sim-specific preferences
  - Core Voicing
  - pan/zoom

- **Excluded**
  - region and culture customization

### Novel Approaches

*   **MembraneTransportFeatureSet**: This is a feature set that is used to enable/disable features in the simulation. It
    is used to enable/disable the different types of channels and controls are available on each screen. Note that the
    features are not mutually exclusive, and hence not amenable to subclassing. We also chose to avoid mixins since they
    introduce other difficulties. Instead, we use `MembraneTransportFeatureSet` to identify which features apply to which
    screens.
*   **Transient Short-Lived Nodes**: We have taken efforts to keep the model and view lightweight. For example, when
    dragging a transport protein, a transient non-PhET-iO instrumented Node is temporarily created. When dropping the
    channel, the transient node is removed and the transport protein is added to the model. Preferring transient,
    short-lived Nodes helps us keep each individual node simpler and more manageable, as opposed to if we had a
    single Node that had to handle all modalities.
*   **Strings** Since this sim supports Interactive Description, the simulation has extensive usage of complex strings.
    At the time of  development, the lead description designer identified this as the most complex description effort 
    undertaken so far. We use Fluent for the strings, as described in `phet-info/doc/strings-i18n-yaml-fluent.md`.
*   **MembraneTransportConstants** is implemented via static attributes in a class, so the values can refer to each other
    in the declaration. This is unlike other simulations that export const and use file-specific local variables for
    cross-references. This also helps with searchability, since values are referred to the same way everywhere.

## General Considerations

### Coordinate Frames

The simulation uses a 2D coordinate system. The `ObservationWindow` defines the primary model space.
A `ModelViewTransform2` instance (`MembraneTransportConstants.OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM`) is used to map
model coordinates to view coordinates within the `ObservationWindow`. The `MembraneTransportScreenView` also maintains
its own `screenViewModelViewTransform` to position UI components relative to the observation window.

### Memory Management

**Instantiation:** Most objects in this sim are instantiated at startup and exist for the lifetime of the simulation.
Exceptions include:
*   `Solute` instances are created dynamically when added via spinners or other mechanisms.
*   `Ligand` instances are eagerly created at startup (`MembraneTransportConstants.LIGAND_COUNT`) but their visibility
    and interaction are controlled by `areLigandsAddedProperty`. They are not cleared on reset.
*   `TransportProteinDragNode` instances are transient, created when a transport protein is dragged and disposed of
    when dropped.

**Listeners**: As is common in PhET simulations, many listeners (`link`, `addListener`) are attached to properties and
emitters. For objects that exist for the lifetime of the simulation, explicit `unlink` or `removeListener` calls are
often not strictly necessary, but good practice dictates managing them for dynamic objects or when an object's lifecycle
is shorter than the simulation's. The `resetEmitter` in `MembraneTransportModel` and `MembraneTransportScreenView`
is used to reset various properties and components to their initial states.

**dispose**: Pertinent classes have `dispose` methods, often inherited. Instances that exist for the lifetime of the sim are
typically not intended to be disposed.

## Screens

The simulation has 4 screens: SimpleDiffusion, FacilitatedDiffusion, ActiveTransport, and Playground.
All screens share nearly identical code, with their specific features and available controls determined by the
`MembraneTransportFeatureSet` passed to the `MembraneTransportModel` and `MembraneTransportScreenView` constructors.
This approach avoids subclassing or mixins for screen-specific logic, instead relying on a feature flag system.

## Model

`MembraneTransportModel` is the central model class (`js/common/model/MembraneTransportModel.ts`). It manages the
state and behavior of solutes, ligands, and transport proteins within the membrane.

### Core Elements

*   **Particles (`Particle`, `Solute`, `Ligand`):**
    *   `Particle` is the base class for `Solute` and `Ligand`.
    *   `Solute` instances are non-interactive and represent molecules like oxygen, carbon dioxide, sodium, potassium,
        ATP, ADP, and phosphate. They can be added/removed via spinners.
    *   `Ligand` instances are interactive (draggable by mouse/keyboard) and represent signaling molecules. They are
        pre-allocated at startup (`MembraneTransportConstants.LIGAND_COUNT`) and their active state is controlled by
        `areLigandsAddedProperty`.
    *   Each `Particle` has a finite state machine (`mode` property) that dictates its current behavior (e.g., random walk,
        passing through a protein). See `js/common/model/Particle.ts` and `js/common/model/particleModes/`.
*   **Transport Proteins (`TransportProtein`):**
    *   Represent membrane channels and pumps (e.g., Ligand-Gated Channel, Voltage-Gated Channel, Na+/K+ Pump, Glucose Transporter).
    *   Managed within `Slot` instances.
    *   Each `TransportProtein` can have its own internal state machine to manage interactions (e.g., binding, conformational changes).
*   **Slots (`Slot`):**
    *   There are `SLOT_COUNT` (7) predefined positions on the membrane where transport proteins can be placed.
    *   `membraneSlots` is an array of `Slot` instances, each managing a `transportProteinProperty` that can hold a `TransportProtein` or be `null`.

## View

`MembraneTransportScreenView` (`js/common/view/MembraneTransportScreenView.ts`) is the primary view class, responsible
for rendering the model and handling user input. It is designed to be flexible, supporting all screen features, with
earlier screens opting out of certain features via the `MembraneTransportFeatureSet`.

### Key Components

*   **`ObservationWindow`:** The central display area where particles move and membrane proteins are located. It uses its
    own `ModelViewTransform2` (`MembraneTransportConstants.OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM`) for rendering
    model elements. Most of its contents are rendered on a canvas for performance.
*   **`SoluteConcentrationsAccordionBox`:** Displays bar charts showing solute concentrations.
*   **`SolutesPanel` and `SoluteControl`:** UI elements for selecting and adding/removing different types of solutes.
*   **`TransportProteinPanel` and `TransportProteinToolNode`:** UI for selecting and adding transport proteins to the membrane.
*   **`TransportProteinDragNode`:** A transient `Node` created when a transport protein is dragged from the toolbox or
    moved on the membrane. It handles the visual representation and interaction during dragging.
*   ** `ObservationWindowTransportProteinLayer`:** The layer for interactive transport proteins, which implements
    selecting a protein to grab with alternative input.
*   ** `InteractiveSlotsNode`:** Implements sorting transport proteins with alternative input, and works in tandem with
    `ObservationWindowTransportProteinLayer` to manage the interaction of transport proteins in slots.

### View Logic and Interactions

*   **`screenViewModelViewTransform`:** A `ModelViewTransform2` specific to the `ScreenView` that helps position UI
    elements relative to the `ObservationWindow`.

## Accessibility and Alternative Input

The simulation supports keyboard navigation and assistive technologies:

-   Keyboard controls for adding and repositioning channels, toggling ligands, and more.
-   Dynamic accessible descriptions (PDOM) clearly communicate membrane state and particle concentration.
-   Visual/auditory cues enhance feedback, thoroughly tested with common screen readers (NVDA, VoiceOver).

## PhET-iO Integration

The simulation is fully PhET-iO instrumented, allowing external tools to control and observe its state.

### IOTypes

Custom `IOType`s are defined for key model elements to support PhET-iO serialization:
*   **`MembraneTransportModel.ParticleIO`**: This `IOType` handles the serialization and deserialization of `Particle`
    instances (`Solute` and `Ligand`). Individual `Particle` instances are *not* PhET-iO instrumented directly. Instead,
    their container (`MembraneTransportModel`) manages their serialization. This `IOType` uses data type serialization.
    It includes `position`, `type`, `mode`, `model` (a reference to the `MembraneTransportModel`), and `opacity`.
*   **`MembraneTransportModel.MembraneTransportModelIO`**: This is the primary `IOType` for the model itself. It uses
    reference type serialization, similar to patterns seen in other PhET simulations (e.g., `Field.FieldIO`). It
    serializes the `solutes`, `ligands`, `fluxEntries`, `time`, and the state of `slots` (including the `TransportProteinType`,
    position, state, and `timeSinceStateTransition` for filled slots).

### Dynamic PhET-iO Elements

While `Particle` instances are not individually instrumented, the `MembraneTransportModel` manages their collection,
and their state is serialized as part of the model's overall state. `TransportProtein` instances are created dynamically
when added to slots, and their state is also serialized as part of the `MembraneTransportModel`.

## Performance and Optimization

-   Canvas-based sprite rendering is used for non-interactive particles and phospholipids within the `ObservationWindow`
    to optimize rendering performance.
-   The model and view are designed to be lightweight, with transient nodes used for dragging interactions to avoid
    overhead on persistent objects.
-   The "Hollywood" bias for passive diffusion helps manage the visual behavior of a small number of particles without
    requiring a large particle count for realistic macroscopic behavior. See `checkGradientForCrossing` and `BIAS_THRESHOLD`.