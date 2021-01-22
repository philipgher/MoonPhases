import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const getLocationAsync = async () => {
	let { status } = await Permissions.askAsync(Permissions.LOCATION);

	if (status !== 'granted') {
		return { errorMessage: 'Permission to access location was denied' };
	}

	let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
	const { latitude, longitude } = location.coords;

	return {
		lat: latitude,
		lon: longitude,
	};

};

export default getLocationAsync;
