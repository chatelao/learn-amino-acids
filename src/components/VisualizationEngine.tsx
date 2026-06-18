import React from 'react';
import { Atom, Bond, AminoAcidClass } from '../services/ccp';
import Renderer2D from './Renderer2D';
import Renderer3D from './Renderer3D';
import RendererSkeletal from './RendererSkeletal';
import RendererNotation from './RendererNotation';

export type VisualizationMode = '2D' | 'Skeletal' | 'Notation' | 'Stick' | 'Ball';

interface VisualizationEngineProps {
  atoms: Atom[];
  bonds: Bond[];
  mode: VisualizationMode;
  aminoAcidName?: string;
  aminoAcidClass?: AminoAcidClass;
  width?: number;
  height?: number;
}

const VisualizationEngine: React.FC<VisualizationEngineProps> = ({
  atoms,
  bonds,
  mode,
  aminoAcidName = '',
  aminoAcidClass,
  width = 400,
  height = 400
}) => {
  switch (mode) {
    case '2D':
      return <Renderer2D atoms={atoms} bonds={bonds} width={width} height={height} />;
    case 'Skeletal':
      return <RendererSkeletal atoms={atoms} bonds={bonds} aminoAcidClass={aminoAcidClass} width={width} height={height} />;
    case 'Notation':
      return <RendererNotation atoms={atoms} bonds={bonds} name={aminoAcidName} width={width} height={height} />;
    case 'Stick':
    case 'Ball':
      return <Renderer3D atoms={atoms} bonds={bonds} mode={mode} width={width} height={height} />;
    default:
      return <div>Unknown visualization mode.</div>;
  }
};

export default VisualizationEngine;
