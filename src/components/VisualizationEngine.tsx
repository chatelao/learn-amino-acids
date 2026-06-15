import React from 'react';
import { Atom } from '../services/ccp';
import Renderer2D from './Renderer2D';

export type VisualizationMode = '2D' | 'Stick' | 'Ball';

interface VisualizationEngineProps {
  atoms: Atom[];
  mode: VisualizationMode;
  width?: number;
  height?: number;
}

const VisualizationEngine: React.FC<VisualizationEngineProps> = ({ atoms, mode, width = 400, height = 400 }) => {
  switch (mode) {
    case '2D':
      return <Renderer2D atoms={atoms} width={width} height={height} />;
    case 'Stick':
    case 'Ball':
      return (
        <div style={{ width, height, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          3D Rendering ({mode}) not yet implemented.
        </div>
      );
    default:
      return <div>Unknown visualization mode.</div>;
  }
};

export default VisualizationEngine;
