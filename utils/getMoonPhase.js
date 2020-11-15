const MOON_PHASES = [
	{
		value: 0,
		name: 'New Moon',
		state: 'Waxing Crescent',
	},
	{
		value: 0.25,
		name: 'First Quarter',
		state: 'Waxing Gibbous',
	},
	{
		value: 0.5,
		name: 'Full Moon',
		state: 'Waning Gibbous',
	},
	{
		value: 0.75,
		name: 'Last Quarter',
		state: 'Waning Crescent',
	},
];

const getMoonPhase = (moonIllumination) => (
	MOON_PHASES.find(phase => phase.value < moonIllumination.phase)
);

export default getMoonPhase;
