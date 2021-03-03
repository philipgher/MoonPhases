import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import {
	AdMobBanner,
	setTestDeviceIDAsync,
} from 'expo-ads-admob';

const AdBanner = () => {
	useEffect(() => {
		if (Platform.OS === 'web' || process.env.NODE_ENV !== 'production') {
			return;
		}

		// Set global test device ID
		(async () => {
			await setTestDeviceIDAsync('EMULATOR');
		})();
	}, []);

	const bannerError = (error) => {
		console.error(error);
	};

	const adUnitID = (() => {
		if (process.env.NODE_ENV === 'production') {
			return Platform.select({
				ios: 'ca-app-pub-7656011280489722/7534640783', // Prod ID iOS
				android: 'ca-app-pub-7656011280489722/9614009218', // Prod ID Android
			});
		}

		return Platform.select({
			ios: 'ca-app-pub-3940256099942544/2934735716', // Test ID iOS
			android: 'ca-app-pub-3940256099942544/6300978111', // Test ID Android
		});
	})();

	return (
		<AdMobBanner
			servePersonalizedAds
			adUnitID={adUnitID}
			bannerSize="fullBanner"
			onDidFailToReceiveAdWithError={bannerError}
		/>
	);
};

AdBanner.propTypes = {};

export default AdBanner;