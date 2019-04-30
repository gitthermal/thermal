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
		"plugin:vue/base",
		"plugin:vue/essential",
		"plugin:vue/strongly-recommended",
		"plugin:vue/recommended",
		"standard",
		"plugin:prettier/recommended"
	],
	globals: {
		__static: true
	},
	rules: {
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
		"vue/html-indent": [2, "tab"]
	},
	"overrides": {
		"files": ["src/renderer/components/icon/**"],
		"rules": {
			"vue/max-attributes-per-line": 0,
			"vue/html-indent": 0
		}
	}
}
