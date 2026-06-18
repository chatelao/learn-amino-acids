import React from 'react';
import { Atom, Bond } from '../services/ccp';

interface RendererNotationProps {
  atoms: Atom[];
  bonds: Bond[];
  name: string;
  width?: number;
  height?: number;
}

const RendererNotation: React.FC<RendererNotationProps> = ({ atoms, bonds, name, width = 500, height = 400 }) => {
  // Fixed positions for the notation layout
  const cx = width / 2;
  const cy = height / 2 - 20; // Move up slightly to make room for bottom labels

  const posCA = { x: cx, y: cy };
  const posN = { x: cx - 100, y: cy + 10 };
  const posC = { x: cx + 80, y: cy + 15 };

  // Amine hydrogens
  const posH1 = { x: posN.x - 55, y: posN.y - 45 };
  const posH2 = { x: posN.x - 55, y: posN.y + 45 };
  const posH3 = { x: posN.x + 10, y: posN.y + 65 }; // dashed

  // Carboxyl group
  const posCO = { x: posC.x, y: posC.y + 65 };
  const posCOH = { x: posC.x + 75, y: posC.y - 35 };
  const posOH = { x: posCOH.x + 55, y: posCOH.y + 10 };

  // Sidechain position (R)
  const posR = { x: cx - 50, y: cy - 80 }; // wedged
  const posHA = { x: cx + 50, y: cy - 80 }; // dashed alpha-H

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ background: 'white' }}>
      {/* Brackets and Labels */}
      <g stroke="#000" strokeWidth="1.5" fill="none">
        {/* Variable R-group bracket */}
        <path d={`M ${cx - 70} ${cy - 110} Q ${cx - 70} ${cy - 130}, ${cx} ${cy - 130} Q ${cx + 70} ${cy - 130}, ${cx + 70} ${cy - 110}`} />
        <text x={cx} y={cy - 155} textAnchor="middle" fontSize="16" fill="#000" fontWeight="bold" stroke="none">variable</text>
        <text x={cx} y={cy - 140} textAnchor="middle" fontSize="16" fill="#000" fontWeight="bold" stroke="none">R-group</text>

        {/* Amine bracket */}
        <path d={`M ${posN.x - 80} ${cy + 100} Q ${posN.x - 80} ${cy + 115}, ${posN.x} ${cy + 115} Q ${posN.x + 80} ${cy + 115}, ${posN.x + 80} ${cy + 100}`} />
        <text x={posN.x} y={cy + 140} textAnchor="middle" fontSize="18" fill="#000" fontWeight="bold" stroke="none">amine</text>

        {/* Carboxylic acid bracket */}
        <path d={`M ${posC.x - 45} ${cy + 100} Q ${posC.x - 45} ${cy + 115}, ${posC.x + 75} ${cy + 115} Q ${posC.x + 195} ${cy + 115}, ${posC.x + 195} ${cy + 100}`} />
        <text x={posC.x + 75} y={cy + 140} textAnchor="middle" fontSize="18" fill="#000" fontWeight="bold" stroke="none">carboxylic acid</text>
      </g>

      {/* Amine Group (Blue) */}
      <g stroke="#3333ff" strokeWidth="2">
        <line x1={posCA.x} y1={posCA.y} x2={posN.x} y2={posN.y} stroke="#000" />
        <line x1={posN.x} y1={posN.y} x2={posH1.x + 5} y2={posH1.y + 5} />
        {/* Wedge for H2 */}
        <path d={`M ${posN.x} ${posN.y} L ${posH2.x - 6} ${posH2.y + 6} L ${posH2.x + 6} ${posH2.y - 6} Z`} fill="#3333ff" />
        <line x1={posN.x} y1={posN.y} x2={posH3.x} y2={posH3.y} strokeDasharray="5,3" />

        <circle cx={posN.x} cy={posN.y} r="18" fill="white" stroke="none" />
        <text x={posN.x} y={posN.y} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#3333ff" stroke="none">N</text>
        <text x={posN.x + 14} y={posN.y - 14} fontSize="16" fontWeight="bold" fill="#3333ff" stroke="none">+</text>

        <text x={posH1.x} y={posH1.y} textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="bold" fill="#3333ff" stroke="none">H</text>
        <text x={posH2.x} y={posH2.y} textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="bold" fill="#3333ff" stroke="none">H</text>
        <text x={posH3.x} y={posH3.y} textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="bold" fill="#3333ff" stroke="none">H</text>
      </g>

      {/* Carboxyl Group (Red) */}
      <g stroke="#ff3333" strokeWidth="2">
        <line x1={posCA.x} y1={posCA.y} x2={posC.x} y2={posC.y} stroke="#000" />
        {/* Double bond to O */}
        <line x1={posC.x - 5} y1={posC.y} x2={posCO.x - 5} y2={posCO.y} />
        <line x1={posC.x + 5} y1={posC.y} x2={posCO.x + 5} y2={posCO.y} />
        {/* Single bond to OH */}
        <line x1={posC.x} y1={posC.y} x2={posCOH.x} y2={posCOH.y} />
        <line x1={posCOH.x} y1={posCOH.y} x2={posOH.x - 12} y2={posOH.y} />

        <circle cx={posC.x} cy={posC.y} r="18" fill="white" stroke="none" />
        <text x={posC.x} y={posC.y} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#ff3333" stroke="none">C</text>

        <circle cx={posCO.x} cy={posCO.y} r="18" fill="white" stroke="none" />
        <text x={posCO.x} y={posCO.y} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#ff3333" stroke="none">O</text>
        {/* Lone pairs on O */}
        <circle cx={posCO.x - 16} cy={posCO.y} r="2.5" fill="#ff3333" stroke="none" />
        <circle cx={posCO.x - 16} cy={posCO.y + 10} r="2.5" fill="#ff3333" stroke="none" />
        <circle cx={posCO.x + 16} cy={posCO.y} r="2.5" fill="#ff3333" stroke="none" />
        <circle cx={posCO.x + 16} cy={posCO.y + 10} r="2.5" fill="#ff3333" stroke="none" />

        <circle cx={posCOH.x} cy={posCOH.y} r="18" fill="white" stroke="none" />
        <text x={posCOH.x} y={posCOH.y} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#ff3333" stroke="none">O</text>
        {/* Lone pairs on OH-O */}
        <circle cx={posCOH.x - 8} cy={posCOH.y - 16} r="2.5" fill="#ff3333" stroke="none" />
        <circle cx={posCOH.x + 8} cy={posCOH.y - 16} r="2.5" fill="#ff3333" stroke="none" />
        <circle cx={posCOH.x - 8} cy={posCOH.y + 16} r="2.5" fill="#ff3333" stroke="none" />
        <circle cx={posCOH.x + 8} cy={posCOH.y + 16} r="2.5" fill="#ff3333" stroke="none" />

        <text x={posOH.x} y={posOH.y} textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="bold" fill="#ff3333" stroke="none">H</text>
      </g>

      {/* Backbone Center */}
      <g>
        <line x1={posCA.x} y1={posCA.y} x2={posHA.x - 6} y2={posHA.y + 6} stroke="#000" strokeWidth="3" strokeDasharray="6,4" />

        <circle cx={posCA.x} cy={posCA.y} r="18" fill="white" stroke="none" />
        <text x={posCA.x} y={posCA.y} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#000" stroke="none">C</text>
        <text x={posCA.x + 14} y={posCA.y + 12} fontSize="16" fill="#000" stroke="none">α</text>

        <text x={posHA.x} y={posHA.y} textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="bold" fill="#000" stroke="none">H</text>
      </g>

      {/* Sidechain (R) */}
      <g stroke="#9c27b0" strokeWidth="2.5">
        {/* Wedge to R */}
        <path d={`M ${posCA.x} ${posCA.y} L ${posR.x - 6} ${posR.y + 6} L ${posR.x + 6} ${posR.y - 6} Z`} fill="#9c27b0" />

        {name === 'Glycine' ? (
           <text x={posR.x - 12} y={posR.y - 12} textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="bold" fill="#9c27b0" stroke="none">H</text>
        ) : (
           <text x={posR.x - 12} y={posR.y - 12} textAnchor="middle" dominantBaseline="central" fontSize="28" fontWeight="bold" fill="#9c27b0" stroke="none">R</text>
        )}
      </g>
    </svg>
  );
};

export default RendererNotation;
