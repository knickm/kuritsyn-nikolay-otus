import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
	mode: 'development',
	context: join(__dirname, 'src'),
	entry: './main.js',

	output: {
		path: join(__dirname, './dist'),
		filename: 'main.[contenthash].js',
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new HTMLWebpackPlugin({
			title: 'lesson-7 native custom element',
			template: './index.html'
		}),
		new CleanWebpackPlugin()
	]
};
