const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => ({
    entry: {
        index: './src/index.jsx',
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/img', to: 'img' },
                { from: 'src/font', to: 'font' },
            ]
        }),
        new webpack.DefinePlugin({
            ENV: JSON.stringify(argv.mode)
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'eslint-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { url: false },
                    },
                    'sass-loader',
                    // {
                    //     loader: 'sass-loader',
                    //     options: {
                    //         sassOptions: {
                    //             includePaths: [path.resolve(__dirname, 'src')],
                    //         },
                    //     },
                    // },
                ],
            },
        ],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
})
