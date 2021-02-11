export const MOON_PHASES = {
	waxing: [
		{
			min: 0.00,
			max: 0.10,
			name: 'New Moon',
		},
		{
			min: 0.10,
			max: 0.40,
			name: 'Waxing Crescent',
		},
		{
			min: 0.40,
			max: 0.60,
			name: 'First Quarter',
		},
		{
			min: 0.60,
			max: 0.90,
			name: 'Waxing Gibbous',
		},
		{
			min: 0.90,
			max: 1.00,
			name: 'Full Moon',
		},
	],
	waning: [
		{
			min: 0.90,
			max: 1.00,
			name: 'Full Moon',
		},
		{
			min: 0.60,
			max: 0.90,
			name: 'Waning Gibbous',
		},
		{
			min: 0.40,
			max: 0.60,
			name: 'Third Quarter',
		},
		{
			min: 0.10,
			max: 0.40,
			name: 'Waning Crescent',
		},
		{
			min: 0.00,
			max: 0.10,
			name: 'New Moon',
		},
	],
};

const getMoonPhase = async (moon) => {
	const illuminatedFraction = await moon.getIlluminatedFraction();
	const direction = await moon.isWaxing() ? 'waxing' : 'waning';

	return MOON_PHASES[direction].find(phase => phase.min < illuminatedFraction && phase.max > illuminatedFraction).name;
};

export default getMoonPhase;
