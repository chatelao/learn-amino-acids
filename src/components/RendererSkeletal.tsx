import React from 'react';
import { Atom, AminoAcidClass } from '../services/ccp';

interface RendererSkeletalProps {
  atoms: Atom[];
  aminoAcidClass?: AminoAcidClass;
  width?: number;
  height?: number;
}

const RendererSkeletal: React.FC<RendererSkeletalProps> = ({
  atoms,
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

  const scale = Math.min((width - 100) / rangeX, (height - 100) / rangeY);

  const projectX = (x: number) => (x - minX) * scale + 50;
  const projectY = (y: number) => height - ((y - minY) * scale + 50);

  // Find bonds based on distance
  const bonds: [number, number][] = [];
  const BOND_THRESHOLD = 1.9;
  const adjacency: number[][] = Array(atoms.length).fill(0).map(() => []);

  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      const dx = atoms[i].x - atoms[j].x;
      const dy = atoms[i].y - atoms[j].y;
      const dz = atoms[i].z - atoms[j].z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < BOND_THRESHOLD) {
        bonds.push([i, j]);
        adjacency[i].push(j);
        adjacency[j].push(i);
      }
    }
  }

  // Determine if a bond is a double bond
  const isDoubleBond = (i: number, j: number) => {
    // Backbone carbonyl
    if ((i === 2 && j === 3) || (i === 3 && j === 2)) return true;

    const checkSidechain = (cIdx: number, oIdx: number) => {
        if (atoms[cIdx].element === 'C' && (atoms[oIdx].element === 'O' || atoms[oIdx].element === 'N') && adjacency[oIdx].length === 1 && cIdx >= 5) {
            // Check if this carbon is part of a carboxyl, amide, or guanidinium group
            const electronegativeNeighbors = adjacency[cIdx].filter(nIdx =>
                (atoms[nIdx].element === 'O' || atoms[nIdx].element === 'N') &&
                adjacency[nIdx].length === 1
            );
            // If it has multiple terminal O/N, one of them is a double bond.
            // We'll pick the first O, or if no O, the first N.
            if (electronegativeNeighbors.length >= 2) {
                const targetIdx = electronegativeNeighbors.find(n => atoms[n].element === 'O') ?? electronegativeNeighbors[0];
                return targetIdx === oIdx;
            }
        }
        return false;
    };

    return checkSidechain(i, j) || checkSidechain(j, i);
  };

  const getLabel = (atom: Atom, index: number) => {
    if (atom.element === 'C') return '';

    if (index === 0 && atom.element === 'N') return 'NH₂';
    if (index === 3 && atom.element === 'O') return 'O';
    if (index === 4 && atom.element === 'O') return 'OH';

    const neighbors = adjacency[index];
    const bondCount = neighbors.length;

    if (atom.element === 'N') {
      if (bondCount === 1) return 'NH₂';
      if (bondCount === 2) return 'NH';
      return 'N';
    }
    if (atom.element === 'O') {
      if (bondCount === 1) return 'OH';
      return 'O';
    }
    if (atom.element === 'S') {
      if (bondCount === 1) return 'HS';
      return 'S';
    }
    if (atom.element === 'Se') {
        if (bondCount === 1) return 'HSe';
        return 'Se';
    }

    return atom.element;
  };

  const getHighlightBaseColor = () => {
    switch (aminoAcidClass) {
      case 'Nonpolar': return '#ffa500';
      case 'Polar': return '#0064ff';
      case 'Acidic':
      case 'Basic': return '#00c800';
      default: return 'transparent';
    }
  };

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ background: '#fff' }}>
      {/* Sidechain Highlight */}
      {aminoAcidClass && (
        <g opacity="0.15">
          {bonds.map(([i, j], index) => {
            // Sidechain bonds: any bond involving atoms from index 5 onwards,
            // OR the CA-CB bond (1-5 typically, but let's be more general: any bond where at least one atom is >= 5 and neither is backbone O/N (0,3,4) or backbone C(2))
            // Actually CA is index 1. CB is index 5.
            const isBackbone = (idx: number) => [0, 2, 3, 4].includes(idx);
            if (!isBackbone(i) && !isBackbone(j) && (i >= 5 || j >= 5 || (i === 1 && j >= 5) || (j === 1 && i >= 5))) {
                return (
                    <line
                      key={`highlight-${index}`}
                      x1={projectX(atoms[i].x)}
                      y1={projectY(atoms[i].y)}
                      x2={projectX(atoms[j].x)}
                      y2={projectY(atoms[j].y)}
                      stroke={getHighlightBaseColor()}
                      strokeWidth="35"
                      strokeLinecap="round"
                    />
                );
            }
            return null;
          })}
        </g>
      )}

      {/* Draw Bonds */}
      {bonds.map(([i, j], index) => {
        const x1 = projectX(atoms[i].x);
        const y1 = projectY(atoms[i].y);
        const x2 = projectX(atoms[j].x);
        const y2 = projectY(atoms[j].y);

        if (isDoubleBond(i, j)) {
          const dx = x2 - x1;
          const dy = y2 - y1;
          const len = Math.sqrt(dx * dx + dy * dy);
          const nx = -dy / len * 3;
          const ny = dx / len * 3;

          return (
            <g key={`bond-${index}`}>
              <line x1={x1 + nx} y1={y1 + ny} x2={x2 + nx} y2={y2 + ny} stroke="#000" strokeWidth="2" />
              <line x1={x1 - nx} y1={y1 - ny} x2={x2 - nx} y2={y2 - ny} stroke="#000" strokeWidth="2" />
            </g>
          );
        }

        return (
          <line
            key={`bond-${index}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#000"
            strokeWidth="2"
          />
        );
      })}

      {/* Draw Atom Labels */}
      {atoms.map((atom, index) => {
        const label = getLabel(atom, index);
        if (!label) return null;

        const x = projectX(atom.x);
        const y = projectY(atom.y);

        // Estimate label width
        const labelWidth = label.length * 9 + 4;

        return (
          <g key={`atom-${index}`}>
            <rect
              x={x - labelWidth / 2}
              y={y - 10}
              width={labelWidth}
              height={20}
              fill="#fff"
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="14"
              fontWeight="normal"
              fill="#000"
              fontFamily="Arial, sans-serif"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default RendererSkeletal;
