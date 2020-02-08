const path = require('path');
module.exports = {
  entry: './app/assets/scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'app'),
    publicPath: '/dist/',
    filename: 'bundled.js',
  },
  mode: 'development'
}