import React from 'react';
import { Atom, Bond, AminoAcidClass } from '../services/ccp';

interface RendererSkeletalProps {
  atoms: Atom[];
  bonds: Bond[];
  aminoAcidClass?: AminoAcidClass;
  width?: number;
  height?: number;
}

const RendererSkeletal: React.FC<RendererSkeletalProps> = ({
  atoms,
  bonds,
  aminoAcidClass,
  width = 400,
  height = 400
}) => {
  if (!atoms || atoms.length === 0) {
    return <div>No atomic data available.</div>;
  }

  // Calculate bounding box for scaling/centering
  const xs = atoms.map(a => a.x);
  const ys = atoms.map(a => a.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const rangeX = (maxX - minX) || 1;
  const rangeY = (maxY - minY) || 1;

  const scale = Math.min((width - 80) / rangeX, (height - 80) / rangeY);

  const projectX = (x: number) => (x - minX) * scale + 40;
  const projectY = (y: number) => height - ((y - minY) * scale + 40);

  // Determine sidechain atoms (indices)
  // Usually atoms 0-4 are backbone: N, CA, C, O, OXT
  const sidechainAtomIndices = atoms.map((_, i) => i).filter(i => i > 4 || (i === 1 && atoms.length > 5));
  // Actually, for highlight we want to highlight the sidechain starting from CA (1)
  const highlightIndices = atoms.map((_, i) => i).filter(i => i >= 5 || i === 1);
  // Re-evaluating: the image highlights the sidechain. For Alanine, it's the methyl group and CA?
  // Looking at the image, the highlight covers the sidechain atoms and the CA atom.

  const getHighlightColor = (cls?: AminoAcidClass) => {
    switch (cls) {
      case 'Nonpolar': return 'rgba(255, 165, 0, 0.2)'; // Orange/Tan
      case 'Polar': return 'rgba(0, 0, 255, 0.1)';    // Blue
      case 'Acidic':
      case 'Basic': return 'rgba(0, 255, 0, 0.1)';   // Green
      default: return 'transparent';
    }
  };

  // Calculate bond counts and hydrogen labels for heteroatoms
  const getAtomLabel = (atomIndex: number) => {
    const atom = atoms[atomIndex];
    if (atom.element.toUpperCase() === 'C') return '';

    const valencyMap: Record<string, number> = { 'N': 3, 'O': 2, 'S': 2 };
    const targetValency = valencyMap[atom.element.toUpperCase()] || 0;

    let actualBonds = 0;
    bonds.forEach(b => {
      if (b.from === atomIndex || b.to === atomIndex) {
        actualBonds += b.order;
      }
    });

    const hCount = Math.max(0, targetValency - actualBonds);
    if (hCount === 0) return atom.element;
    if (hCount === 1) return `${atom.element}H`;
    return `${atom.element}H${hCount}`;
  };

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ background: '#fff' }}>
      {/* Sidechain Highlight */}
      {aminoAcidClass && highlightIndices.length > 0 && (
        <g>
          {highlightIndices.map(idx => (
            <circle
              key={`highlight-${idx}`}
              cx={projectX(atoms[idx].x)}
              cy={projectY(atoms[idx].y)}
              r={scale * 0.6}
              fill={getHighlightColor(aminoAcidClass)}
              stroke="none"
            />
          ))}
          {/* Also draw connections in highlight */}
          {bonds.map((bond, i) => {
            if (highlightIndices.includes(bond.from) && highlightIndices.includes(bond.to)) {
               return (
                <line
                  key={`highlight-bond-${i}`}
                  x1={projectX(atoms[bond.from].x)}
                  y1={projectY(atoms[bond.from].y)}
                  x2={projectX(atoms[bond.to].x)}
                  y2={projectY(atoms[bond.to].y)}
                  stroke={getHighlightColor(aminoAcidClass)}
                  strokeWidth={scale * 0.8}
                  strokeLinecap="round"
                />
               );
            }
            return null;
          })}
        </g>
      )}

      {/* Draw Bonds */}
      {bonds.map((bond, index) => {
        const atom1 = atoms[bond.from];
        const atom2 = atoms[bond.to];
        const x1 = projectX(atom1.x);
        const y1 = projectY(atom1.y);
        const x2 = projectX(atom2.x);
        const y2 = projectY(atom2.y);

        // Adjust endpoints if there is a label
        const label1 = getAtomLabel(bond.from);
        const label2 = getAtomLabel(bond.to);

        // Simple heuristic: shorten lines if they hit a label
        // We'll use a small offset
        const offset = 8;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.sqrt(dx * dx + dy * dy);

        const startX = label1 ? x1 + (dx / len) * offset : x1;
        const startY = label1 ? y1 + (dy / len) * offset : y1;
        const endX = label2 ? x2 - (dx / len) * offset : x2;
        const endY = label2 ? y2 - (dy / len) * offset : y2;

        if (bond.order === 1) {
          return (
            <line
              key={`bond-${index}`}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="#000"
              strokeWidth="2"
            />
          );
        } else if (bond.order === 2) {
          const offsetX = (-dy / len) * 3;
          const offsetY = (dx / len) * 3;

          return (
            <g key={`bond-${index}`}>
              <line
                x1={startX - offsetX}
                y1={startY - offsetY}
                x2={endX - offsetX}
                y2={endY - offsetY}
                stroke="#000"
                strokeWidth="1.5"
              />
              <line
                x1={startX + offsetX}
                y1={startY + offsetY}
                x2={endX + offsetX}
                y2={endY + offsetY}
                stroke="#000"
                strokeWidth="1.5"
              />
            </g>
          );
        }
        return null;
      })}

      {/* Draw Atom Labels (only heteroatoms) */}
      {atoms.map((atom, index) => {
        const label = getAtomLabel(index);
        if (!label) return null;

        const x = projectX(atom.x);
        const y = projectY(atom.y);

        return (
          <g key={`label-${index}`}>
            {/* Background for label */}
            <rect
              x={x - 12}
              y={y - 10}
              width={24}
              height={20}
              fill="white"
              stroke="none"
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="16"
              fontWeight="bold"
              fill="#000"
            >
              <tspan>{label.replace(/[0-9]/g, '')}</tspan>
              <tspan baselineShift="sub" fontSize="12">{label.replace(/[^0-9]/g, '')}</tspan>
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default RendererSkeletal;
