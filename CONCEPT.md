# Konzept: Aminosäure-Lerncurriculum

## Business Case
Das Projekt zielt darauf ab, ein interaktives und umfassendes Bildungswerkzeug für Biochemie-Studierende und Enthusiasten bereitzustellen. Durch die Bereitstellung von 2D- und 3D-Visualisierungen aller 21 menschlichen Aminosäuren und ihrer entsprechenden mRNA-Codons erleichtert das Curriculum ein tieferes Verständnis der Molekularbiologie und der Proteinsynthese.

## Anwendungsfälle (Use Cases)
- **Aminosäuren visualisieren:** Benutzer können 2D-, Stick- und Ball-Modelle jeder Aminosäure betrachten, um deren Struktur zu verstehen.
- **mRNA-Codons lernen:** Benutzer können die Zuordnung zwischen mRNA-Codons und Aminosäuren studieren.
- **Chemische Eigenschaften untersuchen:** Benutzer können Aminosäuren basierend auf ihren chemischen Beziehungen und Eigenschaften gruppieren und vergleichen.
- **Interaktive Exploration:** Benutzer können mit 3D-Modellen interagieren, um die räumliche Anordnung der Atome besser zu erfassen.

## High-Level-Architektur
Das System besteht aus den folgenden funktionalen Komponenten und ihren Geschäftsschnittstellen:

### Funktionale Komponenten
- **Curriculum Content Provider (CCP):** Verwaltet die Bildungsdaten, einschließlich Aminosäureeigenschaften und Codon-Mappings.
- **Visualization Engine (VE):** Verantwortlich für das Rendering von 2D- und 3D-Modellen (Stick und Ball).
- **User Interface (UI):** Bietet den Einstiegspunkt für Benutzer zur Erkundung des Curriculums.
- **Data Repository (DR):** Speichert die Strukturdaten (Koordinaten, Atomtypen) für die Aminosäuren.

### Geschäftsschnittstellen
- **Content Retrieval Interface:** Die UI fordert Bildungsinformationen und Codon-Mappings vom Curriculum Content Provider an.
- **Visualization Interface:** Die UI fordert spezifische 2D- oder 3D-Modell-Renderings für eine ausgewählte Aminosäure von der Visualization Engine an.
- **Data Access Interface:** Der Curriculum Content Provider und die Visualization Engine rufen molekulare Rohdaten aus dem Data Repository ab.

## Wichtige konzeptionelle Entscheidung 1: Unterrichtsmethodik
Wir haben drei verschiedene Ansätze für die Vermittlung des Curriculums bewertet:

### 1. Linearer Kurs
Ein strukturierter Schritt-für-Schritt-Leitfaden, der den Benutzer in einer festen Reihenfolge durch jede Aminosäure führt.
- **Vorteile:** Klarer Pfad für Anfänger.
- **Nachteile:** Weniger Flexibilität für fortgeschrittene Benutzer.

### 2. Interaktive Sandbox (Gewählt)
Ein freies Explorationswerkzeug, bei dem Benutzer jede beliebige Aminosäure auswählen und nach Belieben zwischen verschiedenen Visualisierungsmodi wechseln können.
- **Vorteile:** Fördert die Exploration und ist hochgradig interaktiv.
- **Nachteile:** Könnte ohne einen geführten "Start" überwältigend wirken.

### 3. Quiz-basierter Fortschritt
Benutzer müssen Aminosäuren freischalten, indem sie diese oder ihre Codons in Quizfragen erfolgreich identifizieren.
- **Vorteile:** Hohes Engagement und Gamifizierung.
- **Nachteile:** Kann frustrierend sein, wenn der Benutzer lediglich Informationen nachschlagen möchte.

**Entscheidung:** Wir haben uns für die **Interaktive Sandbox** entschieden, da sie am besten mit dem Ziel übereinstimmt, ein flexibles Lernwerkzeug bereitzustellen, das unterschiedliche Lernstile und Vorwissensstufen berücksichtigt.

## Wichtige konzeptionelle Entscheidung 2: Datenhaltung und -bereitstellung
Wir haben drei Optionen für die Speicherung und Bereitstellung der molekularen Daten untersucht:

### 1. Statische JSON-Dateien (Gewählt)
Die Daten werden als JSON-Dateien direkt im Repository gespeichert und mit der Anwendung ausgeliefert.
- **Vorteile:** Einfache Bereitstellung als statische Seite, keine Server-Infrastruktur erforderlich, schnelle Ladezeiten.
- **Nachteile:** Änderungen erfordern einen neuen Build/Deployment.

### 2. Zentrale SQL-Datenbank
Die Daten werden in einer relationalen Datenbank (z.B. PostgreSQL) gespeichert und über eine API bereitgestellt.
- **Vorteile:** Dynamische Updates ohne Deployment möglich, bessere Skalierbarkeit für riesige Datenmengen.
- **Nachteile:** Erfordert Backend-Server und Datenbank-Hosting, erhöht die Komplexität der Architektur erheblich.

### 3. Externe Bio-Datenbank-API
Die Daten werden zur Laufzeit direkt von Diensten wie PubChem oder der Protein Data Bank (PDB) abgerufen.
- **Vorteile:** Immer auf dem neuesten Stand der Forschung, kein eigener Speicheraufwand.
- **Nachteile:** Abhängigkeit von externen Diensten, potenzielle Latenzprobleme, komplexe Transformation der Rohdaten erforderlich.

**Entscheidung:** Wir haben uns für **Statische JSON-Dateien** entschieden, da die Daten für 21 Aminosäuren stabil sind und dieser Ansatz die einfachste und robusteste Lösung für eine Bildungsanwendung darstellt.

## Zusammenfassung der verworfenen Alternativen
- **Linearer Kurs:** Verworfen aufgrund mangelnder Flexibilität.
- **Quiz-basierter Fortschritt:** Verworfen, um einen einfachen Zugang zu Informationen ohne künstliche Barrieren zu gewährleisten.
- **Zentrale SQL-Datenbank:** Verworfen wegen unnötiger Infrastruktur-Komplexität für einen begrenzten Datensatz.
- **Externe Bio-Datenbank-API:** Verworfen wegen der Abhängigkeit von Drittanbietern und der Komplexität des Datenmappings.
