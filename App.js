import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SunCalc from 'suncalc';
import MoonCalc from 'mooncalc';
import { DateTime } from 'luxon';

import HeaderBar from './components/HeaderBar';
import DateBar from './components/DateBar';
import Moon from './components/Moon';
import DataContainer from './components/DataContainer';

import getMoonPhase from './utils/getMoonPhase';
import getLocation from './utils/getLocation';

const App = () => {
	const [activeDay, setActiveDay] = useState(DateTime.local());
	const [location, setLocation] = useState();

	const [moonTimes, setMoonTimes] = useState({});
	const [moonIllumination, setMoonIllumutation] = useState(SunCalc.getMoonIllumination(activeDay));
	const [moonPosition, setMoonPosition] = useState();
	const [moonPhase, setMoonPhase] = useState(getMoonPhase(moonIllumination));
	const [moonZodiac, setMoonZodiac] = useState();

	// moonIllumination and moonPhase effect
	useEffect(() => {
		const newMoonIllumination = SunCalc.getMoonIllumination(activeDay);
		setMoonIllumutation(newMoonIllumination);
		setMoonPhase(getMoonPhase(newMoonIllumination));
	}, [activeDay]);

	// moonTimes, moonPosition and moonZodiac effect
	useEffect(() => {
		if (!location) {
			return;
		}

		if (location.errorMessage) {
			setMoonTimes({
				rise: 'X',
				set: 'X',
			});

			return;
		}

		const plainJSActiveDay = new Date(activeDay.toISO());

		setMoonZodiac(MoonCalc.datasForDay(plainJSActiveDay).constellation);
		setMoonPosition(SunCalc.getMoonPosition(activeDay, location.latitude, location.longitude));

		const moonTimesRaw = SunCalc.getMoonTimes(
			plainJSActiveDay,
			location.latitude,
			location.longitude
		);

		setMoonTimes({
			rise: DateTime.fromJSDate(moonTimesRaw.rise).toLocaleString({
				hour: '2-digit',
				minute: '2-digit',
			}),
			set: DateTime.fromJSDate(moonTimesRaw.set).toLocaleString({
				hour: '2-digit',
				minute: '2-digit',
			}),
		});
	}, [location, activeDay]);

	// location effect
	useEffect(() => {
		(async () => {
			const retreivedLocation = await getLocation();
			setLocation(retreivedLocation);
		})();
	}, []);

	return (
		<View style={styles.container}>
			<HeaderBar />
			<View style={styles.scrollContainer}>
				<DateBar
					activeDay={activeDay}
					moonIllumination={moonIllumination}
					moonPhase={moonPhase}
					setActiveDay={setActiveDay}
				/>
				<Moon
					moonIllumination={moonIllumination}
				/>
				<DataContainer
					moonPosition={moonPosition}
					moonTimes={moonTimes}
					moonZodiac={moonZodiac}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: '0%',
		width: '100%',
		height: '100%',
		backgroundColor: '#191D40',
		overflow: 'hidden',
	},
	scrollContainer: {
		position: 'absolute',
		top: '5%',
		width: '100%',
		height: '95%',
		overflow: 'scroll',
	},
});

export default App;
