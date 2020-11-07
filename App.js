import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import icon from './assets/icon.png'

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.container, ...styles.textContainer }}>
        <Text>This is some new text</Text>
      </View>
      <Image style={styles.image} source={icon}></Image>
      <StatusBar style="auto" />
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
    marginBottom: '20%'
  },
  image: {
    backgroundColor: 'yellow',
    height: '50%',
    width: '60%',
    resizeMode: 'contain'
  }
});
