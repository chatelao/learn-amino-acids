# Amino Acid Curriculum

An interactive and comprehensive educational tool for biochemistry students and enthusiasts, facilitating a deeper understanding of molecular biology and protein synthesis through 2D and 3D visualizations.

[![Documentation Status](https://readthedocs.org/projects/learn-amino-acids/badge/?version=latest)](https://learn-amino-acids.readthedocs.io/en/latest/?badge=latest)

## Documentation

The full documentation is available at [learn-amino-acids.readthedocs.io](https://learn-amino-acids.readthedocs.io/).

## Features

- **21 Amino Acids:** Detailed data and visualizations for all standard human amino acids.
- **Multiple Visualization Modes:**
  - 2D Structural Diagrams (SVG)
  - 3D Stick Models (Three.js)
  - 3D Ball-and-Stick Models (Three.js)
- **mRNA Codon Mapping:** Study the relationship between codons and amino acids.
- **Interactive Exploration:** Rotate and zoom 3D models to understand spatial arrangements.

## Getting Started

### Installation

To install the necessary build tools, run:

```bash
./src/install.sh
```

To install testing tools (including Playwright browsers), run:

```bash
./test/install.sh
```

### Development

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

## Testing

### Unit Tests

Run unit tests using Vitest:

```bash
npm test
```

### E2E / UI Tests

Run end-to-end tests using Playwright:

```bash
npm run test:ui
```

## Architecture & Design

For more detailed information on the project's structure and goals, please refer to:

- [CONCEPT.md](./CONCEPT.md)
- [DESIGN.md](./DESIGN.md)
- [ROADMAP.md](./ROADMAP.md)
- [REFERENCES.md](./REFERENCES.md)

## Sources

This project utilizes scientific data and educational materials from:
- [Biology LibreTexts: Amino Acids and Peptides](https://bio.libretexts.org/Bookshelves/Biochemistry/Fundamentals_of_Biochemistry_(Jakubowski_and_Flatt)/01:_Unit_I-_Structure_and_Catalysis/03:_Amino_Acids_Peptides_and_Proteins/3.01:_Amino_Acids_and_Peptides)
- Kaiser et al. (2020) for aaRS and tRNA metadata.
