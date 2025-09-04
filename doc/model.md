# Membrane Transport Simulation - Model Description

This document describes the core concepts of the **Membrane Transport** simulation, designed for educators and students.
The simulation models how particles (referred to as "solutes" in the simulation) move across a cell membrane via membrane proteins: open channels, gated channels
(ligand-gated and voltage-gated), active transport pumps, and glucose transporters. Below, key terminology and biological
concepts are defined clearly, and the simulation’s behaviors, including channel gating and diffusion, are explained.

## Expected Learning Outcomes

Students using the simulation should be able to:

- Understand selective permeability and identify particle movement through various channel types.
- Differentiate between passive (channels, facilitated diffusion) and active transport (pumps).
- Recognize that passive diffusion stops at steady-state unless actively maintained by pumps.
- Describe how ligand and voltage signals regulate channel activity.
- Explain how passive and active transport differ in energy requirements and direction relative to concentration
  gradients.

## Core Concepts and Simulation Implementation

The simulation emphasizes the cell membrane’s **selective permeability**, showing how cells use proteins (channels and
pumps) to control transport. Without these proteins, particles of a certain size and polarity/charge cannot cross the
membrane.

### Simplified Conceptual Model

**Solute particles:** Particles randomly diffuse, visually representing the microscopic randomness driving diffusion. Particle motion is stochastic to create visually interpretable net fluxes; time scales and numeric rates are tuned for pedagogy, not for biochemical accuracy.

**Visuals:** Visual scaling and iconography prioritize learner clarity over molecular-scale geometry.

**Environment Simplification:** Membrane mechanics (elasticity, detailed bending) and long-term cellular regulation (gene expression, signaling cascades) are outside the scope of the model.

- **Passive/Facilitated Diffusion:** Particles naturally move down their concentration gradients through membranes or open transport protein channels, without energy input. Diffusion continues until steady-state is reached.
- **Active Transport:** Active Transporters use energy (in the form of ATP) to move particles against their gradients, creating or maintaining concentration differences.

### Passive Diffusion of Gases

Oxygen (O₂) and carbon dioxide (CO₂) can passively diffuse directly across the membrane without channel proteins, moving
freely down their concentration gradients due to their small size and nonpolar nature. The simulation reflects this by
showing these gases crossing the membrane freely without channels. However, there is a probability the particles do not cross the membrane upon collision and redirection.

### Channel Gating Mechanisms

The simulation models channels as either fully open or fully closed, simplifying complex real-world mechanisms:

- **Ligand-Gated Channels:** Open when a ligand binds to the channel. In the simulation, ligand binding instantly opens the channel, allowing ions to diffuse through. Removing the ligand closes the channel again, stopping diffusion.

- **Voltage-Gated Channels:** Respond to changes in electrical voltage across the membrane, also referred to as the membrane   potential, measured in milliVolts. When a certain threshold of charge difference is reached, these channels open automatically, allowing ions to flow until the voltage returns below the threshold.

Gating events are near-immediate to emphasize cause-and-effect, but with a small delay in opening/closing to emphasize the conformational shape change of the protein. Real biological gating is often stochastic, time-dependent, and influenced by multiple interacting factors not represented here.

### Sodium-Potassium Pumps (Primary Active Transport)

The sodium-potassium pump actively moves Na⁺ and K⁺ against their concentration gradients, requiring ATP energy. This
mechanism allows cells to maintain gradients essential for functions like nerve signaling. In the simulation, students
can observe the pump actively creating or increasing gradients.

### Sodium-Glucose Cotransporters (Secondary Active Transport)

Glucose, a large polar molecule, cannot freely cross the membrane. In the simulation, glucose transporters assist
glucose in diffusing down its gradient, without energy expenditure. The transporters act as unidirectional carriers to the inside of the cell. The rate depends on the number of transporters present.

### Dynamic steady-state and Diffusion Rates

The simulation visually illustrates that diffusion rates depend on:

- **Gradient size:** Larger concentration differences increase diffusion speed.
- **Number of open channels:** More channels speed up diffusion.
- **Pump activity:** Pumps actively prevent steady-state-like conditions by continuously moving particles against their gradients.

**Modeling note (rates and environment):** The sim emphasizes qualitative relationships (for example, more open channels → faster net flux) rather than reproducing exact biochemical rate constants. Environmental factors such as temperature, ionic strength, molecular crowding, and membrane heterogeneity are not modeled; these can significantly affect real transport kinetics.

## Terminology

**Cell Membrane:** A semipermeable barrier (phospholipid bilayer) separating a cell’s interior from its exterior
environment. In the simulation, it’s depicted as a barrier dividing two fluid regions (inside/outside). Most substances
cross only via membrane proteins.

**Diffusion:** Passive movement of particles from areas of higher concentration to areas of lower concentration due to
random particle motion. The simulation visualizes diffusion as random particle motion, resulting in net movement from
high to low concentrations.

**Concentration Gradient:** A difference in concentration between two areas. Particles naturally diffuse down their
concentration gradient (high to low concentration).

**Membrane Channel:** A protein forming a pore that allows specific substances to diffuse across the membrane. Channels
can be always open or gated (ligand-gated or voltage-gated). Each type has a distinctive icon in the simulation.

**Ligand:** A molecule that binds to specific protein sites, triggering changes like opening ligand-gated channels. In
the simulation, ligands are represented as key-like particles that attach to these channels.

**Voltage-Gated Channel:** Channels that open or close in response to electrical voltage differences across the
membrane. In the simulation, channels open once a specific voltage threshold (charge difference) is reached.

**Active Transport:** Movement of substances across a membrane against their concentration gradient, requiring energy (
ATP). The sodium-potassium pump is an example, actively moving Na⁺ and K⁺ ions against their gradients.

**Facilitated Diffusion:** Passive movement of substances down their concentration gradient, assisted by carrier
proteins. Glucose transporters are an example. The transporter enables glucose, which otherwise would not diffuse
easily, to cross the membrane passively.

**Steady-State:** A state where particle concentrations are equal on both membrane sides, resulting in no net diffusion.
Particles still move randomly across the membrane, but overall concentrations remain stable.
