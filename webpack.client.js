const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
  mode: 'development',
  // Tell webpack to root file of our server app
  entry: {
    client: './src/client/client.js',
    vendor: ['core-js', 'react', 'react-dom', 'redux', 'semantic-ui-css', 'semantic-ui-react'],
  },
  // Tell webpack where to put output file
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    jsonpFunction: 'meetingsJsonp'
  },
  devtool: 'inline-source-map',
};

module.exports = merge(baseConfig, config);
