const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.base');
const BrotliPlugin = require('brotli-webpack-plugin');

const config = {
  mode: 'production',
  stats: {
    colors: false,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true
  },
  entry: {
    client: './src/client/client.js',
    pitStop: ['./src/client/components/block/PitStops.js'],
    statsElements: ['./src/client/components/block/StatsElements.js'],
    vendor: ['core-js', 'react', 'react-dom', 'redux', 'semantic-ui-css', 'semantic-ui-react'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    jsonpFunction: 'meetingsJsonp'
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      minSize: 10000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        },
        pitStop: {
          chunks: 'all',
          name: 'pitStop',
          test: 'pitStop',
          enforce: true
        },
        statsElements: {
          chunks: 'all',
          name: 'statsElements',
          test: 'statsElements',
          enforce: true
        },
      }
    },
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        extractComments: 'all',
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        }
      })
    ]
  },
  devtool: '',
  plugins: [
    new CompressionPlugin(),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
      quality: 15,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
  ]
};

module.exports = merge(baseConfig, config);
