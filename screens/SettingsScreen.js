import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, SafeAreaView, ScrollView, Platform, StatusBar, Pressable } from 'react-native';

import { StoreContext } from '../App';
import HeaderBar from '../components/HeaderBar';
import AdBanner from '../components/AdBanner';
import TextFieldInline from '../components/TextFieldInline';

const SettingsScreen = ({ navigation }) => {
	const [{ measurementUnit }, setState] = useContext(StoreContext);

	const handleTouchMetric = () => {
		setState((state) => ({
			...state,
			measurementUnit: 'metric',
		}));
	};

	const handleTouchImperial = () => {
		setState((state) => ({
			...state,
			measurementUnit: 'imperial',
		}));
	};

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
						<View style={styles.radioLine}>
							<Pressable
								style={styles.radioOuter}
								onTouchEnd={handleTouchMetric}
							>
								{measurementUnit === 'metric' && (
									<View style={styles.radioInner} />
								)}
							</Pressable>
							<TextFieldInline
								textAlign="left"
								type={TextFieldInline.type.sub}
								value="Metric"
							/>
						</View>
						<View style={styles.radioLine}>
							<Pressable
								style={styles.radioOuter}
								onTouchEnd={handleTouchImperial}
							>
								{measurementUnit === 'imperial' && (
									<View style={styles.radioInner} />
								)}
							</Pressable>
							<TextFieldInline
								textAlign="left"
								type={TextFieldInline.type.sub}
								value="Imperial"
							/>
						</View>
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
		height: 200,
	},
	radioLine: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 5,
		paddingBottom: 5,
	},
	radioOuter: {
		marginRight: 10,
		width: 30,
		height: 30,
		borderRadius: 15,
		borderColor: 'white',
		borderWidth: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	radioInner: {
		width: 17,
		height: 17,
		borderRadius: 15,
		backgroundColor: 'white',
	},
});

SettingsScreen.propTypes = { navigation: PropTypes.object.isRequired };

export default SettingsScreen;
