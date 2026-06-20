# RNA Translation (Proteinsynthese)

Die RNA-Translation ist der Prozess, bei dem die genetische Information auf der mRNA in eine Aminosäuresequenz eines Proteins übersetzt wird. Dieser Prozess findet an den Ribosomen statt.

## Das Ribosom

Das Ribosom ist der zentrale Ort der Proteinsynthese. Es besteht aus zwei Untereinheiten:

*   **Kleine Untereinheit (40S bei Eukaryoten, 30S bei Prokaryoten):** Bindet die mRNA und stellt die korrekte Paarung zwischen mRNA-Codons und tRNA-Anticodons sicher.
*   **Große Untereinheit (60S bei Eukaryoten, 50S bei Prokaryoten):** Beinhaltet das katalytische Zentrum (Peptidyltransferase), das die Peptidbindungen zwischen den Aminosäuren knüpft.

### Funktionelle Bindungsstellen des Ribosoms

Das Ribosom besitzt drei spezifische Bindungsstellen für tRNAs:

1.  **A-Stelle (Aminoacyl-Stelle):** Bindet die ankommende, mit einer Aminosäure beladene tRNA.
2.  **P-Stelle (Peptidyl-Stelle):** Hält die tRNA, an der die wachsende Polypeptidkette befestigt ist.
3.  **E-Stelle (Exit-Stelle):** Hier verlassen die entladenen tRNAs das Ribosom.

## Ablauf der Translation

![RNA Translation Ablauf](./RNA_TRANSLATION_FLOW.puml)

## Phasen der Translation

### 1. Initiation (Start)

Der Prozess beginnt an einem spezifischen **Start-Codon** (meist AUG, das für Methionin codiert).

*   **Beteiligte Proteine:** Initiationsfaktoren (eIFs bei Eukaryoten, IFs bei Prokaryoten).
*   **Chemische Reaktion:** Die Bindung der großen Untereinheit wird durch die **Hydrolyse von GTP** zu GDP und Phosphat durch den Faktor IF2 (prokaryotisch) bzw. eIF2 (eukaryotisch) energetisch angetrieben.
*   **Ablauf:** Die kleine Untereinheit bindet an die mRNA. Die Initiator-tRNA (beladen mit Methionin) bindet an das Start-Codon. Anschließend lagert sich unter GTP-Verbrauch die große Untereinheit an, wobei die Initiator-tRNA in der P-Stelle positioniert wird.

### 2. Elongation (Verlängerung)

Die Polypeptidkette wird Aminosäure für Aminosäure verlängert.

*   **Beteiligte Proteine:** Elongationsfaktoren (eEFs/EFs, z. B. EF-Tu, EF-G).
*   **Chemische Mechanismen:**
    *   **tRNA-Selektion:** EF-Tu (eEF1A) bindet GTP und bringt die Aminoacyl-tRNA zur A-Stelle. Die korrekte Codon-Anticodon-Paarung löst die **GTP-Hydrolyse** aus, woraufhin EF-Tu das Ribosom verlässt.
    *   **Peptidyltransferase-Reaktion:** Die 23S rRNA (Prokaryoten) bzw. 28S rRNA (Eukaryoten) fungiert als **Ribozym**. Die freie $\alpha$-Aminogruppe ($-\text{NH}_2$) der Aminosäure in der A-Stelle führt einen **nukleophilen Angriff** auf das Carbonyl-Kohlenstoffatom der Esterbindung zwischen der P-Stellen-tRNA und der wachsenden Peptidkette aus.
    *   **Translokation:** Der Faktor EF-G (eEF2) katalysiert unter **GTP-Hydrolyse** die konformative Änderung des Ribosoms, die zur Bewegung der tRNAs und der mRNA führt.
*   **Ablauf:**
    1.  Eine neue Aminoacyl-tRNA tritt unter GTP-Verbrauch in die A-Stelle ein.
    2.  **Peptidyltransferase:** Die Peptidbindung wird geknüpft; die Kette wird von der tRNA in der P-Stelle auf die Aminosäure in der A-Stelle übertragen.
    3.  **Translokation:** Das Ribosom rückt unter erneutem GTP-Verbrauch um ein Codon weiter. Die entladene tRNA wandert in die E-Stelle, während die Peptidyl-tRNA von der A- in die P-Stelle rückt.

### 3. Termination (Abschluss)

Die Translation endet, wenn das Ribosom auf ein **Stop-Codon** (UAA, UAG oder UGA) trifft.

*   **Beteiligte Proteine:** Releasefaktoren (eRFs/RFs).
*   **Chemische Reaktion:** Releasefaktoren (RF1/RF2) imitieren die Struktur einer tRNA und bringen ein **Wassermolekül** in das aktive Zentrum. Die Peptidyltransferase katalysiert nun die **hydrolytische Spaltung** der Esterbindung zwischen der Polypeptidkette und der tRNA in der P-Stelle.
*   **Energie:** Der Prozess wird durch die **GTP-Hydrolyse** durch den Faktor RF3 (oder eRF3) abgeschlossen, was die Dissoziation des Komplexes einleitet.
*   **Ablauf:** Da es keine tRNAs für Stop-Codons gibt, binden Releasefaktoren an die A-Stelle. Dies führt zur hydrolytischen Freisetzung der Polypeptidkette und zum Zerfall des Ribosoms.

## Zusammenfassung der beteiligten Faktoren

| Faktor-Typ | Beispiele (Prokaryoten/Eukaryoten) | Funktion |
| :--- | :--- | :--- |
| **Initiationsfaktoren** | IF1, IF2, IF3 / eIF1, eIF2, eIF4E | Zusammenbau des Ribosoms am Start-Codon |
| **Elongationsfaktoren** | EF-Tu, EF-Ts, EF-G / eEF1A, eEF1B, eEF2 | tRNA-Anlieferung und Translokation des Ribosoms |
| **Releasefaktoren** | RF1, RF2, RF3 / eRF1, eRF3 | Erkennung von Stop-Codons und Kettenfreisetzung |

## Referenzen

- **Jakubowski, H., and Flatt, P.** "Fundamentals of Biochemistry." Biology LibreTexts.
- **Lodish et al.** "Molecular Cell Biology."

## Anhang: PDB-Referenzen

Die folgenden PDB-Einträge bieten detaillierte strukturelle Einblicke in die beteiligten Makromoleküle:

| Molekül / Komplex | Organismus | PDB ID | Link |
| :--- | :--- | :--- | :--- |
| **Ribosom (70S)** | *Thermus thermophilus* | 4V42 | [4V42](https://www.rcsb.org/structure/4V42) |
| **Ribosom (80S)** | *Homo sapiens* | 4UG0 | [4UG0](https://www.rcsb.org/structure/4UG0) |
| **Initiationsfaktor IF2** | *Thermus thermophilus* | 1Z9B | [1Z9B](https://www.rcsb.org/structure/1Z9B) |
| **Elongationsfaktor EF-Tu** | *Escherichia coli* | 1EFT | [1EFT](https://www.rcsb.org/structure/1EFT) |
| **Elongationsfaktor EF-G** | *Thermus thermophilus* | 1FNM | [1FNM](https://www.rcsb.org/structure/1FNM) |
| **Releasefaktor RF1** | *Thermus thermophilus* | 3MS1 | [3MS1](https://www.rcsb.org/structure/3MS1) |
