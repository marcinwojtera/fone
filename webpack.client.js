const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
  mode: 'development',
  entry: {
    client: ['./src/client/client.js', 'semantic-ui-react', '@nivo/line'],
    mobileClient: ['./src/mobileClient/client.js', 'antd-mobile'],
    vendor: ['react', 'react-dom', 'redux', 'lodash'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    jsonpFunction: 'statsJsonp',
  },
  devtool: 'inline-source-map',
};

module.exports = merge(baseConfig, config);
