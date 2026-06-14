# Umgang mit der Datei `ROADMAP.md`
- Die Datei `ROADMAP.md` ist der endgültige Plan zur Umsetzung der Dateien `CONCEPT.md` und `DESIGN.md`, um das übergeordnete Ziel zu erreichen.
- Definieren Sie die Schritte so, dass eine parallele Bearbeitung möglich ist, indem Sie zunächst nur Schnittstellen definieren und Funktionen erst später implementieren.
- Die Datei `ROADMAP.md` ist in mehrere wichtige Abschnitte gegliedert:
  - **Fortschrittsübersicht**: Eine Tabelle, die Phasen, Beschreibungen und Status zusammenfasst (mit ✅ für abgeschlossen, 🏗️ für in Bearbeitung, ⏳ für geplant).
  - **Ziele**: Eine allgemeine Liste der Projektziele mit Status-Emojis.
  - **Phasen**: Detaillierte Kapitel für jede Projektphase.
- Die Aufgaben und gegebenenfalls Unteraufgaben verfügen über Kontrollkästchen, um den Fortschritt anzuzeigen.
- Jede zu implementierende Aufgabe muss überschaubar, machbar und sinnvoll sein.
  - Wenn keine solche Aufgabe vorhanden ist, zerlege größere Schritte in überschaubare, ohne etwas zu implementieren, sondern ändere lediglich die Datei `ROADMAP.md`.
- Status-Emojis:
  - ✅: Abgeschlossen
  - 🏗️: In Bearbeitung
  - ⏳: Geplant / Zu erledigen
- Der Fortschritt wird bei jedem Schritt aktualisiert.
- Die abgeschlossenen Aufgaben werden mit dem entsprechenden Issue verknüpft und am Ende der Zeile mit einem Zeitstempel versehen.

# ANLEITUNG
- Behalte `src/install.sh` bei, um alle Tools zum Erstellen der Anwendung zu installieren (nur Test-Tools, siehe unten)
- Verwende „ReadTheDocs.org“ (RTD) für die Veröffentlichung der Dokumentation aus dem Hauptzweig

# Lokales Testen & mit Github Action Workflow (GH Action WF)
- Richte die leere CI/CD-Pipeline ein, bevor du mit dem Programmieren beginnst
- Schreibe CI/CD-Tests unabhängig als `test`-Skript der Github Action Workflows
- Erstelle Screenshots von jedem getesteten UI-Schritt und speichere sie als Asset des Action Workflows zur Überprüfung
- Verwenden Sie `test/install.sh`, um Test-Tools zu installieren.
- Verwenden Sie die GitHub-Action-Workflows, um die Tests nach Commits auszuführen.
- Laden Sie vor dem Commit alle Änderungen aus dem Remote-Repository herunter und führen Sie einen Merge durch
- Führen Sie die CI/CD bei jedem Commit in jedem Branch aus
- Fügen Sie so viel Caching wie möglich zu den GitHub-Action-Workflows hinzu
