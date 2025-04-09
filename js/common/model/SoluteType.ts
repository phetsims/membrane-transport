// Copyright 2025, University of Colorado Boulder
import LocalizedStringProperty from '../../../../chipper/js/browser/LocalizedStringProperty.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import ProfileColorProperty from '../../../../scenery/js/util/ProfileColorProperty.js';
import MembraneTransportColors from '../../common/MembraneTransportColors.js';
import MembraneTransportStrings from '../../MembraneTransportStrings.js';
// We use the view dimensions to determine the model aspect ratio, in order to avoid having to duplicate/repeat that dimension.
// eslint-disable-next-line phet/no-view-imported-from-model
import getParticleNode from '../view/particles/getParticleNode.js';

/**
 * The types of solutes that can be selected or depicted in the simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export const SoluteTypes = [ 'oxygen', 'carbonDioxide', 'sodiumIon', 'potassiumIon', 'glucose', 'atp', 'adp', 'phosphate' ] as const;
export const LigandTypes = [ 'ligandA', 'ligandB' ] as const;
export const ParticleTypes = [ ...SoluteTypes, ...LigandTypes ] as const;

type SoluteType = typeof SoluteTypes[number];
export default SoluteType;

export type PlottableSoluteTypes = Exclude<SoluteType, 'atp' | 'adp' | 'phosphate'>;

type LigandType = typeof LigandTypes[number];
type ParticleType = typeof ParticleTypes[number];

export type { LigandType, ParticleType };

export const getSoluteTypeString = ( soluteType: SoluteType ): LocalizedStringProperty =>

  soluteType === 'oxygen' ? MembraneTransportStrings.oxygenStringProperty :
  soluteType === 'carbonDioxide' ? MembraneTransportStrings.carbonDioxideStringProperty :
  soluteType === 'sodiumIon' ? MembraneTransportStrings.sodiumIonStringProperty :
  soluteType === 'potassiumIon' ? MembraneTransportStrings.potassiumIonStringProperty :
  soluteType === 'glucose' ? MembraneTransportStrings.glucoseStringProperty :
  MembraneTransportStrings.atpStringProperty;

export const getSoluteBarChartColorProperty = ( soluteType: PlottableSoluteTypes ): ProfileColorProperty =>
  soluteType === 'oxygen' ? MembraneTransportColors.oxygenColorProperty :
  soluteType === 'carbonDioxide' ? MembraneTransportColors.carbonDioxideColorProperty :
  soluteType === 'sodiumIon' ? MembraneTransportColors.sodiumIonColorProperty :
  soluteType === 'potassiumIon' ? MembraneTransportColors.potassiumIonColorProperty :
  MembraneTransportColors.glucoseColorProperty;

const oxygenModelSize = 3;

// Only access images after loading complete
let carbonDioxideViewWidth: number | null = null;
let oxygenViewWidth: number | null = null;

const getCarbonDioxideViewWidth = (): number => {
  if ( carbonDioxideViewWidth === null ) {
    const carbonDioxideNode = getParticleNode( 'carbonDioxide' );
    affirm( typeof carbonDioxideNode.bounds.width === 'number', 'carbonDioxideViewWidth should be a number' );
    affirm( !isNaN( carbonDioxideNode.bounds.width ), 'carbonDioxideViewWidth should not be NaN' );
    affirm( carbonDioxideNode.bounds.width > 0, 'carbonDioxideViewWidth should be positive' );
    carbonDioxideViewWidth = carbonDioxideNode.bounds.width;
  }

  return carbonDioxideViewWidth;
};

const getOxygenViewWidth = (): number => {
  if ( oxygenViewWidth === null ) {
    const oxygenNode = getParticleNode( 'oxygen' );
    affirm( typeof oxygenNode.bounds.width === 'number', 'carbonDioxideViewWidth should be a number' );
    affirm( !isNaN( oxygenNode.bounds.width ), 'carbonDioxideViewWidth should not be NaN' );
    affirm( oxygenNode.bounds.width > 0, 'carbonDioxideViewWidth should be positive' );
    oxygenViewWidth = oxygenNode.bounds.width;
  }
  return oxygenViewWidth;
};

export const getParticleModelWidth = ( particleType: ParticleType ): number =>

  // Since oxygen and carbon dioxide share the O atom, we need to make sure the O atoms have the same size in both.
  particleType === 'oxygen' ? oxygenModelSize :

  // TODO: Consider hard coding the dimension of the co2 so we don't need to do view lookups? Or is there a better way? April 9
    // Cache them, but not until the sim has started up, and we have good bounds.
  particleType === 'carbonDioxide' ? oxygenModelSize * getCarbonDioxideViewWidth() / getOxygenViewWidth() :

  particleType === 'sodiumIon' ? 4 :
  particleType === 'potassiumIon' ? 6 :
  particleType === 'glucose' ? 10 :
  particleType === 'ligandA' ? 10 :
  particleType === 'ligandB' ? 10 :
  10;

export const getSoluteBarChartTandemName = ( soluteType: PlottableSoluteTypes ): string =>
  `${soluteType}BarChart`;

export const soluteTypeToRadioButtonTandemName = ( soluteType: SoluteType ): string => `${soluteType}RadioButton`;

export const getSoluteSpinnerTandemName = ( soluteType: SoluteType ): string => `${soluteType}Spinner`;

export const getSoluteAccessibleName = ( soluteType: SoluteType ): string => {
  return soluteType === 'oxygen' ? 'Oxygen, O2, nonpolar, small' :
         soluteType === 'carbonDioxide' ? 'Carbon Dioxide, CO2, nonpolar, small' :
         soluteType === 'sodiumIon' ? 'Sodium Ion, Na, positive, small' :
         soluteType === 'potassiumIon' ? 'Potassium Ion, K, positive, small' :
         soluteType === 'glucose' ? 'Glucose, hexagonal ring, large' :
         'Adenosine Triphosphate, ATP, complex, large';
};