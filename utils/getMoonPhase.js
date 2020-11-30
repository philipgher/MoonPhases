export const MOON_PHASES = [
	{
		min: 0.0,
		max: 0.05,
		name: 'New Moon',
		state: 'Waxing Crescent',
	},
	{
		min: 0.05,
		max: 0.475,
		name: 'First Quarter',
		state: 'Waxing Gibbous',
	},
	{
		min: 0.475,
		max: 0.525,
		name: 'Full Moon',
		state: 'Waning Gibbous',
	},
	{
		min: 0.525,
		max: 1.0,
		name: 'Last Quarter',
		state: 'Waning Crescent',
	},
];

const getMoonPhase = (moonIllumination) => (
	MOON_PHASES.find(phase => phase.min < moonIllumination.phase && phase.max > moonIllumination.phase)
);

export default getMoonPhase;
