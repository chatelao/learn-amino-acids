# Roadmap: Aminosäure-Lerncurriculum

## Fortschrittsübersicht
| Phase | Beschreibung | Status |
| :--- | :--- | :--- |
| Phase 1: Konzeption | Definition der Ziele, Architektur und des Designs. | ✅ |
| Phase 2: Projekt-Setup | Initialisierung des Repositories, Tech-Stack und CI/CD. | ✅ |
| Phase 3: Datenerfassung | Sammlung von Atomkoordinaten und Codon-Daten. | ⏳ |
| Phase 4: Visualisierungs-Engine | Implementierung von 2D-, Stick- und Ball-Modellen. | ⏳ |
| Phase 5: Curriculum-Benutzeroberfläche | Entwicklung der interaktiven Explorations-Schnittstelle. | ⏳ |
| Phase 6: Testen & Qualitätssicherung | Vollständige Curriculum-Verifizierung und Benutzertests. | ⏳ |

## Ziele
- ✅ Projektumfang und Architektur definieren.
- ✅ Entwicklungsumgebung einrichten.
- ⏳ 21 Aminosäure-Modelle in drei verschiedenen Modi bereitstellen.
- ⏳ Lerninhalte zu mRNA-Codons integrieren.
- ⏳ Interaktives Curriculum über GitHub Pages / RTD bereitstellen.

## Phasen

### Phase 1: Konzeption ✅
- [x] CONCEPT.md erstellen (2026-06-14 11:00:00 UTC)
- [x] DESIGN.md erstellen (2026-06-14 11:05:00 UTC)
- [x] TOP_ARCHITECTURE.puml erstellen (2026-06-14 10:30:22 UTC)
- [x] ROADMAP.md erstellen (2026-06-14 11:10:00 UTC)

### Phase 2: Projekt-Setup ✅
- [x] Repository-Struktur initialisieren (2026-06-14 10:30:22 UTC)
- [x] `src/install.sh` für Build-Tools erstellen (2026-06-14 10:30:22 UTC)
- [x] Leere CI/CD-Pipeline in GitHub Actions einrichten (2026-06-14 10:30:22 UTC)
- [x] ReadTheDocs (RTD) Integration konfigurieren (2026-06-14 10:30:22 UTC)

### Phase 3: Datenerfassung ⏳
- [ ] JSON-Schema für Aminosäure-Daten erstellen
- [ ] Strukturdaten für alle 21 Aminosäuren abrufen/erstellen
- [ ] Codon-Mapping-Tabelle zusammenstellen

### Phase 4: Visualisierungs-Engine ⏳
- [ ] SVG-basierten 2D-Renderer implementieren
- [ ] Three.js-basierten Stick-Modell-Renderer implementieren
- [ ] Three.js-basierten Ball-Modell-Renderer implementieren
- [ ] Interaktion (Drehen, Zoomen) zu 3D-Modellen hinzufügen

### Phase 5: Curriculum-Benutzeroberfläche ⏳
- [ ] Navigationsmenü für alle Aminosäuren aufbauen
- [ ] Detailansicht mit Metadaten und Modellen implementieren
- [ ] Codon-Suche und Filter für chemische Gruppen hinzufügen

### Phase 6: Testen & Qualitätssicherung ⏳
- [ ] Unit-Tests für den Data Provider schreiben
- [ ] Integrationstests für Visualisierungskomponenten schreiben
- [ ] UI/UX-Verifizierung mit Screenshots durchführen
