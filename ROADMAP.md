# Roadmap: Amino Acid Learning Curriculum

## Progress Overview
| Phase | Description | Status |
| :--- | :--- | :--- |
| Phase 1: Conceptualization | Definition of goals, architecture, and design. | ✅ |
| Phase 2: Project Setup | Initialization of repo, tech stack, and CI/CD. | 🏗️ |
| Phase 3: Data Acquisition | Collection of atomic coordinates and codon data. | ⏳ |
| Phase 4: Visualization Engine | Implementation of 2D, Stick, and Ball models. | ⏳ |
| Phase 5: Curriculum UI | Development of the interactive exploration interface. | ⏳ |
| Phase 6: Testing & QA | Full curriculum verification and user testing. | ⏳ |

## Goals
- ✅ Define project scope and architecture.
- 🏗️ Setup development environment.
- ⏳ Provide 21 amino acid models in three different modes.
- ⏳ Integrate mRNA codon learning content.
- ⏳ Deploy interactive curriculum via GitHub Pages / RTD.

## Phases

### Phase 1: Conceptualization ✅
- [x] Create CONCEPT.md
- [x] Create DESIGN.md
- [x] Create TOP_ARCHITECTURE.puml
- [x] Create initial ROADMAP.md

### Phase 2: Project Setup 🏗️
- [ ] Initialize repository structure
- [ ] Create `src/install.sh` for build tools
- [ ] Setup empty CI/CD pipeline in GitHub Actions
- [ ] Configure ReadTheDocs (RTD) integration

### Phase 3: Data Acquisition ⏳
- [ ] Create JSON schema for amino acid data
- [ ] Fetch/Create structural data for all 21 amino acids
- [ ] Compile codon mapping table

### Phase 4: Visualization Engine ⏳
- [ ] Implement SVG-based 2D renderer
- [ ] Implement Three.js-based Stick model renderer
- [ ] Implement Three.js-based Ball model renderer
- [ ] Add interaction (rotate, zoom) to 3D models

### Phase 5: Curriculum UI ⏳
- [ ] Build navigation menu for all amino acids
- [ ] Implement detailed view with metadata and models
- [ ] Add codon lookup and chemical group filters

### Phase 6: Testing & QA ⏳
- [ ] Write unit tests for data provider
- [ ] Write integration tests for visualization components
- [ ] Perform UI/UX verification with screenshots
