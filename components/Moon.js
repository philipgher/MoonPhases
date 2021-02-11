import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { remap } from '@anselan/maprange';

import moon from '../assets/moon.png';

const Moon = ({ moonDistance, moonIlluminatedFraction, moonAngle }) => {
	// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
	// Move to: M x y
	// Bézier curve: C x1 y1, x2 y2, x y || c dx1 dy1, dx2 dy2, dx dy
	// Several Bézier curves: S x2 y2, x y || s dx2 dy2, dx dy
	// Quadratic curve: Q x1 y1, x y || q dx1 dy1, dx dy
	// Stringing together multiple quadratic Béziers: T x y || t dx dy

	const visiblePartX = 200 - remap(moonIlluminatedFraction, [0, 1], [0, 200]);
	// const visiblePartX = 200;
	const bezierToCircleDeviator = 48;
	const yDeviator = 11;

	let topBottomPuller = visiblePartX >= 100
		? remap(visiblePartX, [100, 200], [100, 160])
		: remap(visiblePartX, [0, 100], [0, 100]);

	return (
		<View style={styles.contentBox}>
			<View
				style={[
					styles.moonContainer,
					{
						transform: [
							{ scale: moonAngle ? remap(moonDistance, [363300, 405500], [0.9, 1.1]) : 1 },
							{ rotate: moonAngle ? `${moonAngle}deg` : '0deg' },
						],
					},
				]}
			>
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
		position: 'relative',
		top: 20,
		width: '100%',
		height: 300,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	moonContainer: { width: 200 },
	image: {
		width: 200,
		height: 200,
	},
	overlayContainer: {
		width: 200,
		height: 200,
		position: 'absolute',
		margin: '0%',
		transform: [{ scale: 1.02 }],
	},
});

Moon.propTypes = {
	moonAngle: PropTypes.number,
	moonDistance: PropTypes.number,
	moonIlluminatedFraction: PropTypes.number,
};

export default Moon;