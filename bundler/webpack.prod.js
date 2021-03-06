const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpackMerge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = webpackMerge(
    commonConfiguration,
    {
        mode: 'production',
        plugins:
        [
            new MiniCssExtractPlugin(),
            new CleanWebpackPlugin(
                [ 'dist' ],
                { root: path.resolve(__dirname, '..') }
            ),
            new FaviconsWebpackPlugin('./static/img/my-logo.png')
        ],
        module:
        {
            rules:
            [
                {
                    test: /\.css$/,
                    use:
                    [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.(glsl|vs|fs|vert|frag)$/,
                    exclude: /node_modules/,
                    use: [
                        'raw-loader',
                        'glslify-loader'
                    ]
                },
                {
                    test: /\.styl$/,
                    use:
                    [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'stylus-loader'
                    ]
                }
            ]
        }
    }
)