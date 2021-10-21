const path = require('path');
var SRC_DIR = path.join(__dirname, '/client');

module.exports = {
  entry: '/client/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.(js.|jsx)$/,
      include: SRC_DIR
    },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader'
    ]
  }]
  }
}