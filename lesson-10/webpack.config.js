import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
	mode: 'development',
	context: join(__dirname, 'src'),
	entry: './main.ts',

	output: {
		path: join(__dirname, './dist'),
		filename: 'main.[contenthash].js',
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ['ts-loader'],
				exclude: [
					/my-tree\.spec\.ts$/,
					/node_modules/
				]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		new HTMLWebpackPlugin({
			title: 'lesson-10 native custom element',
			template: './index.html'
		}),
		new CleanWebpackPlugin()
	]
};
