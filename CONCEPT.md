# Concept: Amino Acid Learning Curriculum

## Business Case
The project aims to provide an interactive and comprehensive educational tool for biochemistry students and enthusiasts. By providing 2D and 3D visualizations of all 21 human amino acids and their corresponding mRNA codons, the curriculum facilitates a deeper understanding of molecular biology and protein synthesis.

## Use Cases
- **Visualize Amino Acids:** Users can view 2D, stick, and ball models of each amino acid to understand their structure.
- **Learn mRNA Codons:** Users can study the mapping between mRNA codons and amino acids.
- **Study Chemical Properties:** Users can group and compare amino acids based on their chemical relationships and properties.
- **Interactive Exploration:** Users can interact with 3D models to better grasp the spatial arrangement of atoms.

## High-Level Architecture
The system consists of the following functional components and their business interfaces:

### Functional Components
- **Curriculum Content Provider:** Manages the educational data, including amino acid properties and codon mappings.
- **Visualization Engine:** Responsible for rendering 2D and 3D models (Stick and Ball).
- **User Interface:** Provides the entry point for users to explore the curriculum.
- **Data Repository:** Stores the structural data (coordinates, atom types) for the amino acids.

### Business Interfaces
- **Content Retrieval Interface:** UI requests educational information and codon mappings from the Curriculum Content Provider.
- **Visualization Interface:** UI requests specific 2D or 3D model renderings for a selected amino acid from the Visualization Engine.
- **Data Access Interface:** The Curriculum Content Provider and Visualization Engine fetch raw molecular data from the Data Repository.

## Major Conceptual Choice: Instructional Methodology
We evaluated three different approaches for delivering the curriculum:

### 1. Linear Course
A structured, step-by-step tutorial that guides the user through each amino acid in a fixed order.
- **Pros:** Clear path for beginners.
- **Cons:** Less flexibility for advanced users.

### 2. Interactive Sandbox (Chosen)
A free-form exploration tool where users can select any amino acid and switch between different visualization modes at will.
- **Pros:** Encourages exploration and is highly interactive.
- **Cons:** Might be overwhelming without a guided "start".

### 3. Quiz-Based Progression
Users must unlock amino acids by successfully identifying them or their codons in quizzes.
- **Pros:** High engagement and gamification.
- **Cons:** Can be frustrating if the user just wants to look up information.

**Decision:** We chose the **Interactive Sandbox** because it aligns best with the goal of providing a flexible learning tool that accommodates different learning styles and levels of prior knowledge.

## Summary of Discarded Alternatives
- **Linear Course:** Discarded due to lack of flexibility.
- **Quiz-Based Progression:** Discarded to ensure easy access to information without artificial barriers.
