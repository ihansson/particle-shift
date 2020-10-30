const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    'particle-shift': './src/index.js',
    'particle-shift.min': './src/index.js',
  },
  mode: 'development',
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'ParticleShift',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min.js(\?.*)?$/i,
      }),
    ],
  }
};