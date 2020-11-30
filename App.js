import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
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
			rise: DateTime.fromJSDate(moonTimesRaw.rise).toFormat('HH:MM'),
			set: DateTime.fromJSDate(moonTimesRaw.set).toFormat('HH:MM'),
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
		<View style={styles.background}>
			<SafeAreaView style={styles.container}>
				<HeaderBar />
				<ScrollView style={styles.scrollContainer}>
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
						activeDay={activeDay}
						moonIllumination={moonIllumination}
						moonPosition={moonPosition}
						moonTimes={moonTimes}
						moonZodiac={moonZodiac}
					/>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	background: {
		backgroundColor: '#191D40',
		position: 'absolute',
		top: 0,
		width: '100%',
		height: '100%',
	},
	container: {
		position: 'absolute',
		top: 0,
		width: '100%',
		height: '100%',
		overflow: 'hidden',
	},
	scrollContainer: {
		top: 0,
		width: '100%',
		height: '95%',
	},
});

export default App;
