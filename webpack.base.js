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
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      only: ['bundle', 'vendor']
    }),
    new StatsWriterPlugin({ filename: 'stats.json' })
  ],
  module: {
    rules: [
      // {
      //   test: /\.sql$/i,
      //   use: 'raw-loader',
      // },
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
      // {
      //   test: /\.json$/,
      //   exclude: /node_modules/,
      //   loader: 'json-loader',
      //   options: {
      //     name: '[name].[ext]',
      //     // outputPath: 'jsons',
      //   },
      // },
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
