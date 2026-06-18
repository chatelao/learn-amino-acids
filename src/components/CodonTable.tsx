import React from 'react';
import { ccp, AminoAcid, AminoAcidClass } from '../services/ccp';

interface CodonTableProps {
  selectedAA: AminoAcid;
}

const BASES = ['U', 'C', 'A', 'G'] as const;

const CodonTable: React.FC<CodonTableProps> = ({ selectedAA }) => {
  const getColorForClass = (aaClass: AminoAcidClass | 'Stop') => {
    switch (aaClass) {
      case 'Nonpolar': return '#fff9c4';
      case 'Polar': return '#c8e6c9';
      case 'Basic': return '#bbdefb';
      case 'Acidic': return '#ffcdd2';
      case 'Stop': return '#eeeeee';
      default: return '#ffffff';
    }
  };

  const getAminoAcidForCodon = (codon: string) => {
    const results = ccp.getAminoAcidsByCodon(codon);
    if (results.length === 0) return { name: 'Stop', class: 'Stop' as const, code3: 'Stop' };

    // In case of multiple results (e.g. UGA can be Stop or Sec), prioritize the currently selected one
    const selectedMatch = results.find(aa => aa.code3 === selectedAA.code3);
    return selectedMatch || results[0];
  };

  return (
    <div style={{ marginTop: '20px', backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
      <h3 style={{ marginTop: 0, textAlign: 'center' }}>Genetic Code Table (mRNA Codons)</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', margin: '0 auto', fontSize: '0.75rem', textAlign: 'center' }}>
          <thead>
            <tr>
              <th colSpan={2} rowSpan={2}></th>
              <th colSpan={4} style={{ padding: '10px', backgroundColor: '#f5f5f5', border: '1px solid #ccc' }}>2nd Base</th>
              <th rowSpan={2}></th>
            </tr>
            <tr>
              {BASES.map(b2 => (
                <th key={b2} style={{ width: '100px', padding: '5px', backgroundColor: '#f5f5f5', border: '1px solid #ccc' }}>{b2}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BASES.map((b1, b1Index) => (
              <React.Fragment key={b1}>
                {BASES.map((b3, b3Index) => (
                  <tr key={`${b1}-${b3}`}>
                    {b3Index === 0 && (
                      <th rowSpan={4} style={{ width: '30px', padding: '10px', backgroundColor: '#f5f5f5', border: '1px solid #ccc', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                        {b1Index === 0 ? '1st Base ' : ''}{b1}
                      </th>
                    )}
                    {BASES.map(b2 => {
                      const codon = `${b1}${b2}${b3}`;
                      const aa = getAminoAcidForCodon(codon);
                      const isSelected = selectedAA.codons.includes(codon);
                      const bgColor = getColorForClass(aa.class as any);

                      return (
                        <td
                          key={b2}
                          style={{
                            border: '1px solid #ccc',
                            padding: '2px 8px',
                            backgroundColor: bgColor,
                            fontWeight: isSelected ? 'bold' : 'normal',
                            borderLeft: b2 === 'U' ? '2px solid #ccc' : '1px solid #ccc',
                            borderRight: b2 === 'G' ? '2px solid #ccc' : '1px solid #ccc',
                            borderTop: b3 === 'U' ? '2px solid #ccc' : '1px solid #ccc',
                            borderBottom: b3 === 'G' ? '2px solid #ccc' : '1px solid #ccc',
                            outline: isSelected ? '2px solid #000' : 'none',
                            outlineOffset: '-2px',
                            zIndex: isSelected ? 1 : 0,
                            position: 'relative'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                            <span style={{ fontFamily: 'monospace' }}>{codon}</span>
                            <span>{aa.code3}</span>
                          </div>
                        </td>
                      );
                    })}
                    <th style={{ width: '30px', padding: '5px', backgroundColor: '#f5f5f5', border: '1px solid #ccc' }}>{b3}</th>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '15px', height: '15px', backgroundColor: '#fff9c4', border: '1px solid #ccc' }}></div> Nonpolar
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '15px', height: '15px', backgroundColor: '#c8e6c9', border: '1px solid #ccc' }}></div> Polar
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '15px', height: '15px', backgroundColor: '#ffcdd2', border: '1px solid #ccc' }}></div> Acidic
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '15px', height: '15px', backgroundColor: '#bbdefb', border: '1px solid #ccc' }}></div> Basic
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '15px', height: '15px', backgroundColor: '#eeeeee', border: '1px solid #ccc' }}></div> Stop
        </div>
      </div>
    </div>
  );
};

export default CodonTable;
