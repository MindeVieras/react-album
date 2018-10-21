
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
                use: ['babel-loader', 'eslint-loader']
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
