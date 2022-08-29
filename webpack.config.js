const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  entry: ['react-hot-loader/patch', './src/index.tsx'],
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }],
      },
      {
        test: /node_modules\/@dripsy.*.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              '@babel/preset-react',
            ],
            plugins: ['react-native-web'],
          },
        },
      },
      {
        test: /\.graphql?$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.(png|svg)/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    // NOTE: Use this to copy static files to '/dist'
    new CopyPlugin({
      patterns: [{ from: './env.js' }],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
      templateContent: ({ htmlWebpackPlugin }) =>
        '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' +
        htmlWebpackPlugin.options.title +
        '</title><base href="/"><script type="text/javascript" src="/env.js"></script></head><body><div id="root"></div></body></html>',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
  resolve: {
    extensions: ['.web.js', '.tsx', '.ts', '.js'],
    alias: {
      /**
       * In case of using yarn, a resolutions option can be used instead of aliasing 'react-native-web' dependency:
       * {
       *   "name": "project",
       *   "dependencies": {
       *     "@odekoteam/doppio": "0.2.0",
       *     "react-native-web": "0.17.7",
       *   },
       *   "resolutions": {
       *     "react-native-web": "0.17.7"
       *   }
       * }
       */
      'react-native-web': path.resolve(__dirname, 'node_modules/react-native-web'),
      'react-native$': 'react-native-web',
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: './dist',
    },
  },
};

module.exports = (env, argv) => {
  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    config.output.filename = '[name].[hash].js';
  }

  if (argv.mode === 'production') {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'inline-source-map';
  }

  return config;
};
