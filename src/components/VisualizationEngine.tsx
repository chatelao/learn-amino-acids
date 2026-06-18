import React from 'react';
import { Atom, Bond } from '../services/ccp';
import Renderer2D from './Renderer2D';
import Renderer3D from './Renderer3D';

export type VisualizationMode = '2D' | 'Stick' | 'Ball';

interface VisualizationEngineProps {
  atoms: Atom[];
  bonds: Bond[];
  mode: VisualizationMode;
  width?: number;
  height?: number;
}

const VisualizationEngine: React.FC<VisualizationEngineProps> = ({ atoms, bonds, mode, width = 400, height = 400 }) => {
  switch (mode) {
    case '2D':
      return <Renderer2D atoms={atoms} bonds={bonds} width={width} height={height} />;
    case 'Stick':
    case 'Ball':
      return <Renderer3D atoms={atoms} bonds={bonds} mode={mode} width={width} height={height} />;
    default:
      return <div>Unknown visualization mode.</div>;
  }
};

export default VisualizationEngine;
