var path = require('path');

/*
module.exports = {
	entry: path.resolve(__dirname, './app2/index.js')
	output: {
		path: path.resolve(__dirname, '../build'),
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.ProvidePlugin({
			'angular': 'angular'
		})
	],
	externals: {
		'angular': 'angular'
	}
};*/

module.exports = {
	context: path.resolve(__dirname + '/app2'),
	entry: './index.js',
	output: {
		path: path.resolve(__dirname + '/app2'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{test: /\.js$/, loader: 'babel'},
			{test: /\.html$/, loader: 'raw'},
			{test: /\.css$/, loader: 'style!css'},
			{test: /\.less$/, loader: 'style!css!less'}
		]
	},
	watch: true
};
