import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, SafeAreaView, ScrollView, Platform, StatusBar, Pressable, Switch, TextInput } from 'react-native';

import { StoreContext } from '../store/Store';
import HeaderBar from '../components/HeaderBar';
import AdBanner from '../components/AdBanner';
import TextFieldInline from '../components/TextFieldInline';

import findCityOnInput from '../utils/citiesList/findCityOnInput';

const cityObjectToString = (cityObject) => cityObject ? `${cityObject.name}, ${cityObject.country}` : '';

const SettingsScreen = ({ navigation }) => {
	const [{ measurementUnit, useDeviceLocation, staticLocation }, setState] = useContext(StoreContext);
	const [staticLocationInputField, setStaticLocationInputField] = useState(staticLocation ? cityObjectToString(staticLocation) : null);
	const [staticLocationHistList, setStaticLocationHintList] = useState([]);

	const visibleHinstList = staticLocationHistList.length < 20 && staticLocationHistList.length > 0
		? staticLocationHistList
		: [];

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

	const handleSwitchDeviceLocation = () => {
		setState((state) => ({
			...state,
			useDeviceLocation: !state.useDeviceLocation,
		}));
	};

	const handleTypeInput = (inputText) => {
		setStaticLocationInputField(inputText);

		const cityOnly = inputText.split(',')[0];
		const filteredCities = findCityOnInput(cityOnly);
		setStaticLocationHintList(filteredCities);
	};

	const handleSelectCity = (city) => {
		setStaticLocationInputField(cityObjectToString(city));
		setStaticLocationHintList([]);

		setState((state) => ({
			...state,
			staticLocation: city,
		}));
	};

	const handleTapSubmit = () => {
		if (visibleHinstList.length > 0) {
			handleSelectCity(visibleHinstList[0]);

			return;
		}

		setState((state) => ({
			...state,
			staticLocation: null,
		}));
	};

	const handleFocusTextInput = () => {
		setState((state) => ({
			...state,
			staticLocation: null,
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
							// style={styles.header}
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

						<TextFieldInline
							style={styles.header}
							textAlign="left"
							value="Use device location"
						/>
						<View style={styles.radioLine}>
							<Switch
								ios_backgroundColor="#3e3e3e"
								thumbColor={useDeviceLocation ? '#ffffff' : '#B4B5C5'}
								trackColor={{
									false: '#3B3F5D',
									true: '#3B3F5D',
								}}
								value={useDeviceLocation}
								onValueChange={handleSwitchDeviceLocation}
							/>
						</View>

						{!useDeviceLocation && (
							<>
								<TextFieldInline
									style={styles.header}
									textAlign="left"
									value="Manual location"
								/>
								<TextInput
									placeholder="Please enter a city name"
									placeholderTextColor="rgba(255,255,255,0.3)"
									style={styles.textInputLine}
									value={staticLocationInputField}
									onChangeText={handleTypeInput}
									onFocus={handleFocusTextInput}
									onSubmitEditing={handleTapSubmit}
								/>
								{visibleHinstList.length > 0 && (
									visibleHinstList.map(city => (
										<Pressable
											key={cityObjectToString(city)}
											onTouchEnd={() => handleSelectCity(city)}
										>
											<TextFieldInline
												style={styles.dropdownListElement}
												textAlign="left"
												value={cityObjectToString(city)}
											/>
										</Pressable>
									))
								)}
							</>
						)}
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
		paddingRight: 20,
		paddingBottom: 50,
	},
	header: { paddingTop: 20 },
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
	textInputLine: {
		padding: 5,
		borderRadius: 5,
		width: '100%',
		borderColor: 'white',
		borderWidth: 1,
		color: 'white',
	},
	dropdownListElement: {
		padding: 5,
		marginTop: 2,
		marginBottom: 1,
		borderRadius: 5,
		width: '100%',
		backgroundColor: 'rgba(255,255,255,0.1)',
	},
});

SettingsScreen.propTypes = { navigation: PropTypes.object.isRequired };

export default SettingsScreen;
