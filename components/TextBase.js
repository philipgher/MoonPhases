import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import {
	useFonts,
	Poppins_300Light,
	Poppins_500Medium,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins';

const TextBase = ({ children }) => {
	const [isFontsLoaded] = useFonts({
		Poppins_300Light,
		Poppins_500Medium,
		Poppins_700Bold,
	});

	if (!isFontsLoaded) {
		return null;
	}

	return (
		<>
			{cloneElement(children, {
				fonts: {
					light: Poppins_300Light,
					medium: Poppins_500Medium,
					bold: Poppins_700Bold,
				},
			})}
		</>
	);
};

TextBase.propTypes = { children: PropTypes.node.isRequired };

export default TextBase;