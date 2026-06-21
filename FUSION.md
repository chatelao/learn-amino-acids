# Amino Acid Fusion (Peptide Bond Formation)

This document describes the molecular process of amino acid fusion (peptide bond formation) within the ribosome, specifically focusing on the state and coordination involving the E (Exit) site.

## Ribosomal State and the E-Site

In the elongation cycle of translation, the ribosome oscillates between two primary states: **PRE-translocation** and **POST-translocation**.

When a deacylated (empty) tRNA is in the **E (Exit) position**, the ribosome is in the **POST-translocation state**. In this state:
*   **E-site:** Occupied by the deacylated tRNA from the previous step.
*   **P-site:** Occupied by the Peptidyl-tRNA (holding the growing polypeptide chain).
*   **A-site:** Empty, awaiting the next Aminoacyl-tRNA.

### Allosteric Coupling (E-A Site Correlation)
The presence of a tRNA in the E-site is not merely a passive waiting state for dissociation. There is an allosteric link between the E-site and the A-site:
1.  **High Affinity / Low Affinity:** According to the "Allosteric Three-Site Model," when the E-site is occupied, the A-site is in a low-affinity state for incoming tRNAs. This ensures that the ribosome doesn't bind a new tRNA too early or too loosely, enhancing the fidelity of the decoding process.
2.  **Reciprocal Occupancy:** The binding of a new Aminoacyl-tRNA to the A-site (facilitated by EF-Tu) triggers the release of the deacylated tRNA from the E-site. This "E-site release" is coupled with "A-site acceptance."

## The Fusion Process (Peptidyl Transfer)

The actual "fusion" of amino acids occurs at the **Peptidyl Transferase Center (PTC)** located within the large ribosomal subunit (50S/60S). This reaction transfers the polypeptide chain from the P-site tRNA to the amino acid on the A-site tRNA.

### 1. Positioning at the PTC
The 3' ends (CCA-tail) of the tRNAs in the A and P sites are brought into close proximity within the PTC. The PTC is composed entirely of conserved rRNA residues (e.g., 23S rRNA in bacteria), making the ribosome a **ribozyme**.

### 2. Nucleophilic Attack (The Chemical Mechanism)
The "fusion" is a nucleophilic displacement reaction:
*   **Nucleophile:** The $\alpha$-amino group ($-NH_2$) of the amino acid attached to the A-site tRNA.
*   **Electrophile:** The carbonyl carbon ($C=O$) of the ester bond linking the polypeptide chain to the P-site tRNA.

**Mechanism:**
1.  The $\alpha$-amino group of the A-site aminoacyl-tRNA performs a **nucleophilic attack** on the ester linkage of the P-site peptidyl-tRNA.
2.  A tetrahedral intermediate is formed, stabilized by the ribosomal environment (specifically the 2' OH of the A76 residue of the tRNA itself and PTC residues).
3.  The bond between the polypeptide and the P-site tRNA breaks, and a new **peptide bond** (amide bond) is formed with the A-site amino acid.

### 3. Catalysis by the Ribozyme
The 23S rRNA facilitates this reaction through:
*   **Proximity and Orientation:** Placing the reactants in the perfect geometry (within ~3 Å) for the attack.
*   **Proton Shuttle:** rRNA residues and the 2' OH of the P-site tRNA's terminal adenosine (A76) participate in a proton-transfer network that facilitates the leaving of the deacylated tRNA.
*   **Water exclusion:** The PTC creates a hydrophobic environment that prevents the premature hydrolysis of the peptidyl-tRNA bond (which only happens during termination).

## Outcome of Fusion

Immediately after the fusion (Peptidyl Transfer):
*   The **P-site tRNA** becomes **deacylated** (it no longer carries an amino acid/peptide).
*   The **A-site tRNA** becomes a **Peptidyl-tRNA** (now carrying the chain, extended by one amino acid).
*   The ribosome is now in the **PRE-translocation state**.

The next step is **Translocation** (catalyzed by EF-G), which moves the deacylated tRNA from the P-site to the E-site, and the peptidyl-tRNA from the A-site to the P-site, returning the ribosome to the POST-translocation state where the E-site is once again occupied.

## References
*   **Jia, B. et al. (2021).** Peptidyl transferase center structural constraints. *Scientific Reports*.
*   **Nierhaus, K. H. (1990).** The allosteric three-site model for the ribosomal elongation cycle. *Biochemistry*.
*   **Polikanov, Y. S. et al. (2014).** Structural basis for the ribosomal catalytic mechanism. *Molecular Cell*.
