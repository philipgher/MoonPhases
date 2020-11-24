const getSunZodiac = (month, day) => {
	//bound is zero indexed and returns the day of month where the boundary occurs
	//ie. bound[0] = 20; means January 20th is the boundary for a zodiac sign
	const bound = [20, 19, 20, 20, 20, 21, 22, 22, 21, 22, 21, 21];
	//startMonth is zero indexed and returns the zodiac sign of the start of that month
	//ie. startMonth[0] = "Capricorn"; means start of January is Zodiac Sign "Capricorn"
	const startMonth = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'];
	const monthIndex = month - 1; //so we can use zero indexed arrays

	const signMonthIndex = (() => {
		if (day <= bound[monthIndex]) { //it's start of month -- before or equal to bound date
			return monthIndex;
		} else { // it must be later than bound, we use the next month's startMonth
			return (monthIndex + 1) % 12; //mod 12 to loop around to January index.
		}
	})();

	return startMonth[signMonthIndex]; //return the Zodiac sign of start Of that month.
};

export default getSunZodiac;
