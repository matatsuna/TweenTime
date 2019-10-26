require("babel-polyfill");
const path = require('path');


module.exports = {
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
};