const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const { StatsWriterPlugin } = require('webpack-stats-plugin');

module.exports = {
  node: {
    fs: 'empty',
  },
  mode: 'dev',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),

    new StatsWriterPlugin({ filename: 'stats.json' }),
  ],

  module: {
    rules: [
      {
        test: /\.(less)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
        }] },
      {
        type: 'javascript/auto',
        exclude: /node_modules/,
        test: /\.json$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'jsons/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            ['@babel/env', { targets: { browsers: ['last 2 versions'] } }],
          ],
        },
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
            options: { plugins: () => [autoprefixer] },
          },
          'sass-loader',
        ],
      },
    ],
  },
};
