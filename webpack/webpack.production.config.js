
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: process.cwd()+'/src/js/index.jsx',
    output: {
        path: process.cwd()+'/dist',
        filename: 'js/bundle.min.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            Common: process.cwd()+'/src/js/_components/Common',
            Constants: process.cwd()+'/src/js/_constants',
            Actions: process.cwd()+'/src/js/_actions',
            Services: process.cwd()+'/src/js/_services',
            Helpers: process.cwd()+'/src/js/_helpers'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: ['babel-loader']
            },
            {
                test: /\.(css|scss)$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: process.cwd()+'/src/index.html',
            inject: false,
            minify: {
                collapseWhitespace: true
            }
        })
    ]
};

