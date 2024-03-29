import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { createTimeOfInterest } from 'astronomy-bundle/time';
import { createMoon } from 'astronomy-bundle/moon';
import MoonCalc from 'mooncalc';
import { DateTime } from 'luxon';

import { StoreContext } from '../store/Store';
import HeaderBar from '../components/HeaderBar';
import DateBar from '../components/DateBar';
import Moon from '../components/Moon';
import DataContainer from '../components/DataContainer';
import AdBanner from '../components/AdBanner';

import getMoonPhase from '../utils/getMoonPhase';
import getUserLocation from '../utils/getUserLocation';
import TodayButton from '../components/TodayButton';
import twoDigitNum from '../utils/twoDigitNum';

const HomeScreen = ({ navigation }) => {
	const [{ staticLocation, useDeviceLocation }, setState] = useContext(StoreContext);

	const [activeLocation, setActiveLocation] = useState({
		lat: null,
		lon: null,
		errorMessage: null,
	});

	const hasFoundLocation = activeLocation.lat && activeLocation.lon;

	const [initialDay] = useState(DateTime.local().startOf('day'));
	const [activeDay, setActiveDay] = useState(initialDay);

	const [moonPhase, setMoonPhase] = useState();
	const [nextNewAndFullMoon, setNextNewAndFullMoon] = useState({
		new: null,
		full: null,
	});
	const [moonTimes, setMoonTimes] = useState({
		rise: null,
		set: null,
	});
	const [moonZodiac, setMoonZodiac] = useState(); // MoonCalc
	const [moonDistance, setMoonDistance] = useState(); // Astronomy Bundle

	// Moon visualisation
	const [moonIlluminatedFraction, setMoonIlluminatedFraction] = useState(0); // Astronomy Bundle
	const [moonAngle, setMoonAngle] = useState();

	const requestDeviceLocationUsage = async () => {
		if (useDeviceLocation === null || useDeviceLocation) {
			const userLocation = await getUserLocation();

			if (userLocation.denied) {
				setState((state) => ({
					...state,
					useDeviceLocation: false,
				}));

				navigation.navigate('Settings');

				return;
			}

			setState((state) => ({
				...state,
				useDeviceLocation: true,
			}));

			setActiveLocation(userLocation);
		}
	};

	// device location effect
	useEffect(() => {
		requestDeviceLocationUsage();
	}, []);

	// usedevicelocation effect
	useEffect(() => {
		requestDeviceLocationUsage();
	}, [useDeviceLocation]);

	// staticlocation effect
	useEffect(() => {
		if (useDeviceLocation) {
			return;
		}

		if (!staticLocation) {
			setActiveLocation({
				lat: null,
				lon: null,
				errorMessage: null,
			});

			return;
		}

		setActiveLocation({
			lat: Number(staticLocation.lat),
			lon: Number(staticLocation.lon),
		});
	}, [useDeviceLocation, staticLocation]);

	useEffect(() => {
		// Convert Luxon DateTime to vanilla Date
		const plainJSActiveDay = new Date(activeDay.toISO());

		(async () => {
			const toi = createTimeOfInterest.fromDate(plainJSActiveDay);
			const moon = createMoon(toi);

			const toiNextNew = moon.getUpcomingNewMoon();
			const toiNextFull = moon.getUpcomingFullMoon();

			setNextNewAndFullMoon({
				new: `${DateTime.fromObject({
					day: toiNextNew.time.day,
					month: toiNextNew.time.month,
					year: toiNextNew.time.year,
				}).toFormat('d LLLL yyyy')}`,
				full: `${DateTime.fromObject({
					day: toiNextFull.time.day,
					month: toiNextFull.time.month,
					year: toiNextFull.time.year,
				}).toFormat('d LLLL yyyy')}`,
			});

			// Phase is human readable name of current state in moon cycle
			setMoonPhase(await getMoonPhase(moon));

			// The amount of visible moon (lit)
			setMoonIlluminatedFraction(await moon.getIlluminatedFraction());

			// Distance from the Earth
			setMoonDistance(await moon.getDistanceToEarth());

			// Moon zodiac is the constellation, but from the moon
			setMoonZodiac(MoonCalc.datasForDay(plainJSActiveDay).constellation);

			if (!hasFoundLocation) {
				setMoonTimes({
					rise: '-',
					set: '-',
				});
				setMoonAngle(10);

				return;
			}

			let moonRise, moonSet;

			try {
				moonRise = await moon.getRise(activeLocation);
			} catch {} // eslint-disable-line no-empty

			try {
				moonSet = await moon.getSet(activeLocation);
			} catch {} // eslint-disable-line no-empty

			setMoonTimes({
				rise: moonRise
					? `${twoDigitNum(moonRise.time.hour)}:${twoDigitNum(moonRise.time.min)}`
					: '-',
				set: moonSet
					? `${twoDigitNum(moonSet.time.hour)}:${twoDigitNum(moonSet.time.min)}`
					: '-',
			});

			// Moon angle is the angle from the middle to the centre of the bright side
			setMoonAngle(await moon.getTopocentricPhaseAngle(activeLocation) - 65);
		})();
	}, [activeLocation, activeDay]);

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
						hasFoundLocation={hasFoundLocation}
						moonIlluminatedFraction={moonIlluminatedFraction}
						moonPhase={moonPhase}
						setActiveDay={setActiveDay}
					/>
					{activeDay.toMillis() !== initialDay.toMillis() && (
						<TodayButton
							initialDay={initialDay}
							setActiveDay={setActiveDay}
						/>
					)}
					<Moon
						moonAngle={moonAngle}
						moonDistance={moonDistance}
						moonIlluminatedFraction={moonIlluminatedFraction}
					/>
					<DataContainer
						activeDay={activeDay}
						hasFoundLocation={hasFoundLocation}
						moonAngle={moonAngle}
						moonDistance={moonDistance}
						moonTimes={moonTimes}
						moonZodiac={moonZodiac}
						nextNewAndFullMoon={nextNewAndFullMoon}
					/>
					{/* {userLocation.errorMessage && (
						<LocationPermissionDenied
							errorMessage={userLocation.errorMessage}
							setUserLocation={setUserLocation}
						/>
					)} */}
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
