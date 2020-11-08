import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const HeaderBar = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.center}>
				{'Moon phases'}
			</Text>
			<Pressable style={styles.topRight}>
				<Text>
					{'Settings'}
				</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		width: '100%',
		height: '20pt',
	},
	center: {
		position: 'absolute',
		left: '15%',
		width: '70%',
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'center',
		textAlign: 'center',
	},
	topRight: {
		position: 'absolute',
		right: '0pt',
		height: '100%',
		width: '15%',
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		backgroundColor: 'green',
	},
});

HeaderBar.propTypes = {
};

export default HeaderBar;