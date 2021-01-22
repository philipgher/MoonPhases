import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import SunCalc from 'suncalc';
import { createTimeOfInterest } from 'astronomy-bundle/time';
import { createMoon } from 'astronomy-bundle/moon';
import { createSun } from 'astronomy-bundle/sun';

import MoonCalc from 'mooncalc';
import { DateTime } from 'luxon';

import HeaderBar from '../components/HeaderBar';
import DateBar from '../components/DateBar';
import Moon from '../components/Moon';
import DataContainer from '../components/DataContainer';
import AdBanner from '../components/AdBanner';

import getMoonPhase from '../utils/getMoonPhase';
import getLocation from '../utils/getLocation';
import TodayButton from '../components/TodayButton';
import twoDigitNum from '../utils/twoDigitNum';

const HomeScreen = ({ navigation }) => {
	const [initialDay, setInitialDay] = useState(DateTime.local());
	const [activeDay, setActiveDay] = useState(DateTime.local());
	const [location, setLocation] = useState({
		lat: null,
		lon: null,
		errorMessage: null,
	});

	const [moonTimes, setMoonTimes] = useState({});
	const [moonIllumination, setMoonIllumutation] = useState(SunCalc.getMoonIllumination(activeDay));
	const [moonPosition, setMoonPosition] = useState();
	const [moonPhase, setMoonPhase] = useState(getMoonPhase(moonIllumination));
	const [nextNewAndFullMoon, setNextNewAndFullMoon] = useState({
		new: null,
		full: null,
	});
	const [moonZodiac, setMoonZodiac] = useState();

	console.log('activeDay', activeDay);
	console.log('location', location);
	console.log('moonTimes', moonTimes);
	console.log('moonIllumination', moonIllumination);
	console.log('moonPosition', moonPosition);
	console.log('moonPhase', moonPhase);
	console.log('moonZodiac', moonZodiac);
	console.log('---- ----');

	// moonIllumination and moonPhase effect
	useEffect(() => {
		const newMoonIllumination = SunCalc.getMoonIllumination(activeDay);
		setMoonIllumutation(newMoonIllumination);
		setMoonPhase(getMoonPhase(newMoonIllumination));
	}, [activeDay]);

	// moonTimes, moonPosition and moonZodiac effect
	useEffect(() => {
		if (!Object.values(location).some(value => !!value)) {
			return;
		}

		if (location.errorMessage) {
			setMoonTimes({
				rise: 'X',
				set: 'X',
			});

			return;
		}

		// Convert Luxon DateTime to vanilla Date
		const plainJSActiveDay = new Date(activeDay.toISO());

		(async () => {
			const toi = createTimeOfInterest.fromDate(plainJSActiveDay);
			const moon = createMoon(toi);

			const toiRise = await moon.getRise(location);
			const toiSet = await moon.getSet(location);

			setMoonTimes({
				rise: `${twoDigitNum(toiRise.time.hour)}:${twoDigitNum(toiRise.time.min)}`,
				set: `${twoDigitNum(toiSet.time.hour)}:${twoDigitNum(toiSet.time.min)}`,
			});

			const toiNextNew = moon.getUpcomingNewMoon();
			const toiNextFull = moon.getUpcomingFullMoon();

			setNextNewAndFullMoon({
				new: `${twoDigitNum(toiNextNew.time.day)}/${twoDigitNum(toiNextNew.time.month)}/${toiNextNew.time.year}`,
				full: `${twoDigitNum(toiNextFull.time.day)}/${twoDigitNum(toiNextFull.time.month)}/${twoDigitNum(toiNextFull.time.year)}`,
			});

			setMoonZodiac(MoonCalc.datasForDay(plainJSActiveDay).constellation);
			setMoonPosition(SunCalc.getMoonPosition(activeDay, location.latitude, location.longitude));
		})();
	}, [location, activeDay]);

	// location effect
	useEffect(() => {
		(async () => {
			setLocation(await getLocation());
		})();
	}, []);

	return (
		<View style={styles.background}>
			<StatusBar
				translucent
				backgroundColor="rgb(51, 56, 86)"
			/>
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.scrollContainer}>
					<HeaderBar navigation={navigation} />
					<DateBar
						activeDay={activeDay}
						moonIllumination={moonIllumination}
						moonPhase={moonPhase}
						setActiveDay={setActiveDay}
					/>
					{activeDay.toMillis() !== initialDay.toMillis() && (
						<TodayButton
							setActiveDay={setActiveDay}
							setInitialDay={setInitialDay}
						/>
					)}
					<Moon
						moonIllumination={moonIllumination}
						moonPosition={moonPosition}
					/>
					<DataContainer
						activeDay={activeDay}
						moonIllumination={moonIllumination}
						moonPosition={moonPosition}
						moonTimes={moonTimes}
						moonZodiac={moonZodiac}
						nextNewAndFullMoon={nextNewAndFullMoon}
					/>
				</ScrollView>
				<AdBanner />
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	background: {
		backgroundColor: 'rgb(51, 56, 86)',
		position: 'absolute',
		top: 0,
		width: '100%',
		height: '100%',
	},
	container: {
		backgroundColor: '#191D40',
		position: 'absolute',
		top: 0,
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	scrollContainer: {
		top: 0,
		width: '100%',
		height: '95%',
	},
});

HomeScreen.propTypes = { navigation: PropTypes.object.isRequired };

export default HomeScreen;
