module.exports = {
	root: true,
	parser: "babel-eslint",
	parserOptions: {
		sourceType: "module"
	},
	env: {
		browser: true,
		node: true
	},
	extends: ["standard", "prettier", "prettier/vue"],
	globals: {
		__static: true
	},
	plugins: ["html", "prettier"],
	rules: {
		// allow debugger during development
		"no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
		// allow paren-less arrow functions
		"arrow-parens": 0,
		// allow async-await
		"generator-star-spacing": 0,
		// type of quotes "" or ''
		quotes: [1, "double"],
		// enforce consistent indentation
		indent: [1, "tab"],
		// disallow semicolons instead of ASI
		semi: [1, "never"],
	}
}
