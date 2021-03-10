const fs = require('fs');

const fields = [
	'id',
	'name',
	'asciiname',
	'alternativeNames',
	'lat',
	'lon',
	'featureClass',
	'featureCode',
	'country',
	'altCountry',
	'adminCode',
	'countrySubdivision',
	'municipality',
	'municipalitySubdivision',
	'population',
	'elevation',
	'dem',
	'tz',
	'lastModified',
];

const useFields = [
	'name',
	'asciiname',
	'alternativeNames',
	'lat',
	'lon',
	'country',
	'population',
];

const file = __dirname + '/cities1000.txt';

var lines = fs.readFileSync(file, 'utf8').split('\n');

const formattedCities = lines.map(cityEntry => {
	const cityInfo = cityEntry.split('\t');

	const cityObject = new Object();

	cityInfo.forEach((value, i) => {
		if (useFields.includes(fields[i])) {
			cityObject[fields[i]] = value;
		}
	});

	if (cityObject.alternativeNames || cityObject.alternativeNames === '') {
		cityObject.alternativeNames = cityObject.alternativeNames.split(',');
	}

	return cityObject;
}).filter(cityObject => (
	cityObject.population > 20000
)).sort((a, b) => (
	(a.name > b.name)
		? 1
		: ((b.name > a.name)
			? -1
			: 0)
));

console.log(formattedCities);

fs.writeFileSync(__dirname + '/cities.json', JSON.stringify(formattedCities));