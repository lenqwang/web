var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var baseDir = path.resolve(__dirname, 'static');

module.exports = {
	entry: {
		materiallist: path.resolve(__dirname, 'static/js/res/app/materiallist.js'),
		materialcreate: path.resolve(__dirname, 'static/js/res/app/materialcreate.js'),
		materialupdate: path.resolve(__dirname, 'static/js/res/app/materialupdate.js'),
		imageslist: path.resolve(__dirname, 'static/js/res/app/imageslist.js'),
		voicelist: path.resolve(__dirname, 'static/js/res/app/voicelist.js'),
		voicecreate: path.resolve(__dirname, 'static/js/res/app/voicecreate.js'),
		voiceupdate: path.resolve(__dirname, 'static/js/res/app/voiceupdate.js'),
		videolist: path.resolve(__dirname, 'static/js/res/app/videolist.js'),
		videocreate: path.resolve(__dirname, 'static/js/res/app/videocreate.js'),
		videoupdate: path.resolve(__dirname, 'static/js/res/app/videoupdate.js')
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'static/dist/')
	},
	module: {
		loaders: [
			{
				test: /\.less$/,
				loader: 'style!css!less'
			},
			{
				test: /\.js$/,
				loader: 'babel'
			},
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.(png|jpg|gif|bmp)$/,
				loader: 'file-loader?name=../[path][name].[ext]'
			},
			{
				test: require.resolve('jquery'),
				loader: 'expose?$!expose?jQuery'
			}
		]
	},
	resolve: {
		alias: {
			webuploader: baseDir + '/js/res/vendors/webuploader/dist',
			rescss: baseDir + '/css/dist'
		}
	},
	watch: true,
	cache: true
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
 //  	new webpack.ProvidePlugin({
	// 	jQuery: 'jquery',
	// 	$: 'jquery',
	// 	'window.jQuery': 'jquery'
	// }),
	new CommonsChunkPlugin('common.js'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}