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
Die Architektur wird durch das folgende Diagramm visualisiert:
![Top Architektur](./TOP_ARCHITECTURE.puml)

## Wichtige technische Entscheidung 1: 3D-Rendering-Framework
Wir haben drei Optionen für die 3D-Visualisierung bewertet:

### 1. Three.js (Gewählt)
Eine leistungsstarke und weit verbreitete Bibliothek für WebGL.
- **Vorteile:** Hervorragende Leistung, großes Ökosystem und ideal für benutzerdefiniertes molekulares Rendering.
- **Nachteile:** Alle molekularen Geometrien (Atome, Bindungen) müssen manuell implementiert werden.

### 2. 3Dmol.js
Eine spezialisierte JavaScript-Bibliothek für die molekulare Visualisierung.
- **Vorteile:** Eingebaute Unterstützung für Molekülformate und automatisches Rendering von Stick-and-Ball-Modellen.
- **Nachteile:** Weniger flexibel für allgemeine 3D-Effekte außerhalb der Molekülvisualisierung, ältere Codebasis (basiert auf jQuery).

### 3. MolStar
Ein modernes, hochperformantes Toolkit für die Visualisierung großer molekularer Strukturen.
- **Vorteile:** Extrem schnell, unterstützt sehr komplexe Szenen und modernste Rendering-Techniken.
- **Nachteile:** Hohe Komplexität der API, für die Darstellung einfacher Aminosäuren deutlich überdimensioniert.

**Entscheidung:** Wir haben uns für **Three.js** entschieden, da es das richtige Gleichgewicht zwischen Kontrolle, Leistung und Community-Unterstützung bietet. Da unser Fokus auf einer pädagogischen, hochgradig anpassbaren Darstellung von nur 21 kleinen Molekülen liegt, überwiegen die Vorteile der vollen Kontrolle gegenüber dem Komfort spezialisierter Bibliotheken.

## Wichtige technische Entscheidung 2: Zustandsmanagement
Für die Verwaltung des Anwendungszustands (z.B. ausgewählte Aminosäure, Darstellungsmodus) wurden drei Ansätze evaluiert:

### 1. React Context API (Gewählt)
Verwendung der eingebauten Context API von React zur globalen Zustandsverwaltung.
- **Vorteile:** Keine zusätzlichen Abhängigkeiten, einfach zu implementieren für mittlere Komplexität.
- **Nachteile:** Performance-Einbußen bei sehr häufigen Updates in tiefen Komponentenbäumen.

### 2. Redux Toolkit
Ein mächtiges Framework für das Zustandsmanagement mit striktem Datenfluss.
- **Vorteile:** Hervorragende Debugging-Tools (Redux DevTools), klare Trennung von Logik und UI.
- **Nachteile:** Viel Boilerplate-Code, für diese Anwendung wahrscheinlich überdimensioniert.

### 3. Zustand
Eine kleine, schnelle und skalierbare Lösung für das Zustandsmanagement.
- **Vorteile:** Minimalistischer API-Ansatz, sehr performant, weniger Boilerplate als Redux.
- **Nachteile:** Eine weitere externe Abhängigkeit.

**Entscheidung:** Wir haben uns für die **React Context API** entschieden, da sie für den Umfang dieses Projekts völlig ausreicht und die Anzahl der Abhängigkeiten gering hält.

## Wichtige technische Entscheidung 3: 2D-Rendering-Ansatz
Wir haben drei Optionen für die 2D-Visualisierung der Aminosäuren bewertet:

### 1. Manuelles SVG (Gewählt)
Direktes Erstellen von SVG-Elementen basierend auf den Atomkoordinaten.
- **Vorteile:** Volle Kontrolle über das Design, keine externen Abhängigkeiten, minimale Bundle-Größe.
- **Nachteile:** Bindungslogik und Layout müssen manuell berechnet werden.

### 2. SmilesDrawer
Eine performante JavaScript-Bibliothek zum Zeichnen von SMILES-Strings auf Canvas oder SVG.
- **Vorteile:** Automatische Generierung ästhetischer 2D-Diagramme aus SMILES-Strings.
- **Nachteile:** Erfordert SMILES-Daten für alle Aminosäuren; weniger Flexibilität bei der Interaktion mit einzelnen Atomen im Vergleich zu nativem SVG/React.

### 3. RDKit-js
Die JavaScript-Distribution des mächtigen RDKit-Cheminformatik-Toolkits.
- **Vorteile:** Industriestandard für chemische Berechnungen und Rendering, extrem robust.
- **Nachteile:** Sehr große WASM-Binärdatei erforderlich, was für eine einfache Webanwendung unverhältnismäßig ist.

**Entscheidung:** Wir haben uns für **manuelles SVG** entschieden. Da die Strukturen der 21 Aminosäuren statisch und bekannt sind, ermöglicht dieser Ansatz die schlankste Implementierung bei maximaler grafischer Flexibilität.

## Zusammenfassung der verworfenen Alternativen
- **3Dmol.js / MolStar:** Verworfen zugunsten von Three.js, um eine maßgeschneiderte, schlanke Visualisierung ohne unnötige Abhängigkeiten oder veraltete Technologien (jQuery) zu ermöglichen.
- **SmilesDrawer:** Verworfen, da die manuelle SVG-Kontrolle besser zu den Anforderungen an interaktive Lernelemente passt.
- **RDKit-js:** Verworfen aufgrund der enormen Bundle-Größe durch WASM-Abhängigkeiten.
- **Redux Toolkit / Zustand:** Verworfen, um die Anzahl der Third-Party-Bibliotheken zu minimieren, da React Context ausreicht.
