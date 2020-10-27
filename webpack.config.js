const path = require('path');

module.exports = {
  entry: './src/library.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.min.js'
  }
};