import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import {
	useFonts,
	Poppins_300Light,
	Poppins_500Medium,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins';

const TextField = ({ title, value, style, ...props }) => {
	const [isFontsLoaded] = useFonts({
		Poppins_300Light,
		Poppins_500Medium,
		Poppins_700Bold,
	});

	if (!isFontsLoaded) {
		return null;
	}

	return (
		<View
			{...props}
			style={[style, styles.container]}
		>
			<Text style={[styles.text, styles.title, { fontFamily: 'Poppins_500Medium' }]}>
				{title}
			</Text>
			<Text style={[styles.text, styles.value, { fontFamily: 'Poppins_300Light' }]}>
				{value}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgb(60, 63, 91)',
		borderRadius: 5,
		paddingTop: '18px',
		paddingBottom: '18px',
		paddingLeft: '14px',
		paddingRight: '14px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	text: {
		color: 'white',
		fontSize: 14,
	},
	title: {},
	value: {},
});

TextField.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.string,
	style: PropTypes.any,
};

export default TextField;