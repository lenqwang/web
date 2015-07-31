// module.exports = {
// 	entry: [
// 		'webpack-dev-server/client?http://0.0.0.0:3000',
// 		'webpack/hot/only-dev-server',
// 		'./scripts/index'
// 	],
// 	module: {
//  	 loaders: [
//     		{ test: /\.jsx?$/, loaders: ['react-hot', 'jsx?harmony'], include: path.join(__dirname, 'src') }
//  	 ]
// 	}
// };

/*
	how to pack the index.js

	you can use:

	$ cd path

	webpack scripts/index.js build/bundle.js
*/


var path = require('path'),
	webpack = require('webpack');

module.exports = {
	devtool: 'eval',
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
	    'webpack/hot/only-dev-server',
	    './scripts/index'
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/scripts/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoErrorsPlugin()
	],
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['react-hot', 'babel'],
				include: path.join(__dirname, 'scripts')
			}
		]
	}
};