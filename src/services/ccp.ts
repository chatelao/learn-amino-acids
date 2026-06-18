import aminoAcids from '../data/amino-acids.json';

export interface Atom {
  element: string;
  x: number;
  y: number;
  z: number;
}

export interface Bond {
  from: number;
  to: number;
  order: number;
}

export type AminoAcidClass = 'Nonpolar' | 'Polar' | 'Acidic' | 'Basic';

export interface AminoAcid {
  name: string;
  code1: string;
  code3: string;
  codons: string[];
  class: AminoAcidClass;
  aaRS_class: 'Class I' | 'Class II';
  tRNA_info: string;
  atoms: Atom[];
  bonds: Bond[];
}

export class CurriculumContentProvider {
  private data: AminoAcid[];

  constructor() {
    this.data = aminoAcids as AminoAcid[];
  }

  /**
   * Returns all amino acids.
   */
  getAllAminoAcids(): AminoAcid[] {
    return this.data;
  }

  /**
   * Finds an amino acid by its name.
   */
  getAminoAcidByName(name: string): AminoAcid | undefined {
    return this.data.find(aa => aa.name.toLowerCase() === name.toLowerCase());
  }

  /**
   * Finds an amino acid by its 1-letter code.
   */
  getAminoAcidByCode1(code: string): AminoAcid | undefined {
    return this.data.find(aa => aa.code1.toUpperCase() === code.toUpperCase());
  }

  /**
   * Finds an amino acid by its 3-letter code.
   */
  getAminoAcidByCode3(code: string): AminoAcid | undefined {
    return this.data.find(aa => aa.code3.toLowerCase() === code.toLowerCase());
  }

  /**
   * Filters amino acids by their chemical class.
   */
  getAminoAcidsByClass(className: AminoAcidClass): AminoAcid[] {
    return this.data.filter(aa => aa.class === className);
  }

  /**
   * Finds amino acids that correspond to a specific mRNA codon.
   */
  getAminoAcidsByCodon(codon: string): AminoAcid[] {
    const normalizedCodon = codon.toUpperCase().replace(/T/g, 'U');
    return this.data.filter(aa => aa.codons.includes(normalizedCodon));
  }
}

export const ccp = new CurriculumContentProvider();
