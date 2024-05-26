module.exports = {
	parser: "@babel/eslint-parser",
	extends: ["airbnb-base", "plugin:prettier/recommended", "eslint:recommended", "plugin:react/recommended", "plugin:@next/next/recommended"],
	settings: {
		react: {
			pragma: "React",
			version: "detect",
		},
		"import/resolver": {
			node: {
				paths: ["src"],
			},
		},
	},
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	plugins: ["prettier", "react"],
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		"react/jsx-uses-react": "error",
		"react/jsx-uses-vars": "error",
		quotes: ["error", "double"],
		"react/prefer-es6-class": ["error", "always"],
		strict: 0,
		"consistent-return": ["warn"],
		"no-param-reassign": ["error", { props: true, ignorePropertyModificationsForRegex: [".*"] }],
		"prefer-destructuring": [
			"error",
			{
				array: false,
				object: true,
			},
			{
				enforceForRenamedProperties: false,
			},
		],
		"init-declarations": ["error"],
		"class-methods-use-this": [
			"error",
			{
				exceptMethods: ["render", "getInitialState", "getDefaultProps", "getChildContext", "componentWillMount", "componentDidMount", "componentWillReceiveProps", "shouldComponentUpdate", "componentWillUpdate", "componentDidUpdate", "componentWillUnmount"],
			},
		],
		"arrow-body-style": [2, "as-needed"],
		"no-console": [
			"error",
			{
				allow: ["error"],
			},
		],
		"max-len": ["error", 500],
		"no-unexpected-multiline": "error",
		"react/prop-types": 0,
		"react/button-has-type": [
			"error",
			{
				button: true,
				submit: true,
				reset: true,
			},
		],
		"import/prefer-default-export": 0,
		"import/no-extraneous-dependencies": 0,
	},
};
