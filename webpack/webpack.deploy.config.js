
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var S3Plugin = require('webpack-s3-plugin');
var fs = require('fs');


var s3DeployConfig = {};
if (fs.existsSync(path.resolve(__dirname, 's3-deploy-config.json'))) {
    var s3DeployConfig = require('./s3-deploy-config.json');
}
else {
    console.log('To start deployin app to S3 please create s3-deploy-config.json file.');
}

module.exports = {
    mode: 'production',
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
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: process.cwd()+'/src/index.html',
            inject: false,
            minify: {
                collapseWhitespace: true
            }
        }),
        new S3Plugin({
            s3Options: {
                region: s3DeployConfig.region,
                accessKeyId: s3DeployConfig.accessKeyId,
                secretAccessKey: s3DeployConfig.secretAccessKey
            },
            s3UploadOptions: {
                Bucket: s3DeployConfig.bucket
            }
        })
    ]
};
