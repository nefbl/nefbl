const webpack = require("webpack");

module.exports = {
    devtool: "inline-source-map",
    entry: ['./src/main.ts'],
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
    resolve: {
        alias: {
            'nefbl': require('path').resolve(__dirname, '../../dist/nefbl.js')
        },
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.(css|scss)$/,
            loader: ['./scss-loader.js']
        }, {
            test: /\.ts$/,
            loader: ['awesome-typescript-loader']
        }, {
            test: /\.html$/,
            loader: ['./html-loader.js']
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    mode: "development"
};
