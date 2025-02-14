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

### Model

The model is purposefully simple, with flat data structures to facilitate phet-io serialization.

Solutes can be added via the spinners, and flow in from the top or bottom of the ObservationWindow. Solutes are non-interactive
Ligands can be added via the buttons, and flow in from the left or right of the ObservationWindow. Ligands are interactive, and can be dragged around the canvas.
Solutes and Ligands are referred to more generally as Particles.

### View

Much of the simulation is shown in the central ObservationWindow, which has most of its contents rendered in canvas.