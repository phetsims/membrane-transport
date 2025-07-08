# Membrane Transport Simulation – Technical Implementation Overview

This document summarizes the technical implementation and key features of the **Membrane Transport** PhET simulation.
The simulation models particle diffusion through cell membrane channels and pumps, including ligand-gated channels,
voltage-gated channels, a sodium-potassium pump, glucose transporters, and passive diffusion of O₂ and CO₂ molecules
directly across the membrane (without requiring a channel protein). It is a port of the Java-based simulation to HTML5,
incorporating modern PhET frameworks and updated pedagogical features.

## Features Overview

- **Included:**
  - PhET-iO instrumentation
  - core description
  - description Tier 2
  - sonification
  - keyboard support and interactive highlights
  - dynamic locales
  - sim-specific preferences
  - voicing (core)
  - pan/zoom

- **Excluded**
  - region and culture customization

### Novel Approaches

* **MembraneTransportFeatureSet**: This is a feature set that is used to enable/disable features in the simulation. It
  is used to enable/disable the different types of channels and controls are available on each screen. Note that the
  features are not mutually exclusive, and hence not amenable to subclassing. We also chose to avoid mixins since they
  introduce other difficulties. Instead, we use MembraneTransportFeatureSet to identify which features apply to which
  screens.
* **Transient Short-Lived Nodes**: We have taken efforts to keep the model and view lightweight. For example, when
  dragging a transport protein, a transient non-PhET-iO instrumented Node is temporarily created. When dropping the
  channel, the transient node is removed and the transport protein is added to the model. For the GrabSortInteraction,
  it operates on transient nodes as well. Preferring transient, short-lived Nodes helps us keep each individual node
  simpler and more manageable, as opposed to if we had a single Node that had to handle all modalities.
* **Strings** The simulation is experimenting with JSON5 for the JSON strings, see `membrane-transport-strings_en.json5`
  and a simplified syntax that omits the "value" keys. This allows for comments in the file. The standard json file is
  generated during `grunt update` or `grunt modulify`. Longer strings for description are written in Fluent, which is in
  ./strings/MembraneTransport_en.ftl
* **MembraneTransportConstants** is implemented via static attributes in a class, so the values can refer to each other
  in the declaration. This is unlike other simulations that export const and use file-specific local variables for
  cross-references. This also helps with searchability, since values are referred to the same way everywhere.

### Model

The model is purposefully simple, with flat data structures to facilitate PhET-iO serialization. For instance, Several
model Properties for particular transport protein state are not PhET-iO instrumented; instead they appear in the state
via serialization of the container.

Each Particle has a finite state machine to indicate what mode it is in, such as a random walk, or passing through a
transport protein. Membrane transport proteins additionally add their own state (often with their own finite state
machine) to manage their interactions. See js/common/model/Particle.ts and js/common/model/particleModes/ for more
details. See js/common/particleModes/BaseParticleMode.ts for the modes and the order that particles transition through
them.

Solutes can be added via the spinners, and flow in from the top or bottom of the ObservationWindow. Solutes are
non-interactive. Ligands can be added via a button, and Ligands are interactive, and can be dragged around the canvas
with mouse or keyboard. Solutes and Ligands subclasses of `class Particle`. They are represented by a finite state
machine which indicates their current mode and during step() can transition to a new mode based on the current mode and
the current state of the simulation.

**Slots** are the 7 positions on the membrane where a transport protein can be added.
**Slot Contents** refers to what a Slot may contain, which may be null or a transport protein.

### View

Much of the simulation is shown in the central ObservationWindow, which has most of its contents rendered in canvas.

### Ligand-Gated Channels

- Channels switch between closed and open states based on ligand presence.
- **Binding Sites** detect ligands, changing the state to open.
- Open channels allow diffusion of specific particle types (e.g., sodium ions) driven by concentration gradients (no
  active pulling).
- Visual feedback indicates channel states clearly; channels are either open or closed (binary state).

## Voltage-Gated Channels

Channels respond to membrane voltage, modeled as the net charge difference between membrane sides:

- Channels open when ion imbalance crosses a preset threshold.
- Diffusion is passive; ions flow down gradients, potentially altering voltage and causing channels to close
  dynamically.

## Sodium-Potassium Pump (Active Transport)

The simulation includes a Na⁺/K⁺ pump actively transporting ions against their gradients:

* 3 x Sodium bind
* ATP binds and release PO4, ADP drifts, PO4 stays attached
* Conformation change
* 3 x Sodium released
* 2 x K bind
* Conformation change
* PO4 release
* 2 x K release

## Glucose Transporters (Facilitated Diffusion)

Glucose transporters model passive transport of glucose molecules:

- Only transport glucose, distinguished visually.
- Simulate a simplified carrier mechanism with cooldown between transports, preventing instantaneous saturation.
- Bidirectional, always down concentration gradients, with simple visual feedback during transport.

## Passive Diffusion of Gases

The simulation supports passive diffusion of O₂ and CO₂ molecules directly across the membrane without the presence of
channel proteins. Their movement across the membrane occurs spontaneously, driven by concentration gradients alone.

## Accessibility and Alternative Input

The simulation supports keyboard navigation and assistive technologies:

- Keyboard controls for adding and repositioning channels, toggling ligands, and more.
- Dynamic accessible descriptions (PDOM) clearly communicate membrane state and particle concentration.
- Visual/auditory cues enhance feedback, thoroughly tested with common screen readers (NVDA, VoiceOver).

## PhET-iO Integration

- Instrumentation includes stable identifiers for all key model elements and controls.
- State snapshots capture essential model details, supporting state and PhET Studio

## Performance and Optimization

- Canvas-based sprite rendering for non-interactive particles and phospholipids