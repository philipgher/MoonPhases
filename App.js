import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { getValue, setValue } from './utils/storageUtils';

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

export const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
	const [state, setState] = useState({ measurementUnit: '' });

	useEffect(() => {
		(async () => {
			const measurementUnitLocal = await getValue('measurementUnit');

			if (measurementUnitLocal) {
				setState({
					...state,
					measurementUnit: measurementUnitLocal,
				});

				return;
			}

			setState({
				...state,
				measurementUnit: 'metric',
			});
		})();
	}, []);

	useEffect(() => {
		(async () => {
			await setValue('measurementUnit', state.measurementUnit);
		});
	}, [state.measurementUnit]);

	return (
		<StoreContext.Provider value={[state, setState]}>
			{children}
		</StoreContext.Provider>
	);
};

StoreProvider.propTypes = { children: PropTypes.node.isRequired };

const App = () => {
	return (
		<StoreProvider>
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
		</StoreProvider>
	);
};

export default App;
