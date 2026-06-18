import React from 'react';
import { Atom } from '../services/ccp';

interface Renderer2DProps {
  atoms: Atom[];
  width?: number;
  height?: number;
}

const Renderer2D: React.FC<Renderer2DProps> = ({ atoms, width = 400, height = 400 }) => {
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

  const padding = 2;
  const rangeX = (maxX - minX) || 1;
  const rangeY = (maxY - minY) || 1;

  const scale = Math.min((width - 40) / rangeX, (height - 40) / rangeY);

  const projectX = (x: number) => (x - minX) * scale + 20;
  const projectY = (y: number) => height - ((y - minY) * scale + 20);

  // Helper to get element color
  const getElementColor = (element: string) => {
    switch (element.toUpperCase()) {
      case 'C': return '#888888';
      case 'N': return '#3333ff';
      case 'O': return '#ff3333';
      case 'S': return '#ffff33';
      case 'H': return '#ffffff';
      default: return '#cccccc';
    }
  };

  // Find bonds based on distance
  const bonds: [number, number][] = [];
  const BOND_THRESHOLD = 1.9; // Typical bond length is < 1.6, but we add some margin
  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      const dx = atoms[i].x - atoms[j].x;
      const dy = atoms[i].y - atoms[j].y;
      const dz = atoms[i].z - atoms[j].z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < BOND_THRESHOLD) {
        bonds.push([i, j]);
      }
    }
  }

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ background: '#f0f0f0' }}>
      {/* Draw Bonds */}
      {bonds.map(([i, j], index) => (
        <line
          key={`bond-${index}`}
          x1={projectX(atoms[i].x)}
          y1={projectY(atoms[i].y)}
          x2={projectX(atoms[j].x)}
          y2={projectY(atoms[j].y)}
          stroke="#333"
          strokeWidth="3"
        />
      ))}

      {/* Draw Atoms */}
      {atoms.map((atom, index) => (
        <g key={`atom-${index}`}>
          <circle
            cx={projectX(atom.x)}
            cy={projectY(atom.y)}
            r={atom.element.toUpperCase() === 'H' ? "6" : "10"}
            fill={getElementColor(atom.element)}
            stroke="#000"
            strokeWidth="1"
          />
          <text
            x={projectX(atom.x)}
            y={projectY(atom.y)}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={atom.element.toUpperCase() === 'H' ? "6" : "10"}
            fontWeight="bold"
            fill={atom.element.toUpperCase() === 'C' || atom.element.toUpperCase() === 'N' ? '#fff' : '#000'}
          >
            {atom.element}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default Renderer2D;
