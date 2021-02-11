import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Animated, Pressable, StyleSheet } from 'react-native';
import TextFieldInline from './TextFieldInline';
import { DateTime } from 'luxon';

const TodayButton = ({ setActiveDay, initialDay, setInitialDay }) => {
	const fadeAnim = useRef(new Animated.Value(0)); // Initial value for opacity: 0

	// useEffect(() => {
	// 	Animated.timing(
	// 		fadeAnim,
	// 		{
	// 			toValue: 1,
	// 			duration: 10000,
	// 		}
	// 	).start();
	// }, [fadeAnim]);

	const handlePressToday = () => {
		setActiveDay(initialDay);
	};

	return (
		<Pressable
			style={styles.container}
			onPress={handlePressToday}
		>
			<TextFieldInline value="Today" />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 130,
		right: 20,
		borderColor: 'rgb(255,255,255)',
		borderWidth: 1,
		borderRadius: 100,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 12,
		paddingRight: 12,
		zIndex: 2,
	},
});

TodayButton.propTypes = {
	setActiveDay: PropTypes.func.isRequired,
	setInitialDay: PropTypes.func.isRequired,
};

export default TodayButton;