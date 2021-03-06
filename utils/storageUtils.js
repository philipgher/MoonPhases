import AsyncStorage from '@react-native-async-storage/async-storage';

export const getValue = async (key) => {
	try {
		const value = await AsyncStorage.getItem(key);

		return JSON.parse(value);
	} catch (error) {
		console.error('Error retrieving data\n', error);
	}
};

export const setValue = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.error('Error placing data\n', error);
	}
};
