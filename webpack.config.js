const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { FilerWebpackPlugin } = require('filer/webpack');

module.exports = env => {
  return {
    plugins: [
      new FilerWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].bundle.css',
        chunkFilename: '[id].css'
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      open: true,
      client: {
        logging: 'none',
      },
      port: 9000,
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(jsx|js)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  "targets": "defaults" 
                }],
                '@babel/preset-react'
              ]
            }
          }]
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              // options: {
              //   hmr: env.NODE_ENV === 'development',
              // }
            }, {
              loader: 'css-loader',
              options: {
                importLoaders: 0 
              }
            }]
        }
      ]
    }
  }
}
