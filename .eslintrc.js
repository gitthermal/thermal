module.exports = {
	root: true,
	parserOptions: {
		parser: "babel-eslint",
		sourceType: "module",
		ecmaVersion: 8
	},
	env: {
		browser: true,
		node: true
	},
	extends: [
		"standard",
		"prettier",
		"prettier/vue",
		"prettier/standard",
		"plugin:vue/base",
		"plugin:vue/essential",
		"plugin:vue/recommended",
		"plugin:vue/strongly-recommended"
	],
	globals: {
		__static: true
	},
	plugins: [
		"prettier"
	],
	rules: {
		"linebreak-style": [1, "unix"],
		"prettier/prettier": [
			1,
			{
				"usePrettierrc": true
			}
		],
		// allow debugger during development
		"no-debugger": process.env.NODE_ENV === "testing" ? 2 : 0,
		// enable semicolons instead of ASI
		semi: [1, "always"],
		// disable console log
		"no-console": 1,
		// enforce consistent indentation
		"vue/html-indent": [2, "tab"],
		"vue/max-attributes-per-line": 0,
		"vue/html-self-closing": 0
	}
}
