import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image } from 'react-native';
import {
	useFonts,
	Poppins_300Light,
	Poppins_500Medium,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins';

const TextField = ({ title, icon, value, style, ...props }) => {
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
			<View style={styles.titleContainer}>
				{icon && (
					<Image
						source={icon}
						style={styles.icon}
					/>
				)}
				<Text style={[styles.text, styles.title, { fontFamily: 'Poppins_500Medium' }]}>
					{title}
				</Text>
			</View>
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
		paddingTop: 18,
		paddingBottom: 18,
		paddingLeft: 14,
		paddingRight: 14,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	text: {
		color: 'white',
		fontSize: 14,
	},
	icon: {
		width: 14,
		height: 20,
		marginRight: 9,
	},
	titleContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	title: {},
	value: {},
});

TextField.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.string,
	icon: PropTypes.string,
	style: PropTypes.any,
};

export default TextField;