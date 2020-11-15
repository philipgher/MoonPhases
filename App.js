import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import SunCalc from 'suncalc';
import { DateTime } from 'luxon';
import moon from './assets/moon.png';

import HeaderBar from './components/HeaderBar';
import Moon from './components/Moon';

import getMoonPhase from './utils/getMoonPhase';

const App = () => {
	const [moonTimes, setMoonTimes] = useState();
	const [moonIllumination, setMoonIllumutation] = useState(SunCalc.getMoonIllumination(new Date()));
	const [moonPhase, setMoonPhase] = useState(getMoonPhase(moonIllumination));

	useEffect(() => {
		Geolocation.getCurrentPosition(info => {
			console.log(info);

			const moonTimesRaw = SunCalc.getMoonTimes(
				new Date(),
				info.coords.latitude,
				info.coords.longitude
			);

			console.log(moonTimesRaw);

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
		}, error => {
			console.error(error);
		});
	}, []);

	console.log('moonTimes', moonTimes);
	console.log('moonIllumination', moonIllumination);
	console.log('moonPhase', moonPhase);

	return (
		<View style={styles.container}>
			<HeaderBar />
			<Text>
				{moonPhase.name}
				<br />
				{moonPhase.state}
				<br />
				<br />
				{moonTimes && (
					<>
						{`Moon rise: ${moonTimes.rise}`}
						<br />
						{`Moon set: ${moonTimes.set}`}
					</>
				)}
			</Text>
			<Moon
				moonIllumination={moonIllumination}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: '0',
		width: '100%',
		height: '100%',
	},
	image: {
		backgroundColor: 'yellow',
		height: '50%',
		width: '60%',
		resizeMode: 'contain',
	},
});

export default App;
