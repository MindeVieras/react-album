
var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'development',
    devServer: {
        inline: true,
        historyApiFallback: true,
        contentBase: process.cwd()+'/src',
        port: 8080
    },
    devtool: 'eval-source-map',
    entry: process.cwd()+'/src/js/index.jsx',
    output: {
        path: process.cwd()+'/dist',
        filename: 'js/bundle.min.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
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
    }
};
