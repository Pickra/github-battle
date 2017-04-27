var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");

var config = {
    entry: "./app/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: "babel-loader" },
            { test: /\.(css)$/, use: ["style-loader", "css-loader"] }

        ]
    },
    devServer: { historyApiFallback: true },
    plugins: [new HtmlWebpackPlugin({
        template: "app/index.html"
    })]
};

if (process.env.NODE_ENV) {
    config.plugins.push(
        new webpack.DefinePlugin({
            "process.env": { "NODE_ENV": JSON.stringify(process.env.NODE_ENV) }
        }),
        new webpack.optimize.UglifyJsPlugin()
    );
}

module.exports = config;