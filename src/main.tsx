import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { ccp } from './services/ccp'
import VisualizationEngine from './components/VisualizationEngine'

const App = () => {
  const allAminoAcids = ccp.getAllAminoAcids();
  const [selectedCode3, setSelectedCode3] = useState(allAminoAcids[0]?.code3 || '');

  const selectedAA = ccp.getAminoAcidByCode3(selectedCode3);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Amino Acid Curriculum</h1>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="aa-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>
          Select Amino Acid:
        </label>
        <select
          id="aa-select"
          value={selectedCode3}
          onChange={(e) => setSelectedCode3(e.target.value)}
          style={{ padding: '5px', fontSize: '16px' }}
        >
          {allAminoAcids.map(aa => (
            <option key={aa.code3} value={aa.code3}>
              {aa.name} ({aa.code3})
            </option>
          ))}
        </select>
      </div>

      {selectedAA ? (
        <div>
          <h2>{selectedAA.name} ({selectedAA.code3})</h2>
          <p><strong>Class:</strong> {selectedAA.class}</p>
          <p><strong>Codons:</strong> {selectedAA.codons.join(', ')}</p>

          {selectedAA.atoms.length === 0 && (
            <p style={{ color: '#d32f2f', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px' }}>
              No structural data available for this amino acid yet.
            </p>
          )}

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <h3>2D Model</h3>
              <VisualizationEngine atoms={selectedAA.atoms} mode="2D" />
            </div>
            <div>
              <h3>Stick Model</h3>
              <VisualizationEngine atoms={selectedAA.atoms} mode="Stick" />
            </div>
            <div>
              <h3>Ball Model</h3>
              <VisualizationEngine atoms={selectedAA.atoms} mode="Ball" />
            </div>
          </div>
        </div>
      ) : (
        <p>Select an amino acid to see details.</p>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
