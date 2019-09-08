const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin')
const path = require('path')
const glob = require('glob')
const PATHS = {
  src: path.resolve(__dirname, 'public')
}

module.exports = {
  node: {
    fs: 'empty'
  },
  mode: 'dev',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      only: ['bundle', 'vendor']
    }),
    new StatsWriterPlugin({ filename: 'stats.json' }),
  ],

  module: {
    rules: [
      {
        test: /\.(less)$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]},
      {
        type: 'javascript/auto',
        exclude: /node_modules/,
        test: /\.json$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "jsons/[name].[ext]",
            }
          }
        ]
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            ['@babel/env', { targets: { browsers: ['last 2 versions'] } }]
          ]
        }
      },
      {
        test: /\.(PNG|png|jpg|eot|woff|woff2|ttf|svg|gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { plugins: () => [autoprefixer] }
          },
          'sass-loader'
        ]
      },
    ]
  },
};
