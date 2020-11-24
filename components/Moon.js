import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { remap } from '@anselan/maprange';

import moon from '../assets/moon.png';

const Moon = ({ moonIllumination }) => {
	// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
	// Move to: M x y
	// Bézier curve: C x1 y1, x2 y2, x y || c dx1 dy1, dx2 dy2, dx dy
	// Several Bézier curves: S x2 y2, x y || s dx2 dy2, dx dy
	// Quadratic curve: Q x1 y1, x y || q dx1 dy1, dx dy
	// Stringing together multiple quadratic Béziers: T x y || t dx dy

	const visiblePartX = 200 - remap(moonIllumination.fraction, [0, 1], [0, 200]);
	// const visiblePartX = 40;
	const bezierToCircleDeviator = 45;
	const yDeviator = 11;

	let topBottomPuller = visiblePartX >= 100
		? remap(visiblePartX, [100, 200], [100, 155])
		: remap(visiblePartX, [0, 100], [0, 100]);

	return (
		<View style={styles.contentBox}>
			<View style={styles.moonContainer}>
				<Image
					source={moon}
					style={styles.image}
				/>
				<Svg style={styles.overlayContainer}>
					<Path
						d={`
						M 100 0
						C 	${topBottomPuller} ${yDeviator - remap(visiblePartX, [0, 200], [0, yDeviator])},
							${visiblePartX} ${100 - remap(visiblePartX, [0, 200], [0, bezierToCircleDeviator])},
							${visiblePartX} 100
						C	${visiblePartX} ${200 - (100 - remap(visiblePartX, [0, 200], [0, bezierToCircleDeviator]))},
							${topBottomPuller} ${200 - (yDeviator - remap(visiblePartX, [0, 200], [0, yDeviator]))},
							100 200
						C 	${bezierToCircleDeviator} 200,
							0 ${200 - bezierToCircleDeviator},
							0 100
						C 	0 ${bezierToCircleDeviator},
							${bezierToCircleDeviator} 0,
							100 0
					`}
						fill="#191D40"
						opacity="0.9"
					/>
				</Svg>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	contentBox: {
		top: '20%',
		width: '100%',
		height: '300px',
		position: 'absolute',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	moonContainer: {
		width: '200px',
	},
	image: {
		width: '200px',
		height: '200px',
	},
	overlayContainer: {
		width: '200px',
		height: '200px',
		position: 'absolute',
		margin: '0%',
	},
});

Moon.propTypes = {
	moonIllumination: PropTypes.shape({
		angle: PropTypes.number.isRequired,
		fraction: PropTypes.number.isRequired,
		phase: PropTypes.number.isRequired,
	}),
};

export default Moon;