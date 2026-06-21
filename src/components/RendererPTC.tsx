import React, { useState } from 'react';

interface RendererPTCProps {
  aminoAcidName: string;
  width?: number;
  height?: number;
}

const RendererPTC: React.FC<RendererPTCProps> = ({ aminoAcidName, width = 600, height = 400 }) => {
  const [state, setState] = useState<'Before' | 'After'>('Before');

  const centerX = width / 2;
  const centerY = height / 2;

  // P-site positions (Left/Center)
  const posTRNA_P = { x: centerX - 150, y: centerY - 120 };
  const posC_P = { x: centerX - 150, y: centerY }; // Carbonyl carbon in P-site
  const posO_P = { x: centerX - 150, y: centerY + 60 }; // Carbonyl oxygen
  const posPeptide = { x: centerX - 250, y: centerY - 20 }; // Growing chain

  // A-site positions (Right)
  const posTRNA_A = { x: centerX + 150, y: centerY - 120 };
  const posC_A = { x: centerX + 150, y: centerY }; // Alpha carbon of A-site AA
  const posN_A = { x: centerX + 50, y: centerY }; // Amino nitrogen of A-site AA
  const posR_A = { x: centerX + 150, y: centerY + 80 }; // Sidechain of A-site AA
  const posO_A = { x: centerX + 150, y: centerY - 60 }; // Ester oxygen to tRNA-A

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '10px' }}>
        <button
          onClick={() => setState('Before')}
          style={{
            padding: '8px 16px',
            marginRight: '10px',
            backgroundColor: state === 'Before' ? '#4CAF50' : '#f1f1f1',
            color: state === 'Before' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Before Fusion
        </button>
        <button
          onClick={() => setState('After')}
          style={{
            padding: '8px 16px',
            backgroundColor: state === 'After' ? '#4CAF50' : '#f1f1f1',
            color: state === 'After' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          After Fusion
        </button>
      </div>

      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ background: '#fafafa', borderRadius: '12px', border: '1px solid #ddd' }}>
        {/* Labels for Sites */}
        <rect x={centerX - 280} y={20} width={250} height={40} rx={20} fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" />
        <text x={centerX - 155} y={45} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1565c0">P-Site (Peptidyl-tRNA)</text>

        <rect x={centerX + 30} y={20} width={250} height={40} rx={20} fill="#f3e5f5" stroke="#9c27b0" strokeWidth="2" />
        <text x={centerX + 155} y={45} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#7b1fa2">A-Site (Aminoacyl-tRNA)</text>

        {/* tRNA structures (Simplified) */}
        <g stroke="#ff9800" strokeWidth="3" fill="none">
          {/* P-tRNA */}
          <path d={`M ${posTRNA_P.x - 40} ${posTRNA_P.y} Q ${posTRNA_P.x} ${posTRNA_P.y - 60} ${posTRNA_P.x + 40} ${posTRNA_P.y} L ${posTRNA_P.x} ${posTRNA_P.y}`} />
          <text x={posTRNA_P.x} y={posTRNA_P.y - 15} textAnchor="middle" fontSize="14" fill="#e65100" stroke="none" fontWeight="bold">tRNA (P)</text>

          {/* A-tRNA */}
          <path d={`M ${posTRNA_A.x - 40} ${posTRNA_A.y} Q ${posTRNA_A.x} ${posTRNA_A.y - 60} ${posTRNA_A.x + 40} ${posTRNA_A.y} L ${posTRNA_A.x} ${posTRNA_A.y}`} />
          <text x={posTRNA_A.x} y={posTRNA_A.y - 15} textAnchor="middle" fontSize="14" fill="#e65100" stroke="none" fontWeight="bold">tRNA (A)</text>
        </g>

        {/* Connections and Reaction */}
        {state === 'Before' ? (
          <g>
            {/* P-site Peptidyl chain */}
            <line x1={posTRNA_P.x} y1={posTRNA_P.y} x2={posC_P.x} y2={posC_P.y - 20} stroke="#666" strokeWidth="2" />
            <text x={posC_P.x} y={posC_P.y} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#ff3333">C</text>
            <line x1={posC_P.x - 5} y1={posC_P.y + 12} x2={posO_P.x - 5} y2={posO_P.y - 12} stroke="#ff3333" strokeWidth="2" />
            <line x1={posC_P.x + 5} y1={posC_P.y + 12} x2={posO_P.x + 5} y2={posO_P.y - 12} stroke="#ff3333" strokeWidth="2" />
            <text x={posO_P.x} y={posO_P.y} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#ff3333">O</text>

            <line x1={posC_P.x - 18} y1={posC_P.y} x2={posPeptide.x + 50} y2={posPeptide.y + 10} stroke="#4caf50" strokeWidth="4" />
            <rect x={posPeptide.x - 20} y={posPeptide.y - 20} width={100} height={40} rx={5} fill="#c8e6c9" stroke="#4caf50" strokeWidth="2" />
            <text x={posPeptide.x + 30} y={posPeptide.y + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2e7d32" stroke="none">Peptide</text>

            {/* A-site Amino Acid */}
            <line x1={posTRNA_A.x} y1={posTRNA_A.y} x2={posO_A.x} y2={posO_A.y + 15} stroke="#666" strokeWidth="2" />
            <text x={posO_A.x} y={posO_A.y} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#ff3333">O</text>
            <line x1={posO_A.x} y1={posO_A.y + 15} x2={posC_A.x} y2={posC_A.y - 15} stroke="#666" strokeWidth="2" />
            <text x={posC_A.x} y={posC_A.y} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#000">C</text>
            <text x={posC_A.x + 12} y={posC_A.y + 12} fontSize="14" fill="#000">α</text>

            <line x1={posC_A.x} y1={posC_A.y + 15} x2={posR_A.x} y2={posR_A.y - 15} stroke="#9c27b0" strokeWidth="3" />
            <text x={posR_A.x} y={posR_A.y} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#9c27b0">{aminoAcidName === 'Glycine' ? 'H' : 'R'}</text>

            <line x1={posC_A.x - 15} y1={posC_A.y} x2={posN_A.x + 18} y2={posN_A.y} stroke="#000" strokeWidth="2" />
            <text x={posN_A.x} y={posN_A.y} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#3333ff">N</text>
            <text x={posN_A.x - 15} y={posN_A.y - 15} fontSize="18" fontWeight="bold" fill="#3333ff">H₂</text>

            {/* Nucleophilic Attack Arrow */}
            <path d={`M ${posN_A.x - 20} ${posN_A.y} Q ${centerX} ${centerY + 40}, ${posC_P.x + 25} ${posC_P.y + 10}`} fill="none" stroke="#f44336" strokeWidth="3" strokeDasharray="5,3" markerEnd="url(#arrow)" />
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orientation="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#f44336" />
              </marker>
            </defs>
            <text x={centerX} y={centerY + 60} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#f44336">Nucleophilic Attack</text>
          </g>
        ) : (
          <g>
            {/* P-site (Now deacylated tRNA) */}
            <text x={posTRNA_P.x} y={posTRNA_P.y + 60} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#666">Deacylated</text>
            <circle cx={posTRNA_P.x} cy={posTRNA_P.y + 30} r="10" fill="none" stroke="#666" strokeWidth="2" />
            <text x={posTRNA_P.x} y={posTRNA_P.y + 35} textAnchor="middle" fontSize="12" fill="#666">OH</text>

            {/* A-site (Now Peptidyl-tRNA, chain extended) */}
            <line x1={posTRNA_A.x} y1={posTRNA_A.y} x2={posO_A.x} y2={posO_A.y + 15} stroke="#666" strokeWidth="2" />
            <text x={posO_A.x} y={posO_A.y} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#ff3333">O</text>
            <line x1={posO_A.x} y1={posO_A.y + 15} x2={posC_A.x} y2={posC_A.y - 15} stroke="#666" strokeWidth="2" />
            <text x={posC_A.x} y={posC_A.y} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#000">C</text>
            <text x={posC_A.x + 12} y={posC_A.y + 12} fontSize="14" fill="#000">α</text>

            <line x1={posC_A.x} y1={posC_A.y + 15} x2={posR_A.x} y2={posR_A.y - 15} stroke="#9c27b0" strokeWidth="3" />
            <text x={posR_A.x} y={posR_A.y} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#9c27b0">{aminoAcidName === 'Glycine' ? 'H' : 'R'}</text>

            <line x1={posC_A.x - 15} y1={posC_A.y} x2={posN_A.x + 18} y2={posN_A.y} stroke="#000" strokeWidth="2" />
            <text x={posN_A.x} y={posN_A.y} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#3333ff">N</text>
            <text x={posN_A.x - 15} y={posN_A.y - 15} fontSize="18" fontWeight="bold" fill="#3333ff">H</text>

            {/* The NEW peptide bond */}
            <line x1={posN_A.x - 18} y1={posN_A.y} x2={posC_P.x + 18} y2={posC_P.y} stroke="#f44336" strokeWidth="5" />
            <text x={(posN_A.x + posC_P.x) / 2} y={posN_A.y - 15} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#f44336">Peptide Bond</text>

            {/* The P-site carbonyl and peptide chain, now attached to A-site N */}
            <text x={posC_P.x} y={posC_P.y} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#ff3333">C</text>
            <line x1={posC_P.x - 5} y1={posC_P.y + 12} x2={posO_P.x - 5} y2={posO_P.y - 12} stroke="#ff3333" strokeWidth="2" />
            <line x1={posC_P.x + 5} y1={posC_P.y + 12} x2={posO_P.x + 5} y2={posO_P.y - 12} stroke="#ff3333" strokeWidth="2" />
            <text x={posO_P.x} y={posO_P.y} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#ff3333">O</text>

            <line x1={posC_P.x - 18} y1={posC_P.y} x2={posPeptide.x + 50} y2={posPeptide.y + 10} stroke="#4caf50" strokeWidth="4" />
            <rect x={posPeptide.x - 20} y={posPeptide.y - 20} width={100} height={40} rx={5} fill="#c8e6c9" stroke="#4caf50" strokeWidth="2" />
            <text x={posPeptide.x + 30} y={posPeptide.y + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2e7d32" stroke="none">Peptide</text>
          </g>
        )}

        <text x={width - 10} y={height - 10} textAnchor="end" fontSize="10" fill="#999">PTC Model v1.0</text>
      </svg>

      <div style={{ marginTop: '15px', maxWidth: '600px', fontSize: '0.95rem', lineHeight: '1.5', color: '#444' }}>
        {state === 'Before' ? (
          <p>
            <strong>Before Fusion:</strong> The aminoacyl-tRNA (carrying {aminoAcidName}) is in the <strong>A-site</strong>.
            The peptidyl-tRNA (carrying the growing protein chain) is in the <strong>P-site</strong>.
            The amino group of the A-site tRNA is poised to attack the ester bond of the P-site tRNA.
          </p>
        ) : (
          <p>
            <strong>After Fusion:</strong> The peptide chain has been transferred from the P-site tRNA to the A-site tRNA.
            A new <strong>peptide bond</strong> (red) has formed. The P-site tRNA is now "deacylated" (empty) and will
            soon move to the E-site for exit.
          </p>
        )}
      </div>
    </div>
  );
};

export default RendererPTC;
