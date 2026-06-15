import React, { useState, useMemo, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { ccp, AminoAcidClass } from './services/ccp'
import VisualizationEngine from './components/VisualizationEngine'

const App = () => {
  const [selectedClass, setSelectedClass] = useState<AminoAcidClass | 'All'>('All');
  const [codonSearch, setCodonSearch] = useState('');

  const filteredAminoAcids = useMemo(() => {
    if (selectedClass === 'All') return ccp.getAllAminoAcids();
    return ccp.getAminoAcidsByClass(selectedClass);
  }, [selectedClass]);

  const [selectedCode3, setSelectedCode3] = useState(filteredAminoAcids[0]?.code3 || '');

  // Reset selection if the current one is not in the filtered list
  useEffect(() => {
    if (!filteredAminoAcids.find(aa => aa.code3 === selectedCode3)) {
      setSelectedCode3(filteredAminoAcids[0]?.code3 || '');
    }
  }, [filteredAminoAcids, selectedCode3]);

  const selectedAA = ccp.getAminoAcidByCode3(selectedCode3);

  const handleCodonSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setCodonSearch(val);
    if (val.length === 3) {
      const results = ccp.getAminoAcidsByCodon(val);
      if (results.length > 0) {
        setSelectedCode3(results[0].code3);
        setSelectedClass('All'); // Switch to 'All' to ensure the result is visible in the list
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid #eee', marginBottom: '20px', paddingBottom: '10px' }}>
        <h1>Amino Acid Curriculum</h1>
      </header>

      <main>
        <section style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label htmlFor="class-filter" style={{ fontWeight: 'bold' }}>Filter by Class:</label>
            <select
              id="class-filter"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value as AminoAcidClass | 'All')}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="All">All Classes</option>
              <option value="Nonpolar">Nonpolar</option>
              <option value="Polar">Polar</option>
              <option value="Acidic">Acidic</option>
              <option value="Basic">Basic</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label htmlFor="aa-select" style={{ fontWeight: 'bold' }}>Select Amino Acid:</label>
            <select
              id="aa-select"
              value={selectedCode3}
              onChange={(e) => setSelectedCode3(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              {filteredAminoAcids.map(aa => (
                <option key={aa.code3} value={aa.code3}>
                  {aa.name} ({aa.code3})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label htmlFor="codon-search" style={{ fontWeight: 'bold' }}>Search by Codon:</label>
            <input
              id="codon-search"
              type="text"
              placeholder="e.g. GCU"
              value={codonSearch}
              onChange={handleCodonSearch}
              maxLength={3}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100px' }}
            />
          </div>
        </section>

        {selectedAA ? (
          <article>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ margin: '0 0 10px 0' }}>{selectedAA.name} ({selectedAA.code3} / {selectedAA.code1})</h2>
              <div style={{ display: 'flex', gap: '40px' }}>
                <p><strong>Chemical Class:</strong> <span style={{ padding: '4px 8px', backgroundColor: '#e0f7fa', borderRadius: '4px' }}>{selectedAA.class}</span></p>
                <p><strong>mRNA Codons:</strong> {selectedAA.codons.map(c => <code key={c} style={{ marginLeft: '5px', padding: '2px 4px', backgroundColor: '#eee', borderRadius: '3px' }}>{c}</code>)}</p>
              </div>
            </div>

            {selectedAA.atoms.length === 0 && (
              <div style={{ color: '#d32f2f', backgroundColor: '#ffebee', padding: '15px', borderRadius: '4px', marginBottom: '20px', border: '1px solid #ef9a9a' }}>
                <strong>Note:</strong> 3D structural data (atomic coordinates) for {selectedAA.name} is not yet available in the data repository.
              </div>
            )}

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '20px'
            }}>
              <section style={{ border: '1px solid #eee', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
                <h3 style={{ marginTop: 0 }}>2D Structure</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <VisualizationEngine atoms={selectedAA.atoms} mode="2D" />
                </div>
              </section>
              <section style={{ border: '1px solid #eee', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
                <h3 style={{ marginTop: 0 }}>Stick Model (3D)</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <VisualizationEngine atoms={selectedAA.atoms} mode="Stick" />
                </div>
              </section>
              <section style={{ border: '1px solid #eee', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
                <h3 style={{ marginTop: 0 }}>Ball & Stick Model (3D)</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <VisualizationEngine atoms={selectedAA.atoms} mode="Ball" />
                </div>
              </section>
            </div>
          </article>
        ) : (
          <p>Please select an amino acid to explore its details.</p>
        )}
      </main>

      <footer style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee', fontSize: '0.9rem', color: '#666' }}>
        <p>© 2026 Amino Acid Learning Curriculum. Built with React and Three.js.</p>
      </footer>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
