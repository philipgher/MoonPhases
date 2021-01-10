import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { DateTime } from 'luxon';

import TextField from './TextField';
import TextFieldInline from './TextFieldInline';

import moonRisePNG from '../assets/moonRise.png';
import moonSetPNG from '../assets/moonSet.png';

import getDayOfNextMoonState from '../utils/getDayOfNextMoonState';
import getZodiacIcon from '../utils/getZodiacIcon';

const DataContainer = ({
	activeDay,
	moonTimes,
	moonPosition,
	moonZodiac,
	moonIllumination,
}) => {
	const nextNewMoon = getDayOfNextMoonState(activeDay, 'New Moon');
	const nextFullMoon = getDayOfNextMoonState(activeDay, 'Full Moon');

	return (
		<View style={styles.dataContainer}>
			<View style={[styles.row, styles.rowContainer, styles.rowGap]}>
				<View style={[styles.left, styles.rowChild]}>
					<TextFieldInline value="Next new moon" />
					<TextFieldInline
						type={TextFieldInline.type.sub}
						value={nextNewMoon?.toLocaleString({
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					/>
				</View>
				<View style={[styles.left, styles.rowChild]}>
					<TextFieldInline value="Next full moon" />
					<TextFieldInline
						type={TextFieldInline.type.sub}
						value={nextFullMoon?.toLocaleString({
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					/>
				</View>
			</View>

			<View style={[styles.row, styles.rowContainer]}>
				<TextField
					icon={moonRisePNG}
					style={[styles.left, styles.rowChild]}
					title="Moonrise"
					value={moonTimes.rise}
				/>
				<TextField
					icon={moonSetPNG}
					style={[styles.right, styles.rowChild]}
					title="Moonset"
					value={moonTimes.set}
				/>
			</View>
			{/* <TextField
				style={styles.row}
				title="Lunar eclipse"
				value="?"
			/> */}
			<TextField
				iconBeforeText={getZodiacIcon(moonZodiac)}
				style={styles.row}
				title="Moon zodiac"
				value={moonZodiac}
			/>
			<TextField
				style={styles.row}
				title="Distance"
				value={moonPosition ? `${moonPosition.distance.toFixed(0)} km` : ''}
			/>
			<TextField
				style={styles.row}
				title="Parallactic angle"
				value={moonPosition ? `${(moonPosition.parallacticAngle * 180 / Math.PI).toFixed(1)}°` : ''}
			/>
			<TextField
				style={styles.row}
				title="Altitude"
				value={moonPosition ? `${(moonPosition.altitude * 180 / Math.PI).toFixed(1)}°` : ''}
			/>
			<View style={styles.spacer} />
		</View>
	);
};

const styles = StyleSheet.create({
	dataContainer: {
		paddingLeft: 12,
		paddingRight: 12,
		width: '100%',
		top: 30,
		display: 'flex',
	},
	row: { marginBottom: 4 },
	rowContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	rowChild: { width: '49.5%' },
	left: { marginRight: 2 },
	right: { marginLeft: 2 },
	rowGap: { marginBottom: 30 },
	spacer: {
		height: 50,
		width: '100%',
	},
});

DataContainer.propTypes = {
	activeDay: PropTypes.instanceOf(DateTime),
	moonTimes: PropTypes.shape({
		rise: PropTypes.string,
		set: PropTypes.string,
	}).isRequired,
	moonZodiac: PropTypes.string,
	moonPosition: PropTypes.shape({
		altitude: PropTypes.number.isRequired,
		distance: PropTypes.number.isRequired,
		parallacticAngle: PropTypes.number.isRequired,
	}),
};

export default DataContainer;