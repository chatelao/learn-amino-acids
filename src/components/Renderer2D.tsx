import React from 'react';
import { Atom, Bond } from '../services/ccp';

interface Renderer2DProps {
  atoms: Atom[];
  bonds: Bond[];
  width?: number;
  height?: number;
}

const Renderer2D: React.FC<Renderer2DProps> = ({ atoms, bonds, width = 400, height = 400 }) => {
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

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ background: '#f0f0f0' }}>
      <defs>
        <radialGradient id="lowPHGradient">
          <stop offset="10%" stopColor="#ffcdd2" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffcdd2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="highPHGradient">
          <stop offset="10%" stopColor="#c8e6c9" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#c8e6c9" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* pH Areas */}
      <circle
        cx={projectX(atoms[0].x)}
        cy={projectY(atoms[0].y)}
        r="40"
        fill="url(#lowPHGradient)"
      />
      <text
        x={projectX(atoms[0].x)}
        y={projectY(atoms[0].y) - 25}
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill="#c62828"
      >
        pH 2.0 (+)
      </text>

      {atoms[2] && (
        <>
          <circle
            cx={projectX(atoms[2].x)}
            cy={projectY(atoms[2].y)}
            r="40"
            fill="url(#highPHGradient)"
          />
          <text
            x={projectX(atoms[2].x)}
            y={projectY(atoms[2].y) + 35}
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="#2e7d32"
          >
            pH 12.0 (-)
          </text>
        </>
      )}

      {/* Draw Bonds */}
      {bonds.map((bond, index) => {
        const atom1 = atoms[bond.from];
        const atom2 = atoms[bond.to];
        const x1 = projectX(atom1.x);
        const y1 = projectY(atom1.y);
        const x2 = projectX(atom2.x);
        const y2 = projectY(atom2.y);

        if (bond.order === 1) {
          return (
            <line
              key={`bond-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#333"
              strokeWidth="3"
            />
          );
        } else if (bond.order === 2) {
          const dx = x2 - x1;
          const dy = y2 - y1;
          const len = Math.sqrt(dx * dx + dy * dy);
          const offsetX = (-dy / len) * 4;
          const offsetY = (dx / len) * 4;

          return (
            <g key={`bond-${index}`}>
              <line
                x1={x1 - offsetX}
                y1={y1 - offsetY}
                x2={x2 - offsetX}
                y2={y2 - offsetY}
                stroke="#333"
                strokeWidth="2"
              />
              <line
                x1={x1 + offsetX}
                y1={y1 + offsetY}
                x2={x2 + offsetX}
                y2={y2 + offsetY}
                stroke="#333"
                strokeWidth="2"
              />
            </g>
          );
        }
        return null;
      })}

      {/* Draw Atoms */}
      {atoms.map((atom, index) => (
        <g key={`atom-${index}`}>
          <circle
            cx={projectX(atom.x)}
            cy={projectY(atom.y)}
            r="10"
            fill={getElementColor(atom.element)}
            stroke="#000"
            strokeWidth="1"
          />
          <text
            x={projectX(atom.x)}
            y={projectY(atom.y)}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="10"
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
