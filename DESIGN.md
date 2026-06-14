# Design: Aminosäure-Lerncurriculum

## Technologie-Stack
- **Frontend-Framework:** React für eine komponentenbasierte Benutzeroberfläche.
- **3D-Visualisierung:** Three.js für das Rendering molekularer Modelle.
- **2D-Visualisierung:** SVG für 2D-Strukturdiagramme.
- **Datenmanagement:** JSON-Dateien für Aminosäureeigenschaften und Atomkoordinaten.
- **Testing:** Vitest für Unit-Tests und Playwright für die Frontend-Verifizierung.
- **Dokumentation:** ReadTheDocs (RTD).

## Detaillierte Architektur
Die Anwendung ist als clientseitige Webanwendung strukturiert.

### Technische Schnittstellen
- **CCP API (Intern):** Ein TypeScript-Service, der Zugriff auf Aminosäure-Metadaten bietet (Name, 1-Buchstaben/3-Buchstaben-Code, Codons, chemische Klasse).
- **VE API (Intern):** Eine React-Komponentenbibliothek, die Molekülkoordinaten und den Rendering-Modus (2D, Stick, Ball) als Props entgegennimmt und ein Canvas/SVG-Element zurückgibt.
- **DR-Schnittstelle:** Standardisierte JSON-Struktur, gespeichert in `/src/data/`, die PDB-ähnliche Koordinaten für jede Aminosäure repräsentiert.

### Komponentendiagramm
![Top Architektur](./TOP_ARCHITECTURE.puml)

## Wichtige technische Entscheidung: 3D-Rendering-Framework
Wir haben drei Optionen für die 3D-Visualisierung bewertet:

### 1. Three.js (Gewählt)
Eine leistungsstarke und weit verbreitete Bibliothek für WebGL.
- **Vorteile:** Hervorragende Leistung, großes Ökosystem und ideal für benutzerdefiniertes molekulares Rendering.
- **Nachteile:** Etwas steilere Lernkurve als Abstraktionen.

### 2. Babylon.js
Eine weitere leistungsstarke WebGL-Engine.
- **Vorteile:** Umfassender Funktionsumfang und großartige Dokumentation.
- **Nachteile:** Größere Bundle-Größe und für einfache molekulare Visualisierungen im Vergleich zu Three.js etwas überdimensioniert.

### 3. A-Frame
Ein Web-Framework zum Erstellen von VR-Erlebnissen.
- **Vorteile:** Sehr einfach zu bedienen (HTML-ähnliche Syntax).
- **Nachteile:** Weniger flexibel für die feingranulare Steuerung komplexer molekularer Geometrien und Shader-Effekte.

**Entscheidung:** Wir haben uns für **Three.js** entschieden, da es das richtige Gleichgewicht zwischen Kontrolle, Leistung und Community-Unterstützung für die molekulare Visualisierung bietet.

## Zusammenfassung der verworfenen Alternativen
- **Babylon.js:** Verworfen aufgrund der Bundle-Größe und Komplexität für diesen spezifischen Anwendungsfall.
- **A-Frame:** Verworfen aufgrund der begrenzten Kontrolle über komplexes strukturelles Rendering.
