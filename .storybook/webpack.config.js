const path = require('path');

module.exports = async ({ config, mode }) => {
	config.module.rules.push({
		test: /\.vue$/,
		use: ['style-loader', 'css-loader', 'sass-loader'],
		include: path.resolve(__dirname, '../src/renderer/components'),
	}, {
		test: /\.vue?$/,
		use: ['vue-loader', 'vue-style-loader']
	});

	return config;
};
