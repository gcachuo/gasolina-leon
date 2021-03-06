var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: "./src/",
    output: {
        path: __dirname + "/../www/assets/dist/",
        filename: 'index.js'
    },
    module: {
        rules: [
            {test: /jquery\.js$/, loader: 'expose-loader?jQuery!expose-loader?$'},
            {test: /\.(gif|png|jpg|svg|cur)$/, loader: 'file-loader?name=img/[name].[ext]'},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!sass-loader'})
            },
            {test: /\.(eot|woff|ttf|woff2)/, loader: 'file-loader?name=fonts/[name].[ext]'}
        ]
    },
    plugins: [
        new ExtractTextPlugin("index.css"),
        new CopyWebpackPlugin([{from: 'src/js/pages', to: 'js'}])
    ],
    node: {
        fs: "empty"
    }
};