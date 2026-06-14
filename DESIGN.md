# Design: Amino Acid Learning Curriculum

## Technology Stack
- **Frontend Framework:** React for a component-based UI.
- **3D Visualization:** Three.js for rendering molecular models.
- **2D Visualization:** SVG for 2D structural diagrams.
- **Data Management:** JSON files for amino acid properties and atomic coordinates.
- **Testing:** Vitest for unit testing and Playwright for frontend verification.
- **Documentation:** ReadTheDocs (RTD).

## Detailed Architecture
The application is structured as a client-side web application.

### Technical Interfaces
- **CCP API (Internal):** A TypeScript service providing access to amino acid metadata (name, 1-letter/3-letter code, codons, chemical class).
- **VE API (Internal):** A React component library that takes molecular coordinates and rendering mode (2D, Stick, Ball) as props and returns a Canvas/SVG element.
- **DR Interface:** Standardized JSON structure stored in `/src/data/` representing the PDB-like coordinates for each amino acid.

### Component Diagram
![Top Architecture](./TOP_ARCHITECTURE.puml)

## Major Technical Choice: 3D Rendering Framework
We evaluated three options for the 3D visualization:

### 1. Three.js (Chosen)
A powerful and widely-used library for WebGL.
- **Pros:** Excellent performance, large ecosystem, and great for custom molecular rendering.
- **Cons:** Slightly steeper learning curve than abstractions.

### 2. Babylon.js
Another high-performance WebGL engine.
- **Pros:** Comprehensive feature set and great documentation.
- **Cons:** Larger bundle size and overkill for simple molecular visualizations compared to Three.js.

### 3. A-Frame
A web framework for building VR experiences.
- **Pros:** Very easy to use (HTML-like syntax).
- **Cons:** Less flexible for fine-grained control over molecular geometries and shader effects.

**Decision:** We chose **Three.js** because it provides the right balance between control, performance, and community support for molecular visualization.

## Summary of Discarded Alternatives
- **Babylon.js:** Discarded due to bundle size and complexity for this specific use case.
- **A-Frame:** Discarded due to limited control over complex structural rendering.
