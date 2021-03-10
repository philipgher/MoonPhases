import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { setValue } from '../utils/storageUtils';
import setStoreKeyAsyncStorage from '../utils/setStoreKeyAsyncStorage';

export const StoreContext = React.createContext();

const STORE = [
	{
		key: 'measurementUnit',
		defaultValue: 'metric',
	},
	{
		key: 'useDeviceLocation',
		defaultValue: true,
	},
	{
		key: 'staticLocation',
		defaultValue: '',
	},
];

const initialState = new Object();

STORE.forEach(entry => {
	initialState[entry.key] = entry.defaultValue;
});

const StoreProvider = ({ children }) => {
	const [state, setState] = useState(initialState);

	useEffect(() => {
		(async () => {
			Promise.all(
				STORE.map(entry => setStoreKeyAsyncStorage(entry.key, entry.defaultValue, setState))
			);
		})();
	}, []);

	useEffect(() => {
		console.log('new state');

		STORE.forEach(entry => {
			setValue(entry.key, state[entry.key]);
		});
	}, [state]);

	return (
		<StoreContext.Provider value={[state, setState]}>
			{children}
		</StoreContext.Provider>
	);
};

StoreProvider.propTypes = { children: PropTypes.node.isRequired };

export default StoreProvider;
