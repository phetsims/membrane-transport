// Copyright 2025, University of Colorado Boulder

import Shape from '../../../../../kite/js/Shape.js';
import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Path from '../../../../../scenery/js/nodes/Path.js';
import membraneChannels from '../../../membraneChannels.js';

/**
 * Uses canvas to render a leakage channel, for a Node that can be dragged out of the toolbox and dropped into specific slots
 * in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

// Paths are designed in https://yqnn.github.io/svg-path-editor/
// Left side of sodium voltage gated
const closedNegative70 = 'M 4.591 9.561 Q 5.953 9.15 6.698 9.536 Q 7.777 9.613 8.419 9.176 Q 9.318 9.048 9.446 9.87 Q 9.601 10.717 9.061 11.077 Q 8.213 11.617 7.237 11.848 Q 6.21 12.002 5.182 11.514 Q 4.746 11.308 4.514 10.974 Q 4.18 10.64 4.309 10.255 Q 4.335 9.87 4.591 9.587 Q 4.309 10.2295 4.309 10.204 Z M 10.414 9.28 L 10.612 9.244 Q 11.638 9.505 12.664 9.766 Q 13.348 9.784 14.032 9.802 Q 14.527 9.838 15.022 9.874 Q 15.112 10.189 15.202 10.504 Q 14.977 10.936 14.752 11.368 Q 14.275 11.656 13.798 11.944 Q 12.925 11.962 12.052 11.98 Q 11.422 11.818 10.792 11.656 Q 10.333 11.323 9.874 10.99 Q 9.865 10.387 9.856 9.784 Z M 12.807 12.838 L 12.597 13.064 C 12.031 13.513 11.389 12.77 10.883 12.298 Q 10.697 11.994 10.849 11.488 Q 11.254 9.901 10.613 8.517 C 8.634 6.311 10.117 6.526 10.094 5.138 Q 10.165 4.564 10.005 3.116 L 10.174 2.576 Q 12.031 -0.293 13.82 3.352 Q 14.799 7.133 12.908 12.568 L 12.807 12.838 M 6.193 12.838 C 6.969 13.513 7.611 12.77 8.117 12.298 Q 8.303 11.994 8.151 11.488 Q 7.746 9.901 8.387 8.517 C 10.046 7.077 9.399 6.478 9.304 5.952 Q 8.927 5.31 8.995 3.116 L 8.826 2.576 Q 6.969 -0.293 5.18 3.352 Q 4.201 7.133 6.092 12.568 L 6.193 12.838 Z M 7.21 13.039 Q 7.509 13.937 6.412 13.638 Q 5.365 13.139 5.29 13.862 Q 5.315 14.61 6.312 14.81 Q 7.036 14.86 7.011 15.359 M 6.964 15.378 A 1 1 0 0 0 7.06 18.526 A 1 1 0 0 0 7.036 15.384 Z';
const openNegative50 = 'M 3.97 8.728 Q 5.955 8.358 6.05 9.496 Q 6.366 10.413 7.125 10.761 Q 7.508 10.862 7.757 11.235 Q 8.28 11.679 7.947 12.626 Q 7.508 13.448 6.707 13.463 Q 5.83 13.493 5.059 12.374 Q 4.786 12.178 4.469 11.921 Q 4.136 11.558 3.879 10.953 Q 3.471 10.378 3.622 9.045 Q 3.713 8.879 3.819 8.788 Z M 11.621 10.998 L 11.758 10.424 Q 11.638 9.505 11.848 9.471 Q 11.516 8.896 12.257 8.352 Q 13.602 7.384 15.296 9.199 Q 15.538 9.471 15.202 10.504 Q 15.1 11.044 14.752 11.368 Q 14.464 12.042 13.693 12.435 Q 12.925 11.962 11.954 12.647 Q 11.213 13.342 10.88 12.193 Q 10.593 11.648 10.956 11.331 Q 11.138 11.149 11.349 11.225 Z M 13.224 13.146 L 12.756 13.448 C 12.031 13.513 11.389 12.77 11.38 12.45 Q 11.107 12.238 11.304 11.769 Q 11.531 10.03 11.017 8.609 C 10.563 7.46 10.548 6.961 10.336 5.569 Q 10.442 4.738 10.412 3.483 L 10.563 2.59 Q 12.031 -0.293 14.207 2.787 Q 15.145 7.082 13.754 12.435 L 13.33 13.115 M 6.271 13.448 C 6.969 13.513 7.473 12.847 7.662 12.436 Q 7.82 12.025 7.599 11.741 Q 6.935 10.887 7.757 9.211 C 7.978 8.358 7.947 7.631 8.516 6.05 Q 8.611 4.912 8.421 3.521 L 8.2 2.288 Q 5.449 -0.399 4.659 3.173 Q 3.616 6.998 5.013 11.966 L 5.829 13.195 Z M 7.22 13.1 Q 7.509 13.937 6.412 13.638 Q 5.365 13.139 5.29 13.862 Q 5.315 14.61 6.312 14.81 Q 7.036 14.86 7.011 15.359 M 6.964 15.378 A 1 1 0 0 0 7.06 18.526 A 1 1 0 0 0 7.036 15.384 Z';
// const closedPositive30 = 'M 3.97 8.728 Q 5.955 8.358 6.05 9.496 Q 6.366 10.413 7.125 10.761 Q 7.508 10.862 7.757 11.235 Q 8.28 11.679 7.947 12.626 Q 7.508 13.448 6.707 13.463 Q 5.83 13.493 5.059 12.374 Q 4.786 12.178 4.469 11.921 Q 4.136 11.558 3.879 10.953 Q 3.471 10.378 3.622 9.045 Q 3.713 8.879 3.819 8.788 Z M 11.621 10.998 L 11.758 10.424 Q 11.638 9.505 11.848 9.471 Q 11.516 8.896 12.257 8.352 Q 13.602 7.384 15.296 9.199 Q 15.538 9.471 15.202 10.504 Q 15.1 11.044 14.752 11.368 Q 14.464 12.042 13.693 12.435 Q 12.925 11.962 11.954 12.647 Q 11.213 13.342 10.88 12.193 Q 10.593 11.648 10.956 11.331 Q 11.138 11.149 11.349 11.225 Z M 13.224 13.146 L 12.756 13.448 C 12.031 13.513 11.389 12.77 11.38 12.45 Q 11.107 12.238 11.304 11.769 Q 11.531 10.03 11.017 8.609 C 10.563 7.46 10.548 6.961 10.336 5.569 Q 10.442 4.738 10.412 3.483 L 10.563 2.59 Q 12.031 -0.293 14.207 2.787 Q 15.145 7.082 13.754 12.435 L 13.33 13.115 M 6.271 13.448 C 6.969 13.513 7.473 12.847 7.662 12.436 Q 7.82 12.025 7.599 11.741 Q 6.935 10.887 7.757 9.211 C 7.978 8.358 7.947 7.631 8.516 6.05 Q 8.611 4.912 8.421 3.521 L 8.2 2.288 Q 5.449 -0.399 4.659 3.173 Q 3.616 6.998 5.013 11.966 L 5.829 13.195 Z M 7.22 13.1 Q 7.509 13.937 6.412 13.638 Q 6.7 14.394 5.802 14.355 Q 5.301 14.926 6.214 14.926 Q 7.563 15.818 8.02 14.718 M 7.916 14.615 A 1 1 0 0 0 10.946 12.747 A 1 1 0 0 0 7.958 14.656 Z';

const closedNegative70Segments = closedNegative70.split( ' M ' ).map( segment => {
  return segment.startsWith( 'M ' ) ? segment.trim() : ( 'M ' + segment ).trim();
} );
const openSegments = openNegative50.split( ' M ' ).map( segment => {
  return segment.startsWith( 'M ' ) ? segment.trim() : ( 'M ' + segment ).trim();
} );
// const closed30Segments = closedPositive30.split( ' M ' ).map( segment => {
//   return segment.startsWith( 'M ' ) ? segment.trim() : ( 'M ' + segment ).trim();
// } );

// TODO: How to add multiple shapes here and in canvas? Just have them relatively positioned?
// TODO: How to make sure canvas and scenery use the same colors/strokes?

const interpolates: IntentionalAny[] = [];
for ( let i = 0; i < closedNegative70Segments.length; i++ ) {

  // https://github.com/pbeshai/d3-interpolate-path
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
  interpolates[ i ] = window.interpolatePath( closedNegative70Segments[ i ], openSegments[ i ] );
  // interpolates[ i ] = window.interpolatePath( openSegments[ i ], closed30Segments[i] );
}

export default class SodiumVoltageGatedChannelNode extends Node {
  public constructor() {

    super();

    closedNegative70Segments.forEach( ( segment, index ) => {
      console.log( index );
      console.log( segment );
      this.addChild( new Path( new Shape( segment ), {
        stroke: 'black',
        lineWidth: 0.4,
        fill: index === 4 ? null : 'white',
        scale: 4
      } ) );
    } );
  }

  public setInterpolation( amount: number ): void {
    this.children.forEach( ( child, index ) => {
      ( child as Path ).shape = new Shape( interpolates[ index ]( amount ) );
    } );
  }
}

membraneChannels.register( 'SodiumVoltageGatedChannelNode', SodiumVoltageGatedChannelNode );