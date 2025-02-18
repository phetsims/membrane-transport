Membrane Channels began development in 2025. 
It includes features like:
* phet-io
* description tier 1
* description tier 2
* sonification
* keyboard support
* interactive highlights
* dynamic locales
* sim-specific preferences

It does not include:
* voicing
* region and culture

### Special Considerations

We have taken efforts to keep the model and view lightweight. This has the following consequences:
1. When dragging a channel, a transient non-PhET-iO instrumented Node is temporarily created.
2. For the GrabSortInteraction, it operates on transient nodes as well.

### Model

The model is purposefully simple, with flat data structures to facilitate phet-io serialization.

Solutes can be added via the spinners, and flow in from the top or bottom of the ObservationWindow. Solutes are non-interactive
Ligands can be added via the buttons, and flow in from the left or right of the ObservationWindow. Ligands are interactive, and can be dragged around the canvas.
Solutes and Ligands are referred to more generally as Particles.

**Slots** are the 7 positions on the membrane where a protein/channel can be added.
**Slot Contents** refers to what a Slot may contain, which may be null or a protein/channel.

### View

Much of the simulation is shown in the central ObservationWindow, which has most of its contents rendered in canvas.