module.exports = {
	plugins: [
		'react',
		'react-native',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
			modules: true,
		},
	},
	parser: 'babel-eslint',
	env: {
		'react-native/react-native': true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	rules: {
		'react-native/no-unused-styles': ['error'],
		'react-native/split-platform-components': 2,
		'react-native/no-inline-styles': 2,
		'react-native/no-color-literals': 0,
		'react-native/no-raw-text': 2,
		'react-native/no-single-element-style-arrays': 2,
		'indent': ['error', 'tab', {
			'SwitchCase': 1,
		}],
		'react/jsx-no-literals': ['error', {
			'ignoreProps': true,
		}],
		'react/jsx-max-props-per-line': ['error', {
			'when': 'always',
		}],
		'react/jsx-closing-tag-location': 'error',
		'react/destructuring-assignment': ['error', 'always'],
		'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
		'react/jsx-first-prop-new-line': ['error', 'multiline'],
		'react/jsx-one-expression-per-line': 'error',
		'react/jsx-sort-props': ['error', {
			'callbacksLast': true,
			'shorthandFirst': true,
			'ignoreCase': false,
			'noSortAlphabetically': false,
			'reservedFirst': true,
		}],
		'no-tabs': 'off',
		'no-console': 'off',
		'no-plusplus': 'off',
		'max-params': ['error'],
		'semi': ['error', 'always'],
		'no-multiple-empty-lines': ['error', {
			'max': 1,
		}],
		'object-property-newline': ['error', {
			'allowAllPropertiesOnSameLine': false,
			'allowMultiplePropertiesPerLine': false,
		}],
		'object-curly-newline': ['error', {
			'ObjectExpression': 'always',
			'ObjectPattern': {
				'multiline': true,
			},
			'ImportDeclaration': 'never',
			'ExportDeclaration': {
				'multiline': true,
				'minProperties': 3,
			},
		}],
		'padding-line-between-statements': [
			'error',
			{
				'blankLine': 'always',
				'prev': '*',
				'next': ['return', 'export', 'block', 'block-like', 'case', 'default'],
			},
		],
		'object-curly-spacing': ['error', 'always'],
		'key-spacing': ['error'],
		'no-trailing-spaces': 'error',
		'function-paren-newline': ['error', 'consistent'],
		'function-call-argument-newline': ['error', 'consistent'],
		'no-multi-spaces': 'error',
		'space-before-blocks': 'error',
		'arrow-spacing': 'error',
		'keyword-spacing': 'error',
		'comma-dangle': ['error', 'always-multiline'],
		'quotes': ['error', 'single', {
			'allowTemplateLiterals': true,
		}],
		'no-dupe-keys': 'error',
		'comma-spacing': ['error', {
			before: false,
			after: true,
		}],
	},
};