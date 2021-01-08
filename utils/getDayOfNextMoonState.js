import SunCalc from 'suncalc';
import getMoonPhase from './getMoonPhase';

const isDayMoonState = (day, moonState) => {
	const moonPhaseChecked = getMoonPhase(SunCalc.getMoonIllumination(day));

	return moonPhaseChecked.name === moonState;
};

const getDayOfNextMoonState = (currentDay, moonState) => {
	let futureDay = currentDay.startOf('day');

	const checkMoonStateLooper = () => {
		futureDay = futureDay.startOf('day').plus({ days: 1 });
		const isMoonInGivenState = isDayMoonState(futureDay, moonState);

		if (!isMoonInGivenState) {
			checkMoonStateLooper();

			return;
		}
	};

	checkMoonStateLooper();

	return futureDay;
};

export default getDayOfNextMoonState;