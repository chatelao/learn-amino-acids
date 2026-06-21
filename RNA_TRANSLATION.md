# RNA Translation (Proteinsynthese)

Die RNA-Translation ist der Prozess, bei dem die genetische Information auf der mRNA in eine Aminosäuresequenz eines Proteins übersetzt wird. Dieser Prozess findet an den Ribosomen statt.

## Das Ribosom

Das Ribosom ist der zentrale Ort der Proteinsynthese. Es besteht aus zwei Untereinheiten:

*   **Kleine Untereinheit (40S bei Eukaryoten, 30S bei Prokaryoten):** Bindet die mRNA und stellt die korrekte Paarung zwischen mRNA-Codons und tRNA-Anticodons sicher.
    *   **Reaktionszentrum:** Das **Decoding Center** (Dekodierungszentrum) in der 16S/18S rRNA kontrolliert die Genauigkeit der Codon-Anticodon-Interaktion.
*   **Große Untereinheit (60S bei Eukaryoten, 50S bei Prokaryoten):** Beinhaltet das katalytische Zentrum (Peptidyltransferase), das die Peptidbindungen zwischen den Aminosäuren knüpft.
    *   **Reaktionszentrum:** Das **Peptidyltransferase-Zentrum (PTC)** tief in der 23S/28S rRNA katalysiert die Peptidbindung.

![70S Ribosom (PDB 4V42)](https://cdn.rcsb.org/images/structures/4v42_assembly-1.jpeg)
*Abbildung: Struktur des prokaryotischen 70S Ribosoms (mit mRNA und tRNAs).*

![80S Ribosom (PDB 4UG0)](https://cdn.rcsb.org/images/structures/4ug0_assembly-1.jpeg)
*Abbildung: Struktur des menschlichen 80S Ribosoms.*

### Funktionelle Bindungsstellen des Ribosoms

Das Ribosom besitzt drei spezifische Bindungsstellen für tRNAs:

1.  **A-Stelle (Aminoacyl-Stelle):** Bindet die ankommende, mit einer Aminosäure beladene tRNA.
2.  **P-Stelle (Peptidyl-Stelle):** Hält die tRNA, an der die wachsende Polypeptidkette befestigt ist.
3.  **E-Stelle (Exit-Stelle):** Hier verlassen die entladenen tRNAs das Ribosom.

## Die tRNA (Transfer-RNA)

Die tRNA fungiert als Adapter zwischen mRNA und Aminosäure.

*   **Anticodon-Schleife:** Erkennt das mRNA-Codon durch komplementäre Basenpaarung.
*   **Akzeptorarm (3'-Ende):** Besitzt die Sequenz **CCA**, an deren terminalem Adenosin die Aminosäure via Esterbindung gebunden ist.

![tRNA (PDB 1TRA)](https://cdn.rcsb.org/images/structures/1tra_assembly-1.jpeg)
*Abbildung: Tertiärstruktur (L-Form) der tRNA.*

## Die mRNA (Messenger-RNA)

Die mRNA trägt den genetischen Code in Form von Codons (Basentriplets).

*   **Reaktionszentrum:** Die **Codons**, die im Dekodierungszentrum des Ribosoms mit den Anticodons der tRNA interagieren.

## Ablauf der Translation

```{plantuml}
:caption: Ablauf der RNA-Translation
!include RNA_TRANSLATION_FLOW.puml
```

## Phasen der Translation

### 1. Initiation (Start)

Der Prozess beginnt an einem spezifischen **Start-Codon** (meist AUG, das für Methionin codiert).

*   **Beteiligte Proteine:** Initiationsfaktoren (eIFs bei Eukaryoten, IFs bei Prokaryoten).
    *   **IF2 (eIF2):** Eine GTPase, die die Initiator-tRNA zum Ribosom bringt.
*   **Reaktionszentren:**
    *   **G-Domäne (IF2):** Ort der GTP-Hydrolyse, die die Konformationsänderung für den Zusammenbau des Ribosoms bewirkt.
    *   **P-Stelle:** Die einzige Stelle, an der eine tRNA direkt ohne die A-Stelle binden kann (nur die Initiator-tRNA).
*   **Chemische Reaktion:** Die Bindung der großen Untereinheit wird durch die **Hydrolyse von GTP** zu GDP und Phosphat durch den Faktor IF2 (prokaryotisch) bzw. eIF2 (eukaryotisch) energetisch angetrieben.

![Initiationsfaktor IF2 (PDB 1Z9B)](https://cdn.rcsb.org/images/structures/1z9b_assembly-1.jpeg)
*Abbildung: Initiationsfaktor IF2 mit seiner charakteristischen GTP-Bindungsdomäne.*

*   **Ablauf:** Die kleine Untereinheit bindet an die mRNA. Die Initiator-tRNA (beladen mit Methionin) bindet an das Start-Codon. Anschließend lagert sich unter GTP-Verbrauch die große Untereinheit an, wobei die Initiator-tRNA in der P-Stelle positioniert wird.

### 2. Elongation (Verlängerung)

Die Polypeptidkette wird Aminosäure für Aminosäure verlängert.

*   **Beteiligte Proteine:** Elongationsfaktoren (eEFs/EFs, z. B. EF-Tu, EF-G).
    *   **EF-Tu (eEF1A):** Liefert Aminoacyl-tRNAs an die A-Stelle.
    *   **EF-G (eEF2):** Katalysiert die Translokation.
*   **Reaktionszentren:**
    *   **G-Domäne (EF-Tu & EF-G):** Hydrolyse von GTP treibt die Selektion und Bewegung an.
    *   **Peptidyltransferase-Zentrum (PTC):** In der großen Untereinheit; hier erfolgt der chemische Brückenschlag zwischen den Aminosäuren.

![Elongationsfaktor EF-Tu (PDB 1EFT)](https://cdn.rcsb.org/images/structures/1eft_assembly-1.jpeg)
*Abbildung: EF-Tu im Komplex mit GTP.*

*   **Chemische Mechanismen:**
    *   **tRNA-Selektion:** EF-Tu (eEF1A) bindet GTP und bringt die Aminoacyl-tRNA zur A-Stelle. Die korrekte Codon-Anticodon-Paarung löst die **GTP-Hydrolyse** aus, woraufhin EF-Tu das Ribosom verlässt.
    *   **Peptidyltransferase-Reaktion:** Die 23S rRNA (Prokaryoten) bzw. 28S rRNA (Eukaryoten) fungiert als **Ribozym**. Die freie $\alpha$-Aminogruppe ($-\text{NH}_2$) der Aminosäure in der A-Stelle führt einen **nukleophilen Angriff** auf das Carbonyl-Kohlenstoffatom der Esterbindung zwischen der P-Stellen-tRNA und der wachsenden Peptidkette aus.
    *   **Translokation:** Der Faktor EF-G (eEF2) katalysiert unter **GTP-Hydrolyse** die konformative Änderung des Ribosoms, die zur Bewegung der tRNAs und der mRNA führt.

![Elongationsfaktor EF-G (PDB 1FNM)](https://cdn.rcsb.org/images/structures/1fnm_assembly-1.jpeg)
*Abbildung: EF-G, dessen Struktur die einer tRNA-EF-Tu-Komplexes imitiert ("Molecular Mimicry").*
*   **Ablauf:**
    1.  Eine neue Aminoacyl-tRNA tritt unter GTP-Verbrauch in die A-Stelle ein.
    2.  **Peptidyltransferase:** Die Peptidbindung wird geknüpft; die Kette wird von der tRNA in der P-Stelle auf die Aminosäure in der A-Stelle übertragen.
    3.  **Translokation:** Das Ribosom rückt unter erneutem GTP-Verbrauch um ein Codon weiter. Die entladene tRNA wandert in die E-Stelle, während die Peptidyl-tRNA von der A- in die P-Stelle rückt.

### 3. Termination (Abschluss)

Die Translation endet, wenn das Ribosom auf ein **Stop-Codon** (UAA, UAG oder UGA) trifft.

*   **Beteiligte Proteine:** Releasefaktoren (eRFs/RFs).
    *   **RF1/RF2 (eRF1):** Erkennt das Stop-Codon.
*   **Reaktionszentren:**
    *   **GGQ-Motiv (RF1/RF2):** Eine hochkonservierte Aminosäuresequenz (Glycin-Glycin-Glutamin), die direkt in das PTC reicht und die Hydrolyse der Esterbindung auslöst.
*   **Chemische Reaktion:** Releasefaktoren (RF1/RF2) imitieren die Struktur einer tRNA und bringen ein **Wassermolekül** in das aktive Zentrum (PTC). Die Peptidyltransferase katalysiert nun die **hydrolytische Spaltung** der Esterbindung zwischen der Polypeptidkette und der tRNA in der P-Stelle.

![Releasefaktor RF1 (PDB 1GQE)](https://cdn.rcsb.org/images/structures/1gqe_assembly-1.jpeg)
*Abbildung: Releasefaktor RF1.*

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

Die folgende Tabelle listet wichtige PDB-Strukturen auf, wobei der Schwerpunkt auf den menschlichen (H. sapiens) Faktoren liegt. Eine vollständige Liste aller menschlichen Translationsfaktoren und Aminoacyl-tRNA-Synthetasen finden Sie in [PROTEINS.md](PROTEINS.md).

| Molekül / Komplex | Organismus | PDB ID | Link |
| :--- | :--- | :--- | :--- |
| **Ribosom (80S)** | *Homo sapiens* | 4UG0 | [4UG0](https://www.rcsb.org/structure/4UG0) |
| **Ribosom (70S)** | *Thermus thermophilus* | 4V42 | [4V42](https://www.rcsb.org/structure/4V42) |
| **tRNA** | *Saccharomyces cerevisiae* | 1TRA | [1TRA](https://www.rcsb.org/structure/1TRA) |
| **Initiationsfaktor eIF2** | *Homo sapiens* | 6I3M | [6I3M](https://www.rcsb.org/structure/6I3M) |
| **Initiationsfaktor IF2** | *Thermus thermophilus* | 1Z9B | [1Z9B](https://www.rcsb.org/structure/1Z9B) |
| **Elongationsfaktor eEF1A** | *Homo sapiens* | 5LZW | [5LZW](https://www.rcsb.org/structure/5LZW) |
| **Elongationsfaktor EF-Tu** | *Escherichia coli* | 1EFT | [1EFT](https://www.rcsb.org/structure/1EFT) |
| **Elongationsfaktor eEF2** | *Homo sapiens* | 4V6X | [4V6X](https://www.rcsb.org/structure/4V6X) |
| **Elongationsfaktor EF-G** | *Thermus thermophilus* | 1FNM | [1FNM](https://www.rcsb.org/structure/1FNM) |
| **Releasefaktor eRF1** | *Homo sapiens* | 5GAK | [5GAK](https://www.rcsb.org/structure/5GAK) |
| **Releasefaktor RF1** | *Thermus thermophilus* | 1GQE | [1GQE](https://www.rcsb.org/structure/1GQE) |
| **mRNA (Ausschnitt)** | *N/A* | 4V42 | [4V42](https://www.rcsb.org/structure/4V42) |
