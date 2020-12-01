export const MOON_PHASES = [
	{
		min: 0.0,
		max: 0.05,
		name: 'New Moon',
	},
	{
		min: 0.05,
		max: 0.25,
		name: 'Waxing Crescent',
	},
	{
		min: 0.25,
		max: 0.255,
		name: 'First Quarter',
	},
	{
		min: 0.255,
		max: 0.5,
		name: 'Waxing Gibbous',
	},
	{
		min: 0.5,
		max: 0.55,
		name: 'Full Moon',
	},
	{
		min: 0.55,
		max: 0.75,
		name: 'Waning Gibbous',
	},
	{
		min: 0.75,
		max: 0.755,
		name: 'Last Quarter',
	},
	{
		min: 0.755,
		max: 1.0,
		name: 'Waning Crescent',
	},
];

const getMoonPhase = (moonIllumination) => (
	MOON_PHASES.find(phase => phase.min < moonIllumination.phase && phase.max > moonIllumination.phase)
);

export default getMoonPhase;
