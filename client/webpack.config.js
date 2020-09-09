const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: isDevelopment ? 'development' : 'production',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].[hash].js',
		chunkFilename: '[name].[id].js',
	},
	module: {
		rules: [
			{
				test: /\.js/,
				use: ['babel-loader', 'eslint-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.css/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(svg)/,
				use: ['file-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ template: './public/index.html' }),
		isDevelopment && new ReactRefreshWebpackPlugin()
	],
	devServer: {
		compress: true,
		port: 3000,
		hot: true,
		contentBase: path.resolve(__dirname, 'public'),
		historyApiFallback: true,
		proxy: {
			'/api': 'http://localhost:5000'
		}
	},
	devtool: 'source-map'
}