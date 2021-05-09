const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
	{
		name: "css",
		entry: {
			"www/css/index": "./src/sass/index.scss",
		},
		output: {
			path: path.resolve(__dirname, ""),
			// filename: '[name].js' これはいらない
		},
		resolve: {
			extensions: [],
		},
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						{
							loader: "css-loader",
							options: {
								sourceMap: false,
								importLoaders: 2,
							},
						},
						{
							loader: "sass-loader",
							options: {
								sourceMap: false,
							},
						},
					],
				},
				{
					test: /\.(ttf|eot|woff|woff2|svg)$/,
					use: {
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "./www/css/fonts", //output.path から続けるフォントコピー先ディレクトリ
							publicPath: "./fonts", //ビルド後、css ファイルから見たフォントディレクトリパス
						},
					},
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "[name].css",
			}),
		],
		mode: "production",
	},
];
