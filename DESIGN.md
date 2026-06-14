# Design: Aminosäure-Lerncurriculum

## Technologie-Stack
- **Frontend-Framework:** React für eine komponentenbasierte Benutzeroberfläche.
- **3D-Visualisierung:** Three.js für das Rendering molekularer Modelle.
- **2D-Visualisierung:** SVG für 2D-Strukturdiagramme.
- **Datenmanagement:** JSON-Dateien für Aminosäureeigenschaften und Atomkoordinaten.
- **Testing:** Vitest für Unit-Tests und Playwright für die Frontend-Verifizierung.
- **Dokumentation:** ReadTheDocs (RTD).

## Detaillierte Architektur
Die Anwendung ist als clientseitige Webanwendung strukturiert, die auf den in CONCEPT.md definierten funktionalen Komponenten aufbaut.

### Technische Schnittstellen
- **CCP API (Intern):** Ein TypeScript-Service, der Zugriff auf Aminosäure-Metadaten bietet (Name, 1-Buchstaben/3-Buchstaben-Code, Codons, chemische Klasse).
- **VE API (Intern):** Eine React-Komponentenbibliothek, die Molekülkoordinaten und den Rendering-Modus (2D, Stick, Ball) als Props entgegennimmt und ein Canvas/SVG-Element zurückgibt.
- **DR-Schnittstelle:** Standardisierte JSON-Struktur, gespeichert in `/src/data/`, die PDB-ähnliche Koordinaten für jede Aminosäure repräsentiert.

### Komponentendiagramm
Die Architektur wird durch das folgende Diagramm visualisiert:
![Top Architektur](./TOP_ARCHITECTURE.puml)

## Wichtige technische Entscheidung 1: 3D-Rendering-Framework
Wir haben drei Optionen für die 3D-Visualisierung bewertet:

### 1. Three.js (Gewählt)
Eine leistungsstarke und weit verbreitete Bibliothek für WebGL.
- **Vorteile:** Hervorragende Leistung, großes Ökosystem und ideal für benutzerdefiniertes molekulares Rendering.
- **Nachteile:** Etwas steilere Lernkurve als Abstraktionen.
- **Begründung:** Three.js bietet die notwendige Flexibilität und Leistung für detaillierte molekulare Modelle bei gleichzeitig hoher Community-Unterstützung.

### 2. Babylon.js
Eine weitere leistungsstarke WebGL-Engine.
- **Vorteile:** Umfassender Funktionsumfang und großartige Dokumentation.
- **Nachteile:** Größere Bundle-Größe.

### 3. A-Frame
Ein Web-Framework zum Erstellen von VR-Erlebnissen.
- **Vorteile:** Sehr einfach zu bedienen (HTML-ähnliche Syntax).
- **Nachteile:** Weniger flexibel für feingranulare Steuerung komplexer Geometrien.

## Wichtige technische Entscheidung 2: Zustandsmanagement
Für die Verwaltung des Anwendungszustands (z.B. ausgewählte Aminosäure, Darstellungsmodus) wurden drei Ansätze evaluiert:

### 1. React Context API (Gewählt)
Verwendung der eingebauten Context API von React zur globalen Zustandsverwaltung.
- **Vorteile:** Keine zusätzlichen Abhängigkeiten, einfach zu implementieren für mittlere Komplexität.
- **Nachteile:** Performance-Einbußen bei sehr häufigen Updates in extrem tiefen Komponentenbäumen.
- **Begründung:** Für den Umfang dieser Anwendung ist Context API die schlankeste Lösung ohne zusätzliche externe Bibliotheken.

### 2. Redux Toolkit
Ein mächtiges Framework für das Zustandsmanagement mit striktem Datenfluss.
- **Vorteile:** Hervorragende Debugging-Tools (Redux DevTools).
- **Nachteile:** Viel Boilerplate-Code, für diese Anwendung überdimensioniert.

### 3. Zustand
Eine kleine, schnelle und skalierbare Lösung für das Zustandsmanagement.
- **Vorteile:** Minimalistischer API-Ansatz, sehr performant.
- **Nachteile:** Eine weitere externe Abhängigkeit.

## Zusammenfassung der verworfenen Alternativen
- **Babylon.js:** Verworfen aufgrund der Bundle-Größe und Komplexität für diesen spezifischen Anwendungsfall.
- **A-Frame:** Verworfen aufgrund der begrenzten Kontrolle über komplexes strukturelles Rendering.
- **Redux Toolkit:** Verworfen wegen des hohen Overheads für eine relativ einfache Zustandsverwaltung.
- **Zustand:** Verworfen, um die Anzahl der Abhängigkeiten gering zu halten, da React Context ausreicht.
