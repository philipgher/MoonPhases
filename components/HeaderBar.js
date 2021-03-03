import React from 'react';
import PropTypes from 'prop-types';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import menuIcon from '../assets/menu.png';
import logo from '../assets/logo.png';

const HeaderBar = ({ navigation }) => {
	const handlePressSettings = () => {
		navigation.openDrawer();
	};

	return (
		<View style={styles.container}>
			<Pressable
				style={styles.iconContainer}
				onPress={handlePressSettings}
			>
				<Image
					source={menuIcon}
					style={styles.icon}
				/>
			</Pressable>
			<View style={styles.center}>
				<Image
					source={logo}
					style={styles.logo}
				/>
			</View>
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
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		height: 23,
		width: 115,
	},
	iconContainer: {
		width: 60,
		height: 50,
		paddingTop: 11,
		paddingBottom: 16,
		paddingLeft: 19,
		paddingRight: 18,
	},
	icon: {
		width: '100%',
		height: '100%',
	},
});

HeaderBar.propTypes = { navigation: PropTypes.object.isRequired };

export default HeaderBar;