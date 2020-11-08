import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import moon from './assets/moon.png'
import HeaderBar from './components/HeaderBar';

export default function App() {
	return (
		<View>
			<HeaderBar />
			<View style={styles.container}>
				<View style={{ ...styles.container, ...styles.textContainer }}>
					<Text>This is some new text!</Text>
				</View>
				<Image style={styles.image} source={moon}></Image>
				<StatusBar style="auto" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textContainer: {
		position: 'absolute',
		marginTop: '20%',
		marginBottom: '20%'
	},
	image: {
		backgroundColor: 'yellow',
		height: '50%',
		width: '60%',
		resizeMode: 'contain'
	}
});
