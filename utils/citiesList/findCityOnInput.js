import cities from './cities.json';

const findCityOnInput = (input) => {
	return cities.filter(city => (
		city.name.toLowerCase().startsWith(input.toLowerCase())
		|| city.alternativeNames.some(name => name.toLowerCase().startsWith(input.toLowerCase()))
	)).sort((a, b) => a.population - b.population);
};

export default findCityOnInput;
