const path = require('path');
const PostCssPipelineWebpackPlugin = require('postcss-pipeline-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const criticalSplit = require('postcss-critical-split');
const csso = require('postcss-csso');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');

const root = path.resolve('./_');

module.exports = function (env) {
	return {
		entry: {
			app: './src/Client/entries/app.js'
		},

		output: {
			filename: '[name].js',
			path: root,
			publicPath: '/_/'
		},

		plugins: (function () {
			const plugins = [];

			plugins.push(
				new MiniCssExtractPlugin({
					filename: '[name].css',
					chunkFilename: '[id].css'
				})
			);

			if (env.production) {
				plugins.push(
					new CleanWebpackPlugin(
						['app.*.js', 'styles.*.css*', 'fonts'],
						{
							root,
							watch: true
						}
					)
				);

				plugins.push(
					new PostCssPipelineWebpackPlugin({
						suffix: 'critical',
						pipeline: [
							criticalSplit({
								output: criticalSplit.output_types.CRITICAL_CSS
							})
						]
					}),
					new PostCssPipelineWebpackPlugin({
						suffix: 'min',
						pipeline: [
							csso({
								restructure: false
							})
						],
						map: {
							inline: false
						}
					})
				);
			}

			plugins.push(
				new WebappWebpackPlugin({
					logo: './src/Client/layout/favicon.png',
					inject: false,
					cache: true,
					prefix: 'icons/',
					favicons: {
						icons: {
							favicons: true,
							appleIcon: true,
							android: false,
							appleStartup: false,
							coast: false,
							firefox: false,
							opengraph: false,
							twitter: false,
							yandex: false,
							windows: false
						}
					}
				})
			);

			return plugins;
		}()),

		module: {
			rules: [
				{
					test: /\.(svg|jpg|png|git)$/,
					use: [{
						loader: 'url-loader',
						options: {
							limit: 10000,
							outputPath: 'images/'
						}
					}]
				}, {
					test: /\.(woff|woff2|ttf|eot)$/,
					use: [{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts/'
						}
					}]
				}, {
					test: /\.js?$/,
					exclude: /node_modules/,
					use: [{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						  }
					}]
				}, {
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								modules: true
							}
						}
					]
				}, {
					test: /\.less$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader'
						}, {
							loader: 'postcss-loader',
							options: {
								config: {
									path: path.resolve('./src/Client/webpack/postcss.config.js')
								}
							}
						}, {
							loader: 'less-loader',
							options: {
								noIeCompat: true,
								compress: false,
								lint: true
							}
						}
					]
				}
			]
		},

		devtool: env.production ? 'source-maps' : 'eval'
	};
};
