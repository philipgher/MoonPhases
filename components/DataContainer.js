import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import SunCalc from 'suncalc';
import TextField from './TextField';
import TextFieldInline from './TextFieldInline';

import moonRisePNG from '../assets/moonRise.png';
import moonSetPNG from '../assets/moonSet.png';
import getMoonPhase from '../utils/getMoonPhase';

import { MOON_PHASES } from '../utils/getMoonPhase';

const DataContainer = ({
	activeDay,
	moonTimes,
	moonPosition,
	moonZodiac,
	moonIllumination,
}) => {
	console.log(moonIllumination);

	const isDayMoonState = (day, moonState) => {
		const moonPhaseChecked = getMoonPhase(SunCalc.getMoonIllumination(day));

		return moonPhaseChecked.name === moonState;
	};

	const nextNewMoon = (() => {
		let futureDay = activeDay.startOf('day');

		const checkIfIsNewMoon = () => {
			futureDay = futureDay.startOf('day').plus({ days: 1 });
			const isNewMoon = isDayMoonState(futureDay, MOON_PHASES[0].name);

			if (!isNewMoon) {
				checkIfIsNewMoon();

				return;
			}
		};

		checkIfIsNewMoon();

		return futureDay;
	})();

	const nextFullMoon = (() => {
		let futureDay = activeDay.startOf('day');

		const checkIfIsNextMoon = () => {
			futureDay = futureDay.startOf('day').plus({ days: 1 });
			const isNewMoon = isDayMoonState(futureDay, MOON_PHASES[3].name);

			if (!isNewMoon) {
				checkIfIsNextMoon();

				return;
			}
		};

		checkIfIsNextMoon();

		return futureDay;
	})();

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
				style={styles.row}
				title="Moon zodiac"
				value={moonZodiac}
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
		height: 30,
		width: '100%',
	},
});

DataContainer.propTypes = {
	moonTimes: PropTypes.shape({
		rise: PropTypes.string,
		set: PropTypes.string,
	}).isRequired,
	moonZodiac: PropTypes.string,
	moonPosition: PropTypes.shape({ altitude: PropTypes.number.isRequired }),
};

export default DataContainer;