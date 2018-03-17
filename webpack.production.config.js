var webpack = require('webpack');
var path = require('path');
// var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

// loaders.push({
//   test: /\.scss$/,
//   loader: ExtractTextPlugin.extract({fallback: 'style-loader', use : 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded'}),
//   exclude: ['node_modules']
// });

module.exports = {
  entry: './dev/js/index.jsx',
  output: {
    publicPath: './',
    path: path.join(__dirname, 'src'),
    filename: 'js/bundle.min.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
      loaders: [
          {
              test: /\.scss$/,
              use: [{
                  loader: "style-loader"
              }, {
                  loader: "css-loader"
              }, {
                  loader: "sass-loader"
              }]
          },
          {
              test: /\.css$/,
              use: [{
                  loader: "style-loader"
              }, {
                  loader: "css-loader"
              }, {
                  loader: "sass-loader"
              }]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: ['babel-loader', 'eslint-loader']
          },
          {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: ['babel-loader', 'eslint-loader']
          }
      ]
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new ExtractTextPlugin({
    //   filename: 'style.css',
    //   allChunks: true
    // }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: false
    })
  ]
};
