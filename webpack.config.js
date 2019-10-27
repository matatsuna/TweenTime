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
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true
                        }
                    },
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                use: [{
                    loader: 'url-loader',
                }]
            },
            {
                test: /\.tpl\.html$/,
                loader: 'mustache-loader'
            },
            {
                test: /\.sass$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            sourceMap: true,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
    ]
},
];