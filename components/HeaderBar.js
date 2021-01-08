import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import TextFieldInline from './TextFieldInline';

import settingsIcon from '../assets/settings.png';

const HeaderBar = () => {
	const handlePressSettings = () => {
		console.log('presseddd');
	};

	return (
		<View style={styles.container}>
			<Pressable
				style={styles.iconContainer}
				onPress={handlePressSettings}
			>
				<Image
					source={settingsIcon}
					style={styles.icon}
				/>
			</Pressable>
			<TextFieldInline
				fontSize={20}
				style={styles.center}
				type={TextFieldInline.type.sub}
				value="DailyMoon"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 50,
	},
	center: {
		position: 'absolute',
		left: '15%',
		width: '70%',
		textAlign: 'center',
	},
	iconContainer: {
		width: 60,
		height: 50,
		paddingTop: 11,
		paddingBottom: 16,
		paddingLeft: 19,
		paddingRight: 19,
	},
	icon: {
		width: '100%',
		height: '100%',
	},
});

HeaderBar.propTypes = {};

export default HeaderBar;