const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'eslint-loader']
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.svg$/,
            exclude: /node_modules/,
            use: ['react-svg-loader']
        }, {
            test: /\.png|jpg$/,
            include: path.join(__dirname, 'src/images'),
            loader: ['file-loader']
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: `${__dirname}/dist`,
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    // devtool: 'inline-source-map',
    devServer: {
        port: 7000,
        contentBase: './dist',
        historyApiFallback: true,
        hot: true
    }
};
