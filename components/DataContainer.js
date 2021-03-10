import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import { StoreContext } from '../store/Store';
import TextField from './TextField';
import TextFieldInline from './TextFieldInline';

import moonRisePNG from '../assets/moonRise.png';
import moonSetPNG from '../assets/moonSet.png';

import getZodiacIcon from '../utils/getZodiacIcon';

const DataContainer = ({
	moonDistance,
	moonTimes,
	moonZodiac,
	nextNewAndFullMoon,
}) => {
	const [{ measurementUnit }] = useContext(StoreContext);

	const moonDistanceInRightUnits = moonDistance ?
		measurementUnit === 'metric'
			? `${moonDistance.toFixed(0)} km`
			: `${(moonDistance * 0.621).toFixed(0)} mi`
		: '';

	return (
		<View style={styles.dataContainer}>
			<View style={[styles.row, styles.rowContainer, styles.rowGap]}>
				<View style={[styles.left, styles.rowChild]}>
					<TextFieldInline value="New moon" />
					<TextFieldInline
						type={TextFieldInline.type.sub}
						value={nextNewAndFullMoon.new}
					/>
				</View>
				<View style={[styles.left, styles.rowChild]}>
					<TextFieldInline value="Full moon" />
					<TextFieldInline
						type={TextFieldInline.type.sub}
						value={nextNewAndFullMoon.full}
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
			<TextField
				iconBeforeText={getZodiacIcon(moonZodiac)}
				style={styles.row}
				title="Moon zodiac"
				value={moonZodiac}
			/>
			<TextField
				style={styles.row}
				title="Distance"
				value={moonDistanceInRightUnits}
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
	moonDistance: PropTypes.number,
	moonTimes: PropTypes.shape({
		rise: PropTypes.string,
		set: PropTypes.string,
	}).isRequired,
	moonZodiac: PropTypes.string,
	nextNewAndFullMoon: PropTypes.shape({
		new: PropTypes.string,
		full: PropTypes.string,
	}).isRequired,
};

export default DataContainer;