import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import TextFieldInline from './TextFieldInline';
import { remap } from '@anselan/maprange';

import arrow from '../assets/arrow.png';

const DateBar = ({
	activeDay,
	setActiveDay,
	moonPhase,
	moonIlluminatedFraction,
}) => {
	const handleClickYesterday = () => {
		setActiveDay(activeDay.minus({
			days: 1,
			hours: 0,
			minutes: 0,
			seconds: 0,
		}));
	};

	const handleClickTomorrow = () => {
		setActiveDay(activeDay.plus({
			days: 1,
			hours: 0,
			minutes: 0,
			seconds: 0,
		}));
	};

	return (
		<View style={styles.container}>
			<Pressable
				style={[styles.arrowContainer, styles.arrowContainerLeft]}
				onPress={handleClickYesterday}
			>
				<Image
					source={arrow}
					style={styles.arrow}
				/>
			</Pressable>
			<View style={styles.dateContainer}>
				<TextFieldInline
					type={TextFieldInline.type.title}
					value={activeDay.toFormat('d LLLL yyyy')}
				/>
				<TextFieldInline
					type={TextFieldInline.type.main}
					value={`${moonPhase} ${remap(moonIlluminatedFraction, [0, 1], [0, 100], true, true)}%`}
				/>
			</View>
			<Pressable
				style={[styles.arrowContainer, styles.arrowContainerRight]}
				onPress={handleClickTomorrow}
			>
				<Image
					source={arrow}
					style={styles.arrow}
				/>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingTop: 10,
	},
	dateContainer: { width: '65%' },
	arrowContainer: {
		width: 27,
		height: 32,
		padding: 10,
	},
	arrow: {
		width: '100%',
		height: '100%',
	},
	arrowContainerLeft: { marginRight: 5 },
	arrowContainerRight: {
		marginLeft: 5,
		transform: [{ rotateY: '180deg' }],
	},
});

DateBar.propTypes = {
	activeDay: PropTypes.instanceOf(DateTime).isRequired,
	setActiveDay: PropTypes.func.isRequired,
	moonPhase: PropTypes.string,
	moonIlluminatedFraction: PropTypes.number,
};

export default DateBar;