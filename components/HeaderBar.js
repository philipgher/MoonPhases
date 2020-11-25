import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const HeaderBar = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.center}>
				{'Daily Moon'}
			</Text>
			<Pressable style={styles.topRight}>
				<Text>
					{'Calendar'}
				</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 50,
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
		right: 0,
		height: 50,
		width: '15%',
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		backgroundColor: 'green',
	},
});

HeaderBar.propTypes = {};

export default HeaderBar;