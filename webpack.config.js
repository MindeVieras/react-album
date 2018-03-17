var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        inline: true,
        historyApiFallback: true,
        contentBase: './src',
        port: 8080
    },
    devtool: 'eval-source-map',
    entry: './dev/js/index.jsx',
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: 'js/bundle.min.js'
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
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: false
      })
    ],
};
