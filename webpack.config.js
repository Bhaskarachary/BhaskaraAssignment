const {
        resolve
    } = require('path'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

let config = {
    entry: {
        'bhaskara.app': [
            'babel-polyfill',
            './index.jsx'
        ]
    },
    output: {
        filename: 'js/[name].js',
        path: resolve(__dirname, 'dist'),
        publicPath: '../',
        libraryTarget: "umd"
    },
    context: resolve(__dirname, './src'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                import: false,
                                importLoaders: 1,
                                minimize: true,
                                sourceMap: true,
                                localIdentName: '[name]-[local]-[hash:base64:5]',
                                camelCase: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg)$/,
                use: 'file-loader?name=img/[name].[ext]'
            },
            {
                test: /\.(eot|otf|ttf|woff|woff2)$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader?name=icons/[name].[ext]'
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.png', '.svg'],
        modules: [ 'node_modules' ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            disable: false,
            allChunks: true
        }),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            { from: './*.html', to: '.' },
            { from: './assets/*.css', to: './css', flatten: true}
        ])
    ],
};

module.exports = config;
