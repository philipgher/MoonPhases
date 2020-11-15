import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';
import Svg, { Defs, Path } from 'react-native-svg';
import { remap } from '@anselan/maprange';

import moon from '../assets/moon.png';

const Moon = ({ moonIllumination }) => {
	const [transSlice, setTransSlice] = useState({
		left: {
		},
		right: {
		},
	});

	const updateMoon = (phase) => {
		var phaseScale = 1,
			phaseTrans = 100,
			phaseRight = 0;

		if (phase <= 100) {
			phaseRight = (1-phase/100);
		}

		if (phase >= 100) {
			phaseScale = (1-(phase-100)/100);
			phaseTrans = 100*phaseScale;
		}

		setTransSlice({
			right: {
				transform: 'scaleX(' + phaseRight + ')',
			},
			left: {
				transform: `translate(${phaseTrans}px, 0) scaleX(${1 - phaseScale})`,
			},
		});
	};

	useEffect(() => {
		updateMoon(5);
	}, []);

	// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
	// Move to: M x y
	// Bézier curve: C x1 y1, x2 y2, x y || c dx1 dy1, dx2 dy2, dx dy
	// Several Bézier curves: S x2 y2, x y || s dx2 dy2, dx dy
	// Quadratic curve: Q x1 y1, x y || q dx1 dy1, dx dy
	// Stringing together multiple quadratic Béziers: T x y || t dx dy

	const visiblePartX = remap(moonIllumination.fraction, [0, 1], [0, 200]);
	const corCurve = 3;

	return (
		<View style={styles.container}>
			<Image
				source={moon}
				style={styles.image}
			/>
			<Svg
				height="200"
				style={styles.moonContainer}
				width="200"
			>
				<Path
					d={`
                        M 100 0
						Q ${visiblePartX - corCurve} ${corCurve} ${visiblePartX} 100
						Q ${visiblePartX - corCurve} ${200 - corCurve} 100 200
						Q ${corCurve} ${200 - corCurve} 0 100
						Q ${corCurve} ${corCurve} 100 0
                    `}
					fill="#191D40"
					opacity="0.9"
				/>
			</Svg>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '200px',
		height: '200px',
		position: 'relative',
	},
	image: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
	moonContainer: {
		top: '0',
		left: '0',
		position: 'absolute',
		margin: '0',
	},
});

Moon.propTypes = {
};

export default Moon;