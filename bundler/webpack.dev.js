const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = webpackMerge(
    commonConfiguration,
    {
        mode: 'development',
        plugins:
        [
            new webpack.HotModuleReplacementPlugin(),
            new FaviconsWebpackPlugin('./static/img/my-logo.png')
        ],
        devServer:
        {
            contentBase: './dist',
            open: true,
            hot: true
        },
        module:
        {
            rules:
            [
                {
                    test: /\.css$/,
                    use:
                    [
                        'style-loader',
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
                        'style-loader',
                        'css-loader',
                        'stylus-loader'
                    ]
                }
            ]
        }
    }
)