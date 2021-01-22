const twoDigitNum = (string) => string.toLocaleString('en-US', {
	minimumIntegerDigits: 2,
	useGrouping: false,
});

export default twoDigitNum;
