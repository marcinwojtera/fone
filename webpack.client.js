const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
  mode: 'development',
  // Tell webpack to root file of our server app
  entry: {
    client: ['./src/client/client.js', '@nivo/line'],
    vendor: ['react', 'react-dom', 'redux', 'semantic-ui-react', 'lodash'],
  },
  // Tell webpack where to put output file
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    jsonpFunction: 'statsJsonp',
  },
  devtool: 'inline-source-map',
};

module.exports = merge(baseConfig, config);
