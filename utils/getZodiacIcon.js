import aquarius from '../assets/zodiac-signs/aquarius.png';
import aries from '../assets/zodiac-signs/aries.png';
import cancer from '../assets/zodiac-signs/cancer.png';
import capricorn from '../assets/zodiac-signs/capricorn.png';
import gemini from '../assets/zodiac-signs/gemini.png';
import leo from '../assets/zodiac-signs/leo.png';
import libra from '../assets/zodiac-signs/libra.png';
import pisces from '../assets/zodiac-signs/pisces.png';
import sagittarius from '../assets/zodiac-signs/sagittarius.png';
import scorpio from '../assets/zodiac-signs/scorpio.png';
import taurus from '../assets/zodiac-signs/taurus.png';
import virgo from '../assets/zodiac-signs/virgo.png';

const zodiacIcons = {
	Pisces: pisces,
	Aries: aries,
	Taurus: taurus,
	Gemini: gemini,
	Cancer: cancer,
	Leo: leo,
	Virgo: virgo,
	Libra: libra,
	Scorpio: scorpio,
	Sagittarius: sagittarius,
	Capricorn: capricorn,
	Aquarius: aquarius,
};

const getZodiacIcon = (moonZodiac) => {
	return zodiacIcons[moonZodiac];
};

export default getZodiacIcon;
