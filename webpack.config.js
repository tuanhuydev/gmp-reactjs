const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const configs = {
    entry: path.resolve(__dirname, 'src/index.js'),
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                include: /\.module\.css$/,
                use: ["style-loader", {
                    loader: "css-loader",
                    options: {
                        importLoaders: 1,
                        modules: true,
                        modules: {
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                        },
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: false
                        }
                    },
                ],
                exclude: /\.module\.css$/,
            },
            {
                test: /\.png$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: __dirname + '/build',
    }
}

module.exports = (agrv, env) => {
    const eslintOptions = {
        cache: true,
        fix: true,
    };

    const mode = agrv.mode || "development";
    switch (mode) {
        case 'development':
            configs.devtool = 'source-map';
            configs.plugins.push(new BundleAnalyzerPlugin());
            configs.plugins.push(new ESLintPlugin(eslintOptions))
        default:
    }
    return configs;
}