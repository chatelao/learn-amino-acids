import { describe, it, expect } from 'vitest';
import { ccp } from '../src/services/ccp';

describe('CurriculumContentProvider', () => {
  it('should return all amino acids', () => {
    const all = ccp.getAllAminoAcids();
    expect(all.length).toBe(21);
  });

  it('should find an amino acid by its 1-letter code', () => {
    const ala = ccp.getAminoAcidByCode1('A');
    expect(ala).toBeDefined();
    expect(ala?.name).toBe('Alanine');

    const none = ccp.getAminoAcidByCode1('Z');
    expect(none).toBeUndefined();
  });

  it('should find an amino acid by its 3-letter code', () => {
    const ala = ccp.getAminoAcidByCode3('Ala');
    expect(ala).toBeDefined();
    expect(ala?.name).toBe('Alanine');

    const gly = ccp.getAminoAcidByCode3('gly');
    expect(gly?.name).toBe('Glycine');
  });

  it('should filter amino acids by chemical class', () => {
    const nonpolar = ccp.getAminoAcidsByClass('Nonpolar');
    expect(nonpolar.length).toBeGreaterThan(0);
    expect(nonpolar.every(aa => aa.class === 'Nonpolar')).toBe(true);
  });

  it('should find amino acids by mRNA codon', () => {
    const ala = ccp.getAminoAcidsByCodon('GCU');
    expect(ala.length).toBe(1);
    expect(ala[0].name).toBe('Alanine');

    const arg = ccp.getAminoAcidsByCodon('CGU');
    expect(arg[0].name).toBe('Arginine');
  });

  it('should normalize codons when searching', () => {
    // T should be converted to U
    const ala = ccp.getAminoAcidsByCodon('GCT');
    expect(ala[0].name).toBe('Alanine');
  });

  it('should have structural data for Alanine and Glycine', () => {
    const ala = ccp.getAminoAcidByCode3('Ala');
    expect(ala?.atoms.length).toBe(6);

    const gly = ccp.getAminoAcidByCode3('Gly');
    expect(gly?.atoms.length).toBe(5);
  });

  it('should have structural data for Leu, Lys, Met, Phe, and Pro', () => {
    expect(ccp.getAminoAcidByCode3('Leu')?.atoms.length).toBe(9);
    expect(ccp.getAminoAcidByCode3('Lys')?.atoms.length).toBe(10);
    expect(ccp.getAminoAcidByCode3('Met')?.atoms.length).toBe(9);
    expect(ccp.getAminoAcidByCode3('Phe')?.atoms.length).toBe(12);
    expect(ccp.getAminoAcidByCode3('Pro')?.atoms.length).toBe(8);
  });
});
