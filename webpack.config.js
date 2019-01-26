const path = require('path');
const argv = require('yargs').argv;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isDevelopment = argv.mode === 'development';
const distPath = path.resolve(__dirname, 'build');
const mock = true;


const config = {
    mode: argv.mode,
    entry: {
        main: './src/js/index.js'
    },
    output: {
        filename: 'js/index.js',
        path: distPath
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
        alias: {
            '@': 'js/components',
            vue: 'vue/dist/vue.js',
            'api-client': mock
                ? 'js/api/mock/index.js'
                : 'js/api/server/index.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: 'html-loader'
        }, {
            test: /(\.css$|\.less$)/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "less-loader"]
            })
        }, {
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    publicPath: distPath
                }
            },
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(distPath, 'index.html'),
            template: './src/index.html'
        }),
        new ExtractTextPlugin("css/index.css"),
    ],
    optimization: {
        minimize: !isDevelopment,
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        warnings: false
                    },
                },
            }),
        ],
    },
    devServer: {
        contentBase: distPath,
        port: 9009,
        compress: true,
        open: true
    }
};
module.exports = config;