// Copyright 2025, University of Colorado Boulder

/**
 * Returns a Node for the given solute type.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Image, { ImageOptions } from '../../../../../scenery/js/nodes/Image.js';
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

export default function createParticleNode( particleType: ParticleType, options?: ImageOptions ): Image {
  const particleNode = particleType === 'oxygen' ? new Image( oxygen_svg, options ) :
                       particleType === 'carbonDioxide' ? new Image( carbonDioxide_svg, options ) :
                       particleType === 'sodiumIon' ? new Image( sodiumIon_svg, options ) :
                       particleType === 'potassiumIon' ? new Image( potassiumIon_svg, options ) :
                       particleType === 'glucose' ? new Image( glucose_svg, options ) :
                       particleType === 'triangleLigand' ? new Image( sodiumLigand_svg, options ) :
                       particleType === 'starLigand' ? new Image( potassiumLigand_svg, options ) :
                       particleType === 'atp' ? new Image( atp_svg, options ) :
                       particleType === 'adp' ? new Image( adp_svg, options ) :
                       particleType === 'phosphate' ? new Image( phosphate_svg, options ) : // Rotated 20 degrees when bound

                         // throw error
                       ( () => { throw new Error( `Unrecognized particle type: ${particleType}` ); } )();

  options && particleNode.mutate( options );
  return particleNode;
}