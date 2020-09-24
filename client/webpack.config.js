const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/[name].[hash].js',
    chunkFilename: 'static/js/[name].[hash].chunk.js'
  },
  optimization: {
    minimize: !isDevelopment,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
      name: false
    },
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`,
    }
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
        use: [
          'style-loader',
          !isDevelopment && MiniCssExtractPlugin.loader,
          'css-loader'
        ].filter(Boolean)
      },
      {
        test: /\.(svg)/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    !isDevelopment && new MiniCssExtractPlugin({ filename: 'static/css/[name].[hash].css' }),
    !isDevelopment && new OptimizeCssAssetsPlugin()
  ].filter(Boolean),
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
};  