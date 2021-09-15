const webpack = require("webpack");

module.exports = {
    devtool: "inline-source-map",
    entry: ['./src/entry.js'],
    output: {
        path: __dirname,
        filename: 'build/main.js'
    },
    devServer: {
        contentBase: "./",
        compress: false,
        host: "0.0.0.0",
        port: "30000",
        hot: true,
        inline: true,
        historyApiFallback: true,
        disableHostCheck: true,
        watchOptions: {
            poll: true,
            ignored: /node_modules/,
            aggregateTimeout: 300
        }
    },
    module: {
        rules: []
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    mode: "development"
};
