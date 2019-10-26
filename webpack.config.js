require("babel-polyfill");
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = [{
    mode: "development",
    entry: {
        main: "./src/scripts/build.js"
    },
    output: {
        path: path.join(__dirname, "dist/scripts"),
        filename: "TweenTime.[name].js",
    },
    target: "node",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            { test: /\.css$/, use: 'css-loader' },
            {
                test: /\.tpl.html$/,
                loader: 'mustache-loader'
            },
        ]
    },
    plugins: [
    ]
},
{
    mode: "development",
    context: path.join(__dirname, 'src/styles'),
    entry: {
        editor: './editor.sass'
    },
    output: {
        path: path.join(__dirname, 'dist/styles'),
        filename: '[name].css'
    },
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: './[name].css',
            chunkFilename: '[id].css',
        }),
    ]
}];