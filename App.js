import React, { } from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ContactScreen from './screens/ContactScreen';

const Drawer = createDrawerNavigator();

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		text: 'rgb(255,255,255)',
		card: 'rgb(51, 56, 86)',
		primary: 'rgb(255,255,255)',
	},
};

const App = () => {
	return (
		<NavigationContainer theme={MyTheme}>
			<Drawer.Navigator initialRouteName="Home">
				<Drawer.Screen
					component={HomeScreen}
					name="Home"
				/>
				<Drawer.Screen
					component={SettingsScreen}
					name="Settings"
				/>
				<Drawer.Screen
					component={ContactScreen}
					name="Contact"
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({});

export default App;
