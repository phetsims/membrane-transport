// Copyright 2025, University of Colorado Boulder

/**
 * Returns a Node for the given solute type.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { Node } from '../../../../../scenery/js/imports.js';
import SoluteType from '../../model/SoluteType.js';
import ATPNode from './ATPNode.js';
import CarbonDioxideNode from './CarbonDioxideNode.js';
import GlucoseNode from './GlucoseNode.js';
import OxygenNode from './OxygenNode.js';
import PotassiumIonNode from './PotassiumIonNode.js';
import SodiumIonNode from './SodiumIonNode.js';

const getSoluteNode = ( soluteType: SoluteType ): Node => {
  return soluteType === 'oxygen' ? new OxygenNode() :
         soluteType === 'carbonDioxide' ? new CarbonDioxideNode() :
         soluteType === 'sodiumIon' ? new SodiumIonNode() :
         soluteType === 'potassiumIon' ? new PotassiumIonNode() :
         soluteType === 'glucose' ? new GlucoseNode() :
         new ATPNode();
};

export default getSoluteNode;