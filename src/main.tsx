import React from 'react'
import ReactDOM from 'react-dom/client'
import { ccp } from './services/ccp'
import VisualizationEngine from './components/VisualizationEngine'

const ala = ccp.getAminoAcidByCode3('Ala');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Amino Acid Curriculum</h1>
      {ala ? (
        <div>
          <h2>{ala.name} ({ala.code3})</h2>
          <p>Class: {ala.class}</p>
          <p>Codons: {ala.codons.join(', ')}</p>
          <VisualizationEngine atoms={ala.atoms} mode="2D" />
        </div>
      ) : (
        <p>Loading amino acid data...</p>
      )}
    </div>
  </React.StrictMode>,
)
