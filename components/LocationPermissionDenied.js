import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View, Linking } from 'react-native';

import TextFieldInline from '../components/TextFieldInline';

const LocationPermissionDenied = ({ errorMessage, setUserLocation }) => {
	const handleTapOpenSettings = () => {
		Linking.openSettings();
	};

	const handleTapCloseOverlay = () => {
		setUserLocation({ errorMessage: null });
	};

	return (
		<View style={styles.userLocationError}>
			<TextFieldInline
				value={errorMessage}
			/>
			<Pressable
				style={styles.CTA}
				onTouchEnd={handleTapOpenSettings}
			>
				<TextFieldInline
					value={'Open Settings'}
				/>
			</Pressable>
			<Pressable
				// style={styles.CTA}
				onTouchEnd={handleTapCloseOverlay}
			>
				<TextFieldInline
					textDecorationLine="underline"
					value={'Use static location\n\n'}
				/>
			</Pressable>
			<TextFieldInline
				value={'Information about the moon is dependent on your location on the earth. No location data is sent or stored.'}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	userLocationError: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		height: '100%',
		backgroundColor: 'rgba(0,0,0,0.85)',
		padding: 50,
		zIndex: 10,
	},
	CTA: {
		marginTop: 50,
		marginBottom: 50,
		padding: 20,
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 50,
	},
});

LocationPermissionDenied.propTypes = {
	errorMessage: PropTypes.string.isRequired,
	setUserLocation: PropTypes.func.isRequired,
};

export default LocationPermissionDenied;
