import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import TextField from './TextField';
import TextFieldInline from './TextFieldInline';

const DataContainer = ({ moonTimes }) => {
	return (
		<View style={styles.dataContainer}>
			<View style={[styles.row, styles.rowContainer, styles.rowGap]}>
				<View style={[styles.left, styles.rowChild]}>
					<TextFieldInline value="Next new moon" />
					<TextFieldInline
						type={TextFieldInline.type.sub}
						value="?"
					/>
				</View>
				<View style={[styles.left, styles.rowChild]}>
					<TextFieldInline value="Next full moon" />
					<TextFieldInline
						type={TextFieldInline.type.sub}
						value="?"
					/>
				</View>
			</View>

			<View style={[styles.row, styles.rowContainer]}>
				<TextField
					style={[styles.left, styles.rowChild]}
					title="Moonrise"
					value={moonTimes.rise}
				/>
				<TextField
					style={[styles.right, styles.rowChild]}
					title="Moonset"
					value={moonTimes.set}
				/>
			</View>
			<TextField
				style={styles.row}
				title="Lunar eclipse"
				value="?"
			/>
			<TextField
				style={styles.row}
				title="Moon zodiac"
				value="?"
			/>
			<TextField
				style={styles.row}
				title="Altitude"
				value="?"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	dataContainer: {
		position: 'absolute',
		paddingLeft: '12px',
		paddingRight: '12px',
		width: '100%',
		top: 'calc(30% + 250px)',
		display: 'flex',
	},
	row: { marginBottom: '4px' },
	rowContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	rowChild: { width: '49.5%' },
	left: { marginRight: '2px' },
	right: { marginLeft: '2px' },
	rowGap: { marginBottom: '30px' },
});

DataContainer.propTypes = {
	moonTimes: PropTypes.shape({
		rise: PropTypes.string,
		set: PropTypes.string,
	}).isRequired,
};

export default DataContainer;