import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';

import HeaderBar from '../components/HeaderBar';
import AdBanner from '../components/AdBanner';
import TextFieldInline from '../components/TextFieldInline';

const SettingsScreen = ({ navigation }) => {
	return (
		<View style={styles.background}>
			<StatusBar
				translucent
				backgroundColor="rgb(51, 56, 86)"
			/>
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.scrollContainer}>
					<HeaderBar navigation={navigation} />
					<View style={styles.textWrapper}>
						<TextFieldInline
							textAlign="left"
							value="Units"
						/>
					</View>
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
	textWrapper: {
		position: 'relative',
		top: 10,
		paddingLeft: 20,
		height: 100,
	},
});

SettingsScreen.propTypes = { navigation: PropTypes.object.isRequired };

export default SettingsScreen;
