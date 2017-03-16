'use strict'

let webpack = require('webpack');

module.exports = {
    entry: './front/app.js',
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    context: __dirname,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            { 
                test: /\.(png|jpg)$/, 
                loader: 'url-loader?limit=8192' 
            }
        ]
    }
};