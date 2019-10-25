require("babel-polyfill");
const path = require('path');


module.exports = {
    mode: "production",
    entry: {
        Core: ["babel-polyfill", "./src/scripts/Core"],
        Editor: ["babel-polyfill", "./src/scripts/Editor"]
    },
    output: {
        path: path.join(__dirname, "dist/scripts"),
        filename: "TweenTime.[name].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                // プリセットを指定することで、ES2019 を ES5 に変換
                                "@babel/preset-env",
                            ]
                        }
                    }
                ]
            },
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.ts$/, use: 'ts-loader' },
            { test: /\.html$/, use: 'html-loader' },
        ]
    },
    plugins: [
    ]
};