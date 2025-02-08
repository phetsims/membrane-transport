// Copyright 2025, University of Colorado Boulder

/**
 * Returns a Node for the given solute type.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Node, { NodeOptions } from '../../../../../scenery/js/nodes/Node.js';
import { ParticleType } from '../../model/SoluteType.js';
import { LigandANode, LigandBNode } from '../LigandNode.js';
import ATPNode from './ATPNode.js';
import CarbonDioxideNode from './CarbonDioxideNode.js';
import GlucoseNode from './GlucoseNode.js';
import OxygenNode from './OxygenNode.js';
import PotassiumIonNode from './PotassiumIonNode.js';
import SodiumIonNode from './SodiumIonNode.js';

const getParticleNode = ( particleType: ParticleType, options?: NodeOptions ): Node => {
  const particleNode = particleType === 'oxygen' ? new OxygenNode() :
                       particleType === 'carbonDioxide' ? new CarbonDioxideNode() :
                       particleType === 'sodiumIon' ? new SodiumIonNode() :
                       particleType === 'potassiumIon' ? new PotassiumIonNode() :
                       particleType === 'glucose' ? new GlucoseNode() :
                       particleType === 'ligandA' ? new LigandANode() :
                       particleType === 'ligandB' ? new LigandBNode() :
                       new ATPNode();

  options && particleNode.mutate( options );
  return particleNode;
};

export default getParticleNode;