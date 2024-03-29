import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import {
	useFonts,
	Poppins_300Light,
	Poppins_500Medium,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins';

const TextFieldInline = ({ value, type, style, color, fontSize, textAlign, textDecorationLine, ...props }) => {
	const [isFontsLoaded] = useFonts({
		Poppins_300Light,
		Poppins_500Medium,
		Poppins_700Bold,
	});

	if (!isFontsLoaded) {
		return null;
	}

	const fontFamily = (() => {
		switch (true) {
			case type === TextFieldInline.type.title:
				return 'Poppins_700Bold';

			case type === TextFieldInline.type.main:
				return 'Poppins_500Medium';

			case type === TextFieldInline.type.sub:
				return 'Poppins_300Light';

			default:
				return 'Poppins_500Medium';
		}
	})();

	return (
		<View
			{...props}
			style={[
				style,
				styles.container,
			]}
		>
			<Text
				style={[
					styles[type],
					{
						fontFamily,
						color,
						...(fontSize && 'fontSize' && { fontSize: fontSize }),
						...(textAlign && 'textAlign' && { textAlign: textAlign }),
						...(textDecorationLine && 'textDecorationLine' && { textDecorationLine: textDecorationLine }),
					},
				]}
			>
				{value}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	// eslint-disable-next-line react-native/no-unused-styles
	title: { fontSize: 21 },
	// eslint-disable-next-line react-native/no-unused-styles
	main: { fontSize: 14 },
	// eslint-disable-next-line react-native/no-unused-styles
	sub: { fontSize: 12 },
});

TextFieldInline.propTypes = {
	value: PropTypes.string,
	type: PropTypes.string,
	style: PropTypes.object,
	color: PropTypes.string,
	textDecorationLine: PropTypes.string,
	textAlign: PropTypes.string,
	fontSize: PropTypes.number,
};

TextFieldInline.defaultProps = {
	type: 'main',
	color: 'white',
	textAlign: 'center',
	value: '',
};

TextFieldInline.type = {
	title: 'title',
	main: 'main',
	sub: 'sub',
};

export default TextFieldInline;