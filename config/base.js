const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootPath = path.resolve(__dirname, '../');

const config = {
  context: path.resolve(rootPath, 'src'),
  devtool: 'eval-source-map',

  entry: {
    pos: [
      'babel-polyfill',
      path.resolve(rootPath, 'src/main'),
    ],
  },

  output: {
    path: path.resolve(rootPath, 'dist/assets'),
    filename: 'app.js',
    publicPath: '/assets/'
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      pos: path.resolve(rootPath, 'src'),
      translations: path.resolve(rootPath, 'translations'),
      assets: path.resolve(rootPath, 'assets'),
      styles: path.resolve(rootPath, 'styles'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          typeCheck: false,
        }
      },
      {
        test: /\.tsx?$/,
        loaders: [
          'babel-loader',
          'awesome-typescript-loader',
        ],
      },
      {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        include: /styles/,
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ["styles"],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: {
            loader: 'file-loader',
            options: {
              relativePath: false,
              name: '[name]_[hash].[ext]',
              publicPath: '/assets/',
              outputPath: 'img/',
            },
        },
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'file-loader',
          options: {
            relativePath: false,
            name: '[name]_[hash].[ext]',
            publicPath: '/assets/',
            outputPath: 'img/',
          },
        },
      }
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    contentBase: path.join(rootPath, 'dist'),
    port: 9000,
    historyApiFallback: true,
    hot: true,
  },

};
module.exports = config;
