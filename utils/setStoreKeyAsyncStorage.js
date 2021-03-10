import { getValue, setValue } from './storageUtils';

const setStoreKeyAsyncStorage = async (key, defaultValue, setState) => {
	const valueInAsyncStorage = await getValue(key);

	if (valueInAsyncStorage) {
		setState((state) => ({
			...state,
			[key]: valueInAsyncStorage,
		}));

		return;
	}

	setState((state) => ({
		...state,
		[key]: defaultValue,
	}));
};

export default setStoreKeyAsyncStorage;
