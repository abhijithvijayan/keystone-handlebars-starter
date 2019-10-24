const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, options) => {
    return {
        entry: {
            bundle: './client/javascripts/index.js',
        },
        devtool: options.mode === 'production' ? false : 'inline-source-map',
        performance: {
            hints: false,
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.(scss)$/,
                    use: [
                        options.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins() {
                                    return [require('precss'), require('autoprefixer')];
                                },
                            },
                        },
                        'sass-loader',
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles.css',
            }),
            new CleanWebpackPlugin(['server/public/dist']),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default'],
                Util: 'exports-loader?Util!bootstrap/js/dist/util',
                Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
            }),
        ],
        optimization: {
            minimizer: [
                new OptimizeCssAssetsPlugin({
                    assetNameRegExp: /\.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorOptions: {
                        map: false,
                    },
                    cssProcessorPluginOptions: {
                        preset: [
                            'default',
                            {
                                discardComments: {
                                    removeAll: true,
                                },
                            },
                        ],
                    },
                    canPrint: true,
                }),
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                }),
            ],
        },
        output: {
            path: path.resolve(__dirname, 'server', 'public', 'dist'),
            filename: '[name].js',
            // publicPath: 'server/public/dist/',
        },
    };
};