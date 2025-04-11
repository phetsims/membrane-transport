// Copyright 2025, University of Colorado Boulder

/**
 * Returns a Node for the given solute type.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Image from '../../../../../scenery/js/nodes/Image.js';
import Node, { NodeOptions } from '../../../../../scenery/js/nodes/Node.js';
import adp_svg from '../../../../images/adp_svg.js';
import atp_svg from '../../../../images/atp_svg.js';
import carbonDioxide_svg from '../../../../images/carbonDioxide_svg.js';
import glucose_svg from '../../../../images/glucose_svg.js';
import oxygen_svg from '../../../../images/oxygen_svg.js';
import phosphate_svg from '../../../../images/phosphate_svg.js';
import potassiumIon_svg from '../../../../images/potassiumIon_svg.js';
import potassiumLigand_svg from '../../../../images/potassiumLigand_svg.js';
import sodiumIon_svg from '../../../../images/sodiumIon_svg.js';
import sodiumLigand_svg from '../../../../images/sodiumLigand_svg.js';
import { ParticleType } from '../../model/SoluteType.js';

const getParticleNode = ( particleType: ParticleType, options?: NodeOptions ): Node => {
  const particleNode = particleType === 'oxygen' ? new Image( oxygen_svg ) :
                       particleType === 'carbonDioxide' ? new Image( carbonDioxide_svg ) :
                       particleType === 'sodiumIon' ? new Image( sodiumIon_svg ) :
                       particleType === 'potassiumIon' ? new Image( potassiumIon_svg ) :
                       particleType === 'glucose' ? new Image( glucose_svg ) :
                       particleType === 'ligandA' ? new Image( sodiumLigand_svg, {
                                                    opacity: phet.chipper.queryParameters.dev ? 0.5 : 1
                                                  } ) :
                       particleType === 'ligandB' ? new Image( potassiumLigand_svg, {
                                                    opacity: phet.chipper.queryParameters.dev ? 0.5 : 1
                                                  } ) :
                       particleType === 'atp' ? new Image( atp_svg ) :
                       particleType === 'adp' ? new Image( adp_svg ) :
                       particleType === 'phosphate' ? new Image( phosphate_svg ) :

                         // throw error
                       ( () => { throw new Error( `Unrecognized particle type: ${particleType}` ); } )();

  options && particleNode.mutate( options );
  return particleNode;
};

export default getParticleNode;