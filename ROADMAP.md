# Roadmap: Aminosäure-Lerncurriculum

## Fortschrittsübersicht
| Phase | Beschreibung | Status |
| :--- | :--- | :--- |
| Phase 1: Konzeption | Definition der Ziele, Architektur und des Designs. | ✅ |
| Phase 2: Projekt-Setup | Initialisierung des Repositories, Tech-Stack und CI/CD. | ✅ |
| Phase 3: Datenerfassung | Sammlung von Atomkoordinaten und Codon-Daten. | 🏗️ |
| Phase 4: Visualisierungs-Engine | Implementierung von 2D-, Stick- und Ball-Modellen. | ✅ |
| Phase 5: Curriculum-Benutzeroberfläche | Entwicklung der interaktiven Explorations-Schnittstelle. | ✅ |
| Phase 6: Testen & Qualitätssicherung | Vollständige Curriculum-Verifizierung und Benutzertests. | ⏳ |

## Ziele
- ✅ Projektumfang und Architektur definieren.
- ✅ Entwicklungsumgebung einrichten.
- ⏳ 21 Aminosäure-Modelle in drei verschiedenen Modi bereitstellen.
- ⏳ Lerninhalte zu mRNA-Codons integrieren.
- ✅ Interaktives Curriculum über GitHub Pages / RTD bereitstellen. (2026-06-17 19:35:31 UTC)

## Phasen

### Phase 1: Konzeption ✅
- [x] CONCEPT.md erstellen und um wesentliche Entscheidungen erweitern (2026-06-14 11:00:00 UTC)
- [x] DESIGN.md erstellen und technische Schnittstellen definieren (2026-06-14 11:05:00 UTC)
- [x] TOP_ARCHITECTURE.puml erstellen (2026-06-14 10:30:22 UTC)
- [x] ROADMAP.md finalisieren und an CONCEPT/DESIGN anpassen (2026-06-14 11:10:00 UTC)

### Phase 2: Projekt-Setup ✅
- [x] Repository-Struktur initialisieren (2026-06-14 10:30:22 UTC)
- [x] `src/install.sh` für Build-Tools erstellen (2026-06-14 10:30:22 UTC)
- [x] Leere CI/CD-Pipeline in GitHub Actions einrichten (2026-06-14 10:30:22 UTC)
- [x] ReadTheDocs (RTD) Integration konfigurieren (2026-06-14 10:30:22 UTC)
- [x] GitHub Pages Deployment-Workflow einrichten (2026-06-17 19:35:31 UTC)

### Phase 3: Datenerfassung 🏗️
- [x] JSON-Schema für Aminosäure-Daten erstellen (2026-06-14 11:40:00 UTC)
- [x] Curriculum Content Provider (CCP) Service implementieren (2026-06-14 15:51:00 UTC)
- [x] Strukturdaten für Aminosäuren 1-5 abrufen/erstellen (Ala, Arg, Asn, Asp, Cys) (2026-06-15 12:19:34 UTC)
- [x] Strukturdaten für Aminosäuren 6-10 abrufen/erstellen (Gln, Glu, Gly, His, Ile) (2026-06-15 18:42:59 UTC)
- [x] Strukturdaten für Aminosäuren 11-15 abrufen/erstellen (Leu, Lys, Met, Phe, Pro) (2026-06-15 20:20:00 UTC)
- [x] Strukturdaten für Aminosäuren 16-18 abrufen/erstellen (Ser, Thr, Val) (2026-06-15 21:00:00 UTC)
- [ ] Strukturdaten für Aminosäuren 19-21 abrufen/erstellen (Trp, Tyr, Sec)
- [x] Integration von Erkenntnissen zu aaRS und tRNAs (2026-06-17 21:11:08 UTC)
- [x] Integration signifikanter pH-Werte (pKa) für NH2/COOH Gruppen (2026-06-17 21:27:54 UTC)
- [x] Codon-Mapping-Tabelle zusammenstellen (2026-06-14 11:45:00 UTC)

### Phase 4: Visualisierungs-Engine ✅
- [x] SVG-basierten 2D-Renderer implementieren (2026-06-14 20:00:00 UTC)
- [x] Three.js-basierten Stick-Modell-Renderer implementieren (2026-06-15 12:19:34 UTC)
- [x] Three.js-basierten Ball-Modell-Renderer implementieren (2026-06-15 12:19:34 UTC)
- [x] Interaktion (Drehen, Zoomen) zu 3D-Modellen hinzufügen (2026-06-15 14:30:00 UTC)

### Phase 5: Curriculum-Benutzeroberfläche ✅
- [x] Navigationsmenü für alle Aminosäuren aufbauen (2026-06-15 14:35:00 UTC)
- [x] Detailansicht mit Metadaten und Modellen implementieren (2026-06-15 15:10:00 UTC)
- [x] Codon-Suche und Filter für chemische Gruppen hinzufügen (2026-06-15 15:10:00 UTC)

### Phase 6: Testen & Qualitätssicherung ⏳
- [x] Unit-Tests für den Data Provider schreiben (2026-06-14 19:40:00 UTC)
- [x] Integrationstests für Visualisierungskomponenten schreiben (2026-06-14 20:10:00 UTC)
- [ ] UI/UX-Verifizierung mit Screenshots durchführen
